'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Services } from '@/services/service'
import appStore from '@/store/AppStore'
import SearchSelector from './SearchSelector'
import uiUseStore from '@/store/UIStore'
import HeroSearchFormSmall from './HeroSearchForm/HeroSearchFormSmall'
import useOutsideAlerter from './hooks/useOutsideAlerter'
import { MenuIcon, SearchIcon } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export type StaySearchFormField = "Type of Care" | "Zip Code" | "Radius"

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { setCareTypes } = appStore()
  const pathname = usePathname()
  const [showHeroSearch, setShowHeroSearch] =
    useState<StaySearchFormField | null>();
  const headerInnerRef = useRef<HTMLDivElement>(null);

  const {
    isHomePage,
    setIsShowCareVeticalLine,
    setIsHeaderBorderVisible,
    servicesTag,
    locationvalue,
    HeaderRadius,
    setShowSignup,
    isLoggedIn,
    setIsLoggedIn,
    setShowLogin,
    setIsHomePage,
    setShowHeroMobileSearch
  } = uiUseStore();

  useEffect(() => {
    LoadCares()
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  const LoadCares = async () => {
    const cares = await Services.LoadCareTypes()
    setCareTypes(cares)
  }

  useOutsideAlerter(headerInnerRef, (event: MouseEvent) => {
    // Check if the clicked target is inside the element with class name 'pac-container'
    if (
      (event.target as HTMLElement).closest(".pac-container") ||
      (event.target as HTMLElement).closest(".drawer-container") ||
      (event.target as HTMLElement).closest(".dialogContainer")
    ) {
      return; // Do nothing if clicked inside 'pac-container'
    }
    setIsShowCareVeticalLine(true);
    setIsHeaderBorderVisible(true);
    // If clicked outside of headerInnerRef and not inside 'pac-container', setShowHeroSearch to null
    setShowHeroSearch(null);
  });

  const renderButtonOpenHeroSearch = () => {
    return (
      <div
        className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${showHeroSearch
          ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[2.0] opacity-0 pointer-events-none invisible"
          : "visible"
          }`}
      >
        <div className="flex items-center font-medium xs:text-xs-small md:text-sm">
          <span
            className="block pl-5 pr-4 cursor-pointer xs:py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-[6rem] 2xl-custom:max-w-[10rem]"
            onClick={() => setShowHeroSearch("Type of Care")}
          >
            {servicesTag && servicesTag !== "" ? servicesTag : "Care"}
          </span>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <span
            className="block px-4 cursor-pointer xs:py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-[6rem] 2xl-custom:max-w-[10rem]"
            onClick={() => setShowHeroSearch("Zip Code")}
          >
            {locationvalue && locationvalue !== "" ? locationvalue : "Location"}
          </span>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <span
            className="block px-4 cursor-pointer xs:py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis"
            onClick={() => setShowHeroSearch("Radius")}
          >
            {HeaderRadius && HeaderRadius !== "" ? HeaderRadius : "Distance"}
          </span>
        </div>
        <div
          className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
          onClick={() => setShowHeroSearch("Type of Care")}
        >
          <span className="md:w-8 md:h-8 xs:w-7 xs:h-7 flex items-center justify-center bg-primary rounded-full bg-primary-6000  text-white">
            <svg
              className="md:w-5 md:h-5 xs:h-4 xs:w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  };

  const renderHeroSearch = () => {
    return (
      <div
        className={`absolute inset-x-0 top-10 xs:left-5 md:left-0  transition-all will-change-[transform,opacity] ${showHeroSearch
          ? "visible"
          : "-translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className={`w-full max-w-5xl mx-auto pb-6`}>
          <HeroSearchFormSmall />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] xs:hidden md:block ${showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
          }`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 border-b`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          ${showHeroSearch ? "duration-75" : ""} ${showHeroSearch ? "md:scale-y-[3.2]" : ""
            }`}
        ></div>
        <div
          className={

            "relative xs:px-5 md:px-10  py-3 flex"
          }
        >
          <div className="w-full flex items-center justify-between px-4 lg:px-0">

            <Link href="https://spot.care">
              <Logo loading="eager" priority="high" className="transition-opacity duration-700 ease-in w-54" />
            </Link>

            <div className="hidden xl:block">
              <div className="hidden lg:block">{renderButtonOpenHeroSearch()}</div>
              <div className="lg:hidden w-full max-w-lg mx-auto"></div>
              {renderHeroSearch()}
            </div>
            <div>
              <div className="hidden lg:flex items-center space-x-3">
                <button
                  className="btn btn-primary text-primary"
                  onClick={() => {
                    if (isLoggedIn) {
                      setShowSignup(true)
                    } else {
                      setShowLogin(true)
                    }
                  }}
                >
                  {/* {isLoggedIn ? "Sign Up" : "Log In"} */}
                  List your business
                </button>
              </div>
              <div className="lg:hidden flex items-center space-x-3">

              </div>
              <div className='block px-1 md:hidden'>
                <MenuIcon className='text-primary' onClick={() => { setShowHeroMobileSearch(true) }} />
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  )
}
