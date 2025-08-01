// src/modules/payment/features/create-payment/presentation/create-payment.service.ts
import { CreatePaymentDTO } from "../domain/create-payment.schema";
import { CreatePaymentRepository } from "../data/create-payment.repository";
import { PaymentTransactionRepository } from "../data/payment-transaction.repository";
import { CreateReservationRepository } from "../../../../reservation/features/create_reservation/data/create_reservation.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

/** 🆕 helper interno: genera un número de compra numérico de 12 dígitos */
const generatePurchaseNumber = () => Date.now().toString().slice(-12);

export class CreatePaymentService {
  private paymentRepo = new CreatePaymentRepository();
  private txRepo      = new PaymentTransactionRepository();
  private reservRepo  = new CreateReservationRepository();

  /**
   * @param dto     Payload validado por Zod (puede venir del front con UUID)
   * @param userId  Extraído de req.user.id
   */
  async execute(dto: CreatePaymentDTO, userId: string) {
    /* 1) Validaciones básicas */
    if (dto.amount <= 0) {
      throw new AppError(
        "El monto debe ser mayor que cero",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    /* 2) Validar la reserva */
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

    /* 2.1) Normalizar purchaseNumber (Niubiz exige numérico ≤ 12) */
    if (!/^\d{1,12}$/.test(dto.purchaseNumber)) {
      dto.purchaseNumber = generatePurchaseNumber();
    }

    // /* 2.2) Asegurar dataMap obligatorio para autorización */
    // dto.dataMap ??= {
    //   urlAddress: process.env.FRONTEND_URL ?? "https://demo.labase.pe",
    //   serviceLocationCityName: "Lima",
    //   serviceLocationCountrySubdivisionCode: "LIM",
    //   serviceLocationCountryCode: "PER",
    //   serviceLocationPostalCode: "15074",
    // };

    /* 3) Grabar transacción PENDING */
    await this.txRepo.upsert({
      purchaseNumber: dto.purchaseNumber,
      provider:       "niubiz",
      amount:         dto.amount,
      currency:       dto.currency,
      status:         "PENDING",
      reservationId:  dto.reservationId,
      userId,
    });

    /* 4) Iniciar flujo Niubiz */
    const result = await this.paymentRepo.execute(dto);

    /* 5) Actualizar transacción a READY */
    await this.txRepo.upsert({
      purchaseNumber: dto.purchaseNumber,
      provider:       "niubiz",
      amount:         dto.amount,
      currency:       dto.currency,
      status:         "READY",
      rawResponse:    result,
      reservationId:  dto.reservationId,
      userId,
    });

    return result;
  }
}
