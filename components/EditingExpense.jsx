"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react";

const EditingExpense = ({ expense, setIsEditingNote, fetchExpenses }) => {
  const [title, setTile] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [note, setNote] = useState(expense.note);
  const [category, setCategory] = useState(expense.category || "");
  const [loading, setLoading] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("expenses")
      .update({
        title: title.trim(),
        amount,
        note: note.trim(),
        category: category,
      })
      .eq("id", expense.id);
    if (error) console.log(error);
    else console.log("Edited");
    await fetchExpenses();
    setLoading(false);
    setIsEditingNote(null);
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsEditingNote(null);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [setIsEditingNote]);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn text-black dark:text-white">
        <button
          onClick={() => setIsEditingNote(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-red-400 to-yellow-400 py-3 rounded-md uppercase tracking-wide mb-6">
          Edit Expense
        </h1>

        <form onSubmit={handleEdit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTile(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full cursor-pointer bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="" className="cursor-pointer">
              Select category
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition hover:cursor-pointer disabled:bg-gray-500 disabled:hover:cursor-no-drop"
          >
            {loading ? "Saving changes" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditingExpense;
