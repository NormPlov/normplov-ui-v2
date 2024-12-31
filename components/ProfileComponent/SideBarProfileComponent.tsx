"use client";
import React, { useState } from "react";
import ButtonProfile from "./ButtonProfile";
import { History, Archive, User, LogOut, Menu, X} from "lucide-react"; // Added X for close icon
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useGetUserQuery, usePostImageMutation } from "@/redux/service/user"; // Import the user API
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import LogoutComponent from "./LogoutComponent"; // Import the LogoutComponent

// type ValueTypes = {
//   avatar: File | string | null;
// };

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];



function getRandomColor(username: string) {
  const colors = [
    "bg-orange-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-amber-300",
    "bg-lime-300",
    "bg-emerald-300",
    "bg-teal-300",
    "bg-cyan-300",
    "bg-sky-300",
    "bg-indigo-300",
    "bg-violet-300",
    "bg-fuchsia-300",
    "bg-rose-300",
  ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
}

const SideBarProfileComponent = () => {
  const isActive = (currentPath: string) => pathname === currentPath;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeButton, setActiveButton] = useState<string>(
    "profile-quiz-history"
  );
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    switch (pathname) {
      case "/profile-quiz-history":
        return "Test History";
      case "/profile-draft":
        return "Draft Test";
      case "/profile-about-user":
        return "Information";
      
    }
  };

  const handleButtonClick = (buttonName: string, path: string) => {
    setActiveButton(buttonName);
    router.push(path);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setModalOpen(false);
  };

  const { data: user } = useGetUserQuery();
  const [postUserImage] = usePostImageMutation();
  const userData = user?.payload;
  const uuid = userData?.uuid;
  const avatarUrl = userData?.avatar
    ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
    : null;

  const username = userData?.username || "User";
  const email = userData?.email;



  // const handleSubmit = async (values: ValueTypes) => {
  //   if (!uuid) {
  //     toast.error("User ID is missing!");
  //     return;
  //   }
  //   if (!values.avatar || typeof values.avatar === "string") {
  //     toast.error("Please select a valid image file to upload!");
  //     return;
  //   }

  //   try {
  //     await postUserImage({
  //       uuid,
  //       avatar_url: values.avatar,
  //     }).unwrap();
  //     toast.success("Profile image updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     toast.error("Failed to upload the profile image. Please try again.");
  //   }
  // };
 if(isLoading){
   return(
     <div className="flex justify-center items-center h-screen">
       <div className="animate-spin text-3xl text-gray-800">Loading...</div>
     </div>
   )
 }
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `/api/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Logged out successfully!");
        router.push("/");
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to log out.");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
      console.error(error);
    }
  };
  const handleFileChange = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5 MB in bytes
      toast.error("File size exceeds the 5MB limit!");
      return;
    }
    if (!uuid) {
      toast.error("User ID is missing!");
      return;
    }
    setLoading(true); // Start loading
    try {
      await postUserImage({
        uuid,
        avatar_url: file, // Send the file directly
      }).unwrap();

      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to upload the profile image. Please try again.");
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="">
      <div className="flex flex-col h-fit ">
      
       <div>
       <div className="bg-white pb-4 lg:hidden flex justify-between items-center w-full p-4 text-white rounded-[8px] sticky top-14 left-0 right-0 z-50 ">
          <button
            className="flex items-center space-x-2 text-lg font-bold p-3 rounded-[8px] bg-primary"
            onClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle sidebar on click
          >
            <Menu className="w-6 h-6" /> {/* Hamburger Icon */}
          </button>
          <h1 className="text-3xl  text-primary font-bold w-full text-center">
            {getPageTitle()}
          </h1>
        </div>
       </div>
        
       <div className="lg:hidden ">
       <aside
          className={`w-96 xl:w-[420px] rounded-r-xl bg-white p-8 flex flex-col lg:rounded-2xl justify-between lg:flex fixed top-0 left-0 z-50 lg:translate-x-0 lg:w-[350px] transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Icon for Mobile View */}
          <div className="lg:hidden flex justify-end">
            <button
              onClick={closeSidebar} // Close the sidebar when close button is clicked
              className="text-gray-700"
            >
              <X className="w-6 h-6" /> {/* Close icon */}
            </button>
          </div>
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => router.push("/profile-about-user")}
          >
            <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
              {selectedImage || avatarUrl ? (
                <Image
                  src={
                    selectedImage ||
                    avatarUrl ||
                    "/assets/placeholderProfile.png"
                  }
                  alt="Profile picture"
                  width={1000}
                  height={1000}
                  className="object-cover rounded-full"
                />
              ) : (
                <div
                  className={`flex items-center justify-center w-full h-full rounded-full text-3xl text-white font-bold ${getRandomColor(
                    username
                  )}`}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
              <input
                type="file"
                name="avatar"
                accept={SUPPORTED_FORMATS.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setSelectedImage(previewUrl);
                    handleFileChange(file); // Trigger file upload
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-primary text-xl font-bold">{username}</p>
            <p className="text-primary font-medium">{email}</p>
          </div>

          {/* <Formik
            initialValues={{ avatar: avatarUrl }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, submitForm }) => (
              <Form>
                <div className="flex justify-center ">
                  <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
                    {selectedImage || avatarUrl ? (
                      <Image
                        src={
                          selectedImage ||
                          avatarUrl ||
                          "/assets/placeholderProfile.png"
                        }
                        alt="Profile picture"
                        width={1000}
                        height={1000}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div
                        className={`flex items-center justify-center w-full h-full rounded-full text-3xl text-white font-bold ${getRandomColor(
                          username
                        )}`}
                      >
                        {username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <input
                      type="file"
                      name="avatar"
                      accept={SUPPORTED_FORMATS.join(", ")}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                          const previewUrl = URL.createObjectURL(file);
                          setSelectedImage(previewUrl);
                          setFieldValue("avatar", file);
                          submitForm(); // Trigger form submission when the file is selected
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button
                      type="submit"
                      className="text-primary absolute bottom-3 right-2 bg-white p-1 rounded-full border"
                    >
                      <Camera />
                    </button>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-primary">{username}</p>
                  <p className="text-primary font-medium">{email}</p>
                </div>
              </Form>
            )}
          </Formik> */}

          <div className="space-y-5 mt-6">
            <ButtonProfile
              text="Test History"
              subText="View your History Test"
              icon={<History className="text-white text-md" />}
              backgroundColor="bg-white"
              iconBackgroundColor="bg-yellow-400"
              isActive={activeButton === "profile-quiz-history"}
              onClick={() =>
                handleButtonClick(
                  "profile-quiz-history",
                  "/profile-quiz-history"
                )
              }
            />
            <ButtonProfile
              text="Draft Test"
              subText="View Your Test Draft"
              icon={<Archive className="text-white text-md" />}
              backgroundColor="bg-white"
              iconBackgroundColor="bg-[#3AC8A0]"
              isActive={activeButton === "profile-draft"}
              onClick={() =>
                handleButtonClick("profile-draft", "/profile-draft")
              }
            />
            <ButtonProfile
              text="About You"
              subText="View Your Profile"
              icon={<User className="text-white text-md" />}
              backgroundColor="bg-white"
              iconBackgroundColor="bg-red-400"
              isActive={activeButton === "profile-about-user"}
              onClick={() =>
                handleButtonClick("profile-about-user", "/profile-about-user")
              }
            />
          </div>

          <div className="pt-6 mt-6 bg-white">
            <ButtonProfile
              text="Logout"
              subText=""
              icon={<LogOut className="text-primary text-lg" />}
              isActive={false}
              onClick={() => setLogoutModalOpen(true)} // Open modal on click
              backgroundColor="bg-white"
              iconBackgroundColor="bg-white"
            />
          </div>
        </aside>
       </div>
       <div className="hidden lg:block bg-white rounded-xl">
       <aside
          className={` h-screen  bg-white border border-slate-50 p-6  flex flex-col rounded-[8px] justify-between lg:flex  top-0 left-0 z-50 lg:translate-x-0 lg:w-[350px] transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Icon for Mobile View */}
          <div className="lg:hidden flex justify-end">
            <button
              onClick={closeSidebar} // Close the sidebar when close button is clicked
              className="text-gray-700"
            >
              <X className="w-6 h-6" /> {/* Close icon */}
            </button>
          </div>
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => router.push("/profile-about-user")}
          >
            <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
              {selectedImage || avatarUrl ? (
                <Image
                  src={
                    selectedImage ||
                    avatarUrl ||
                    "/assets/placeholderProfile.png"
                  }
                  alt="Profile picture"
                  width={1000}
                  height={1000}
                  className="object-cover rounded-full"
                />
              ) : (
                <div
                  className={`flex items-center justify-center w-full h-full rounded-full text-3xl text-white font-bold ${getRandomColor(
                    username
                  )}`}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
              <input
                type="file"
                name="avatar"
                accept={SUPPORTED_FORMATS.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setSelectedImage(previewUrl);
                    handleFileChange(file); // Trigger file upload
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-primary text-xl font-bold">{username}</p>
            <p className="text-primary font-medium">{email}</p>
          </div>
          
          <div className="space-y-5 mt-6">
            <ButtonProfile
              text="Test History"
              subText="View your History Test"
              icon={<History className="text-white text-md" />}
              backgroundColor={isActive("/profile-quiz-history") ? "bg-[#F3FBF9]" : "bg-white"}
              iconBackgroundColor="bg-yellow-400"
              onClick={() =>
                handleButtonClick(
                  "profile-quiz-history",
                  "/profile-quiz-history"
                )
              }
            />
            <ButtonProfile
              text="Draft Test"
              subText="View Your Test Draft"
              icon={<Archive className="text-white text-md" />}
              backgroundColor={isActive("/profile-draft") ? "bg-[#F3FBF9]" : "bg-white"}
              iconBackgroundColor="bg-[#3AC8A0]"
              onClick={() =>
                handleButtonClick("profile-draft", "/profile-draft")
              }
            />
            <ButtonProfile
              text="About You"
              subText="View Your Profile"
              icon={<User className="text-white text-md" />}
              backgroundColor={isActive("/profile-about-user") ? "bg-[#F3FBF9]" : "bg-white"}
              iconBackgroundColor="bg-red-400"
              onClick={() =>
                handleButtonClick("profile-about-user", "/profile-about-user")
              }
            />
          </div>

          <div className="pt-6 mt-6 bg-white">
            <ButtonProfile
              text="Logout"
              subText=""
              icon={<LogOut className="text-primary text-lg" />}
              isActive={false}
              onClick={() => setLogoutModalOpen(true)} // Open modal on click
              backgroundColor="bg-white"
              iconBackgroundColor="bg-white"
            />
          </div>
        </aside>
       </div>

        {/* Backdrop for Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-slate-200 opacity-50 md:hidden ${
            isSidebarOpen ? "block" : "hidden"
          }`}
          onClick={closeSidebar} // Close the sidebar when backdrop is clicked
        />

        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 md:hidden">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setModalOpen(false)}
                className="text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-white p-8 w-full sm:w-[80%] mx-auto rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Test History</h2>
              <p>Your test history and more content goes here.</p>
            </div>
          </div>
        )}

        {isLogoutModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <LogoutComponent
              onClose={() => setLogoutModalOpen(false)}
              onConfirm={handleLogout}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SideBarProfileComponent;
