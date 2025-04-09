"use client"
import React, { FormEvent } from "react";
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarProps } from "./SidebarProps";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { useRouter } from 'next/navigation'
import { Input } from "../ui/input";

export type SidebarListProps = {
    categoryDetails: SidebarProps[];
    classname: string;
    selected?: string;
}

export const TopNavbar: React.FC<SidebarListProps> = ({ categoryDetails, classname, selected = "" }) => {

    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)
    const { setHeaderTheme } = useHeaderTheme()
    const [searchValue, setSearchValue] = useState(selected)
    const router = useRouter()




    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Here you can implement the actual search functionality
        // For example, you might want to navigate to a search results page:
        router.push(`/search?q=${encodeURIComponent(searchValue)}`)
    }
    useEffect(() => {
        const handleResize = () => {
            if (navRef.current) {
                setShowRightArrow(navRef.current.scrollWidth > navRef.current.clientWidth)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (navRef.current) {
            const scrollAmount = direction === "left" ? -200 : 200
            navRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    const handleScroll = () => {
        if (navRef.current) {
            setShowLeftArrow(navRef.current.scrollLeft > 0)
            setShowRightArrow(navRef.current.scrollLeft < navRef.current.scrollWidth - navRef.current.clientWidth)
        }
    }



    return (<nav className="bg-background py-6  xs:px-2">
        <div className="mx-auto px-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b">

                <div className="relative w-full md:w-auto md:flex gap-x-6 mt-4 md:mt-0">
                    <h2 className="text-2xl font-normal mb-4 md:mb-0 ">Articles & Guides</h2>
                    <div className="h-[34px] w-[1px] border-r hidden md:block"></div>

                    {showLeftArrow && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
                            onClick={() => scroll("left")}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )}
                    <div
                        ref={navRef}
                        className="flex space-x-4 overflow-x-auto scrollbar-hide"
                        onScroll={handleScroll}
                    >
                        {categoryDetails.map((item) => (
                            <Link
                                key={item.title}
                                href={`/category?q=${item.title}`}
                                className={`group flex items-center rounded-xl px-1 py-2 text-sm font-medium  hover:text-purple-700 whitespace-nowrap ${item.title === selected ? " text-purple-700" : ""
                                    }`}
                            >
                                <span className="">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                    {showRightArrow && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
                            onClick={() => scroll("right")}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="flex xs:w-full md:w-1/3 items-center justify-end outline-0">
                    <form onSubmit={handleSearch} className="relative w-full max-w-md outline-none outline-0">
                        <Input
                            className="h-12 pr-12 border-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-transparent focus:ring-opacity-0"
                            placeholder="Search articles"
                            type="search"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        <Button
                            className="absolute right-0 top-0 h-12 w-12 bg-transparent hover:bg-transparent hover:rounded-full"
                            size="icon"
                            type="submit"
                        >
                            <Search className="h-5 w-5 text-purple-600" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </nav>
    );
}


// return <div className={cn("pb-12", classname)} {...categoryDetails}>
//         <div className="space-y-4 py-4">
//             <div className="px-3 py-2">
//                 <div className="space-y-1">
//                     <span className="group flex items-center rounded-xl px-3 py-2 text-md font-bold text-purple-700">Your topics to read</span>
//                     <hr className="pb-4 text-purple-700" />
//                     <Link
//                         key={"home"}
//                         href={`/articles--guides`}
//                         className={`group flex items-center rounded-xl px-3 py-2 text-sm font-medium hover:bg-purple-300 hover:text-purple-700  ${"" === selected && "bg-purple-300 text-purple-700 rounded-xl"}`}
//                     >
//                         <i className={"fa-solid fa-house-medical"} />
//                         <span className="ml-3">{"Home"}</span>
//                     </Link>
//                     {categoryDetails.map((item) => (
//                         <Link
//                             key={item.title}
//                             href={`/category?q=${item?.title}`}
//                             className={`group flex items-center rounded-xl px-3 py-2 text-sm font-medium hover:bg-purple-300 hover:text-purple-700  ${item.title === selected && "bg-purple-300 text-purple-700 rounded-xl"}`}
//                         >
//                             <i className={item.icon} />
//                             <span className="ml-3">{item.title}</span>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     </div>