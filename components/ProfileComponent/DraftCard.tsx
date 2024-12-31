// import React, { useState } from "react";
// import { MoreHorizontal } from "lucide-react";
// import { MdOutlineQuiz } from "react-icons/md";

// type Action = {
//   label: string;
//   icon: JSX.Element;
//   actionKey: string;
//   onClick: (actionKey: string, title: string) => void;
// };

// type TestCardProps = {
//   title: string;
//   description: string;
//   date: string;
//   actions: Action[];
//   backgroundColor: string; // Add a dynamic background color prop
// };

// const DynamicDraftCard = ({ title, description, date, actions, backgroundColor }: TestCardProps) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <div className="flex justify-between items-center p-3 bg-white rounded-lg w-full">
//       {/* Icon and Content */}
//       <div className="flex items-center">
//         <div
//           className={`flex justify-center items-center w-11 h-11 rounded-full -mt-6 ${backgroundColor}`}
//         >
//           <span className="text-white font-bold text-2xl">
//             <MdOutlineQuiz />
//           </span>
//         </div>
//         <div className="ml-4">
//           <h3 className="text-xl font-bold text-primary">{title}</h3>
//           <p className="text-md text-textprimary">{description}</p>
//           <p className="text-sm text-gray-400">{date}</p>
//         </div>
//       </div>

//       {/* Dropdown */}
//       <div className="relative">
//         <button
//           className="p-2 rounded-full text-primary hover:bg-[#F3FBF9]"
//           onClick={() => setDropdownOpen(!isDropdownOpen)}
//         >
//           <MoreHorizontal className="w-7 h-7" />
//         </button>

//         {isDropdownOpen && (
//           <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg">
//             {actions.map((action) => (
//               <button
//                 key={action.actionKey}
//                 className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#F3FBF9] w-full"
//                 onClick={() => {
//                   action.onClick(action.actionKey, title);
//                   setDropdownOpen(false); // Close dropdown after action
//                 }}
//               >
//                 {action.icon} {action.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DynamicDraftCard;


import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineQuiz } from "react-icons/md";

type Action = {
  label: string;
  icon: JSX.Element;
  actionKey: string;
  onClick: () => void; // No need to pass title or uuid here, simplify action handler
};

type DraftCardProps = {
  title: string;
  assessment_name: string;
  date: string;
  actions: Action[];
  backgroundColor: string; // Add a dynamic background color prop
};

const DynamicDraftCard = ({
  title,
  assessment_name,
  date,
  actions,
  backgroundColor,
}: DraftCardProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      
      <div className="flex justify-between items-center p-3 bg-white  rounded-xl w-full">
      {/* Icon and Content */}
      <div className="flex items-center">
        <div
          className={`flex justify-center items-center w-12 h-12 rounded-full ${backgroundColor}`}
        >
          <MdOutlineQuiz className="text-white text-2xl" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-primary">{title}</h3>
          <p className="text-md text-gray-600">{assessment_name}</p>
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
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-[10px]  z-10">
            {actions.map((action) => (
            <button
            key={action.actionKey}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            onClick={action.onClick}
          >
            {action.icon} {action.label}
          </button>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default DynamicDraftCard;