//src/modules/newsletter/features/list_subscribe/domain/list_subscribe.dto.ts

export interface SubscriberDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ListSubscribeResponseDTO {
  subscribers: SubscriberDTO[];
  total: number;
  count: number;
}
