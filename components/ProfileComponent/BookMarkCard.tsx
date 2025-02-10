'use client'
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { BsBookmarkCheckFill } from "react-icons/bs";

type Action = {
  label: string;
  icon: JSX.Element;
  actionKey: string;
  onClick: () => void;
};

type BookMarkCardProps = {
  title: string;
  job_type: string;
  company_logo:string;
  date: string;
  actions: Action[];
  backgroundColor: string;
};

const BookMarkCard = ({
  title,
  job_type,
  company_logo,
  date,
  actions,
  backgroundColor,
}: BookMarkCardProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Find the "View" action
  const viewAction = actions.find((action) => action.actionKey === "view");

  return (
    <div
      className={`flex justify-between items-center p-3 bg-white rounded-xl w-full transition-all duration-200 ${
        viewAction ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={viewAction?.onClick} // Trigger "View" action on card click
    >
      {/* Icon and Content */}
      <div className="flex items-center">
        <div
          className={`flex justify-center items-center w-10 h-10 md:w-14 md:h-14 rounded-full -mt-5 ${backgroundColor}`}
        >
          {company_logo ? (
                      <img
                        src={company_logo}
                        alt={title}
                        className="w-full h-full object-cover rounded-full p-0.5 border border-gray-50"
                        onError={(e) => {
                          e.currentTarget.onerror = null; // Prevents looping if placeholder fails
                          e.currentTarget.src = "/assets/placeholder-job.png";
                        }}
                      />
                    ) : (
                       <BsBookmarkCheckFill  className="text-white text-xl md:text-2xl" />
                      // <Archive className="text-white text-2xl" /> 
                      // <MdOutlineQuiz className="text-white text-2xl" />
                    )}
         
        </div>
        <div className="ml-4">
          <h3 className="text-md md:text-lg font-bold text-primary">{title}</h3>
          <p className="text-sm md:text-md text-gray-600">{job_type}</p>
          <p className="text-xs md:text-sm text-gray-400">{date}</p>
        </div>
      </div>

      {/* Dropdown Actions */}
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()} // Prevent card click when interacting with dropdown
      >
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-green-100 cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <MoreHorizontal className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-[10px] z-10">
            {actions.map((action) => (
              <button
                key={action.actionKey}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-bgPrimaryLight w-full cursor-pointer"
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

export default BookMarkCard;
