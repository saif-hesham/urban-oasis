import mongoose from "mongoose";

export const apartmentSchema = new mongoose.Schema({
  unitNumber: { type: Number, required: true, unique: true },
  unitName: { type: String, required: true },
  price: { type: Number, required: true },
  listingType: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  project: { type: String, required: true },
  amenities: { type: [String], required: false },
  sizeInMeterSquared: { type: Number, required: true },
  address: {
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    required: true,
  },
});