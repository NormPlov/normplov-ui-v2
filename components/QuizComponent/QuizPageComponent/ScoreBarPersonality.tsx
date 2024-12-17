// 'use clie'
// import React,{useState} from "react";

// type BarProps = {
//     labelLeft: string;
//     labelRight: string;
//     valueLeft: number;
//     valueRight: number;
//     colorLeft: string; // Tailwind background color class for left bar
//     colorRight: string; // Tailwind background color class for right bar
//     customStyles?: {
//       container?: string; // Overall container styles
//       labelText?: string; // Label text styles
//       barContainer?: string; // Bar container styles
//       valueText?: string; // Value text styles
//     };
//   };
  
//   const ScoreBar = ({
//     labelLeft,
//     labelRight,
//     valueLeft,
//     valueRight,
//     colorLeft,
//     colorRight,
//     customStyles = {},
//   }: BarProps) => {
//     const total = valueLeft + valueRight;
  
//     const leftWidth = (valueLeft / total) * 100;
//     const rightWidth = (valueRight / total) * 100;
  
//     // Hover state
//     const [hoveredBar, setHoveredBar] = useState<"left" | "right" | null>(null);
// //   const [hoveredBar, setHoveredBar] = useState<"left" | "right" | null>(null);
//   return (
//     <div className={`flex flex-col space-y-2 ${customStyles.container || ""}`}>
//     {/* Labels */}
//     <div
//       className={`flex justify-between text-sm md:text-md font-medium ${
//         customStyles.labelText || "text-blue-900"
//       }`}
//     >
//       <span>{labelLeft}</span>
//       <span>{labelRight}</span>
//     </div>

//     {/* Bar Container */}
//     <div
//       className={`relative w-full h-2 bg-gray-200 rounded-lg overflow-hidden ${
//         customStyles.barContainer || ""
//       }`}
//     >
//       {/* Left Bar */}
//       <div
//         className={`absolute h-full ${colorLeft}`}
//         style={{ width: `${leftWidth}%` }}
//         onMouseEnter={() => setHoveredBar("left")}
//         onMouseLeave={() => setHoveredBar(null )}
//         >
//           {hoveredBar === "left" && (
//             <div className="absolute top-[-30px] left-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-md shadow-md">
//               {valueLeft}
//             </div>
//           )}
//         </div>

//         {/* Right Bar */}
//         <div
//           className={`absolute h-full right-0 ${colorRight}`}
//           style={{ width: `${rightWidth}%` }}
//           onMouseEnter={() => setHoveredBar("right")}
//           onMouseLeave={() => setHoveredBar(null)}
//         >
//           {hoveredBar === "right" && (
//             <div className="absolute top-[-30px] right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-md shadow-md">
//               {valueRight}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Values */}
//       <div
//         className={`flex justify-between text-sm ${
//           customStyles.valueText || "text-gray-600"
//         }`}
//       >
//         <span>{valueLeft}</span>
//         <span>{valueRight}</span>
//       </div>
//     </div>
//   );
// };

// export default ScoreBar;

// 'use client'
// import React, { useState } from "react";

// type BarProps = {
//   labelLeft: string;
//   labelRight: string;
//   valueLeft: number;
//   valueRight: number;
//   colorLeft: string;
//   colorRight: string;
//   customStyles?: {
//     container?: string;
//     labelText?: string;
//     barContainer?: string;
//     valueText?: string;
//   };
// };

// const ScoreBar = ({
//   labelLeft,
//   labelRight,
//   valueLeft,
//   valueRight,
//   colorLeft,
//   colorRight,
//   customStyles = {},
// }: BarProps) => {
//   const total = valueLeft + valueRight;
//   const leftWidth = (valueLeft / total) * 100;
//   const rightWidth = (valueRight / total) * 100;

//   const [hoveredBar, setHoveredBar] = useState<"left" | "right" | null>(null);

//   return (
//     <div className={`flex flex-col space-y-2 ${customStyles.container || ""}`}>
//       {/* Labels */}
//       <div
//         className={`flex justify-between text-sm md:text-md font-medium ${
//           customStyles.labelText || "text-blue-900"
//         }`}
//       >
//         <span>{labelLeft}</span>
//         <span>{labelRight}</span>
//       </div>

