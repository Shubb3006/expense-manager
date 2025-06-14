"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErr(true);
        setMessage(error.message);
      } else {
        setErr(false);
        setMessage("Successfully logged in!");
        router.push("/");
      }
    } else {
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email.toLowerCase());

      if (existingUser.length > 0) {
        setErr(true);
        setMessage("Email already registered. Please log in.");
        setLoading(false);
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setErr(true);
        setMessage(signUpError.message);
        setLoading(false);
        return;
      }

      if (signUpData.user) {
        await supabase.from("profiles").insert([
          {
            id: signUpData.user.id,
            display_name: name.toLowerCase(),
            email: signUpData.user.email.toLowerCase(),
          },
        ]);

        setEmail("");
        setName("");
        setPassword("");
        setPassVisible(false);

        setErr(false);
        setMessage("Account created successfully! Please check your email.");
      }
    }
    setLoading(false);
  }

  const handleBlur = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (password.length < 6) {
      setErr("Password Length must be greater than or equal to 6.");
    } else if (!regex.test(password) && password.length !== 0) {
      setErr("Password must contain both letters and numbers.");
    } else {
      setErr("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] lg:min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type={passVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
              onBlur={handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={passVisible}
              onChange={() => setPassVisible(!passVisible)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700 dark:text-gray-300">
              Show Password
            </label>
          </div>

          {err && (
            <p className="text-sm text-center text-red-600 mt-1">{err}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition disabled:bg-gray-400"
          >
            {isLogin
              ? loading
                ? "Logging in..."
                : "Login"
              : loading
              ? "Signing up..."
              : "Sign Up"}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Log in"}
          </button>

          {message && (
            <p
              className={`mt-4 text-sm ${
                err ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
