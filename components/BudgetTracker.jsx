import React, { useState } from "react";

const BudgetTracker = ({ expenses }) => {
  const [budget, setBudget] = useState(45000);
  const [inputBudget, setInputBudget] = useState(budget);

  const spentThisMonth = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const percentage = Math.min((spentThisMonth / budget) * 100, 100);

  const handleBudgetChange = (e) => {
    e.preventDefault();
    setBudget(Number(inputBudget));
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl transition-all">
      <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
        💰 Monthly Budget Tracker
      </h3>

      <form
        onSubmit={handleBudgetChange}
        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
      >
        <input
          type="number"
          value={inputBudget}
          onChange={(e) => setInputBudget(e.target.value)}
          className="border border-indigo-300 dark:border-indigo-500 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-700 dark:text-white bg-white dark:bg-gray-700 shadow-sm w-full sm:w-40"
          min={0}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-all shadow"
        >
          Update Budget
        </button>
      </form>

      <div className="mb-3 text-gray-800 dark:text-gray-200 font-medium">
        You’ve spent:{" "}
        <span className="font-semibold text-rose-600 dark:text-rose-400">
          ₹{spentThisMonth.toFixed(2)}
        </span>{" "}
        /{" "}
        <span className="text-indigo-700 dark:text-indigo-300">
          ₹{budget}
        </span>
      </div>

      <div className="w-full bg-indigo-100 dark:bg-gray-600 h-5 rounded-full overflow-hidden shadow-inner">
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full transition-all duration-700 ease-in-out ${
            percentage > 90 ? "bg-red-500" : "bg-indigo-500"
          }`}
        ></div>
      </div>

      {percentage > 90 && percentage < 100 && (
        <p className="mt-4 text-sm font-semibold text-yellow-600 dark:text-yellow-400 animate-pulse">
          ⚠️ You are close to your budget limit!
        </p>
      )}

      {percentage === 100 && (
        <p className="mt-4 text-sm font-semibold text-red-700 dark:text-red-400 animate-pulse">
          🚨 You’ve exceeded your budget limit!
        </p>
      )}
    </div>
  );
};

export default BudgetTracker;
