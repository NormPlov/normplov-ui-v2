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
      const [isEditing, setIsEditing] = useState(false);
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
    const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
    const toggleChangePasswordModal = () => {
    setChangePasswordModalOpen(!isChangePasswordModalOpen);
  };

  const handleSubmit = async (values: ProfileFormValues) => {
        if (!isEditing) return;
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
      <div className="relative p-4">
      {/* Edit Button at the Top Right */}
      <div className="absolute top-0 right-0 mr-4 mt-6 md:mt-6 lg:mt-0">
        <Button
          type="button"
          text={
            isEditing
              ? t("ProfileAboutUser.form.buttons.submit.default")
              : t("ProfileAboutUser.form.buttons.submit.default")
          }
          onClick={toggleEditMode}
          className="bg-primary hover:bg-green-800 text-white"
        />
      </div>

      {/* Form Title */}
      <h1 className="text-primary absolute hidden lg:block text-center pt-5 mr-12 lg:pt-0 lg:pb-3 text-2xl font-bold">
        {t("ProfileAboutUser.title")}
      </h1>

      <Formik
        initialValues={{
          username: user?.payload.username || "",
          phone_number: user?.payload.phone_number || "",
          address: user?.payload.address || "",
          date_of_birth: user?.payload.date_of_birth
            ? new Date(user.payload.date_of_birth)
            : null,
          gender: user?.payload.gender
            ? user.payload.gender.charAt(0).toUpperCase() +
              user.payload.gender.slice(1).toLowerCase()
            : "",
          bio: user?.payload.bio || "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6 rounded-md  mt-16 lg:mt-12">
            <div className="w-full space-y-8">
              {/* Username */}
              <div>
                <Label
                  htmlFor="username"
                  text={t("ProfileAboutUser.form.fields.username.label")}
                />
                <FieldProfile
                  type="text"
                  name="username"
                  id="username"
                  placeholder={t(
                    "ProfileAboutUser.form.fields.username.placeholder"
                  )}
                  disabled={!isEditing}
                />
              </div>

              {/* Password */}
              {/* <div>
                <Label
                  htmlFor="password"
                  text={t("ProfileAboutUser.form.fields.password.label")}
                />
                <FieldProfile
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t(
                    "ProfileAboutUser.form.fields.password.placeholder"
                  )}
                  disabled={!isEditing}
                />
              </div> */}
                                           {/* Password */}              <div className="flex w-full justify-between gap-4 sm:gap-5">
                <div className="w-full sm:w-4/5">
                   <Label htmlFor="password" text={t("ProfileAboutUser.form.fields.password.label")} />
                   <PasswordFieldUser
                    name="password"
                    id="password"
                    onClick={toggleChangePasswordModal}
                    placeholder="••••••••"
                    className="custom-class mt-1"
                    readOnly={true} // Make the field read-only
                    disabled={!isEditing}
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
                  <Label
                    htmlFor="date_of_birth"
                    text={t("ProfileAboutUser.form.fields.date_of_birth.label")}
                  />
                  <DatePickerDemo
                    selectedDate={values.date_of_birth?.toISOString() || null}
                    onDateChange={(date) =>
                      setFieldValue("date_of_birth", date)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label
                    htmlFor="gender"
                    text={t("ProfileAboutUser.form.fields.gender.label")}
                  />
                  <SelectDemo
                    selectedGender={values.gender}
                    onGenderChange={(gender) => setFieldValue("gender", gender)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Phone Number & Address */}
              <div className="block md:flex justify-between w-full gap-5">
                <div className="w-full md:w-1/2 pb-5 md:pb-0">
                  <Label
                    htmlFor="phone_number"
                    text={t("ProfileAboutUser.form.fields.phone_number.label")}
                  />
                  <FieldProfile
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder={t(
                      "ProfileAboutUser.form.fields.phone_number.placeholder"
                    )}
                    disabled={!isEditing}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label
                    htmlFor="address"
                    text={t("ProfileAboutUser.form.fields.address.label")}
                  />
                  <FieldProfile
                    type="text"
                    name="address"
                    id="address"
                    placeholder={t(
                      "ProfileAboutUser.form.fields.address.placeholder"
                    )}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label
                  htmlFor="bio"
                  text={t("ProfileAboutUser.form.fields.bio.label")}
                />
                <FieldProfile
                  type="textarea"
                  name="bio"
                  id="bio"
                  placeholder={t(
                    "ProfileAboutUser.form.fields.bio.placeholder"
                  )}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex mt-6">
                <Button
                  type="submit"
                  text={
                    isUpdating
                      ? t("ProfileAboutUser.form.submitting.text")
                      : t("ProfileAboutUser.form.submitting.text")
                  }
                  disabled={isUpdating}
                  className="bg-primary hover:bg-primary text-white"
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
     {/* Change Password Modal */}       {isChangePasswordModalOpen && (
         <div className="fixed inset-0 p-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-1 border border-slate-200 rounded-2xl p-7 w-full sm:w-2/3 md:w-1/2  lg:w-1/3 relative">
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



// "use client";
// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import FieldProfile from "./FieldProfile";
// import Button from "../AuthComponents/ButtonComponentForAuth";
// import { DatePickerDemo } from "@/components/ProfileComponent/DateField";
// import { SelectDemo } from "@/components/ProfileComponent/SelectField";
// import Label from "../AuthComponents/LabelComponent";
// import {
//   useGetUserQuery,
//   useUpdateProfileUserMutation,
// } from "@/redux/service/user";
// import ProfileFormSkeleton from "../SkeletonLoading/ProfileComponent/ProfileFormSkeleton";
// import { useTranslations } from "next-intl";
// import { toast } from "@/hooks/use-toast";
// import PasswordFieldUser from "./PasswordFieldUser";

// type ProfileFormValues = {
//   username: string;
//   date_of_birth: Date | null;
//   gender: string | null;
//   bio: string | null;
//   phone_number: string | null;
//   address: string | null;
//   password?: string;
// };

// const ProfileForm = () => {
//   const { data: user, isLoading } = useGetUserQuery();
//   const [updateProfileUser, { isLoading: isUpdating }] =
//     useUpdateProfileUserMutation();
//   const [isEditing, setIsEditing] = useState(false);
//   const t = useTranslations();

//   if (isLoading) {
//     return <ProfileFormSkeleton />;
//   }

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };
 
//   const handleSubmit = async (values: ProfileFormValues) => {
//     if (!isEditing) return;

//     try {
//       const payload = {
//         username: values.username || "",
//         address: values.address || "",
//         phone_number: values.phone_number || "",
//         bio: values.bio || "",
//         gender: values.gender || "",
//         date_of_birth: values.date_of_birth
//           ? values.date_of_birth.toISOString().split("T")[0]
//           : null,
//         password: values.password || undefined,
//       };

//       const response = await updateProfileUser({
//         uuid: user?.payload.uuid || "",
//         user: payload,
//       }).unwrap();

//       toast({
//         title: response.message || "Profile updated successfully!",
//         description: "Your profile has been updated.",
//         variant: "success",
//         duration: 3000,
//       });

//       setIsEditing(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast({
//         title: "Uh oh! Something went wrong.",
//         description: "Failed to save profile.",
//         variant: "error",
//         duration: 4000,
//       });
//     }
//   };

//   return (
//     <div className="relative p-4">
//       {/* Edit Button at the Top Right */}
//       <div className="absolute top-0 right-0 mr-4">
//         <Button
//           type="button"
//           text={
//             isEditing
//               ? t("ProfileAboutUser.form.buttons.submit.loading")
//               : t("ProfileAboutUser.form.buttons.submit.default")
//           }
//           onClick={toggleEditMode}
//           className="bg-primary hover:bg-gray-600 text-white"
//         />
//       </div>

//       {/* Form Title */}
//       <h1 className="text-primary absolute  text-center pt-5 mr-12 lg:pt-0 lg:pb-3 text-2xl font-bold">
//         {t("ProfileAboutUser.title")}
//       </h1>

//       <Formik
//         initialValues={{
//           username: user?.payload.username || "",
//           phone_number: user?.payload.phone_number || "",
//           address: user?.payload.address || "",
//           date_of_birth: user?.payload.date_of_birth
//             ? new Date(user.payload.date_of_birth)
//             : null,
//           gender: user?.payload.gender
//             ? user.payload.gender.charAt(0).toUpperCase() +
//               user.payload.gender.slice(1).toLowerCase()
//             : "",
//           bio: user?.payload.bio || "",
//           password: "",
//         }}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue }) => (
//           <Form className="space-y-6 rounded-md mt-6 lg:mt-12">
//             <div className="w-full space-y-8">
//               {/* Username */}
//               <div>
//                 <Label
//                   htmlFor="username"
//                   text={t("ProfileAboutUser.form.fields.username.label")}
//                 />
//                 <FieldProfile
//                   type="text"
//                   name="username"
//                   id="username"
//                   placeholder={t(
//                     "ProfileAboutUser.form.fields.username.placeholder"
//                   )}
//                   disabled={!isEditing}
//                 />
//               </div>

//               {/* Password */}
//               {/* <div>
//                 <Label
//                   htmlFor="password"
//                   text={t("ProfileAboutUser.form.fields.password.label")}
//                 />
//                 <FieldProfile
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder={t(
//                     "ProfileAboutUser.form.fields.password.placeholder"
//                   )}
//                   disabled={!isEditing}
//                 />
//               </div> */}
//                                            {/* Password */}              <div className="flex w-full justify-between gap-4 sm:gap-5">
//                 <div className="w-full sm:w-4/5">
//                    <Label htmlFor="password" text={t("ProfileAboutUser.form.fields.password.label")} />
//                    <PasswordFieldUser
//                     name="password"
//                     id="password"
//                     onClick={toggleChangePasswordModal}
//                     placeholder="••••••••"
//                     className="custom-class mt-1"
//                     readOnly={true} // Make the field read-only
//                   />
//                 </div>
//                 <div className="w-2/5 md:w-1/5">
//                   <Button
//                     type="button"
//                     text={t("ProfileAboutUser.form.fields.password.button")}
//                     onClick={toggleChangePasswordModal} // Trigger the modal on click
//                     className="w-full mt-7 bg-primary hover:bg-primary text-white font-medium border-collapse"
//                   />
//                 </div>
//               </div>

//               {/* Date of Birth and Gender */}
//               <div className="block md:flex w-full justify-between gap-5">
//                 <div className="w-full md:w-1/2 pb-5 md:pb-0">
//                   <Label
//                     htmlFor="date_of_birth"
//                     text={t("ProfileAboutUser.form.fields.date_of_birth.label")}
//                   />
//                   <DatePickerDemo
//                     selectedDate={values.date_of_birth?.toISOString() || null}
//                     onDateChange={(date) =>
//                       setFieldValue("date_of_birth", date)
//                     }
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="w-full md:w-1/2">
//                   <Label
//                     htmlFor="gender"
//                     text={t("ProfileAboutUser.form.fields.gender.label")}
//                   />
//                   <SelectDemo
//                     selectedGender={values.gender}
//                     onGenderChange={(gender) => setFieldValue("gender", gender)}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </div>

//               {/* Phone Number & Address */}
//               <div className="block md:flex justify-between w-full gap-5">
//                 <div className="w-full md:w-1/2 pb-5 md:pb-0">
//                   <Label
//                     htmlFor="phone_number"
//                     text={t("ProfileAboutUser.form.fields.phone_number.label")}
//                   />
//                   <FieldProfile
//                     type="text"
//                     name="phone_number"
//                     id="phone_number"
//                     placeholder={t(
//                       "ProfileAboutUser.form.fields.phone_number.placeholder"
//                     )}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="w-full md:w-1/2">
//                   <Label
//                     htmlFor="address"
//                     text={t("ProfileAboutUser.form.fields.address.label")}
//                   />
//                   <FieldProfile
//                     type="text"
//                     name="address"
//                     id="address"
//                     placeholder={t(
//                       "ProfileAboutUser.form.fields.address.placeholder"
//                     )}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </div>

//               {/* Bio */}
//               <div>
//                 <Label
//                   htmlFor="bio"
//                   text={t("ProfileAboutUser.form.fields.bio.label")}
//                 />
//                 <FieldProfile
//                   type="textarea"
//                   name="bio"
//                   id="bio"
//                   placeholder={t(
//                     "ProfileAboutUser.form.fields.bio.placeholder"
//                   )}
//                   disabled={!isEditing}
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             {isEditing && (
//               <div className="flex mt-6">
//                 <Button
//                   type="submit"
//                   text={
//                     isUpdating
//                       ? t("ProfileAboutUser.form.submitting.text")
//                       : t("ProfileAboutUser.form.submitting.text")
//                   }
//                   disabled={isUpdating}
//                   className="bg-primary hover:bg-primary text-white"
//                 />
//               </div>
//             )}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default ProfileForm;
