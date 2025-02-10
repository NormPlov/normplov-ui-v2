import React, { useState } from "react";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

type props = {
  onSearch: (query: string) => void; // Add prop for search callback
};

export const JobSearch = ({ onSearch }: props) => {
  const [query, setQuery] = useState("");
  const t = useTranslations("Jobs"); // Hook to access translations

  const handleSearchClick = () => {
    onSearch(query); // Pass the query to the parent component
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery === "") {
      onSearch(""); // Fetch all jobs when the search input is cleared
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearchClick(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="relative max-w-7xl   bg-cover bg-center">
      <div className=" mx-auto   relative z-10">
        {/* Search Bar Section */}
        <div className="flex gap-2 w-full items-center ">
          <div className="w-full md:flex md:justify-center ">
            <div className="relative w-full bg-primary p-1 rounded-full bg-opacity-10">
              <input
                type="text"
                placeholder={t("search")}
                value={query}
                onChange={handleInputChange} // Handle input changes
                onKeyDown={handleKeyDown} // Trigger search on Enter key press
                className="w-full md:w-full lg:w-full pl-4 py-2 lg:py-3 md:py-3 border border-gray-300 rounded-full focus:outline-none text-textprimary text-[15px] md:text-[17px] lg:text-base"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary py-1 px-1 lg:py-3 lg:px-3 rounded-full cursor-pointer"
                onClick={handleSearchClick} // Trigger the search
              >
                <Search
                  color="#ffffff"
                  size={18}
                  className="text-gray-500"
                  strokeWidth={3}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
