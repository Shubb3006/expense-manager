import Link from "next/link";
import React from "react";

const MonthExpenseCard = ({ month, total }) => {
  return (
    <Link href={`/expenses/${month}`} className="block cursor-pointer">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-200">{month}</h2>
        <p className="text-base text-green-600 dark:text-green-400 font-medium mt-2">
          Total: ₹{total}
        </p>
        <span className="inline-block mt-4 text-sm text-blue-600 dark:text-blue-200 font-semibold hover:underline">
          Show Data →
        </span>
      </div>
    </Link>
  );
};

export default MonthExpenseCard;
