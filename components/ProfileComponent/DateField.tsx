"use client";

import React, { useState, useEffect } from "react";
import { format, parseISO, isValid, differenceInYears } from "date-fns";
import { toast } from "react-toastify"; // Import toast
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "react-day-picker/dist/style.css";

type DatePickerDemoProps = {
  selectedDate: string | null | undefined;
  onDateChange: (date: Date | undefined) => void;
};

export function DatePickerDemo({ selectedDate, onDateChange }: DatePickerDemoProps) {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate && typeof selectedDate === "string" && isValid(parseISO(selectedDate))
      ? new Date(parseISO(selectedDate).toISOString()) // Ensure the date is correctly normalized
      : undefined
  );
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (date) {
      setInputValue(format(date, "yyyy-MM-dd")); // Update input value when date changes
    }
  }, [date]);

  const handleDateValidation = (selected: Date): boolean => {
    const age = differenceInYears(new Date(), selected); // Calculate age
    if (age < 13) {
      toast.error("You must be at least 13 years old."); // Show warning message
      return false;
    }
    return true;
  };

  const handleDateChange = (selected: Date | undefined) => {
    if (selected) {
      // Validate age before updating
      if (!handleDateValidation(selected)) return;

      // Normalize selected date to midnight UTC to avoid timezone offset issues
      const normalizedDate = new Date(Date.UTC(selected.getFullYear(), selected.getMonth(), selected.getDate()));
      setDate(normalizedDate);
      onDateChange(normalizedDate);
    } else {
      setDate(undefined);
      onDateChange(undefined);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputValue(input);

    const parsedDate = parseISO(input);
    if (isValid(parsedDate)) {
      const normalizedDate = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));

      // Validate age before updating
      if (!handleDateValidation(normalizedDate)) return;

      setDate(normalizedDate);
      onDateChange(normalizedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
            className="w-full h-12 pl-4 mt-1 pr-12 text-left font-normal border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-textprimary placeholder-gray-400 text-md rounded-xl"
          />
          <CalendarDays className="absolute right-3 top-3 h-6 w-6 cursor-pointer text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white rounded-xl shadow-sm">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          fromMonth={new Date("1900-01-01")}
          toMonth={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
