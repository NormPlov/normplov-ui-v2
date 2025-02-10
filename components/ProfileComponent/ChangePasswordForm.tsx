'use client';
import React, { useState,useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Label from "../AuthComponents/LabelComponent";
import ErrorDynamic from "../AuthComponents/ErrorComponent";
import PasswordField from "../AuthComponents/PasswordField";
import Button from "../AuthComponents/ButtonComponentForAuth"; // Adjust the import path as needed
import { useChangePasswordMutation } from "@/redux/service/user";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl"; // Import the translation hook
import Link from "next/link";
import { toast } from '@/hooks/use-toast';

type ValueTypes = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const initialValues: ValueTypes = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*]).{8,}$");
const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("ពាក្យសម្ងាត់សម្ងាត់ចាស់ត្រូវតែបញ្ជូល"),
  new_password: Yup.string()
    .min(8, "ពាក្យសម្ងាត់ថ្មីគឺខ្លីពេក, សូមបញ្ជូលអោយបាន 8 តួរ")
    .matches(
      strongPasswordRegex,
      "ពាក្យសម្ងាត់របស់អ្នកត្រូវតែមានអក្សរធំ អក្សរតូច និង​និមិត្តសញ្ញាពិសេស"
    )
    .required("ពាក្យសម្ងាត់ថ្មីត្រូវតែបញ្ជូល"),
  confirm_new_password: Yup.string()
    .oneOf(
      [Yup.ref("new_password")],
      "ពាក្យសម្ងាត់ថ្មីត្រូវតែដូចជាមួយការបញ្ជាក់ពាក្យសម្ងាត់"
    )
    .required("អ្នកត្រូវបញ្ជូលបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"),
});

type ChangePasswordFormProps = {
  onClose: () => void; // Function to close the modal
};

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
  const [currentLocale, setCurrentLocale] = useState<string>('km');
  const [isLoading, setIsLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();
    const t = useTranslations(); // Specify the translation namespace
  const handleChangePassword = async (values: ValueTypes) => {
    setIsLoading(true);
    try {
      const { old_password, new_password, confirm_new_password } = values;
      // Call the reset password API
      const response = await changePassword({
        old_password,
        new_password,
        confirm_new_password,
      }).unwrap();
      // toast.success(response.message || "Change Password successfully!");
      toast({
        title: (response.message || "Change Password successfully!"),
        description: "Your new password has been changed.",
        variant: "success",
        duration: 4000,
      })
      console.log("Change Password Response:", response);
      // Optionally close the modal on success
      onClose();
    } catch (error) {
      console.error("Reset Password Error:", error);

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        "data" in error
      ) {
        const typedError = error as {
          status: number;
          data: { detail?: string; message?: string };
        };
        toast({
          title: (typedError.data?.detail || "Failed to reset password. Please try again."),
          description: "Your action failed !",
          variant: "error",
          duration: 4000,
        })
        // toast.error(
        //   typedError.data?.detail || "Failed to reset password. Please try again."
        // );
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Failed to change your password. Please try again.",
          variant: "error",
          duration: 3000,
        })
        // toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
 useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);
  return (
    <section className="w-full h-auto flex justify-center items-center ">
      <div className="m-auto w-full">
        <div className="">
          <div className="">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary pb-3">{t("ProfileAboutUser.ChangePassword.heading")}</h1>
           <div className="">
           <p className="text-md md:text-xl text-gray-500">ប្រសិនបើអ្នកមិនចាំពាក្យសម្ងាត់ចាស់អ្នកអាចធ្វើការផ្លាស់ប្តូរពាក្យសម្ងាត់ថ្មីបាន   <Link 
                  href={`/${currentLocale}/forgot-password`}
                            // href="/forgot-password"
                            >
                              <span className="text-md md:text-xl text-primary hover:underline hover:font-semibold ">
                                ភេ្លចលេខសម្ងាត់?
                              </span>
              </Link></p>
          
           </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleChangePassword(values);
                setSubmitting(false); // Simulate a submission delay
              }}
            >
              {() => (
                <Form>
                  <div className="space-y-6 mt-8">
                    {/* Old Password */}
                    <div>
                      <Label htmlFor="old_password" text={t("ProfileAboutUser.ChangePassword.form.fields.old_password.label")} required />
                      <PasswordField
                        name="old_password"
                        id="old_password"
                        placeholder={t("ProfileAboutUser.ChangePassword.form.fields.old_password.placeholder")}
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="old_password" component="div" />
                    </div>
                    {/* New Password */}
                    <div>
                      <Label htmlFor="new_password" text={t("ProfileAboutUser.ChangePassword.form.fields.new_password.label")} required />
                      <PasswordField
                        name="new_password"
                        id="new_password"
                        placeholder={t("ProfileAboutUser.ChangePassword.form.fields.new_password.placeholder")}
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="new_password" component="div" />
                    </div>
                    {/* Confirm Password */}
                    <div>
                      <Label
                        htmlFor="confirm_new_password"
                        text={t("ProfileAboutUser.ChangePassword.form.fields.confirm_new_password.label")}
                        required
                      />
                      <PasswordField
                        name="confirm_new_password"
                        id="confirm_new_password"
                        placeholder={t("ProfileAboutUser.ChangePassword.form.fields.confirm_new_password.placeholder")}
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="confirm_new_password" component="div" />
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 pt-4 w-full">
                    <div className="">
                      <Button
                        type="submit"
                        text={t("ProfileAboutUser.ChangePassword.form.buttons.submit.text")}
                        isLoading={isLoading}
                        className="w-32 md:w-52 bg-primary hover:bg-primary text-white font-medium border-collapse"
                      />
                    </div>
                    <div className="">
                      <Button
                        type="button" // Ensure it doesn't submit the form
                        text={t("ProfileAboutUser.ChangePassword.form.buttons.cancel.text")}
                        onClick={onClose} // Call the onClose function to close the modal
                        className="w-32 md:w-52  bg-gray-200 border-1 border-gray-600  text-gray-600 font-medium"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {/* <ToastContainer /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordForm;
