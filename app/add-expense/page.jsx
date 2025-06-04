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
  // const [profile, setProfile] = useState(null);
  const [date, setDate] = useState("");

  const { user } = useAuth();
  useEffect(() => {
    if (!user) router.push("login");
  }, []);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", user.id);
  //     if (error) console.log(error.message);
  //     else {
  //       setProfile(data[0]);
  //     }
  //   }
  //   fetchUser();
  // }, []);

  // Get current date
  const today = new Date();

  // Extract day, month, and year
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  // Add leading zero to day and month if needed
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Format the date as dd/mm/yyyy
  const formattedDate = `${month}-${day}-${year}`;

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("expenses").insert({
      title,
      amount,
      note,
      user_id: user.id,
      created_at: date ? date : formattedDate,
    });
    if (error) console.log(error.message);
    else {
      alert("New Expense Saved");
      setTile("");
      setamount("");
      setNote("");
      setDate("");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-100 rounded-xl shadow-lg font-sans">
      

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
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
