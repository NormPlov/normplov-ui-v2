'use client'
import QuizHeader from '@/components/QuizComponent/QuizHeader'
import { QuizIntroContainer } from '@/components/QuizComponent/QuizIntroContainer'
import React, { useEffect, useState } from 'react'
import { QuizOptHorizontalContainer } from '@/components/QuizComponent/QuizOptHorizontalContainer'
import { usePathname, useRouter } from 'next/navigation';
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
// import personalityJson from '../../../app/[locale]/(user)/json/personalityKh.json'
// import interestJson from '../../../app/[locale]/(user)/json/interestKh.json'
// import skillJson from '../../../app/[locale]/(user)/json/skillKh.json'
// import valueJson from '../../../app/[locale]/(user)/json/valueKh.json'
// import learningStyleJson from '../../../app/[locale]/(user)/json/learningStyleKh.json'
// import allTestJson from '../../../app/[locale]/(user)/json/allTest.json'
import quizData from '@../../../app/[locale]/(user)/json/mainTest.json';
import { useFetchAllTestEnQuery } from '@/redux/feature/assessment/quiz'
import { useFetchAllTestKhQuery } from '@/redux/feature/assessment/quiz'
import { useTranslations } from 'next-intl'


type TestAssessment = {
    draft_uuid: string | null;
    is_draft: boolean;
    title: string;
    description: string;
    image: string;
    route: string;
};




