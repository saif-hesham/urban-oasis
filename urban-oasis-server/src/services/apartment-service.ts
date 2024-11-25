import Apartment, { ApartmentType } from '../models/apartment-model';
import { GetApartmentsRequest } from '../types/types';
import Constants from './../constants/constants';

export const getApartments = async (query: GetApartmentsRequest) => {
  const { page = 1, limit = 10, unitName, unitNumber, project } = query;
  let dbQuery = Apartment.find(
    {},
    {
      unitName: 1,
      unitNumber: 1,
      price: 1,
      sizeInMeterSquared: 1,
      image: 1,
      bathrooms: 1,
      bedrooms: 1,
      listingType: 1,
      project: 1,
      "address.state": 1,
    }
  );

  if (unitName) {
    dbQuery = dbQuery.where("unitName").regex(new RegExp(unitName, "i"));
  } else if (unitNumber) {
    dbQuery = dbQuery.where("unitNumber").equals(unitNumber);
  } else if (project) {
    dbQuery = dbQuery.where("project").regex(new RegExp(project, "i"));
  }

  const totalDocuments = await Apartment.countDocuments(dbQuery.getFilter());
  const totalPages = Math.ceil(totalDocuments / limit);
  
  const skipCount = (page - 1) * limit;
  //:TODO: implement throwing an error when skip count is greater than total documents
  dbQuery = dbQuery.skip(skipCount).limit(limit);
  const apartments = await dbQuery;

  return {
    count: apartments.length,
    currentPage: page,
    totalPages,
    data: apartments,
  };
};

export const findApartmentById = async (id: string) => {
  const apartment = await Apartment.findById(id);
  if (!apartment) {
    const error = new Error(`Apartment with id ${id} was not found`);
    error.name = Constants.NOT_FOUND_ERROR;
    throw error;
  }
  return apartment;
};

export const createApartment = async (apartmentData: ApartmentType) => {
  const apartment = await Apartment.create(apartmentData);
  return apartment;
};