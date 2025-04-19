import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import appStore from "store/AppStore";
import twFocusClass from "utils/twFocusClass";
import uiUseStore from "store/UIStore";
import { KEYS } from "constants/KeyConstants";
export interface PaginationProps {
  className?: string;
  pageCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({ className = "", pageCount }) => {
  const { currentPage, setCurrentPage, setShowLogin } = uiUseStore();
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = pageCount ?? 10;
  const { providersList, setFilteredPaginatedList } = appStore();

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(providersList?.length / itemsPerPage));
  }, [providersList]);

  useEffect(() => {
    const currentData = providersList.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setFilteredPaginatedList(currentData);
  }, [currentPage, providersList, setFilteredPaginatedList, itemsPerPage]);

  const handlePageChange = (page: number) => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem(KEYS.ISLOGGEDIN) === "true"; // Change to actual check if needed
    if (isLoggedIn) {
      setCurrentPage(page);
    } else {
      setShowLogin(true)
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const paginationItems = (): number[] => {
    const pages: number[] = [];
    const visiblePages = 3;

    let rangeStart = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let rangeEnd = rangeStart + visiblePages - 1;

    if (rangeEnd > totalPages) {
      rangeEnd = totalPages;
      rangeStart = Math.max(rangeEnd - visiblePages + 1, 1);
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    return pages;
  };

  return providersList && providersList.length > 0 ? (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {/* {
        !pageCount &&
        <div className="relative">
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            Page:
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
        </div>
      } */}


      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer ${currentPage === 1
            ? "text-neutral-300"
            : "text-neutral-600 hover:bg-neutral-100"
          } ${twFocusClass()}`}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      {paginationItems().map((page) => (
        <span
          key={page}
          aria-current={currentPage === page ? "page" : undefined}
          className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer ${currentPage === page
              ? "bg-primary-700 text-white xs:text-primary-500 xs:bg-transparent xs:font-extrabold"
              : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 xs:border-0"
            } ${twFocusClass()}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </span>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer ${currentPage === totalPages
            ? "text-neutral-300"
            : "text-neutral-600 hover:bg-neutral-100"
          } ${twFocusClass()}`}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  ) : (
    <div></div>
  );
};

export default Pagination;
