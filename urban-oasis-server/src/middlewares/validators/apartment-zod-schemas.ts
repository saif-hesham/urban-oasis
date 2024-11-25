import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
});

const apartmentSchema = z.object({
  unitNumber: z.number().int().positive(),
  unitName: z.string().min(1),
  price: z.number().positive(),
  listingType: z.enum(["Sale", "Rental"]),
  description: z.string().min(1),
  image: z.string().url(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  project: z.string().min(1),
  amenities: z.array(z.string()).optional().nullable(),
  sizeInMeterSquared: z.number().positive(),
  address: addressSchema,
});

const getApartmentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  unitName: z.string().optional(),
  unitNumber: z.coerce.number().int().optional(),
  project: z.string().optional(),
});

const paramsWithIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid MongoDB ObjectId",
  }),
});

type ParamsWithId = z.infer<typeof paramsWithIdSchema>;

export {
  apartmentSchema,
  addressSchema,
  getApartmentsQuerySchema,
  paramsWithIdSchema,
  ParamsWithId,
};
