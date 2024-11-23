"use client"
import React, { useState } from 'react';
import Image from 'next/image';

import Member1 from '../assets/member1.png'; 

interface TeamMember {
  name: string;
  role: string;
  skills: string[];
}

const Teams: React.FC = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      name: 'John Doe',
      role: 'Web Designer',
      skills: ['HTML', 'CSS', 'UI/UX'],
    },
    {
      name: 'Jane Smith',
      role: 'Web Developer',
      skills: ['JavaScript', 'React', 'Node.js'],
    },
    {
      name: 'Sam Wilson',
      role: 'Front-end Developer',
      skills: ['React', 'CSS', 'Redux'],
    },
  ]);

  return (
    <div className="bg-background p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Image
                src={Member1}
                alt={member.name}
                width={46}
                height={46}
                className="rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-center">{member.name}</h3>
            <p className="text-center text-gray-500">{member.role}</p>
            <div className="mt-4">
              <h4 className="text-lg font-medium">Skills:</h4>
              <ul className="list-disc pl-5">
                {member.skills.map((skill, idx) => (
                  <li key={idx} className="text-sm text-gray-700">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
