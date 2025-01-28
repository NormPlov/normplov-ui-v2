"use client";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import React from "react";
//import { useAppDispatch } from "@/redux/hooks";
//import { setProvince } from "@/redux/feature/filter/filterSlice";

import SliderUniversity from "./SliderUniversity";
import { useTranslations } from "next-intl";

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

export default function UniversityMainContainer({
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
    { value: "Kampong Cham", label:t("Kampong Cham") },
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

  return (
    <div className="relative min-h-[200px] lg:h-[600px] md:h-[410px] w-full">
      <div className="absolute lg:block md:block hidden inset-0 bg-cover bg-center w-full lg:h-[450px] md:h-96 h-60">
        <SliderUniversity />
      </div>

      <div className="container   relative z-10 mx-auto px-4 lg:py-40  py-10">
        <div className="max-w-7xl mx-auto py-4 md:py-6 px-2 md:px-4 relative z-10">
          <h1 className="text-2xl md:text-4xl  lg:text-5xl  bordered-text font-bold lg:text-slate-100 md:text-white text-primary  text-center lg:mb-8 md:mb-8 mb-4">
          {t("header")}
          </h1>
          <p className="lg:text-white md:text-gray-200 text-gray-600  lg:text-xl md:text-xl text-md text-center">
          {t("description")}
          </p>
        </div>
        <div className="lg:max-w-4xl md:max-w-2xl  mx-auto space-y-4">
          <div className="flex relative">
            <input
              type="text"
              placeholder={t("search")}
              className="flex-1 lg:px-3  text-sm lg:border-2 md:border-2 border  md:text-md lg:text-lg lg:py-2 md:px-5 md:py-2 px-4 py-1 h-[40px] md:h-auto lg:h-auto lg:rounded-[5px] md:rounded-[5px]  rounded-[5px] border-gray-300 lg:border-slate-200 md:border-gray-100 focus:border-primary"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="  absolute rounded-r-lg ml-[360px] md:ml-[635px]   lg:py-1.5 md:py-1 py-1 lg:ml-[852px] ">
              <button
                type="button"
                className="px-2 py-4 mr-2 flex justify-center items-center  bg-primary rounded-full lg:w-9 lg:h-9 md:w-8 md:h-8 w-8 h-7 text-white transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 md:gap-4 gap-3">
            <Select
              options={universityOptions}
              placeholder={t("filter-1")}
              value={selectedUniversity}
              onChange={handleUniversityChange}
              className="rounded-[8px] text-sm md:text-md lg:text-base  "
              isClearable
            />
            <Select
              options={locationOptions}
              value={selectedLocation}
              onChange={handleLocationChange}
              placeholder={t("filter-2")}
              isClearable
              className="rounded-full text-sm md:text-md lg:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
