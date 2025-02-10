'use client';

import React from 'react';
import { useParams } from 'next/navigation';

// Import Components
import { QuizResultIntroContainer } from '../QuizResultIntroContainer';


// Import JSON data
import personalityJson from '../../../app/[locale]/(user)/json/personalityKh.json';
import skillJson from '../../../app/[locale]/(user)/json/skillKh.json';
import interestJson from '../../../app/[locale]/(user)/json/interestKh.json';
import valueJson from '../../../app/[locale]/(user)/json/valueKh.json';
import learningStyleJson from '../../../app/[locale]/(user)/json/learningStyleKh.json';
import allTestJson from '../../../app/[locale]/(user)/json/allTest.json';
import Loading from '@/components/General/Loading';
import { PublicPersonalityResultComponent } from './PublicResultContentComponent/PublicPersonalityResultComponent';
import { PublicSkillResultComponent } from './PublicResultContentComponent/PublicSkillResultComponent';
import { PublicInterestResultComponent } from './PublicResultContentComponent/PublicInterestResultComponent';
import { PublicValueResultComponent } from './PublicResultContentComponent/PublicValueResultComponent';
import { PublicLearningStyleResultComponent } from './PublicResultContentComponent/PublicLearningStyleResultComponent';
import { useTranslations } from 'next-intl';
import { useGetShareLinksQuery } from '@/redux/service/test';
import { PublicAllResultComponent } from './PublicResultContentComponent/PublicAllResultComponent';
// type IntroKh = {
//     title: string;
//     highlight: string;
//     description: string;
// };

// type Recommendation = {
//     jobTitle: string;
//     jobdesc: string;
//     majors: string[]; // Array of related majors
//     unis: string[];   // Array of related universities
// };

type QuizData = {
    introKh: {
        title: string;
        highlight: string;
        description: string;
    };             // Introductory data for the result
};


const resultDataMap: Record<string, QuizData> = {
    'personality': personalityJson,
    'skill': skillJson,
    'interest': interestJson,
    'value': valueJson,
    'learningStyle': learningStyleJson,
    'all': allTestJson
};

