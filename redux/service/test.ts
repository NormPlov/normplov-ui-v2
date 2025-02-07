import { normPlovApi } from "../api";

// Define the type for each test item
type Tests ={
    test_uuid: string;
    test_name: string;
    assessment_type_name:string;
    assessment_type_image:string;
    created_at: string;
  }
  
  // Define the type for pagination metadata
type Metadata ={
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  }
  
  // Define the response structure for the API
type UserTestResponse ={
    date: string;
    status: number;
    payload: {
      tests: Tests[];  // Array of test items
      metadata: Metadata;  // Pagination metadata
    };
    message: string;
  }
type UserTestDeleteResponse={
  status: number;
  message: string;
}
type UserValueShareLinkResponse={
  test_uuid:string;
  test_name:string;
  assessment_type_name:string;
}  
type UserPayloadShareLinkResponse={
  shareable_link:string;
  test_details:UserValueShareLinkResponse;
}  
type UserShareLinkResponse={
   status: number;
   payload:UserPayloadShareLinkResponse;

} 
  
export const testApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({  
    getAllUserTest: builder.query<UserTestResponse, { page: number; page_size: number }>({
        query: ({ page = 1, page_size= 10 }) =>({
            url: `api/v1/test/my-tests?page=${page}&page_size=${page_size}`,
            method: "GET",
        })
         
    }),
    deleteUserTest: builder.mutation<UserTestDeleteResponse, {uuid: string}>({
      query: ({uuid})=>({
        url:`api/v1/test/delete-test/${uuid}`,
        method:"DELETE",
        invalidatesTags:["userTests"]
      }),
    }),
    getShareLinks:builder.query<UserShareLinkResponse,{uuid:string}>({
      query: ({uuid})=>({
        url:`api/v1/test/generate-shareable-link/${uuid}`,
        method:"GET",
      }),
     
    })

  }),
});

export const {
    useGetAllUserTestQuery,
    useDeleteUserTestMutation,
    useGetShareLinksQuery
} = testApi;
