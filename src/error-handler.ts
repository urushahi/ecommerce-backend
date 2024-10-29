import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { BadRequestsException } from "./exceptions/bad-requests";
import { ZodError } from "zod";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err: any) {
      let exception: HttpException;
      if (err instanceof HttpException) {
        exception = err;
      } else {
        if (err instanceof ZodError) {
          exception = new BadRequestsException(
            "Unprocessable entity",
            ErrorCode.UNPROCESSABLE_ENTITY,
            err
          );
        } else {
          exception = new InternalException(
            "Something Went Wrong",
            err,
            ErrorCode.INTERNAL_EXCEPTION
          );
        }
      }
      next(exception);
    }
  };
};
