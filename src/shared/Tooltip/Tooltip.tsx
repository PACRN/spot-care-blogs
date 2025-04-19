import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "left-full bottom-full"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Target Element (Trigger) */}
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          className={`absolute ${position} mb-1 w-max bg-gray-500 text-white text-xs rounded py-1 px-2 shadow-lg z-[1000]`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
