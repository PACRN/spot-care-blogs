import React, { FC } from "react";
import StaySearchForm from "./care-search-form/StaySearchForm";

export interface HeroSearchFormSmallProps {
  className?: string;
}

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
}) => {
  return (
    <div className="mr-5 ml-0">
      <StaySearchForm />
    </div>
  );
};

export default HeroSearchFormSmall;
