import React from 'react';
import StatusLabel from './StatusLabel';
import { SlOptionsVertical } from "react-icons/sl";
import { TbMessageDots } from 'react-icons/tb';

interface Status {
    label: string;
    color: string;
    bgColor: string;
  }

interface CardProps {
  title: string;
  timeline: string;
  status: Status;
}

const Card: React.FC<CardProps> = ({ title, timeline ,status }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg py-4 px-8 w-full">
      <div className="flex justify-between">
      <StatusLabel label={status.label} color={status.color} bgColor={status.bgColor} />

        <button className="text-gray-500">
          <SlOptionsVertical />
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">Timeline: {timeline}</p>
      <div className="flex mt-4 justify-between items-center border-t-[1px] border-[#DBDBDB]">
        <div className='flex mt-2'>
        img
        </div>
        <div className="flex items-center">
         <TbMessageDots className='text-gray-500' />
          <span className="ml-2 text-gray-500 text-sm">3</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
