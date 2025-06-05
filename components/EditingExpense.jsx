"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react"; // Optional: for a close icon

const EditingExpense = ({ expense, setIsEditingNote, fetchExpenses }) => {
  const [title, setTile] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [note, setNote] = useState(expense.note);
  const [loading, setLoading] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("expenses")
      .update({ title: title.trim(), amount, note: note.trim() })
      .eq("id", expense.id);
    if (error) console.log(error);
    else console.log("Edited");
    await fetchExpenses();
    setLoading(false);
    setIsEditingNote(null);
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setIsEditingNote(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-red-400 to-yellow-400 py-3 rounded-md uppercase tracking-wide mb-6">
          Edit Expense
        </h1>

        <form onSubmit={handleEdit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTile(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
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
