import { NextFunction, Request, Response } from 'express';
import Apartment, {
  ApartmentType,
  ApartmentWithId,
} from '../models/apartment.model';
import { GetApartmentsRequest, GetApartmentsResponse } from '../types/types';
import { ParamsWithId } from './../schemas/apartment-zod-schemas';
import asyncHandler from './../utils/utils';

export const getApartments = asyncHandler(async (
  req: Request<{}, {}, {}, GetApartmentsRequest>,
  res: Response<GetApartmentsResponse>,
  next: NextFunction
) => {
  const { page = 1, limit = 10, unitName, unitNumber, project } = req.query;
  let query = Apartment.find();

  if (unitName) {
    query = query.where("unitName").regex(new RegExp(unitName, "i"));
  } else if (unitNumber) {
    query = query.where("unitNumber").equals(unitNumber);
  } else if (project) {
    query = query.where("project").regex(new RegExp(project, "i"));
  }

  const totalDocuments = await Apartment.countDocuments(query.getFilter());
  const totalPages = Math.ceil(totalDocuments / limit);
  
  const skipCount = (page - 1) * limit;
  query = query.skip(skipCount).limit(limit);
  const apartments = await query;

  res.status(200).json({
    count: apartments.length,
    currentPage: page,
    totalPages,
    data: apartments,
  });
});

export const findApartmentById = asyncHandler(async (
  req: Request<ParamsWithId>,
  res: Response<ApartmentWithId>,
  next: NextFunction
) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    res.status(404);
    throw new Error(`Apartment with id ${req.params.id} was not found`);
  }
  res.status(200).json(apartment);
});

export const createApartment = asyncHandler(async (
  req: Request<{}, ApartmentWithId, ApartmentType>,
  res: Response<ApartmentWithId>,
  next: NextFunction
) => {
  const apartment = await Apartment.create(req.body);
  res.status(201).json(apartment);
});
