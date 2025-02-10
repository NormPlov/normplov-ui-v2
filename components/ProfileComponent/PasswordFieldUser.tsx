// import React, { useState } from "react";
// import { Field, FieldProps } from "formik";
// import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

// type PasswordFieldProps = {
//   name: string; // Field name
//   id: string; // ID for the input field
//   placeholder?: string; // Placeholder for the input
//   className?: string; // Additional custom styles for the input field
//   readOnly?: boolean; // Make the field read-only
//   onClick?: () => void; // Callback for onClick event
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback for onChange event
//   value?: string; // Value for the input
// };

// function PasswordFieldUser({
//   name,
//   id,
//   placeholder = "Enter password",
//   className = "",
//   readOnly = false, // Default is false
//   onClick, // Add onClick prop
//   onChange, // Add onChange prop
//   value, // Add value prop
// }: PasswordFieldProps) {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <div className="relative">
//       <Field name={name}>
//         {({ field }: FieldProps<string>) => (
//           <input
//             {...field} // Spread Formik's field props
//             type={showPassword ? "text" : "password"}
//             id={id}
//             className={`w-full text-textprimary py-3 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${className}`}
//             placeholder={placeholder}
//             readOnly={readOnly} // Apply the readOnly prop
//             onClick={onClick} // Trigger the onClick event
//             onChange={onChange || field.onChange} // Use provided onChange or default from Formik
//             value={value || field.value} // Use provided value or default from Formik
//           />
//         )}
//       </Field>
//       {showPassword ? (
//         <IoEyeSharp
//           onClick={handleTogglePassword}
//           className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-500"
//         />
//       ) : (
//         <IoEyeOffSharp
//           onClick={handleTogglePassword}
//           className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-500"
//         />
//       )}
//     </div>
//   );
// }

// export default PasswordFieldUser;

import React, { useState } from "react";
import { Field, FieldProps } from "formik";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

type PasswordFieldProps = {
  name: string; // Field name
  id: string; // ID for the input field
  placeholder?: string; // Placeholder for the input
  className?: string; // Additional custom styles for the input field
  readOnly?: boolean; // Make the field read-only
  disabled?: boolean; // Add disabled prop here
  onClick?: () => void; // Callback for onClick event
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback for onChange event
  value?: string; // Value for the input
};

function PasswordFieldUser({
  name,
  id,
  placeholder = "Enter password",
  className = "",
  readOnly = false, 
  disabled = false, // Default disabled to false
  onClick,
  onChange,
  value,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Field name={name}>
        {({ field }: FieldProps<string>) => (
          <input
            {...field}
            type={showPassword ? "text" : "password"}
            id={id}
            className={`w-full text-textprimary py-3 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${className}`}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}  // Apply the disabled prop here
            onClick={onClick}
            onChange={onChange || field.onChange}
            value={value || field.value}
          />
        )}
      </Field>
      {showPassword ? (
        <IoEyeSharp
          onClick={handleTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        />
      ) : (
        <IoEyeOffSharp
          onClick={handleTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        />
      )}
    </div>
  );
}

export default PasswordFieldUser;
