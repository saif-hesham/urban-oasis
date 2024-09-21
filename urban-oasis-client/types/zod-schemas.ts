import { z } from "zod";

export const AMENITIES_OPTIONS = [
  "Pool",
  "Fully Equipped Gym",
  "Rooftop Terrace",
  "Private Parking",
  "24/7 Security",
  "High-Speed Internet",
  "BBQ Area",
  "Indoor Heated Pool",
  "Spa and Sauna",
] as const;

export const apartmentFormSchema = z.object({
  unitNumber: z.coerce.number().int().positive(),
  unitName: z.string().min(1, "Unit name is required"),
  price: z.coerce.number().positive(),
  listingType: z.enum(["Rental", "Sale"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Invalid image URL"),
  bedrooms: z.coerce.number().int().positive(),
  bathrooms: z.coerce.number().positive(),
  project: z.string().min(1, "Project name is required"),
  amenities: z.array(z.enum(AMENITIES_OPTIONS)).optional(),
  sizeInMeterSquared: z.coerce.number().positive(),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  }),
});

export const amenitiesSchema =   z.array(z.enum(AMENITIES_OPTIONS));

export const getApartmentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  unitName: z.string().optional(),
  unitNumber: z.coerce.number().int().optional(),
  project: z.string().optional(),
});

export const apartmentIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "Apartment ID must be a valid mongo ObjectId",
});



export type ApartmentFormFields = z.infer<typeof apartmentFormSchema>;