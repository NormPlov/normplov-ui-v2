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

type SelectDemoProps = {
  selectedGender: string | null;
  onGenderChange: (gender: string) => void;
};

export function SelectDemo({ selectedGender, onGenderChange }: SelectDemoProps) {
  return (
    <Select
      value={selectedGender || undefined} // Pass undefined when no gender is selected
      onValueChange={onGenderChange}
    >
      <SelectTrigger className="w-full h-12 mt-1 bg-white border-slate-200 text-textprimary text-md">
        <SelectValue placeholder="ជ្រើសរើសភេទ" />
      </SelectTrigger>
      <SelectContent className="text-slate-600">
        <SelectGroup>
          <SelectLabel>ភេទ</SelectLabel>
          <SelectItem value="Female">ស្រី</SelectItem>
          <SelectItem value="Male">ប្រុស</SelectItem>
          <SelectItem value="Other">ផ្សេងៗ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
