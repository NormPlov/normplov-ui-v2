"use client";
import React, { useState } from "react";
import BookMarkCard from "./BookMarkCard";
import { Eye, Trash } from "lucide-react";

import Pagination from "./Pagination";
import DeleteConfirmationModal from "./DeleteComfirmModal";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import PaginationSkeleton from "../SkeletonLoading/ProfileComponent/PaginationSkeleton";
import BookmarkListSkeleton from "../SkeletonLoading/ProfileComponent/BookmarkSkeleton";
import {
  useDeleteUserBookMarkMutation,
  useGetAllUserBookMarkQuery,
} from "@/redux/service/user";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const BookMarkList = () => {
  const t = useTranslations();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const pathname = usePathname();
  const getCurrentLocale = () => {
    const locale = pathname.split("/")[1];
    return locale === "en" || locale === "km" ? locale : "km";
  };
  const currentLocale = getCurrentLocale();
  // Fetch tests
  const {
    data: response,
    refetch,
    error,
    isLoading,
    isError,
  } = useGetAllUserBookMarkQuery({
    page: currentPage,
    page_size: itemsPerPage,
  });
  console.log("response: " + response);
  if (isError) {
    console.error("API Error Details:", error);
  }
  console.log("Error", isError);
  console.log("book", response?.payload.items);

  // Delete mutation
  const [deleteUserDraft] = useDeleteUserBookMarkMutation();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookMarkDelete, setSelectedBookMark] = useState<{
    uuid: string;
    title: string;
  } | null>(null);

  // Open modal when delete is triggered
  const openDeleteModal = (uuid: string, title: string) => {
    setSelectedBookMark({ uuid, title });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (selectedBookMarkDelete) {
      await deleteUserDraft({ uuid: selectedBookMarkDelete.uuid }).unwrap();
      setIsModalOpen(false);
      refetch(); // Refresh the test list after delete
      toast({
        title: "Your bookmark has been deleted !",
        description: "Your bookmark has been deleted.",
        variant: "success",
        duration: 3000,
      });
    }
  };

  // const actions = [
  //   {
  //     label: "View",
  //     icon: <Eye className="w-4 h-4 text-green-600" />,
  //     actionKey: "view",
  //     onClick: (job_uuid:string) => {
  //       // if (routePattern.test(formattedName)) {
  //         router.push(`/${currentLocale}/jobs/${job_uuid}`);
  //       }
  //     },
  //   {
  //     label: "Delete",
  //     icon: <Trash className="w-4 h-4 text-red-600" />,
  //     actionKey: "delete",
  //     onClick: (uuid: string, title: string) => openDeleteModal(uuid, title),
  //   },
  // ];
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
  const bookmarkCards = response?.payload.items.map((bookmark, index) => {
    const backgroundColor = colors[index % colors.length]; // Cycle through the colors
    const formattedDate = new Date(response.date).toLocaleDateString("en-CA"); // Format date

    return (
      <BookMarkCard
        key={bookmark.job_uuid}
        title={bookmark.title}
        job_type={bookmark.job_type}
        date={formattedDate}
        actions={[
          {
            label: "View",
            icon: <Eye className="w-4 h-4 text-green-600" />,
            actionKey: "view",
            onClick: () =>
              router.push(`/${currentLocale}/jobs/${bookmark.job_uuid}`),
          },
          {
            label: "Delete",
            icon: <Trash className="w-4 h-4 text-red-600" />,
            actionKey: "delete",
            onClick: () =>
              openDeleteModal(bookmark.bookmark_uuid, bookmark.title),
          },
        ]}
        backgroundColor={backgroundColor}
      />
    );
  });

  const totalItems = response?.payload.metadata.total_items || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log("pagination", { totalItems, itemsPerPage, totalPages });
  if (isLoading) {
    return (
      <section>
        <BookmarkListSkeleton />
        <PaginationSkeleton />
      </section>
    );
  }

  return (
    <div className="pt-4 lg:pt-0">
      <h1 className=" text-3xl pb-3 hidden lg:block text-primary font-bold w-full text-left">
        {t("BookmarkHistory.title")}
      </h1>
      <div className="relative">
        {response?.payload.items && response.payload.items.length > 0 ? (
          <>
            <div className="grid gap-4 grid-cols-1 mb-5">{bookmarkCards}</div>
            <div className="">
              <div className="">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    (response?.payload.metadata.total_items || 0) / itemsPerPage
                  )}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
              </div>
            </div>
          </>
        ) : (
          // Fallback content when there are no tests
          <div className="flex h-full mt-8 lg:mt-16 flex-col items-center text-center">
            <Image
              src="/auth/DraftandTest.png" // Replace with the correct image path
              alt="No Tests Available"
              width={1000}
              height={1000}
              className="w-80 lg:w-1/2"
            />
            <h2 className="text-xl lg:text-2xl font-bold text-primary mt-4 lg:mt-12">
              {t("BookmarkHistory.BookMarkHolder.title")}
            </h2>
            <p className="text-md lg:text-lg text-gray-600 mt-2">
              {t("BookmarkHistory.BookMarkHolder.description")}
              <Link
                href={`/${currentLocale}/jobs`}
                // href="/forgot-password"
              >
                <span className="text-lg px-3 text-primary hover:underline hover:font-semibold ">
                  {t("BookmarkHistory.BookMarkHolder.now")}
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
          title={selectedBookMarkDelete?.title || ""}
        />
      </div>
    </div>
  );
};
export default BookMarkList;
