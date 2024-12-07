'use client';
import React, { useState, useEffect } from "react";
import OTPValidation from "@//components/AuthComponents/OTPValidation";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./ButtonComponentForAuth";
import { useAppDispatch,useAppSelector } from '@//redux/hooks';
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'
import Link from 'next/link';
import { useVerifyCodeResetPasswordMutation } from "@//redux/service/auth";
import { useResendCodeResetPasswordMutation } from "@//redux/service/auth";
import { setResetCode } from "@//redux/feature/verify/verifySlice";

function OTPComponentReset() {
  const email = useAppSelector((state) => state.verify.email);
  const [otp, setOtp] = useState(""); // Store OTP
  const [resending, setResending] = useState(false); // Track resend state
  const [verifyCodeResetPassword] = useVerifyCodeResetPasswordMutation()
  const [resendCodeResetPassword] = useResendCodeResetPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log("Email from Redux: ", email)
  // Debugging: Check the email value from Redux
    useEffect(() => {
    console.log("Email from Redux:", email);
    if (!email) {
      toast.error("Email is missing. Redirecting to registration.");
      setTimeout(() => {
        router.push("/forgot-password");
      }, 3000); // Redirect after 3 seconds
    }
  }, [email, router]);


  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue); // Store OTP when fully entered
    console.log("OTP Entered:", otpValue);
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is missing. Redirecting to registration.");
      router.push("/forgot-password");
      return;
    }
  
    console.log("Payload sent to API:", { email, reset_code: otp });
  
    setIsLoading(true);
    try {
      console.log("Payload sent to API:", { email, reset_code: otp });
      const response = await verifyCodeResetPassword({ email, reset_code: otp }).unwrap();
      console.log("API Response:", response);
       // Assuming the API sends the reset_code in the response payload
       dispatch(setResetCode(otp));
      toast.success("OTP Verified Successfully!");
      console.log("Verification Response:", response);
      setTimeout(() => {
        router.push("/reset-password"); // Redirect to login page
      }, 3000);
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email is missing. Redirecting to registration.");
      router.push("/forgot-password");
      return;
    }
    console.log("Resend Code Request:", { email });
    setResending(true); // Set resend state to true
    try {
      const response = await resendCodeResetPassword({ email }).unwrap();
      // Dispatch the OTP (entered by user) as the reset_code
      dispatch(setResetCode(otp));
      toast.success("Verification code resent successfully!");
      console.log("Resend Code Response:", response);
    } catch (error) {
      console.error("Resend Code Error:", error);
      toast.error("Failed to resend verification code. Please try again.");
    } finally {
      setResending(false); // Stop loading
    }
  };

  

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className=" m-auto border-1 border border-slate-100 rounded-xl py-7">
        <div className="px-6 sm:px-8 md:px-6 xl:px-10">
        <div className=" flex justify-between items-center">
             <Link href="/">
             <Image
                      src="/assets/logo-test.png"
                      width={24} height={24}
                        alt="Logo Image"
                      />
             </Link>
                <div className="">
                <button
                    className="text-2xl text-gray-500 hover:text-gray-700"
                    onClick={() => console.log('Close button clicked')}
                >
                    <IoCloseSharp />
                </button>
                </div>
          </div>
          <div className="h-fit w-fit pt-9 pb-5">
            <h1 className="text-4xl font-bold text-primary">Verify Code </h1>
            <p className="pt-4 text-slate-500">We sent code for verify!</p>
            <div className="mt-6">
              <OTPValidation length={6} onComplete={handleOTPComplete} />
              <div className="text-right mt-3">
                <button
                  className={`text-sm text-primary hover:underline ${
                    resending ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={handleResendCode}
                  disabled={resending}
                >
                  {resending ? "Resending..." : "Resend Code"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                text="Verify"
                onClick={handleSubmit}
                isLoading={isLoading}
                className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                // disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default OTPComponentReset;


