"use client";
import React, { useState } from "react";
import DynamicDraftCard from "./DraftCard";
import { Eye, Trash } from "lucide-react";
import {
  useGetAllUserDraftQuery,
  useDeleteUserDraftMutation,
} from "@/redux/service/draft";
import Pagination from "./Pagination";
import DeleteConfirmationModal from "./DeleteComfirmModal";
import Image from "next/image";
import { useRouter,usePathname } from "next/navigation";
import PaginationSkeleton from "../SkeletonLoading/ProfileComponent/PaginationSkeleton";
import DraftListSkeleton from "../SkeletonLoading/ProfileComponent/DraftSkeleton";
import { useTranslations } from "next-intl";
import { toast } from '@/hooks/use-toast';

const DraftList = () => {
  const t = useTranslations()
  const pathname = usePathname();
  const router =useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const getCurrentLocale = () => {

    const locale = pathname.split("/")[1];
    return locale === "en" || locale === "km" ? locale : "km";
  };
  const currentLocale = getCurrentLocale();
  // Fetch tests
  const { data, refetch,isLoading } = useGetAllUserDraftQuery({
    page: currentPage,
    page_size: itemsPerPage,
  });

  // Delete mutation
  const [deleteUserDraft] = useDeleteUserDraftMutation();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<{
    uuid: string;
    title: string;
  } | null>(null);

  // Open modal when delete is triggered
  const openDeleteModal = (uuid: string, title: string) => {
    setSelectedDraft({ uuid, title });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (selectedDraft) {
      await deleteUserDraft({ uuid: selectedDraft.uuid }).unwrap();
      setIsModalOpen(false);
      refetch(); // Refresh the test list after delete
      toast({
        title: "Your draft has been deleted !",
        description: "Your draft has been deleted.",
        variant: "success",
        duration: 3000,
      })
    }
  };

  const formatToCustomCamelCase = (input: string): string => {
    // Custom mappings for specific cases
    const customMappings: Record<string, string> = {
      Skills: "skill",
      Interests: "interest",
      Personality: "personality",
      Values: "value",
      "Learning Style": "learningStyle",
    };
  
    // Check if input matches a custom mapping
    if (customMappings[input]) {
      return customMappings[input];
    }
  
    // Default camelCase conversion for multi-word inputs
    return input
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };
  
  const actions = [
    {
      label: t("DraftHistory.DraftAction.view"),
      icon: <Eye className="w-4 h-4 text-green-600" />,
      actionKey: "view",
      onClick: (assessment_name: string, uuid: string) => {
        const formattedName = formatToCustomCamelCase(assessment_name);
  
        // Adjusted validation pattern: Allow mapped single words or camelCase
        const routePattern = /^[a-z]+([A-Z][a-z]*)*$/;
        if (routePattern.test(formattedName)) {
          router.push(`/${currentLocale}/draft/${formattedName}/${uuid}`);
        } else {
          console.error("Invalid route format:", formattedName);
          // Optionally show a message to the user or handle invalid format
        }
      },
      // onClick: (assessment_name: string, uuid: string) => {
      //   const formattedName = formatToCustomCamelCase(assessment_name);
      //   const routePattern = /^[a-z]+[A-Z][a-zA-Z]*$/;
      //   if (routePattern.test(formattedName)) {
      //     router.push(`/draft/${formattedName}/${uuid}`);
      //   } else {
      //     console.error("Invalid route format:", formattedName);
      //     // Optionally show a message to the user or handle invalid format
      //   }
      // }, // Navigate dynamically
      // onClick: (assessment_name: string, uuid: string) =>
      //   router.push(
      //     `/draft/${assessment_name.replace(/\s+/g, "")}/${uuid}`
      //   ), // Navigate dynamically
    },
    {
      label: t("DraftHistory.DraftAction.delete"),
      icon: <Trash className="w-4 h-4 text-red-600" />,
      actionKey: "delete",
      onClick: (uuid: string, title: string) => openDeleteModal(uuid, title),
    },
  ];
  const colors = [
    "bg-white"
  ];
  // data?.payload.items?.map
  const draftCards = data?.payload.items.map((draft, index) => {
    const backgroundColor = colors[index % colors.length]; // Cycle through the colors
    const formattedDate = new Date(draft.created_at).toLocaleDateString("en-CA"); // Format date
    return (
      <DynamicDraftCard
        key={draft.uuid}
        title={draft.draft_name}
        assessment_name={draft.assessment_name}
        image={draft.image}
        date={formattedDate}
        // date={draft.created_at}
        actions={actions.map((action) => ({
          ...action,
          onClick: () =>
            action.actionKey === "view"
              ? action.onClick(draft.assessment_name, draft.uuid)
              : action.onClick(draft.uuid, draft.draft_name),
        }))}
        backgroundColor={backgroundColor}
      />
    );
  });
  const totalItems = data?.payload.metadata.total_items || 0;
const totalPages = Math.ceil(totalItems / itemsPerPage);
console.log("pagination",{ totalItems, itemsPerPage, totalPages });
if (isLoading) {
  return (
    <section>
      <DraftListSkeleton />
      <PaginationSkeleton/>
    </section>
  );
}

  return ( 
    <div className="pt-4 lg:pt-0">
      <h1 className=" text-3xl hidden lg:block pb-3 text-primary font-bold w-full text-left">{t("DraftHistory.title")}</h1>
      <div className="relative">
      {data?.payload.items && data.payload.items.length > 0 ? (
        <>
          <div className="grid gap-4 grid-cols-1 mb-5">{draftCards}</div>
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
        <div className="flex h-full mt-8  lg:mt-16 flex-col items-center text-center">
          <Image
            src="/auth/DraftandTest.png" // Replace with the correct image path
            alt="No Tests Available"
            width={1000}
            height={1000}
            className="w-80 md:w-1/2"
          />
          <h2 className="text-xl md:text-2xl font-bold text-primary mt-4">
            {t("DraftHistory.draft-placehoder.title")}
          </h2>
          <p className="text-gray-600 mt-2 text-xl lg:text-xl ">
          {t("DraftHistory.draft-placehoder.description")}
          </p>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title={selectedDraft?.title || ""}
      />
    </div>
    </div>
  );
};
export default DraftList;
