'use client';
import React, { useState } from "react";
import DynamicTestCard from "./TestCard";
import { Eye, Copy, Trash } from "lucide-react";
import { useGetAllUserTestQuery, useDeleteUserTestMutation } from "@/redux/service/test";
import Pagination from "./Pagination";
import DeleteConfirmationModal from "./DeleteComfirmModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TestList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const router = useRouter(); // For navigation

  // Fetch tests
  const { data, refetch } = useGetAllUserTestQuery({
    page: currentPage,
    page_size: itemsPerPage,
  });

  // Delete mutation
  const [deleteUserTest] = useDeleteUserTestMutation();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<{ uuid: string; title: string } | null>(null);

  const mapTypeToRoute = (type: string) => {
    // Normalize type by removing spaces, converting to lowercase, and removing trailing 's'
    const normalizedType = type.trim().toLowerCase().replace(/s$/, "");
  
    switch (normalizedType) {
      case "personality":
        return "personality";
      case "skill":
        return "skill";
      case "interest":
        return "interest";
      case "value":
        return "value";
      case "learning style":
      case "learningstyle":
        return "learningStyle";
      default:
        console.warn(`Unknown test type: ${type}`);
        return null;
    }
  };
  

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
    }
  };

  const actions = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4 text-green-600" />,
      actionKey: "view",
      onClick: (uuid: string, type: string) => {
        const routeType = mapTypeToRoute(type);
        if (routeType) {
          router.push(`/test-result/${routeType}/${uuid}`);
        } else {
          console.error("Invalid test type for routing:", type);
        }
      },
      
    },
    {
      label: "Copy",
      icon: <Copy className="w-4 h-4 text-blue-600" />,
      actionKey: "copy",
      onClick: () => {},
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

  return (
  <div className="pt-4 lg:pt-0">
      <h1 className="hidden lg:flex text-3xl pb-3 text-primary font-bold w-full text-left">Testing history</h1>
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
            src="/auth/file1.png"
            alt="No Tests Available"
            width={500}
            height={500}
          />
          <h2 className="text-3xl font-bold text-primary mt-4">គ្មានប្រវត្តិធ្វើតេស្ត</h2>
          <p className="text-gray-600 mt-2">
            សាកល្បងធ្វើតេស្តដើម្បីជម្រើសអាជីពរបស់អ្នកដោយចាប់ផ្តើមធ្វើតេស្តថ្មី។
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
    </div>
  </div>
  );
};

export default TestList;