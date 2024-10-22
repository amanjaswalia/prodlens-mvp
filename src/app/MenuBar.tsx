"use client"
import React, { useState } from 'react';
import Button from './Button';

const MenuBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Dossiers'); // Default active tab

  const tabs = [
    { label: 'All Dossiers', count: 21 },
    { label: 'To-Do', count: 21 },
    { label: 'In-Progress', count: 4 },
    { label: 'Archived', count: 4 },
    { label: 'Draft', count: 3 }
  ];

  return (
    <div className='w-full bg-white p-4 rounded-lg flex justify-between items-center '>
      <div className='flex gap-8 ml-6'>
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`relative cursor-pointer font-bold ${
              activeTab === tab.label ? 'text-[#0072BB]' : 'text-[#4B4B4B80]'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
            <span
              className={`px-[10px] py-[6px] rounded-lg ml-2 ${
                activeTab === tab.label ? 'bg-[#4DA4FF4D] text-[#0072BB]' : 'bg-[#A5A5A533] text-[#4B4B4B80]'
              }`}
            >
              {tab.count}
            </span>
            {activeTab === tab.label && (
              <div className="absolute bottom-[-23px] left-0 w-full h-[5px] rounded-tr-lg rounded-tl-lg bg-[#0072BB]" />
            )}
          </div>
        ))}
      </div>
      <Button label="+ New Project" />
    </div>
  );
}

export default MenuBar;
