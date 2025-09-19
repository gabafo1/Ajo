"use client";

import { useState } from 'react';
import TransactionCard from '@/app/(dashboard)/components/TransactionCard';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'contribution' | 'payout' | 'fee';
  status: 'completed' | 'pending' | 'failed';
  contributor: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-09-18 10:30 AM',
    amount: 50000,
    type: 'contribution',
    status: 'completed',
    contributor: 'Chinedu Okeke',
  },
  {
    id: '2',
    date: '2025-09-17 02:15 PM',
    amount: 200000,
    type: 'payout',
    status: 'completed',
    contributor: 'Aisha Bello',
  },
  {
    id: '3',
    date: '2025-09-16 09:00 AM',
    amount: 1000,
    type: 'fee',
    status: 'pending',
    contributor: 'Emeka Nwosu',
  },
  {
    id: '4',
    date: '2025-09-15 11:45 AM',
    amount: 50000,
    type: 'contribution',
    status: 'completed',
    contributor: 'Funmi Adeyemi',
  },
  {
    id: '5',
    date: '2025-09-14 03:20 PM',
    amount: 150000,
    type: 'payout',
    status: 'failed',
    contributor: 'Tunde Lawal',
  },
];

type TransactionTypeFilter = 'all' | 'contribution' | 'payout' | 'fee';

const Transactions: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TransactionTypeFilter>('all');

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      (filter === 'all' || transaction.type === filter) &&
      (transaction.contributor.toLowerCase().includes(search.toLowerCase()) ||
        transaction.date.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajo/Esusu Transactions</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by contributor or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as TransactionTypeFilter)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="contribution">Contributions</option>
            <option value="payout">Payouts</option>
            <option value="fee">Fees</option>
          </select>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
