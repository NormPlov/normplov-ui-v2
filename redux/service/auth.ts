import { normPlovApi } from "../api";

// Define more specific types for the responses and requests
type RegisterResponse = { message: string }; // Example response type
type VerifyCodeRegisterResponse = { email:string,verification_code:string,message?: string };
type ResendVerifyCodeRegisterResponse = { message: string };
type ForgotPasswordResponse = { message: string };
type ResetPasswordResponse = { message: string };
type VerifyCodeResetPasswordResponse = {
  email: string;
  reset_code: string; // Add reset_code to the type definition
  message?: string; // Include message if needed
};
type ResendCodeResetPasswordResponse = {
  email: string;
  reset_code: string;
  message?: string; // Include message if needed
};

// Define the request data types
type RegisterRequest = { data: { username: string, email: string, password: string, confirm_password: string } };
type VerifyCodeRegisterRequest = { email: string, verification_code: string };
type ResendVerifyCodeRegisterRequest = { email: string };
type ForgotPasswordRequest = { email: string };
type ResetPasswordRequest = { email: string, reset_code: string, new_password: string, confirm_password: string };
type VerifyCodeResetPasswordRequest = { email: string, reset_code: string};
type ResendCodeResetPasswordRequest = { email: string };

export const authApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    // register user
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: ({ data }) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    // VerifyCode For Register
    VerifyCodeRegister: builder.mutation<VerifyCodeRegisterResponse, VerifyCodeRegisterRequest>({
      query: ({ email, verification_code }) => ({
        url: `auth/verify`,
        method: "POST",
        body: { email, verification_code },
      }),
    }),

    // Resend VerifyCode for Register
    ResendVerifyCodeRegister: builder.mutation<ResendVerifyCodeRegisterResponse, ResendVerifyCodeRegisterRequest>({
      query: ({ email }) => ({
        url: `auth/resend-verification-code`,
        method: "POST",
        body: { email },
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: ({ email }) => ({
        url: `auth/password-reset-request`,
        method: "POST",
        body: { email }, // Wrap email in an object
      }),
    }),

    //verify code for reset password (forgot password)
    VerifyCodeResetPassword: builder.mutation<VerifyCodeResetPasswordResponse, VerifyCodeResetPasswordRequest>({
      query: ({ email, reset_code }) => ({
        url: `auth/verify-reset-password`,
        method: "POST",
        body: { email, reset_code },
      }),
    }),
    //resend code for reset password
    // ResendCodeResetPassword: builder.mutation<ResendVerifyCodeResetPasswordResponse, ResendCodeResetPasswordRequest >({
    //   query: ({ email }) => ({
    //     url: `auth/resend-reset-password`,
    //     method: "POST",
    //     body: { email },
    //   }),
    // }),

      //resend code for reset password
    ResendCodeResetPassword: builder.mutation<ResendCodeResetPasswordResponse, ResendCodeResetPasswordRequest >({
      query: ({ email }) => ({
        url: `auth/resend-reset-password`,
        method: "POST",
        body: { email },
      }),
    }),


    // reset password
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: ({ email, reset_code, new_password, confirm_password }) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: { email,reset_code, new_password, confirm_password },
      }),
    }),

    
  }),
});

export const {
  useRegisterMutation,
  useVerifyCodeRegisterMutation,
  useResendVerifyCodeRegisterMutation,
  useForgotPasswordMutation,
  useResendCodeResetPasswordMutation,
  useVerifyCodeResetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
