import React from "react";
import { useExpenseContext } from "@/context/ExpenseContext";
const FilterBar = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    sortOrderAmount,
    setSortOrderAmount,
  } = useExpenseContext();
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around mb-6">
        <div className="flex flex-row">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-300 text-gray-800 text-sm sm:text-base rounded-md px-4 py-2 pr-10 focus:outline-none cursor-pointer appearance-none transition-all"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='currentColor' class='chevron-down' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <select
            value={sortOrderAmount}
            onChange={(e) => setSortOrderAmount(e.target.value)}
            className="bg-white border w-full border-gray-300 text-gray-800 text-sm sm:text-base rounded-md px-4 py-2 pr-10 focus:outline-none cursor-pointer appearance-none transition-all"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='currentColor' class='chevron-down' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            <option value="">Default</option>
            <option value="high">Highest Amount</option>
            <option value="low">Lowest Amount</option>
          </select>
        </div>
        <div className="flex flex-row">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border w-full border-gray-300 text-gray-800 text-sm sm:text-base rounded-md px-4 py-2 pr-10 focus:outline-none cursor-pointer appearance-none transition-all"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='currentColor' class='chevron-down' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            <option
              value=""
              className="border p-2 rounded hover:cursor-pointer"
            >
              All Categories
            </option>
            <option
              value="Food"
              className="border p-2 rounded hover:cursor-pointer"
            >
              Food
            </option>
            <option
              value="Travel"
              className="border p-2 rounded hover:cursor-pointer"
            >
              Travel
            </option>
            <option
              value="Shopping"
              className="border p-2 rounded hover:cursor-pointer"
            >
              Shopping
            </option>
            <option
              value="Bills"
              className="border p-2 rounded hover:cursor-pointer"
            >
              Bills
            </option>
            <option
              value="Other"
              className="border p-2 rounded hover:cursor-pointer"
            >
              Other
            </option>
          </select>

          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
