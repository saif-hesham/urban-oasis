import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <Search className='h-6 w-6 text-muted-foreground' />
            <CardTitle className='text-2xl font-bold'>Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Oops! The page you&#39;re looking for doesn&#39;t exist. It might
            have been moved or deleted.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link href='/apartments'>
            <Button>
              <Home className='mr-2 h-4 w-4' />
              Back to Apartments
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
