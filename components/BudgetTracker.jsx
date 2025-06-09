import React, { useState } from "react";

const BudgetTracker = ({ expenses }) => {
  const [budget, setBudget] = useState(45000);
  const [inputBudget, setInputBudget] = useState(budget);

  const spentThisMonth = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleBudgetChange = () => {
    setBudget(Number(inputBudget));
  };

  const percentage = Math.min((spentThisMonth / budget) * 100, 100);

  return (
    <div className="p-4 border rounded mb-8 bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">Monthly Budget</h3>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          value={inputBudget}
          onChange={(e) => setInputBudget(e.target.value)}
          className="border px-3 py-1 rounded w-32"
          min={0}
        />
        <button
          onClick={handleBudgetChange}
          className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        >
          Set Budget
        </button>
      </div>

      <p className="mb-2">
        Spent this month: ₹{spentThisMonth.toFixed(2)} / ₹{budget}
      </p>

      <progress
        value={spentThisMonth}
        max={budget}
        className="w-full h-5 rounded overflow-hidden"
        style={{ accentColor: percentage > 90 ? "red" : "#6366f1" }}
      ></progress>

      {percentage > 90 && percentage < 100 && (
        <p className="mt-2 text-red-600 font-semibold">
          You are close to your budget limit!
        </p>
      )}

      {percentage === 100 && (
        <p className="mt-2 text-red-600 font-semibold">
          You have spent more than your budget already
        </p>
      )}
    </div>
  );
};

export default BudgetTracker;
