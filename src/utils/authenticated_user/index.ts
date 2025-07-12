// src/utils/authenticated_user
import { AuthenticatedRequest } from "../../middlewares/authenticate_token";
import { PrismaClient } from "@prisma/client";
import { LoggedUser } from "../../modules/user/features/edit_profile/presentation/edit_profile.service";

const prisma = new PrismaClient();

export const getAuthenticatedUser = async (
  req: AuthenticatedRequest,
): Promise<LoggedUser> => {
  const id = req.user?.id;
  if (!id) throw new Error("Usuario no autenticado");

  const user = await prisma.users.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      user_type: true,
      status: true,
      adminDetails: { select: { role: true } },
    },
  });

  if (!user.user_type) {
    throw new Error("User type not set in DB");
  }
  return {
    ...user,
    user_type: user.user_type as "admin" | "client",
  };
};
