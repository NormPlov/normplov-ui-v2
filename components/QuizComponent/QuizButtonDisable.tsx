import React from 'react';

type Props = {
  title: string;
  type?: 'leftIcon' | 'rightIcon' | 'none';
  rounded?: 'full' | 'xl';
  outline?: 'true' | 'false';
  icon?: React.ReactNode;
  full?: true | false;
  color?: string;
  onClick?: () => void;
  disabled?: boolean; // Add disabled prop
  className?: string; // Add className prop
};

export const QuizButtonDisable = ({
  title,
  type = 'none',
  rounded = 'xl',
  outline = 'false',
  icon,
  full = false,
  color = '',
  onClick,
  disabled = false, // Default to false
  className = '', // Default empty string
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled} // Set the disabled attribute
      className={`flex items-center justify-center gap-2 font-semibold
        ${rounded === 'xl' ? 'rounded-xl' : 'rounded-full'}
        ${full ? 'w-full py-2' : 'px-4 py-2'}
        ${
          disabled
            ? 'bg-primary text-white cursor-not-allowed' // Disabled styles
            : `${outline === 'true' ? 'bg-primary border-2 border-primary text-primary' : 'bg-primary text-white'} hover:opacity-80`
        }
        ${className}`} // Allow custom classes
      style={{
        backgroundColor:
          outline === 'true' ? 'bg-red-100' : disabled ? 'bg-primary' : color,
      }}
    >
      {/* Left Icon */}
      {type === 'leftIcon' && icon && <span className="mr-1">{icon}</span>}

      {/* Button Title */}
      <span>{title}</span>

      {/* Right Icon */}
      {type === 'rightIcon' && icon && <span className="ml-1">{icon}</span>}
    </button>
  );
};
