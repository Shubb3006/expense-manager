"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [title, setTile] = useState("");
  const [amount, setamount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  useEffect(() => {
    if (!user) router.push("login");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.trim().length === 0) {
      alert("Title cannot be blank");
      return;
    }
    if (amount <= 0) {
      alert("Fill the right amount");
      return;
    }
    setLoading(true);

    const createdAt = date ? new Date(date) : new Date();
    const { data, error } = await supabase.from("expenses").insert({
      title: title.trim(),
      amount: Number(amount),
      note: note.trim(),
      user_id: user.id,
      created_at: createdAt.toISOString(),
    });
    if (error) console.log(error.message);
    else {
      alert("New Expense Saved");
      setTile("");
      setamount("");
      setNote("");
      setDate("");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 p-8 bg-gray-100 rounded-xl shadow-lg font-sans sm:mt-60 xl:mt-6">
      <h1 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-red-400 to-yellow-400 py-3 rounded-md uppercase tracking-wide mb-6">
        Add Expense
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            onChange={(e) => setamount(e.target.value)}
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition hover:cursor-pointer disabled:bg-gray-500 disabled:hover:cursor-no-drop"
        >
          {loading ? "Saving" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default page;
