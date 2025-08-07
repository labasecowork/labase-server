// src/shared/payments/providers/niubiz/niubiz.types.ts

export interface NiubizSessionRequestBody {
  channel: "web";
  amount: number;
  purchaseNumber: string;
  antifraud?: Record<string, any>;
  dataMap?: Record<string, any>;
}

export interface NiubizAuthorizationRequest {
  channel: "web";
  captureType: "manual";
  countable: boolean;
  order: {
    tokenId: string;
    purchaseNumber: string;
    amount: number;
    currency: string;
  };
  dataMap: Record<string, any>;
}

export interface NiubizTransactionResponse {
  transactionToken: string;
  responseCode: string;
  purchaseNumber: string;
  amount: number;
  currency: string;
  status: string;
  success: boolean;

  dataMap?: {
    ACTION_CODE?: string;
    [key: string]: any;
  };

  // (Opcional) otros campos anidados como "order", "header", etc.
}

