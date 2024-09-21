import React from 'react'
import ApartmentCardSkeleton from './apartment-card-skeleton'
import PaginatorSkeleton from './paginator-skeleton'

export default function ApartmentsSkeleton() {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(12).fill(null).map((_, index) => (
        <ApartmentCardSkeleton key={index} />
      ))}
    </div>
    <PaginatorSkeleton />
    </>
  )
}
