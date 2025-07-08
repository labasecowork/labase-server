//src/modules/auth/features/password_reset/confirm_password_reset/data/confirm_password_reset.repository.ts
import prisma from "../../../../../../config/prisma_client";

export interface ConfirmPasswordResetRepository {
  updatePassword(email: string, password: string): Promise<void>;
}

export class ConfirmPasswordResetRepositoryImpl
  implements ConfirmPasswordResetRepository
{
  async updatePassword(email: string, password: string) {
    await prisma.users.update({
      where: { email },
      data: { password },
    });
  }
}
