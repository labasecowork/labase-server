// src/modules/payment/features/create-payment/presentation/create-payment.service.ts
import { CreatePaymentDTO } from "../domain/create-payment.schema";
import { CreatePaymentRepository } from "../data/create-payment.repository";
import { PaymentTransactionRepository } from "../data/payment-transaction.repository";
import { CreateReservationRepository } from "../../../../reservation/features/create_reservation/data/create_reservation.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

/** Genera un número de compra numérico de 12 dígitos */
const generatePurchaseNumber = () => Date.now().toString().slice(-12);

type EnrichedPaymentDTO = CreatePaymentDTO & {
  purchaseNumber: string;
  amount: number;
  currency: "PEN" | "USD";
};

export class CreatePaymentService {
  private paymentRepo = new CreatePaymentRepository();
  private txRepo = new PaymentTransactionRepository();
  private reservRepo = new CreateReservationRepository();

  async execute(dto: CreatePaymentDTO, userId: string) {
    // 1. Validar reserva
    const reservation = await this.reservRepo.findById(dto.reservationId);
    if (!reservation) {
      throw new AppError("RESERVATION_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }
    if (reservation.status !== "PENDING") {
      throw new AppError("PAYMENT_NOT_ALLOWED", HttpStatusCodes.BAD_REQUEST.code);
    }
    if (reservation.userId !== userId) {
      throw new AppError("FORBIDDEN_PAYMENT", HttpStatusCodes.FORBIDDEN.code);
    }

    // 2. Crear DTO enriquecido
    const enrichedDto: EnrichedPaymentDTO = {
      ...dto,
      purchaseNumber: generatePurchaseNumber(),
      amount: reservation.price.toNumber(),
      currency: "PEN",
    };

    // 3. Asegurar dataMap si no vino
    enrichedDto.metadata = {
      ...enrichedDto.metadata,
      dataMap: enrichedDto.metadata?.dataMap ?? {
        urlAddress: process.env.FRONTEND_URL ?? "https://demo.labase.pe",
        serviceLocationCityName: "Lima",
        serviceLocationCountrySubdivisionCode: "LIM",
        serviceLocationCountryCode: "PER",
        serviceLocationPostalCode: "15074",
      },
    };

    // 4. Registrar transacción en estado PENDING
    await this.txRepo.upsert({
      purchaseNumber: enrichedDto.purchaseNumber,
      provider: "niubiz",
      amount: enrichedDto.amount,
      currency: enrichedDto.currency,
      status: "PENDING",
      reservationId: dto.reservationId,
      userId,
    });

    // 5. Ejecutar flujo de pago
    const result = await this.paymentRepo.execute(enrichedDto);

    // 6. Actualizar estado a READY
    await this.txRepo.upsert({
      purchaseNumber: enrichedDto.purchaseNumber,
      provider: "niubiz",
      amount: enrichedDto.amount,
      currency: enrichedDto.currency,
      status: "READY",
      rawResponse: result,
      reservationId: dto.reservationId,
      userId,
    });

    return {
      ...result,
      amount: enrichedDto.amount,
    };
  }
}
