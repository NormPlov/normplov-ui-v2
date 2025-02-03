'use client';
import React, { useState } from "react";
import DynamicTestCard from "./TestCard";
import { Eye, Copy, Trash, Link } from "lucide-react";
import { useGetAllUserTestQuery, useDeleteUserTestMutation,useGetShareLinksQuery } from "@/redux/service/test";
import Pagination from "./Pagination";
import DeleteConfirmationModal from "./DeleteComfirmModal";
import Image from "next/image";
import { useRouter,usePathname } from "next/navigation";
import TestListSkeleton from "../SkeletonLoading/ProfileComponent/TestListSkeleton";
import PaginationSkeleton from "../SkeletonLoading/ProfileComponent/PaginationSkeleton";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";
import { toast } from '@/hooks/use-toast';

// import { useGetShareLinksQuery } from '@/redux/service/test';


const TestList = () => {
  const t = useTranslations()
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCopyPopupOpen, setCopyPopupOpen] = useState(false);
  const [currentUuid, setCurrentUuid] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false); // Track if the link has been copied
  const [currentTitle, setCurrentTitle] = useState<string | null>(null); // Track the current test title
  const router = useRouter(); // For navigation
  const getCurrentLocale = () => {

  const locale = pathname.split("/")[1];
  return locale === "en" || locale === "km" ? locale : "km";
};
  const currentLocale = getCurrentLocale();
  // Fetch tests
  const { data, refetch,isLoading } = useGetAllUserTestQuery({
    page: currentPage,
    page_size: itemsPerPage,
  });

   // Fetch shareable link for the current UUID
   const { data: shareLinkData, isFetching: isFetchingShareLink } = useGetShareLinksQuery(
    { uuid: currentUuid || "" },
    { skip: !currentUuid } // Skip fetching if no UUID is selected
  );
  

  // Delete mutation
  const [deleteUserTest] = useDeleteUserTestMutation();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<{ uuid: string; title: string } | null>(null);
  const mapTypeToRoute = (type: string) => {
    // Normalize type by trimming and converting to lowercase
    const normalizedType = type.trim().toLowerCase();
  
    switch (normalizedType) {
      case "personality":
        return "personality";
      case "skill":
      case "skills": // Add support for "Skills"
        return "skill";
      case "interest":
      case "interests": // Add support for "Interests"
        return "interest";
      case "value":
      case "values": // Add support for "Values"
        return "value";
      case "learning style":
      case "learningstyle":
        return "learningStyle";
      case "all tests": // Handle "All Tests"
        return "all";
      default:
        console.warn(`Unknown test type: ${type}`);
        return null;
    }
  };
  
  // const mapTypeToRoute = (type: string) => {
  //   // Normalize type by trimming and converting to lowercase
  //   const normalizedType = type.trim().toLowerCase();
  
  //   switch (normalizedType) {
  //     case "personality":
  //       return "personality";
  //     case "skill":
  //       return "skill";
  //     case "interest":
  //       return "interest";
  //     case "value":
  //       return "value";
  //     case "learning style":
  //     case "learningstyle":
  //       return "learningStyle";
  //     case "all tests": // Handle "All Tests" here
  //       return "all";
  //     default:
  //       console.warn(`Unknown test type: ${type}`);
  //       return null;
  //   }
  // };
  
  // const mapTypeToRoute = (type: string) => {
  //   // Normalize type by removing spaces, converting to lowercase, and removing trailing 's'
  //   const normalizedType = type.trim().toLowerCase().replace(/s$/, "");
  
  //   switch (normalizedType) {
  //     case "personality":
  //       return "personality";
  //     case "skill":
  //       return "skill";
  //     case "interest":
  //       return "interest";
  //     case "value":
  //       return "value";
  //     case "learning style":
  //     case "learningstyle":
  //       return "learningStyle";
  //     case "alltests": // Handle "All Tests"
  //       return "all";
  //     default:
  //       console.warn(`Unknown test type: ${type}`);
  //       return null;
  //   }
  // };
  

  // Open modal when delete is triggered
  const openDeleteModal = (uuid: string, title: string) => {
    setSelectedTest({ uuid, title });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (selectedTest) {
      await deleteUserTest({ uuid: selectedTest.uuid }).unwrap();
      setIsModalOpen(false);
      refetch(); // Refresh the test list after delete
      toast({
        title: "Your is deleted !",
        description: "Your test has been deleted.",
        variant: "success",
        duration: 3000,
      })
      // toast.success("Test is deleted!",{
      //   position: "top-right",
      //   autoClose: 2000,
      // })
    }
  };
  
 // Handle copy link action
 const handleCopyClick = (uuid: string,title:string) => {
  setCurrentUuid(uuid); // Set the UUID to fetch the shareable link
  setCurrentTitle(title); // Set the test title for the popup
  setCopyPopupOpen(true); // Open the copy popup
};