export default function ResultShareDynamicComponent() {
    const params = useParams();
     const t = useTranslations();
   // Normalize the values
    const resultType = Array.isArray(params.resultType) ? params.resultType[0] : params.resultType;
    console.log("REs", resultType, params.resultType)
    const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;
    const { data } = useGetShareLinksQuery({ uuid });
    console.log("data link share", data?.payload.shareable_link)

    // Handle invalid or missing parameters
    if (!resultType || !uuid) {
        return <div className=' w-full flex justify-center items-center'><Loading/></div>;
    }

    // Ensure resultType is valid
    if (!resultType || Array.isArray(resultType)) {
        return <p>Invalid result type</p>;
    }

    const resultData = resultDataMap[resultType];

    // Handle invalid result types
    if (!resultData) {
        return (
            <div className="w-full text-center py-10">
                <h1 className="text-2xl font-bold">Result Not Found</h1>
                <p>The test result you are looking for does not exist.</p>
            </div>
        );
    }
    if (uuid && resultType) {
        localStorage.setItem("resultUuid", uuid)
        localStorage.setItem("currentType", resultType)
    }
// Learning Style quiz Data
const learningStyleTest: QuizData = {

    introKh: {
        title: "LearningStyleTest.learningStyle_intro_title", // Translation key
        highlight: "LearningStyleTest.learningStyle_intro_highlight", // Translation key
        description: "LearningStyleTest.learningStyle_intro_description" // Translation key
    }
};

//  Personality quiz Data
const PersonalityTest: QuizData = {

    introKh: {
        title: "PersonalityTest.Personality_intro_title", // Translation key
        highlight: "PersonalityTest.Personality_intro_highlight", // Translation key
        description: "PersonalityTest.Personality_intro_description" // Translation key
    }
};

// interest quiz data
const InterestTest: QuizData = {

    introKh: {
        title: "InterestTest.interest_intro_title", // Translation key
        highlight: "InterestTest.interest_intro_highlight", // Translation key
        description: "InterestTest.interest_intro_description" // Translation key
    }
};

// skill quiz data
const SkillTest: QuizData = {

    introKh: {
        title: "SkillTest.skill_intro_title", // Translation key
        highlight: "SkillTest.skill_intro_highlight", // Translation key
        description: "SkillTest.skill_intro_description" // Translation key
    }
};

// value quiz data
const ValueTest: QuizData = {

    introKh: {
        title: "ValueTest.value_intro_title", // Translation key
        highlight: "ValueTest.value_intro_highlight", // Translation key
        description: "ValueTest.value_intro_description" // Translation key
    }
};


const AllTest: QuizData = {
    introKh: {
      title: "AllTest.allTest_intro_title", // Translation key
      highlight: "AllTest.allTest_intro_highlight", // Translation key
      description: "AllTest.allTest_intro_description" // Translation key
    }
  }

const resultIntroMap: Record<string, QuizData> = {
    personality: PersonalityTest,
    learningStyle: learningStyleTest,
    interest: InterestTest,
    skill: SkillTest,
    value: ValueTest,
    all: AllTest
    // Add more tests here if necessary
};

    const renderResultContent = () => {
        switch (resultType) {
            case 'personality':
                return (
                    <div className=''>
                        <PublicPersonalityResultComponent/>
                    </div>
                );
            case 'skill':
                return (
                    <PublicSkillResultComponent/>
                );
            case 'interest':
                return (
                    <PublicInterestResultComponent/>
                    
                );
            case 'value':
                return (
                    <div className='bg-white'>
                       <PublicValueResultComponent/> 
                    </div>
                );
            case 'learningStyle':
                return (
                    <PublicLearningStyleResultComponent />
                );
            case 'all':
                return (
                    < PublicAllResultComponent />
                )

            default:
                return <p>Unknown result type</p>;
        }
    };

    return (
        <div className='w-full '>

            {/* Introduction container */}
            <QuizResultIntroContainer
                            title={t(resultIntroMap[resultType]?.introKh.title)}
                            highlight={t(resultIntroMap[resultType]?.introKh.highlight)}
                            description={t(resultIntroMap[resultType]?.introKh.description)}
                            size="md"
                            type="result"
                        />

            <div >
                {renderResultContent()}
            </div>

            {/* Share Link and chat with ai section */}
            {/* <QuizLinkAndChatContainer chatTitle='សន្ទនាជាមួយ AI' chatDesc='ស្វែងយល់បន្ថែមពីលទ្ធផលរបស់អ្នក' chatButton='សន្ទនាឥឡូវនេះ' linkTitle='ចែករំលែកលទ្ធផលតេស្តរបស់អ្នក' linkDesc='អនុញ្ញាតឱ្យគ្រួសារនិងមិត្តភក្តិរបស់អ្នកអាចមើលឃើញពីលទ្ធផលរបស់អ្នកដោយការចែករំលែកតំណភ្ជាប់នេះ' linkValue='http://example.com/link/to/document' /> */}

            {/* Feedback section */}
            {/* <Feedback title='មតិកែលម្អអ្នក, ជាការរីកចម្រើនយើង' desc='អរគុណសម្រាប់ការចូលរួមធ្វើតេស្តជាមួយនាំផ្លូវ សូមចែករំលែកគំនិតរបស់អ្នកលើលទ្ធផលសំណួរ និងអ្វីដែលយើងអាចកែលម្អបាន។' highlight='ពួកយើងរីករាយនឹងការផ្តល់មតិរបស់អ្នក' buttonTitle='ផ្ញើ' placeholder='សំណូមពរណាមួយសម្រាប់ការកែលម្អ' /> */}

        </div>
    );

}
