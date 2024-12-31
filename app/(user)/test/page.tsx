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
    "guide"
  ],
  openGraph: {
    title: "Quiz Page | NormPlov",
    description:
      "Discover your ideal career path through engaging assessments at NormPlov, including Personality, Interest, Value, Learning Style, and Skill test.",
    images: [
      {
        url: "/Quiz/stepup.png", 
        width: 1000,
        height: 1000,
        alt: "NormPlov Quiz Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz Page | NormPlov",
    description:
      "Explore Personality, Interest, Value, Learning Style, and Skill assessments at NormPlov to uncover your potential!",
    images: ["/Quiz/stepup.png"],
  },
};



export default function page() {

  return (
    <QuizMainPageComponent/>
  )
}
