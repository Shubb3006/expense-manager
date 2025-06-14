"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/Authcontext";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id);
        if (error) console.log(error.message);
        else {
          setProfile(data[0]);
        }
      }
    }
    fetchUser();
  }, [user]);

  return (
    <main className="flex flex-col items-center px-4 bg-gray-100 dark:bg-gray-700 min-h-[635px]">
      <div className="max-w-3xl text-center pt-30 md:pt-60 ">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome to SpendWise 🧾
        </h1>
        <p className="text-lg text-gray-600 mb-6 dark:text-white">
          Track your expenses, set budgets, and take control of your financial
          life — all in one place.
        </p>

        {user ? (
          <div>
            <p className="mb-4 text-green-700 font-semibold">
              Welcome back! {profile ? profile.display_name.toUpperCase() : ""}{" "}
              🎉
            </p>
            <Link
              href="/expenses"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Go to Expenses
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
