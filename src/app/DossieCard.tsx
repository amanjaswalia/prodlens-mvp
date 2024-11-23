import React from 'react';

type DossierCardProps = {
  title: string;
  status: string;
  stakeholders: string[];
  date: string;
};

const DossierCard: React.FC<DossierCardProps> = ({ title, status, stakeholders, date }) => {
  const statusColor =
    status === 'In-Progress'
      ? 'bg-gray-300'
      : status === 'In-Review'
      ? 'bg-blue-100 text-blue-500'
      : 'bg-green-100 text-green-500';

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <div className="flex items-center mt-2">
        <div className="flex -space-x-2">
          {stakeholders.map((initial, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
            >
              {initial}
            </div>
          ))}
        </div>
        <span className={`ml-auto px-2 py-1 text-sm rounded ${statusColor}`}>{status}</span>
      </div>
    </div>
  );
};

export default DossierCard;
