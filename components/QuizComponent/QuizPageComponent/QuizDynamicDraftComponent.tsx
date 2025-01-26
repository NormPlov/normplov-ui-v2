// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "next/navigation";
// import { Progress } from "@/components/ui/progress";
// import { QuizQuestionContainer } from "@/components/QuizComponent/QuizDraftQuestionContainer";
// import { QuizButton } from "@/components/QuizComponent/QuizButton";
// import { QuizButtonDisable } from "../QuizButtonDisable";
// import { ArrowRight, ArchiveRestore } from "lucide-react";
// import { toast } from "react-toastify";
// import Loading from "@/components/General/Loading";
// import {
//   useGetUserDraftDetailsQuery,
//   useSaveDraftAgainMutation,
//   useSaveDraftSubmittingMutation,
// } from "@/redux/service/draft";
// import { useRouter } from "next/navigation";
// import { QuizIntroContainer } from "@/components/QuizComponent/QuizIntroContainer";
// import { useTranslations } from "next-intl";
// type QuizData = {
//   questions: { question: string; category: string }[];
//   introKh: {
//     title: string;
//     highlight: string;
//     description: string;
//   };
// };

// // const quizDataMap: Record<string, QuizData> = {
// //   personality: personalityJson,
// //   skill: skillJson,
// //   interest: interestJson,
// //   value: valueJson,
// //   learningstyle: learningStyleJson,
// // };
// const normalizeRoute = (input: string): string => {
//   const customMappings: Record<string, string> = {
//     "Learning Style": "learningStyle",
//     Skills: "skill",
//     Interests: "interest",
//     Values: "value",
//     Personality: "personality",
//   };

//   if (customMappings[input]) {
//     return customMappings[input];
//   }

//   return input
//     .replace(/\s+/g, " ")
//     .split(" ")
//     .map((word, index) =>
//       index === 0
//         ? word.toLowerCase()
//         : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//     )
//     .join("");
// };

// export default function QuizDynamicDraftComponent() {
//   const router = useRouter();
//   const [saveDraftAgain] = useSaveDraftAgainMutation();
//   const [saveDraftSubmitting] = useSaveDraftSubmittingMutation();
//   const params = useParams();
//   const draftTypeRaw =
//     typeof params?.draftType === "string" ? params.draftType.toLowerCase() : "";
//   const draftType = draftTypeRaw
//     .replace(/s$/, "") // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(" ", "") // Remove spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();
//   const [currentLocale, setCurrentLocale] = useState<string>("km");
//   const uuid = typeof params?.uuid === "string" ? params.uuid : "";

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
//     new Set()
//   );
//   const prevResponsesRef = useRef<{ [key: string]: number } | null>(null);
//   const t = useTranslations();

//   const learningStyleTest: QuizData = {
//     questions: [
//       {
//         question: t("LearningStyleTest.question_1"), // You will use the translation key here
//         category: "Q1_Visual",
//       },
//       {
//         question: t("LearningStyleTest.question_2"),
//         category: "Q2_Visual",
//       },
//       {
//         question: t("LearningStyleTest.question_3"),
//         category: "Q3_Auditory",
//       },
//       {
//         question: t("LearningStyleTest.question_4"),
//         category: "Q4_Auditory",
//       },
//       {
//         question: t("LearningStyleTest.question_5"),
//         category: "Q5_ReadWrite",
//       },
//       {
//         question: t("LearningStyleTest.question_6"),
//         category: "Q6_ReadWrite",
//       },
//       {
//         question: t("LearningStyleTest.question_7"),
//         category: "Q7_Kinesthetic",
//       },
//       {
//         question: t("LearningStyleTest.question_8"),
//         category: "Q8_Kinesthetic",
//       },
//     ],
//     introKh: {
//       title: "LearningStyleTest.learningStyle_intro_title", // Translation key
//       highlight: "LearningStyleTest.learningStyle_intro_highlight", // Translation key
//       description: "LearningStyleTest.learningStyle_intro_description", // Translation key
//     },
//   };

