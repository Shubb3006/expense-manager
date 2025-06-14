"use client";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg dark:text-white">
        Checking authentication...
      </div>
    );
  }

  return children;
}
