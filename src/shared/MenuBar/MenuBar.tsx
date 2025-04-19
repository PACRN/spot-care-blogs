import React, { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MoonIcon } from "@heroicons/react/24/solid";
import { MapPinIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import {
  SunIcon,
  HeartIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
  LifebuoyIcon,
  BuildingOffice2Icon
} from "@heroicons/react/24/outline";
import appStore from "store/AppStore";
import uiUseStore from "store/UIStore";
import { useNavigate } from "react-router-dom";
import { KEYS } from "constants/KeyConstants";
import Avatar from "@/shared/Avatar/Avatar";

export interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}
const MenuBar: React.FC<MenuBarProps> = ({
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "h-7 w-7"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setTheme, savedProviderList, profileImage } = appStore();
  const navigate = useNavigate();
  const {
    setIsDarkUi,
    isHomePage,
    setIsDrawerClose,
    setIsList,
    isList,
    isLoggedIn,
    setShowLogin,
    setShowSignup,
    setIsLoggedIn
  } = uiUseStore();

  const _onAccountClicked = () => {
    navigate("/account");
  };

  const solutions = [
    {
      name: "Account",
      icon: UserCircleIcon,
      function: _onAccountClicked
    },
    // {
    //   name: "Mode",
    //   icon: isDarkMode ? SunIcon : MoonIcon,
    //   function: _toogleDarkMode
    // },
    {
      name: "List your business",
      icon: BuildingOffice2Icon,
      function: () => { }
    }
  ];

  const solutionsFoot = [
    {
      name: "Help",
      icon: LifebuoyIcon,
      function: () => { }
    },
    {
      name: "Login",
      icon: ArrowRightStartOnRectangleIcon,
      function: _loginFunction
    },
    {
      name: "Sign Up",
      icon: ArrowRightStartOnRectangleIcon,
      function: _signupFunction
    },
    {
      name: "Logout",
      icon: ArrowLeftEndOnRectangleIcon,
      function: _logout
    }
  ];

  if (!isHomePage && savedProviderList && savedProviderList.length > 0) {
    solutions.push({
      name: "Saved Provider",
      icon: HeartIcon,
      function: openSavedProvider
    });
  }

  if (isList) {
    solutions.push({
      name: "Map",
      icon: MapPinIcon,
      function: () => {
        setIsList(false);
      }
    });
  } else {
    solutions.push({
      name: "List",
      icon: ListBulletIcon,
      function: () => {
        setIsList(true);
      }
    });
  }

  // function _toogleDarkMode() {
  //   if (localStorage.theme === "light") {
  //     toDark();
  //   } else {
  //     toLight();
  //   }
  // }

  function _loginFunction() {
    setShowLogin(true);
  }

  function _signupFunction() {
    setShowSignup(true);
  }

  function _logout() {
    setIsLoggedIn(false);
    localStorage.removeItem(KEYS.ISLOGGEDIN);
    navigate("/");
  }

  const toDark = () => {
    setIsDarkMode(true);
    setIsDarkUi(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
    setTheme("dark");
  };

  const toLight = () => {
    setIsDarkMode(false);
    setIsDarkUi(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
    setTheme("light");
  };

  function openSavedProvider() {
    setIsDrawerClose(false);
  }

  return (
    <div className="MenuDropdown">
      <Popover className={`relative`}>
        {({ open }) => (
          <>
            <Popover.Button
              className={`text-2xl md:text-3xl relative w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={iconClassName}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4  mt-4 md:right-10 xs:right-0 xs:px-2 xs:-m-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutions
                      .filter((item) => {
                        if (
                          isHomePage &&
                          (item.name === "List" || item.name === "Map")
                        ) {
                          return false;
                        }
                        if (!isLoggedIn && item.name === "Account") {
                          return false;
                        }
                        return true;
                      })
                      .map((item, index) => (
                        <div
                          key={index}
                          // to={item.href}
                          onClick={item.function}
                          className={`${item.name === "List your business"
                              ? "xs:flex sm:hidden"
                              : ""
                            } cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            {item.name === "Account" ? (
                              <Avatar imgUrl={profileImage} />
                            ) : (
                              <item.icon
                                aria-hidden="true"
                                className="w-6 h-6"
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium ">{item.name}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot
                      .filter((item) => {
                        if (!isLoggedIn) {
                          return item.name !== "Logout";
                        }
                        return item.name !== "Login" && item.name !== "Sign Up";
                      })
                      .map((item, index) => (
                        <div
                          key={index}
                          // to={item.href}
                          onClick={item.function}
                          className=" cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <item.icon aria-hidden="true" className="w-6 h-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium ">{item.name}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MenuBar;