export default function QuizMainPageComponent() {

    const [currentLocale, setCurrentLocale] =  useState<'en' | 'km'>('km');

    const t = useTranslations('TestMainPage');

    const token = useSelector(selectToken);

    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage === 'en' || savedLanguage === 'km') {
            setCurrentLocale(savedLanguage);
        }
    }, []);


    const isAuthenticated = token !== null;

    console.log("authenticate: ", isAuthenticated)

    const { data: TestEn, isLoading: isLoadingEN, isSuccess: isSuccessEN } = useFetchAllTestEnQuery()
    const { data: TestKh, isLoading: isLoadingKh, isSuccess: isSuccessKh} = useFetchAllTestKhQuery()
    const AllTestAssessment = currentLocale === 'en' ? TestEn?.payload : TestKh?.payload

    console.log("all main:", AllTestAssessment)

    // const { typeOfQuizKh, introKh, instructKh } = t('TestMainPage')

    // const { personalityMainKh } = personalityJson

    // const { interestMainKh } = interestJson

    // const { skillMainKh } = skillJson

    // const { valueMainKh } = valueJson

    // const { learningStyleMainKh } = learningStyleJson

    // const { allMainKh } = allTestJson

    // const quizOptions = [
    //     { title: personalityMainKh.title, desc: personalityMainKh.desc, image: personality, route: personalityMainKh.route },
    //     { title: interestMainKh.title, desc: interestMainKh.desc, image: interest, route: interestMainKh.route },
    //     { title: skillMainKh.title, desc: skillMainKh.desc, image: skill, route: skillMainKh.route },
    //     { title: learningStyleMainKh.title, desc: learningStyleMainKh.desc, image: learning, route: learningStyleMainKh.route },
    //     { title: valueMainKh.title, desc: valueMainKh.desc, image: value, route: valueMainKh.route },
    //     { title: allMainKh.title, desc: allMainKh.desc, image: allTest, buttonText: allMainKh.buttonText, route: allMainKh.route }
    // ];



    const quizOptions = [
        { 
            title: quizData[currentLocale].personalityMain.title, 
            desc: quizData[currentLocale].personalityMain.desc, 
            image: personality, 
            route: quizData[currentLocale].personalityMain.route 
        },
        { 
            title: quizData[currentLocale].interestMain.title, 
            desc: quizData[currentLocale].interestMain.desc, 
            image: interest, 
            route: quizData[currentLocale].interestMain.route 
        },
        { 
            title: quizData[currentLocale].learningStyleMain.title, 
            desc: quizData[currentLocale].learningStyleMain.desc, 
            image: learning, 
            route: quizData[currentLocale].learningStyleMain.route 
        },
        { 
            title: quizData[currentLocale].skillMain.title, 
            desc: quizData[currentLocale].skillMain.desc, 
            image: skill, 
            route: quizData[currentLocale].skillMain.route 
        },
        { 
            title: quizData[currentLocale].valueMain.title, 
            desc: quizData[currentLocale].valueMain.desc, 
            image: value, 
            route: quizData[currentLocale].valueMain.route 
        },
        { 
            title: quizData[currentLocale].allMain.title, 
            desc: quizData[currentLocale].allMain.desc, 
            image: allTest, 
            route: quizData[currentLocale].allMain.route 
        }
    ];


    const handleQuizClick = (test: string) => {
        const newPath = `/${currentLocale}/test/${test}`;

        // Check if the pathname already contains the locale to avoid duplication
        if (!pathname.startsWith(`/${currentLocale}`)) {
            router.push(newPath);
        } else {
            // If the pathname already includes the locale, navigate normally without changing the locale
            router.push(`/${currentLocale}/test/${test}`);
        }
    };

    const handleDraftQuizClick = (draftUuid: string | null, route: string) => {
        let updatedRoute = `/${currentLocale}/test/${route}`;

        if (draftUuid) {
            updatedRoute = `/${currentLocale}/draft/${route.toLowerCase().replace(/\s+/g, "")}/${draftUuid}`;
        }

        // Check if the pathname already contains the locale to avoid duplication
        if (!pathname.startsWith(`/${currentLocale}`)) {
            // If the pathname doesn't start with the locale, add it
            router.push(updatedRoute); // Navigate normally
        } else {
            // If the pathname already includes the locale, navigate normally without changing the locale
            router.push(updatedRoute); // Navigate normally
        }
    };

    console.log()

    const howItWorksSteps = [
        t('instructKh.howItWorksSteps.step1'),
        t('instructKh.howItWorksSteps.step2'),
    ];

    const emojiLabels = [
        t('instructKh.emojiLabels.stronglyDisagree'),
        t('instructKh.emojiLabels.disagree'),
        t('instructKh.emojiLabels.neutral'),
        t('instructKh.emojiLabels.agree'),
        t('instructKh.emojiLabels.stronglyAgree'),
    ];


    return (
        <div className='w-full bg-bgPrimaryLight pb-6 lg:pb-12'>

            <QuizIntroContainer
                introTitle={t('introKh.title')}
                introHightlight={t('introKh.highlight')}
                introDesc={t('introKh.description')}
                instructLabel={t('instructKh.instructionLabel')}
                howItWorkTitle={t('instructKh.howItWorksTitle')}
                howItWorkStep={howItWorksSteps}
                emojiLabels={emojiLabels}
                RepresentedImageTitle={t('instructKh.representedImageTitle')}
            />


            {isAuthenticated ? (
                <div className='max-w-7xl mx-auto space-y-6 lg:space-y-12 p-4 md:p-10 lg:p-12'>
                    <QuizHeader
                        title={t('typeOfQuizKh.title')}
                        description={t('typeOfQuizKh.description')}
                        size='sm'
                        type='result'
                    />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {(isLoadingEN || isLoadingKh) ? (
                            Array(6).fill(0).map((_, index) => (
                                <QuizOptHorizontalContainer
                                    key={index}
                                    title=""
                                    desc=""
                                    isLoading={true} // Pass the loading state as true
                                />
                            ))
                        ) : (isSuccessEN || isSuccessKh) && AllTestAssessment ? (
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
                        title={t('typeOfQuizKh.title')}
                        description={t('typeOfQuizKh.description')}
                        size='sm'
                        type='result'
                    />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Only show skeletons or loading indicator if `isLoading` is true */}
                        {(isLoadingEN || isLoadingKh) ? (
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