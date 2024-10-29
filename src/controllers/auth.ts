import { NextFunction, Request, Response } from "express";
import { SignupSchema } from "../schema/users";
import { addUserService, loginUserService } from "../services/auth.service";
import { User } from "@prisma/client";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<User>> => {
  SignupSchema.parse(req.body);
  const { email, password, name } = req.body;

  let user = await addUserService({ email, password, name });
  return res.json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<{ user: User; token: string }>> => {
  const { email, password } = req.body;

  const data = await loginUserService({ email, password });

  return res.json(data);
};

export const me = async (req: Request, res: Response) => {
  res.json(req?.user);
};
