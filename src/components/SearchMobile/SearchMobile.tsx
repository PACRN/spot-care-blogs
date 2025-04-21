'use client'
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import IconButton from "@/shared/Button/IconButton";
import CareTypeInput from "@/Header/HeroSearchForm/CareTypeInput";
import LocationInput from "@/Header/HeroSearchForm/LocationInput";
import RadiusInput from "@/Header/HeroSearchForm/RadiusInput";
import toast from "react-hot-toast";
import HeroSearchCustomToast from "@/components/CustomToast/HeroSearchCustomToast";
import { StatusMessages } from "@/constants/StatusMessages";
//Utils Imports
//Store imports
import uiUseStore from "@/store/UIStore";
import appStore from "@/store/AppStore";
import { useRouter } from 'next/navigation'

const SearchMobile = () => {
  const {
    showHeroMobileSearch,
    CareType,
    storeLatitude,
    storeLongitute,
    storePostalCode,
    HeaderRadius,
    setServicesTag,
    setShowHeroMobileSearch,
    setIsHomePage
  } = uiUseStore();
  const { setLoader } =
    appStore();

  const [logo, setLogo] = useState<string | undefined>("");

  const router = useRouter()



  const closeDialog = () => {
    setShowHeroMobileSearch(false);
  };

  const onSubmit = () => {
    try {
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
        setShowHeroMobileSearch(false);
        setIsHomePage(false);
        const queryParams = new URLSearchParams(
          Object.entries(filterData).reduce((acc, [key, value]) => {
            acc[key] = value.toString();
            return acc;
          }, {} as Record<string, string>)
        ).toString();
        router.push(`https://spot.care/list?${queryParams}`);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoader(false);
      setServicesTag(CareType);
    }
  };
  return (
    <Transition appear show={showHeroMobileSearch} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 overflow-hidden xs:block xl:hidden"
        onClose={closeDialog}
      >
        {/* <Transition.Child
          as={Fragment}
          enter=" duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave=" duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 xs:block xl:hidden" />
        </Transition.Child> */}
        <div className="fixed inset-0">
          <div className="flex justify-end h-full">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-56"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-56"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden transition-all xs:block xl:hidden">
                <div
                  className="w-full h-full flex flex-col transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-800
                    drawer-container"
                >
                  {/* Search Header Section */}
                  <div className="w-full flex items-center justify-between pl-5 pr-1 py-2">
                    {/* <Logo
                      img={logo}
                      imgLight={logo}
                      className="transition-opacity duration-700 ease-in"
                    /> */}
                    <IconButton Icon={XMarkIcon} onClick={closeDialog} />
                  </div>
                  {/* Body Section */}
                  <div className="flex-grow overflow-y-auto scrollbar-hide">
                    <div className="h-full w-full flex flex-col items-center justify-start py-14 gap-y-14">
                      <div className="transition-opacity animate-[myblur_0.4s_ease-in-out] w-full px-10">
                        <CareTypeInput
                          className="flex-1"
                          mobileClassName={"shadow-[0_4px_16px_#11111a0d,_0_8px_32px_#11111a0d] rounded-full"}
                        />
                      </div>
                      <div className="transition-opacity animate-[myblur_0.4s_ease-in-out] w-full">
                        <LocationInput
                          className="flex-1 "
                          mobileClassName={"shadow-[0_4px_16px_#11111a0d,_0_8px_32px_#11111a0d] rounded-full"}
                        />
                      </div>
                      <div className="transition-opacity animate-[myblur_0.4s_ease-in-out] w-full px-10">
                        <RadiusInput
                          className={`flex-1`}
                          mobileClassName={"shadow-[0_4px_16px_#11111a0d,_0_8px_32px_#11111a0d] rounded-full"}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Footer Section */}
                  <div className="w-full flex justify-between items-center p-5">
                    <button
                      type="submit"
                      onClick={onSubmit}
                      className={`flex-shrink-0 px-2 py-1.5 w-full cursor-pointer rounded-xl bg-primary-6000 flex items-center justify-center text-neutral-50 focus:outline-none relative z-20`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                      <span className="ml-2">Search</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchMobile;
