import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useTheme } from 'next-themes'; // Import useTheme hook to get current theme

export const Button = ({
  disabled,
  label,
  className,
  onClick = () => {},
}) => {
  const { theme } = useTheme(); // Get the current theme (dark or light)

  // Define default classes for light and dark mode
  const defaultClassName = `w-2/3 px-4 py-2 rounded-xl disabled:bg-blue-700 
    ${theme === 'dark' ? 'bg-black text-white' : 'bg-blue-500 text-white'} 
    transition-all duration-300 ease-in-out hover:bg-blue-400`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className ? className : defaultClassName}
    >
      {disabled ? <ClipLoader size={16} /> : label}
    </button>
  );
};

export default Button;
