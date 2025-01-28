"use client";
import { JobListingCard } from "@/components/JobComponent/JobListingCard";
import { JobMainContainer } from "@/components/JobComponent/JobMainContainer";
import React, { useState, useEffect } from "react";
import job from "@/public/job/job.png";
import { JobBannerCard } from "@/components/JobComponent/JobBannerCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizButton } from "@/components/QuizComponent/QuizButton";
import { LayoutTemplate, MapPin, Clock } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Pagination from "@/components/ProfileComponent/Pagination";
import { useGetJobsQuery } from "@/redux/service/jobs";
import {
  setSearch,
  setSelectedCategory,
  setPage,
  setSelectedLocation,
  setSelectedJobType,
} from "@/redux/feature/jobs/jobsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import JobsSkeleton from "@/components/SkeletonLoading/JobsSkeleton/JobsSkeleton";
import Image from "next/image";

interface CategoryOption {
  value: string;
  label: string;
}

// const jobListings = [
//   {
//     id: '1',
//     title: 'iOS Developer',
//     desc: 'Anakut Digital Solutions',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Full-Time',
//     location: 'Remote',
//     category: 'Software Development',
//     jobDesc: 'We are seeking a highly skilled and experienced Mid-Senior iOS Developer to join our dynamic team. As a Mid-Senior iOS Developer, you will play a crucial role in designing, developing, and maintaining high-quality iOS applications.',
//     jobDescLabel: 'Job Description',
//     salary: '600+',
//   },
//   {
//     id: '2',
//     title: 'Backend Developer',
//     desc: 'Anakut Digital Solutions',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Part-Time',
//     location: 'Phnom Penh',
//     category: 'Backend Development',
//     jobDesc: 'Join our innovative team as a Backend Developer and play a pivotal role in developing robust and scalable server-side applications.',
//     jobDescLabel: 'Job Description',
//     salary: '500+',
//   },
//   {
//     id: '3',
//     title: 'Frontend Developer',
//     desc: 'Cambodia Tech Ventures',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Full-Time',
//     location: 'Phnom Penh',
//     category: 'Web Development',
//     jobDesc: 'We are looking for a passionate Frontend Developer to build innovative and interactive user interfaces.',
//     jobDescLabel: 'Job Description',
//     salary: '700+',
//   },
//   {
//     id: '4',
//     title: 'Graphic Designer',
//     desc: 'Creative Agency',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Contract',
//     location: 'Siem Reap',
//     category: 'Design',
//     jobDesc: 'Collaborate with clients to create visually appealing designs and branding.',
//     jobDescLabel: 'Job Description',
//     salary: '400+',
//   },
//   {
//     id: '5',
//     title: 'Data Analyst',
//     desc: 'Tech Analytics Co.',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Full-Time',
//     location: 'Remote',
//     category: 'Data Science',
//     jobDesc: 'Analyze and interpret complex data sets to inform business decisions.',
//     jobDescLabel: 'Job Description',
//     salary: '800+',
//   },
//   {
//     id: '6',
//     title: 'Digital Marketing Specialist',
//     desc: 'Global Marketing Ltd.',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Part-Time',
//     location: 'Phnom Penh',
//     category: 'Marketing',
//     jobDesc: 'Develop and execute digital marketing strategies to enhance brand presence.',
//     jobDescLabel: 'Job Description',
//     salary: '600+',
//   },
//   {
//     id: '7',
//     title: 'Product Manager',
//     desc: 'Tech Innovations',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Full-Time',
//     location: 'Phnom Penh',
//     category: 'Management',
//     jobDesc: 'Oversee product lifecycle and collaborate with cross-functional teams to deliver high-quality solutions.',
//     jobDescLabel: 'Job Description',
//     salary: '1200+',
//   },
//   {
//     id: '8',
//     title: 'AI Researcher',
//     desc: 'Future AI Labs',
//     image: '/job/khmerEnterpriseLogo.png',
//     time: 'Full-Time',
//     location: 'Remote',
//     category: 'Artificial Intelligence',
//     jobDesc: 'Conduct cutting-edge research in AI and machine learning technologies.',
//     jobDescLabel: 'Job Description',
//     salary: '1500+',
//   },
// ];

