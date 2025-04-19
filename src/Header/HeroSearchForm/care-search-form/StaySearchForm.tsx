import { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import CareTypeInput from "../CareTypeInput";
import RadiusInput from "../RadiusInput";
import { Filters } from "@/types/filterProps";
import appStore from "@/store/AppStore";
import uiUseStore from "@/store/UIStore";

const StaySearchForm: FC<{}> = () => {
  const initialFilters: Filters = {
    careType: "",
    lat: 0.0,
    lon: 0.0,
    radius: "5 miles",
    page: 1,
    pageSize: 10,
    postalCode: ""
  };

  const { isHeaderBorderVisible, isHomePage, isShowCareVerticalLine } =
    uiUseStore();

  const renderForm = () => {
    return (
      <div
        className={`mx-auto relative  flex rounded-full  bg-white dark:bg-neutral-800 ${isHomePage
            ? "shadow-xl dark:shadow-2xl"
            : "border border-neutral-200 dark:border-neutral-6000"
          }`}
      >
        <CareTypeInput className="flex-1" mobileClassName="" />
        <div
          className={`self-center h-8 py-2 ${isShowCareVerticalLine
              ? "border-r border-slate-200 dark:border-slate-700 "
              : ""
            }`}
        ></div>
        <LocationInput className="flex-1" />
        <div
          className={`self-center h-8 py-2 ${isHeaderBorderVisible
              ? "border-r border-slate-200 dark:border-slate-700"
              : ""
            }`}
        ></div>
        <RadiusInput className={`flex-1`} />
      </div>
    );
  };

  return renderForm();
};

export default StaySearchForm;
