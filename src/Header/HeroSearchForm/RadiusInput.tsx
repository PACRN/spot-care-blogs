import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import {
  ArrowUturnRightIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import appStore from "@/store/AppStore";
import uiUseStore from "@/store/UIStore";
import toast from "react-hot-toast";
import HeroSearchCustomToast from "@/components/CustomToast/HeroSearchCustomToast";
import { StatusMessages } from "@/constants/StatusMessages";
import { useRouter } from 'next/navigation'

export interface RadiusInputProps {
  fieldClassName?: string;
  className?: string;
  hasButtonSubmit?: boolean;
  placeHolder?: string;
  desc?: string;
  mobileClassName?: string;
}

const RadiusInput: FC<RadiusInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  hasButtonSubmit = true,
  placeHolder = "Distance",
  desc = "How far are you looking?",
  mobileClassName = ""
}) => {
  const [miles, setMiles] = useState("");
  const { setLoader, loading, isWishlistLoaded } = appStore();
  const router = useRouter()

  const {
    HeaderRadius,
    setHeaderRadius,
    setIsHeaderBorderVisible,
    setIsShowCareVeticalLine,
    CareType,
    storeLatitude,
    storeLongitute,
    storePostalCode,
    setServicesTag,
    setIsHomePage
  } = uiUseStore();

  const handleSelectLocation = (item: string) => {
    setMiles(item);
    setHeaderRadius(item ?? "");
  };

  useEffect(() => {
    setMiles(HeaderRadius || "");
  }, [HeaderRadius]);

  async function SearchOption() {
    try {
      setLoader(true);
      const filterData = {
        careType: CareType ?? "",
        lat: storeLatitude ?? 0.0,
        lon: storeLongitute ?? 0.0,
        page: 1,
        pageSize: 10,
        postalCode: storePostalCode ?? "",
        radius: HeaderRadius ?? ""
      };
      if (
        !filterData.careType ||
        !filterData.radius ||
        !filterData.postalCode
      ) {
        toast.custom((t) => (
          <HeroSearchCustomToast
            icon={
              <ExclamationTriangleIcon
                className="h-10 w-10 rounded-full text-yellow-400"
                aria-hidden="true"
              />
            }
            description1={
              StatusMessages.ErrorMessage.RadiusInputValidationDescription1
            }
            description2={
              StatusMessages.ErrorMessage.RadiusInputValidationDescription2
            }
            toasttype={t}
          />
        ));
      } else {
        setIsHomePage(false);
        const queryParams = new URLSearchParams(
          Object.entries(filterData).reduce((acc, [key, value]) => {
            acc[key] = value.toString();
            return acc;
          }, {} as Record<string, string>)
        ).toString();
        router.push(`https://spot.care/list?${queryParams}`);
      }
    } finally {
      setLoader(false);
      setServicesTag(CareType);
    }
  }

  const renderRecentSearches = (close: () => void) => {
    return (
      <>
        <div className="mt-2">
          {[
            "5 miles",
            "10 miles",
            "15 miles",
            "20 miles",
            "25 miles",
            "30 miles"
          ].map((item) => (
            <span
              onClick={() => {
                handleSelectLocation(item);
                close();
              }}
              key={item}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  return (
    <Popover className={`flex relative ${className}  lg:px-0`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 pl-8 z-10 lg:py-2 xs:py-1 flex items-center focus:outline-none ${open ? "shadow-[0_4px_16px_#11111a0d,_0_8px_32px_#11111a0d] rounded-full" : ""
              } ${mobileClassName}`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName}  space-x-3 focus:outline-none`}
              onClickCapture={() => {
                document.querySelector("html")?.click();
                setIsHeaderBorderVisible(true);
                setIsShowCareVeticalLine(true);
              }}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <ArrowUturnRightIcon className="xs:w-7 xs:h-7 sm:w-7 sm:h-7" />
              </div>

              <div className="flex-grow">
                <input
                  className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xs:text-xs lg:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                  placeholder={placeHolder}
                  value={miles}
                  required
                  onChange={(e) => {
                    setMiles(e.currentTarget.value);
                  }}
                />
                <span className="block mt-0.5 xs:text-xs lg:text-sm text-neutral-400 font-light ">
                  <span className="line-clamp-1">
                    {!!miles ? placeHolder : desc}
                  </span>
                </span>
              </div>
            </Popover.Button>

            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="lg:pr-3 xs:pr-2">
                <ButtonCircle
                  size="xs:w-10 xs:h-10 lg:w-16 lg:h-16 xs:hidden xl:flex bg-primary"
                  onClick={SearchOption}
                  disabled={loading || isWishlistLoaded} // Disable the button while loading
                  className={`${loading || isWishlistLoaded
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`} // Optional styling for loading state
                >
                  {loading || isWishlistLoaded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin lg:h-6 lg:w-6 xs:h-4 xs:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="lg:h-6 lg:w-6 xs:h-4 xs:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </ButtonCircle>
              </div>
            )}
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-1 bg-white dark:lg:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full xs:h-[18rem] overflow-scroll scrollbar-hide md:h-[20rem] lg:h-auto sm:min-w-[340px] max-w-sm xs:bg-white bg-white dark:xs:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              {renderRecentSearches(close)}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RadiusInput;
