import ResultDynamicComponent from '@/components/QuizComponent/QuizPageComponent/ResultDynamicComponent'
import React from 'react'

export async function generateMetadata({ params }: { params: { resultType: string; uuid: string } }) {
  const quizTitles: Record<string, string> = {
    personality: "Personality Assessment Result",
    skill: "Skill Assessment Result",
    interest: "Interest Assessment Result",
    value: "Value Assessment Result",
    learningStyle: "Learning Style Assessment Result",
  };

  const projectName = "NormPlov";
  const resultTitle = quizTitles[params.resultType] || "Assessment Result";

  const keywords = [
    "NormPlov",
    "quiz",
    "assessment",
    "career path",
    params.resultType, 
  ];
  return {
    title: `${resultTitle} | ${projectName}`,
    description: `Explore your detailed ${resultTitle} at ${projectName}. Gain insights and recommendations tailored to you.`,
    openGraph: {
      title: `${resultTitle} | ${projectName}`,
      description: `Discover your personalized ${resultTitle} and unlock your potential with insights from ${projectName}.`,
      images: [
        {
          url: "/Quiz/stepup.png", 
          width: 1000,
          height: 1000,
          alt: `${resultTitle} Thumbnail`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resultTitle} | ${projectName}`,
      description: `Dive into your ${resultTitle} and uncover new insights into your career path.`,
      images: ["/Quiz/stepup.png"],
    },
    meta: [
      {
        name: "keywords",
        content: keywords.join(", "), 
      },
    ],
  };
}

export default function page() {

  return (
    <div className='bg-bgPrimaryLight'>
      {/* <TestResultPage/> */}
      <ResultDynamicComponent />
    </div>

  )
}