// src/modules/user/features/edit_profile/service/edit_profile.service.ts
import bcrypt from "bcrypt";

import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { EditProfileDTO } from "../domain/edit_profile.dto";
import { EditProfileRepository } from "../data/edit_profile.repository";

export interface LoggedUser {
  id: string;
  user_type: "client" | "admin";
  status: "active" | "suspended" | "pending";
  adminDetails?: { role: "superadmin" | "manager" } | null;
}

export class EditProfileService {
  constructor(private readonly repo = new EditProfileRepository()) {}

  async execute(dto: EditProfileDTO, currentUser: LoggedUser) {
    if (currentUser.user_type === "client" && currentUser.status !== "active") {
      throw new AppError(
        "Inactive users cannot edit profile",
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    const data: Record<string, unknown> = {};

    if (dto.firstName)  data.first_name  = dto.firstName;
    if (dto.lastName)   data.last_name   = dto.lastName;
    if (dto.phone)      data.phone       = dto.phone;
    if (dto.birthDate)  data.birth_date  = dto.birthDate;
    if (dto.gender)     data.gender      = dto.gender;

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    const updatedUser = await this.repo.update(currentUser.id, data);
    return updatedUser;
  }
}
