import React from "react";
import { SidebarProps } from "./SidebarProps";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';


export type SidebarListProps = {
    categoryDetails: SidebarProps[];
    classname: string;
    selected?: string;
}

export const Sidebar: React.FC<SidebarListProps> = ({ categoryDetails, classname, selected = "" }) => {
    return <div className={cn("pb-12", classname)} {...categoryDetails}>
        <div className="space-y-4 py-4">
            <div className="px-3 py-2">
                <div className="space-y-1">
                    <span className="group flex items-center rounded-xl px-3 py-2 text-md font-bold text-purple-700">Your topics to read</span>
                    <hr className="pb-4 text-purple-700" />
                    <Link
                        key={"home"}
                        href={`/articles--guides`}
                        className={`group flex items-center rounded-xl px-3 py-2 text-sm font-medium hover:bg-purple-300 hover:text-purple-700  ${"" === selected && "bg-purple-300 text-purple-700 rounded-xl"}`}
                    >
                        <i className={"fa-solid fa-house-medical"} />
                        <span className="ml-3">{"Home"}</span>
                    </Link>
                    {categoryDetails.map((item) => (
                        <Link
                            key={item.title}
                            href={`/category?q=${item?.title}`}
                            className={`group flex items-center rounded-xl px-3 py-2 text-sm font-medium hover:bg-purple-300 hover:text-purple-700  ${item.title === selected && "bg-purple-300 text-purple-700 rounded-xl"}`}
                        >
                            <i className={item.icon} />
                            <span className="ml-3">{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
}