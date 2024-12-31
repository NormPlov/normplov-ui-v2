"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
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
type ValueTypes = {
  email: string;
  password: string;
};

const initialValues: ValueTypes = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ")
    .required("អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក"),
  password: Yup.string()
    .min(8, "ពាក្យសម្ងាត់របស់អ្នកខ្លីពេក, សូមបញ្ជូលពាក្យសម្ងាត់ 8 តួរ")
    .required("អ្នកត្រូវបញ្ជូលពាក្យសម្ងាត់របស់អ្នក"),
});

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectToken);
  const router = useRouter();
  console.log("Access token: from Redux store", accessToken);

  const handleClose = () => {
    router.push("/"); // Redirect to the referrer
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
        router.push("/");
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
    <section
      className=" w-full h-screen  bg-primary/20  p-12"
      // style={{
      //   backgroundImage: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
      // }}
    >
      <div className="h-full max-w-full bg-transparent bg-white m-auto rounded-xl">
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
        <div className="flex justify-between -mt-0 p-0 b">
          <div className=" h-full w-7/12 pb-5 bg-primary/80 rounded-l-xl">
            <div className="text-center pt-6">
              <h1 className="text-4xl text-white font-bold pb-4">
                សូមស្វាគមន៍មកកាន់គេហទំព័រនាំផ្លូវ
              </h1>
              <p className="text-white px-14 text-lg">
                រកឃើញសក្តានុពលរបស់អ្នក និងស្វែងរកជំនាញឯកទេស
                នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត ចំណុចខ្លាំង
                និងគោលដៅអាជីពនាពេលអនាគតរបស់អ្នក។
              </p>
            </div>
            <div className="">
              <Image
                src="/auth/loginPerson.png"
                width={1000}
                height={1000}
                alt="Login Image"
                className="w-96 mx-auto mt-2"
              />
            </div>
          </div>
          <div className="   w-1/2 flex mx-auto">
            <div className=" w-full  mx-auto">
            <div className="flex flex-row-reverse ">
                  <button
                    className="text-2xl text-gray-500 hover:text-gray-700 px-3 pt-3"
                       onClick={handleClose}
                      aria-label="Close login page"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              <div className="px-12">
                

                <div className="mt-3 px-12">
                  <h1 className="text-4xl font-bold text-primary">ចូលគណនី</h1>
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
                            <Label htmlFor="email" text="អ៉ីម៉ែល" required />
                            <DynamicField
                              type="text"
                              name="email"
                              id="email"
                              placeholder="បញ្ចូលអ៉ីម៉ែលរបស់អ្នក"
                            />
                            <ErrorDynamic name="email" component="div" />
                          </div>

                          {/* Password Field */}
                          <div>
                            <Label
                              htmlFor="password"
                              text="ពាក្យសម្ងាត់"
                              required
                            />
                            <PasswordField
                              name="password"
                              id="password"
                              placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                              className="custom-class mt-1"
                            />
                            <ErrorDynamic name="password" component="div" />
                          </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="mt-2 text-right">
                          <Link href="/forgot-password">
                            <span className="text-sm text-primary hover:underline hover:font-semibold ">
                              ភេ្លចលេខសម្ងាត់?
                            </span>
                          </Link>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                          <Button
                            type="submit"
                            text="ចូលគណនី"
                            isLoading={isLoading} // Show loading spinner when the form is submitting
                            className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                          />
                        </div>
                        {/* OR Divider */}
                        <div className="flex items-center justify-center space-x-4 my-4">
                          <span className="w-1/2 border-b border-gray-300"></span>
                          <span className="text-sm text-gray-500">ឬ</span>
                          <span className="w-1/2 border-b border-gray-300"></span>
                        </div>
                        {/* Google Button */}
                        <div className="mt-4 text-center">
                          <Button
                            type="button"
                            text="ភ្ជាប់ជាមួយ Google"
                            onClick={() => signIn("google")}
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
                            មិនទាន់មានគណនីមែនទេ?{" "}
                            <Link
                              href="/register"
                              className="text-primary hover:underline hover:font-semibold pl-1.5"
                            >
                              បង្កើតគណនី
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
    </section>
    // <section className="w-full h-full flex justify-between items-center ">
    //   <div className="h-auto bg-primary max-w-5xl hidden lg:block">
    //               <div className="w-full h-auto bg-primary text-center px-28 mt-7 ">
    //               <h1 className="text-4xl font-bold text-white">សូមស្វាគមន៍មកកាន់គេហទំព័រនាំផ្លូវ</h1>
    //               <p className="text-lg font-normal pt-3 text-white">រកឃើញសក្តានុពលរបស់អ្នក និងស្វែងរកជំនាញឯកទេស នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត ចំណុចខ្លាំង និងគោលដៅអាជីពនាពេលអនាគតរបស់អ្នក។</p>
    //               </div>
    //               <div className="h-3/4 mt-4 ml-14">
    //                 <div className="h-full">
    //                 <Image
    //                       src="/auth/login.png"
    //                       width={680}
    //                       height={680}
    //                       alt="Login Image"
    //                       className=""
    //                   />
    //                 </div>
    //               </div>
    //   </div>
    //     <div className='bg-red-100 w-full '>
    //     <div className="max-w-md mr-0">
    //       <div className=" flex justify-between flex-end items-center">
    //          <Link href="/">
    //          <Image
    //                   src="/assets/logo.jpg"
    //                   width={200} height={200}
    //                     alt="Logo Image"
    //                     className="w-[70px] h-[70px"
    //                   />
    //          </Link>
    //             <div className="">
    //             <button
    //                 className="text-2xl text-gray-500 hover:text-gray-700"
    //                 onClick={() => console.log('Close button clicked')}
    //             >
    //                 <IoCloseSharp />
    //             </button>
    //             </div>
    //       </div>

    //     <div className="mt-20">
    //       <h1 className="text-4xl font-bold text-primary">ចូលគណនី</h1>
    //       <Formik
    //         initialValues={initialValues}
    //         validationSchema={validationSchema}
    //         onSubmit={(values, { setSubmitting }) => {
    //           console.log('Form Submitted:', values);
    //           handleLogin(values);
    //           setSubmitting(false); // Simulate a submission delay
    //         }}
    //       >
    //         {() => (
    //           <Form>
    //             <div className="space-y-4 mt-5">
    //               {/* Email Field */}
    //               <div>
    //                 <Label htmlFor="email" text="អ៉ីម៉ែល" required />
    //                 <DynamicField
    //                   type="text"
    //                   name="email"
    //                   id="email"
    //                   placeholder="បញ្ចូលអ៉ីម៉ែលរបស់អ្នក"
    //                 />
    //                 <ErrorDynamic name="email" component="div" />
    //               </div>

    //               {/* Password Field */}
    //               <div>
    //                 <Label htmlFor="password" text="ពាក្យសម្ងាត់" required />
    //                 <PasswordField
    //                   name="password"
    //                   id="password"
    //                   placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
    //                   className="custom-class mt-1"
    //                 />
    //                 <ErrorDynamic name="password" component="div" />
    //               </div>
    //             </div>

    //             {/* Forgot Password Link */}
    //             <div className="mt-2 text-right">
    //               <Link href="/forgot-password">
    //                 <span className="text-sm text-primary hover:underline hover:font-semibold ">
    //                 ភេ្លចលេខសម្ងាត់?
    //                 </span>
    //               </Link>
    //             </div>

    //             {/* Submit Button */}
    //             <div className="mt-6">
    //               <Button
    //                 type="submit"
    //                 text="ចូលគណនី"
    //                 isLoading={isLoading} // Show loading spinner when the form is submitting
    //                 className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
    //               />
    //             </div>
    //             {/* OR Divider */}
    //             <div className="flex items-center justify-center space-x-4 my-4">
    //                 <span className="w-1/2 border-b border-gray-300"></span>
    //                 <span className="text-sm text-gray-500">ឬ</span>
    //                 <span className="w-1/2 border-b border-gray-300"></span>
    //             </div>
    //              {/* Google Button */}
    //             <div className="mt-4 text-center">
    //                 <Button

    //                 type="button"
    //                 text="ភ្ជាប់ជាមួយ Google"
    //                 onClick={() => signIn('google')}
    //                 icon={
    //                 <Image
    //                src="/assets/google.png"
    //                width={24} height={24}
    //                 alt="Google icon"
    //               />
    //                 }
    //                 className=" w-full border-2 border-primary  text-textprimary "
    //                 />
    //             </div>
    //             {/* Don't have accoun? Register */}
    //             <div className='mt-4 text-center text-textprimary '>
    //                 <span>មិនទាន់មានគណនីមែនទេ? <Link href="/register" className='text-primary hover:underline hover:font-semibold pl-1.5'>បង្កើតគណនី</Link></span>
    //             </div>
    //           </Form>

    //         )}

    //       </Formik>
    //       <ToastContainer />
    //     </div>
    //   </div>
    //     </div>

    // </section>
  );
};

export default LoginComponent;