//   //  Personality quiz Data
//   const PersonalityTest: QuizData = {
//     questions: [
//       {
//         question: t("PersonalityTest.question_1"), // You will use the translation key here
//         category: "Q1",
//       },
//       {
//         question: t("PersonalityTest.question_2"),
//         category: "Q2",
//       },
//       {
//         question: t("PersonalityTest.question_3"),
//         category: "Q3",
//       },
//       {
//         question: t("PersonalityTest.question_4"),
//         category: "Q4",
//       },
//       {
//         question: t("PersonalityTest.question_5"),
//         category: "Q5",
//       },
//       {
//         question: t("PersonalityTest.question_6"),
//         category: "Q6",
//       },
//       {
//         question: t("PersonalityTest.question_7"),
//         category: "Q7",
//       },
//       {
//         question: t("PersonalityTest.question_8"),
//         category: "Q8",
//       },
//       {
//         question: t("PersonalityTest.question_9"),
//         category: "Q9",
//       },
//       {
//         question: t("PersonalityTest.question_10"),
//         category: "Q10",
//       },
//       {
//         question: t("PersonalityTest.question_11"),
//         category: "Q11",
//       },
//       {
//         question: t("PersonalityTest.question_12"),
//         category: "Q12",
//       },
//       {
//         question: t("PersonalityTest.question_13"),
//         category: "Q13",
//       },
//       {
//         question: t("PersonalityTest.question_14"),
//         category: "Q14",
//       },
//       {
//         question: t("PersonalityTest.question_15"),
//         category: "Q15",
//       },
//       {
//         question: t("PersonalityTest.question_16"),
//         category: "Q16",
//       },
//     ],
//     introKh: {
//       title: "PersonalityTest.Personality_intro_title", // Translation key
//       highlight: "PersonalityTest.Personality_intro_highlight", // Translation key
//       description: "PersonalityTest.Personality_intro_description", // Translation key
//     },
//   };

//   // interest quiz data
//   const InterestTest: QuizData = {
//     questions: [
//       {
//         question: t("InterestTest.question_1"), // You will use the translation key here
//         category: "q1",
//       },
//       {
//         question: t("InterestTest.question_2"),
//         category: "q2",
//       },
//       {
//         question: t("InterestTest.question_3"),
//         category: "q3",
//       },
//       {
//         question: t("InterestTest.question_4"),
//         category: "q4",
//       },
//       {
//         question: t("InterestTest.question_5"),
//         category: "q5",
//       },
//       {
//         question: t("InterestTest.question_6"),
//         category: "q6",
//       },
//       {
//         question: t("InterestTest.question_7"),
//         category: "q7",
//       },
//       {
//         question: t("InterestTest.question_8"),
//         category: "q8",
//       },
//       {
//         question: t("InterestTest.question_9"),
//         category: "q9",
//       },
//       {
//         question: t("InterestTest.question_10"),
//         category: "q10",
//       },
//       {
//         question: t("InterestTest.question_11"),
//         category: "q11",
//       },
//       {
//         question: t("InterestTest.question_12"),
//         category: "q12",
//       },
//     ],
//     introKh: {
//       title: "InterestTest.interest_intro_title", // Translation key
//       highlight: "InterestTest.interest_intro_highlight", // Translation key
//       description: "InterestTest.interest_intro_description", // Translation key
//     },
//   };

//   // skill quiz data
//   const SkillTest: QuizData = {
//     questions: [
//       {
//         question: t("SkillTest.question_1"), // You will use the translation key here
//         category: "Complex Problem Solving",
//       },
//       {
//         question: t("SkillTest.question_2"),
//         category: "Critical Thinking Score",
//       },
//       {
//         question: t("SkillTest.question_3"),
//         category: "Mathematics Score",
//       },
//       {
//         question: t("SkillTest.question_4"),
//         category: "Science Score",
//       },
//       {
//         question: t("SkillTest.question_5"),
//         category: "Learning Strategy Score",
//       },
//       {
//         question: t("SkillTest.question_6"),
//         category: "Monitoring Score",
//       },
//       {
//         question: t("SkillTest.question_7"),
//         category: "Active Listening Score",
//       },
//       {
//         question: t("SkillTest.question_8"),
//         category: "Social Perceptiveness Score",
//       },
//       {
//         question: t("SkillTest.question_9"),
//         category: "Judgment and Decision Making Score",
//       },
//       {
//         question: t("SkillTest.question_10"),
//         category: "Instructing Score",
//       },
//       {
//         question: t("SkillTest.question_11"),
//         category: "Active Learning Score",
//       },
//       {
//         question: t("SkillTest.question_12"),
//         category: "Time Management Score",
//       },
//       {
//         question: t("SkillTest.question_13"),
//         category: "Writing Score",
//       },
//       {
//         question: t("SkillTest.question_14"),
//         category: "Speaking Score",
//       },
//       {
//         question: t("SkillTest.question_15"),
//         category: "Reading Comprehension Score",
//       },
//     ],
//     introKh: {
//       title: "SkillTest.skill_intro_title", // Translation key
//       highlight: "SkillTest.skill_intro_highlight", // Translation key
//       description: "SkillTest.skill_intro_description", // Translation key
//     },
//   };

