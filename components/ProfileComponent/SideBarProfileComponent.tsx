// "use client";
// import React, { useState } from "react";
// import ButtonProfile from "./ButtonProfile";
// import { History, Archive, User, LogOut, Menu, X, Camera } from "lucide-react"; // Added X for close icon
// import { useRouter, usePathname } from "next/navigation";
// import Image from "next/image";
// import { useGetUserQuery, usePostImageMutation } from "@/redux/service/user"; // Import the user API
// import { Formik, Form} from "formik";
// import * as Yup from "yup";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import LogoutComponent from "./LogoutComponent"; // Import the LogoutComponent

// type ValueTypes = {
//   avatar: File | string | null;
// };
// const FILE_SIZE = 1024 * 1024 * 2; // 2MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

// const validationSchema = Yup.object().shape({
//   avatar: Yup.mixed<File>()
//     .test("fileFormat", "Unsupported Format", (value) => {
//       return !value || SUPPORTED_FORMATS.includes((value as File).type);
//     })
//     .test("fileSize", "File Size is too large", (value) => {
//       return !value || (value as File).size <= FILE_SIZE;
//     }),
// });

// function getRandomColor(username: string) {
//   const colors = [
//     "bg-orange-300",
//     "bg-blue-300",
//     "bg-green-300",
//     "bg-yellow-300",
//     "bg-purple-300",
//     "bg-pink-300",
//     "bg-amber-300",
//     "bg-lime-300",
//     "bg-emerald-300",
//     "bg-teal-300",
//     "bg-cyan-300",
//     "bg-sky-300",
//     "bg-indigo-300",
//     "bg-violet-300",
//     "bg-fuchsia-300",
//     "bg-rose-300",
//   ];
//   const index = username.charCodeAt(0) % colors.length;
//   return colors[index];
// }

// const SideBarProfileComponent = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [activeButton, setActiveButton] = useState<string>("profile-quiz-history");
//   const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
//   const [isModalOpen, setModalOpen] = useState<boolean>(false);
//   const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const getPageTitle = () => {
//     switch (pathname) {
//       case "/profile-quiz-history":
//         return "Test History";
//       case "/profile-draft":
//         return "Draft Test";
//       case "/profile-about-user":
//         return "Information";
//       default:
//         return "/profile-quiz-history";
//     }
//   };

//   const handleButtonClick = (buttonName: string, path: string) => {
//     setActiveButton(buttonName);
//     router.push(path);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//     setModalOpen(false);
//   };

//   const { data: user} = useGetUserQuery();
//   const [postUserImage] = usePostImageMutation();
//   const userData = user?.payload;
//   const uuid = userData?.uuid;
//   const avatarUrl = userData?.avatar
//     ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
//     : null;

//   const username = userData?.username || "User";
//   const email = userData?.email;

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>, setFieldValue: any,submitForm:any) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
//       const previewUrl = URL.createObjectURL(file);
//       setSelectedImage(previewUrl);
//       setImageFile(file);
//       setFieldValue("avatar", file);
//       // Trigger Formik's submit immediately after image change
//       setFieldValue("avatar", file);
//       setTimeout(() => {
//         submitForm(); // This will submit the form immediately after an image is selected
//       }, 0);
//     }
//   };

//   const handleSubmit = async (values: ValueTypes) => {
//     if (!uuid) {
//       toast.error("User ID is missing!");
//       return;
//     }
//     if (!values.avatar || typeof values.avatar === "string") {
//       toast.error("Please select a valid image file to upload!");
//       return;
//     }

//     try {
//       const response = await postUserImage({ uuid, avatar_url: values.avatar }).unwrap();
//           toast.success("Profile image updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to upload the profile image. Please try again.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}logout`, {
//         method: "POST",
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message || "Logged out successfully!");
//         router.push("/");
//         window.location.reload();
//       } else {
//         toast.error(data.message || "Failed to log out.");
//       }
//     } catch (error) {
//       toast.error("An error occurred during logout.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="">
//       <div className="flex flex-col h-screen">
//         <div className="lg:hidden flex justify-between items-center w-full p-4 text-white rounded-xl sticky top-0 left-0 bg-white">
//           <button
//             className="flex items-center space-x-2 text-lg font-bold p-3 rounded-xl bg-primary"
//             onClick={() => setSidebarOpen(!isSidebarOpen)}
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <h1 className="text-3xl text-primary font-bold w-full text-center">
//             {getPageTitle()}
//           </h1>
//         </div>

