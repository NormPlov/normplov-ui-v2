"use client";
import CardUniversity from "@/components/UniversityComponent/CardUniversity";
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
import { useTranslations } from "next-intl";
import SearchAndFilter from "@/components/UniversityComponent/SearchAndFilter";
import SliderUniversity from "@/components/UniversityComponent/SliderUniversity";

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
  province: string;
  popular_major: string;
  logo_url: string | null; // Handle null value
};

export default function Page() {
  const t = useTranslations("University"); // Hook to access translations
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { locale } = useParams(); // Extract the current locale
  const { search, province, page, selectedUniversity } = useAppSelector(
    (state) => state.filter
  ); // Ensure you have selectedUniversity in Redux

  // Dropdown options for location
  const locationOptions: OptionType[] = [
    { value: "Phnom Penh", label: "រាជធានីភ្នំពេញ" },
    { value: "Battambang", label: "បាត់ដំបង" },
    { value: "Siem Reap", label: "សៀមរាប" },
    { value: "Banteay Meanchey", label: "បន្ទាយមានជ័យ" },
    { value: "Kampong Cham", label: "កំពង់ចាម" },
    { value: "Kampong Speu", label: "កំពង់ស្ពឺ" },
    { value: "Kampong Thom", label: "កំពង់ធំ" },
    { value: "Kampot", label: "កំពត" },
    { value: "Kandal", label: "កណ្តាល" },
    { value: "Koh Kong", label: "កោះកុង" },
    { value: "Kratié", label: "ក្រចេះ" },
    { value: "Mondulkiri", label: "មណ្ឌលគិរី" },
    { value: "Preah Vihear", label: "ព្រះវិហារ" },
    { value: "Prey Veng", label: "ព្រៃវែង" },
    { value: "Pursat", label: "ពោធិ៍សាត់" },
    { value: "Ratanakiri", label: "រតនៈគិរី" },
    { value: "Preah Sihanouk", label: "ព្រះសីហនុ" },
    { value: "Stung Treng", label: "ស្ទឹងត្រែង" },
    { value: "Svay Rieng", label: "ស្វាយរៀង" },
    { value: "Takéo", label: "តាកែវ" },
    { value: "Oddar Meanchey", label: "ឧត្តមានជ័យ" },
    { value: "Kep", label: "កែប" },
    { value: "Pailin", label: "ប៉ៃលិន" },
    { value: "Tboung Khmum", label: "ត្បូងឃ្មុំ" },
  ];

  // Find the selected location (OptionType) based on province_uuid
  const selectedLocation = locationOptions.find(
    (option) => option.value === province
  );

  const { data, error, isLoading } = useGetUniversitiesQuery(
    { search, province, type: selectedUniversity?.value || "", page },
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
    <div className="mb-5 ">
      {/* Include the UniversityMainContainer */}
      <div className="relative min-h-[200px] lg:h-screen md:h-[410px] w-full flex justify-center items-center">
        <div className="absolute  inset-0 bg-cover bg-center w-full lg:h-screen md:h-[410px] h-60">
          <SliderUniversity />
        </div>
        <div className="container   relative z-10 mx-auto lg:-mt-20  md:-mt-8 mt-6">
          <div className="max-w-6xl mx-auto  px-2 md:px-4 relative z-10">
            <h1 className="text-2xl md:text-4xl  lg:text-5xl  bordered-text font-bold lg:text-slate-100 md:text-white text-white  text-center lg:mb-8 md:mb-8 mb-4">
              {t("header")}
            </h1>
            <p className="lg:text-white md:text-gray-200 text-white  lg:text-2xl md:text-xl text-md text-center">
              {t("description")}
            </p>
          </div>
          <div className="flex justify-center lg:mt-8 md:mt-8 mt-4 px-2 md:px-4 relative z-10">
            <div
              className="bg-primary lg:px-4 md:px-4 px-3 py-2 rounded-full lg:text-lg md:text-lg text-md text-slate-100  cursor-pointer"
              onClick={() => {
                const element = document.getElementById("search");
                const offset = 80; // កំណត់ offset នៅទីនេះ (100px)

                if (element) {
                  const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - offset + 10;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {t("see-btn")}
            </div>
          </div>
        </div>
      </div>

      <section id="search" className=" ">
        <div className="flex justify-center lg:mt-10 md:mt-10 mt-16 ">
          <div className="lg:w-[80%] md:w-[85%] w-[94%] space-y-2">
            <div className="md:text-3xl lg:text-3xl text-2xl  text-textprimary font-semibold">
              {t("seach-header")}
            </div>
          </div>
        </div>
        <SearchAndFilter
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
      </section>

      <section className="flex justify-center mt-10 ">
        <div className="lg:w-[80%] md:w-[85%] w-[94%]">
          <div>
            <h1 className="text-2xl w-[90%] lg:w-full md:w-full md:text-3xl lg:text-3xl font-bold lg:text-start md:text-start text-start lg:mb-2 md:mb-2 mb-0  text-textprimary">
              {selectedUniversity?.label
                ? `${selectedUniversity.label}`
                : t("contain-1")}
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
              <div className="  container flex justify-center lg:w-[1000px] md:w-[950px]  w-[950px] ">
                <div className="">
                  <div>
                    <Image
                      src="https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/6514e57fce3e02e011dc4a00_Search%20Empty.avif"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full h-full opacity-70"
                    />
                  </div>
                  <div className="text-2xl mt-6 font-semibold mb-4 text-gray-600 text-center">
                    {t("not-found")}
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