// Copy the link to clipboard
const handleCopyToClipboard = () => {
  if (shareLinkData?.payload.shareable_link) {
    navigator.clipboard.writeText(shareLinkData.payload.shareable_link).then(() => {
      setIsCopied(true); // Set copied state
      toast({
        title: "Link copied to clipboard!",
        description: "Link copied to clipboard.",
        variant: "success",
        duration: 3000,
      })
      // toast.success("Link copied to clipboard!", {
      //   position: "top-right",
      //   autoClose: 2000,
      // });
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    });
  }
};

  const actions = [
    {
      label: t("TestHistoryUser.TestAction.view"),
      icon: <Eye className="w-4 h-4 text-green-600" />,
      actionKey: "view",
      onClick: (uuid: string, type: string) => {
        console.log("Original test type:", type);
        const routeType = mapTypeToRoute(type);
        console.log("Mapped route type:", routeType);
        console.log("Test UUID:", uuid);
  
        if (routeType) {
          router.push(`/${currentLocale}/test-result/${routeType}/${uuid}`);
        } else {
          console.error(`Failed to resolve route for test type: ${type}`);
        }
      },
    },
    // {
    //   label: "View",
    //   icon: <Eye className="w-4 h-4 text-green-600" />,
    //   actionKey: "view",
    //   onClick: (uuid: string, type: string) => {
    //     const routeType = mapTypeToRoute(type);
    //     console.log("Clicked test type:", type); // Debug: Log test type
    //     console.log("Mapped route type:", routeType); // Debug: Log route type
    //     console.log("Test UUID:", uuid); // Debug: Log UUID
    //     if (routeType) {
    //       router.push(`/${currentLocale}/test-result/${routeType}/${uuid}`);
    //     }else{
    //       console.error(`Failed to resolve route for test type: ${type}`);
    //     }
    //   },
      
    // },
    {
      label:t("TestHistoryUser.TestAction.copy"),
      icon: <Copy className="w-4 h-4 text-blue-600" />,
      actionKey: "copy",
      onClick: (uuid: string, title: string) => handleCopyClick(uuid, title),
    },
    {
      label:t("TestHistoryUser.TestAction.delete"),
      icon: <Trash className="w-4 h-4 text-red-600" />,
      actionKey: "delete",
      onClick: (uuid: string, title: string) => openDeleteModal(uuid, title),
    },
  ];

  const colors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-rose-500",
  ];

  const testCards = data?.payload.tests?.map((test, index) => {
    const backgroundColor = colors[index % colors.length]; // Cycle through the colors
    const formattedDate = new Date(test.created_at).toLocaleDateString("en-CA"); // Format date
    return (
      <DynamicTestCard
        key={test.test_uuid}
        title={test.test_name}
        assessment_type_name={test.assessment_type_name}
        date={formattedDate} // Use formatted date here
        // date={test.created_at}
        actions={actions.map((action) => ({
          ...action,
          onClick: () => action.onClick(test.test_uuid, test.assessment_type_name),
        }))}
        backgroundColor={backgroundColor}
      />
    );
  });
  // If loading, show skeleton loader
  if (isLoading) {
    return (
      <section>
        <TestListSkeleton />
        <PaginationSkeleton/>
      </section>
    );
  }


  return (
  <div className="pt-4 lg:pt-0">
      <h1 className=" text-3xl pb-3 hidden lg:flex text-primary font-bold w-full text-left">{t("TestHistoryUser.title")}</h1>
      <div className="relative w-full">
      {data?.payload.tests && data.payload.tests.length > 0 ? (
        <>
          <div className="grid gap-5 lg:gap-6 grid-cols-1 mb-5">{testCards}</div>
          {/* Pagination */}
         <div className="">
         <div className="">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil((data?.payload.metadata.total_items || 0) / itemsPerPage)}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
         </div>
        </>
      ) : (
        // Fallback content when there are no tests
        <div className="flex h-full mt-8 flex-col items-center text-center">
          <Image
            src="/auth/DraftandTest.png"
            alt="No Tests Available"
            width={1000}
            height={1000}
            className="w-80 md:w-1/2"
          />
          <h2 className="text-xl md:text-2xl font-bold text-primary mt-4">{t("TestHistoryUser.test-placehoder.title")}</h2>
          <p className="text-gray-600 mt-2">
            {t("TestHistoryUser.test-placehoder.description")}
            <Link href={`/${currentLocale}/tests`}>
              <span className="text-primary hover:text-primary-dark">
                {t("TestHistoryUser.test-placehoder.now")}
              </span>
            </Link>
          </p>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title={selectedTest?.title || ""}
      />
      {isCopyPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="mx-3 md:mx-0 bg-white p-6 rounded-xl shadow-sm lg:w-1/3">
              <h2 className="text-primary text-xl pb-4 font-bold">{t("TestHistoryUser.ShareResultPopup.heading")}<span className="text-secondary"> {currentTitle}</span> {t("TestHistoryUser.ShareResultPopup.colorHeading")}
             
                </h2>
                <p className="text-textprimary pb-3">{t("TestHistoryUser.ShareResultPopup.subHeading")}</p>
              {isFetchingShareLink ? (
                <p>Loading...</p>
              ) : (
                <div className='flex gap-2'>
                <div className="relative w-full">
                    {/* Input field with padding to accommodate the icon */}
                    <input
                        type="text"
                        placeholder="http://example.com/link/to/document"
                        value={shareLinkData?.payload.shareable_link}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-textprimary "
                        readOnly
                    />
                    {/* Custom Icon inside the input field */}
                    <Link color='#0BBB8A' size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>


               
            </div>
                
                // <p className="max-w-md bg-slate-50 p-3 rounded-xl mt-2 text-blue-600 text-wrap">{shareLinkData?.payload.shareable_link}</p>
              )}
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="text-textprimary px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    setCopyPopupOpen(false);
                    setCurrentUuid(null);
                  }}
                >
                  { t("TestHistoryUser.ShareResultPopup.buttons.cancel")}
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    isCopied
                      ? "bg-primary text-white "
                      : "bg-primary text-white "
                  }`}
                  onClick={handleCopyToClipboard}
                  disabled={isFetchingShareLink || isCopied}
                >
                  {isCopied ? t("TestHistoryUser.ShareResultPopup.buttons.share.shared") : t("TestHistoryUser.ShareResultPopup.buttons.share.default")}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
    {/* <ToastContainer/> */}
  </div>
  );
};

export default TestList;