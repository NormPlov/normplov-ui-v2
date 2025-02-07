'use client';
import React, { useState, ReactNode } from 'react';
import { Field, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Option = {
  value: string | number;
  label: string;
};

type FieldProps = {
  type: string; // Type of the field (e.g., "text", "date", "select", "textarea", etc.)
  name: string; // Formik field name
  id: string; // Field ID
  placeholder?: string; // Placeholder for text inputs
  options?: Option[]; // Options for dropdown fields
  className?: string; // Additional CSS classes for styling
  icon?: ReactNode; // Optional icon component
  readOnly?: boolean; // Add readOnly prop here
};

const FieldProfile = ({ type, name, id, placeholder, options, className, icon, }: FieldProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { setFieldValue } = useFormikContext(); // Formik hook to set field value

  const fieldWrapperClasses = `relative flex items-center ${className}`;

  if (type === 'date') {
    // Render DatePicker for type "date"
    return (
      <div className={fieldWrapperClasses}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setFieldValue(name, date); // Update Formik value for date
          }}
          placeholderText={placeholder || 'Pick a date'}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-textprimary placeholder-gray-500"
        />
        {icon && <div className="absolute right-3 text-gray-400">{icon}</div>}
      </div>
    );
  }

  if (type === 'textarea') {
    // Render Textarea for type "textarea"
    return (
      <div className={fieldWrapperClasses}>
        <Field
          as="textarea"
          name={name}
          id={id}
          placeholder={placeholder}
          rows={4} // Adjust number of rows as needed
          className="mt-1 block w-full px-4 py-3 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-textprimary resize-none"
        />
      </div>
    );
  }

  if (type === 'select' && options) {
    // Render Select Dropdown for type "select"
    return (
      <div className={fieldWrapperClasses}>
        <select
          name={name}
          id={id}
          onChange={(e) => setFieldValue(name, e.target.value)} // Update Formik value for the select field
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-textprimary"
        >
          <option value="" disabled selected>
            {placeholder || 'Select an option'}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && <div className="absolute right-3 text-gray-400">{icon}</div>}
      </div>
    );
  }

  // Default Input Field
  return (
    <div className={fieldWrapperClasses}>
      <Field
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="mt-1 block w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-textprimary"
      />
      {icon && <div className="absolute right-3 text-gray-400">{icon}</div>}
    </div>
  );
};

export default FieldProfile;
