'use client';
import React, { useState, useEffect } from "react";
import OTPValidation from "@//components/AuthComponents/OTPValidation";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./ButtonComponentForAuth";
import { useVerifyCodeRegisterMutation, useResendVerifyCodeRegisterMutation } from "@//redux/service/auth";
import { useAppSelector } from "@//redux/hooks";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import Link from 'next/link';

function OTPComponent() {
  const email = useAppSelector((state) => state.verify.email);
  const [otp, setOtp] = useState(""); // Store OTP
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false); // Track resend state
  const [timer, setTimer] = useState(90); // Countdown timer
  const [verifyCodeRegister] = useVerifyCodeRegisterMutation(); // Use the mutation hook
  const [resendCode] = useResendVerifyCodeRegisterMutation(); // Mutation hook for resending code
  const router = useRouter();

  // Start countdown timer
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  // Redirect if email is missing
  useEffect(() => {
    console.log("Email from Redux:", email);
    if (!email) {
      toast.error("Email is missing. Redirecting to registration.");
      setTimeout(() => {
        router.push("/register");
      }, 3000);
    }
  }, [email, router]);

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue); // Store OTP when fully entered
    console.log("OTP Entered:", otpValue);
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is missing. Redirecting to registration.");
      router.push("/register");
      return;
    }

    console.log("Payload sent to API:", { email, verification_code: otp });

    setIsLoading(true);
    try {
      const response = await verifyCodeRegister({ email, verification_code: otp }).unwrap();
      toast.success("OTP Verified Successfully!");
      console.log("Verification Response:", response);
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
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
      router.push("/register");
      return;
    }
    console.log("Resend Code Request:", { email });
    setResending(true); // Set resend state to true
    try {
      const response = await resendCode({ email }).unwrap();
      toast.success("Verification code resent successfully!");
      console.log("Resend Code Response:", response);
      setTimer(60); // Reset the timer
    } catch (error) {
      console.error("Resend Code Error:", error);
      toast.error("Failed to resend verification code. Please try again.");
    } finally {
      setResending(false); // Stop loading
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="m-auto border-1 border border-slate-100 rounded-xl py-7">
        <div className="px-6 sm:px-8 md:px-6 xl:px-10">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src="/assets/logo-test.png" width={24} height={24} alt="Logo Image" />
            </Link>
            <button
              className="text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => console.log('Close button clicked')}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="h-fit w-fit pt-9 pb-5">
            <h1 className="text-4xl font-bold text-primary">ផ្ទៀងផ្ទាត់លេខកូដសម្ងាត់</h1>
            <p className="pt-4 text-slate-500">
            យើងបានផ្ញើលេខកូដ 6 ខ្ទង់ទៅកាន់អ៊ីមែលរបស់អ្នក។​ អ្នកមានពេល <span className="font-bold text-primary">{` ${timer}s`}</span> វិនាទី
             
            </p>
            <div className="mt-6">
              <OTPValidation length={6} onComplete={handleOTPComplete} />
              <div className="text-right mt-3 ">
             
               <button
                  className="text-sm text-primary hover:underline font-bold"
                  onClick={handleResendCode}
                  disabled={resending}
                >
                  {resending ? "កំពុងផ្ញើរលេខសម្ងាត់ទៅអ្នក..." : "ផ្ញើរលេខកូដសម្ងាត់ម្តងទៀត"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                text="ផ្ទៀងផ្ទាត់"
                onClick={handleSubmit}
                isLoading={isLoading}
                className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default OTPComponent;


