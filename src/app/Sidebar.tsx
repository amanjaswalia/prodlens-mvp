import Link from 'next/link';
import Logo from '../app/assets/logo.png';
import Image from 'next/image';
import { FaRegCompass, FaRegFolderOpen, FaUsers } from "react-icons/fa";
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { LuFlagTriangleRight } from 'react-icons/lu';
import { GoCreditCard } from 'react-icons/go';
import { AiOutlineLogout } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white text-black min-h-screen py-8 relative">
      <div className='mb-8 px-8 py-2'>
      <Image src={Logo} alt="logo" />
      </div>
      <nav>
        <ul className='px-8'>
          <li className="mb-4 flex items-center">
          <FaRegCompass   className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/" className="hover:text-gray-400 text-custom-text font-bold">
              Dashboard
            </Link>
          </li>
           <li className="mb-4 flex items-center">
          <FaRegFolderOpen  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/my-projects" className="hover:text-gray-400 text-custom-text font-bold">
              My Projects
            </Link>
          </li>
           <li className="mb-4 flex items-center">
          <FaUsers  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/my-teams" className="hover:text-gray-400 text-custom-text font-bold">
             My Teams
            </Link>
          </li>
           <li className="mb-4 flex items-center">
          <CiHeart  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/favorites" className="hover:text-gray-400 text-custom-text font-bold">
             Favorites
            </Link>
          </li>
        </ul>
        <div className='border-t border-t-1 border-gray-300 mb-4'>
        <h6 className='px-8 pt-4 font-bold text-md text-gray-400'>General</h6>
        </div>
        <ul className='px-8'>
           <li className="mb-4 flex items-center">
          <IoSettingsOutline  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/" className="hover:text-gray-400 text-custom-text font-bold">
              Settings
            </Link>
          </li>
           <li className="mb-4 flex items-center">
          <IoIosInformationCircleOutline  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/my-projects" className="hover:text-gray-400 text-custom-text font-bold">
              Help
            </Link>
          </li>
           <li className="mb-4 flex items-center">
          <LuFlagTriangleRight  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/my-teams" className="hover:text-gray-400 text-custom-text font-bold">
            Report
            </Link>
          </li>
           <li className="mb-4 flex items-center">
          <GoCreditCard  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/favorites" className="hover:text-gray-400 text-custom-text font-bold">
             My Payment
            </Link>
          </li>
          <li className="mb-4 flex items-center">
          <AiOutlineLogout  className='h-5 w-5 text-custom-text mr-4' />
            <Link href="/favorites" className="hover:text-gray-400 text-custom-text font-bold">
            Logout
            </Link>
          </li>
        </ul>
        <div className='fixed bottom-0 left-0 bg-[#F0F0F0] p-4 w-64'>
          <h5 className='inline-block text-custom-text text-sm border-b boder-b-[1px] border-dashed border-custom-text'>Free Trial</h5>
          <p className='text-custom-text text-sm'> Expiring Decemper 21st, 2024</p>
        </div>
      </nav>
    </aside>
  );
}