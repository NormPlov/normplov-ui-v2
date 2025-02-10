import React, { useEffect, useState } from 'react'
import QuizHeader from '@/components/QuizComponent/QuizHeader'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams} from 'next/navigation'

type props = {
    title: string;
    highlight: string;
    description: string;
    size: 'md' | 'sm';
    type: 'quiz' | 'result';
    selectedJobTitle?: string;
    activeSection?: string;
}

export const JobIntroComponent = ({ title, highlight, description, size, type = 'result', selectedJobTitle, activeSection }: props) => {

    const [currentLocale, setCurrentLocale] = useState<string>('km');
    const params = useParams();


    const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;
    const resultTypeString = localStorage.getItem('resultTypeString')
    const backTestUuid = localStorage.getItem('backToTestUuid')

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }
    }, []);




    return (
        <div className=" bg-gradient-to-t from-green-50 to-[#F9FAFE]  ">

            <div className='max-w-7xl mx-auto px-4 py-4 lg:pt-8'>
                
                <QuizHeader
                    title={title}
                    highlight={highlight}
                    description={description}
                    size={size}
                    type={type}
                />

                <Breadcrumb className='my-4 lg:my-6'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${currentLocale}/test-result/${resultTypeString}/${backTestUuid}`} className="text-gray-400 font-semibold ">Test Result</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {
                            activeSection && (
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/${currentLocale}/recommend-job/${uuid}`} className="text-primary font-semibold">{activeSection === 'job' ? 'Careers' : activeSection}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {activeSection === 'job' && selectedJobTitle && (
                                        <>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink className="text-primary font-semibold">{selectedJobTitle}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </>
                                    )}
                                </>
                            )
                        }


                    </BreadcrumbList>
                </Breadcrumb>

                {/* Image Section: Full width for screens 1024px and lower, spans 3 columns on larger screens */}
                {/* <div className="col-span-1 lg:col-span-4">
          <div className="relative w-full h-[300px] md:h-[600px] lg:h-[500px]">
            <Image
              src="/job/jobfind.png"
              alt="find"
              fill
              className="object-contain"
              priority={true}
            />
          </div>
        </div> */}
            </div>


        </div>
    )
}
