import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. extract the token from header
  const token = req.headers.authorization as any;
  // 2. if token is not present , throw an error of unauthorized
  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
  try {
    // 3. if the token is present, verify the token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;
    // 4. to get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    // 5. to attach the user to the current request object
    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
