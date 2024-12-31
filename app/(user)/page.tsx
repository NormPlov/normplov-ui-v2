"use client";
import CardUniversity from "@/components/UniversityComponent/CardUniversity";
import FeatureGrid from "@//components/ui/FeatureGrid";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { BiRightArrowAlt } from "react-icons/bi";
import TeamProfilesHomePage from "@/components/ui/TeamProfilesHomePaage";
import ProcessHomePage from "@/components/ui/ProcessHomePage";
import { useGetPopularSchoolsQuery } from "@/redux/service/university";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import ChartJobTrending from "@/components/ui/chartJob_trending";
import React, { useEffect, useState } from "react";
import CardUniversitySkeletonHomePage from "@/components/SkeletonLoading/UniversitySkeleton/CardUniversitySkeletonHomePage";

const mockTrendingJobs = [
  { month: "Jan", label: "Data Scientist", count: 320 },
  { month: "Feb", label: "Backend Developer", count: 420 },
  { month: "Mar", label: "AI Specialist", count: 310 },
  { month: "Apr", label: "Software Engineer", count: 290 },
  { month: "May", label: "Cybersecurity Expert", count: 270 },
  { month: "Jun", label: "DevOps Engineer", count: 440 },
  { month: "Jul", label: "Frontend Developer", count: 250 },
  { month: "Aug", label: "MIS", count: 380 },
  { month: "Sep", label: "Financial HR", count: 340 },
  { month: "Oct", label: "Data Analyst", count: 290 },
  { month: "Nov", label: "Software Engineer", count: 310 },
  { month: "Dec", label: "Backend Developer", count: 370 },
];

