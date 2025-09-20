"use client";

import {
  TrendingUp,
  Wallet,
  Users,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

// Type Definitions
interface MemberData {
  name: string;
  totalContributions: number;
  nextPayout: number;
  payoutPosition: string;
  completedCycles: number;
}

interface Transaction {
  type: string;
  group: string;
  amount: number;
  date: string;
}

interface ScheduleProps {
  memberData?: MemberData;
  transactions?: Transaction[];
  groupName?: string;
}

// Utility to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);

// Reusable StatCard Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${color}`}
    role="region"
    aria-label={title}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full bg-opacity-20 ${color}`}>
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-gray-600 text-sm">{title}</p>
  </div>
);

export default function Schedule({
  memberData,
  transactions = [],
  groupName,
}: ScheduleProps) {
  const [isLoading, setIsLoading] = useState(false); // Mock loading state

  return (
    <div className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Schedule{" "}
          {groupName && (
            <span className="text-indigo-600">· {groupName}</span>
          )}
        </h1>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-1">
          Welcome back, {memberData?.name ?? "Member"}!
        </h2>
        <p className="text-gray-700">
          Track your savings journey and upcoming payouts
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 p-6 rounded-2xl h-32"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Contributions"
            value={formatCurrency(memberData?.totalContributions ?? 0)}
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            color="bg-green-100"
          />
          <StatCard
            title="Next Payout"
            value={formatCurrency(memberData?.nextPayout ?? 0)}
            icon={<Wallet className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Position in Queue"
            value={memberData?.payoutPosition ?? "-"}
            icon={<Users className="w-6 h-6 text-purple-600" />}
            color="bg-purple-100"
          />
          <StatCard
            title="Completed Cycles"
            value={memberData?.completedCycles ?? 0}
            icon={<CheckCircle className="w-6 h-6 text-orange-600" />}
            color="bg-orange-100"
          />
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-200 rounded-xl h-16"
                ></div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.slice(0, 3).map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  role="listitem"
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-4 ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <TrendingUp
                          className="w-4 h-4 text-green-600"
                          aria-label="Credit"
                        />
                      ) : (
                        <CreditCard
                          className="w-4 h-4 text-red-600"
                          aria-label="Debit"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.group}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
              {transactions.length > 3 && (
                <button
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => alert("View all transactions")} // Replace with actual navigation
                >
                  View All Transactions
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
}