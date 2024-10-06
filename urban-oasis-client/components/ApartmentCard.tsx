import { PartialApartment } from '@/types/apartment-types';
import { Bath, BedDouble, Maximize } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';

export default function ApartmentCard({
  apartment,
}: {
  apartment: PartialApartment;
}) {
  return (
    <Link href={`/apartments/${apartment._id}`}>
      <Card className='overflow-hidden group relative cursor-pointer transition-transform duration-300 hover:scale-105'>
        <div className='relative flex h-72'>
          <Image
            fill
            src={apartment.image}
            alt={apartment.unitName}
            className='object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4'>
            <div className='flex justify-between text-white w-full'>
              <span className='flex items-center'>
                <BedDouble className='mr-1 h-4 w-4' /> {apartment.bedrooms}
              </span>
              <span className='flex items-center'>
                <Bath className='mr-1 h-4 w-4' /> {apartment.bathrooms}
              </span>
              <span className='flex items-center'>
                <Maximize className='mr-1 h-4 w-4' />{' '}
                {apartment.sizeInMeterSquared} m²
              </span>
            </div>
          </div>
        </div>
        <CardContent className='p-4'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6'>
            {apartment.unitNumber}- {apartment.unitName}
          </h2>
          <div className='flex flex-wrap gap-2 mb-2'>
            <Badge variant='secondary'>{apartment.listingType}</Badge>
            <Badge variant='outline'>{apartment.address.state}</Badge>
            <Badge className='bg-blue-100 text-blue-800 hover:bg-blue-200'>
              {apartment.project}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className='px-4 py-3 bg-gray-50'>
          <p className='text-2xl font-bold text-blue-600'>
            ${apartment.price.toLocaleString()}
            {apartment.listingType === 'Rent' ? '/mo' : ''}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
