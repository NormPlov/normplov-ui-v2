'use client';
import React, { useState } from "react";
import { useAppDispatch } from '@/redux/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { IoCloseSharp } from 'react-icons/io5';
import Label from './LabelComponent';
import DynamicField from './AuthField';
import ErrorDynamic from './ErrorComponent';
import PasswordField from './PasswordField';
import Link from 'next/link';
import Button from './ButtonComponentForAuth';
import { useRegisterMutation } from '@/redux/service/auth';
import { setEmail } from "@/redux/feature/verify/verifySlice";
import { useRouter } from "next/navigation";
import Image from 'next/image';

type ValueTypes = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms: boolean; // New field for terms and conditions
};

const initialValues: ValueTypes = {
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  terms: false,
};

const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*]).{8,}$");
const validationSchema = Yup.object().shape({
  username: Yup.string().max(60, "Name is too long").required("Name is required"),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, "Password is too short, at least 8 characters")
    .matches(strongPasswordRegex, "Password must contain at least one uppercase letter, one lowercase letter, and one special character")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"), // Validation for terms
});

const RegisterComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (values: ValueTypes) => {
    setIsLoading(true);
    try {
      const { username, email, password, confirm_password } = values;
      const response = await register({ data: { username, email, password, confirm_password } }).unwrap();
      console.log("Registration Response:", response);

      // Dispatch email to Redux and show a success message
      dispatch(setEmail(email));
      toast.success(response.message || "Registered Successfully!", { autoClose: 2000 });

      // Redirect to OTP verification page
      setTimeout(() => {
        router.push("/verify-code-register");
      });
    } catch (error: unknown) {
      console.error("Error during registration:", error);

      // Handle API errors
      if (error && typeof error === 'object' && 'status' in error && 'data' in error) {
        const typedError = error as { status: number; data: { detail?: string; message?: string } };
        if (typedError.status === 400 && typedError.data.detail === "Email already registered.") {
          toast.error("This email is already registered. Please use a different email or login.");
        } else if (typedError.data?.message) {
          toast.error(typedError.data.message);
        } else {
          toast.error("An error occurred during registration. Please try again.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-[90%] h-[97%] sm:w-[75%] sm:h-[97%] md:w-[95%] md:h-[98%] xl:w-[85%] xl:h-[98%] m-auto">
        <div className="px-6 sm:px-8 md:px-6 xl:px-10">
          <div className="flex justify-between items-center mt-3">
            <Link href="/">
              <Image src="/assets/logo-test.png" width={24} height={24} alt="Logo Image" />
            </Link>
            <div>
              <button
                className="text-2xl text-gray-500 hover:text-gray-700"
                onClick={() => console.log('Close button clicked')}
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
          <div className="h-fit mt-10 md:mt-11 xl:mt-8">
            <h1 className="text-4xl font-bold text-primary">Register</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (!values.terms) {
                  toast.error("You must accept the terms and conditions");
                  setSubmitting(false);
                  return;
                }
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="space-y-4 mt-3">
                    <div>
                      <Label htmlFor="username" text="Name" required />
                      <DynamicField
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Input Your Username"
                      />
                      <ErrorDynamic name="username" component="div" />
                    </div>
                    <div>
                      <Label htmlFor="email" text="Email" required />
                      <DynamicField
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Input Your Email"
                      />
                      <ErrorDynamic name="email" component="div" />
                    </div>
                    <div>
                      <Label htmlFor="password" text="Password" required />
                      <PasswordField
                        name="password"
                        id="password"
                        placeholder="Input Your Password"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="password" component="div" />
                    </div>
                    <div>
                      <Label htmlFor="confirm_password" text="Confirm Password" required />
                      <PasswordField
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Input Your Confirm Password"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="confirm_password" component="div" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Field type="checkbox" id="terms" name="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-textprimary"
                    >
                      Accept terms and conditions
                    </label>
                    {errors.terms && touched.terms && (
                      <div className="text-red-500 text-sm ">{errors.terms}</div>
                    )}
                  </div>
                  <div className="mt-6">
                    <Button
                      type="submit"
                      text="Register"
                      isLoading={isLoading}
                      className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                    />
                  </div>
                  
                             {/* OR Divider */}
                             <div className="flex items-center justify-center space-x-4 my-4">
                                 <span className="w-1/2 border-b border-gray-300"></span>
                                 <span className="text-sm text-gray-500">OR</span>
                                 <span className="w-1/2 border-b border-gray-300"></span>
                            </div>
                            {/* Google Button */}
                            <div className="mt-4">
                                 <Button
                                    type="button"
                                    text="Continue with Google"  
                                    onClick={() => console.log('Continue with Google clicked')}
                                    icon={
                                        <Image
                                        src="/assets/google.png"
                                        width={24} height={24}
                                         alt="Google icon"
                                       />
                                    }
                                    className="w-full border-2 border-primary  text-textprimary"
                                />
                            </div>
                             {/* Don't have accoun? Register */}
                             <div className='mt-4 text-center text-textprimary '>
                                 <span>Already have account?<Link href="/login" className='text-primary hover:underline hover:font-semibold pl-1.5'>Login</Link></span>
                             </div>
                </Form>
              )}
            </Formik>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterComponent;
