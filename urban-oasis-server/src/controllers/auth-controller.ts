import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from "http-status-codes";
import { UserDTO } from '../models/user-model';
import { signUpUser } from "../services/user-service";
import asyncHandler from '../utils/utils';

export const signUpController = asyncHandler( async(req: Request<{}, {}, UserDTO>, res: Response, next: NextFunction) => {
  const newUser = await signUpUser(req.body);
  res.status(HttpStatusCodes.CREATED).json(newUser);
});