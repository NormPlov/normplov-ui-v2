// import React from 'react';

// type ButtonProps = {
//   text: string;
//   subText: string;
//   icon: JSX.Element;
//   onClick?: () => void;
//   backgroundColor?: string;
//   iconBackgroundColor?: string;
//   isActive?: boolean; // New prop to indicate active state
// };

// const ButtonProfile = ({
//   text,
//   subText,
//   icon,
//   onClick,
//   backgroundColor = 'bg-white',
//   iconBackgroundColor = 'bg-yellow-400',
//   isActive = false,
// }: ButtonProps) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer ${
//         isActive ? 'bg-[#F3FBF9]' : backgroundColor
//       } hover:bg-[#F3FBF9] transition`}
//     >
//       <div
//         className={`flex justify-center items-center w-10 h-10 rounded-full ${iconBackgroundColor}`}
//       >
//         {icon}
//       </div>
//       <div>
//         <div className="text-lg font-bold text-primary text-left">{text}</div>
//         <div className="text-sm text-gray-400">{subText}</div>
//       </div>
//     </button>
//   );
// };

// export default ButtonProfile;

import React from "react";

type ButtonProps = {
  text: string;
  subText: string;
  icon: JSX.Element;
  onClick?: () => void;
  backgroundColor?: string;
  iconBackgroundColor?: string;
  isActive?: boolean; // Prop to indicate active state
};

const ButtonProfile = ({
  text,
  subText,
  icon,
  onClick,
  backgroundColor = "bg-white",
  iconBackgroundColor = "bg-yellow-400",
  isActive = false,
}: ButtonProps) => {
  const buttonBackground = isActive ? "bg-[#F3FBF9]" : backgroundColor;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer ${buttonBackground} hover:bg-[#F3FBF9] transition`}
    >
      <div
        className={`flex justify-center items-center w-10 h-10 rounded-full ${iconBackgroundColor}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold text-primary text-left">{text}</div>
        <div className="text-sm text-gray-400">{subText}</div>
      </div>
    </button>
  );
};

export default ButtonProfile;


