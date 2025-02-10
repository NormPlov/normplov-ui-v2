import { normPlovApi } from "../api";
type ChangePasswordResponse = { message: string };
type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};
type UserResponse = {
  payload: UserPayload;
  message?: string;
};
type UserPayload = {
  uuid: string;
  username: string;
  avatar: string | null;
  address: string | null;
  bio: string | null;
  gender: string | null;
  email: string | null;
  date_of_birth: string | null;
  phone_number: string | null;
};

type updateProfileResponse = {
  status: number;
  message: string;
  payload: UserPayload;
};
type updateUserProfile = {
  username?: string | null;
  address?: string | null;
  phone_number?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  bio?: string | null;
};
type Items ={
  bookmark_uuid: string;
  job_uuid: string;
  job_type:string;
  title: string;
  company_name:string;
  company_logo:string;
  province_name:string;
  closing_date:string;
}

// Define the type for pagination metadata
type Metadata ={
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

// Define the response structure for the API
type UserBookMarkResponse ={
  date: string;
  status: number;
  payload: {
    items: Items[];  // Array of test items
    metadata: Metadata;  // Pagination metadata
  }
  message: string;
}
type UserBookMarkDeleteResponse={
status: number;
message: string;
}
export const userApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: `api/v1/user/me`,
        method: "GET",
      }),
      providesTags: ["userProfile"],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: ({ old_password, new_password, confirm_new_password }) => ({
        url: `api/v1/user/change-password`,
        method: "POST",
        body: { old_password, new_password, confirm_new_password },
      }),
    }),
    updateProfileUser: builder.mutation<
      updateProfileResponse,
      { uuid: string; user: updateUserProfile }
    >({
      query: ({ uuid, user }) => ({
        url: `api/v1/user/profile/update/${uuid}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["userProfile"],
    }),
    // Post image by uuid user
    postImage: builder.mutation<
      UserResponse,
      { uuid: string; avatar_url: File }
    >({
      query: ({ uuid, avatar_url }) => {
        const formData = new FormData();
        // 'file' follow your backend if backend is file put file if backend image put image
        formData.append("file", avatar_url);
        return {
          url: `api/v1/user/profile/upload/${uuid}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["userProfile"],
    }),

    postBookmark: builder.mutation<{ message: string }, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/bookmarks/${uuid}`,
        method: "POST",
      }),
      invalidatesTags: ["bookmarks"],
    }),
    getAllUserBookMark: builder.query<UserBookMarkResponse,{ page: number; page_size: number }>({
      query: ({ page = 1, page_size= 10 }) =>({
          url: `api/v1/bookmarks/?page=${page}&page_size=${page_size}`,
          method: "GET",
      })
       
  }),
  deleteUserBookMark: builder.mutation<UserBookMarkDeleteResponse, {uuid: string}>({
    query: ({uuid})=>({
      url:`api/v1/bookmarks/${uuid}`,
      method:"DELETE",
      // invalidatesTags:["bookmarks"]
    }),
  }),
    getTestimonial: builder.query({
      query: () => ({
        url: 'api/v1/feedback/promoted',
        method: 'GET',
      }),
    }),



  }),
});

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useUpdateProfileUserMutation,
  usePostImageMutation,
  usePostBookmarkMutation,
  useGetAllUserBookMarkQuery,
  useDeleteUserBookMarkMutation,
  useGetTestimonialQuery
} = userApi;
