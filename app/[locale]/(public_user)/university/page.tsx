"use client";
import CardUniversity from "@/components/UniversityComponent/CardUniversity";
import UniversityMainContainer from "@/components/UniversityComponent/UniversityMainContainer";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  setPage,
  setProvince,
  setSearch,
  setSelectedUniversity, // Ensure you have this action in your slice
} from "@/redux/feature/filter/filterSlice";
import UniversitySkeleton from "@/components/SkeletonLoading/UniversitySkeleton/UniversitySkeleton";
import Image from "next/image";
import { useGetUniversitiesQuery } from "@/redux/service/university";
import Pagination from "@/components/UniversityComponent/Pagination";


type OptionType = {
  value: string;
  label: string;
};

// Type definition for universities
type UniversityType = {
  uuid: string;
  kh_name: string;
  en_name: string;
  location: string;
  province_name: string;
  popular_major: string;
  logo_url: string | null; // Handle null value
};

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const { locale } = useParams(); // Extract the current locale
  const { search, province_uuid, page, selectedUniversity } = useAppSelector(
    (state) => state.filter
  ); // Ensure you have selectedUniversity in Redux

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

  // Find the selected location (OptionType) based on province_uuid
  const selectedLocation = locationOptions.find(
    (option) => option.value === province_uuid
  );

  const { data, error, isLoading } = useGetUniversitiesQuery(
    { search, province_uuid, type: selectedUniversity?.value || "", page },
    { refetchOnMountOrArgChange: true } // Force refetch on arguments change
  );

  const university = data?.payload?.schools || [];
  const totalPages = data?.payload?.metadata?.total_pages || 1;

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  //console.log("university",data)
  //const handleNextPage = () => {
  //  dispatch(setPage(page + 1));
  //};
  //const handlePreviousPage = () => {
  //  dispatch(setPage(Math.max(page - 1, 1)));
  //};

  if (isLoading) return <UniversitySkeleton />;

  if (error) {
    // Check if the error is an instance of FetchBaseQueryError
    if ("status" in error) {
      // For FetchBaseQueryError, you can access the status and data
      return <div>Error: An error occurred </div>;
    }
    // For SerializedError, handle it separately
    return <div>Error: {error.message || "Something went wrong"}</div>;
  }

  const handleCardClick = (id: string) => {
    router.push(`/${locale}/university/${id}`);
  };

 

  return (
    <div className="mb-5">
      {/* Include the UniversityMainContainer to filter/search */}
      <UniversityMainContainer
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={(value) =>
          dispatch(setSelectedUniversity(value))
        }
        selectedLocation={selectedLocation || null} // Pass OptionType or null
        setSelectedLocation={(location) =>
          dispatch(setProvince(location?.value || ""))
        }
        search={search}
        setSearch={(value: string) => dispatch(setSearch(value))}
      />
      

      <section className="flex justify-center mt-10 ">
        <div className="lg:w-[80%] md:w-[90%] w-[94%]">
          <div>
            <h1 className="text-2xl w-[90%] lg:w-full md:w-full md:text-3xl lg:text-3xl font-bold lg:text-start md:text-start text-start lg:mb-2 md:mb-2 mb-0  text-textprimary">
              {selectedUniversity?.label
                ? `${selectedUniversity.label}`
                : "សាកលវិទ្យាល័យរដ្ឋ និងឯកជន"}
            </h1>
          </div>
          <div className=" mx-auto my-4 md:my-6 lg:mt-10 md:mt-10 mt-4  grid w-auto auto-rows-fr grid-cols-1 lg:gap-8 md:gap-8 gap-3 sm:mt-12 lg:grid-cols-2 md:grid-cols-1">
            {university.length > 0 ? (
              university.map((university: UniversityType) => (
                <CardUniversity
                  key={university.uuid} // Use uuid instead of index
                  kh_name={university.kh_name}
                  en_name={university.en_name}
                  location={university.location}
                  popular_major={university.popular_major}
                  logo_url={university.logo_url || "/assets/default.png"}
                  onClick={() => handleCardClick(university.uuid)}
                />
              ))
            ) : (
              <div className="lg:w-[1350px] md:w-[700px] items-center flex justify-center text-xl  h-[600px]">
                <div>
                  <Image
                    src="https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/6514e57fce3e02e011dc4a00_Search%20Empty.avif"
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full opacity-70"
                  />
                  <div className="text-2xl mt-6 mb-4 text-gray-600 text-center">
                    ការស្វែងរករបស់អ្នកមិនមាននិទ្នន័យ
                  </div>
                </div>
              </div> // Show this if the universities array is empty
            )}
          </div>
          {university.length > 0 && (
            <div className="mt-6 mb-3">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                setCurrentPage={handlePageChange} // This dispatches the setPage action
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
