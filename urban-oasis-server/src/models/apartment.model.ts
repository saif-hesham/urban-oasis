import { WithId } from "mongodb";
import mongoose, { InferSchemaType } from "mongoose";
import { apartmentSchema } from "../schemas/apartment-schema";

export type ApartmentType = InferSchemaType<typeof apartmentSchema>;
export type ApartmentWithId = WithId<ApartmentType>;

export default mongoose.model("Apartment", apartmentSchema);
