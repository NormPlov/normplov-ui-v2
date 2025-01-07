// import React from "react";
// import checkIcon from "@/public/Quiz/skill-icon/check.png";
// import upIcon from "@/public/Quiz/skill-icon/up.png";
// import xIcon from "@/public/Quiz/skill-icon/x.png";
// import QuizHeader from "../../QuizHeader";
// import { QuizResultListing } from "../../QuizResultListing";
// import { useFetchAssessmentDetailsQuery } from "@/redux/feature/assessment/result";
// import { useParams } from "next/navigation";
// import { RecommendationCard } from "../../RecommendationCard";
// import CardPersonality from "../../CardPersonality";
// import ScoreBar from "../ScoreBarPersonality";
// import { QuizCircularProgress } from '../../QuizCircularProgress';
// type Major = {
//   major_name: string;
//   schools: string[];
// };

// type RecommendedCareer = {
//   career_name: string;
//   description: string;
//   majors: Major[];
// };

// export const ValueResultComponent = () => {
//   const params = useParams();

//   // Normalize the values from params
//   // const resultType = Array.isArray(params.resultType) ? params.resultType[0] : params.resultType;
//   // const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;

//   const resultTypeString =
//     typeof params.resultType === "string" ? params.resultType : "";
//   const uuidString = typeof params.uuid === "string" ? params.uuid : "";

//   const { data: response, error } = useFetchAssessmentDetailsQuery({
//     testUUID: uuidString,
//     resultType: resultTypeString,
//   });

//   console.log(`result: ${resultTypeString} id: ${uuidString}`);

//   if (!resultTypeString || !uuidString) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     console.error("Error fetching data:", error);
//     return <p>Error loading data</p>;
//   }
//   console;

//   //   const skillCategory = response?.[0]?.categoryPercentages;
// //   const personalities = response?.[0]?.personalityType;
// //   const personalitiesDimension = response?.[0]?.dimensions;
// //   console.log("Personalities dimension", personalitiesDimension);

//  // Extract value details
//  const valueDetails = response?.[0]?.valueDetails || [];
//  console.log("Value Details:", valueDetails);
// // Define a set of colors for progress bars
// const colors = ["#F88787", "#FFA500", "#4CAF50", "#2196F3", "#9C27B0"];
// const chart = response?.[0]?.chartData || []
// console.log("Chart", chart)
//   //   if (!skillCategory) {
//   //     return <p>Loading...</p>;
//   //   }

//   //   const personailitiesTrait = response?.[0]?.traits["positive"]
//   //   console.log("PersonailitiesTrait", personailitiesTrait)
//   //   const averageSkill = response?.[0]?.skillsGrouped["Average"];
//   //   const weakSkill = response?.[0]?.skillsGrouped["Weak"];

//   const recommendedCareer = response?.[0]?.strongCareers;

//   return (
//     <div className="bg-red-100">
//      {/* Render value details */}
//      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {valueDetails.map((item: any, index: number) => (
//           <QuizCircularProgress
//             key={index}
//             title={item.name}
//             desc={item.definition}
//             progress={parseFloat(item.percentage)} // Convert percentage string to number
//             color={colors[index % colors.length]} // Cycle through colors
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

