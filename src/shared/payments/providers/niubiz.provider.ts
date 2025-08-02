// src/shared/payments/providers/niubiz.provider.ts
import axios from "axios";
import { AppError } from "../../../utils/errors";
import { HttpStatusCodes } from "../../../constants/http_status_codes";
import {
  NIUBIZ_USER,
  NIUBIZ_PWD,
  NIUBIZ_URL_SECURITY,
  NIUBIZ_URL_SESSION,
  NIUBIZ_URL_JS,
  NIUBIZ_URL_AUTHORIZATION,
} from "../config/payments.config";
import {
  PaymentProviderRepository,
  SessionRequestDTO,
  CreatePaymentDTO,
  TransactionResponse,
} from "./payment-provider.repository";

export class NiubizProvider implements PaymentProviderRepository {
  /** 1) Token de seguridad (accessToken) */
  async getAccessToken(): Promise<string> {
    const { data } = await axios.get(NIUBIZ_URL_SECURITY, {
      auth: { username: NIUBIZ_USER, password: NIUBIZ_PWD },
    });
    return data as string;
  }

  /** 2) Token de sesión para el checkout */
  async getSessionToken(
    accessToken: string,
    dto: SessionRequestDTO
  ): Promise<string> {
    const { data } = await axios.post(
      NIUBIZ_URL_SESSION,
      {
        channel: "web",
        amount: dto.amount,
        purchaseNumber: dto.purchaseNumber,
        antifraud: dto.metadata?.antifraud,
        dataMap: dto.metadata?.dataMap,
      },
      {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    return data.sessionKey as string;
  }

  /** 3) URL del script de checkout */
  async getCheckoutScript(): Promise<string> {
    return NIUBIZ_URL_JS;
  }

  /** 4) Validación / autorización de transactionToken */
  async validateTransaction(
    data: CreatePaymentDTO
  ): Promise<TransactionResponse> {
    const { transactionToken, purchaseNumber, amount, currency, dataMap } =
      data;
    if (!transactionToken) {
      throw new AppError(
        "MISSING_TRANSACTION_TOKEN",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const accessToken = await this.getAccessToken();
    const body = {
      channel: "web",
      captureType: "manual",
      countable: true,
      order: {
        tokenId: transactionToken.toUpperCase(),
        purchaseNumber,
        amount,
        currency,
      },
      dataMap,
    };

    try {
      const { data: resp } = await axios.post(NIUBIZ_URL_AUTHORIZATION, body, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });
      console.log("resp", resp);
      return resp as TransactionResponse;
    } catch (err: any) {
      console.error("[Niubiz] validateTransaction failed:", err.response?.data);
      throw err;
    }
  }

  /** 5) Flujo unificado de createPayment → llama a validateTransaction */
  async createPayment(data: CreatePaymentDTO): Promise<TransactionResponse> {
    return this.validateTransaction(data);
  }
}
