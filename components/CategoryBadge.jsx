import React from "react";

const CategoryBadge = ({ category }) => {
  function getCategoryIcon(category) {
    switch (category) {
      case "Shopping":
        return (
          <svg
            className="w-4 h-4 text-pink-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 8h14l-1.5 10.5a2 2 0 01-2 1.5H8.5a2 2 0 01-2-1.5L5 8zm3-4a4 4 0 018 0v4H8V4z" />
          </svg>
        );
      case "Bills":
        return (
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 14h6m-6 4h6m-7 4h8a2 2 0 002-2V4a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2z" />
          </svg>
        );
      case "Food":
        return (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 10h16M4 14h16M5 6h14a2 2 0 012 2v1H3V8a2 2 0 012-2zM3 16h18a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        );
      case "Travel":
        return (
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10.5 21v-6l-7-4V9l7-4V1l12 10-12 10z" />
          </svg>
        );
      case "Health & Fitness":
        return (
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 6v3H2v6h4v3m12-12v3h4v6h-4v3M9 12h6" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4zM8 8h8v8H8z" />
          </svg>
        );
    }
  }

  const categoryStyles = {
    Shopping: "bg-pink-50 text-pink-700 border-pink-200",
    Bills: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Food: "bg-green-50 text-green-700 border-green-200",
    Travel: "bg-blue-50 text-blue-700 border-blue-200",
    Others: "bg-gray-50 text-gray-700 border-gray-200",
    "Health & Fitness": "bg-brown-50 text-brown-700 border-red-200",
  };

  const styleClasses = categoryStyles[category] || categoryStyles["Others"];

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border shadow-sm select-none ${styleClasses}`}
    >
      {getCategoryIcon()}
      {category}
    </span>
  );
};

export default CategoryBadge;
