import React, { useState } from "react";
import checkIcon from "@/public/Quiz/skill-icon/check.png";
import xIcon from "@/public/Quiz/skill-icon/x.png";
import QuizHeader from "../../QuizHeader";
import { QuizResultListing } from "../../QuizResultListing";
import { useFetchAssessmentDetailsQuery } from "@/redux/feature/assessment/result";
import { useParams } from "next/navigation";
import CardPersonality from "../../CardPersonality";
import { RecommendationCard } from "../../RecommendationCard";
import Pagination from "@/components/ProfileComponent/Pagination";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  TooltipProps
} from "recharts";
import Loading from "@/components/General/Loading";
import PersonalityResultSkeleton from "@/components/SkeletonLoading/ProfileComponent/PersonalityResultSkeleton";
import errorLoading from '@/public/assets/errorLoading.png'
import Image from "next/image";
import { useGetAllFinalTestUuidsQuery } from "@/redux/feature/assessment/quiz";
// Define types for API response
type PersonalityDimension = {
  dimension_name: string;
  score: number;
};

type ChartData = {
  label: string;
  score: number;
  color: string;
};

type BarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { color?: string };
};


type Major = {
  major_name: string; // The name of the major
  schools: string[];  // An array of schools offering the major
};
type Job = {
  category_name: string;
  responsibilities: string[];
}

type RecommendedCareer = {
  career_name: string;
  description: string;
  majors: Major[]; 
  career_uuid: string;
  categories: Job[];
};

// type PersonalityTraits = {
//   positive: string[];
//   negative: string[];
// };

// type Personality = {
//   name: string;
//   title: string;
//   description: string;
// };

// type CareerRecommendation = {
//   career_name: string;
//   description: string;
//   majors: {
//     major_name: string;
//     schools: string[];
//   }[];
// };

// type ApiResponse = {
//   personalityType: Personality;
//   dimensions: PersonalityDimension[];
//   traits: PersonalityTraits;
//   strengths: string[];
//   weaknesses: string[];
//   careerRecommendations: CareerRecommendation[];
// }[];

// type Major = {
//   major_name: string;
//   schools: string[];
// };

// type RecommendedCareer = {
//   career_name: string;
//   description: string;
//   majors: Major[];
// };

