//src/modules/auth/features/login/login_with_email/domain/login_with_email.use_case.ts
import { generateToken } from "../../../../../../infrastructure/jwt";
import { LoginDTO, LoginResponseDTO } from "./login_with_email.dto";
import { LoginRepository } from "../data/login_with_email.repository";
import { AppError } from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants";
import bcrypt from "bcrypt";
import prisma from "../../../../../../config/prisma_client";

export class LoginUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.loginRepository.getEmail(data.email);
    if (!user) {
      throw new AppError("User not found", HttpStatusCodes.NOT_FOUND.code);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        "Invalid credentials",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    if (!user.isVerified()) {
      throw new AppError(
        "User is not verified",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    let adminRole: string | undefined = undefined;

    if (user.user_type === "admin") {
      const adminData = await prisma.adminDetails.findUnique({
        where: { admin_id: user.id },
        select: { role: true },
      });

      if (adminData) {
        adminRole = adminData.role;
      }
    }

    const token = generateToken({
      id: user.id,
      user_type: user.user_type ?? "client",
      ...(adminRole ? { role: adminRole } : {}),
    });

    return {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        userType: user.user_type ?? null,
        role: adminRole ?? null,
      },
      token,
    };
  }
}
