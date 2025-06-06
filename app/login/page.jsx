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
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
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
      const { data: existingUser, error: existingUserError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email.toLowerCase());

      if (existingUser.length>0) {
        setErr(true);
        setMessage("Email already registered. Please log in.");
        setLoading(false);
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        setErr(true);
        setMessage(signUpError.message);
        setLoading(false);
        return;
      }
      if (signUpData.user) {
        const { data: insertedProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              id: signUpData.user.id,
              display_name: name,
              email: signUpData.user.email.toLowerCase(),
            },
          ])
          .select();
        console.log("Inserted profile:", insertedProfile);
        console.log("Inserted error:", insertError);

        setEmail("");
        setName("");
        setPassword("");

        setErr(false);
        setMessage("Account created successfully! Please check your email.");
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md   rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:hover:cursor-pointer"
          >
            {isLogin
              ? loading
                ? "Logging...."
                : "Login"
              : loading
              ? "Signing Up...."
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