//         <aside
//           className={`xl:w-[420px] lg:h-[93%] h-screen lg:m-7 bg-white p-8 flex flex-col lg:rounded-2xl justify-between lg:flex sticky top-0 lg:translate-x-0 lg:w-[350px] transition-transform duration-300 transform ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="lg:hidden flex justify-end">
//             <button
//               onClick={closeSidebar}
//               className="text-gray-700"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <Formik
//             initialValues={{ avatar: avatarUrl }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue, submitForm }) => (
//               <Form>
//                 <div className="flex justify-center">
//                   <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
//                     {selectedImage || avatarUrl ? (
//                       <Image
//                         src={selectedImage || avatarUrl || "/assets/placeholderProfile.png"}
//                         alt="Profile picture"
//                         width={1000}
//                         height={1000}
//                         className="object-cover rounded-full"
//                       />
//                     ) : (
//                       <div
//                         className={`flex items-center justify-center w-full h-full rounded-full text-3xl text-white font-bold ${getRandomColor(username)}`}
//                       >
//                         {username.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       name="avatar"
//                       accept={SUPPORTED_FORMATS.join(", ")}
//                       onChange={(e) => {
//                         const file = e.target.files?.[0] || null;
//                         if (file) {
//                           const previewUrl = URL.createObjectURL(file);
//                           setSelectedImage(previewUrl);
//                           setFieldValue("avatar", file);
//                           submitForm(); // Trigger form submission when the file is selected
//                         }
//                       }}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                     <button
//                       type="submit"
//                       className="text-primary absolute bottom-3 right-2 bg-white p-1 rounded-full border"
//                     >
//                       <Camera />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-center mt-2">
//                   <p className="text-primary">{username}</p>
//                   <p className="text-primary font-medium">{email}</p>
//                 </div>
//               </Form>
//             )}
//           </Formik>

//           <div className="space-y-5 mt-6">
//             <ButtonProfile
//               text="Test History"
//               subText="View your History Test"
//               icon={<History className="text-white text-md" />}
//               backgroundColor="bg-white"
//               iconBackgroundColor="bg-yellow-400"
//               isActive={activeButton === "profile-quiz-history"}
//               onClick={() =>
//                 handleButtonClick("profile-quiz-history", "/profile-quiz-history")
//               }
//             />
//             <ButtonProfile
//               text="Draft Test"
//               subText="View Your Test Draft"
//               icon={<Archive className="text-white text-md" />}
//               backgroundColor="bg-white"
//               iconBackgroundColor="bg-[#3AC8A0]"
//               isActive={activeButton === "profile-draft"}
//               onClick={() =>
//                 handleButtonClick("profile-draft", "/profile-draft")
//               }
//             />
//             <ButtonProfile
//               text="About You"
//               subText="View Your Profile"
//               icon={<User className="text-white text-md" />}
//               backgroundColor="bg-white"
//               iconBackgroundColor="bg-red-400"
//               isActive={activeButton === "profile-about-user"}
//               onClick={() =>
//                 handleButtonClick("profile-about-user", "/profile-about-user")
//               }
//             />
//           </div>

//           <div className="pt-6 mt-6 bg-white">
//             <ButtonProfile
//               text="Logout"
//               subText=""
//               icon={<LogOut className="text-primary text-lg" />}
//               isActive={false}
//               onClick={() => setLogoutModalOpen(true)} // Open modal on click
//               backgroundColor="bg-white"
//               iconBackgroundColor="bg-white"
//             />
//           </div>
//         </aside>

//         <div
//           className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 md:hidden ${isSidebarOpen ? "block" : "hidden"}`}
//           onClick={closeSidebar}
//         />

