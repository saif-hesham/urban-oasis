"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginator({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const setPage = (page: number) => {
    if (page === currentPage) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 6;

    buttons.push(
      <Button
        className='bg-white text-black hover:bg-gray-100'
        key='prev'
        variant='outline'
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
    );

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            onClick={() => setPage(i)}
            className={
              currentPage === i
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white text-black hover:bg-gray-100"
            }
          >
            {i}
          </Button>
        );
      }
    } else {
      const leftBound = Math.max(1, currentPage - 1);
      const rightBound = Math.min(totalPages, currentPage + 1);

      if (leftBound > 1) {
        buttons.push(
          <Button
            className='bg-white text-black hover:bg-gray-100'
            key={1}
            variant='outline'
            onClick={() => setPage(1)}
          >
            1
          </Button>
        );
        if (leftBound > 2) {
          buttons.push(
            <span key='leftEllipsis' className='px-2 text-black'>
              ...
            </span>
          );
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            onClick={() => setPage(i)}
            className={
              currentPage === i
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white text-black hover:bg-gray-100"
            }
          >
            {i}
          </Button>
        );
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          buttons.push(
            <span key='rightEllipsis' className='px-2 text-black'>
              ...
            </span>
          );
        }
        buttons.push(
          <Button
            className='bg-white text-black hover:bg-gray-100'
            key={totalPages}
            variant='outline'
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
    }

    buttons.push(
      <Button
        className='bg-white text-black hover:bg-gray-100'
        key='next'
        variant='outline'
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    );

    return buttons;
  };

  return (
    <div className='mt-8 flex justify-center items-center space-x-2'>
      {renderPaginationButtons()}
    </div>
  );
}
