import { AuthenticatedRequest } from "../../middlewares/authenticate_token";
import { PrismaClient } from "@prisma/client";
import { LoggedUser } from "../../modules/user/features/edit_profile/presentation/edit_profile.service";
import { AppError } from "../errors";
import { HttpStatusCodes } from "../../constants";

const prisma = new PrismaClient();

export const getAuthenticatedUser = async (
  req: AuthenticatedRequest
): Promise<LoggedUser> => {
  const id = req.user?.id;

  if (!id)
    throw new AppError(
      "Unauthorized, user not authenticated",
      HttpStatusCodes.UNAUTHORIZED.code
    );

  const user = await prisma.users.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      user_type: true,
      status: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      adminDetails: { select: { role: true } },
    },
  });

  if (!user.user_type) {
    throw new AppError(
      "User type not set in DB",
      HttpStatusCodes.INTERNAL_SERVER_ERROR.code
    );
  }
  return {
    ...user,
    user_type: user.user_type as "admin" | "client",
  };
};
