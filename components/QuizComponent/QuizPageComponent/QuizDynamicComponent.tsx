'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuizIntroContainer } from '@/components/QuizComponent/QuizIntroContainer';
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from '@/components/QuizComponent/QuizQuestionContainer';
import { QuizButton } from '@/components/QuizComponent/QuizButton';
import { ArrowRight, ArchiveRestore } from "lucide-react";
import { toast } from 'react-toastify';


// Import JSON data
import generalTestJson from '@/app/(user)/json/testGeneralKh.json';
import personalityJson from '@/app/(user)/json/personalityKh.json';
import skillJson from '@/app/(user)/json/skillKh.json';
import interestJson from '@/app/(user)/json/interestKh.json';
import valueJson from '@/app/(user)/json/valueKh.json';
import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';
// import allTestJson from '@/app/(user)/json/allTest.json';
import { usePredictAssessmentMutation } from '@/redux/feature/assessment/quiz';
import Loading from '@/components/General/Loading';
import { useDraftAssessmentMutation } from '@/redux/service/draft';



type QuizData = {
  questions: { question: string; category: string }[];
  introKh: {
    title: string;
    highlight: string;
    description: string;
  };
};



const quizDataMap: Record<string, QuizData> = {
  'personality': personalityJson,
  'skill': skillJson,
  'interest': interestJson,
  'value': valueJson,
  'learningStyle': learningStyleJson,
  // 'all': allTestJson
};


type QuizResponse = { [question: string]: number };

