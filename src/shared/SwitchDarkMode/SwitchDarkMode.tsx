import React, { useEffect } from "react";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import appStore from "store/AppStore";
import uiUseStore from "store/UIStore";
export interface SwitchDarkModeProps {
  className?: string;
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {
  const { setTheme } = appStore();
  const { setIsDarkUi, isLoggedIn, isDarkUi } = uiUseStore();

  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.theme === "dark") {
        toDark();
      } else {
        toLight();
      }
    } else {
      toLight();
    }
  }, []);

  const toDark = () => {
    setIsDarkUi(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
    setTheme("dark");
  };

  const toLight = () => {
    setIsDarkUi(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
    setTheme("light");
  };

  function _toogleDarkMode() {
    if (localStorage.theme === "light") {
      toDark();
    } else {
      toLight();
    }
  }

  return isLoggedIn ? (
    <div
      // to={item.href}
      onClick={_toogleDarkMode}
      className=" cursor-pointer flex items-center px-2 py-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
    >
      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
        {!isDarkUi ? (
          <MoonIcon className="w-6 h-6" aria-hidden="true" />
        ) : (
          <SunIcon className="w-6 h-6" aria-hidden="true" />
        )}
      </div>
      <div className="ml-4">
        {!isDarkUi ? (
          <p className="text-sm font-medium">Dark Mode</p>
        ) : (
          <p className="text-sm font-medium">Light Mode</p>
        )}
      </div>
    </div>
  ) : (
    <button
      onClick={_toogleDarkMode}
      className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none xs:flex items-center justify-center ${className}xs:hidden md:flex`}
    >
      <span className="sr-only">Enable dark mode</span>
      {isDarkUi ? (
        <MoonIcon className="w-7 h-7" aria-hidden="true" />
      ) : (
        <SunIcon className="w-7 h-7" aria-hidden="true" />
      )}
    </button>
  );
};

export default SwitchDarkMode;
