import { SocialType } from "../SocialsShare/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: "Linkedin", icon: "lab la-linkedin", href: "#" },
  { name: "Facebook", icon: "lab la-facebook", href: "#" },
  { name: "Instagram", icon: "lab la-instagram", href: "#" },
  { name: "Twitter", icon: "lab la-x", href: "#" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 items-center text-2xl py-1 text-neutral-600 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        item.name === "Twitter" ? (
          <a
            className="h-[1.8rem] py-1 cursor-pointer"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" fill="none"><g clip-path="url(#a)"><path fill="currentColor" d="M13.158 2.058h2.248l-4.913 5.435 5.78 7.395h-4.525l-3.545-4.485-4.056 4.485h-2.25l5.255-5.813-5.545-7.017h4.64l3.205 4.1 3.706-4.1Zm-.79 11.527h1.246L5.57 3.293H4.233l8.135 10.292Z"></path></g></svg>
          </a>

        ) : (
          <a
            key={i}
            className={`flex items-center justify-center w-8 h-8 mt-1 ${itemClass}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            <i className={`${item.icon} w-full h-full text-center`}></i>
          </a>
        )
      ))}
    </nav>

  );
};

export default SocialsList;
