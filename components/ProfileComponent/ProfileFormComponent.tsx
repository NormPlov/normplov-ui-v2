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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProfileFormValues = {
  username: string;
  date_of_birth: Date | null;
  gender: string | null;
  bio: string | null;
  phone_number: string | null;
  address: string | null;
};

const ProfileForm = () => {
  const { data: user, error, isLoading } = useGetUserQuery();
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false); // State for modal visibility
  const [updateProfileUser, { isLoading: isUpdating }] =
    useUpdateProfileUserMutation();
  console.log("data user data :",user?.payload.gender)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data.</div>;
  }
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

      // Show success message
      toast.success(response.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);

      if (err && typeof err === "object" && "data" in err) {
        const errorDetails = err as { data: { detail: Array<{ msg: string }> } }; // specify error type
        errorDetails.data.detail.forEach((item) => {
          toast.error(item.msg || "Validation error occurred.");
        });
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
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
                <Label htmlFor="username" text="ឈ្មោះ" />
                <FieldProfile
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your name"
                />
              </div>

                            {/* Password */}
              <div className="flex w-full justify-between gap-5">
                <div className="w-4/5">
                   <Label htmlFor="password" text="ពាក្យសម្ងាត់" />
                   <PasswordFieldUser
                    name="password"
                    id="password"
                    onClick={toggleChangePasswordModal}
                    placeholder="••••••••"
                    className="custom-class mt-1"
                    readOnly={true} // Make the field read-only
                  />
                </div>
                <div className="w-1/5">
                  <Button
                    type="button"
                    text="ផ្លាស់ប្តូរ"
                    onClick={toggleChangePasswordModal} // Trigger the modal on click
                    className="w-full mt-7 bg-primary hover:bg-primary text-white font-medium border-collapse"
                  />
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="block md:flex w-full justify-between gap-5">
                <div className="w-full md:w-1/2 pb-5 md:pb-0">
                  <Label htmlFor="date_of_birth" text="ថ្ងៃ ខែ ឆ្នាំ កំណើត" />
                  <DatePickerDemo
                    selectedDate={values.date_of_birth?.toISOString() || null}
                    onDateChange={(date) =>
                      setFieldValue("date_of_birth", date)
                    }
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label htmlFor="gender" text="ភេទ" />
                  <SelectDemo
                    
                    selectedGender={values.gender}
                    onGenderChange={(gender) => setFieldValue("gender", gender)}
                  />
                </div>
              </div>
              <div className="block md:flex justify-between w-full gap-5">
                {/* Phone Number */}
                <div className="w-full md:w-1/2">
                  <Label htmlFor="phone_number" text="លេខទូរស័ព្ទ" />
                  <FieldProfile
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="បញ្ជូលលេខទូរស័ព្ទរបស់អ្នក"
                  />
                </div>
                {/* Address */}
                <div className="w-full md:w-1/2">
                  <Label htmlFor="address" text="អាសយដ្ឋាន" />
                  <FieldProfile
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              {/* Bio */}
              <div>
                <Label htmlFor="bio" text="អំពីអ្នក" />
                <FieldProfile
                  type="textarea"
                  name="bio"
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 w-32">
              <Button
                type="submit"
                text={isUpdating ? "Updating..." : "កែប្រូហ្វាល"}
                disabled={isUpdating}
                className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
              />
            </div>
          </Form>
        )}
      </Formik>

            {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-1 border border-slate-200 rounded-xl px-8 w-2/5 relative">
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
