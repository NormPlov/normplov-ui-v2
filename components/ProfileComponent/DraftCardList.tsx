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
import { useRouter } from "next/navigation";
const DraftList = () => {
  const router =useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Fetch tests
  const { data, refetch } = useGetAllUserDraftQuery({
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
    }
  };
  // const formatToCustomCamelCase = (input: string): string => {
  //   // Custom mappings for specific cases
  //   const customMappings: Record<string, string> = {
  //     Skills: "skill",
  //     Interests: "interest",
  //     Personality: "personality",
  //     Values: "value",
  //   };
  
  //   // Check if input matches a custom mapping
  //   if (customMappings[input]) {
  //     return customMappings[input];
  //   }
  
  //   // Default camelCase conversion
  //   return input
  //     .split(" ")
  //     .map((word, index) =>
  //       index === 0
  //         ? word.toLowerCase()
  //         : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //     )
  //     .join("");
  // };
  
  const formatToCustomCamelCase = (input: string): string => {
    // Custom mappings for specific cases
    const customMappings: Record<string, string> = {
      Skills: "skill",
      Interests: "interest",
      Personality: "personality",
      Values: "value",
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
      label: "View",
      icon: <Eye className="w-4 h-4 text-green-600" />,
      actionKey: "view",
      onClick: (assessment_name: string, uuid: string) => {
        const formattedName = formatToCustomCamelCase(assessment_name);
  
        // Adjusted validation pattern: Allow mapped single words or camelCase
        const routePattern = /^[a-z]+([A-Z][a-z]*)*$/;
        if (routePattern.test(formattedName)) {
          router.push(`/draft/${formattedName}/${uuid}`);
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
      label: "Delete",
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
  // data?.payload.items?.map
  const draftCards = data?.payload.items.map((draft, index) => {
    const backgroundColor = colors[index % colors.length]; // Cycle through the colors
    const formattedDate = new Date(draft.created_at).toLocaleDateString("en-CA"); // Format date
    return (
      <DynamicDraftCard
        key={draft.uuid}
        title={draft.draft_name}
        assessment_name={draft.assessment_name}
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

  return ( 
    <div className="pt-4 lg:pt-0">
      <h1 className="hidden lg:flex text-3xl pb-3 text-primary font-bold w-full text-left">Draft history</h1>
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
        <div className="flex h-full mt-8 flex-col items-center text-center">
          <Image
            src="/auth/file1.png" // Replace with the correct image path
            alt="No Tests Available"
            width={500}
            height={500}
          />
          <h2 className="text-3xl font-bold text-primary mt-4">
            អ្នកមិនទាន់មានការតេស្តពេលក្រោយនោះទេ
          </h2>
          <p className="text-gray-600 mt-2">
            សាកល្បងធ្វើការតេស្តពេលក្រោយ។
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
