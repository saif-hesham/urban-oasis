/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import CreatePopup from "@/components/CreatePopup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createApartment } from "@/lib/api/add-apartment-action"
import { AMENITIES_OPTIONS, amenitiesSchema, ApartmentFormFields, apartmentFormSchema } from "@/types/zod-schemas"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'



export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<ApartmentFormFields>({
    resolver: zodResolver(apartmentFormSchema),
  });

  const onSubmit : SubmitHandler<ApartmentFormFields> = async (data) => {

    //reset error message
    setErrMessage(null);

    // validate amenities
    if (selectedAmenities.length > 0) {
      const result = amenitiesSchema.safeParse(selectedAmenities);
      if (!result.success) {
        setError("amenities", {
          type: "manual",
          message: "Please select valid amenities",
        });
        return;
      } else {
        data.amenities = result.data;
      }
    }
    // create apartment
    const response = await createApartment(data)
    if (response.error) {
      setErrMessage(response.error)
    }
    setShowPopup(true);
    reset();
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setShowPopup(true)
  // }

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
          <CardTitle className="text-3xl font-extrabold text-white">
            Create New Apartment Listing
          </CardTitle>
          <p className="mt-2 text-white text-opacity-80">
            Fill in the details to list your apartment
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {Object.keys(errors).length > 0 && (
              <div className="text-red-500 text-sm mb-4">
                Please correct the errors in the form and try again.
              </div>
            )}
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <Label htmlFor="unitNumber" className="flex items-center ml-0.5 mb-3">
                  Unit Number <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    {...register("unitNumber")}
                    type="number"
                    placeholder="e.g. 101"
                  />
                </div>
                {errors.unitNumber && ( <span className="text-red-500 text-sm">{errors.unitNumber.message}</span> )}
              </div>

              <div>
                <Label htmlFor="unitName" className="flex items-center ml-0.5 mb-3">
                  Unit Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  {...register("unitName")}
                  type="text"
                  placeholder="e.g. Sunny Corner Apartment"
                />
                {errors.unitName && ( <span className="text-red-500 text-sm">{errors.unitName.message}</span> )}

              </div>

              <div>
                <Label htmlFor="price" className="flex items-center ml-0.5 mb-3">
                  Price <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    {...register("price")}
                    type="number"
                    placeholder="e.g. 1500"
                  />
                </div>
                {errors.price && ( <span className="text-red-500 text-sm">{errors.price.message}</span> )}
              </div>

              <div>
                <Label htmlFor="listingType" className="flex items-center ml-0.5 mb-3">
                  Listing Type <span className="text-red-500 ml-1">*</span>
                </Label>
                <select {...register("listingType")} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="Rental">Rent</option>
                  <option value="Sale">Sale</option>
                </select>
                {errors.listingType && ( <span className="text-red-500 text-sm">{errors.listingType.message}</span> )}

              </div>

              <div>
                <Label htmlFor="bedrooms" className="flex items-center ml-0.5 mb-3">
                  Bedrooms <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    {...register("bedrooms")}
                    type="number"
                    placeholder="e.g. 2"
                  />
                </div>
                {errors.bedrooms && ( <span className="text-red-500 text-sm">{errors.bedrooms.message}</span> )}
              </div>

              <div>
                <Label htmlFor="bathrooms" className="flex items-center ml-0.5 mb-3">
                  Bathrooms <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    {...register("bathrooms")}
                    type="number"
                    placeholder="e.g. 1"
                  />
                </div>
                {errors.bathrooms && ( <span className="text-red-500 text-sm">{errors.bathrooms.message}</span> )}
              </div>

              <div>
                <Label htmlFor="size" className="flex items-center ml-0.5 mb-3">
                  Size (m²) <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    {...register("sizeInMeterSquared")}
                    type="number"
                    placeholder="e.g. 75"
                  />
                </div>
                {errors.sizeInMeterSquared && ( <span className="text-red-500 text-sm">{errors.sizeInMeterSquared.message}</span> )}
              </div>

              <div>
                <Label htmlFor="project" className="flex items-center ml-0.5 mb-3">
                  Project <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. Skyline Residences"
                  {...register("project")}
                />
                {errors.project && ( <span className="text-red-500 text-sm">{errors.project.message}</span> )}
              </div>

            </div>

            <div>
              <Label htmlFor="description" className="flex items-center ml-0.5 mb-3">
                Description <span className="text-red-500 ml-1">*</span>
              </Label>
              <Textarea
                {...register("description")}
                rows={3}
                placeholder="Describe the apartment..."
              />
              {errors.description && ( <span className="text-red-500 text-sm">{errors.description.message}</span> )}

            </div>

            <div>
              <Label htmlFor="image" className="flex items-center ml-0.5 mb-3">
                Image URL <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                {...register("image")}
                type="url"
                placeholder="https://example.com/apartment-image.jpg"
              />
              {errors.image && ( <span className="text-red-500 text-sm">{errors.image.message}</span> )}

            </div>

            <div>
              <Label>Amenities</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {AMENITIES_OPTIONS.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityChange(amenity)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
                  {errors.amenities && ( <span className="text-red-500 text-sm">{errors.amenities.message}</span> )}

              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <Label htmlFor="street" className="flex items-center ml-0.5 mb-3">
                  Street <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    type="text"
                    placeholder="e.g. 123 Main St"
                    {...register("address.street")} 
                  />
                </div>
                {errors.address?.street && ( <span className="text-red-500 text-sm">{errors.address?.street?.message}</span> )}

              </div>

              <div>
                <Label htmlFor="city" className="flex items-center ml-0.5 mb-3">
                  City <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. New York"
                  {...register("address.city")}
                />
                {errors.address?.city && ( <span className="text-red-500 text-sm">{errors.address?.city?.message}</span> )}

              </div>

              <div>
                <Label htmlFor="state" className="flex items-center ml-0.5 mb-3">
                  State <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. NY"
                  {...register("address.state")}
                />
                {errors.address?.state && ( <span className="text-red-500 text-sm">{errors.address?.state?.message}</span> )}

              </div>

              <div>
                <Label htmlFor="zipCode" className="flex items-center ml-0.5 mb-3">
                  Zip Code <span className="text-red-500 ml-1 ">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. 10001"
                  {...register("address.zipCode")}
                />
                {errors.address?.zipCode && ( <span className="text-red-500 text-sm">{errors.address?.zipCode?.message}</span> )}

              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Apartment Listing'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <CreatePopup showPopup={showPopup} setShowPopup={setShowPopup} errMessage={errMessage} />
      
    </div>
  )
}