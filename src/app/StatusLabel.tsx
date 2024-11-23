import React from 'react';

type StatusLabelProps = {
  label: string;
  color: string;
  bgColor: string;
};

const StatusLabel: React.FC<StatusLabelProps> = ({ label, color, bgColor }) => {
  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${bgColor} ${color}`}>
      {label}
    </span>
  );
};

export default StatusLabel;
