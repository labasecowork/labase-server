// src/shared/payments/providers/payment-provider.repository.ts

/**
 * Tipos y DTOs para los proveedores de pago
 */
/**
 * Tipos y DTOs para los proveedores de pago
 */
export type TransactionToken = string;
export type Currency = "PEN" | "USD";

/** Datos obligatorios en el paso 4 (authorization) */
export interface LocationDataMap {
  urlAddress: string;
  serviceLocationCityName: string;
  serviceLocationCountrySubdivisionCode: string; // "LIM"
  serviceLocationCountryCode: string;            // "PER"
  serviceLocationPostalCode: string;             // "15074"
}

/** 👉 Paso 2 – crear sessionKey */
export interface SessionRequestDTO {
  purchaseNumber: string;
  amount: number;
  currency: Currency;
  metadata?: {
    antifraud?: Record<string, any>;
    dataMap?: Record<string, any>;
  };
}

/** 👉 Paso 4 – autorizar transacción */
export interface CreatePaymentDTO {
  transactionToken: string;
  purchaseNumber: string;
  amount: number;
  currency: Currency;
  dataMap: LocationDataMap;        // ← obligatorio para 406
  metadata?: Record<string, any>;
}

export interface TransactionResponse {
  transactionToken: TransactionToken;
  responseCode?: string;
  success?: boolean;
  purchaseNumber: string;
  amount: number;
  currency: Currency;
  rawData?: any;
}

/** Interfaz común para todos los providers */
export interface PaymentProviderRepository {
  getAccessToken(): Promise<string>;
  getSessionToken(
    accessToken: string,
    data: SessionRequestDTO
  ): Promise<string>;
  validateTransaction(
    data: CreatePaymentDTO
  ): Promise<TransactionResponse>;
  createPayment(data: CreatePaymentDTO): Promise<TransactionResponse>;
  getCheckoutScript(): Promise<string>;    
}