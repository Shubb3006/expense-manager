"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import MonthExpenseCard from "@/components/MonthExpenseCard";

const page = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.log(error.message);
    else setExpenses(data);
  }

  useEffect(() => {
    async function fetchAllData() {
      if (!user) router.push("/login");
      await fetchExpenses();
      setLoading(false);
    }
    fetchAllData();
  }, []);

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

  const groupedExpenses = groupByMonth(expenses);

  return (
    <div className="max-w-4xl mx-auto mt-5 md:mt-10 p-5 bg-gray-100 rounded-xl shadow-lg font-sans">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="bg-white text-gray-600 text-lg px-6 py-4 rounded-lg shadow-md animate-pulse">
            Fetching Expenses...
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mt-2 mb-8">
            All Expenses
          </h2>

          {expenses.length === 0 && (
            <p className="text-center text-gray-500 text-base mt-6">
              No expenses found.
            </p>
          )}

          <div
            className="grid gap-6 max-h-[375px] overflow-y-auto px-2 mb-6
                  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  sm:max-h-[400px]"
          >
            {Object.keys(groupedExpenses).map((month) => {
              const total = groupedExpenses[month].reduce(
                (sum, expense) => sum + expense.amount,
                0
              );

              return (
                <MonthExpenseCard key={month} month={month} total={total} />
              );
            })}
          </div>

          <div className="text-center bg-green-100 text-green-800 font-semibold py-3 rounded-md shadow-md mt-6">
            Total Expenses: ₹
            {expenses.reduce((acc, exp) => acc + exp.amount, 0)}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
