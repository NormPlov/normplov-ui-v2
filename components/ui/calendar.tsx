// "use client"

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start: "day-range-start",
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
//         IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }

// "use client"

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={`p-4 bg-white rounded-xl ${className}`}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: " flex justify-between items-center pt-1 relative text-gray-600 font-medium",
//         caption_label: "text-base",
//         nav: "flex items-center space-x-2",
//         nav_button: "h-8 w-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",
//         nav_button_previous: "",
//         nav_button_next: "",
//         table: "w-full border-collapse",
//         head_row: "flex justify-between border-b border-gray-200",
//         head_cell: "text-gray-500 text-sm font-medium p-1",
//         row: "flex justify-between mt-2",
//         cell: "relative h-10 w-10 text-center text-sm p-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-xl",
//         day: "bg-red-500 h-full w-full  flex items-center justify-center rounded-xl hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
//         day_selected:
//           "text-primary text-white font-bold focus:bg-primary",
//         day_today: " text-textprimay font-bold",
//         day_outside: "text-gray-300",
//         day_disabled: "text-gray-300 pointer-events-none",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => (
//           <ChevronLeft {...props} className="h-5 w-5 text-gray-600" />
//         ),
//         IconRight: ({ ...props }) => (
//           <ChevronRight {...props} className="h-5 w-5 text-gray-600" />
//         ),
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }

// "use client";

// import * as React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { DayPicker } from "react-day-picker";

// export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={`p-4 bg-white rounded-xl ${className}`}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption:
//           "flex justify-between items-center pt-1 relative text-gray-600 font-medium",
//         caption_label: "text-base",
//         nav: "flex items-center space-x-2",
//         nav_button:
//           "h-8 w-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",
//         nav_button_previous: "",
//         nav_button_next: "",
//         table: "w-full border-collapse",
//         head_row: "flex justify-between border-b border-gray-200",
//         head_cell: "text-gray-500 text-sm font-medium p-1",
//         row: "flex justify-between mt-2",
//         cell: "relative h-10 w-10 text-center text-sm p-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-xl",
//         day: "h-full w-full flex items-center justify-center rounded-xl hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
//         day_selected:
//           "bg-primary text-white font-bold focus:bg-primary focus:text-white",
//         day_today: "text-primary font-bold", // Style for the current date
//         day_outside: "text-gray-300",
//         day_disabled: "text-gray-300 pointer-events-none",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => (
//           <ChevronLeft {...props} className="h-5 w-5 text-gray-600" />
//         ),
//         IconRight: ({ ...props }) => (
//           <ChevronRight {...props} className="h-5 w-5 text-gray-600" />
//         ),
//       }}
//       {...props}
//     />
//   );
// }
// Calendar.displayName = "Calendar";

// export { Calendar };
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-4 bg-white rounded-xl ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption:
          "flex justify-between items-center pt-1 relative text-gray-600 font-medium",
        caption_label: "text-base",
        nav: "flex items-center space-x-2",
        nav_button:
          "h-8 w-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "flex justify-between border-b border-gray-200",
        head_cell: "text-gray-500 text-sm font-medium p-1",
        row: "flex justify-between mt-2",
        cell: "relative h-10 w-10 text-center text-sm p-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-xl",
        day: "h-full w-full flex items-center justify-center rounded-xl hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
        day_selected:
          "bg-primary text-white font-bold focus:bg-primary focus:text-white",
        day_today: "bg-red-300 text-[#FF5733] font-bold", // Ensure today's date has `text-primary`
        day_outside: "text-gray-300",
        day_disabled: "text-gray-300 pointer-events-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft {...props} className="h-5 w-5 text-gray-600" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight {...props} className="h-5 w-5 text-gray-600" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
