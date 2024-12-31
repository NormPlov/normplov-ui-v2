import { normPlovApi } from "../api";
export const universityApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: (filters: {
        search?: string;
        province_uuid?: string;
        type?: string;
        page?: number;
        degree?: string; // Add degree filter
        faculty?: string; // Add faculty filter
      }) => {
        // Construct query parameters for search and filter
        const query = new URLSearchParams();
        if (filters.search) query.append("search", filters.search);
        if (filters.province_uuid)
          query.append("province_uuid", filters.province_uuid);
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

export const { useGetUniversitiesQuery,useGetPopularSchoolsQuery } = universityApi;
