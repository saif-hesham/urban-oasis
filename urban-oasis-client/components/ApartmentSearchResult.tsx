import { SearchParams } from '@/app/apartments/page';
import { getApartments } from '@/lib/api/api';
import ApartmentList from './ApartmentList';
import Paginator from './Paginator';

export default async function ApartmentSearchResult({queryParams}: {queryParams: SearchParams}) {
  const {data, totalPages} = await getApartments(queryParams);
  return (
    <>
      <ApartmentList apartments={data}/>
      <Paginator totalPages={totalPages}/>
    </>
  )
}
