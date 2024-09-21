"use client";
import formatFieldName from "@/utils/formatField";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SEARCH_FIELDS = ["unitName", "unitNumber", "project"] as const;
type SearchField = (typeof SEARCH_FIELDS)[number];

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const initialSearchBy = SEARCH_FIELDS.find(field => params.has(field)) || 'unitName';
  const initialSearchTerm = params.get(initialSearchBy) || "";
  
  const [searchBy, setSearchBy] = useState<SearchField>(initialSearchBy);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const pathname = usePathname();
  const { replace } = useRouter();


  const debouncedSearch = useDebouncedCallback((term: string) => {
    params.set("page", "1");
    if (term) params.set(searchBy, term);
    else params.delete(searchBy);
    replace(`?${params.toString()}`);
  }, 300);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleFilterChange = (searchCriteria: SearchField) => {
    params.set("page", "1");
    params.delete(searchBy);
    replace(`${pathname}?${params.toString()}`);
    setSearchTerm("");
    setSearchBy(searchCriteria);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto'>
      <div className='relative w-full sm:w-auto'>
        <Select
          value={searchBy}
          onValueChange={(e: SearchField) => handleFilterChange(e)}
        >
          <SelectTrigger className='w-full sm:w-[140px] bg-white text-black'>
            <SelectValue placeholder='Search by' />
          </SelectTrigger>
          <SelectContent className='z-50'>
            {SEARCH_FIELDS.map(field => (
              <SelectItem key={field} value={field}>
                {formatFieldName(field)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='relative w-full sm:w-auto'>
        <Input
          type={searchBy === "unitNumber" ? "number" : "text"}
          placeholder={`Search by ${formatFieldName(searchBy, false)}...`}
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
          className='w-full sm:w-[333px] pl-8 bg-white text-black'
        />
        <Search
          className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'
          size={16}
        />
      </div>
    </div>
  );
}
