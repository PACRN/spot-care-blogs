"use client";
import { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";
import imgLight from "../../images/app/care-icon.png";
import appStore from "@/store/AppStore";
import { Filters } from "@/types/filterProps";
import { Cares } from "@/types/CareTypes";
import uiUseStore from "@/store/UIStore";

export interface CareTypeInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
  mobileClassName?: string;
}

const CareTypeInput: FC<CareTypeInputProps> = ({
  autoFocus = false,
  placeHolder = "Type of care",
  desc = "What are you looking?",
  className = "nc-flex-1.5",
  mobileClassName = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { careTypes } = appStore();
  const {
    CareType,
    setCareType,
    setIsHeaderBorderVisible,
    setIsShowCareVeticalLine
  } = uiUseStore();

  const [value, setValue] = useState("");
  const [afterSelected, setAfterSelected] = useState(true);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [hasResults, setHasResults] = useState(true);
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (!hasResults) {
      setHasResults(true);
    }
  }, [value]);

  useEffect(() => {
    if (isClear) {
      setShowPopover(false);
    }
  }, [isClear]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the container
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
        renderGroupedCategories(careTypes);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    setValue(CareType || "");
  }, [CareType]);

  const handleSelectLocation = (item: string, id: number) => {
    setValue(item);
    setCareType(item);
    setShowPopover(false);
    setAfterSelected(true);
    setIsShowCareVeticalLine(true);
    setIsHeaderBorderVisible(true);
    setIsClear(false);
  };

  const renderGroupedCategories = (groupedCategories: Cares[]) => {
    return groupedCategories.map((item: Cares) => (
      <div key={item.name} className="mb-4">
        <h3 className="px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          {item.name}
        </h3>
        {item.careTypes.map((care) => (
          <span
            onClick={() => handleSelectLocation(care, 0)}
            key={care}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400"></span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {care}
            </span>
          </span>
        ))}
      </div>
    ));
  };

  const renderRecentSearches = () => {
    const filteredData = filterByCareTypes(careTypes, value);
    return renderGroupedCategories(filteredData);
  };

  const renderSearchValue = () => {
    const filteredData = filterByCareTypes(careTypes, value);
    const groupResult = renderGroupedCategories(filteredData);
    groupResult.length === 0 && setHasResults(false);

    return groupResult;
  };
  const filterByCareTypes = (careTypes: Cares[], value: string): Cares[] => {
    if (afterSelected) {
      return careTypes; // Return all care types when allResults is true
    }
    return careTypes
      .map((item) => {
        if (value.trim() === "") {
          return {
            name: item.name,
            careTypes: item.careTypes
          };
        }
        const filteredCareTypes = item.careTypes.filter((careType) =>
          careType.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredCareTypes.length > 0) {
          return {
            name: item.name,
            careTypes: filteredCareTypes
          };
        }
        return null;
      })
      .filter((item): item is Cares => item !== null);
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => {
          setShowPopover(true);
          setIsHeaderBorderVisible(true);
          setIsShowCareVeticalLine(false);
        }}
        className={`flex z-10 flex-1 relative nc-hero-field-padding flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left px-10 py-6 ${showPopover ? "nc-hero-field-focused" : ""
          }${mobileClassName}`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <img
            className="xs:w-7 xs:h-7 sm:w-7 sm:h-7"
            src={"data:image/png;base64,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"}
            alt="Logo-Light"
          />
        </div>
        <div className="flex-grow">
          <input
            className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xs:text-xs lg:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => {
              setAfterSelected(false);
              setValue(e.currentTarget.value);
              setIsClear(false);
            }}
            ref={inputRef}
            required
          />
          <span className="block mt-0.5 xs:text-xs lg:text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue("");
                setCareType("");
                setIsClear(true);
              }}
            />
          )}
        </div>
      </div>

      {hasResults && showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto scrollbar-hide">
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default CareTypeInput;
