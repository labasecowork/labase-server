import { SeedRepository } from "../data/seed.repository";

export class SeedService {
  constructor(private readonly repository = new SeedRepository()) {}
  async execute() {
    const data = await this.repository.seed();
    return data;
  }
}
