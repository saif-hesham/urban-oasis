import { SearchParams } from "@/app/apartments/page";
import { apiUrl } from "@/environment";
import {Apartment, ApartmentResponse} from "@/types/apartment-types"
import { apartmentIdSchema, getApartmentsQuerySchema } from "@/types/zod-schemas";

const PAGE_LIMIT = "12";
export const BASE_URL = `${apiUrl}/apartment-management`;
// Fetch apartments list
export async function getApartments(searchParams: SearchParams): Promise<ApartmentResponse> {
  //set default page and limit
  if (!searchParams.page) searchParams.page = "1";
  const searchParamsString = new URLSearchParams({...searchParams, limit: PAGE_LIMIT}).toString()

  //validate query params before fetching
  const result = getApartmentsQuerySchema.safeParse(searchParams);
  if (!result.success) {
    //format error message from zod error object
    let message = "";
    message = result.error.errors
    .map(error => `${error.message} in ${error.path[0]}`)
    .join(". ");
    throw new Error('Invalid query params. ' + message);
  }
  const response = await fetch(`${BASE_URL}/apartments?${searchParamsString}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error('Failed to fetch apartments. ' + errorData.message);
  }
  return response.json();
}

// Fetch single apartment details
export async function getApartmentDetails(id: string): Promise<Apartment> {
  //validate id before fetching
  const result = apartmentIdSchema.safeParse(id);
  if (!result.success) {
    throw new Error('Invalid apartment id. ' + result.error.errors[0].message);
  }

  //fetch apartment details
  const response = await fetch(`${BASE_URL}/apartments/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error('Failed to fetch this apartment. ' + errorData.message);
  }
  return response.json();
}