//   // value quiz data
//   const ValueTest: QuizData = {
//     questions: [
//       {
//         question: t("ValueTest.question_1"), // You will use the translation key here
//         category: "Q1",
//       },
//       {
//         question: t("ValueTest.question_2"),
//         category: "Q2",
//       },
//       {
//         question: t("ValueTest.question_3"),
//         category: "Q3",
//       },
//       {
//         question: t("ValueTest.question_4"),
//         category: "Q4",
//       },
//       {
//         question: t("ValueTest.question_5"),
//         category: "Q5",
//       },
//       {
//         question: t("ValueTest.question_6"),
//         category: "Q6",
//       },
//       {
//         question: t("ValueTest.question_7"),
//         category: "Q7",
//       },
//       {
//         question: t("ValueTest.question_8"),
//         category: "Q8",
//       },
//       {
//         question: t("ValueTest.question_9"),
//         category: "Q9",
//       },
//       {
//         question: t("ValueTest.question_10"),
//         category: "Q10",
//       },
//       {
//         question: t("ValueTest.question_11"),
//         category: "Q11",
//       },
//       {
//         question: t("ValueTest.question_12"),
//         category: "Q12",
//       },
//       {
//         question: t("ValueTest.question_13"),
//         category: "Q13",
//       },
//       {
//         question: t("ValueTest.question_14"),
//         category: "Q14",
//       },
//       {
//         question: t("ValueTest.question_15"),
//         category: "Q15",
//       },
//       {
//         question: t("ValueTest.question_16"),
//         category: "Q16",
//       },
//       {
//         question: t("ValueTest.question_17"),
//         category: "Q17",
//       },
//       {
//         question: t("ValueTest.question_18"),
//         category: "Q18",
//       },
//       {
//         question: t("ValueTest.question_19"),
//         category: "Q19",
//       },
//       {
//         question: t("ValueTest.question_20"),
//         category: "Q20",
//       },
//       {
//         question: t("ValueTest.question_21"),
//         category: "Q21",
//       },
//       {
//         question: t("ValueTest.question_22"),
//         category: "Q22",
//       },
//     ],
//     introKh: {
//       title: "ValueTest.value_intro_title", // Translation key
//       highlight: "ValueTest.value_intro_highlight", // Translation key
//       description: "ValueTest.value_intro_description", // Translation key
//     },
//   };

//   const howItWorksSteps = [
//     t("TestMainPage.instructKh.howItWorksSteps.step1"),
//     t("TestMainPage.instructKh.howItWorksSteps.step2"),
//   ];

//   const emojiLabels = [
//     t("TestMainPage.instructKh.emojiLabels.stronglyDisagree"),
//     t("TestMainPage.instructKh.emojiLabels.disagree"),
//     t("TestMainPage.instructKh.emojiLabels.neutral"),
//     t("TestMainPage.instructKh.emojiLabels.agree"),
//     t("TestMainPage.instructKh.emojiLabels.stronglyAgree"),
//   ];

//   const quizDataMap: Record<string, QuizData> = {
//     personality: PersonalityTest,
//     learningStyle: learningStyleTest,
//     interest: InterestTest,
//     skill: SkillTest,
//     value: ValueTest,

//     // Add more tests here if necessary
//   };
//   const quizData = quizDataMap[draftType] as QuizData | null;

//   const isQuizComplete =
//     quizData !== null &&
//     completedQuestions.length === quizData.questions.length;

//   useEffect(() => {
//     const responses = data?.payload?.response_data;

//     if (
//       responses &&
//       JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
//     ) {
//       setUserResponses(responses);

//       const completed = quizData?.questions
//         ?.map((q, index) =>
//           responses[q.category] !== undefined ? index : null
//         )
//         .filter((index) => index !== null) as number[];

//       setCompletedQuestions(completed || []);
//       setAnsweredQuestions(new Set(completed || []));
//       prevResponsesRef.current = responses;
//     }
//   }, [data, quizData]);
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language");
//     if (savedLanguage) {
//       setCurrentLocale(savedLanguage);
//     }
//   }, []);
//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <Loading />;

//   const totalQuestions = quizData.questions.length;
//   const progress =
//     totalQuestions > 0
//       ? Math.round((completedQuestions.length / totalQuestions) * 100)
//       : 0;

//   const handleAnswer = (
//     question: string,
//     response: number,
//     questionIndex: number
//   ) => {
//     const category = quizData?.questions[questionIndex]?.category;
//     if (!category) {
//       console.error(`Category not found for questionIndex: ${questionIndex}`);
//       return;
//     }

//     setUserResponses((prev) => {
//       const updatedResponses = { ...prev, [category]: response };
//       console.log("Updated Responses:", updatedResponses);
//       return updatedResponses;
//     });

//     setAnsweredQuestions((prev) => {
//       const updatedSet = new Set(prev);
//       updatedSet.add(questionIndex);
//       return updatedSet;
//     });
//   };

//   // const handleSubmitQuiz = async () => {
//   //   if (completedQuestions.length < totalQuestions) {
//   //     toast.error("Please complete all questions before submitting.");
//   //     return;
//   //   }

