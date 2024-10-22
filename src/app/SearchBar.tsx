import Image from 'next/image';
import React from 'react';
import { FaRegBell, FaSearch } from "react-icons/fa";
import Ellipse1 from './assets/Ellipse1.png';

export default function SearchBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full bg-white rounded-full px-4 py-2">
      <FaSearch  className='h-5 w-5 text-gray-500 ' />
        <input
          type="text"
          placeholder="Search by name, task, label or team member..."
          className="w-full bg-transparent border-none outline-none ml-4 text-gray-700"
        />
      </div>

      <div className="flex items-center space-x-6 ml-4">
        <button className="relative">
        <FaRegBell className='h-5 w-5' />
        </button>

        <Image
          src={Ellipse1}
          alt="User avatar"
          className="w-[30px] h-[30px] rounded-full"
        />
      </div>
    </div>
  );
}