type OptionType = {
  value: string;
  label: string;
};

// Define a Job type based on the expected job structure
interface Job {
  uuid: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  category?: string; // Required
  description: string;
  requirements: string[];
  responsibilities: string[];
  posted_at_days_ago?: string;
  is_scraped?: boolean;
  created_at_days_ago?: string;
  logo?: string;
  salary?: string;
  created_at: string;
  closing_date: string;
  isActive?: boolean;
  visitor_count?: number;
  bookmarked?: boolean;
}

export default function Job() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [locations, setLocations] = useState<OptionType[]>([]); // Add state for locations
  const [jobTypes, setJobTypes] = useState<OptionType[]>([]); // Add state for job types
  const pathname = usePathname();
  const { locale } = useParams();

  const { search, selectedCategory, selectedLocation, selectedJobType, page } =
    useAppSelector((state: RootState) => state.jobs);

  // Fetch jobs based on the filter state
  const { data } = useGetJobsQuery({
    search,
    page,
    category: selectedCategory?.value || "", // Send category if
    location: selectedLocation?.value || "", // Add location filter
    job_type: selectedJobType?.value || "", // Add the job_type filter
  });

  useEffect(() => {
    const fetchCategoriesAndLocations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/jobs`
        );
        const data = await response.json();

        // Log the response for debugging
        console.log("API Response:", data);

        if (!data.payload || !data.payload.items) {
          console.error("No items in the response");
          return;
        }

        const totalPages = data.payload.metadata.total_pages || 1; // Default to 1 page if not provided
        let allJobs: Job[] = [];

        for (let page = 1; page <= totalPages; page++) {
          try {
            const pageResponse = await fetch(
              `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/jobs?page=${page}`
            );
            const pageData = await pageResponse.json();
            if (pageData.payload && pageData.payload.items) {
              allJobs = [...allJobs, ...pageData.payload.items];
            } else {
              console.error(`No items found on page ${page}`);
            }
          } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
          }
        }

        // Extract unique categories, locations, and job types
        const categories = allJobs.reduce((acc: string[], job: Job) => {
          if (job.category && !acc.includes(job.category)) {
            acc.push(job.category);
          }
          return acc;
        }, []);
        const formattedCategories = categories.map((category: string) => ({
          value: category,
          label: category,
        }));
        setCategories(formattedCategories);

        const locations = allJobs.reduce((acc: string[], job: Job) => {
          if (job.location && !acc.includes(job.location)) {
            acc.push(job.location);
          }
          return acc;
        }, []);
        const formattedLocations = locations.map((location: string) => ({
          value: location,
          label: location,
        }));
        setLocations(formattedLocations);

        const jobTypes = allJobs.reduce((acc: string[], job: Job) => {
          if (job.job_type && !acc.includes(job.job_type)) {
            acc.push(job.job_type);
          }
          return acc;
        }, []);
        const formattedJobTypes = jobTypes.map((jobType: string) => ({
          value: jobType,
          label: jobType,
        }));
        setJobTypes(formattedJobTypes);
      } catch (error) {
        console.error("Error fetching categories and locations:", error);
      }
    };

    fetchCategoriesAndLocations();
  }, []);

  if (!data) {
    return <JobsSkeleton />;
  }

  console.log("data: ", data);

  const handleCardClick = async (id: string) => {
    try {
      const newPath = `/${locale}/jobs/${id}`;

      // Ensure the new path does not contain the duplicate locale part
      if (!pathname.startsWith(`/${locale}`)) {
        // If the pathname doesn't include the current locale, add it
        router.push(newPath);
      } else {
        // If the pathname already includes the locale, navigate to the result directly
        router.push(newPath);
      }

      // router.push(`/jobs/${id}`);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/jobs/${id}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch job details. Status: ${response.status}`
        );
      }

      const jobDetail = await response.json();
      console.log("Job Details: ", jobDetail);
    } catch (error) {
      console.error("Failed to fetch job details:", error);
      // Optionally, you can display an error message to the user here
      alert(
        "Sorry, there was an error fetching the job details. Please try again."
      );
    }
  };

  const jobs = data?.payload?.items || [];
  const totalPages = data?.payload?.metadata?.total_pages || 1;

  // Fetch filter options (categories)

  const handleSearchChange = (query: string) => {
    dispatch(setSearch(query));
  };
  const handleCategoryChange = (category: OptionType | null) => {
    dispatch(setSelectedCategory(category)); // Dispatch the category update action
  };

  const handleLocationChange = (location: OptionType | null) => {
    dispatch(setSelectedLocation(location)); // Dispatch the location update action
  };

  const handleJobTypeChange = (jobType: OptionType | null) => {
    dispatch(setSelectedJobType(jobType)); // Dispatch the job type update action
  };

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="w-full bg-slate-50">
      <JobMainContainer
        title="ជាមួយការងារដែលមានតម្រូវការខ្ពស់ក្នុងទីផ្សារ"
        desc="តាមដានទីផ្សារការងារដោយប្រើឧបករណ៍ឆ្លាតវៃរបស់យើងជាមួយនឹងការវិភាគទិន្នន័យដើម្បីស្វែងរកការងារដែលកំពុងពេញនិយម។ យើងនាំមកជូនអ្នកនូវឱកាសការងារដែលមានតម្រូវការខ្ពស់បំផុត ដើម្បីជួយអ្នករៀបចំផែនការសម្រាប់អនាគតដ៏ជោគជ័យ។"
        highlight="ឈានទៅរកអនាគតរបស់អ្នកនៅថ្ងៃនេះ"
        onSearch={handleSearchChange}
      />

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-10 lg:py-12 space-y-4 lg:space-y-6">
        <p className="md:text-xl lg:text-2xl font-semibold text-textprimary">
          កំណត់ទិន្នន័យ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-textprimary">
          {/* Category Filter */}
          <Select
            value={selectedCategory ? selectedCategory.value : "ប្រភេទ"}
            onValueChange={(value) =>
              handleCategoryChange({ value, label: value } as CategoryOption)
            }
          >
            <SelectTrigger className="w-full bg-white rounded-[8px] border border-slate-200 outline-none p-3">
              <div className="flex gap-2 items-center max-w-[100%]">
                <LayoutTemplate size={18} color="#0BBB8A" />
                <SelectValue className=" w-full bg-red-200 truncate">
                  {selectedCategory ? selectedCategory.label : "ប្រភេទ"}
                </SelectValue>
              </div>
            </SelectTrigger>

            <SelectContent className="bg-white text-textprimary">
              {categories.length === 0 ? (
                <SelectItem value="no-categories" disabled>
                  No categories available
                </SelectItem>
              ) : (
                categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="whitespace-nowrap  overflow-hidden text-ellipsis px-4 py-2"
                  >
                    {category.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Location Filter */}
          {/* Location Filter */}
          <Select
            value={
              selectedLocation ? selectedLocation.value : "ទីកន្លែងបំពេញការងារ"
            }
            onValueChange={(value) =>
              handleLocationChange({ value, label: value } as OptionType)
            }
          >
            <SelectTrigger className="w-full bg-white rounded-[8px] border border-slate-200 outline-none p-3">
              <div className="flex gap-2 items-center">
                <MapPin size={18} color="#0BBB8A" />
                <SelectValue className="w-full">
                  {selectedLocation
                    ? selectedLocation.label
                    : "ទីកន្លែងបំពេញការងារ"}
                </SelectValue>
              </div>
            </SelectTrigger>

            <SelectContent className="bg-white text-textprimary">
              {locations.length === 0 ? (
                <SelectItem value="no-locations" disabled>
                  No locations available
                </SelectItem>
              ) : (
                locations.map((location) => (
                  <SelectItem
                    key={location.value}
                    value={location.value}
                    className="whitespace-nowrap overflow-hidden text-ellipsis px-4 py-2"
                  >
                    {location.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Job Type Filter */}
          <Select
            value={
              selectedJobType ? selectedJobType.value : "ប្រភេទនៃការបំពេញការងារ"
            }
            onValueChange={(value) =>
              handleJobTypeChange({ value, label: value } as OptionType)
            }
          >
            <SelectTrigger className="w-full bg-white rounded-[8px] border border-slate-200 outline-none p-3">
              <div className="flex gap-2 items-center">
                <Clock size={18} color="#0BBB8A" />
                <SelectValue>
                  {selectedJobType
                    ? selectedJobType.label
                    : "ប្រភេទបំពេញការងារ"}
                </SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white text-textprimary">
              {jobTypes.length === 0 ? (
                <SelectItem value="no-job-types" disabled>
                  No job types available
                </SelectItem>
              ) : (
                jobTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <QuizButton
            title="កំណត់ឡើងវិញ"
            type="rightIcon"
            rounded="xl"
            outline="false"
            full={false}
            onClick={() => {
              dispatch(setSelectedCategory(null)); // Reset the category to null
              dispatch(setSearch("")); // Optionally reset the search filter
              dispatch(setSelectedLocation(null));
              dispatch(setSelectedJobType(null));
            }}
          />
        </div>
      </div>

      {/* Job searching */}
      <div className="max-w-7xl mx-auto px-4  pb-4 md:pb-6">
        <p className="md:text-xl lg:text-2xl font-semibold text-textprimary pb-4 md:pb-6">
          ឱកាសការងារ
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <div className="lg:col-span-8 space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job: Job) => (
                <JobListingCard
                  key={job.uuid}
                  uuid={job.uuid}
                  title={job.title}
                  desc={job.company_name}
                  image={job.logo}
                  time={job.job_type}
                  salary={job.salary}
                  location={job.location}
                  category={job.category || " "}
                  created_at_days_ago={job.created_at_days_ago}
                  posted_at_days_ago={job.posted_at_days_ago}
                  is_scraped={job.is_scraped}
                  isActive={false} // Default or dynamic value
                  visitor_count={job.visitor_count ?? 0}
                  bookmarked={job.bookmarked ?? false}
                  onClick={() => handleCardClick(job.uuid)}
                />
              ))
            ) : (
              <div className="text-center py-0 ">
                <div className="lg:w-full md:w-[700px] items-center flex justify-center text-xl  h-[600px]">
                  <div className="w-[400px]">
                    <Image
                      src="https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/6514e57fce3e02e011dc4a00_Search%20Empty.avif"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full h-full opacity-60"
                    />
                    <p className="text-xl text-textprimary font-semibold">
                      មិនមានការងារដែលសាកសមនៅពេលនេះ
                    </p>
                    <p className="text-base text-gray-500">
                      សូមព្យាយាមមើលម្តងទៀតនៅពេលក្រោយ
                    </p>
                  </div>
                </div>
              </div>
            )}
            {jobs.length > 0 && (
              <div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  setCurrentPage={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-20">
              <JobBannerCard
                title="មិនទាន់ដឹងថាការងារមួយណាសាកសមនឹងអ្នក?"
                desc="សាកល្បងតេស្តវាយតម្លៃរបស់យើង និងស្វែងរកអាជីព ការងារដ៏មានសក្តានុពលនៅថ្ងៃនេះ"
                buttonText="សាកល្បងតេស្ត"
                image={job}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
