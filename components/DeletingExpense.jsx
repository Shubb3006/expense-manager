"use client";
import { supabase } from "@/lib/supabase";
import React, { useState,useEffect } from "react";

const DeletingExpense = ({ id, setIsDeleting, fetchExpenses }) => {
  const [loading, setLoading] = useState(false);

  async function handleDelete(id) {
    setLoading(true);
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) console.log(error.message);
    else {
      console.log("Deleted");
      await fetchExpenses();
    }
    setLoading(false);
    setIsDeleting(null);
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsDeleting(false);
      if (e.key === "Enter") {
        handleDelete(id); // if `id` and `handleDelete` are accessible
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [setIsDeleting]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center space-y-5 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800">
          Are you sure you want to delete this expense?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleDelete(id)}
            disabled={loading}
            className={`px-5 py-2 rounded-md text-white font-medium transition hover:cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => setIsDeleting(false)}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletingExpense;
