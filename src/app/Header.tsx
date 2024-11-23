import Image from 'next/image';
import React from 'react';
import { FaRegBell } from "react-icons/fa";
import Ellipse1 from './assets/Ellipse1.png';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div>
        <h1 className="text-3xl font-bold text-[#051F61]">All Dossiers</h1>
        <p className="text-gray-600">Welcome, James 👋</p>
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
};

export default Header;
