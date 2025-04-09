'use client'
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import FooterLogo from "./FooterLogo";
import SocialsList from "../SocialsList/SocialsList";
import Link from "next/link";

export interface FooterProps {
  className?: string;
  menu: string;
  route: string;
}

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isFooterSize, setIsFooterSize] = React.useState(false);

  useEffect(() => {
    setIsFooterSize(pathname === "/list");
  }, [pathname]);

  const footerOptions: FooterProps[] = [
    {
      menu: "FAQ",
      route: "",
      className: "col-span-1",
    },
    {
      menu: "Blog",
      route: "blog",
      className: "col-span-1",
    },
    {
      menu: "Terms & conditions",
      route: "terms",
      className: "col-span-1",
    },
    {
      menu: "Privacy",
      route: "privacy",
      className: "col-span-1",
    },
    {
      menu: "Contact us",
      route: "contact",
      className: "col-span-1",
    },
  ];

  const renderFooterMenuItem = (menu: FooterProps, index: number) => {
    return (
      <Link
        key={index}
        className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-500 justify-center cursor-pointer"
        href={menu.route === "" ? "/" : `https://spot.care/${menu.route}`}
      >
        {menu.menu}
      </Link>
    );
  };

  return (
    <>
      {/* Minute line at the top of the footer */}
      <hr className="w-full border-t border-neutral-200 dark:border-neutral-700" />

      <div
        className="px-10"
      >
        <div className="mx-auto my-14 flex flex-col xl:flex-row justify-between items-center xl:items-center space-y-6 xl:space-y-0">
          {/* Footer Logo */}
          <div className="flex justify-start items-start lg:items-center">
            <FooterLogo />
          </div>

          {/* Footer Menu */}
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-center space-y-4 lg:space-y-0 lg:gap-12 text-purple-600 text-sm">
            {footerOptions.map(renderFooterMenuItem)}
          </div>

          {/* Social Media Links */}
          <div className="flex justify-start items-start lg:items-center space-x-4">
            <SocialsList />
          </div>
        </div>
        <span className="w-full flex justify-center text-center xs:text-center sm:text-center md:text-center lg:text-center text-xs font-thin text-gray-400">
          Spot.care is a service provided by Pellucid Labs, LLC.
          <br />
          Spot.care does not employ any caregiver or provider and is not
          responsible for the conduct of any user of our site. All information
          shown on our site is not verified by Spot.care.
          <br />
          You need to do your own diligence to ensure the provider or caregiver
          you choose is appropriate for your needs and complies with applicable
          laws.
        </span>
      </div>

      <span className="w-full flex justify-center text-center text-sm font-thin text-gray-400 py-6">
        &#169; 2024 Spot.care - All rights reserved.
      </span>
    </>
  );
};

export default Footer;
