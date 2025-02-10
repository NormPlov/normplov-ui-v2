import { normPlovApi } from "../api";

// Define the type for each test item
type DraftItem ={
    uuid: string;
    draft_name: string;
    assessment_name:string;
    image:string;
    created_at: string;
    updated_at:string;
  }
  type draftDelete={
    message:string;
    uuid: string;
    draft_name: string;
  }
  // Define the type for pagination metadata
type Metadata ={
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  }
  
  // Define the response structure for the API
type UserDraftResponse ={
    date: string;
    status: number;
    payload: {
      items: DraftItem[];  // Array of test items
      metadata: Metadata;  // Pagination metadata
    };
    message: string;
  }
type UserDraftDeleteResponse={
  status: number;
  message: string;
  payload:draftDelete;
}
type saveDraftPayloadResponse={
  test_uuid: string;
  test_name:string;
  assessment_type_name:string;
}  
type SaveDraftSubmittingResponse={
  status: number;
  message: string;
  payload:saveDraftPayloadResponse

}  

const draftApiMap: Record<string, string> = {
  skill: 'api/v1/draft/save_draft/Skills',
  personality: 'api/v1/draft/save_draft/Personality',
  interest: 'api/v1/draft/save_draft/Interests',
  value: 'api/v1/draft/save_draft/Values',
  learningStyle: 'api/v1/draft/save_draft/Learning Style',
};
export const draftApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({  
    getAllUserDraft: builder.query<UserDraftResponse, { page: number; page_size: number }>({
        query: ({ page = 1, page_size= 10 }) =>({
            url: `api/v1/draft/load-drafts?page=${page}&page_size=${page_size}`,
            method: "GET",
        }),
        providesTags:["userDraft"]
    }),
   
    draftAssessment: builder.mutation({
      query: ({ draftType, body }: { draftType: string ; body: object }) => {
        const endpoint = draftApiMap[draftType];
        if (!endpoint) throw new Error(`Invalid assessment type: ${draftType}`);
        return {
          url: endpoint,
          method: 'POST',
          body,
        };
      },
      invalidatesTags:["userDraft","AllTestAsess"]
    }),
    getUserDraftDetails:builder.query({
      query: ({uuid}:{uuid:string})=>({
        url:`api/v1/draft/retrieve-draft/${uuid}`,
        method:"GET",
      }),
      providesTags:["userDraft"]
    }),
    SaveDraftAgain:builder.mutation<UserDraftResponse,{uuid:string,body:object}>({
      query: ({uuid,body})=>({
        url:`api/v1/draft/update_draft/${uuid}`,
        method:"PUT",
        body:body,
      }),
      invalidatesTags:["userDraft"]
    }),
    deleteUserDraft: builder.mutation<UserDraftDeleteResponse, {uuid: string}>({
      query: ({uuid})=>({
        url:`api/v1/draft/delete-draft-assessment/${uuid}`,
        method:"DELETE",
      
      }),
      invalidatesTags:["userDraft"]
    }),
    saveDraftSubmitting:builder.mutation<SaveDraftSubmittingResponse,{uuid:string,body:object}>({
      
      query: ({uuid,body})=>({
        
        url:`api/v1/draft/submit-draft-assessment/${uuid}`,
        method:"POST",
        body:body,
      }),
      invalidatesTags:["userDraft","AllTestAsess"]
    })
  }),
});

export const {
 useGetAllUserDraftQuery,
 useDeleteUserDraftMutation,
 useDraftAssessmentMutation,
 useSaveDraftAgainMutation,
 useGetUserDraftDetailsQuery,
 useSaveDraftSubmittingMutation
} = draftApi;