import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getApartmentDetails } from "@/lib/api/api";
import { Bath, BedDouble, ChevronLeft, DollarSign, Home, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function page({params} :{params: {apartmentId: string}}) {
  const {
    unitName, 
    unitNumber, 
    price, 
    listingType, 
    description, 
    image, 
    bedrooms, 
    bathrooms, 
    project, 
    amenities, 
    sizeInMeterSquared, 
    address 
  }  = await getApartmentDetails(params.apartmentId);
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='max-w-6xl mx-auto overflow-hidden shadow-lg'>
      <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/3 h-64 md:h-auto relative'>
            <Image
              src={image}
              alt={unitName}
              fill
              className='absolute inset-0 object-cover'
            />
          </div>
          <div className='p-8 w-full'>
            <div className='flex justify-between items-start'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
                  {unitName}
                </h1>
                <p className='mt-1 text-sm text-gray-500'>Unit {unitNumber}</p>
              </div>
              <Badge variant='secondary' className='text-lg font-semibold'>
                {listingType}
              </Badge>
            </div>

            <div className='mt-4 flex items-center text-gray-700 mb-7'>
              <MapPin className='h-5 w-5 text-gray-400 mr-2' />
              <span>{`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}</span>
            </div>

            <div className='mt-4 flex justify-between items-center'>
              <div className='flex space-x-4'>
                <div className='flex items-center'>
                  <BedDouble className='h-5 w-5 text-gray-400 mr-2' />
                  <span>{bedrooms} Beds</span>
                </div>
                <div className='flex items-center'>
                  <Bath className='h-5 w-5 text-gray-400 mr-2' />
                  <span>{bathrooms} Baths</span>
                </div>
                <div className='flex items-center'>
                  <Maximize className='h-5 w-5 text-gray-400 mr-2' />
                  <span>{sizeInMeterSquared} m²</span>
                </div>
              </div>
              <div className='flex items-center'>
                <DollarSign className='h-6 w-6 text-green-500 mr-1' />
                <span className='text-2xl font-bold text-green-500'>
                  {price.toLocaleString()}
                </span>
                <span className='text-gray-500 ml-1'>
                  {listingType === "Rental" ? "/month" : ""}
                </span>
              </div>
            </div>

            <Separator className='my-6' />

            <div>
              <h2 className='text-xl font-semibold mb-2'>Description</h2>
              <p className='text-gray-600'>{description}</p>
            </div>

            {
              amenities && amenities?.length > 0 &&
            <>
              <Separator className='my-6' />

              <div>
                <h2 className='text-xl font-semibold mb-4'>Amenities</h2>
                <div className='flex flex-wrap gap-2'>
                  {amenities.map((amenity, index) => (
                    <Badge key={index} variant='secondary'>
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
            
            }

            <Separator className='my-6' />

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Home className='h-5 w-5 text-gray-400 mr-2' />
                <span className='text-gray-600'>{project}</span>
              </div>
            </div>
          </div>
        </div>
        <CardFooter className='bg-gray-50 px-8 py-4'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/apartments">
              <Button><ChevronLeft /> Back to Apartments</Button>
            </Link>
            <Button variant='outline'>Contact Agent</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
