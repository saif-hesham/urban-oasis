import { NextFunction, Request, Response } from 'express';
import { ApartmentType, ApartmentWithId } from '../models/apartment-model';
import { ParamsWithId } from '../middlewares/validators/apartment-zod-schemas';
import {
  createApartment,
  findApartmentById,
  getApartments,
} from '../services/apartment-service';
import { GetApartmentsRequest, GetApartmentsResponse } from '../types/types';
import asyncHandler from './../utils/utils';

export const getApartmentsController = asyncHandler(
  async (
    req: Request<{}, {}, {}, GetApartmentsRequest>,
    res: Response<GetApartmentsResponse>,
    next: NextFunction
  ) => {
    const apartments = await getApartments(req.query);
    res.status(200).json(apartments);
  }
);

export const findApartmentByIdController = asyncHandler(
  async (req: Request<ParamsWithId>, res: Response, next: NextFunction) => {
    const apartment = await findApartmentById(req.params.id);
    res.status(200).json(apartment);
  }
);

export const createApartmentController = asyncHandler(
  async (
    req: Request<{}, ApartmentWithId, ApartmentType>,
    res: Response<ApartmentWithId>,
    next: NextFunction
  ) => {
    const apartment = await createApartment(req.body);
    res.status(201).json(apartment);
  }
);
