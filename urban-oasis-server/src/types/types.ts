import { AnyZodObject } from "zod";
import { ApartmentType } from "../models/apartment.model";

export type GetApartmentsRequest = {
  page?: number;
  limit?: number;
  unitName?: string;
  unitNumber?: number;
  project?: string;
};


export type GetApartmentsResponse = {
  data: ApartmentType[];
  count: number;
  totalPages: number;
  currentPage: number;
};

export type ErrorResponse = {
  message: string;
  stack?: string;
};

export type RequestValidators = {
  bodySchema?: AnyZodObject;
  querySchema?: AnyZodObject;
  paramsSchema?: AnyZodObject;
};
