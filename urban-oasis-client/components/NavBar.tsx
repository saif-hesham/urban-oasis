import { Home } from "lucide-react";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className='bg-white shadow-md'>
      <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
        <Link href={`/`}>
          <div className='flex items-center space-x-2'>
            <Home className='h-8 w-8 text-blue-800' />
            <span className='text-xl font-bold text-gray-700 mt-1'>
              <span className='text-blue-800'>Urban</span> Oasis
            </span>
          </div>
        </Link>
        <div className='hidden md:flex space-x-4'>
          <a href='#' className='text-gray-600 hover:text-blue-600'>
            Home
          </a>
          <a href='#' className='text-gray-600 hover:text-blue-600'>
            About
          </a>
          <a href='#' className='text-gray-600 hover:text-blue-600'>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