export const PersonalityResultComponent = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const dimensionFullNames: { [key: string]: string } = {
    I_Score: "Introvert Score",
    E_Score: "Extrovert Score",
    S_Score: "Sensors Score",
    T_Score: "Thinkers Score",
    J_Score: "Judgers Score",
    N_Score: "Intuitive Score",
    F_Score: "Feeling Score",
    P_Score: "Perceivers Score",
  };

  // Normalize the values from params
  // const resultType = Array.isArray(params.resultType) ? params.resultType   : params.resultType;
  // const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;


  const resultTypeString =
    typeof params.resultType === "string" ? params.resultType : "";

  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const { data: responseUuid } = useGetAllFinalTestUuidsQuery({ testUuid: uuidString })

  const finalUuid = resultTypeString === "all" ? responseUuid?.payload?.referenced_test_uuids?.Personality?.test_uuid || "" : uuidString;

  const finalResultTypeString = resultTypeString === "all" ? "personality" : resultTypeString;

  const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
    testUUID: finalUuid,
    resultType: finalResultTypeString,
  });

  console.log(`result: ${resultTypeString} id: ${uuidString}`);

  if (!resultTypeString || !uuidString) {
    return <div className=' w-full flex justify-center items-center'><Loading /></div>;
  }

  if (isLoading) {
    return <PersonalityResultSkeleton />
    // return <div className='bg-white w-full flex justify-center items-center'><Loading /></div>;
  }

  if (error) {
    return (
      <div className='bg-white w-full flex flex-col justify-center items-center py-6'>
        < Image
          src={errorLoading}
          alt="Error Loading Data"
          width={500}
          height={500}
          className="object-fill"
        />
        <p className='text-danger text-md lg:text-xl font-semibold text-center'>Sorry, we couldn&#39;t load your data right now.</p>
        <p className='text-gray-500 text-sm lg:text-lg text-center'>Try refreshing the page or come back later.</p>
      </div>
    );
  }


  //   const skillCategory = response?.[0]?.categoryPercentages;
  const personalities = response?.personalityType;
  const personalitiesDimension = response?.dimensions;
  const dimensions: PersonalityDimension[] = response?.dimensions || [];
  const chartData: ChartData[] = dimensions.map((dim, index) => ({
    label: dimensionFullNames[dim.dimension_name] || dim.dimension_name, // Use full name or fallback to the key
    score: dim.score,
    color: [
      "#fa6a02", // Orange
      "#fa0272", // Pink
      "#fadd02", // Yellow
      "#029bfa", // Teal
      "#02faa7", // green
      "#6502fa", // Orange
      "#11b851", // Purple
      "#f74848", // Orange

    ][index % 8], // Cycle through colors
  }));


  const CustomBar = (props: BarProps) => {
    const { x, y, width, height } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.payload?.color}
        radius={[4, 4, 0, 0]} // Rounded top corners
      />
    );
  };
  const renderCustomLegend = () => (
    <div className="w-full flex  flex-wrap gap-8  ">
      {chartData.map((entry, index) => (
        <div key={index} className="flex items-center  gap-4  ">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-md text-textprimary">{entry.label}</span>
        </div>
      ))}
    </div>
  );

  console.log("Personalities dimension", personalitiesDimension);
  // Function to dynamically get matching dimensions
  // const getDimensionPair = (name1: string, name2: string) => {
  //   const dim1 =
  //     personalitiesDimension?.find(
  //       (d: PersonalityDimension) => d.dimension_name === name1
  //     )?.score || 0;
  //   const dim2 =
  //     personalitiesDimension?.find(
  //       (d: PersonalityDimension) => d.dimension_name === name2
  //     )?.score || 0;
  //   return { dim1, dim2 };
  // };

  const personailitiesTrait = response?.traits;
  console.log("PersonailitiesTrait", personailitiesTrait);
  console.log("PersonailitiesTrait Positive", personailitiesTrait?.positive);
  console.log("PersonailitiesTrait Negative", personailitiesTrait?.negative);
  console.log("Personailities Strength", response?.strengths);
  console.log("Personailities Weakness", response?.weaknesses);

  //   if (!skillCategory) {
  //     return <p>Loading...</p>;
  //   }

  //   const personailitiesTrait = response?.[0]?.traits["positive"]
  //   console.log("PersonailitiesTrait", personailitiesTrait)
  //   const averageSkill = response?.[0]?.skillsGrouped["Average"];
  //   const weakSkill = response?.[0]?.skillsGrouped["Weak"];

  const recommendedCareer = response?.careerRecommendations ?? [];
  console.log("Recommended Career: ", recommendedCareer);

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as {
        label: string;
        score: number;
        color: string; // Add color property from chartData
      }; // Ensure payload structure is typed correctly

      return (
        <div className="bg-white p-2 border rounded shadow-sm">

          <p className="font-semibold text-slate-600">{data.label}</p>
          <p className="text-gray-500">Score: {data.score}</p>
        </div>
      );
    }

    return null;
  };
  // Pagination handler
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate total pages for career recommendations
  const totalPages = Math.ceil(recommendedCareer?.length / itemsPerPage);

  // Get current items for the current page
  const currentItems = recommendedCareer.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="bg-white">
      {/* Personalities Name and Description */}
      <div className=" max-w-7xl mx-auto">
        <div className="">
          <CardPersonality
            titleForCard="បុគ្គលិកលក្ខណៈរបស់អ្នកគឺជា"
            name={personalities?.name}
            title={personalities?.title}
            description={personalities?.description}
          />
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px] ">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            ក្រាហ្វបង្ហាញពីបុគ្គលិកលក្ខណៈ
          </h2>
          <div className="bg-white lg:space-y-8 mx-auto lg:p-4 lg:mt-3 grid grid-cols-1 lg:grid-cols-3">
            <div className="col-span-2 ">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  {/* <XAxis dataKey="label" /> */}
                  {/* <Tooltip /> */}
                  <Bar
                    dataKey="score"
                    shape={(props: BarProps) => <CustomBar {...props} />}
                    name="Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className=" col-span-1 flex  flex-col items-center justify-center">
              {renderCustomLegend()}
            </div>
          </div>
          {/* Legend */}
          {/* Legend */}

        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px]">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            លក្ខណៈសំខាន់ៗរបស់ {personalities?.name}
          </h2>
          {/* Positive Traits */}
          <div className="">
            <div className="text-primary space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចវិជ្ជមានរបស់អ្នក"
                description="Positive Traits"
                size="sm"
                type="result"
                titleColor="text-success"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {personailitiesTrait?.positive.map(
                  (trait: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title=""
                      desc={trait}
                      image={checkIcon}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Negative Traits */}
          <div className="">
            <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចអវិជ្ជមានរបស់អ្នក"
                description="Negative Traits"
                size="sm"
                type="result"
                titleColor="text-danger"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {personailitiesTrait?.negative.map(
                  (trait: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title=""
                      desc={trait}
                      image={xIcon}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px]">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            ចំណុចខ្លាំងនិងចំណុចខ្សោយរបស់អ្នក {personalities?.name}
          </h2>
          {/* Strength */}
          <div className="">
            <div className="space-y-8 text-primary max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចខ្លាំងរបស់អ្នក"
                description="Strength"
                size="sm"
                type="result"
                titleColor="text-success"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {response?.strengths?.map(
                  (strength: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title="" // No title
                      desc={strength} // Display strength description
                      image={checkIcon} // Positive icon
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Weakness */}
          <div className="">
            <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចខ្សោយរបស់អ្នក"
                description="Weakness"
                size="sm"
                type="result"
                titleColor="text-danger"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {response?.weaknesses?.map(
                  (weakness: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title="" // No title
                      desc={weakness} // Display weakness description
                      image={xIcon} // Negative icon
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 ">
          <QuizHeader
            title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក"
            description="These career may suitable for you"
            size="sm"
            type="result"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentItems.map((item: RecommendedCareer, index: number) => (
              <RecommendationCard
                key={item.career_name || index}
                jobTitle={item.career_name}
                jobDesc={item.description}
                majors={item.majors}
                jobList={item.categories}
                jobUuid={item.career_uuid}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
