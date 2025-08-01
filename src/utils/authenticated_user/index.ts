import prisma from "../../config/prisma_client";
import { AuthenticatedRequest } from "../../middlewares/authenticate_token";
import { LoggedUser } from "../../modules/user/features/edit_profile/presentation/edit_profile.service";
import { AppError } from "../errors";
import { HttpStatusCodes } from "../../constants/http_status_codes";

export const getAuthenticatedUser = async (
  req: AuthenticatedRequest
): Promise<LoggedUser> => {
  const id = req.user?.id;
  if (!id) {
    throw new AppError(
      "Token de autenticación no válido o no proporcionado",
      HttpStatusCodes.UNAUTHORIZED.code
    );
  }

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
    throw new AppError(
      "Tipo de usuario no configurado en la base de datos",
      HttpStatusCodes.INTERNAL_SERVER_ERROR.code
    );
  }
  return {
    ...user,
    user_type: user.user_type as "admin" | "client",
  };
};
