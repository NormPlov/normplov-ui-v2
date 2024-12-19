import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryReturnValue,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setAccessToken } from "./feature/auth/authSlice";

// Correcting the BaseQueryArgs type definition
type BaseQueryArgs = {
  url: string;
  method: string;
  body?: unknown; // You can refine this type further depending on the structure of your request body
};

// Change to `Record<string, unknown>` instead of `{}` for object options
type BaseQueryOptions = Record<string, unknown>; // Object with unknown properties

// Setting up the baseQuery with headers, including the token in the request
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_NORMPLOV_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log("Token retrieved for API call:", token); // Debugging
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Adjusting the type for return value of `baseQueryWithReAuth`
type BaseQueryReturnType = QueryReturnValue<
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>
>;

// baseQueryWithReAuth with the proper type
const baseQueryWithReAuth = async (
  args: BaseQueryArgs,
  api: BaseQueryApi, // Replacing `any` with the correct type from Redux Toolkit
  extraOptions: BaseQueryOptions
): Promise<BaseQueryReturnType> => {
  let result = await baseQuery(args, api, extraOptions);
    console.log("Final request with headers:", args);
    
  if (result.error?.status === 401) {
    console.log("Unauthorized. Attempting token refresh...");
    const res = await fetch(`/api/refresh`, {
      method: "POST",
      credentials: "include",
    });
  
    if (res.ok) {
      const data = await res.json();
      console.log("New Access Token:", data.accessToken); // Log new token
      api.dispatch(setAccessToken(data.accessToken)); // Update Redux with new token
      result = await baseQuery(args, api, extraOptions); // Retry original request
    } else {
      const res = await fetch(`/api/logout`, {
				method: "POST",
				credentials: "include",
			});
			const data = await res.json();
			console.log(data);
      console.error("Token refresh failed.");
    }
  }

  return result;
};

// Create the API service with Redux Toolkit's `createApi`
export const normPlovApi = createApi({
  tagTypes:["userProfile","userTest","userDraft"],
  reducerPath: "normPlovApi",
  baseQuery: baseQueryWithReAuth, // Use the custom base query with re-authentication logic
  endpoints: () => ({}),
});



// kimla Pro

// Create the API slice with redux-toolkit's createApi
export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_NORMPLOV_API_URL,
  }),
  endpoints: (builder) => ({
    // Fetch universities with optional search and filter parameters
    getUniversities: builder.query({
      query: (filters: {
        search?: string;
        province_uuid?: string;
        type?:string;
        page?: number;
        degree?: string;    // Add degree filter
        faculty?: string;   // Add faculty filter
      }) => {
        // Construct query parameters for search and filter
        const query = new URLSearchParams();
        if (filters.search) query.append("search", filters.search);
        if (filters.province_uuid) query.append("province_uuid", filters.province_uuid);
        if (filters.type) query.append('type', filters.type);
        if (filters.page) query.append("page", filters.page.toString());
        if (filters.degree) query.append('degree', filters.degree);   // Append degree
        if (filters.faculty) query.append('faculty', filters.faculty); // Append faculty

        return {
          url: `api/v1/schools?${query.toString()}`,
        };
      },
    }),
  }),
});
export const { useGetUniversitiesQuery } = universityApi;
