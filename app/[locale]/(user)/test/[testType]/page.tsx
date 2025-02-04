import { MultipleStepQuizComponent } from "@/components/QuizComponent/QuizPageComponent/MultipleStepQuizComponent";
import QuizDynamicComponent from "@/components/QuizComponent/QuizPageComponent/QuizDynamicComponent"
import React from "react"

export async function generateMetadata({ params }: { params: { testType: string } }) {
   const quizTitles: Record<string, string> = {
     personality: "Personality Assessment Test",
     skill: "Skill Assessment Test",
     interest: "Interest Assessment Test",
     value: "Value Assessment Test",
     learningStyle: "Learning Style Assessment Test",
   };
 
   const projectName = "E-Found";
   const quizTitle = quizTitles[params.testType] || "Quiz";
 
   
   return {
     title: `${quizTitle} | ${projectName}`,
     description: `Take the ${quizTitle} at ${projectName} to uncover insights about yourself and find your ideal career path.`,
     keywords: [
       projectName,
       "quiz",
       quizTitle.toLowerCase(),
       "career",
       "job assessment",
     ],
     openGraph: {
       title: `${quizTitle} | ${projectName}`,
       description: `Engage with the ${quizTitle} at ${projectName} to learn more about your potential and preferences.`,
       images: [
         {
           url: "https://e-found.istad.co/Quiz/stepup.png", 
           width: 1000,
           height: 1000,
           alt: "E-Found Quiz Thumbnail",
         },
       ],
     },
     twitter: {
       card: "summary_large_image",
       title: `${quizTitle} | ${projectName}`,
       description: `Explore the ${quizTitle} at ${projectName} and uncover new insights about yourself!`,
       images: ["/Quiz/stepup.png"], 
     },
   };
 }
 

export default function page({ params }: { params: { testType: string } }) {
  if (params.testType === "all") {
    return <MultipleStepQuizComponent />;
  }
  
  return <QuizDynamicComponent />;
}
