import { Router } from 'express';
import { signUpController } from '../controllers/auth-controller';
import { validateRequest } from '../middlewares/middlewares';
import { userZodSchema } from '../middlewares/validators/user-zod-schema';

const router = Router();

// POST /signup
router.post(
  '/signup',
  validateRequest({ bodySchema: userZodSchema }),
  signUpController
);

export default router;