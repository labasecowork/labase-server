import { LoggedUser } from "../../edit_profile/presentation/edit_profile.service";
import { GetProfileRepository } from "../data/get_profile.repository";

export class GetProfileService {
  constructor(private readonly repo = new GetProfileRepository()) {}

  async execute(currentUser: LoggedUser) {
    const user = await this.repo.getProfile(currentUser.id);
    return {
      ...user,
      user_type: user.user_type as "admin" | "client",
    };
  }
}
