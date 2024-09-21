"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <AlertCircle className='h-6 w-6 text-destructive' />
            <CardTitle className='text-2xl font-bold'>
              Oops! Something went wrong
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <pre className='mt-4 p-4 bg-secondary rounded-md overflow-auto text-sm'>
              <code>{error.message}</code>
            </pre>
          )}
        </CardContent>
        <CardFooter className='flex justify-between'>
            <Button variant='outline' onClick={() => window.location.href = '/apartments'}>
              <Home className='mr-2 h-4 w-4' />
              Back to Apartments
            </Button>
          <Button onClick={() => reset()}>
            <RefreshCw className='mr-2 h-4 w-4' />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
