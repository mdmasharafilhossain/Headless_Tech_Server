import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../utilis/AppError";


export const validateRequest =
(schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((error) => error.message)
        .join(", ");
      return next(AppError.badRequest(errorMessage));
    }

    req.body = validationResult.data;
    next();
  };