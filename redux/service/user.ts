import { normPlovApi } from "../api";
type ChangePasswordResponse = { message: string };
type ChangePasswordRequest={
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
type UserResponse={
  payload: UserPayload;
  message?: string;
}
type UserPayload = {
    uuid: string;
    username: string;
    avatar: string | null;
    address: string | null;
    bio: string | null;
    gender: string | null;
    email:string | null;
    date_of_birth: string | null;
    phone_number :string | null;
};

type updateProfileResponse={
  status:number,
  message: string;
  payload: UserPayload;
}
type updateUserProfile ={
  username?:string | null;
  address?:string | null;
  phone_number?:string | null;
  date_of_birth?:string | null;
  gender?: string | null;
  bio?:string | null;
}

export const userApi = normPlovApi.injectEndpoints({
    endpoints: (builder) =>({
        getUser: builder.query<UserResponse, void>({
            query: () => ({
                url: `api/v1/user/me`,
              method: "GET",
            }),
            providesTags:["userProfile"]
        }),
        changePassword:builder.mutation<ChangePasswordResponse,ChangePasswordRequest>({
          query: ({old_password,new_password,confirm_new_password}) => ({
            url: `api/v1/user/change-password`,
            method: "POST",
            body:{old_password,new_password,confirm_new_password},
        }),
        }),
        updateProfileUser:builder.mutation<updateProfileResponse,{uuid:string,user:updateUserProfile}>({
          query:({uuid,user})=>({
            url:`api/v1/user/profile/update/${uuid}`,
            method:"PUT",
            body:user
          }),
          invalidatesTags:["userProfile"]
        }),
         // Post image by uuid user
         postImage: builder.mutation<UserResponse, { uuid: string; avatar_url: File }>({
          query: ({ uuid, avatar_url }) => {
              const formData = new FormData();
              // 'file' follow your backend if backend is file put file if backend image put image 
              formData.append('file', avatar_url); 
              return {
                  url: `api/v1/user/profile/upload/${uuid}`,
                  method: 'POST',
                  body: formData, 
                 
              };
          },
          invalidatesTags:["userProfile"]
      }),


    })
})

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useUpdateProfileUserMutation,
  usePostImageMutation
} = userApi;


