import React, { useEffect } from 'react';

interface LoaderProps {
  isVisible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
  useEffect(() => {
    const body = document.body;
    if (isVisible) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts or visibility changes
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center pointer-events-none">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500"></div>
    </div>
  );
};

export default Loader;
