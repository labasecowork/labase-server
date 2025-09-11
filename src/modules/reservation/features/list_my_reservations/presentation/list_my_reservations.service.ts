import { ListMyReservationsRepository } from "../data/list_my_reservations.repository";

export class ListMyReservationsService {
  constructor(private readonly repo = new ListMyReservationsRepository()) {}

  async execute(userId: string, limit = 10, page = 1) {
    const take = limit;
    const skip = (page - 1) * take;

    const data = await this.repo.list(userId, skip, take);
    return { data, page, limit };
  }
}
