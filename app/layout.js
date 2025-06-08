import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/Authcontext";
import { ExpenseProvider } from "@/context/ExpenseContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expense-Manager",
  icons: {
    icon: "/favicon.ico",
  },
  description: "Expense Manager for working Professionals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ExpenseProvider>
            <Navbar />
            {children}
          </ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
