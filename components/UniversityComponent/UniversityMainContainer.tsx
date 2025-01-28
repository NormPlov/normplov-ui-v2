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
  // State to store dynamic options
  //const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);
  

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

  // Fetch locations dynamically from API
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


  // Handle location selection
  // Handle location selection
  const handleLocationChange = (selectedOption: OptionType | null) => {
    dispatch(setProvince(selectedOption?.value || ""));
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
            ស្វែងរកគ្រឹះស្ថានសិក្សានៅកម្ពុជា
          </h1>
          <p className="lg:text-gray-200 md:text-gray-200 text-gray-600  lg:text-xl md:text-xl text-md text-center">
            នៅទីនេះ អ្នកអាចស្វែងរកព័ត៌មានអំពីសាកលវិទ្យាល័យ
            និងវិទ្យាស្ថានឈានមុខគេនៅទូទាំងប្រទេស ដែលមានទីតាំងនៅបណ្តាខេត្ត
            និងរាជធានីភ្នំពេញ។
            គ្រឹះស្ថានសិក្សាទាំងនេះផ្តល់ជូននូវមុខវិជ្ជាសិក្សាជាច្រើនកម្រិត
            ដោយរួមមានថ្នាក់បរិញ្ញាបត្ររង, បរិញ្ញាបត្រ, បរិញ្ញាបត្រជាន់ខ្ពស់
            និងថ្នាក់បណ្ឌិត។
          </p>
        </div>
        <div className="lg:max-w-4xl md:max-w-2xl  mx-auto space-y-4">
          <div className="flex relative">
            <input
              type="text"
              placeholder="ស្វែងរកទីនេះ....."
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
              placeholder="សាកលវិទ្យាល័យទាំងអស់"
              value={selectedUniversity}
              onChange={handleUniversityChange}
              className="rounded-[8px] text-sm md:text-md lg:text-base  "
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
