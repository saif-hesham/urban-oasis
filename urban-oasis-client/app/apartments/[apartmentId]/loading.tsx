import { Card, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Bath, BedDouble, DollarSign, Home, MapPin, Maximize, Tag } from "lucide-react"

export default function Loading() {
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='max-w-6xl mx-auto overflow-hidden shadow-lg'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/3 h-64 md:h-auto relative'>
            <Skeleton className='h-full w-full' />
          </div>
          <div className='p-8 w-full'>
            <div className='flex justify-between items-start'>
              <div>
                <Skeleton className='h-8 w-64 mb-2' />
                <Skeleton className='h-4 w-32' />
              </div>
              <Skeleton className='h-6 w-24' />
            </div>

            <div className='mt-4 flex items-center text-gray-700 mb-7'>
              <MapPin className='h-5 w-5 text-gray-400 mr-2' />
              <Skeleton className='h-4 w-full max-w-md' />
            </div>

            <div className='mt-4 flex justify-between items-center'>
              <div className='flex space-x-4'>
                <div className='flex items-center'>
                  <BedDouble className='h-5 w-5 text-gray-400 mr-2' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex items-center'>
                  <Bath className='h-5 w-5 text-gray-400 mr-2' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex items-center'>
                  <Maximize className='h-5 w-5 text-gray-400 mr-2' />
                  <Skeleton className='h-4 w-16' />
                </div>
              </div>
              <div className='flex items-center'>
                <DollarSign className='h-6 w-6 text-gray-400 mr-1' />
                <Skeleton className='h-6 w-24' />
              </div>
            </div>

            <Separator className='my-6' />

            <div>
              <Skeleton className='h-6 w-32 mb-2' />
              <Skeleton className='h-4 w-full mb-2' />
              <Skeleton className='h-4 w-full mb-2' />
              <Skeleton className='h-4 w-3/4' />
            </div>

            <Separator className='my-6' />

            <div>
              <Skeleton className='h-6 w-32 mb-2' />
              <div className='flex flex-wrap gap-2'>
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className='h-6 w-20' />
                ))}
              </div>
            </div>

            <Separator className='my-6' />

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Home className='h-5 w-5 text-gray-400 mr-2' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='flex items-center'>
                <Tag className='h-5 w-5 text-gray-400 mr-2' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
          </div>
        </div>
        <CardFooter className='bg-gray-50 px-8 py-4'>
          <div className='w-full flex justify-between items-center'>
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-10 w-32' />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}