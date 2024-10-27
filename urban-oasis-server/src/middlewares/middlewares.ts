import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "../types/types";
import { RequestValidators } from "./../types/types";
import Constants from "./../constants/constants";

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
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  if (err instanceof ZodError) {
    statusCode = 422;
    message = err.errors
      .map(error => `${error.message} in ${error.path[0]}`)
      .join(". ");
  } else if (err.name === Constants.NOT_FOUND_ERROR) {
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🔥" : err.stack,
  });
}
