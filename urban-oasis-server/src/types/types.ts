import { AnyZodObject, ZodEffects } from "zod";
import { PartialApartment } from "../models/apartment-model";

export type GetApartmentsRequest = {
  page?: number;
  limit?: number;
  unitName?: string;
  unitNumber?: number;
  project?: string;
};


export type GetApartmentsResponse = {
  data: PartialApartment[];
  count: number;
  totalPages: number;
  currentPage: number;
};

export type ErrorResponse = {
  message: string;
  stack?: string;
};

export type RequestValidators = {
  bodySchema?: AnyZodObject | ZodEffects<any>;
  querySchema?: AnyZodObject;
  paramsSchema?: AnyZodObject;
};
