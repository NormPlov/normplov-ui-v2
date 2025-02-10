// 'use client'
// import React from "react";
// import { useTranslations } from "next-intl";
// type DeleteConfirmationModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
// };

// const DeleteConfirmationModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
// }: DeleteConfirmationModalProps) => {
//   const t= useTranslations();
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-[10px] max-w-md">
//         <h2 className="text-xl font-semibold text-textprimary mb-4">
//           {t("TestHistoryUser.DeleteTestModal.heading")}
//         </h2>
//         <p className="text-gray-600 mb-6">
//         {t("TestHistoryUser.DeleteTestModal.description")} <strong>{title}</strong>?
//         </p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//           >
//             {t("TestHistoryUser.DeleteTestModal.cancel")}
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//                {t("TestHistoryUser.DeleteTestModal.confirm")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmationModal;

"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"

type DeleteConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title }: DeleteConfirmationModalProps) => {
  const t = useTranslations()
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-[14px] shadow-xl max-w-sm md:max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-700 dark:text-white">
            {t("TestHistoryUser.DeleteTestModal.heading")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t("TestHistoryUser.DeleteTestModal.description")} <strong className="font-semibold">{title}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm md:text-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-[8px] hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {t("TestHistoryUser.DeleteTestModal.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm md:text-lg bg-red-600 text-white rounded-[8px] hover:bg-red-700 transition-colors duration-200"
          >
            {t("TestHistoryUser.DeleteTestModal.confirm")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal


