import { normPlovApi } from "../api";


type UserValueShareLinkResponse = {
  test_uuid: string;
  test_name: string;
  assessment_type_name: string;
};

type UserPayloadShareLinkResponse = {
  shareable_link: string;
  test_details: UserValueShareLinkResponse;
};

type UserShareLinkResponse = {
  status: number;
  payload: UserPayloadShareLinkResponse;
};
type UserPayloadSeoResponse = {
  file_name:string;
}  
type PostUserSeo={
  payload: UserPayloadSeoResponse;
}

export const seoApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ POST request to generate image before sharing
    postSeo: builder.mutation<PostUserSeo, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/test/${uuid}/save-image`,
        method: "POST",
      }),
    }),


    // ✅ GET request to fetch the shareable link
    getShareLinks: builder.query<UserShareLinkResponse, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/test/generate-shareable-link/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostSeoMutation,
  useGetShareLinksQuery
} = seoApi;