export default function QuizDynamicComponent() {
  const [predictAssessment] = usePredictAssessmentMutation();
  const [ draftAssessment ] = useDraftAssessmentMutation();
  const { testType } = useParams(); // Get the dynamic route parameter
  const router = useRouter();

  // Always call hooks
  const [userResponses, setUserResponses] = useState<QuizResponse>({});
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get the quiz data and total questions
  const quizData = Array.isArray(testType) ? null : quizDataMap[testType];
  const totalQuestions = quizData?.questions?.length || 0;

  // Calculate progress
  const progress = totalQuestions > 0 ? Math.round((completedQuestions.length / totalQuestions) * 100) : 0;


  const processResponsesFromModifiedJSON = (
    userResponses: { [key: string]: number },
    questions: { question: string; category: string }[]
  ) => {
    const responses: { [key: string]: number } = {};

    questions.forEach(({ question, category }) => {
      if (userResponses[question] !== undefined) {
        responses[category] = userResponses[question];
      }
    });

    return { responses };
  };
  const processResponsesForDraft = (
    userResponses: { [key: string]: number },
    questions: { question: string; category: string }[]
  ) => {
    const responses: { [key: string]: number } = {};
  
    // Map user responses to their respective categories
    questions.forEach(({ question, category }) => {
      if (userResponses[question] !== undefined) {
        responses[category] = userResponses[question];
      }
    });
  
    return responses; // Return partial responses for draft
  };
  


  if (!quizData) {
    console.error("Quiz data is null");
    return;
  }

  const assessmentType = Array.isArray(testType) ? testType[0] : testType;
  // const draftType = Array.isArray(testType) ? testType[1] : testType;
  console.log("Assessment type: " + assessmentType)
  const showLoading = () => {
    setTimeout(() => setIsLoading(true), 200); // Only show spinner after 200ms
  };
  const hideLoading = () => {
    setIsLoading(false); // Hide immediately
  };

  const handleResultClick = async () => {
    showLoading();
    if (completedQuestions.length < totalQuestions) {
      toast.error("Please answer all the questions to see the result.");
      return;
    }

    if (!quizData || !quizData.questions) {
      console.error("Quiz data or questions are missing.");
      return;
    }


    const processedResponses = processResponsesFromModifiedJSON(userResponses, quizData.questions);
    console.log("Process",processedResponses)

    try {
      
      const result = await predictAssessment({
        assessmentType: assessmentType, // Use the normalized `assessmentType` here
        body: processedResponses,
      }).unwrap();

      const testUuid = result.payload.test_uuid

      toast.success("Responses submitted successfully!");

      router.push(`/test-result/${assessmentType}/${testUuid}`); // Use `assessmentType` here too
    } catch (err) {
      toast.error("Failed to submit responses. Please try again.");
      console.log(err)
    } finally {
      hideLoading(); // Stop loading spinner
    }
  };


  // const handleDraftClick = async () => {
  //   showLoading();
  //   const processedResponses = processResponsesFromModifiedJSON(userResponses, quizData.questions);
  //   try{
  //       await draftAssessment({
  //       draftType: assessmentType, // Use the normalized `assessmentType` here
  //       body: { responses: processedResponses, userResponses },
  //       }).unwrap();
  //       toast.success("Your progress has been saved. You can continue later from your profile.", {
  //         icon: <span>📂</span>,
  //         className: "Toastify__toast",
  //       });
  //       router.push(`/test`);
  //   }catch(err){
  //     toast.error("Failed to submit responses. Please try again.");
  //     console.log(err)
  //   }finally{
  //     hideLoading(); // Stop loading spinner
  //   }
  // };

  const handleDraftClick = async () => {
    showLoading();
  
    // Filter only the answered questions
    const processedResponses = processResponsesForDraft(userResponses, quizData.questions);
  
    try {
      // Send the filtered responses to the draft API
      await draftAssessment({
        draftType: assessmentType, // Use normalized `assessmentType`
        body: { responses: processedResponses }, // Only include relevant responses
      }).unwrap();
  
      // Notify the user of success
      toast.success("Your progress has been saved. You can continue later from your profile.");
      router.push(`/test`);
    } catch (err) {
      // Log and notify the user of errors
      toast.error("Failed to save progress. Please try again.");
      console.error("Error saving draft:", err);
    } finally {
      // Hide the loading spinner
      hideLoading();
    }
  };
  
  const { instructKh, quizButtonKh } = generalTestJson;
  const { questions, introKh } = quizData;


  const handleAnswer = (question: string, response: number) => {
    setUserResponses((prev) => ({ ...prev, [question]: response })); // Update responses
  };
  // const handleAnswer = (question: string, response: number) => {
  //   // Update user responses
  //   setUserResponses((prev) => ({ ...prev, [question]: response }));
  
  //   // Dynamically track completed questions
  //   const questionIndex = questions.findIndex((q) => q.question === question);
  //   if (questionIndex !== -1 && !completedQuestions.includes(questionIndex)) {
  //     setCompletedQuestions((prev) => [...prev, questionIndex]);
  //   }
  // };
  


  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Loading /> 
        </div>
      )}

      {/* Intro Section */}
      <div className="bg-bgPrimaryLight">
        <QuizIntroContainer
          introTitle={introKh.title}
          introHightlight={introKh.highlight}
          introDesc={introKh.description}
          instructLabel={instructKh.instructionLabel}
          howItWorkTitle={instructKh.howItWorksTitle}
          howItWorkStep={instructKh.howItWorksSteps}
          emojiLabels={instructKh.emojiLabels}
          RepresentedImageTitle={instructKh.representedImageTitle}
        />

      </div>

      <div className="sticky top-0 z-10 bg-white pt-4 ">
        <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
          <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">{progress} %</span>
          <Progress value={progress} className="h-4" />
        </div>
      </div>

      {/* Questions Section */}
      <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
        {questions.map((questionData, index) => (
          <QuizQuestionContainer
            key={index}
            question={questionData.question}
            questionIndex={index} // Dynamically add index as questionIndex
            updateCompletedQuestions={(index: number) => {
              if (!completedQuestions.includes(index)) {
                setCompletedQuestions((prev) => [...prev, index]);
              }
            }}
            handleAnswer={handleAnswer}
          />
        ))}


      </div>

      {/* Footer Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
        <QuizButton
          title={quizButtonKh.draft}
          rounded="xl"
          icon={<ArchiveRestore />}
          type="leftIcon"
          outline="true"
          onClick={handleDraftClick}
        />
        <QuizButton
          title={quizButtonKh.result}
          rounded="xl"
          icon={<ArrowRight />}
          type="rightIcon"
          onClick={handleResultClick}
        />
      </div>
    </div>
  );
}
