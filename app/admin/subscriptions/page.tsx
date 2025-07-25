"use client"

import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { authService } from "@/app/services/api"
import { toast } from "react-hot-toast"

interface Subscription {
  id: string;
  plan: string;
  duration: string;
  charges: string;
  billingDate: string;
  expiryDate: string;
  subscriber: {
    name: string;
    email: string;
    avatar: string | null;
  };
  status: string;
  currentPeriodEnd: string;
  amount: number;
  currency: string;
  interval: string;
  stripeSubscriptionId: string;
}

interface SubscriptionResponse {
  status: string;
  data: {
    history: Subscription[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  }
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, [currentPage, searchQuery]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await authService.getSubscriptionHistory(currentPage, searchQuery);
      setSubscriptions(response.data.history);
      setTotalPages(response.data.totalPages);
      setTotalSubscriptions(response.data.totalItems);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">All Subscriptions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Renewal Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, idx) => (
              <>
                <tr
                  key={subscription.stripeSubscriptionId || subscription.id}
                  className={
                    `border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`
                  }
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-black">{subscription.subscriber?.name?.charAt(0) || '?'}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{subscription.subscriber?.name || 'N/A'}</p>
                        <p className="text-xs text-black">{subscription.subscriber?.email || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold capitalize">{subscription.plan}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{subscription.status}</span>
                  </td>
                  <td className="px-4 py-4 text-sm">{subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-4 py-4 text-sm">
                    <button
                      className="text-blue-600 hover:underline text-xs"
                      onClick={() => setExpanded(expanded === (subscription.stripeSubscriptionId || subscription.id) ? null : (subscription.stripeSubscriptionId || subscription.id))}
                    >
                      {expanded === (subscription.stripeSubscriptionId || subscription.id) ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                {expanded === (subscription.stripeSubscriptionId || subscription.id) && (
                  <tr className="bg-blue-50">
                    <td colSpan={5} className="px-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Amount</p>
                          <p className="text-sm font-mono">{subscription.amount ? `${subscription.amount} ${subscription.currency?.toUpperCase()}` : 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Interval</p>
                          <p className="text-sm font-mono">{subscription.interval || 'N/A'}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500 mb-1">Stripe Subscription ID</p>
                          <p className="text-sm font-mono break-all">{subscription.stripeSubscriptionId || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
