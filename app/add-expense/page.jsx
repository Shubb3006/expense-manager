"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.trim().length === 0) {
      alert("Title cannot be blank");
      return;
    }
    if (amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    const createdAt = date ? new Date(date) : new Date();

    const { error } = await supabase.from("expenses").insert({
      title: title.trim(),
      amount: Number(amount),
      note: note.trim(),
      category: category || "Others",
      user_id: user?.id,
      created_at: createdAt.toISOString(),
    });

    if (error) {
      console.error("Error saving expense:", error.message);
      alert("Error saving expense.");
    } else {
      alert("Expense saved successfully!");
      setTitle("");
      setAmount("");
      setNote("");
      setDate("");
      setCategory("");
    }

    setLoading(false);
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto mt-6 p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg font-sans sm:mt-60 xl:mt-6 transition-all">
        <h1 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-red-400 to-yellow-400 dark:from-red-600 dark:to-yellow-500 py-3 rounded-md uppercase tracking-wide mb-6">
          Add Expense
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition hover:cursor-pointer disabled:bg-gray-500 disabled:hover:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
