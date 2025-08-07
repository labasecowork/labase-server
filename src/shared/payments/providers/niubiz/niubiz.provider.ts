// src/shared/payments/providers/niubiz/niubiz.provider.ts
import axios from "axios";
import {
  NIUBIZ_USER,
  NIUBIZ_PWD,
  NIUBIZ_URL_SECURITY,
  NIUBIZ_URL_SESSION,
  NIUBIZ_URL_JS,
  NIUBIZ_URL_AUTHORIZATION,
} from "../../config/payments.config";

import { AppError } from "../../../../utils/errors";
import { HttpStatusCodes } from "../../../../constants/http_status_codes";
import {
  PaymentProviderRepository,
  CreatePaymentDTO,
  SessionRequestDTO,
  TransactionResponse,
} from "../payment-provider.repository";

import {
  NiubizSessionRequestBody,
  NiubizAuthorizationRequest,
  NiubizTransactionResponse,
} from "./niubiz.types";

import { mapNiubizToTransaction } from "./niubiz.mapper";

export class NiubizProvider implements PaymentProviderRepository {
  /** Paso 1: obtener token de seguridad */
  async getAccessToken(): Promise<string> {
    try {
      const { data } = await axios.get(NIUBIZ_URL_SECURITY, {
        auth: {
          username: NIUBIZ_USER,
          password: NIUBIZ_PWD,
        },
      });
      return data as string;
    } catch (err: any) {
      throw new AppError(
        "NIUBIZ_AUTH_ERROR",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }
  }

  /** Paso 2: generar sesión para el formulario */
  async getSessionToken(
    accessToken: string,
    dto: SessionRequestDTO
  ): Promise<string> {
    const payload: NiubizSessionRequestBody = {
      channel: "web",
      amount: dto.amount,
      purchaseNumber: dto.purchaseNumber,
      antifraud: dto.metadata?.antifraud,
      dataMap: dto.metadata?.dataMap,
    };

    const headers = {
      Authorization: accessToken,
      "Content-Type": "application/json",
    };

    try {
      const { data } = await axios.post(NIUBIZ_URL_SESSION, payload, {
        headers,
      });
      return data.sessionKey;
    } catch (err: any) {
      throw new AppError(
        "NIUBIZ_SESSION_ERROR",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
  }

  /** Paso 3: obtener URL del script */
  async getCheckoutScript(): Promise<string> {
    return NIUBIZ_URL_JS;
  }

  /** Paso 4: validación (autorización) del token de transacción */
  async validateTransaction(
    data: CreatePaymentDTO
  ): Promise<TransactionResponse> {
    if (!data.transactionToken) {
      throw new AppError(
        "MISSING_TRANSACTION_TOKEN",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const accessToken = await this.getAccessToken();

    const body: NiubizAuthorizationRequest = {
      channel: "web",
      captureType: "manual",
      countable: true,
      order: {
        tokenId: data.transactionToken.toUpperCase(),
        purchaseNumber: data.purchaseNumber,
        amount: data.amount,
        currency: data.currency,
      },
      dataMap: data.dataMap,
    };

    const headers = {
      Authorization: accessToken,
      "Content-Type": "application/json",
    };

    try {
      const { data: resp } = await axios.post(NIUBIZ_URL_AUTHORIZATION, body, {
        headers,
      });
      return mapNiubizToTransaction(resp as NiubizTransactionResponse);
    } catch (err: any) {
      console.error("[Niubiz] validateTransaction failed:", err.response?.data);
      throw new AppError(
        "NIUBIZ_VALIDATION_ERROR",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
  }

  /** Paso 5: flujo resumido para crear pago */
  async createPayment(data: CreatePaymentDTO): Promise<TransactionResponse> {
    return this.validateTransaction(data);
  }
}
