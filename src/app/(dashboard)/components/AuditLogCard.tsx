// src/app/(dashboard)/components/AuditLogCard.tsx
"use client";

interface AuditLog {
  id: string;
  timestamp: string;
  action: "contribution_added" | "payout_processed" | "user_updated" | "system_error";
  status: "success" | "pending" | "failed";
  user: string;
  details: string;
}

const AuditLogCard: React.FC<{ log?: AuditLog }> = ({ log }) => {
  const statusColors = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };

  const actionLabels = {
    contribution_added: "Contribution Added",
    payout_processed: "Payout Processed",
    user_updated: "User Updated",
    system_error: "System Error",
  };

  if (!log || !log.id || !log.user) {
    return <div className="text-red-500 text-sm">Invalid audit log data</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-900">{log.user}</p>
        <p className="text-xs text-gray-500">{log.timestamp}</p>
        <p className="text-xs text-gray-600 mt-1">{log.details}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{actionLabels[log.action]}</p>
        <p
          className={`text-xs font-medium ${statusColors[log.status]} px-2 py-1 rounded-full mt-1 inline-block`}
        >
          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default AuditLogCard;