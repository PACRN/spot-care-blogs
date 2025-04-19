import React from 'react';

type ChipProps = {
  label: string;
};

const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <div className="flex items-center bg-primary text-primary-500 text-sm font-medium rounded-full">
      <span>{label}</span>
    </div>
  );
};

export default Chip;