//   //   try {
//   //     if (!uuid) {
//   //       toast.error("Draft ID not found!");
//   //       return;
//   //     }

//   //     const orderedResponses = quizData.questions.reduce<Record<string, number>>(
//   //       (acc, question) => {
//   //         const category = question.category;
//   //         acc[category] = userResponses[category] ?? 1;
//   //         return acc;
//   //       },
//   //       {}
//   //     );

//   //     const body = {
//   //       responses: orderedResponses,
//   //     };

//   //     console.log("Submitting Ordered Quiz Responses:", body.responses);

//   //     const response = await saveDraftSubmitting({ uuid, body }).unwrap();

//   //     if (response.status === 200) {
//   //       toast.success("Quiz submitted successfully!");

//   //       const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//   //         response.payload;

//   //       const normalizedAssessmentType = assessmentType
//   //         .toLowerCase()
//   //         .replace(/s$/, "")
//   //         .replace(/\s+/g, "");

//   //       console.log("Normalized Assessment Type:", normalizedAssessmentType);
//   //       console.log("Test UUID:", testUuid);

//   //       try {
//   //         router.push(`/test-result/${normalizedAssessmentType}/${testUuid}`);
//   //       } catch (err) {
//   //         console.error("Navigation failed:", err);
//   //         toast.error("Failed to navigate to the results page.");
//   //       }
//   //     } else {
//   //       toast.error("Failed to submit quiz. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error while submitting quiz:", error);
//   //     toast.error("An error occurred while submitting the quiz.");
//   //   }
//   // };

//   const handleSubmitQuiz = async () => {
//     if (completedQuestions.length < totalQuestions) {
//       toast.error("Please complete all questions before submitting.");
//       return;
//     }

//     try {
//       if (!uuid) {
//         toast.error("Draft ID not found!");
//         return;
//       }

//       const orderedResponses = quizData.questions.reduce<
//         Record<string, number>
//       >((acc, question) => {
//         const category = question.category;
//         acc[category] = userResponses[category] ?? 1;
//         return acc;
//       }, {});

//       const body = {
//         responses: orderedResponses,
//       };

//       console.log("Submitting Ordered Quiz Responses:", body.responses);

//       const response = await saveDraftSubmitting({ uuid, body }).unwrap();

//       if (response.status === 200) {
//         toast.success("Quiz submitted successfully!");

//         const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//           response.payload;

//         const normalizedAssessmentType = normalizeRoute(assessmentType);

//         console.log("Normalized Assessment Type:", normalizedAssessmentType);
//         console.log("Test UUID:", testUuid);

//         try {
//           router.push(
//             `/${currentLocale}/test-result/${normalizedAssessmentType}/${testUuid}`
//           );
//         } catch (err) {
//           console.error("Navigation failed:", err);
//           toast.error("Failed to navigate to the results page.");
//         }
//       } else {
//         toast.error("Failed to submit quiz. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error while submitting quiz:", error);
//       toast.error("An error occurred while submitting the quiz.");
//     }
//   };

//   const handleSaveDraftAgain = async () => {
//     try {
//       if (!uuid) {
//         toast.error("Draft ID not found!");
//         return;
//       }

//       const body = {
//         responses: userResponses,
//       };

//       console.log("Transformed Responses:", body.responses);

//       const response = await saveDraftAgain({ uuid, body }).unwrap();

//       if (response.status === 200) {
//         toast.success("Draft saved successfully!");
//       } else {
//         toast.error("Failed to save draft. Please try again.");
//       }
//       router.push(`/${currentLocale}/test`);
//     } catch (error) {
//       console.error("Error while saving draft:", error);
//       toast.error("An error occurred while saving the draft.");
//     }
//   };
//   // const { instructKh } = generalTestJson;
//   // const { introKh } = quizData;

//   return (
//     <div className="w-full relative">
//       {/* Intro Section */}
//       <div className="bg-bgPrimaryLight">
//         {/* <QuizIntroContainer
//                 introTitle={introKh.title}
//                 introHightlight={introKh.highlight}
//                 introDesc={introKh.description}
//                 instructLabel={instructKh.instructionLabel}
//                 howItWorkTitle={instructKh.howItWorksTitle}
//                 howItWorkStep={instructKh.howItWorksSteps}
//                 emojiLabels={instructKh.emojiLabels}
//                 RepresentedImageTitle={instructKh.representedImageTitle}
//               /> */}

