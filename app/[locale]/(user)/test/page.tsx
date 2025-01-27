
import QuizMainPageComponent from "@/components/QuizComponent/QuizPageComponent/QuizMainPageComponent";
import React from "react";

export const metadata = {
  title: "Quiz Page | NormPlov",
  description: "Explore various assessments at NormPlov, including Personality, Interest, Value, Learning Style, and Skill test, to discover your potential and ideal career path!",
  keywords: [
    "NormPlov",
    "test",
    "career",
    "personality test",
    "interest test",
    "value test",
    "learning style test",
    "skills test",
    "Career test",
    "Career Quiz",
    "guide",
    "holland Code",
    "RAISEC",
    "MBTI",
    "16 Personality",
    "នាំផ្លូវ",
    "តេស្តអាជីពការងារ",
    "តេស្តបុគ្គលិកលក្ខណៈ",
    "តេស្តវាយតម្លៃតាម​ចំណាប់អារម្មណ៍",
    "តេស្តវាយតម្លៃតាមភាពខ្លាំងខ្សោយ",
    "តេស្តវាយតម្លៃតាមរបៀបសិក្សា",
    "តេស្តវាយតម្លៃតាមគុណតម្លៃ",
    "តេស្តគ្រប់ការវាយតម្លៃទាំងអស់",
    "ជំនាញ"
  ],
  openGraph: {
    title: "Quiz Page | NormPlov",
    description:
      "Discover your ideal career path through engaging assessments at NormPlov, including Personality, Interest, Value, Learning Style, and Skill test.",
    images: [
      {
        url: "https://normplov.istad.co/assets/quiztemplate.png",
        width: 1200,
        height: 630,
        alt: "NormPlov Quiz Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz Page | NormPlov",
    description:
      "Explore Personality, Interest, Value, Learning Style, and Skill assessments at NormPlov to uncover your potential!",
    images: ["https://normplov.istad.co/assets/quiztemplate.png"],
  },
};



export default function page() {

  return (
    <>
      <QuizMainPageComponent />
    </>

  )
}
