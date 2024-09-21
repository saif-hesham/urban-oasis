import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "../types/types";
import { RequestValidators } from "./../types/types";

export function validateRequest({
  bodySchema,
  querySchema,
  paramsSchema,
}: RequestValidators) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (bodySchema) bodySchema.parse(req.body);
      if (querySchema) querySchema.parse(req.query);
      if (paramsSchema) paramsSchema.parse(req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let message = "";
  if (err instanceof ZodError) {
    message = err.errors
      .map(error => `${error.message} in ${error.path[0]}`)
      .join(". ");
    res.status(422);
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: message || err.message,
    stack: process.env.NODE_ENV === "production" ? "🔥" : err.stack,
  });
}
