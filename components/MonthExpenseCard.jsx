import Link from "next/link";

export default function MonthExpenseCard({ month, total }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <Link href={`/expenses/${month}`} className="block cursor-pointer">
        <h2 className="text-xl font-bold text-indigo-700">{month}</h2>
        <p className="text-base text-green-600 font-medium mt-2">
          Total: ₹{total}
        </p>
        <span className="inline-block mt-4 text-sm text-blue-600 font-semibold hover:underline">
          Show Data →
        </span>
      </Link>
    </div>
  );
}