//         <QuizIntroContainer
//           introTitle={t(quizData.introKh.title)}
//           introHightlight={t(quizData.introKh.highlight)}
//           introDesc={t(quizData.introKh.description)}
//           instructLabel={t("TestMainPage.instructKh.instructionLabel")}
//           howItWorkTitle={t("TestMainPage.instructKh.howItWorksTitle")}
//           howItWorkStep={howItWorksSteps}
//           emojiLabels={emojiLabels}
//           RepresentedImageTitle={t(
//             "TestMainPage.instructKh.representedImageTitle"
//           )}
//         />
//       </div>
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.category] ?? null}
//             isAnswered={answeredQuestions.has(index)}
//             updateCompletedQuestions={(idx) => {
//               if (!completedQuestions.includes(idx)) {
//                 setCompletedQuestions((prev) => [...prev, idx]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="តេស្តពេលក្រោយ"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={handleSaveDraftAgain}
//         />
//         <QuizButtonDisable
//           title="លទ្ធផល"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={handleSubmitQuiz}
//           disabled={!isQuizComplete}
//           className={`${
//             !isQuizComplete
//               ? "bg-primary text-white cursor-not-allowed"
//               : "bg-primary text-white hover:bg-green-500"
//           } transition duration-300 ease-in-out px-4 py-2 rounded-xl`}
//         />
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from "@/components/QuizComponent/QuizDraftQuestionContainer";
import { QuizButton } from "@/components/QuizComponent/QuizButton";
import { QuizButtonDisable } from "../QuizButtonDisable";
import { ArrowRight, ArchiveRestore } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "@/components/General/Loading";
import {
  useGetUserDraftDetailsQuery,
  useSaveDraftAgainMutation,
  useSaveDraftSubmittingMutation,
} from "@/redux/service/draft";
import { useRouter } from "next/navigation";
import { QuizIntroContainer } from "@/components/QuizComponent/QuizIntroContainer";
import { useTranslations } from "next-intl";
type QuizData = {
  questions: { question: string; category: string }[];
  introKh: {
    title: string;
    highlight: string;
    description: string;
  };
};




