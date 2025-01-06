'use client'
import QuizHeader from '@/components/QuizComponent/QuizHeader'
import { QuizIntroContainer } from '@/components/QuizComponent/QuizIntroContainer'
import React from 'react'
import { QuizOptHorizontalContainer } from '@/components/QuizComponent/QuizOptHorizontalContainer'
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/feature/auth/authSlice";
// Import image
import interest from '@/public/Quiz/optQuiz/Interest.png'
import learning from '@/public/Quiz/optQuiz/learning style.png'
import skill from '@/public/Quiz/optQuiz/Skills.png'
import allTest from '@/public/Quiz/optQuiz/allTest.png'
import value from '@/public/Quiz/optQuiz/value.png'
import personality from '@/public/Quiz/optQuiz/Personality.png'

// Import json
import generalTestJson from '../../../app/[locale]/(user)/json/testGeneralKh.json'
import personalityJson from '../../../app/[locale]/(user)/json/personalityKh.json'
import interestJson from '../../../app/[locale]/(user)/json/interestKh.json'
import skillJson from '../../../app/[locale]/(user)/json/skillKh.json'
import valueJson from '../../../app/[locale]/(user)/json/valueKh.json'
import learningStyleJson from '../../../app/[locale]/(user)/json/learningStyleKh.json'
import allTestJson from '../../../app/[locale]/(user)/json/allTest.json'
import { useFetchAllTestQuery } from '@/redux/feature/assessment/quiz'


type TestAssessment = {
    draft_uuid: string | null;
    is_draft: boolean;
    title: string;
    description: string;
    image: string;
    route: string;
};


export default function QuizMainPageComponent() {

    const token = useSelector(selectToken);

    const router = useRouter();

    const isAuthenticated = token !== null;

    console.log("authenticate: ", isAuthenticated)

    const { data, isLoading, isSuccess } = useFetchAllTestQuery()
    const AllTestAssessment = data?.payload

    console.log("test: ", data?.payload)


    const handleQuizClick = (test: string) => {
        router.push(`/test/${test}`);
    };

    const handleDraftQuizClick = (draftUuid: string | null, route: string) => {
        if (draftUuid) {
            router.push(
                `/draft/${route.toLowerCase().replace(/\s+/g, "")}/${draftUuid}`
            )
            console.log(draftUuid, route);
        } else {
            router.push(`/test/${route}`);
        }
    };


    const { typeOfQuizKh, introKh, instructKh } = generalTestJson

    const { personalityMainKh } = personalityJson

    const { interestMainKh } = interestJson

    const { skillMainKh } = skillJson

    const { valueMainKh } = valueJson

    const { learningStyleMainKh } = learningStyleJson

    const { allMainKh } = allTestJson

    const quizOptions = [
        { title: personalityMainKh.title, desc: personalityMainKh.desc, image: personality, route: personalityMainKh.route },
        { title: interestMainKh.title, desc: interestMainKh.desc, image: interest, route: interestMainKh.route },
        { title: skillMainKh.title, desc: skillMainKh.desc, image: skill, route: skillMainKh.route },
        { title: learningStyleMainKh.title, desc: learningStyleMainKh.desc, image: learning, route: learningStyleMainKh.route },
        { title: valueMainKh.title, desc: valueMainKh.desc, image: value, route: valueMainKh.route },
        { title: allMainKh.title, desc: allMainKh.desc, image: allTest, buttonText: allMainKh.buttonText, route: allMainKh.route }
    ];

    // console.log("image: ",AllTestAssessment[0].image)

    return (
        <div className='w-full bg-bgPrimaryLight pb-6 lg:pb-12'>
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

            {isAuthenticated ? (
                <div className='max-w-7xl mx-auto space-y-6 lg:space-y-12 p-4 md:p-10 lg:p-12'>
                    <QuizHeader
                        title={typeOfQuizKh.title}
                        description={typeOfQuizKh.description}
                        size='sm'
                        type='result'
                    />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {isLoading ? (
                            Array(6).fill(0).map((_, index) => (
                                <QuizOptHorizontalContainer
                                    key={index}
                                    title=""
                                    desc=""
                                    isLoading={true} // Pass the loading state as true
                                />
                            ))
                        ) : isSuccess && AllTestAssessment ? (
                            AllTestAssessment.map((option: TestAssessment, index: number) => (
                                <QuizOptHorizontalContainer
                                    key={index}
                                    title={option.title}
                                    desc={option.description}
                                    image={option.image}
                                    onClick={() => handleDraftQuizClick(option.draft_uuid, option.route)}
                                    isDraft={option.is_draft}
                                    type='main'
                                    
                                />
                            ))
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='max-w-7xl mx-auto space-y-6 lg:space-y-12 p-4 md:p-10 lg:p-12'>
                    <QuizHeader
                        title={typeOfQuizKh.title}
                        description={typeOfQuizKh.description}
                        size='sm'
                        type='result'
                    />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Only show skeletons or loading indicator if `isLoading` is true */}
                        {isLoading ? (
                            Array(6).fill(0).map((_, index) => (
                                <QuizOptHorizontalContainer
                                    key={index}
                                    title=""
                                    desc=""
                                    isLoading={true} // Pass the loading state as true
                                />
                            ))
                        ) : (
                            quizOptions.map((option, index) => (
                                <QuizOptHorizontalContainer
                                    key={index}
                                    title={option.title}
                                    desc={option.desc}
                                    image={option.image}
                                    onClick={() => handleQuizClick(option.route)}
                                    type='main'
                                />
                            ))
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}
