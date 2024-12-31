import { normPlovApi } from "../api";

export interface GetJobsFilters {
    search?: string;
    page?: number;
    page_size?: number;  // Include default page size for pagination
    category?: string;
    location?: string;
    job_type?: string;   // Additional filter for job type
  }
  

export interface Job {
    uuid: string;
    title: string;
    company_name: string;
    location: string;
    description: string;
    job_type: string;
    logo?: string; // Add logo property (optional)
    requirements: string[];
    responsibilities: string[];
    facebook_url?: string;
    email?: string;
    phone?: string;
    website?: string;
    created_at: string;
    closing_date: string;
  }
  

export interface JobsPayload {
  items: Job[];
  metadata: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface JobsResponse {
  payload: JobsPayload; // Added payload to match API response
}

export const jobsApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, GetJobsFilters>({
      query: (filters) => {
        const query = new URLSearchParams();
        // Optional filters
        if (filters.search) query.append("search", filters.search);
        if (filters.page) query.append("page", filters.page.toString());
        if (filters.page_size) query.append("page_size", filters.page_size.toString());
        if (filters.category) query.append("category", filters.category);
        if (filters.location) query.append("location", filters.location);
        if (filters.job_type) query.append("job_type", filters.job_type); // Include job_type filter

        return {
          url: `api/v1/jobs?${query.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetJobsQuery } = jobsApi;
