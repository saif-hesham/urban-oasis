"use server"

import { ApartmentWithoutId } from "@/types/apartment-types";
import { apartmentFormSchema } from "@/types/zod-schemas";
import { BASE_URL } from "./api";
import { revalidatePath } from "next/cache";

export async function createApartment(data: ApartmentWithoutId) {
  //validate data before sending
  const result = apartmentFormSchema.safeParse(data);
  if (!result.success) {
    //format error message from zod error object
    let message = "";
    message = result.error.errors
    .map(error => `${error.message} in ${error.path[0]}`)
    .join(". ");
    return {error: 'Invalid apartment data. ' + message};
  }

  //send data to server
  const response = await fetch(`${BASE_URL}/apartments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return {error: 'Failed to create apartment. ' + errorData.message};
  }
  revalidatePath('/apartments');
  return {success: true};
}