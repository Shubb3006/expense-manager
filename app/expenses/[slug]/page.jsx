"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const page = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionloading, setActionLoading] = useState(false);
  const { slug } = useParams();
  let month = slug.split("%20");
  const monthname = month.join(" ");

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.log(error.message);
    else setExpenses(data);
  }

  function groupByMonth(expenses) {
    const grouped = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.created_at);
      const monthKey = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }); // e.g., "June 2025"

      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(expense);
    });

    return grouped;
  }

  useEffect(() => {
    async function fetchAllData() {
      await fetchExpenses();
      setLoading(false);
    }

    fetchAllData();
  }, []);

  async function handleDelete(id) {
    console.log(id);
    setActionLoading(true);
    const { data, error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);
    if (error) console.log(error.message);
    else {
      console.log("Deleted");
      fetchExpenses();
    }
    setActionLoading(false);
  }

  const monthlyexpenses = groupByMonth(expenses)[monthname];
  const totalAmount =
    monthlyexpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:pt-8">
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="text-lg text-gray-600 font-medium animate-pulse bg-white px-6 py-4 rounded-lg shadow">
            Fetching Expenses... for this month
          </div>
        </div>
      ) : (
        <div key={month} className="sm:mb-8 bg-gray-100 pb-5 pt-5 rounded-lg shadow">
          <h2 className="text-3xl font-extrabold text-center text-black-700 mb-6">
            {monthname}
          </h2>
          <ul className="space-y-4 p-2 overflow-auto max-h-100 ">
            {monthlyexpenses?.map((expense) => {
              return (
                <li
                  key={expense.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left - Title & Note */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-semibold text-gray-800 truncate">
                        {expense.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {expense.note}
                      </p>
                    </div>

                    {/* Center - Buttons */}
                    <div className="flex-shrink-0 flex gap-3 items-center">
                      <button
                        disabled={actionloading}
                        className={`px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 hover:cursor-pointer
                        ${
                          actionloading
                            ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
                            : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        disabled={actionloading}
                        onClick={() => handleDelete(expense.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 hover:cursor-pointer
                        ${
                          actionloading
                            ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
                            : "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                        }`}
                      >
                        Delete
                      </button>
                    </div>

                    {/* Right - Amount & Date */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-rose-600">
                        ₹{expense.amount}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {expense.created_at.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 text-center">
            <div className="inline-block bg-green-100 text-green-800 font-semibold sm:text-lg text-sm px-6 py-3 rounded-xl shadow-md">
              Total Expenses for {monthname}: ₹{totalAmount}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
