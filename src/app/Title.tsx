import React from 'react';

interface TitleProps {
    content: string;
  date: string;
}

export default function Title({ content, date }: TitleProps) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold text-[#384E77]">
        {content}!
        <span role="img" aria-label="wave" className="ml-2">
          👋
        </span>
      </h1>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}
