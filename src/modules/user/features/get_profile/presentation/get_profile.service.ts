import { CurrentUser } from "../../../../../utils/authenticated_user";
import { GetProfileRepository } from "../data/get_profile.repository";
import { GetProfileResponseDto } from "../domain/get_profile.dto";

export class GetProfileService {
  constructor(private readonly repo = new GetProfileRepository()) {}

  async execute(user: CurrentUser): Promise<GetProfileResponseDto> {
    const profile = await this.repo.getProfile(user.id);

    if (
      !profile.user_type ||
      (profile.user_type !== "admin" &&
        profile.user_type !== "client" &&
        profile.user_type !== "employee")
    ) {
      throw new Error("Tipo de usuario inválido en base de datos");
    }

    return {
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phone: profile.phone,
      birth_date: profile.birth_date,
      gender: profile.gender,
      user_type: profile.user_type,
      status: profile.status,
      admin_details: profile.admin_details ?? null,
    };
  }
}
