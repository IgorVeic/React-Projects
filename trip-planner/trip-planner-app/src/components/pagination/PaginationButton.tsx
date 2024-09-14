import React from "react";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}

const PaginationButton = ({
  onClick,
  disabled,
  children,
  className,
}: PaginationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 bg-white hover:bg-gray-200 text-green-500 rounded-full disabled:opacity-50 ${className}`}
      style={{
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
