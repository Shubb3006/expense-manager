"use client";
import Home from "@/components/Home";
import { useAuth } from "@/context/Authcontext";

export default function page() {
  

  const { user } = useAuth();
  return (
    <div>
      <Home />
    </div>
  );
}
