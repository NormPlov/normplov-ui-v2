"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";



import checkIcon from "@/public/Quiz/skill-icon/check.png";

// Define type for translations
interface TranslationsType {
  header: string;
  dateupdate: string;
  container: string;
  question_1: string;
  question_2: string;
  [key: string]: string;  // Dynamic keys for descriptions
}
export default function Page() {
  const { locale } = useParams();
  // Use TranslationsType for the state
  const [translations, setTranslations] = useState<TranslationsType | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const data = locale === "km"
        ? await import("../privacy-policy/locales/km.json")
        : await import("../privacy-policy/locales/en.json");
      setTranslations(data.Policy);
    };

    loadTranslations();
  }, [locale]);

  if (!translations) return <div className="lg:max-w-[80%] h-screen animate-pulse bg-primary bg-opacity-5 px-10 py-10 rounded-2xl md:max-w-[85%] max-w-[94%] mx-auto my-4 md:my-6"></div>;

  // Descriptions for question 1 and question 2
  // Descriptions for question 1 and question 2
  const question1Descriptions = Array.from({ length: 5 }, (_, i) => translations[`description_${i + 1}_question_1`]);
  const question2Descriptions = Array.from({ length: 27 }, (_, i) => translations[`description_${i + 1}_question_2`]);

  return (
    <div className="w-full h-full">
      <div className="lg:max-w-[80%] bg-primary bg-opacity-5 lg:px-10 md:px-10 px-5 lg:py-10 md:py-10 py-5 rounded-2xl md:max-w-[85%] max-w-[94%] mx-auto my-4 md:my-6">

        {/* Header Section */}
        <div className="space-y-2">
          <div className="lg:text-3xl md:text-3xl text-xl text-primary">{translations.header}</div>
          <div className="lg:text-md md:text-md text-sm text-gray-400">{translations.dateupdate}</div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary" style={{ lineHeight: "1.7" }}>
            {translations.container}
          </div>
        </div>

        {/* Question 1 */}
        <div className="space-y-2">
          <div className="lg:text-3xl md:text-3xl text-xl text-primary">{translations.question_1}</div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary" style={{ lineHeight: "1.7" }}>
            {question1Descriptions.map((desc, index) => (
              <div key={index}>{desc}</div>
            ))}
          </div>
        </div>

        {/* Question 2 */}
        <div className="space-y-2">
          <div className="lg:text-3xl md:text-3xl text-xl text-primary">{translations.question_2}</div>
          {question2Descriptions.map((desc, index) => (
            <div key={index} className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
              {/* Show Image for descriptions except 6, 14, 15, 16, and 17 */}
              {![6, 14, 15, 16, 17].includes(index + 1) && (
                <Image
                  src={checkIcon}
                  alt="check"
                  width={1000}
                  height={1000}
                  className="object-cover lg:w-[30px] lg:h-[30px] md:w-[30px] md:h-[30px] w-[24px] h-[24px] "
                />
              )}
              <div style={{ lineHeight: "1.7" }}>{desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
} 