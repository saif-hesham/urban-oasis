import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

const PaginatorSkeleton = () => {
  return (
    <div className='mt-8 flex justify-center items-center space-x-2'>
      <Button className='bg-white text-black hover:bg-gray-100' variant="outline" disabled>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {[1, 2, 3].map((i) => (
        <Button
          key={i}
          variant="outline"
          className='bg-white text-black hover:bg-gray-100'
          disabled
        >
          <Skeleton className="h-4 w-4" />
        </Button>
      ))}
      <Button className='bg-white text-black hover:bg-gray-100' variant="outline" disabled>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default PaginatorSkeleton;