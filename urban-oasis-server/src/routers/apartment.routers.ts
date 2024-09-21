import { Router } from "express";
import { validateRequest } from "./../middlewares/middlewares";
import {
  createApartment,
  findApartmentById,
  getApartments,
} from "../handlers/apartment-handlers";
import {
  apartmentSchema,
  getApartmentsQuerySchema,
  paramsWithIdSchema,
} from "./../schemas/apartment-zod-schemas";

const router = Router();

router
  .route("/apartments")
  .get(
    validateRequest({ querySchema: getApartmentsQuerySchema }),
    getApartments
  )
  .post(validateRequest({ bodySchema: apartmentSchema }), createApartment);

  router
  .route("/apartments/:id")
  .get(
    validateRequest({ paramsSchema: paramsWithIdSchema }),
    findApartmentById
  );

export default router;