export default function QuizDynamicDraftComponent() {
  const router = useRouter();
  const [saveDraftAgain] = useSaveDraftAgainMutation();
  const [saveDraftSubmitting] = useSaveDraftSubmittingMutation();
  const params = useParams();
  const draftTypeRaw =
    typeof params?.draftType === "string" ? params.draftType.toLowerCase() : "";
  const draftType = draftTypeRaw
    .replace(/s$/, "") // Remove plural 's' (e.g., "interests" → "interest")
    .replace(" ", "") // Remove spaces (e.g., "learning style" → "learningstyle")
    .toLowerCase();
console.log("Draft Type:", draftType);


  const [currentLocale, setCurrentLocale] = useState<string>("km");
  const uuid = typeof params?.uuid === "string" ? params.uuid : "";

  const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

  const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
    {}
  );
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const prevResponsesRef = useRef<{ [key: string]: number } | null>(null);
  const t = useTranslations();

  const learningStyleTest: QuizData = {
    questions: [
      {
        question: t("LearningStyleTest.question_1"), // You will use the translation key here
        category: "Q1_Visual",
      },
      {
        question: t("LearningStyleTest.question_2"),
        category: "Q2_Visual",
      },
      {
        question: t("LearningStyleTest.question_3"),
        category: "Q3_Auditory",
      },
      {
        question: t("LearningStyleTest.question_4"),
        category: "Q4_Auditory",
      },
      {
        question: t("LearningStyleTest.question_5"),
        category: "Q5_ReadWrite",
      },
      {
        question: t("LearningStyleTest.question_6"),
        category: "Q6_ReadWrite",
      },
      {
        question: t("LearningStyleTest.question_7"),
        category: "Q7_Kinesthetic",
      },
      {
        question: t("LearningStyleTest.question_8"),
        category: "Q8_Kinesthetic",
      },
    ],
    introKh: {
      title: "LearningStyleTest.learningStyle_intro_title", // Translation key
      highlight: "LearningStyleTest.learningStyle_intro_highlight", // Translation key
      description: "LearningStyleTest.learningStyle_intro_description", // Translation key
    },
  };

  //  Personality quiz Data
  const PersonalityTest: QuizData = {
    questions: [
      {
        question: t("PersonalityTest.question_1"), // You will use the translation key here
        category: "Q1",
      },
      {
        question: t("PersonalityTest.question_2"),
        category: "Q2",
      },
      {
        question: t("PersonalityTest.question_3"),
        category: "Q3",
      },
      {
        question: t("PersonalityTest.question_4"),
        category: "Q4",
      },
      {
        question: t("PersonalityTest.question_5"),
        category: "Q5",
      },
      {
        question: t("PersonalityTest.question_6"),
        category: "Q6",
      },
      {
        question: t("PersonalityTest.question_7"),
        category: "Q7",
      },
      {
        question: t("PersonalityTest.question_8"),
        category: "Q8",
      },
      {
        question: t("PersonalityTest.question_9"),
        category: "Q9",
      },
      {
        question: t("PersonalityTest.question_10"),
        category: "Q10",
      },
      {
        question: t("PersonalityTest.question_11"),
        category: "Q11",
      },
      {
        question: t("PersonalityTest.question_12"),
        category: "Q12",
      },
      {
        question: t("PersonalityTest.question_13"),
        category: "Q13",
      },
      {
        question: t("PersonalityTest.question_14"),
        category: "Q14",
      },
      {
        question: t("PersonalityTest.question_15"),
        category: "Q15",
      },
      {
        question: t("PersonalityTest.question_16"),
        category: "Q16",
      },
    ],
    introKh: {
      title: "PersonalityTest.Personality_intro_title", // Translation key
      highlight: "PersonalityTest.Personality_intro_highlight", // Translation key
      description: "PersonalityTest.Personality_intro_description", // Translation key
    },
  };

  // interest quiz data
  const InterestTest: QuizData = {
    questions: [
      {
        question: t("InterestTest.question_1"), // You will use the translation key here
        category: "q1",
      },
      {
        question: t("InterestTest.question_2"),
        category: "q2",
      },
      {
        question: t("InterestTest.question_3"),
        category: "q3",
      },
      {
        question: t("InterestTest.question_4"),
        category: "q4",
      },
      {
        question: t("InterestTest.question_5"),
        category: "q5",
      },
      {
        question: t("InterestTest.question_6"),
        category: "q6",
      },
      {
        question: t("InterestTest.question_7"),
        category: "q7",
      },
      {
        question: t("InterestTest.question_8"),
        category: "q8",
      },
      {
        question: t("InterestTest.question_9"),
        category: "q9",
      },
      {
        question: t("InterestTest.question_10"),
        category: "q10",
      },
      {
        question: t("InterestTest.question_11"),
        category: "q11",
      },
      {
        question: t("InterestTest.question_12"),
        category: "q12",
      },
    ],
    introKh: {
      title: "InterestTest.interest_intro_title", // Translation key
      highlight: "InterestTest.interest_intro_highlight", // Translation key
      description: "InterestTest.interest_intro_description", // Translation key
    },
  };

  // skill quiz data
  const SkillTest: QuizData = {
    questions: [
      {
        question: t("SkillTest.question_1"), // You will use the translation key here
        category: "Complex Problem Solving",
      },
      {
        question: t("SkillTest.question_2"),
        category: "Critical Thinking Score",
      },
      {
        question: t("SkillTest.question_3"),
        category: "Mathematics Score",
      },
      {
        question: t("SkillTest.question_4"),
        category: "Science Score",
      },
      {
        question: t("SkillTest.question_5"),
        category: "Learning Strategy Score",
      },
      {
        question: t("SkillTest.question_6"),
        category: "Monitoring Score",
      },
      {
        question: t("SkillTest.question_7"),
        category: "Active Listening Score",
      },
      {
        question: t("SkillTest.question_8"),
        category: "Social Perceptiveness Score",
      },
      {
        question: t("SkillTest.question_9"),
        category: "Judgment and Decision Making Score",
      },
      {
        question: t("SkillTest.question_10"),
        category: "Instructing Score",
      },
      {
        question: t("SkillTest.question_11"),
        category: "Active Learning Score",
      },
      {
        question: t("SkillTest.question_12"),
        category: "Time Management Score",
      },
      {
        question: t("SkillTest.question_13"),
        category: "Writing Score",
      },
      {
        question: t("SkillTest.question_14"),
        category: "Speaking Score",
      },
      {
        question: t("SkillTest.question_15"),
        category: "Reading Comprehension Score",
      },
    ],
    introKh: {
      title: "SkillTest.skill_intro_title", // Translation key
      highlight: "SkillTest.skill_intro_highlight", // Translation key
      description: "SkillTest.skill_intro_description", // Translation key
    },
  };

  // value quiz data
  const ValueTest: QuizData = {
    questions: [
      {
        question: t("ValueTest.question_1"), // You will use the translation key here
        category: "Q1",
      },
      {
        question: t("ValueTest.question_2"),
        category: "Q2",
      },
      {
        question: t("ValueTest.question_3"),
        category: "Q3",
      },
      {
        question: t("ValueTest.question_4"),
        category: "Q4",
      },
      {
        question: t("ValueTest.question_5"),
        category: "Q5",
      },
      {
        question: t("ValueTest.question_6"),
        category: "Q6",
      },
      {
        question: t("ValueTest.question_7"),
        category: "Q7",
      },
      {
        question: t("ValueTest.question_8"),
        category: "Q8",
      },
      {
        question: t("ValueTest.question_9"),
        category: "Q9",
      },
      {
        question: t("ValueTest.question_10"),
        category: "Q10",
      },
      {
        question: t("ValueTest.question_11"),
        category: "Q11",
      },
      {
        question: t("ValueTest.question_12"),
        category: "Q12",
      },
      {
        question: t("ValueTest.question_13"),
        category: "Q13",
      },
      {
        question: t("ValueTest.question_14"),
        category: "Q14",
      },
      {
        question: t("ValueTest.question_15"),
        category: "Q15",
      },
      {
        question: t("ValueTest.question_16"),
        category: "Q16",
      },
      {
        question: t("ValueTest.question_17"),
        category: "Q17",
      },
      {
        question: t("ValueTest.question_18"),
        category: "Q18",
      },
      {
        question: t("ValueTest.question_19"),
        category: "Q19",
      },
      {
        question: t("ValueTest.question_20"),
        category: "Q20",
      },
      {
        question: t("ValueTest.question_21"),
        category: "Q21",
      },
      {
        question: t("ValueTest.question_22"),
        category: "Q22",
      },
    ],
    introKh: {
      title: "ValueTest.value_intro_title", // Translation key
      highlight: "ValueTest.value_intro_highlight", // Translation key
      description: "ValueTest.value_intro_description", // Translation key
    },
  };

  const howItWorksSteps = [
    t("TestMainPage.instructKh.howItWorksSteps.step1"),
    t("TestMainPage.instructKh.howItWorksSteps.step2"),
  ];

  const emojiLabels = [
    t("TestMainPage.instructKh.emojiLabels.stronglyDisagree"),
    t("TestMainPage.instructKh.emojiLabels.disagree"),
    t("TestMainPage.instructKh.emojiLabels.neutral"),
    t("TestMainPage.instructKh.emojiLabels.agree"),
    t("TestMainPage.instructKh.emojiLabels.stronglyAgree"),
  ];

  const quizDataMap: Record<string, QuizData> = {
    personality: PersonalityTest,
    learningstyle: learningStyleTest, // Updated to match `draftType`
    interest: InterestTest,
    skill: SkillTest,
    value: ValueTest,
  };
  
  const quizData = quizDataMap[draftType] || null;
  useEffect(() => {
    const responses = data?.payload?.response_data;
  
    if (
      responses &&
      JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
    ) {
      setUserResponses(responses);
  
      const completed = quizData?.questions
        ?.map((q, index) =>
          responses[q.category] !== undefined ? index : null
        )
        .filter((index) => index !== null) as number[];
  
      setCompletedQuestions(completed || []);
      setAnsweredQuestions(new Set(completed || []));
      prevResponsesRef.current = responses;
    }
  }, [data, quizData]);
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);
  
  if (!quizData) {
    console.error(`No quiz data found for draft type: ${draftType}`);
    return <Loading />;
  }
  
  const normalizeRoute = (input: string): string => {
    const customMappings: Record<string, string> = {
      "Learning Style": "learningStyle",
      Skills: "skill",
      Interests: "interest",
      Values: "value",
      Personality: "personality",
    };
  
    if (customMappings[input]) {
      return customMappings[input];
    }
  
    return input
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };
  
  // const quizData = quizDataMap[draftType] as QuizData | null;
  console.log("Quiz Data:", quizData);
  const isQuizComplete = quizData !== null && completedQuestions.length === quizData.questions.length;

  
  // Conditional early return happens here, after Hooks are defined
  if (isLoading) return <Loading />;
  if (error || !quizData) return <Loading />;
  
  // useEffect(() => {
  //   const responses = data?.payload?.response_data;

  //   if (
  //     responses &&
  //     JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
  //   ) {
  //     setUserResponses(responses);

  //     const completed = quizData?.questions
  //       ?.map((q, index) =>
  //         responses[q.category] !== undefined ? index : null
  //       )
  //       .filter((index) => index !== null) as number[];

  //     setCompletedQuestions(completed || []);
  //     setAnsweredQuestions(new Set(completed || []));
  //     prevResponsesRef.current = responses;
  //   }
  // }, [data, quizData]);
  // useEffect(() => {
  //   const savedLanguage = localStorage.getItem("language");
  //   if (savedLanguage) {
  //     setCurrentLocale(savedLanguage);
  //   }
  // }, []);
  if (isLoading) return <Loading />;
  if (error || !quizData) return <Loading />;

  const totalQuestions = quizData.questions.length;
  const progress =
    totalQuestions > 0
      ? Math.round((completedQuestions.length / totalQuestions) * 100)
      : 0;

  const handleAnswer = (
    question: string,
    response: number,
    questionIndex: number
  ) => {
    const category = quizData?.questions[questionIndex]?.category;
    if (!category) {
      console.error(`Category not found for questionIndex: ${questionIndex}`);
      return;
    }

    setUserResponses((prev) => {
      const updatedResponses = { ...prev, [category]: response };
      console.log("Updated Responses:", updatedResponses);
      return updatedResponses;
    });

    setAnsweredQuestions((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(questionIndex);
      return updatedSet;
    });
  };

 

  const handleSubmitQuiz = async () => {
    if (completedQuestions.length < totalQuestions) {
      toast.error("Please complete all questions before submitting.");
      return;
    }

    try {
      if (!uuid) {
        toast.error("Draft ID not found!");
        return;
      }

      const orderedResponses = quizData.questions.reduce<
        Record<string, number>
      >((acc, question) => {
        const category = question.category;
        acc[category] = userResponses[category];
        return acc;
      }, {});

      const body = {
        responses: orderedResponses,
      };

      console.log("Submitting Ordered Quiz Responses:", body.responses);

      const response = await saveDraftSubmitting({ uuid, body }).unwrap();

      if (response.status === 200) {
        toast.success("Quiz submitted successfully!");

        const { assessment_type_name: assessmentType, test_uuid: testUuid } =
          response.payload;

        const normalizedAssessmentType = normalizeRoute(assessmentType);

        console.log("Normalized Assessment Type:", normalizedAssessmentType);
        console.log("Test UUID:", testUuid);

        try {
          router.push(
            `/${currentLocale}/test-result/${normalizedAssessmentType}/${testUuid}`
          );
        } catch (err) {
          console.error("Navigation failed:", err);
          toast.error("Failed to navigate to the results page.");
        }
      } else {
        toast.error("Failed to submit quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error while submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz.");
    }
  };

  const handleSaveDraftAgain = async () => {
    try {
      if (!uuid) {
        toast.error("Draft ID not found!");
        return;
      }

      const body = {
        responses: userResponses,
      };

      console.log("Transformed Responses:", body.responses);

      const response = await saveDraftAgain({ uuid, body }).unwrap();

      if (response.status === 200) {
        toast.success("Draft saved successfully!");
      } else {
        toast.error("Failed to save draft. Please try again.");
      }
      router.push(`/${currentLocale}/test`);
    } catch (error) {
      console.error("Error while saving draft:", error);
      toast.error("An error occurred while saving the draft.");
    }
  };
  // const { instructKh } = generalTestJson;
  // const { introKh } = quizData;

  return (
    <div className="w-full relative">
      {/* Intro Section */}
      <div className="bg-bgPrimaryLight">
        {/* <QuizIntroContainer
                introTitle={introKh.title}
                introHightlight={introKh.highlight}
                introDesc={introKh.description}
                instructLabel={instructKh.instructionLabel}
                howItWorkTitle={instructKh.howItWorksTitle}
                howItWorkStep={instructKh.howItWorksSteps}
                emojiLabels={instructKh.emojiLabels}
                RepresentedImageTitle={instructKh.representedImageTitle}
              /> */}

        <QuizIntroContainer
          introTitle={t(quizData.introKh.title)}
          introHightlight={t(quizData.introKh.highlight)}
          introDesc={t(quizData.introKh.description)}
          instructLabel={t("TestMainPage.instructKh.instructionLabel")}
          howItWorkTitle={t("TestMainPage.instructKh.howItWorksTitle")}
          howItWorkStep={howItWorksSteps}
          emojiLabels={emojiLabels}
          RepresentedImageTitle={t(
            "TestMainPage.instructKh.representedImageTitle"
          )}
        />
      </div>
      <div className="sticky top-0 z-10 bg-white pt-4">
        <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
          <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
            {progress} %
          </span>
          <Progress value={progress} className="h-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
        {quizData.questions.map((q, index) => (
          <QuizQuestionContainer
            key={index}
            question={q.question}
            questionIndex={index}
            defaultValue={userResponses[q.category] ?? null}
            isAnswered={answeredQuestions.has(index)}
            updateCompletedQuestions={(idx) => {
              if (!completedQuestions.includes(idx)) {
                setCompletedQuestions((prev) => [...prev, idx]);
              }
            }}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
        <QuizButton
          title="តេស្តពេលក្រោយ"
          rounded="xl"
          icon={<ArchiveRestore />}
          type="leftIcon"
          outline="true"
          onClick={handleSaveDraftAgain}
        />
        <QuizButtonDisable
          title="លទ្ធផល"
          rounded="xl"
          icon={<ArrowRight />}
          type="rightIcon"
          onClick={handleSubmitQuiz}
          disabled={!isQuizComplete}
          className={`${
            !isQuizComplete
              ? "bg-primary text-white cursor-not-allowed"
              : "bg-primary text-white hover:bg-green-500"
          } transition duration-300 ease-in-out px-4 py-2 rounded-xl`}
        />
      </div>
    </div>
  );
}
