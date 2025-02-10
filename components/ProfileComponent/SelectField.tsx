import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTranslations } from "next-intl";
// type SelectDemoProps = {
//   selectedGender: string | null;
//   onGenderChange: (gender: string) => void;
// };

// export function SelectDemo({ selectedGender, onGenderChange }: SelectDemoProps) {
//   const t = useTranslations();
//   return (
//     <Select
//       value={selectedGender || undefined} // Pass undefined when no gender is selected
//       onValueChange={onGenderChange}
//     >
//       <SelectTrigger className={`w-full h-12 mt-1 bg-white border-slate-200 text-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
//           selectedGender ? "text-textprimary": "text-gray-400"
//         }`}>
//         <SelectValue placeholder="ជ្រើសរើសភេទ"
//           className={selectedGender ? "text-textprimary" : "text-gray-400"}/>
//       </SelectTrigger>
//       <SelectContent className="text-slate-600 ">
//         <SelectGroup>
//           <SelectLabel>{t("ProfileAboutUser.form.fields.gender.label")}</SelectLabel>
//           <SelectItem value="Female">ស្រី</SelectItem>
//           <SelectItem value="Male">ប្រុស</SelectItem>
//           <SelectItem value="Other">ផ្សេងៗ</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }

type SelectDemoProps = {
  selectedGender: string | null;
  onGenderChange: (gender: string) => void;
  disabled?: boolean; // Add disabled prop
};

export function SelectDemo({ selectedGender, onGenderChange, disabled = false }: SelectDemoProps) {
  const t = useTranslations();

  const handleGenderChange = (gender: string) => {
    if (!disabled) {
      onGenderChange(gender);  // Only trigger change if not disabled
    }
  };

  return (
    <Select
      value={selectedGender || undefined}
      onValueChange={handleGenderChange}
      disabled={disabled} // Disable the select component
    >
      <SelectTrigger
        className={`w-full h-12 mt-1 border-slate-200 text-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
          selectedGender ? "text-textprimary" : "text-gray-400"
        } ${
          disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"
        }`}
      >
        <SelectValue
          placeholder="ជ្រើសរើសភេទ"
          className={selectedGender ? "text-textprimary" : "text-gray-400"}
        />
      </SelectTrigger>
      <SelectContent className={`text-slate-600 ${disabled ? "hidden" : ""}`}>
        <SelectGroup>
          <SelectLabel>{t("ProfileAboutUser.form.fields.gender.label")}</SelectLabel>
          <SelectItem value="Female">ស្រី</SelectItem>
          <SelectItem value="Male">ប្រុស</SelectItem>
          <SelectItem value="Other">ផ្សេងៗ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
