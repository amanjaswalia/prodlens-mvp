"use client";

import React, { useState, useEffect, useRef } from "react";
import StatusLabel from "./StatusLabel";
import { SlOptionsVertical } from "react-icons/sl";
import { TbMessageDots } from "react-icons/tb";
import Image from "next/image";
import Member1 from "../app/assets/member1.png";
import Member2 from "../app/assets/member2.png";
import Member3 from "../app/assets/member3.png";

interface Status {
  label: string;
  color: string;
  bgColor: string;
}

interface CardProps {
  title: string;
  timeline: string;
  status: Status;
  message: String;
}

const Card: React.FC<CardProps> = ({ title, timeline, status, message }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const avatars = [Member1, Member2, Member3];
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg py-4 px-8 w-full relative">
      <div className="flex justify-between">
        <StatusLabel
          label={status.label}
          color={status.color}
          bgColor={status.bgColor}
        />

        <button className="text-gray-500 relative" onClick={togglePopup}>
          <SlOptionsVertical />
        </button>
        {isPopupOpen && (
          <div
            ref={popupRef}
            className="absolute top-10 right-4 bg-gray-400 shadow-custom-full p-4 rounded-lg w-40 z-10"
          >
            <button
              onClick={togglePopup}
              className="block w-full text-left text-sm text-white hover:bg-gray-100 hover:text-black p-2 rounded"
            >
              Option 1
            </button>
            <button
              onClick={togglePopup}
              className="block w-full text-left text-sm text-white hover:bg-gray-100 hover:text-black p-2 rounded"
            >
              Option 2
            </button>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">Timeline: {timeline}</p>
      <div className="flex mt-4 justify-between items-center border-t-[1px] border-[#DBDBDB]">
        <div className="flex mt-2">
          {avatars.map((avatar, index) => (
            <Image
              key={index}
              src={avatar}
              alt={`User avatar ${index + 1}`}
              className={`w-[20px] h-[20px] rounded-full ${
                index > 0 ? "-ml-1" : ""
              }`}
            />
          ))}
        </div>
        <div className="flex items-center">
          <TbMessageDots className="text-gray-500" />
          <span className="ml-2 text-gray-500 text-sm">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
