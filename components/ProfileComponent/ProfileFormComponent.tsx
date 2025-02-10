"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import FieldProfile from "./FieldProfile";
import Button from "../AuthComponents/ButtonComponentForAuth";
import { DatePickerDemo } from "@/components/ProfileComponent/DateField";
import { SelectDemo } from "@/components/ProfileComponent/SelectField";
import Label from "../AuthComponents/LabelComponent";
import PasswordFieldUser from "./PasswordFieldUser";
import ChangePasswordForm from "./ChangePasswordForm"; // Import the ChangePasswordForm component
import {
  useGetUserQuery,
  useUpdateProfileUserMutation,
} from "@/redux/service/user";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import ProfileFormSkeleton from "../SkeletonLoading/ProfileComponent/ProfileFormSkeleton";
import { useTranslations } from "next-intl";
import { toast } from '@/hooks/use-toast';
type ProfileFormValues = {
  username: string;
  date_of_birth: Date | null;
  gender: string | null;
  bio: string | null;
  phone_number: string | null;
  address: string | null;
};

const ProfileForm = () => {
  const { data: user, isLoading } = useGetUserQuery();
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false); // State for modal visibility
  const [updateProfileUser, { isLoading: isUpdating }] =
    useUpdateProfileUserMutation();
    // const [isEditing, setIsEditing] = useState(false);  // Control form edit mode
     const t = useTranslations();
  console.log("data user data :",user?.payload.gender)
  if (isLoading) {
    return <div>
      <ProfileFormSkeleton/>
    </div>
  }

  // if (error) {
  //   return <div>Error fetching user data.</div>;
  // }
    const toggleChangePasswordModal = () => {
    setChangePasswordModalOpen(!isChangePasswordModalOpen);
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      // Prepare the payload
      const payload = {
        username: values.username || "",
        address: values.address || "",
        phone_number: values.phone_number || "",
        bio: values.bio || "",
        gender: values.gender || "",
        date_of_birth: values.date_of_birth
          ? values.date_of_birth.toISOString().split("T")[0] // Convert to 'YYYY-MM-DD'
          : null,
      };
        console.log("gender",payload.gender)
      // Call the update mutation
      const response = await updateProfileUser({
        uuid: user?.payload.uuid || "",
        user: payload,
      }).unwrap();
      toast({
        title: response.message || "Profile updated successfully!",
        description: "Your profile has been updated.",
        variant: "success",
        duration: 3000,
      })

      // Show success message
      // toast.success(response.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);

      if (err && typeof err === "object" && "data" in err) {
        const errorDetails = err as { data: { detail: Array<{ msg: string }> } }; // specify error type
        errorDetails.data.detail.forEach((item) => {
          toast({
            title: (item.msg || "Validation error occurred."),
            description: "Validation error occurred.",
            variant: "error",
            duration: 4000,
          })
          // toast.error(item.msg || "Validation error occurred.");
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Failed to save profile.",
          variant: "error",
          duration: 4000,
        })
        // toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
    <h1 className="text-primary hidden lg:block pt-5 lg:pt-0 lg:pb-3 text-2xl font-bold">{t("ProfileAboutUser.title")}</h1>
      <Formik
        initialValues={{
          username: user?.payload.username || "",
          phone_number: user?.payload.phone_number || "",
          address: user?.payload.address || "",
          date_of_birth: user?.payload.date_of_birth
            ? new Date(user.payload.date_of_birth)
            : null,
            gender: user?.payload.gender
            ? user.payload.gender.charAt(0).toUpperCase() + user.payload.gender.slice(1).toLowerCase()
            : "", 
          bio: user?.payload.bio || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6 rounded-md mt-6 lg:mt-0">
            <div className="w-full space-y-8">
              {/* Username */}
              <div>
                <Label htmlFor="username" text={t("ProfileAboutUser.form.fields.username.label")} />
                <FieldProfile
                  type="text"
                  name="username"
                  id="username"
                  placeholder={t("ProfileAboutUser.form.fields.username.placeholder")}
                />
              </div>

                            {/* Password */}
              <div className="flex w-full justify-between gap-4 sm:gap-5">
                <div className="w-full sm:w-4/5">
                   <Label htmlFor="password" text={t("ProfileAboutUser.form.fields.password.label")} />
                   <PasswordFieldUser
                    name="password"
                    id="password"
                    onClick={toggleChangePasswordModal}
                    placeholder="••••••••"
                    className="custom-class mt-1"
                    readOnly={true} // Make the field read-only
                  />
                </div>
                <div className="w-2/5 md:w-1/5">
                  <Button
                    type="button"
                    text={t("ProfileAboutUser.form.fields.password.button")}
                    onClick={toggleChangePasswordModal} // Trigger the modal on click
                    className="w-full mt-7 bg-primary hover:bg-primary text-white font-medium border-collapse"
                  />
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="block md:flex w-full justify-between gap-5">
                <div className="w-full md:w-1/2 pb-5 md:pb-0">
                  <Label htmlFor="date_of_birth" text={t("ProfileAboutUser.form.fields.date_of_birth.label")} />
                  <DatePickerDemo
                    selectedDate={values.date_of_birth?.toISOString() || null}
                    onDateChange={(date) =>
                      setFieldValue("date_of_birth", date)
                    }
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label htmlFor="gender" text={t("ProfileAboutUser.form.fields.gender.label")} />
                  <SelectDemo
                    
                    selectedGender={values.gender}
                    onGenderChange={(gender) => setFieldValue("gender", gender)}
                  />
                </div>
              </div>
              <div className="block md:flex justify-between w-full gap-5">
                {/* Phone Number */}
                <div className="w-full md:w-1/2 pb-5 md:pb-0">
                  <Label htmlFor="phone_number"  text={t("ProfileAboutUser.form.fields.phone_number.label")} />
                  <FieldProfile
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder={t("ProfileAboutUser.form.fields.phone_number.placeholder")}
                  />
                </div>
                {/* Address */}
                <div className="w-full md:w-1/2">
                  <Label htmlFor="address" text={t("ProfileAboutUser.form.fields.address.label")} />
                  <FieldProfile
                    type="text"
                    name="address"
                    id="address"
                    placeholder={t("ProfileAboutUser.form.fields.address.placeholder")}
                  />
                </div>
              </div>
              {/* Bio */}
              <div>
                <Label htmlFor="bio"  text={t("ProfileAboutUser.form.fields.bio.label")} />
                <FieldProfile
                  type="textarea"
                  name="bio"
                  id="bio"
                  placeholder={t("ProfileAboutUser.form.fields.bio.placeholder")}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 w-36">
              <Button
                type="submit"
                text={isUpdating ? t("ProfileAboutUser.form.buttons.submit.loading") :  t("ProfileAboutUser.form.buttons.submit.default")}
                disabled={isUpdating}
                className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
              />
            </div>
          </Form>
        )}
      </Formik>

            {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 p-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-1 border border-slate-200 rounded-2xl p-7 w-full sm:w-2/3 md:w-2/3  lg:w-1/3 relative">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={toggleChangePasswordModal}
            >
              {/* <IoCloseSharp size={24} /> */}
            </button>
            <ChangePasswordForm onClose={toggleChangePasswordModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
