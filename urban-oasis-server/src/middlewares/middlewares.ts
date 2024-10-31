import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { ZodError } from "zod";
import { ErrorResponse } from "../types/types";
import Constants from "./../constants/constants";
import { RequestValidators } from "./../types/types";

export function validateRequest({bodySchema, querySchema, paramsSchema}: RequestValidators) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (bodySchema) req.body = bodySchema.parse(req.body);
      if (querySchema) querySchema.parse(req.query);
      if (paramsSchema) paramsSchema.parse(req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(HttpStatusCodes.NOT_FOUND);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let statusCode = res.statusCode !== HttpStatusCodes.OK ? res.statusCode : HttpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message;

  if (err instanceof ZodError) {
    statusCode = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    message = err.errors
      .map(error => `${error.message} in ${error.path[0]}`)
      .join(". ");
  } else if (err.name === Constants.NOT_FOUND_ERROR) {
    statusCode = HttpStatusCodes.NOT_FOUND;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === Constants.PRODUCTION_ENV ? "🔥" : err.stack,
  });
}