//         {isModalOpen && (
//           <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 md:hidden">
//             <div className="flex justify-end p-4">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="text-white"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="bg-white p-8 w-full sm:w-[80%] mx-auto rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Test History</h2>
//               <p>Your test history and more content goes here.</p>
//             </div>
//           </div>
//         )}

//         {isLogoutModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//             <LogoutComponent
//               onClose={() => setLogoutModalOpen(false)}
//               onConfirm={handleLogout}
//             />
//           </div>
//         )}
//       </div>
//       <ToastContainer/>
//     </div>
   
//   );
  
// };

// export default SideBarProfileComponent;

"use client";
import React, { useState } from "react";
import ButtonProfile from "./ButtonProfile";
import { History, Archive, User, LogOut, Menu, X, Camera } from "lucide-react"; // Added X for close icon
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useGetUserQuery, usePostImageMutation } from "@/redux/service/user"; // Import the user API
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import LogoutComponent from "./LogoutComponent"; // Import the LogoutComponent

type ValueTypes = {
  avatar: File | string | null;
};
const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  avatar: Yup.mixed<File>()
    .test("fileFormat", "Unsupported Format", (value) => {
      return !value || SUPPORTED_FORMATS.includes((value as File).type);
    })
    .test("fileSize", "File Size is too large", (value) => {
      return !value || (value as File).size <= FILE_SIZE;
    }),
});

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string>("profile-quiz-history");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
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
 console.log("avavatar url "+avatarUrl)
  const username = userData?.username || "User";
  console.log("username "+username)
  const email = userData?.email;

  const handleSubmit = async (values: ValueTypes) => {
    if (!uuid) {
      toast.error("User ID is missing!");
      return;
    }
    if (!values.avatar || typeof values.avatar === "string") {
      toast.error("Please select a valid image file to upload!");
      return;
    }

    try {
       await postUserImage({ uuid, avatar_url: values.avatar }).unwrap();
      
      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to upload the profile image. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
      const data = await res.json();

      if (res.ok) {
        window.location.reload();
        toast.success(data.message || "Logged out successfully!");
        
       
      } else {
        toast.error(data.message || "Failed to log out.");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col h-screen">
        <div className="lg:hidden flex justify-between items-center w-full p-4 text-white rounded-xl sticky top-0 left-0 bg-white">
          <button
            className="flex items-center space-x-2 text-lg font-bold p-3 rounded-xl bg-primary"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-3xl text-primary font-bold w-full text-center">
            {getPageTitle()}
          </h1>
        </div>

        <aside
          className={`xl:w-[420px] lg:h-[93%] h-screen lg:m-7 bg-white p-8 flex flex-col lg:rounded-2xl justify-between lg:flex sticky top-0 lg:translate-x-0 lg:w-[350px] transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="lg:hidden flex justify-end">
            <button
              onClick={closeSidebar}
              className="text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <Formik
            initialValues={{ avatar: avatarUrl }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, submitForm }) => (
              <Form>
                <div className="flex justify-center">
                  <div className="relative border-2 border-primary bg-[#fdfdfd] w-28 h-28 rounded-full p-2">
                    {selectedImage || avatarUrl ? (
                      <Image
                        src={selectedImage || avatarUrl || "/assets/placeholderProfile.png"}
                        alt="Profile picture"
                        width={1000}
                        height={1000}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div
                        className={`flex items-center justify-center w-full h-full rounded-full text-3xl text-white font-bold ${getRandomColor(username)}`}
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
          </Formik>

          <div className="space-y-5 mt-6">
            <ButtonProfile
              text="Test History"
              subText="View your History Test"
              icon={<History className="text-white text-md" />}
              backgroundColor="bg-white"
              iconBackgroundColor="bg-yellow-400"
              isActive={activeButton === "profile-quiz-history"}
              onClick={() =>
                handleButtonClick("profile-quiz-history", "/profile-quiz-history")
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

        <div
          className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 md:hidden ${isSidebarOpen ? "block" : "hidden"}`}
          onClick={closeSidebar}
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