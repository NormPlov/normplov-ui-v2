

'use client'
import React, { useState, useEffect } from 'react'
import { QuizIntroContainer } from '../QuizIntroContainer';
import generalTestJson from '@/app/(user)/json/testGeneralKh.json';
import personalityJson from '@/app/(user)/json/personalityKh.json';
import skillJson from '@/app/(user)/json/skillKh.json';
import interestJson from '@/app/(user)/json/interestKh.json';
import valueJson from '@/app/(user)/json/valueKh.json';
import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from '../QuizQuestionContainer';
import { QuizButton } from '../QuizButton';
import { ArchiveRestore, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

// Define quiz data types
type QuizData = {
    questions: { question: string; category: string }[];
    introKh: {
        title: string;
        highlight: string;
        description: string;
    };
};

// Define the order of quizzes
const quizSequence = ['personality', 'interest', 'value', 'learningStyle', 'skill'];

const quizDataMap: Record<string, QuizData> = {
    'personality': personalityJson,
    'skill': skillJson,
    'interest': interestJson,
    'value': valueJson,
    'learningStyle': learningStyleJson,
};

type QuizResponse = { [question: string]: number };

export const MultipleStepQuizComponent = () => {
    const router = useRouter();
    // const { testType } = useParams();
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [userResponses, setUserResponses] = useState<QuizResponse>({});
    const [questions, setQuestions] = useState<{ question: string; category: string }[]>([]);

    const [previousCompletedQuestions, setPreviousCompletedQuestions] = useState<number[]>([]); // Store completed questions from the previous quiz

    // Get the current quiz type based on the index
    const currentQuizType = quizSequence[currentQuizIndex];
    const { introKh } = quizDataMap[currentQuizType];
    const { instructKh, quizButtonKh } = generalTestJson;

    // Set new questions based on the current quiz
    useEffect(() => {
        if (currentQuizType) {
            // Update the questions when the quiz type changes
            setQuestions(quizDataMap[currentQuizType].questions);
            setCompletedQuestions([]); // Reset completed questions
            setUserResponses({}); // Reset user responses

            // Log which test we are on and how many questions
            console.log(`Currently on quiz: ${currentQuizType}`);
            console.log(`Total questions for this quiz: ${quizDataMap[currentQuizType].questions.length}`);
            console.log('Questions:', quizDataMap[currentQuizType].questions);
        }
    }, [currentQuizIndex]); // Depend on currentQuizIndex to load new quiz questions

    console.log('user response:',userResponses)
    console.log('previous: ',previousCompletedQuestions)

    // Calculate the total number of questions across all quizzes
    const totalQuestionsAcrossAllQuizzes = Object.values(quizDataMap).reduce(
        (total, quizData) => total + quizData.questions.length, 0
    );

    // Calculate the number of answered questions across all quizzes
    const totalAnsweredQuestions = completedQuestions.length;

    // Calculate the progress as a percentage
    const progress = totalQuestionsAcrossAllQuizzes > 0 ? Math.round((totalAnsweredQuestions / totalQuestionsAcrossAllQuizzes) * 100) : 0;


  

    const handleAnswer = (question: string, response: number, questionIndex: number) => {
        setUserResponses((prev) => ({ ...prev, [question]: response }));
        // Mark the question as completed
        setCompletedQuestions((prev) => {
            if (!prev.includes(questionIndex)) {
                return [...prev, questionIndex]; // Add the question to the completed list
            }
            return prev; // Return existing list if the question is already completed
        });
    };
    

    const handleDraftClick = () => {
        toast.success("Your progress has been saved. You can continue later from your profile.", {
            icon: <span>📂</span>,
            className: "Toastify__toast",
        });
        router.push(`/test`);
    };

    const handleResultClick = () => {
        // Logic to show the results or submit the final assessment
        console.log('Showing results');
        // Example: Navigate to a result page
        router.push('/quiz-result');
    };



    const handleNextClick = () => {
        // Save the completed questions from the current quiz
        setPreviousCompletedQuestions(completedQuestions);
    
        // Ensure all questions are answered before transitioning
        if (completedQuestions.length < questions.length) {
            toast.error("Please answer all the questions before proceeding.");
            return;
        }
    
        // Reset completed questions for the new quiz
        setCompletedQuestions([]); // Reset for the new quiz
    
        // Move to the next quiz type
        if (currentQuizIndex < quizSequence.length - 1) {
            setCurrentQuizIndex((prevIndex) => prevIndex + 1); // Transition to next quiz
        } else {
            toast.success("You've completed all quizzes!"); // Final quiz
        }
    };

    return (
        <div className="w-full relative">
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
               
                {quizDataMap[currentQuizType].questions.length > 0 ? (
                    quizDataMap[currentQuizType].questions.map((questionData, index) => (
                        <QuizQuestionContainer
                            key={`${currentQuizIndex}-${index}`}
                            question={questionData.question}
                            questionIndex={index}
                            updateCompletedQuestions={() => {
                                if (!completedQuestions.includes(index)) {
                                    setCompletedQuestions((prev) => [...prev, index]);
                                }
                            }}
                            handleAnswer={(response: string) => handleAnswer(questionData.question, parseInt(response, 10), index)}
                        />
                    ))
                ) : (
                    <div>Loading questions...</div> // This message will appear if questions are empty or loading
                )}
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
                    title={currentQuizIndex === quizSequence.length - 1 ? 'លទ្ធផល' : 'បន្ត'}  // Conditionally render title
                    rounded="xl"
                    icon={<ArrowRight />}
                    type="rightIcon"
                    onClick={currentQuizIndex === quizSequence.length - 1 ? handleResultClick : handleNextClick}
                />
            </div>
        </div>
    );
};
