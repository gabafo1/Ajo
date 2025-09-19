// src/app/(dashboard)/audit/page.tsx
"use client";

import { useState } from "react";
import AuditLogCard from "../components/AuditLogCard";

interface AuditLog {
  id: string;
  timestamp: string;
  action: "contribution_added" | "payout_processed" | "user_updated" | "system_error";
  status: "success" | "pending" | "failed";
  user: string;
  details: string;
}

// Mock data
const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2025-09-18 10:30 AM",
    action: "contribution_added",
    status: "success",
    user: "Chinedu Okeke",
    details: "Added ₦50,000 contribution to Ajo group",
  },
  {
    id: "2",
    timestamp: "2025-09-17 02:15 PM",
    action: "payout_processed",
    status: "success",
    user: "Aisha Bello",
    details: "Processed payout of ₦200,000",
  },
  {
    id: "3",
    timestamp: "2025-09-16 09:00 AM",
    action: "user_updated",
    status: "pending",
    user: "Emeka Nwosu",
    details: "Updated user profile details",
  },
  {
    id: "4",
    timestamp: "2025-09-15 11:45 AM",
    action: "contribution_added",
    status: "success",
    user: "Funmi Adeyemi",
    details: "Added ₦50,000 contribution to Ajo group",
  },
  {
    id: "5",
    timestamp: "2025-09-14 03:20 PM",
    action: "system_error",
    status: "failed",
    user: "Tunde Lawal",
    details: "Failed to process payout due to insufficient funds",
  },
];

const Audit: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "contribution_added" | "payout_processed" | "user_updated" | "system_error"
  >("all");

  const filteredAuditLogs = mockAuditLogs
    .filter((log) => log && log.id && log.user) // Prevent undefined or invalid logs
    .filter(
      (log) =>
        (filter === "all" || log.action === filter) &&
        (log.user.toLowerCase().includes(search.toLowerCase()) ||
          log.details.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajo/Esusu Audit Report</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by user or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as
                  | "all"
                  | "contribution_added"
                  | "payout_processed"
                  | "user_updated"
                  | "system_error"
              )
            }
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Actions</option>
            <option value="contribution_added">Contribution Added</option>
            <option value="payout_processed">Payout Processed</option>
            <option value="user_updated">User Updated</option>
            <option value="system_error">System Error</option>
          </select>
        </div>

        {/* Audit Log List */}
        <div className="space-y-4">
          {filteredAuditLogs.length > 0 ? (
            filteredAuditLogs.map((log) => <AuditLogCard key={log.id} log={log} />)
          ) : (
            <p className="text-gray-500 text-center">No audit logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Audit;