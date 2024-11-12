"use client";
import React, { useState } from 'react';
import Button from './Button';

const MenuBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Dossiers');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const tabs = [
    { label: 'All Dossiers', count: 21 },
    { label: 'To-Do', count: 21 },
    { label: 'In-Progress', count: 4 },
    { label: 'Archived', count: 4 },
    { label: 'Draft', count: 3 }
  ];

  const openPopup = () => setIsPopupOpen(true);

  const closePopup = () => {
    setIsPopupOpen(false);
    setProjectName('');
    setProjectDescription('');
  };

  const handleCreateProject = () => {
    console.log('Project Created:', projectName, projectDescription);
    closePopup();
  };

  return (
    <>
      <div className='w-full bg-white p-4 rounded-lg flex justify-between items-center'>
        <div role="tablist" className='flex gap-8 ml-6'>
          {tabs.map(({ label, count }) => (
            <button
              key={label}
              role="tab"
              aria-selected={activeTab === label}
              className={`relative cursor-pointer font-bold ${
                activeTab === label ? 'text-[#0072BB]' : 'text-[#4B4B4B80]'
              }`}
              onClick={() => setActiveTab(label)}
            >
              {label}
              <span
                className={`px-[10px] py-[6px] rounded-lg ml-2 ${
                  activeTab === label ? 'bg-[#4DA4FF4D] text-[#0072BB]' : 'bg-[#A5A5A533] text-[#4B4B4B80]'
                }`}
              >
                {count}
              </span>
              {activeTab === label && (
                <div className="absolute bottom-[-23px] left-0 w-full h-[5px] rounded-tr-lg rounded-tl-lg bg-[#0072BB]" />
              )}
            </button>
          ))}
        </div>
        <Button label="+ New Project" onClick={openPopup} />
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closePopup} className="absolute top-2 right-2 text-gray-500">
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateProject(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project description"
                  rows={4}
                />
              </div>
              <Button label="Create Project" onClick={handleCreateProject} className="w-full" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBar;
