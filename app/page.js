"use client";
import Home from "@/components/Home";
import { useState } from "react";
import { useAuth } from "@/context/Authcontext";

export default function page() {
  

  const { user } = useAuth();
  return (
    <div>
      <Home />
    </div>
  );
}
