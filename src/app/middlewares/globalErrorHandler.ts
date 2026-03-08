import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { AppError } from "../utilis/AppError";


export const globalErrorHandler = (err: Error | AppError,req: Request,res: Response,_next: NextFunction)=>{
let error: AppError;
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (err instanceof ZodError) {

    const formattedErrors = err.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");

    error = new AppError(formattedErrors || "Validation failed", 400);
  }

  else if ((err as any).code === 11000) {

    const duplicatedField = Object.keys((err as any).keyValue).join(", ");
    error = new AppError(`Duplicate value for field: ${duplicatedField}`, 400);
  }

  else if (err instanceof mongoose.Error.ValidationError){

    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new AppError(message, 400);
  }

  else if (err instanceof mongoose.Error.CastError) {
    error = new AppError("Invalid resource ID", 400);

  }

  else if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);

  }
  else if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  else if (err instanceof AppError){
    error = err;
  }
  else {

    error = new AppError("Internal Server Error", 500);
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};