import { useFetchAssessmentDetailsQuery } from "@/redux/service/resultPublic"; 
import { useParams } from "next/navigation";
import { PersonalitiesCircularProgress } from "../ResultContentComponent/PersonalitiesCircularProgress";
import StyledContentCard from "../ResultContentComponent/ValueDescription";
import StyledContentList from "../ResultContentComponent/ValueList";
import { RecommendationCard } from "../../RecommendationCard";
import QuizHeader from "../../QuizHeader";
import { QuizResultListingValue } from "../QuizResultListingValue";
import upIcon from "@/public/Quiz/skill-icon/up.png";
import Pagination from "@/components/ProfileComponent/Pagination";
import ValueSkeletonLoader from "@/components/SkeletonLoading/ProfileComponent/ValueSkeleton";
// Define ChartData type
type ChartData = {
  label: string;
  score: number;
  color: string;
};
type value = {
  category: string;
  improvements: string[];
};
// Define ValueDetails type
type ValueDetails = {
  name: string;
  definition: string;
  characteristics: string;
  percentage: string;
};
type BarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    color?: string;
  };
};
export const PublicValueResultComponent = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const resultTypeString =
    typeof params.resultType === "string" ? params.resultType : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const {
    data: response,
    isLoading,
  } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: resultTypeString,
  });

  // if (!resultTypeString || !uuidString) {
  //   return <div className=' w-full flex justify-center items-center'><Loading /></div>;
  // }

  if (isLoading) {
    return(
      <ValueSkeletonLoader/>
    )
    // return <div className='bg-white w-full flex justify-center items-center'><Loading /></div>;
  }

  console.log("Response:", response);
  //  // Extract value details
  const valueDetails: ValueDetails[] = response?.[0]?.valueDetails || [];
  console.log("Value Details:", valueDetails);
  // Define fixed colors for backgrounds and progress bars
  const backgroundColors = ["#FFFFFF", "#FFFFFF", "#FFFFFF"]; // Green-100, Orange-100, Red-100
  const progressBarColors = ["#4CAF50", "#FFA500", "#F44336"]; // Green, Orange, Red

  // Extract the chart data
  const chartData: ChartData[] =
    response?.[0]?.chartData?.map(
      (item: { label: string; score: number }, index: number) => ({
        label: item.label,
        score: item.score,
        color: [
          "#F88787",
          "#FFA500",
          "#4CAF50",
          "#2196F3",
          "#9C27B0",
          "#FFC107",
          "#009688",
          "#00BCD4",
          "#03A9F4",
          "#3F51B5",
          "#E91E63",
        ][index % 11], // Cycle through colors
      })
    ) || [];

  console.log("Chart Data:", chartData);

  // Custom bar shape for dynamic coloring
  const CustomBar = (props: BarProps) => {
    const { x, y, width, height } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.payload?.color}
        radius={[4, 4, 0, 0]} // Rounded corners on top
      />
    );
  };
  type Major = {
    major_name: string; // The name of the major
    schools: string[]; // An array of schools offering the major
  };
  type RecommendedCareer = {
    career_name: string;
    description: string;
    majors: Major[]; // Array of Major objects
  };

  const recommendedCareer = response?.[0]?.careerRecommendations;
  console.log("Recommended Career: ", recommendedCareer);
  const focusGrowth = response?.[0]?.key_improvements;

  console.log("Focus Growth: ", focusGrowth);

  // Render custom legend
  const renderCustomLegend = () => (
    <div className="w-full   space-y-2  flex flex-wrap justify-start items-start   lg:grid lg:grid-cols-2 lg:gap-3">
      {chartData.map((entry, index) => (
        <div key={index} className="flex items-center  space-x-2">
          <div
            className="w-4 h-4 rounded-[4px]"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs font-medium  text-gray-700">
            {entry.label}
          </span>
        </div>
      ))}
    </div>
  );
    // Pagination handler
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
    };
  
  // Calculate total pages for career recommendations
  const totalPages = Math.ceil(recommendedCareer.length / itemsPerPage);

  // Get current items for the current page
  const currentItems = recommendedCareer.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 lg:p-12 bg-white rounded-lg space-y-12">
    
      <div>
        <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
          ក្រាហ្វបង្ហាញពីបុគ្គលិកលក្ខណៈ
        </h2>
        {/* Render value details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueDetails.map((item, index) => (
            <PersonalitiesCircularProgress
              key={index}
              title={item.name} // Pass the API title
              progress={parseFloat(item.percentage)} // Convert percentage string to number
              color={progressBarColors[index % progressBarColors.length]} // Assign progress bar color
              bgColor={backgroundColors[index % backgroundColors.length]} // Assign background color
            />
          ))}
        </div>
      </div>

      <div>
        <QuizHeader
          title="ក្រាហ្វនេះបង្ហាញពី value ទាំងអស់របស់អ្នក"
          description=""
          size="sm"
          type="result"
        />
        {/* <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          ក្រាហ្វនេះបង្ហាញពី value ទាំងអស់របស់អ្នក
        </h2> */}
        <div className="border border-slate-50 rounded-[8px]">
          {/* Bar Chart with custom legend */}
          <div className=" lg:space-y-8 mx-auto lg:p-4 items-center lg:mt-3 grid grid-cols-1 lg:grid-cols-3 ">
            {/* Bar Chart */}
            <div className="col-span-2 ">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={false} />
                  <Tooltip />
                  <Bar
                    dataKey="score"
                    shape={(props: BarProps) => <CustomBar {...props} />}
                    name="Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="col-span-1 flex items-center flex-col justify-between ">
              {renderCustomLegend()}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <QuizHeader
          title=" ការពិពណ៌នាពី value នីមួយៗរបស់អ្នក"
          description=""
          size="sm"
          type="result"
          titleColor="text-secondary"
        />
        {/* <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          ការពិពណ៌នាពី value
        </h2> */}
        <div className="bg-bgPrimaryLight rounded-[8px] p-2 md:p-4">
          {valueDetails.map((item, index) => (
            <StyledContentCard
              key={index}
              title={item.name} // Use the name from the API response
              description={item.definition} // Use the definition from the API response
              bgColor={index % 2 === 0 ? "#0BBB8A" : "#FFA500"} // Alternate background colors
            />
          ))}
        </div>
      </div>
      <div>
        <QuizHeader
          title="លក្ខណៈសំខាន់ៗ របស់អ្នក"
          description=""
          size="sm"
          type="result"
        />
        {/* <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          លក្ខណៈសំខាន់ៗ របស់អ្នក
        </h2> */}
        <div className="bg-bgPrimaryLight grid grid-cols-1 lg:grid-cols-2 p-2 md:p-4 rounded-[8px] ">
          {/* Dynamically render characteristics for each value */}
          {valueDetails.map((item, index) => {
            // Split characteristics into separate points
            const characteristics = item.characteristics
              ? item.characteristics
                  .split(".")
                  .filter((char: string) => char.trim() !== "")
              : [];

            return (
              <StyledContentList
                key={index}
                title={item.name} // Use the name from the API response
                points={characteristics.map((char: string, idx: number) => ({
                  text: char.trim(), // Trim whitespace around each characteristic
                  iconColor: idx % 2 === 0 ? "#4CAF50" : "#FFC107", // Alternate icon colors
                }))}
                bgColor={index % 2 === 0 ? "#0BBB8A" : "#FFA500"} // Alternate background colors
              />
            );
          })}
        </div>
      </div>
      <div className="">
        {/* Growth */}
        <QuizHeader
          title="ចំណុចដែលអ្នកត្រូវអភិវឌ្ឍបន្ថែម"
          description=""
          size="sm"
          type="result"
          titleColor="text-secondary"
        />
        <div className="">
          {focusGrowth.map((value: value, index: number) => (
            <QuizResultListingValue
              key={index}
              title={value.category}
              desc={
                value.improvements[0]
                  .split(".")
                  .filter((improvement) => improvement.trim() !== "") // Split and filter
              }
              image={upIcon}
            />
          ))}
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
  );
};
