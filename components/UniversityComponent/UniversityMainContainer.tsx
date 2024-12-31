"use client";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setProvince } from "@/redux/feature/filter/filterSlice";

import SliderUniversity from "./SliderUniversity";

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
  const dispatch = useAppDispatch();

  // Dropdown options for university types (can be dynamic)
  const universityOptions: OptionType[] = [
    { value: "PUBLIC", label: "សាកលវិទ្យាល័យរដ្ឋ" },
    { value: "PRIVATE", label: "សាកលវិទ្យាល័យឯកជន" },
    {
      value: "TVET",
      label: "កម្មវិធីបណ្តុះបណ្តាលជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈ",
    },
    { value: "MAJORS_COURSES", label: "កម្មវិធីសិក្សាជំនាញខ្លីៗ" },
  ];

  // Dropdown options for location
  const locationOptions: OptionType[] = [
    { value: "1e9ab46c-acee-4d4a-b784-ad4c59b0e5de", label: "រាជធានីភ្នំពេញ" },
    { value: "0b065bd6-eef2-49b0-82c4-94a866e70063", label: "បាត់ដំបង" },
    { value: "7654b5a3-916a-40af-917f-8c83b6c0593a", label: "សៀមរាប" },
    { value: "e7de9bc3-4304-49a2-8542-2561f20c4cae", label: "បន្ទាយមានជ័យ" },
    { value: "7891f14e-6daa-4794-b12f-f301708b8fb2", label: "កំពង់ចាម" },
    { value: "eb3129a5-377d-4673-b168-ce021778f7eb", label: "កំពង់ស្ពឺ" },
    { value: "a621f738-5cc2-43e1-b0ae-d3c725f83811", label: "កំពង់ធំ" },
    { value: "60a22231-be39-4e29-971a-eb3dc91c7839", label: "កំពត" },
    { value: "f9fe68d4-19ea-426c-bbbc-bd1ed9beb32a", label: "កណ្តាល" },
    { value: "c1863af2-cddd-4703-ba62-dd6893f7a14a", label: "កោះកុង" },
    { value: "e335a512-8e32-4fab-9794-97ce1170323c", label: "ក្រចេះ" },
    { value: "e42ca7d5-6d1b-4e1d-9f34-762f54a9b028", label: "មណ្ឌលគិរី" },
    { value: "04658442-3269-4309-9743-601d8ff7a57e", label: "ព្រះវិហារ" },
    { value: "951a137c-4c9f-46ed-84b9-71ba185cb303", label: "ព្រៃវែង" },
    { value: "ece50ad6-0a80-48c6-a8e2-063e52823997", label: "ពោធិ៍សាត់" },
    { value: "c9f7dd87-35c9-4664-b677-cbc6388f7dae", label: "រតនៈគិរី" },
    { value: "bb8630a8-332f-4f25-9dec-aecc266ae73a", label: "ព្រះសីហនុ" },
    { value: "916ae2b7-f7d8-4e7d-acb0-25793ccc385c", label: "ស្ទឹងត្រែង" },
    { value: "cb0849d7-c665-4b7b-8040-b9d17485d64e", label: "ស្វាយរៀង" },
    { value: "6dd30ab7-f766-4f70-8f1e-7a4b090f2ceb", label: "តាកែវ" },
    { value: "88bf4455-48d5-4859-bec1-27e26798d8a7", label: "ឧត្តមានជ័យ" },
    { value: "3a9f5f39-0f29-4be0-bceb-da5f88819283", label: "កែប" },
    { value: "1af7c848-160d-40cf-afe5-0009edab3435", label: "ប៉ៃលិន" },
    { value: "4d3027ae-d944-4934-873f-3e4699b60fb5", label: "ត្បូងឃ្មុំ" },
  ];



  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Update search in Redux state
  };

  // Handle university selection change
  const handleUniversityChange = (selectedOption: OptionType | null) => {
    setSelectedUniversity(selectedOption); // Local state update (optional)
  };

  // Handle location selection change
  const handleLocationChange = (selectedOption: OptionType | null) => {
    setSelectedLocation(selectedOption);
    dispatch(setProvince(selectedOption?.value || "")); // Dispatch to Redux
  };

  return (
    <div className="relative min-h-[200px] w-full">
      <div className="absolute lg:block md:block hidden inset-0 bg-cover bg-center w-full lg:h-96 md:h-96 h-60">
        <SliderUniversity/>
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:py-32 md:py-24 py-10">
        <h1 className="text-2xl md:text-4xl  bo lg:text-5xl  bordered-text font-bold lg:text-white md:text-white text-primary  text-center lg:mb-8 md:mb-8 mb-4">
          ស្វែងរកគ្រឹះស្ថានសិក្សាទៅកម្ពុជា
        </h1>

        <div className="lg:max-w-4xl md:max-w-2xl  mx-auto space-y-4">
          <div className="flex">
            <input
              type="text"
              placeholder="ស្វែងរកទីនេះ....."
              className="flex-1 lg:px-5 text-sm border border-gray-300 md:text-md lg:text-lg lg:py-2 md:px-5 md:py-2 px-4 py-1 h-[36px] md:h-auto lg:h-auto lg:rounded-xl md:rounded-xl  rounded-full  border-1 lg:border-gray-100 md:border-gray-100 focus:border-primary"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="rounded-r-lg px-0.5 lg:py-1 md:py-1 py-0.5 lg:-ml-11 md:-ml-11 -ml-9">
              <button
                type="button"
                className="px-2 py-4 mr-2 flex justify-center items-center  bg-primary rounded-full lg:w-9 lg:h-9 md:w-9 md:h-9 w-8 h-8 text-white transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 md:gap-4 gap-3">
            <Select
              options={universityOptions}
              placeholder="សាកលវិទ្យាល័យទាំងអស់"
              value={selectedUniversity}
              onChange={handleUniversityChange}
              className="rounded-full text-sm md:text-md lg:text-base  "
              isClearable
            />
            <Select
              options={locationOptions}
              value={selectedLocation}
              onChange={handleLocationChange}
              placeholder="រាជធានីភ្នំពេញ"
              isClearable
              className="rounded-full text-sm md:text-md lg:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
