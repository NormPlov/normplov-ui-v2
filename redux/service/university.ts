import { normPlovApi } from "../api";

export interface GetUniversityFilters {
  search?: string;
  page?: number;
  province?: string;
  location?: string;
  type?: string;
  degree?: string; // Add degree filter
  faculty?: string; // Add faculty filter
}
export interface UniversityType {
  uuid: string;
  kh_name: string;
  en_name: string;
  location: string;
  province: string;
  popular_major: string;
  logo_url: string | null; // Handle null value
}

export interface UniversitysPayload {
  schools: UniversityType[];
  metadata: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface UniversityResponse {
  payload: UniversitysPayload; // Added payload to match API response
}

export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<UniversityResponse, GetUniversityFilters>({
      query: (filters) => {
        // Construct query parameters for search and filter
        const query = new URLSearchParams();
        if (filters.search) query.append("search", filters.search);
        if (filters.province)
          query.append("province", filters.province);
        if (filters.type) query.append("type", filters.type);
        if (filters.page) query.append("page", filters.page.toString());
        if (filters.degree) query.append("degree", filters.degree); // Append degree
        if (filters.faculty) query.append("faculty", filters.faculty); // Append faculty

        return {
          url: `api/v1/schools?${query.toString()}`,
          method: "GET", // Specify the HTTP method
        };
      },
    }),
    // New endpoint for popular schools
    getPopularSchools: builder.query({
      query: () => ({
        url: `api/v1/schools/popular`,
        method: "GET", // Specify the HTTP method
      }),
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetPopularSchoolsQuery } =
  universityApi;
