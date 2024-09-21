import { Card, CardContent, CardFooter } from "./card";
import { Skeleton } from "./skeleton";

const ApartmentCardSkeleton = () => {
  return (
    <Card className='overflow-hidden group relative cursor-pointer transition-transform duration-300 hover:scale-105'>
      <div className='relative flex h-72'>
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className='p-4'>
        <Skeleton className="h-6 w-3/4 mb-6" />
        <div className='flex flex-wrap gap-2 mb-2'>
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardContent>
      <CardFooter className='px-4 py-3 bg-gray-50'>
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </Card>
  )
}
export default ApartmentCardSkeleton;