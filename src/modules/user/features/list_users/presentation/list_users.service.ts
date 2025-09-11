import { ListUsersRepository } from "../data/list_users.repository";

export class ListUsersService {
  constructor(private readonly repo = new ListUsersRepository()) {}

  async execute() {
    return this.repo.listMany();
  }
}
