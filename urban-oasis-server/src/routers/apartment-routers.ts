import { Router } from 'express';
import { validateRequest } from '../middlewares/middlewares';


import { apartmentSchema, getApartmentsQuerySchema, paramsWithIdSchema } from '../schemas/zod/apartment-zod-schemas';
import {
  createApartmentController,
  findApartmentByIdController,
  getApartmentsController,
} from './../controllers/apartment-controllers';

const router = Router();

// GET /apartments
router.get(
  '/apartments',
  validateRequest({ querySchema: getApartmentsQuerySchema }),
  getApartmentsController
);

// POST /apartments
router.post(
  '/apartments',
  validateRequest({ bodySchema: apartmentSchema }),
  createApartmentController
);

// GET /apartments/:id
router.get(
  '/apartments/:id',
  validateRequest({ paramsSchema: paramsWithIdSchema }),
  findApartmentByIdController
);

export default router;
