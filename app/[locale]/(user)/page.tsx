"use client";
import CardUniversity from "@/components/UniversityComponent/CardUniversity";
import FeatureGrid from "@//components/ui/FeatureGrid";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { BiRightArrowAlt } from "react-icons/bi";
import TeamProfilesHomePage from "@/components/ui/TeamProfilesHomePaage";
import { useGetPopularSchoolsQuery } from "@/redux/service/university";
import { useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import ChartJobTrending from "@/components/ui/chartJob_trending";
import React, { useState } from "react";
import CardUniversitySkeletonHomePage from "@/components/SkeletonLoading/UniversitySkeleton/CardUniversitySkeletonHomePage";
import { useTranslations } from "next-intl";
import { useGetTrendingJobQuery } from "@/redux/service/jobs";
import Testimonial from "@/components/ui/testimonial";
import { cn } from "@/lib/utils";
import { DotPattern } from "../../../components/ui/dot-pattern";
import { TimelineDemo } from "@/components/ui/TimelineDemo";
import NromplovFor from "@/components/ui/NromplovFor";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import GridPattern from "@/components/ui/GridPattern";


//const mockTrendingJobs = [
 // { month: "Jan", label: "Data Scientist", count: 320 },
 // { month: "Feb", label: "Backend Developer", count: 420 },
 // { month: "Mar", label: "AI Specialist", count: 310 },
 // { month: "Aug", label: "MIS", count: 380 },
 // { month: "Sep", label: "Financial HR", count: 340 },
//  { month: "Oct", label: "Data Analyst", count: 290 },
 // { month: "Nov", label: "Software Engineer", count: 310 },
 // { month: "Dec", label: "Backend Developer", count: 370 },
//];

// Define the types for the props
//interface FeatureCardProps {
//  image: string; // Path to the image
 // title: string; // Title of the feature
//  description: string; // Description of the feature
//}

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
//interface TrendingJob {
// month: string;
// label: string;
// count: number;
//}
export default function Page() {
  const t = useTranslations("HomePage"); // Hook to access translations
  const router = useRouter();
  //const [trendingJobs, setTrendingJobs] = useState<TrendingJob[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
 
  const { search, province, page } = useAppSelector(
    (state) => state.filter
  ); // Ensure you have selectedUniversity in Redux

  const { data, isLoading } = useGetPopularSchoolsQuery({
    search,
    province,
    page,
  });
  console.log("university", data);

  // Use the query hook to fetch trending jobs
  const { data: trendingJobsData, isLoading: isLoadingTrendingJobs } =
    useGetTrendingJobQuery();

  const trendingJobs = trendingJobsData?.payload?.trending_jobs || [];
  //console.log("Trending Jobs:", trendingJobs);
  console.log("Trending Jobs Data:", trendingJobsData);

  const { locale } = useParams();
  const handleCardClick = (id: string) => {
    router.push(`${locale}/university/${id}`);
  };
  const handleTest = () => {
    router.push(`${locale}/test`);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true,
      // Animation duration (in ms)
      // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="w-full h-auto bg-white ">
      {/* Hero Section */}

      <div className="absolute p-10 inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
      <section className="relative ">
        {/* Text Content */}
        <div className="flex justify-center z-20">
          <div className="container mx-auto px-4 pt-10 md:pt-16 lg:pt-16 text-center ">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold lg:mb-6 md:mb-4 mb-0">
              <span className="text-emerald-500">{t("heading.part1")}</span>
              <span className="text-orange-400">{t("heading.part2")}</span>
              <span className="text-emerald-500">{t("heading.part3")}</span>
            </h1>
            <p className="lg:max-w-5xl md:max-w-2xl max-w-4xl mx-auto text-textprimary lg:text-2xl md:text-2xl text-md m-3">
              {t("description")}
            </p>

            <button
              onClick={() => handleTest()}
              className="bg-emerald-500 text-white px-6 py-2 md:px-8 md:py-3 lg:px-8 lg:py-3 rounded-xl text-md md:text-lg lg:text-lg hover:bg-emerald-600 transition-colors"
            >
              {t("getstart")}
            </button>
          </div>
        </div>
        {/* Background Image */}
        <Image
          src="/assets/background-home-page.png"
          alt="Background Home Page"
          width={2000}
          height={2000}
          className="object-cover w-full h-[50%]"
        />
      </section>

      {/* Who is Norm Plov for?   */}
      <section
        data-aos="zooom-in-left"
        className=" flex justify-center   relative"
      >
        <div className="absolute p-10 inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="container relative  max-w-7xl mx-auto   lg:px-4 px-8 lg:py-12 md:py-12 py-3">
          <NromplovFor />
        </div>
      </section>
      {/* Feature Section */}
      <section className="">
        <FeatureGrid />
      </section>
      {/* Trending job Section */}
      <section className=" bg-bglight p-6 ">
        <div className="max-w-7xl mx-auto my-4 md:my-6 flex justify-center">
          <div className="text-2xl md:text-4xl lg:text-4xl font-bold text-center mb-2 text-textprimary">
            {t("trendingJob.title")}
          </div>
        </div>
        <div className="max-w-7xl mx-auto my-4 md:my-6 h-full w-full   ">
          {isLoadingTrendingJobs ? (
            <div>
              <div className=" animate-pulse bg-slate-200 w-full lg:h-[500px] md:h-[370px] rounded-xl mt-10"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <ChartJobTrending trendingJobs={trendingJobs} />
          )}
        </div>
        <div className="  bg-primary lg:w-60 lg:h-12 md:w-60 md:h-12 w-40 h-11 flex justify-center rounded-3xl items-center max-w-7xl mx-auto my-4 md:my-6">
          <Link
            href={`${locale}/jobs`}
            className=" flex w-60 h-12 lg:space-x-3 md:space-x-3 space-x-1 justify-center items-center"
          >
            <div className="text-lg  text-white">
              {t("trendingJob.moreInfo")}
            </div>
            <GoArrowRight className="lg:h-6 lg:w-6 md:h-6 md:w-6 h-5 w-5 text-white" />
          </Link>
        </div>
      </section>
      {/* University card Section */}
      <section className=" lg:p-10 md:p-10 p-4">
        <div className="max-w-7xl px-4 mx-auto my-4 md:my-6 flex lg:justify-between md:justify-start justify-center items-center">
          <div className="text-2xl  w-full lg:w-full md:w-full md:text-4xl lg:text-4xl font-bold lg:text-start md:text-start  text-center mb-2 text-textprimary">
            {t("PopularUniversities.title")}
          </div>
          <Link
            href={`/${locale}/university`}
            className="text-xl  lg:flex md:hidden hidden justify-center items-center font-bold text-center mb-2 text-textprimary"
          >
            <div className="flex">
              <div className="text-primary w-32  ">
                {t("trendingJob.moreInfo")}
              </div>
              <BiRightArrowAlt className="text-3xl  text-primary" />
            </div>
          </Link>
        </div>
        <div>
          {isLoading ? (
            // Show Skeletons if data is loading
            <div className="max-w-7xl mx-auto my-4 md:my-6 mt-10 grid w-auto auto-rows-fr grid-cols-1 lg:gap-8 md:gap-8 gap-4 sm:mt-12 lg:grid-cols-2 md:grid-cols-1">
              {[...new Array(4)].map((_, index) => (
                <CardUniversitySkeletonHomePage key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="max-w-7xl mx-auto my-4 md:my-6 mt-10 grid w-auto auto-rows-fr grid-cols-1 lg:gap-8 md:gap-8 gap-4 sm:mt-12 lg:grid-cols-2 md:grid-cols-1">
              {/* Show the actual data if it's loaded */}
              {data?.payload?.map(
                (university: UniversityType, index: number) => (
                  <CardUniversity
                    key={index}
                    kh_name={university.kh_name}
                    en_name={university.en_name}
                    location={university.location}
                    popular_major={university.popular_major}
                    logo_url={university.logo_url || "/assets/default.png"}
                    onClick={() => handleCardClick(university.uuid)}
                  />
                )
              )}
            </div>
          )}

          <Link
            href={`/${locale}/university`}
            className="text-xl lg:hidden md:flex hidden justify-end mt-6 items-center font-bold text-center text-textprimary"
          >
            <div className="text-primary">{t("trendingJob.moreInfo")}</div>
            <BiRightArrowAlt className="text-3xl ml-2 text-primary" />
          </Link>
        </div>
      </section>
      {/* Team Profiles card Section */}
      <section className="bg-slate-50 p-10">
        <TeamProfilesHomePage />
      </section>
      {/* Process card Section */}
      <section>
        <TimelineDemo />
      </section>

      {/* Feedback Section */}
      <section className="relative size-full lg:p-20 md:p-10 p-4 items-center justify-center rounded-lg bg-background">
        {/* Background DotPattern */}
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "  w-full h-full z-0 opacity-70 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />

        {/* Content */}
        <div className=" text-center space-y-4  ">
          <div className="text-textprimary text-2xl md:text-4xl lg:text-4xl font-bold">
          {t("Testimonial.title")}
          </div>
          <div className="text-gray-600 lg:text-2xl md:text-xl text-lg">
          {t("Testimonial.decision-part1")}{" "}
            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1">
            {t("Testimonial.decision-part2")}
            </span>{" "}
            {t("Testimonial.decision-part3")}
          </div>
        </div>
        {/* Testimonial Section */}
        <div className=" max-w-7xl mx-auto mt-[50px]   ">
          <Testimonial />
        </div>
      </section>
    </div>
  );
}


