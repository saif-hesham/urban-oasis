type AddressType = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type Apartment = {
  _id: number;
  unitNumber: number;
  unitName: string;
  price: number;
  listingType: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  project: string;
  amenities?: string[];
  sizeInMeterSquared: number;
  address: AddressType;
};

export type ApartmentWithoutId = Omit<Apartment, "_id">;
export type PartialApartment = Omit<Apartment, 'amenities' | 'address' | 'description'> & {address: {state: string}};

export type  ApartmentResponse = {
  data: PartialApartment[];
  count: number;
  totalPages: number;
  currentPage: number;
};