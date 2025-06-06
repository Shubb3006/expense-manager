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
      // Optional: Redirect to login or homepage
      router.push("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between md:items-center">
        {/* Logo and Toggle Button (always at top for mobile) */}
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

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-row justify-center gap-2 md:flex md:flex-row md:items-center w-full md:w-auto mt-4 md:mt-0 space-y-3 md:space-y-0 md:space-x-6`}
        >
          <Link href="/" className={ pathName==="/" ? `text-yellow-400` : `hover:text-yellow-400`}>
            Home
          </Link>
          <Link
            // href={user ? "/expenses" : "/login"}
            href={"/expenses"}
            className={ pathName==="/expenses" || pathName.startsWith("/expenses") ? `text-yellow-400` : `hover:text-yellow-400`}
          >
            Expenses
          </Link>
           <Link href="/add-expense" className={ pathName==="/add-expense"? `text-yellow-400` : `hover:text-yellow-400`}>
                AddExpense
              </Link>
          {!user ? (
            <Link href="/login" className={ pathName==="/login" ? `text-yellow-400` : `hover:text-yellow-400`}>
              Login
            </Link>
          ) : (
            <>
             
              <a
                onClick={handleLogout}
                className="hover:text-red-400 hover:cursor-pointer"
              >
                Logout
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
