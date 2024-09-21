import ApartmentSearchResult from '@/components/ApartmentSearchResult'
import SearchComponent from '@/components/SearchComponent'
import ApartmentsSkeleton from '@/components/ui/aparmtents-skeleton'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export type SearchParams = {
  page?: string,
  unitNumber?: string,
  unitName?: string,
  project?: string
}


export default function Page({searchParams}: {searchParams: SearchParams}) {

  // Create a unique key based on the active search parameters
  let suspenseKey = searchParams.project ||
   searchParams.unitNumber || 
   searchParams.unitName || '';
  suspenseKey += searchParams.page || '1';


  return (
    <div className="min-h-screen ">
    <main className="container mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <SearchComponent />
        <Link href="/apartments/create">
          <Button className='whitespace-nowrap'>
            <Plus className='mr-2 h-4 w-4' /> Add New Listing
          </Button>
        </Link>
      </div>
      <Suspense key={suspenseKey} fallback={<ApartmentsSkeleton />}>
        <ApartmentSearchResult queryParams={searchParams}/>
      </Suspense>
    </main>
  </div>
  )
}
