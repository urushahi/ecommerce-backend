import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import { createUser, getUserByEmail } from "../repository/user.repository";
import { NotFoundException } from "../exceptions/not-found";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const addUserService = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<User> => {
  const { email, password, name } = data;

  const userExists = await getUserByEmail(email);
  if (userExists) {
    throw new BadRequestsException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const user = await createUser({ email, password, name });
  return user;
};

export const loginUserService = async (data: {
  email: string;
  password: string;
}): Promise<{user: User; token: string}> => {
  const { email, password } = data;

  const user = await getUserByEmail(email);
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestsException(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return { user, token };
};
