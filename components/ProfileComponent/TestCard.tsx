'use client'
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineQuiz } from "react-icons/md";

type Action = {
  label: string;
  icon: JSX.Element;
  actionKey: string;
  onClick: () => void; // No need to pass title or uuid here, simplify action handler
};

type TestCardProps = {
  title: string;
  assessment_type_name: string;
  date: string;
  actions: Action[];
  backgroundColor: string; // Add a dynamic background color prop
};

const DynamicTestCard = ({
  title,
  assessment_type_name,
  date,
  actions,
  backgroundColor,
}: TestCardProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-3 bg-white  rounded-xl w-full">
      {/* Icon and Content */}
      <div className="flex items-center ">
        <div
          className={`flex justify-center items-center w-12 h-12 rounded-full -mt-5 ${backgroundColor}`}
        >
          <MdOutlineQuiz className="text-white text-2xl" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-primary">{title}</h3>
          <p className="text-md text-gray-600">{assessment_type_name}</p>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>

      {/* Dropdown Actions */}
      <div className="relative">
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-green-100"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <MoreHorizontal className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-[10px]  z-10">
            {actions.map((action) => (
            <button
            key={action.actionKey}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-bgPrimaryLight   w-full"
            onClick={action.onClick}
          >
            {action.icon} {action.label}
          </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTestCard;