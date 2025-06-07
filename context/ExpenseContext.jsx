"use client";
import React from "react";
import { useContext, createContext, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [monthname, setMonthName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortOrderAmount, setSortOrderAmount] = useState("");
  return (
    <ExpenseContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter,
        searchTerm,
        setSearchTerm,
        monthname,
        setMonthName,
        sortOrder,
        setSortOrder,
        sortOrderAmount,
        setSortOrderAmount,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
