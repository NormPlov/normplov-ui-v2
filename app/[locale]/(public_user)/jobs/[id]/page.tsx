"use client";
import { JobListingCard } from "@/components/JobComponent/JobListingCard";
import { JobMainContainer } from "@/components/JobComponent/JobMainContainer";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizButton } from "@/components/QuizComponent/QuizButton";
import { LayoutTemplate, MapPin, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
import { JobDetailCard } from "@/components/JobComponent/JobDetailCard";
import JobDetailSkeleton from "@/components/SkeletonLoading/JobsSkeleton/JobDetailSkeleton";

interface CategoryOption {
  value: string;
  label: string;
}


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
  created_at: string;
  closing_date: string;
  isActive?: boolean;
  bookmarked?: boolean;
  visitor_count?: number;
}


export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [locations, setLocations] = useState<OptionType[]>([]); // Add state for locations
  const [jobTypes, setJobTypes] = useState<OptionType[]>([]); // Add state for job types
  const [currentLocale, setCurrentLocale] = useState<string>('km');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

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

        const totalPages = data.payload.metadata.total_pages;
        let allJobs: Job[] = []; // Explicitly typing the array as an array of Job objects

        // Fetch all pages based on total_pages
        for (let page = 1; page <= totalPages; page++) {
          const pageResponse = await fetch(
            `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/jobs?page=${page}`
          );
          const pageData = await pageResponse.json();
          allJobs = [...allJobs, ...pageData.payload.items];
        }

        // Extract categories
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

        // Extract locations
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

        // Extract job types
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
    return <JobDetailSkeleton />;
  }

  //console.log("data: ", data);

  const handleCardClick = (id: string) => {
    const newPath = `/${currentLocale}/jobs/${id}`;

    // Ensure the new path does not contain the duplicate locale part
    if (!pathname.startsWith(`/${currentLocale}`)) {
      // If the pathname doesn't include the current locale, add it
      router.push(newPath);
    } else {
      // If the pathname already includes the locale, navigate to the result directly
      router.push(newPath);
    }
  };

  const jobs = data?.payload?.items || [];
  const totalPages = data?.payload?.metadata?.total_pages || 1;


  const handleSearchChange = (query: string) => {
    dispatch(setSearch(query));
    router.push(`/jobs?search=${query}`); // Update URL for search
  };

  const handleCategoryChange = (category: OptionType | null) => {
    dispatch(setSelectedCategory(category));
    router.push(`/jobs?category=${category?.value}`); // Update URL for category
  };

  const handleLocationChange = (location: OptionType | null) => {
    dispatch(setSelectedLocation(location));
    router.push(`/jobs?location=${location?.value}`); // Update URL for location
  };

  const handleJobTypeChange = (jobType: OptionType | null) => {
    dispatch(setSelectedJobType(jobType));
    router.push(`/jobs?job_type=${jobType?.value}`); // Update URL for job type
  };

  // Check if a job is selected based on the id parameter
  const selectedJobFromId = jobs.find((job) => job.uuid === params.id);

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="w-full bg-bgPrimaryLight">
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
            <SelectTrigger className="w-full bg-white rounded-[8px] border-2 border-gray-200 outline-none p-3">
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
            <SelectTrigger className="w-full bg-white rounded-[8px] border-2 border-gray-200 outline-none p-3">
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
            <SelectTrigger className="w-full bg-white rounded-[8px] border-2 border-gray-200 outline-none p-3">
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
          <div className="lg:col-span-5 space-y-4">
            {jobs.map((job: Job) => (
              <JobListingCard
                key={job.uuid}
                uuid={job.uuid}
                title={job.title}
                desc={job.company_name}
                image={job.logo}
                time={job.job_type}
                location={job.location}
                closing_date={job.closing_date}
                created_at_days_ago={job.created_at_days_ago}
                posted_at_days_ago={job.posted_at_days_ago}
                is_scraped={job.is_scraped}
                isActive={false} // Default or dynamic value
                bookmarked={job.bookmarked ?? false}
                visitor_count={job.visitor_count ?? 0}
                onClick={() => handleCardClick(job.uuid)}
              />
            ))}
            <div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                setCurrentPage={handlePageChange}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            </div>
          </div>
          {/* Right Section: Job Details */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-0">
              {selectedJobFromId ? (
                <JobDetailCard
                  jobTitle={selectedJobFromId.title}
                  jobCompany={selectedJobFromId.company_name}
                  image={selectedJobFromId.logo || '/path/to/fallback/image.jpg'}
                  time={selectedJobFromId.job_type}
                  location={selectedJobFromId.location}
                  // category={selectedJobFromId.}
                  website={selectedJobFromId.website}
                  social={selectedJobFromId.facebook_url}
                  jobDesc={selectedJobFromId.description}
                  jobRequirement={selectedJobFromId.requirements ?? []}
                  jobResponse={selectedJobFromId.responsibilities ?? []}
                  buttonText="Apply Now"
                />
              ) : (
                <div className="p-4 text-gray-600">
                  Please select a job to see the details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