//       {/* Bar Container */}
//       <div
//         className={`relative w-full h-2 bg-gray-200 rounded-lg overflow-visible ${
//           customStyles.barContainer || ""
//         }`}
//       >
//         {/* Left Bar */}
//         <div
//           className={`absolute h-full ${colorLeft} cursor-pointer`}
//           style={{ width: `${leftWidth}%` }}
//         >
//           {/* Transparent Hover Area */}
//           <div
//             className="relative h-full w-full"
//             onMouseEnter={() => setHoveredBar("left")}
//             onMouseLeave={() => setHoveredBar(null)}
//           >
//             {hoveredBar === "left" && (
//               <div
//                 className="absolute bottom-[110%] left-0 transform translate-x-0 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded-md shadow-md z-10 pointer-events-none"
//               >
//                 {valueLeft}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Bar */}
//         <div
//           className={`absolute h-full right-0 ${colorRight} cursor-pointer`}
//           style={{ width: `${rightWidth}%` }}
//         >
//           {/* Transparent Hover Area */}
//           <div
//             className="relative h-full w-full"
//             onMouseEnter={() => setHoveredBar("right")}
//             onMouseLeave={() => setHoveredBar(null)}
//           >
//             {hoveredBar === "right" && (
//               <div
//                 className="absolute bottom-[110%] right-0 transform translate-x-0 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded-md shadow-md z-10 pointer-events-none"
//               >
//                 {valueRight}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Values */}
//       <div
//         className={`flex justify-between text-sm ${
//           customStyles.valueText || "text-gray-600"
//         }`}
//       >
//         <span>{valueLeft}</span>
//         <span>{valueRight}</span>
//       </div>
//     </div>
//   );
// };

// export default ScoreBar;


// 'use client';
// import React, { useState } from 'react';

// type BarProps = {
//   labelLeft: string;
//   labelRight: string;
//   valueLeft: number;
//   valueRight: number;
//   colorLeft: string;
//   colorRight: string;
//   customStyles?: {
//     container?: string;
//     labelText?: string;
//     barContainer?: string;
//     valueText?: string;
//   };
// };

// const ScoreBar = ({
//   labelLeft,
//   labelRight,
//   valueLeft,
//   valueRight,
//   colorLeft,
//   colorRight,
//   customStyles = {},
// }: BarProps) => {
//   const total = valueLeft + valueRight;
//   const leftWidth = (valueLeft / total) * 100;
//   const rightWidth = (valueRight / total) * 100;

//   const [hoveredBar, setHoveredBar] = useState<"left" | "right" | null>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
//     setMousePosition({ x: event.clientX, y: event.clientY });
//   };

//   return (
//     <div className={`flex flex-col space-y-2 ${customStyles.container || ''}`}>
//       {/* Labels */}
//       <div
//         className={`flex justify-between text-sm md:text-md font-medium ${
//           customStyles.labelText || 'text-blue-900'
//         }`}
//       >
//         <span>{labelLeft}</span>
//         <span>{labelRight}</span>
//       </div>

//       {/* Bar Container */}
//       <div
//         className={`relative w-full h-2 bg-gray-200 rounded-lg overflow-visible ${
//           customStyles.barContainer || ''
//         }`}
//       >
//         {/* Left Bar */}
//         <div
//           className={`absolute h-full ${colorLeft} cursor-pointer`}
//           style={{ width: `${leftWidth}%` }}
//           onMouseEnter={() => setHoveredBar('left')}
//           onMouseLeave={() => setHoveredBar(null)}
//           onMouseMove={handleMouseMove}
//         >
//           {hoveredBar === 'left' && (
//             <div
//               className="fixed bg-white text-gray-800 text-xs px-3 py-1 rounded-md shadow-lg border border-gray-200 z-50 flex items-center gap-2"
//               style={{
//                 top: `${mousePosition.y + 10}px`,
//                 left: `${mousePosition.x + 10}px`,
//               }}
//             >
//               <span
//                 className="w-2.5 h-2.5 rounded-full"
//                 style={{ backgroundColor: '#6B46C1' }}
//               ></span>
//               <span>
//                 {labelLeft}: <strong>{valueLeft}</strong>
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Right Bar */}
//         <div
//           className={`absolute h-full right-0 ${colorRight} cursor-pointer`}
//           style={{ width: `${rightWidth}%` }}
//           onMouseEnter={() => setHoveredBar('right')}
//           onMouseLeave={() => setHoveredBar(null)}
//           onMouseMove={handleMouseMove}
//         >
//           {hoveredBar === 'right' && (
//             <div
//               className="fixed bg-white text-gray-800 text-xs px-3 py-1 rounded-md shadow-lg border border-gray-200 z-50 flex items-center gap-2"
//               style={{
//                 top: `${mousePosition.y + 10}px`,
//                 left: `${mousePosition.x + 10}px`,
//               }}
//             >
//               <span
//                 className="w-2.5 h-2.5 rounded-full"
//                 style={{ backgroundColor: '#F56565' }}
//               ></span>
//               <span>
//                 {labelRight}: <strong>{valueRight}</strong>
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Values */}
//       <div
//         className={`flex justify-between text-sm ${
//           customStyles.valueText || 'text-gray-600'
//         }`}
//       >
//         <span>{valueLeft}</span>
//         <span>{valueRight}</span>
//       </div>
//     </div>
//   );
// };

