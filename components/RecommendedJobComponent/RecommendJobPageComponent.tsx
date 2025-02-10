
'use client';
import { BriefcaseBusiness, ChevronRight, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { JobIntroComponent } from "./JobIntroComponent";
import { useParams } from "next/navigation";
import { useGetCareerByUuidMutation } from "@/redux/feature/assessment/quiz";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";


type JobType = {
    category_name: string;
    responsibilities: string[];
}

type SchoolType = {
    school_uuid: string;
    school_name: string;
  }

type Major = {
    major_name: string;
    schools: SchoolType[];
};

export default function RecommendJobPageComponent() {
    // State to track the active section (careers or majors)
    const [currentLocale, setCurrentLocale] = useState<string>('km');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }
    }, []);

    const params = useParams();
    const uuidString = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;

    console.log("uuid from job page:", uuidString);


    

    const [getCareerByUuid, { isLoading, data }] = useGetCareerByUuidMutation();

    useEffect(() => {

        const careerUuid = localStorage.getItem('careerUuid') || ''
        // Trigger the API call when the component mounts
        if (uuidString && careerUuid) {
            getCareerByUuid({ uuid: uuidString, career_uuid: careerUuid })
                .unwrap()
                .then((result) => {
                    console.log('Career Data:', result);
                })
                .catch((err) => {
                    console.error('Error fetching career data:', err);
                });
        } else {
            console.error('Missing UUID or Career UUID');
        }
    }, [uuidString, getCareerByUuid]);

    const jobTitle = data?.payload?.career_name;

    const jobList = data?.payload?.categories;

    const majors = data?.payload?.majors


    console.log("joblist: ", jobList)


    const [activeSection, setActiveSection] = useState<'Careers' | 'Majors' | 'job'>('Careers');
    const [selectedJob, setSelectedJob] = useState<JobType | null>(null); // Selected job


    const handleSectionChange = (section: 'Careers' | 'Majors' | 'job') => {
        setActiveSection(section); // Update active section
    };

    console.log('activeSection: ', activeSection)
    console.log('selectedJob: ', selectedJob)



    // Function to handle job click
    const handleJobClick = (job: JobType) => {
        setSelectedJob(job); // Set selected job to state
        setActiveSection('job'); // Ensure we're in the careers section
    };

    return (
        <div className="bg-green-50 pb-4 lg:pb-6">
            <JobIntroComponent
                title={currentLocale === 'km' ? 'ជម្រើស' : 'Recommended'}
                highlight={currentLocale === 'km' ? 'អាជីពការងារ' : ' Career'}
                description={currentLocale === 'km' ? 'ស្វែងយល់អំពីជំនាញ និងគុណវុឌ្ឍិសំខាន់ៗដែលត្រូវការសម្រាប់ភាពជោគជ័យក្នុងតួនាទីនេះ។ លើសពីនេះ អ្នកនឹងទទួលបានមុខជំនាញសំខាន់ៗ និងសាកលវិទ្យាល័យដែលពាក់ព័ន្ធផងដែរ ដើម្បីជួយអ្នកឱ្យឈានទៅរកការអប់រំដែលត្រឹមត្រូវ។ ' : 'Learn about the essential skills and qualifications needed for success in this role. You will also find recommended majors and related universities to help you pursue the right educational path. '}
                size="md"
                type="result"
                selectedJobTitle={selectedJob?.category_name}
                activeSection={activeSection}

            />

            {/* Breadcrumb */}
            {/* <div className="mb-4">
                <span className="text-gray-500">Home / </span>
                <span className="text-primary">Recommended Career</span>
                
            </div> */}

            <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6  px-4 lg:px-0 ">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full ">
                    <div className="col-span-1 lg:col-span-2 h-[110px] bg-white rounded-xl p-2 inline-block">
                        <div>
                            <div
                                className='flex justify-between px-4 py-2 rounded-xl hover:cursor-pointer mb-2'
                                onClick={() => handleSectionChange('Careers')}
                            >
                                <div className='flex gap-2'>
                                    <BriefcaseBusiness className={`mr-1 ${activeSection === 'Careers' ? 'text-primary' : 'text-gray-500'}`} />
                                    <p className={`font-semibold ${activeSection === 'Careers' ? 'text-primary' : 'text-gray-500'}`}>Careers</p>
                                </div>
                                <ChevronRight className={` ${activeSection === 'Careers' ? 'text-primary' : 'text-gray-500'}`} />
                            </div>
                            <hr />
                            <div
                                className='flex justify-between px-4 py-2 rounded-xl hover:cursor-pointer'
                                onClick={() => handleSectionChange('Majors')}
                            >
                                <div className='flex gap-2'>
                                    <GraduationCap className={`mr-1 ${activeSection === 'Majors' ? 'text-primary' : 'text-gray-500'}`} />
                                    <p className={`font-semibold ${activeSection === 'Majors' ? 'text-primary' : 'text-gray-500'}`}>Majors</p>
                                </div>
                                <ChevronRight className={`font-semibold ${activeSection === 'Majors' ? 'text-primary' : 'text-gray-500'}`} />
                            </div>
                        </div>
                    </div>

                    {
                        isLoading ? (
                            <Skeleton className="h-[200px] col-span-1 lg:col-span-5 bg-bglight rounded-xl p-4 space-y-4">

                                {/* Subheader Skeleton */}
                                <Skeleton className="h-4 w-1/5 rounded-xl" />

                                {/* Header Skeleton */}
                                <Skeleton className="h-6 w-1/2 rounded-xl" />

                                {/* Content Skeleton */}
                                <Skeleton className="w-full h-2/4"/>

                               
                            </Skeleton>

                        ) : (
                            <div className="col-span-1 lg:col-span-5 bg-white p-6 rounded-xl">
                                {/* Career Section Content */}
                                {activeSection === 'Careers' && (
                                    <div>
                                        <p className="text-[16px] lg:text-[18px] text-secondary">{currentLocale === 'km' ? 'វិស័យការងារ' : ' Field Of Work:'}</p>
                                        <p className="text-lg md:text-xl font-bold text-primary">{jobTitle || "Unknown Title"}</p>
                                        <hr className="my-2" />
                                        <p className="text-[16px] lg:text-[18px] overflow-hidden text-gray-400 pt-2">
                                            {currentLocale === 'km' ? 'នៅក្នុងវិស័យការងារនេះមានការងារជាច្រើនដូចជា៖' : ' In this field, There are jobs such as:'}

                                        </p>
                                        <ul className="mt-2 space-y-2 text-slate-500 list-inside list-disc">
                                            {jobList?.map((job: JobType, index: string) => (
                                                <div key={index} className="flex justify-between items-center gap-2 ml-2">
                                                    <div className="flex items-center ">

                                                        <li
                                                            key={index}
                                                            className={`hover:cursor-pointer text-[16px] lg:text-[18px] underline text-slate-600`}
                                                            onClick={() => handleJobClick(job)}
                                                        >
                                                            {job.category_name}
                                                        </li>
                                                    </div>


                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeSection === 'Majors' && (
                                    // <p className="text-md text-secondary">Majors and related universities...</p>
                                    <div>
                                        <p className="text-[16px] lg:text-[18px] text-secondary">{currentLocale === 'km' ? 'ជំនាញ' : 'Major:'}</p>


                                        {majors?.length > 0 ? (
                                            majors.map((major: Major, index: string) => (
                                                <div key={index} >
                                                    <p className="text-lg md:text-xl font-bold text-primary">{major.major_name || "Unknown Title"}</p>
                                                    <hr className="my-2" />
                                                    <p className="text-[16px] lg:text-[18px] overflow-hidden text-gray-400 pt-2 mb-2">
                                                        {currentLocale === 'km' ? 'សាកលវិទ្យាល័យដែលអ្នកអាចជ្រើសរើសមានដូចជា៖' : 'There are universities you can choose:'}
                                                    </p>

                                                    <div className='ml-2'>

                                                        {major.schools.length > 0 ? (
                                                            <ul className=" text-[16px] lg:text-[18px] list-disc pl-6 ">
                                                                {major.schools.map((school, schoolIndex) => (
                                                                   <Link key={schoolIndex} href={`/${currentLocale}/university/${school.school_uuid}`}><li  className="underline mb-2">{school.school_name}</li></Link> 
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className='text-gray-500'>No universities available for this major.</p>
                                                        )}
                                                    </div>


                                                    {/* <span onClick={handleToggle} className="text-primary">
                                            {isExpanded ? 'Show Less' : 'Show More'}
                                        </span> */}
                                                </div>

                                            ))
                                        ) : (
                                            <p className='text-gray-500'>No recommended majors available.</p>
                                        )}
                                    </div>
                                )}

                                {activeSection === 'job' && selectedJob && (
                                    <>
                                        <div className="flex gap-4">

                                            <div>
                                                <p className="text-md text-secondary">{currentLocale === 'km' ? 'ការងារ' : 'Career:'}</p>
                                                <h3 className="text-xl font-semibold text-primary">{selectedJob?.category_name}</h3>

                                            </div>

                                        </div>

                                        <hr className="my-2" />

                                        <div>
                                            <p className="text-md lg:text-md overflow-hidden text-gray-400 mt-4 mb-1">
                                                {currentLocale === 'km' ? 'ទំនួលខុសត្រូវក្នុងការងារនេះ' : 'Job Responsibilities:'}
                                            </p>
                                            {selectedJob.responsibilities?.map((res: string, index: number) => (
                                                <div key={index} className="flex justify-between items-center gap-2 ml-2">
                                                    <div className="flex items-center ">

                                                        <li
                                                            className={`hover:cursor-pointer text-md text-slate-600`}

                                                        >
                                                            {res}
                                                        </li>
                                                    </div>


                                                </div>
                                            ))}


                                        </div>


                                    </>

                                )}
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}
