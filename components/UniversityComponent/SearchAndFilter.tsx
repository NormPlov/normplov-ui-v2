import Select from "react-select";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { StylesConfig, GroupBase } from 'react-select';

import { Search } from "lucide-react";


// Define types for dropdown options
type OptionType = {
  value: string;
  label: string;
};

type Props = {
  selectedUniversity: OptionType | null;
  setSelectedUniversity: (value: OptionType | null) => void; // dispatch function
  selectedLocation: OptionType | null;
  setSelectedLocation: (location: OptionType | null) => void;
  search: string;
  setSearch: (value: string) => void;

};

export default function SearchAndFilter({
  selectedUniversity,
  setSelectedUniversity,
  selectedLocation,
  setSelectedLocation,
  search,
  setSearch,

}: Props) {
  const t = useTranslations("University"); // Hook to access translations
  //const dispatch = useAppDispatch();
  // State to store dynamic options
  //const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);

  // Dropdown options for university types (can be dynamic)
  const universityOptions: OptionType[] = [
    { value: "PUBLIC", label: t("PUBLIC") },
    { value: "PRIVATE", label: t("PRIVATE") },
    {
      value: "TVET",
      label: t("TVET"),
    },
    { value: "MAJORS_COURSES", label: t("MAJORS_COURSES") },
  ];

  // Dropdown options for location
  const locationOptions: OptionType[] = [
    { value: "Phnom Penh", label: t("Phnom Penh") },
    { value: "Battambang", label: t("Battambang") },
    { value: "Siem Reap", label: t("Siem Reap") },
    { value: "Banteay Meanchey", label: t("Banteay Meanchey") },
    { value: "Kampong Cham", label: t("Kampong Cham") },
    { value: "Kampong Speu", label: t("Kampong Speu") },
    { value: "Kampong Thom", label: t("Kampong Thom") },
    { value: "Kampot", label: t("Kampot") },
    { value: "Kandal", label: t("Kandal") },
    { value: "Koh Kong", label: t("Koh Kong") },
    { value: "Kratié", label: t("Kratié") },
    { value: "Mondulkiri", label: t("Mondulkiri") },
    { value: "Preah Vihear", label: t("Preah Vihear") },
    { value: "Prey Veng", label: t("Prey Veng") },
    { value: "Pursat", label: t("Pursat") },
    { value: "Ratanakiri", label: t("Ratanakiri") },
    { value: "Preah Sihanouk", label: t("Preah Sihanouk") },
    { value: "Stung Treng", label: t("Stung Treng") },
    { value: "Svay Rieng", label: t("Svay Rieng") },
    { value: "Takéo", label: t("Takéo") },
    { value: "Oddar Meanchey", label: t("Oddar Meanchey") },
    { value: "Kep", label: t("Kep") },
    { value: "Pailin", label: t("Pailin") },
    { value: "Tboung Khmum", label: t("Tboung Khmum") },
  ];

  const [query, ] = useState("");
  // Handle location selection
  // Handle location selection
  const handleLocationChange = (selectedOption: OptionType | null) => {
    setSelectedLocation(selectedOption);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Update search in Redux state
  };

  // Handle university selection change
  const handleUniversityChange = (selectedOption: OptionType | null) => {
    setSelectedUniversity(selectedOption); // Local state update (optional)
  };

  const handleSearchClick = () => {
    setSearch(query); // Pass the query to the parent component
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearchClick(); // Trigger search on Enter key press
    }
  };

  const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (provided) => ({
      ...provided,
      borderRadius: "30px",
      padding: "4px",
      borderColor: "#D1D5DB",
      boxShadow: "none",
      height: "50px",
      fontSize: "17px",
      color: "#034B72",
      paddingLeft: "10px",
      // Media query for phone screens
      '@media (max-width: 640px)': {  // Tailwind's sm breakpoint
        height: "44px",               // កំណត់ height ទាបសម្រាប់ phone
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#034B72" : "#034B72",
      backgroundColor: state.isSelected
        ? "#DCFCE7" 
        : state.isFocused
        ? "#DCFCE7" 
        : "white",
        borderRadius: "30px",
        
      cursor: "pointer",
    }),
  };
  

  return (
    <div>
      <div className="z-10 mx-auto lg:mt-8 md:mt-8 mt-5">
        <div className=" lg:max-w-[80%] md:max-w-[85%] max-w-[94%]  mx-auto lg:space-y-5 md:space-y-3 space-y-3  justify-start items-center">
          <div className=" relative mt-5 grid grid-cols-1">
            <div className=" bg-primary p-1  rounded-full bg-opacity-10">
              <input 
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={handleSearchChange} // Handle input changes
                onKeyDown={handleKeyDown} // Trigger search on Enter key press
                className="w-full md:w-full placeholder:text-gray-500 lg:w-full pl-5 py-2 md:py-3 lg:py-3 border border-gray-300 rounded-full focus:outline-none text-textprimary text-[17px] lg:text-[17px]"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary  lg:py-3 lg:px-3 md:py-3 md:px-3 py-2 px-2 rounded-full cursor-pointer"
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

          <div className=" ">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:gap-4 md:gap-4 gap-3 ">
              <div className=" bg-primary p-1 rounded-full bg-opacity-5">
                <Select
                  options={universityOptions}
                  placeholder={t("filter-1")}
                  value={selectedUniversity}
                  onChange={handleUniversityChange}
                  className="rounded-full text-sm md:text-md lg:text-base  "
                  styles={customStyles} // Apply custom styles here
                  isSearchable={false}
                  isClearable
                />
              </div>
              <div className=" bg-primary p-1 rounded-full bg-opacity-5">
                <Select
                  options={locationOptions}
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  placeholder={t("filter-2")}
                  isClearable
                  className="rounded-full text-sm md:text-md lg:text-base"
                  styles={customStyles} // Apply custom styles here
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
