"use client";
import React, { useState, useEffect } from "react";
import ButtonProfile from "./ButtonProfile";
import {
  History,
  Archive,
  User,
  LogOut,
  Menu,
  X,
  BookmarkCheck,
} from "lucide-react"; // Added X for close icon
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useGetUserQuery, usePostImageMutation } from "@/redux/service/user"; // Import the user API
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from '@/hooks/use-toast';
import LogoutComponent from "./LogoutComponent"; // Import the LogoutComponent
import SideBarSkeleton from "../SkeletonLoading/ProfileComponent/SidebarSkeleton";
import { useTranslations } from "next-intl";
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
  const t = useTranslations();
  const [currentLocale, setCurrentLocale] = useState<string>("km");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [activeButton, setActiveButton] = useState<string>();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);
  const isActive = (currentPath: string) =>
    pathname === `/${currentLocale}${currentPath}`;

  const getPageTitle = () => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    switch (pathWithoutLocale) {
      case "/profile-quiz-history":
        case "/profile-quiz-history":
          return t("TestHistoryUser.title");
        case "/profile-draft":
          return t("DraftHistory.title");
        case "/profile-bookmark":
          return t("BookmarkHistory.title");
        case "/profile-about-user":
          return t("ProfileAboutUser.title");
        default:
          return ""; // Default title if no match
    }
  };

  const handleButtonClick = (buttonName: string, path: string) => {
    // setActiveButton(buttonName);
    router.push(`/${currentLocale}${path}`);
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
    ? userData.avatar.startsWith("http")
      ? userData.avatar // Use full URL as-is
      : `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}` // Prepend base URL for relative path
    : "/auth/personplaceholder.png"; // Fallback to placeholder
  const username = userData?.username || "User";
  const email = userData?.email;
  // if(isUpadintProfile){
  //   return(
  //     <section>
  //         {/* Profile Picture Skeleton */}
  //         <div className="flex justify-center">
  //             <div className="relative border-2 border-gray-300 bg-gray-200 w-28 h-28 rounded-full p-2 animate-pulse"></div>
  //           </div>
  //           <div className="text-center mt-2">
  //             <div className="w-24 h-4 bg-gray-300 animate-pulse rounded mx-auto"></div>
  //             <div className="w-32 h-4 bg-gray-300 animate-pulse rounded mt-2 mx-auto"></div>
  //           </div>
  //     </section>
  //   )
  //  }

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
  if (isLoading) {
    return (
      <div className="w-1/2 ">
        <SideBarSkeleton isSidebarOpen={isSidebarOpen} />;
      </div>
    );
  }


  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        // toast.success(data.message || (t("SideBarProfile.toastMessages.logout.success")));
        toast({
          title: (data.message || "Logout Successfully !" || (t("SideBarProfile.toastMessages.logout.success"))),
          description: "Your action was successful.",
          variant: "success",
          duration: 3000,
        })
        router.push(`/${currentLocale}/`);
        window.location.reload();
      } else {
        // toast.error(data.message ||  (t("SideBarProfile.toastMessages.logout.error")));
        toast({
          title: (data.message || "Failed to logout!" || (t("SideBarProfile.toastMessages.logout.error"))),
          description: "Your action was not successful.",
          variant: "error",
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        title: (t("SideBarProfile.toastMessages.logout.genericError") || "Failed to logout!"),
        description: "Your action was not successful.",
        variant: "error",
        duration: 3000,
      })
      // toast.error(t("SideBarProfile.toastMessages.logout.genericError"));
      console.error(error);
    }
  };
  const handleFileChange = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: (t("SideBarProfile.toastMessages.profileImage.sizeError") || "Fail to change profile !"),
        description: "Profile image size is too large !",
        variant: "error",
        duration: 3000,
      })
      // 5 MB in bytes
      // toast.error(t("SideBarProfile.toastMessages.profileImage.sizeError"));
      // toast.error("File size exceeds the 5MB limit!");
      return;
    }
    if (!uuid) {
      toast({
        title: "User ID is missing!",
        description: "Your action was not completed",
        variant: "error",
        duration: 3000,
      })
      // toast.error("User ID is missing!");
      return;
    }
    setLoading(true); // Start loading
    try {
      await postUserImage({
        uuid,
        avatar_url: file, // Send the file directly
      }).unwrap();
      toast({
        title: (t("SideBarProfile.toastMessages.profileImage.success") || "Profile change successfully!"),
        description: "Profile change successfully",
        variant: "success",
        duration: 3000,
      })

      // toast.success(t("SideBarProfile.toastMessages.profileImage.success"));
    } catch (error) {
      console.error("Error updating profile:", error);
      // toast.error(t("SideBarProfile.toastMessages.profileImage.error"));
      toast({
        title: (t("SideBarProfile.toastMessages.profileImage.error") || "Fail to change profile!"),
        description: "Profile change failed",
        variant: "error",
        duration: 3000,
      })
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="">
      {/* <SideBarSkeleton isSidebarOpen={isSidebarOpen} /> */}
      <div className="flex flex-col h-fit ">
        <div>
          <div className="bg-white pb-4 h-full lg:hidden flex justify-between items-center w-full p-4 text-white rounded-[8px] top-14 left-0 right-0 z-50 ">
            <button
              className="flex items-center space-x-2 text-lg font-bold p-3 rounded-[8px] bg-primary"
              onClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle sidebar on click
            >
              <Menu className="w-6 h-6" /> {/* Hamburger Icon */}
            </button>
            <h1 className="text-xl  text-primary font-bold w-full text-center">
              {getPageTitle()}
            </h1>
          </div>
        </div>
        <div className="lg:hidden bg-blue-300">
          <aside
            className={`w-[370px] xl:w-[420px] rounded-r-xl bg-white p-6 flex flex-col lg:rounded-2xl justify-between lg:flex fixed top-16 bottom-1   left-0 z-50 lg:translate-x-0 lg:w-[350px] transition-transform duration-300 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } overflow-y-auto max-h-screen`}
          >
            {/* Close Icon for Mobile View */}
            <div className="lg:hidden flex justify-end ">
              <button
                onClick={closeSidebar} // Close the sidebar when close button is clicked
                className="text-gray-700"
              >
                <X className="w-6 h-6" /> {/* Close icon */}
              </button>
            </div>

            {/* Profile Picture Section */}
            <div className="flex justify-center cursor-pointer">
              <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
                {selectedImage || avatarUrl ? (
                  <Image
                    src={
                      selectedImage ||
                      avatarUrl ||
                      "/auth/personplaceholder.png"
                    }
                    alt="Profile picture"
                    width={1000}
                    height={1000}
                    className="object-cover rounded-full w-full h-full"
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
                      // Don't close the sidebar here
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* User Information */}
            <div className="text-center mt-2">
              <p className="text-primary text-xl font-bold">{username}</p>
              <p className="text-primary font-medium">{email}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-5 mt-6">
              <ButtonProfile
                 text={t("SideBarProfile.menuItems.testHistory.title")}
                 subText={t("SideBarProfile.menuItems.testHistory.description")}
                icon={<History className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-quiz-history")
                    ? "bg-[#F3FBF9]"
                    : "bg-white"
                }
                iconBackgroundColor="bg-yellow-400"
                onClick={() => {
                  handleButtonClick(
                    "profile-quiz-history",
                    "/profile-quiz-history"
                  );
                  closeSidebar(); // Close sidebar after button click
                }}
              />
              <ButtonProfile
                 text={t("SideBarProfile.menuItems.draftTest.title")}
                 subText={t("SideBarProfile.menuItems.draftTest.description")}
                icon={<Archive className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-draft") ? "bg-[#F3FBF9]" : "bg-white"
                }
                iconBackgroundColor="bg-[#3AC8A0]"
                onClick={() => {
                  handleButtonClick("profile-draft", "/profile-draft");
                  closeSidebar(); // Close sidebar after button click
                }}
              />
              <ButtonProfile
                text={t("SideBarProfile.menuItems.bookmarks.title")}
                subText={t("SideBarProfile.menuItems.bookmarks.description")}
                icon={<History className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-quiz-history")
                    ? "bg-[#F3FBF9]"
                    : "bg-white"
                }
                iconBackgroundColor="bg-yellow-400"
                onClick={() => {
                  handleButtonClick("profile-bookmark", "/profile-bookmark");
                  closeSidebar(); // Close sidebar after button click
                }}
              />
              <ButtonProfile
                text={t("SideBarProfile.menuItems.aboutYou.title")}
                subText={t("SideBarProfile.menuItems.aboutYou.description")}
                icon={<User className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-about-user") ? "bg-[#F3FBF9]" : "bg-white"
                }
                iconBackgroundColor="bg-red-400"
                onClick={() => {
                  handleButtonClick(
                    "profile-about-user",
                    "/profile-about-user"
                  );
                  closeSidebar(); // Close sidebar after button click
                }}
              />
            </div>

            {/* Logout Button */}
            <div className="mt-12 bg-white">
              <ButtonProfile
                text={t("SideBarProfile.menuItems.logout.title")}
                subText=""
                icon={<LogOut className="text-primary text-lg" />}
                isActive={false}
                onClick={() => {
                  setLogoutModalOpen(true); // Open modal
                  closeSidebar(); // Close sidebar after logout button click
                }}
                backgroundColor="bg-white"
                iconBackgroundColor="bg-white"
              />
            </div>
          </aside>
        </div>

        <div className="hidden lg:block bg-white rounded-xl">
          <aside
            className={`  bg-white border border-slate-50 p-6  flex flex-col rounded-[8px] justify-between lg:flex  top-0 left-0 z-50 lg:translate-x-0 lg:w-[350px] transition-transform duration-300 transform ${
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
              onClick={() =>
                router.push(`/${currentLocale}/profile-about-user`)
              }
            >
              <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
                {selectedImage || avatarUrl ? (
                  <Image
                    src={
                      selectedImage ||
                      avatarUrl ||
                      "/auth/personplaceholder.png"
                    }
                    alt="Profile picture"
                    width={1000}
                    height={1000}
                    className="object-cover h-full w-full rounded-full"
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
                text={t("SideBarProfile.menuItems.testHistory.title")}
                subText={t("SideBarProfile.menuItems.testHistory.description")}
                icon={<History className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-quiz-history")
                    ? "bg-[#F3FBF9]"
                    : "bg-white"
                }
                iconBackgroundColor="bg-yellow-400"
                onClick={() =>
                  handleButtonClick(
                    "profile-quiz-history",
                    "/profile-quiz-history"
                  )
                }
              />
              <ButtonProfile
                text={t("SideBarProfile.menuItems.draftTest.title")}
                subText={t("SideBarProfile.menuItems.draftTest.description")}
                icon={<Archive className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-draft") ? "bg-[#F3FBF9]" : "bg-white"
                }
                iconBackgroundColor="bg-[#3AC8A0]"
                onClick={() =>
                  handleButtonClick("profile-draft", "/profile-draft")
                }
              />
              <ButtonProfile
                text={t("SideBarProfile.menuItems.bookmarks.title")}
                subText={t("SideBarProfile.menuItems.bookmarks.description")}
                icon={<BookmarkCheck className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-bookmark") ? "bg-[#F3FBF9]" : "bg-white"
                }
                iconBackgroundColor="bg-[#FFA500]"
                onClick={() =>
                  handleButtonClick("profile-bookmark", "/profile-bookmark")
                }
              />
              <ButtonProfile
                 text={t("SideBarProfile.menuItems.aboutYou.title")}
                 subText={t("SideBarProfile.menuItems.aboutYou.description")}
                icon={<User className="text-white text-md" />}
                backgroundColor={
                  isActive("/profile-about-user") ? "bg-[#F3FBF9]" : "bg-white"
                }
                iconBackgroundColor="bg-red-400"
                onClick={() =>
                  handleButtonClick("profile-about-user", "/profile-about-user")
                }
              />
            </div>

            <div className="pt-6 mt-6  bg-white">
              <ButtonProfile
                text={t("SideBarProfile.menuItems.logout.title")}
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

            {/* <div className="bg-white p-8 w-full sm:w-[80%] mx-auto rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Test History</h2>
              <p>Your test history and more content goes here.</p>
            </div> */}
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
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SideBarProfileComponent;