// Define the types for the props
interface FeatureCardProps {
  image: string; // Path to the image
  title: string; // Title of the feature
  description: string; // Description of the feature
}

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
  const router = useRouter();
  //const [trendingJobs, setTrendingJobs] = useState<TrendingJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { search, province_uuid, page } = useAppSelector(
    (state) => state.filter
  ); // Ensure you have selectedUniversity in Redux

  const { data, isLoading } = useGetPopularSchoolsQuery({
    search,
    province_uuid,
    page,
  });

  // Fetch Trending Jobs Data
  useEffect(() => {
    const fetchTrendingJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_URL = `https://normplov-api.shinoshike.studio/api/v1/jobs/trending-jobs`;
        console.log("Fetching data from:", API_URL);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 200 && result.payload?.trending_jobs) {
          // setTrendingJobs(result.payload.trending_jobs);
        } else {
          throw new Error(result.message || "Failed to fetch data.");
        }
      } catch (err: unknown) {
        console.error("Fetch Error:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingJobs();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/university/${id}`);
  };

  return (
    <div className="w-full h-auto bg-white ">
      {/* Hero Section */}
      <section className="relative ">
        {/* Text Content */}
        <div className="flex justify-center ">
          <div className="container mx-auto px-4 pt-10 md:pt-16 lg:pt-16 text-center ">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold lg:mb-6 md:mb-4 mb-0">
              <span className="text-emerald-500">ស្វែងរក</span>
              <span className="text-orange-400">ជំនាញឯកទេស</span>
              <span className="text-emerald-500">របស់អ្នក</span>
            </h1>
            <p className="lg:max-w-5xl md:max-w-2xl max-w-4xl mx-auto text-textprimary lg:text-2xl md:text-2xl text-md m-3">
              រកឃើញសក្តានុពលរបស់អ្នក និងស្វែងរកជំនាញឯកទេស
              នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត
              ចំណុចខ្លាំងនិងគោលដៅអាជីពនាពេលអនាគតរបស់អ្នក។
            </p>

            <button className="bg-emerald-500 text-white px-6 py-2 md:px-8 md:py-3 lg:px-8 lg:py-3 rounded-xl text-md md:text-lg lg:text-lg hover:bg-emerald-600 transition-colors">
              ចាប់ផ្តើម
            </button>
          </div>
        </div>
        {/* Background Image */}
        <div>
          <Image
            src="/assets/background-home-page.png"
            alt="Background Home Page"
            width={2000}
            height={2000}
            className="object-cover w-full h-[50%]"
          />
        </div>
      </section>

      {/* Who is Norm Plov for?   */}
      <section className="max-w-7xl mx-auto my-6">
        <div className="container px-4 lg:py-12 md:py-12 py-3">
          <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-center lg:mb-12 md:m-12 mb-4 text-textprimary">
            តើ<span className="text-emerald-500">នាំផ្លូវ</span>សម្រាប់អ្នកណា?
          </h1>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-8 md:gap-6 gap-0">
            {/* Feature 1: Student */}
            <FeatureCard
              image="/assets/feature-01.png"
              title="សិស្សវិទ្យាល័យ"
              description="សិស្សវិទ្យាល័យអាចស្វែងយល់ពីចំណង់ចំណូលចិត្តរបស់ខ្លួននិងមុខវិជ្ជាដែលខ្លួនចូលចិត្ត"
            />

            {/* Feature 2: Undergraduate */}
            <FeatureCard
              image="/assets/feature-02.png"
              title="សិស្សសកលវិទ្យាល័យ"
              description="សិស្សសកលវិទ្យាល័យដែលមានអារម្មណ៍ថាកំពុងជ្រើសរើសជំនាញខុស"
            />

            {/* Feature 3: Business Professional */}
            <FeatureCard
              image="/assets/feature-03.png"
              title="បុគ្គលិកកំពុងធ្វើការងារ"
              description="បុគ្គលិកដែលមានបំណងចង់ផ្លាស់ប្តូរការងារ ដែលមិនច្បាស់នឹងជំនាញដែលខ្លួនកំពុងធ្វើ"
            />
          </div>
        </div>
      </section>
      {/* Feature Section */}
      <section>
        <FeatureGrid />
      </section>
      {/* ការងារដែលកំពុងមានតម្រូវការ Section */}
      <section className=" bg-bglight p-6 ">
        <div className="max-w-7xl mx-auto my-4 md:my-6 flex justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 text-textprimary">
            ការងារដែលកំពុងមានតម្រូវការ
          </h1>
        </div>
        <div className="max-w-7xl mx-auto my-4 md:my-6 h-full w-full   ">
          {loading ? (
            <div>
              <div className=" animate-pulse bg-slate-200 w-full lg:h-[500px] md:h-[370px] rounded-xl mt-10"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <ChartJobTrending trendingJobs={mockTrendingJobs} />
          )}
        </div>

        <div className="  bg-primary lg:w-60 lg:h-12 md:w-60 md:h-12 w-40 h-11 flex justify-center rounded-3xl items-center max-w-7xl mx-auto my-4 md:my-6">
          <Link
            href="/"
            className=" flex w-60 h-12 lg:space-x-3 md:space-x-3 space-x-1 justify-center items-center"
          >
            <div className="text-lg  text-white">ព័ត៌មានបន្ថែម</div>
            <GoArrowRight className="lg:h-6 lg:w-6 md:h-6 md:w-6 h-5 w-5 text-white" />
          </Link>
        </div>
      </section>
      {/* University card Section */}
      <section className=" lg:p-10 md:p-10 p-4">
        <div className="max-w-7xl mx-auto my-4 md:my-6 flex lg:justify-between md:justify-between justify-center items-center">
          <h1 className="text-2xl  w-[90%] lg:w-full md:w-full md:text-4xl lg:text-5xl font-bold lg:text-start md:text-center  text-center mb-2 text-textprimary">
            សាកលវិទ្យាល័យដែលមានប្រជាប្រិយភាព
          </h1>
          <Link
            href="/university"
            className="text-xl  lg:flex md:hidden hidden justify-center items-center font-bold text-center mb-2 text-textprimary"
          >
            <div className="flex">
              <div className="text-primary w-32  ">ព័ត៌មានបន្ថែម</div>
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
            href=""
            className="text-xl lg:hidden md:flex hidden justify-end mt-6 items-center font-bold text-center text-textprimary"
          >
            <div className="text-primary">ព័ត៌មានបន្ថែម</div>
            <BiRightArrowAlt className="text-3xl ml-2 text-primary" />
          </Link>
        </div>
      </section>
      {/* Team Profiles card Section */}
      <section>
        <TeamProfilesHomePage />
      </section>
      {/* Process card Section */}
      <section>
        <ProcessHomePage />
      </section>
      {/* Feedback Section */}
      <section>{/* <FeedbackHomePage/> */} </section>
    </div>
  );
}

// Reusable FeatureCard Component
function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg ">
      {/* Fixed-size Image Container */}
      <div className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]  mb-2">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="object-contain w-full h-full"
        />
      </div>
      {/* Content */}
      <div className="lg:p-4 md:p-0 p-2 rounded-lg lg:w-90 md:w-78 w-90">
        <h2 className="lg:text-3xl  md:text-2xl text-xl font-semibold mb-3 text-textprimary">
          {title}
        </h2>
        <p className="text-gray-600 lg:text-xl md:text-xl text-md leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
