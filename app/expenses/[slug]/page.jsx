"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EditingExpense from "@/components/EditingExpense";
import DeletingExpense from "@/components/DeletingExpense";
import CategoryBadge from "@/components/CategoryBadge";

const page = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [actionloading, setActionLoading] = useState(false);
  const [isEditingnote, setIsEditingnote] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { slug } = useParams();
  let month = slug.split("%20");
  const monthname = month.join(" ");

  function getMonthRange(monthString) {
    // monthString = "June 2025"
    const [monthName, year] = monthString.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

    const startDate = new Date(year, monthIndex, 1); // First day of the month
    const endDate = new Date(year, monthIndex + 1, 1); // First day of next month

    return {
      startDate: startDate.toISOString(), // formatted for Supabase
      endDate: endDate.toISOString(),
    };
  }
  const { startDate, endDate } = getMonthRange(monthname);

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .gt("created_at", startDate)
      .lt("created_at", endDate)
      .order("created_at", { ascending: false });
    if (error) console.log(error.message);
    else setExpenses(data);
  }
  useEffect(() => {
    fetchExpenses().then(() => setLoading(false));
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      categoryFilter === "" || expense.category === categoryFilter;

    const matchesSearch =
      expense.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    return matchesCategory && matchesSearch;
  });

  const totalAmount =
    filteredExpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;

  //grouping with respectr of date
  const groupedByDate = filteredExpenses.reduce((acc, expense) => {
    const date = expense.created_at.split("T")[0]; // e.g., "2025-06-04"
    if (!acc[date]) acc[date] = [];
    acc[date].push(expense);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="max-w-4xl mt-2 mx-auto px-4 sm:pt-8 lg:max-h-[90vh]">
      {isEditingnote && (
        <EditingExpense
          expense={isEditingnote}
          setIsEditingNote={setIsEditingnote}
          fetchExpenses={fetchExpenses}
        />
      )}
      {isDeleting && (
        <DeletingExpense
          id={isDeleting}
          setIsDeleting={setIsDeleting}
          fetchExpenses={fetchExpenses}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="text-lg text-gray-600 font-medium animate-pulse bg-white px-6 py-4 rounded-lg shadow">
            Fetching Expenses... for this month
          </div>
        </div>
      ) : (
        <div
          key={month}
          className="sm:mb-8  bg-gray-100 pb-5 pt-5 rounded-lg shadow lg:max-h-[90vh]"
        >
          <h2 className="text-3xl font-extrabold text-center text-black-700 mb-6">
            {monthname}
          </h2>
          <div className="space-y-6 px-2 sm:px-4 overflow-y-auto max-h-[65vh] sm:max-h-[60vh] md:max-h-[70vh] xl:max-h-[60vh]">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border p-2 rounded hover:cursor-pointer"
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
                className="border p-2 rounded flex-grow"
              />
            </div>
            {sortedDates.map((date) => (
              <div key={date}>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  {new Date(date).toDateString()}
                </h3>

                <ul className="space-y-4">
                  {groupedByDate[date].map((expense) => (
                    <li
                      key={expense.id}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-xl font-semibold text-gray-800 truncate">
                            {expense.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 truncate">
                            {expense.note}
                          </p>
                          {expense.category && (
                            <CategoryBadge category={expense.category} />
                          )}
                        </div>
                        <div className="flex-shrink-0 flex gap-3 items-center">
                          <button
                            onClick={() => setIsEditingnote(expense)}
                            className="px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 hover:cursor-pointer bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setIsDeleting(expense.id)}
                            className="px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 hover:cursor-pointer bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-rose-600">
                            ₹{expense.amount}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <div className="inline-block bg-green-100 text-green-800 font-semibold sm:text-lg text-sm px-6 py-3 rounded-xl shadow-md">
              Total Expenses  {categoryFilter ? `for ${categoryFilter}` : ""} in {monthname}: ₹{totalAmount}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
