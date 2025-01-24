"use client";
import React, { useState,useEffect } from "react";
// import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Label from "./LabelComponent";
import DynamicField from "./AuthField";
import ErrorDynamic from "./ErrorComponent";
import PasswordField from "./PasswordField";
import Link from "next/link";
import Button from "./ButtonComponentForAuth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectToken, setAccessToken } from "@/redux/feature/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";


type ValueTypes = {
  email: string;
  password: string;
};

const initialValues: ValueTypes = {
  email: "",
  password: "",
};

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
//     .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
//   password: Yup.string()
//     .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
//     .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
// });

const LoginComponent = () => {
  const t = useTranslations()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
      .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
    password: Yup.string()
      .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
      .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
  });
  
  const [currentLocale, setCurrentLocale] = useState<string>('km');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectToken);
  const router = useRouter();
  console.log("Access token: from Redux store", accessToken);
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);
  const handleClose = () => {
    router.push(`/${currentLocale}/`); // Redirect to the referrer
  };
  const handleGoogleLogin = () => {
    // const clientId = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
    const clientId = "584934236339-5bjir3arta5iumk19q9j2vuaejp0b9bl.apps.googleusercontent.com";
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = 'email profile';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}`;

    window.location.href = googleAuthUrl;
  };
  const handleLogin = async (user: ValueTypes) => {
    const { email, password } = user;
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
        // throw new Error('Failed to login'); // Now uses the native Error class
      }
      const data = await response.json();
      console.log("Access token Data: ", data);
      console.log("Login response data: ", data);
      const { accessToken } = data;
      console.log("Data AcessToken: ", data);
      console.log("AcessToken: ", accessToken);
      if (accessToken) {
        dispatch(setAccessToken(accessToken));
        console.log("Dispatched Access Token:", accessToken);
        toast.success("Logged in Successfully.", {
          autoClose: 3000,
        });
        router.push(`/${currentLocale}/`);
        console.log("Access token: ", data.accessToken);
      } else {
        throw new Error("Access token not found in response");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.log(error);
    } finally {
      setIsLoading(false); // Reset loading state to false
    }
  };
  // const handleClose = () => {
  //   // Redirect user to the homepage or another page
  //   router.push("/");
  // };

  return (
  //   <section
  //   className=" w-full h-screen bg-red-400">
  //   <div className="h-full w-full bg-transparent bg-white m-auto md:mt-24 lg:mt-0">
  //     <div className="lg:flex justify-between bg-blue-300">
  //       <div className="hidden md:flex lg:block lg:h-screen max-w-3xl bg-primary ">
  //         <div className="text-center pt-10">
  //           <h1 className="text-4xl text-white font-bold pb-4">
  //             សូមស្វាគមន៍មកកាន់គេហទំព័រនាំផ្លូវ
  //           </h1>
  //           <p className="text-white md:pt-5 lg:pt-0 md:px-20 lg:px-14 pb-11 text-lg">
  //             រកឃើញសក្តានុពលរបស់អ្នក និងស្វែងរកជំនាញឯកទេស
  //             នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត ចំណុចខ្លាំង
  //             និងគោលដៅអាជីពនាពេលអនាគតរបស់អ្នក។
  //           </p>
  //         </div>
  //         <div className="md:hidden lg:block ">
  //           <Image
  //             src="/auth/login.png"
  //             width={1000}
  //             height={1000}
  //             alt="Login Image"
  //             className="max-w-2xl "
  //           />
  //         </div>
  //       </div>
  //       <div className="w-full  lg:w-1/2 flex mx-auto">
  //         <div className=" w-full  mx-auto">
  //           <div className="flex flex-row-reverse ">
  //             <button
  //               className="text-2xl text-gray-500 hover:text-gray-700 px-3 pt-3"
  //               onClick={handleClose}
  //               aria-label="Close login page"
  //             >
  //               <IoCloseSharp />
  //             </button>
  //           </div>
  //           <div className="lg:px-12">
  //             <div className="mt-12 md:mt-14 px-8 lg:mt-10 lg:px-12">
  //               <h1 className="text-4xl font-bold text-primary">ចូលគណនី</h1>
  //               <Formik
  //                 initialValues={initialValues}
  //                 validationSchema={validationSchema}
  //                 onSubmit={(values, { setSubmitting }) => {
  //                   console.log("Form Submitted:", values);
  //                   handleLogin(values);
  //                   setSubmitting(false); // Simulate a submission delay
  //                 }}
  //               >
  //                 {() => (
  //                   <Form className="py-4 mt-4 ">
  //                     <div className="space-y-4 ">
  //                       {/* Email Field */}
  //                       <div>
  //                         <Label htmlFor="email" text="អ៉ីម៉ែល" required />
  //                         <DynamicField
  //                           type="text"
  //                           name="email"
  //                           id="email"
  //                           placeholder="បញ្ចូលអ៉ីម៉ែលរបស់អ្នក"
  //                         />
  //                         <ErrorDynamic name="email" component="div" />
  //                       </div>
    //                       {/* Password Field */}
  //                       <div>
  //                         <Label
  //                           htmlFor="password"
  //                           text="ពាក្យសម្ងាត់"
  //                           required
  //                         />
  //                         <PasswordField
  //                           name="password"
  //                           id="password"
  //                           placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
  //                           className="custom-class mt-1"
  //                         />
  //                         <ErrorDynamic name="password" component="div" />
  //                       </div>
  //                     </div>

  //                     {/* Forgot Password Link */}
  //                     <div className="mt-2 text-right">
  //                       <Link 
  //                        href={`/${currentLocale}/forgot-password`}
  //                       // href="/forgot-password"
  //                       >
  //                         <span className="text-sm text-primary hover:underline hover:font-semibold ">
  //                           ភេ្លចលេខសម្ងាត់?
  //                         </span>
  //                       </Link>
  //                     </div>

  //                     {/* Submit Button */}
  //                     <div className="mt-6">
  //                       <Button
  //                         type="submit"
  //                         text="ចូលគណនី"
  //                         isLoading={isLoading} // Show loading spinner when the form is submitting
  //                         className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
  //                       />
  //                     </div>
  //                     {/* OR Divider */}
  //                     <div className="flex items-center justify-center space-x-4 my-4">
  //                       <span className="w-1/2 border-b border-gray-300"></span>
  //                       <span className="text-sm text-gray-500">ឬ</span>
  //                       <span className="w-1/2 border-b border-gray-300"></span>
  //                     </div>
  //                     {/* Google Button */}
    //                     <div className="mt-4 text-center">
  //                       <Button
  //                         type="button"
  //                         text="ភ្ជាប់ជាមួយ Google"
  //                         onClick={handleGoogleLogin}
  //                         icon={
  //                           <Image
  //                             src="/assets/google.png"
  //                             width={24}
  //                             height={24}
  //                             alt="Google icon"
  //                           />
  //                         }
  //                         className=" w-full border-2 border-primary  text-textprimary "
  //                       />
  //                     </div>
  //                     {/* Don't have accoun? Register */}
  //                     <div className="mt-4 text-center text-textprimary ">
  //                       <span>
  //                         មិនទាន់មានគណនីមែនទេ?{" "}
  //                         <Link
  //                          href={`/${currentLocale}/register`}
  //                           // href="/register"
  //                           className="text-primary hover:underline hover:font-semibold pl-1.5"
  //                         >
  //                           បង្កើតគណនី
  //                         </Link>
  //                       </span>
  //                     </div>
  //                   </Form>
  //                 )}
  //               </Formik>
  //               <ToastContainer />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  <section
  className=" w-full h-screen md:p-20 lg:bg-[#F5F5F5]/60  lg:p-11"
  // style={{
  //   backgroundImage: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
  // }}
>
  <div className="h-full w-full bg-transparent bg-white m-auto  lg:mt-0 rounded-xl">
    {/* <div className="flex flex-row-reverse mx-4 flex-end right-0 top-0">
      <div className="flex flex-end w-1/2 justify-between items-center">

                <Link href="/">
                  <Image
                    src="/assets/logo.jpg"
                    width={1000}
                    height={1000}
                    alt="Logo Image"
                    className="h-16 w-16 ml-10"
                  />
                </Link>
                            <button
              className="text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => console.log("Close button clicked")}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div> */}
        <div className="lg:flex justify-between h-full">
          <div className="hidden lg:flex justify-center items-center lg:w-7/12 lg:pb-5 bg-primary/10 md:rounded-xl lg:rounded-none lg:rounded-l-xl">
           
           <div className="lg:block">
           <div className="md:hidden lg:block">
              <Image
                src="/auth/1.jpg"
                width={1000}
                height={1000}
                alt="Login Image"
                className="max-w-lg mx-auto "
              />
            </div>
            <div className="mx-auto text-center pt-12">
            <h1 className="text-3xl text-primary font-bold">
                {t("Login.left.title")}
              </h1>
              <p className="text-gray-400 md:pt-5 lg:pt-3  md:px-20 lg:px-14 text-lg max-w-2xl mx-auto ">
              {t("Login.left.description")}
              </p>
            </div>
           </div>
          </div>
          <div className="w-full  lg:w-1/2 flex mx-auto">
            <div className=" w-full  mx-auto">
            <div className="flex flex-row-reverse">
                <button
                  className="text-2xl text-gray-500 hover:text-gray-700 px-3 pt-3"
                  onClick={handleClose}
                  aria-label="Close login page"
                >
                  <IoCloseSharp />
                </button>
               
              </div>
              <div>
              
              {/* <Image src="/assets/logo-text.jpg" alt="logo" width={1000} height={1000} className="w-48 ml-20" /> */}
              </div>
             
             <div className=" w-full h-fit">
             <div className="lg:px-12 ">
                <div className="mt-12 md:mt-0 px-8 lg:mt-10 lg:px-12">
                  <h1 className="text-3xl font-bold text-primary"> {t("Login.form.title")}</h1>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log("Form Submitted:", values);
                      handleLogin(values);
                      setSubmitting(false); // Simulate a submission delay
                    }}
                  >
                    {() => (
                      <Form className="py-4 mt-4 ">
                        <div className="space-y-4 ">
                          {/* Email Field */}
                          <div>
                            <Label htmlFor="email" text={t("Login.form.fields.email.label")} required />
                            <DynamicField
                              type="text"
                              name="email"
                              id="email"
                              placeholder={t("Login.form.fields.email.placeholder")}
                            />
                            <ErrorDynamic name="email" component="div" />
                          </div>

                          {/* Password Field */}
                          <div>
                            <Label
                              htmlFor="password"
                              text={t("Login.form.fields.password.label")}
                              required
                            />
                            <PasswordField
                              name="password"
                              id="password"
                              placeholder={t("Login.form.fields.password.placeholder")}
                              className="custom-class mt-1"
                            />
                            <ErrorDynamic name="password" component="div" />
                          </div>
                        </div>
                                                {/* Forgot Password Link */}
                                                <div className="mt-2 text-right">
                          <Link 
                           href={`/${currentLocale}/forgot-password`}
                          // href="/forgot-password"
                          >
                            <span className="text-sm text-primary hover:underline hover:font-semibold ">
                              {t("Login.form.forgotpassword")}
                            </span>
                          </Link>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                          <Button
                            type="submit"
                            text={t("Login.form.buttons")}
                            isLoading={isLoading} // Show loading spinner when the form is submitting
                            className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                          />
                        </div>
                        {/* OR Divider */}
                        <div className="flex items-center justify-center space-x-4 my-4">
                          <span className="w-1/2 border-b border-gray-300"></span>
                          <span className="text-sm text-gray-500">{t("Login.form.fields.googleaccount.textOr")}</span>
                          <span className="w-1/2 border-b border-gray-300"></span>
                        </div>
                        {/* Google Button */}

                        <div className="mt-4 text-center">
                          <Button
                            type="button"
                            text={t("Login.form.fields.googleaccount.label")}
                            onClick={handleGoogleLogin}
                            icon={
                              <Image
                                src="/assets/google.png"
                                width={24}
                                height={24}
                                alt="Google icon"
                              />
                            }
                            className=" w-full border-2 border-primary  text-textprimary "
                          />
                        </div>
                        {/* Don't have accoun? Register */}
                        <div className="mt-4 text-center text-textprimary ">
                          <span>
                            {t("Login.form.text")}{" "}
                            <Link
                             href={`/${currentLocale}/register`}
                              // href="/register"
                              className="text-primary hover:underline hover:font-semibold pl-1.5"
                            >
                              {t("Login.form.signup")}
                            </Link>
                          </span>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <ToastContainer />
                </div>
              </div>
             </div>
            </div>
          </div>
        </div>
      </div>
     </section>
    
  );
};

export default LoginComponent;