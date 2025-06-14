"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/Authcontext";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/login");
    }

    setIsLogout(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!isLogout) return;
      if (e.key === "Escape") setIsLogout(false);
      if (e.key === "Enter") {
        const active = document.activeElement;
        const isInsideModal = active?.closest(".logout-modal");
        if (isInsideModal) handleLogout();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isLogout]);

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white shadow-md">
      {isLogout && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="logout-modal relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-[75%] sm:w-full max-w-md p-6 animate-fadeIn text-black dark:text-white">
            <button
              onClick={() => setIsLogout(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">
              Do you really want to log out?
            </h2>

            <div className="flex justify-center gap-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150 cursor-pointer"
              >
                Logout
              </button>
              <button
                onClick={() => setIsLogout(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition duration-150 cursor-pointer"
              >
                Stay Signed In
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between md:items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="text-xl font-bold">Expense Tracker</h1>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-row justify-center gap-2 md:flex md:flex-row md:items-center w-full md:w-auto mt-4 md:mt-0 space-y-3 md:space-y-0 md:space-x-6`}
        >
          <Link
            href="/"
            className={
              pathName === "/" ? `text-yellow-400` : `hover:text-yellow-400`
            }
          >
            Home
          </Link>
          <Link
            href="/expenses"
            className={
              pathName === "/expenses" || pathName.startsWith("/expenses")
                ? `text-yellow-400`
                : `hover:text-yellow-400`
            }
          >
            Expenses
          </Link>
          <Link
            href="/add-expense"
            className={
              pathName === "/add-expense"
                ? `text-yellow-400`
                : `hover:text-yellow-400`
            }
          >
            AddExpense
          </Link>
          {!user ? (
            <Link
              href="/login"
              className={
                pathName === "/login"
                  ? `text-yellow-400`
                  : `hover:text-yellow-400`
              }
            >
              Login
            </Link>
          ) : (
            <a
              onClick={() => setIsLogout(true)}
              className="hover:text-red-400 hover:cursor-pointer"
            >
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