// export default ScoreBar;

'use client';
import React, { useState } from 'react';

type BarProps = {
  labelLeft: string;
  labelRight: string;
  valueLeft: number;
  valueRight: number;
  colorLeft: string; // Tailwind class
  colorRight: string; // Tailwind class
  customStyles?: {
    container?: string;
    labelText?: string;
    barContainer?: string;
    valueText?: string;
  };
};

const ScoreBar = ({
  labelLeft,
  labelRight,
  valueLeft,
  valueRight,
  colorLeft,
  colorRight,
  customStyles = {},
}: BarProps) => {
  const total = valueLeft + valueRight;
  const leftWidth = (valueLeft / total) * 100;
  const rightWidth = (valueRight / total) * 100;

  const [hoveredBar, setHoveredBar] = useState<"left" | "right" | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  // Convert Tailwind bg-* class to a valid CSS color (as a fallback)
  const getColor = (tailwindClass: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-red-400': '#FC8181',
      'bg-orange-400': '#F6AD55',
      'bg-yellow-400': '#F6E05E',
      'bg-teal-400': '#38B2AC',
      'bg-green-400': '#48BB78',
      'bg-blue-700': '#2B6CB0',
      'bg-blue-500': '#4299E1',
    };
    return colorMap[tailwindClass] || '#000';
  };

  return (
    <div className={`flex flex-col space-y-2 ${customStyles.container || ''}`}>
      {/* Labels */}
      <div
        className={`flex justify-between text-sm md:text-md font-medium ${
          customStyles.labelText || 'text-blue-900'
        }`}
      >
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>

      {/* Bar Container */}
      <div
        className={`relative w-full h-2 bg-gray-200 rounded-lg overflow-visible ${
          customStyles.barContainer || ''
        }`}
      >
        {/* Left Bar */}
        <div
          className={`absolute h-full ${colorLeft} cursor-pointer`}
          style={{ width: `${leftWidth}%` }}
          onMouseEnter={() => setHoveredBar('left')}
          onMouseLeave={() => setHoveredBar(null)}
          onMouseMove={handleMouseMove}
        >
          {hoveredBar === 'left' && (
            <div
              className="fixed bg-white text-gray-800 text-xs px-3 py-1 rounded-md shadow-lg border border-gray-200 z-50 flex items-center gap-2"
              style={{
                top: `${mousePosition.y + 10}px`,
                left: `${mousePosition.x + 10}px`,
              }}
            >
              {/* Circle Indicator with Dynamic Color */}
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getColor(colorLeft) }}
              ></span>
              <span>
                {labelLeft}: <strong>{valueLeft}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Right Bar */}
        <div
          className={`absolute h-full right-0 ${colorRight} cursor-pointer`}
          style={{ width: `${rightWidth}%` }}
          onMouseEnter={() => setHoveredBar('right')}
          onMouseLeave={() => setHoveredBar(null)}
          onMouseMove={handleMouseMove}
        >
          {hoveredBar === 'right' && (
            <div
              className="fixed bg-white text-gray-800 text-xs px-3 py-1 rounded-md shadow-lg border border-gray-200 z-50 flex items-center gap-2"
              style={{
                top: `${mousePosition.y + 10}px`,
                left: `${mousePosition.x + 10}px`,
              }}
            >
              {/* Circle Indicator with Dynamic Color */}
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getColor(colorRight) }}
              ></span>
              <span>
                {labelRight}: <strong>{valueRight}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Values */}
      <div
        className={`flex justify-between text-sm ${
          customStyles.valueText || 'text-gray-600'
        }`}
      >
        <span>{valueLeft}</span>
        <span>{valueRight}</span>
      </div>
    </div>
  );
};

export default ScoreBar;
