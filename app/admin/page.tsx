"use client"
import { ArrowUp, Users, Download, FileText, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import api, { statsService, authService } from "../services/api";

interface DashboardStats {
  totalUsers: number;
  totalDownloads: number;
  totalDocuments: number;
  totalEmails: number;
}

interface SubscriptionStats {
  total: number;
  basic: number;
  professional: number;
  entrepreneur: number;
}

interface EarningsData {
  total: string;
  monthly: number[];
}

interface SubscriptionHistory {
  status: string;
  data: {
    history: Array<{
      id: string;
      plan: string;
      duration: string;
      charges: string;
      billingDate: string;
    }>;
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDownloads: 0,
    totalDocuments: 0,
    totalEmails: 0
  });
  const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStats>({
    total: 0,
    basic: 0,
    professional: 0,
    entrepreneur: 0
  });
  const [earnings, setEarnings] = useState<EarningsData>({
    total: "0",
    monthly: Array(7).fill(0)
  });
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, subscriptionHistory] = await Promise.all([
          statsService.stats(),
          authService.getSubscriptionHistory(1, '')
        ]);

        const { data: statsData } = statsResponse;
        const subscriptionData = subscriptionHistory as SubscriptionHistory;

        // Calculate monthly earnings from subscription history
        const monthlyEarnings = Array(7).fill(0);
        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);

        subscriptionData.data.history.forEach(sub => {
          const subDate = new Date(sub.billingDate);
          if (subDate >= sixMonthsAgo) {
            const monthIndex = 6 - (now.getMonth() - subDate.getMonth());
            if (monthIndex >= 0 && monthIndex < 7) {
              // Extract numeric value from charges string (e.g., "£ 60.00" -> 60)
              const amount = parseFloat(sub.charges.replace(/[^0-9.]/g, ''));
              monthlyEarnings[monthIndex] += amount;
            }
          }
        });

        // Calculate total earnings
        const totalEarnings = monthlyEarnings.reduce((sum, amount) => sum + amount, 0);
        const formattedTotal = totalEarnings >= 1000 
          ? `£${(totalEarnings / 1000).toFixed(1)}K` 
          : `£${totalEarnings}`;

        setStats(statsData.stats);
        setSubscriptionStats(statsData.subscriptionStats);
        setEarnings({
          total: formattedTotal,
          monthly: monthlyEarnings
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="border-t-2 mt-6 mb-2"></div>
      {/* Main content */}
      <div className="flex-1 p-4 lg:p-8 bg-white">
        <h1 className="text-2xl lg:text-3xl font-montserrat font-bold mb-6 lg:mb-8">Dashboard</h1>
        
        {/* First row - Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Users Added */}
          <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 lg:p-4 rounded-full bg-white">
                <Users className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-black mt-6 lg:mt-11">Total Users Added</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl lg:text-3xl font-montserrat font-semibold mt-2 lg:mt-4">{stats.totalUsers}</p>
            </div>
          </div>

          {/* Total Downloads */}
          <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 lg:p-4 rounded-full bg-white">
                <Download className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-black mt-6 lg:mt-11">Total Downloads</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl lg:text-3xl font-montserrat font-semibold mt-2 lg:mt-4">{stats.totalDownloads}</p>
            </div>
          </div>

          {/* Total Documents Added */}
          <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 lg:p-4 rounded-full bg-white">
                <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-black mt-6 lg:mt-11">Total Documents Added</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl lg:text-3xl font-montserrat font-semibold mt-2 lg:mt-4">{stats.totalDocuments}</p>
            </div>
          </div>

          {/* Total Emails sent */}
          <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 lg:p-4 rounded-full bg-white">
                <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-black mt-6 lg:mt-11">Total Emails sent</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl lg:text-3xl font-montserrat font-semibold mt-2 lg:mt-4">{stats.totalEmails}</p>
            </div>
          </div>
        </div>

        {/* Documents Chart */}
        <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100 mb-8 w-full lg:w-[700px]">
          <h2 className="text-lg lg:text-xl font-montserrat font-bold mb-4">Documents Overview</h2>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
              <span className="text-sm text-black">Total Documents ({stats.totalDocuments})</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-black">Downloads ({stats.totalDownloads})</span>
            </div>
          </div>
          <div className="h-48 lg:h-64 w-full">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="#999999" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#999999" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#999999" strokeWidth="1" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#999999" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#999999" strokeWidth="1" />
              
              {/* Blue line (total documents) */}
              <path 
                d={`M0,${200 - (stats.totalDocuments * 10)} C100,${200 - (stats.totalDocuments * 10)} 200,${200 - (stats.totalDocuments * 10)} 300,${200 - (stats.totalDocuments * 10)} C350,${200 - (stats.totalDocuments * 10)} 400,${200 - (stats.totalDocuments * 10)}`}
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Yellow line (downloads) */}
              <path 
                d={`M0,${200 - (stats.totalDownloads * 10)} C100,${200 - (stats.totalDownloads * 10)} 200,${200 - (stats.totalDownloads * 10)} 300,${200 - (stats.totalDownloads * 10)} C350,${200 - (stats.totalDownloads * 10)} 400,${200 - (stats.totalDownloads * 10)}`}
                fill="none" 
                stroke="#eab308" 
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-xs text-black">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Subscription Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col justify-between items-center gap-4 lg:gap-6 mb-4">
              <h2 className="text-lg lg:text-xl font-montserrat font-bold">Subscription Distribution</h2>
              <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Calculate percentages for the pie chart */}
                  {(() => {
                    const total = subscriptionStats.total;
                    const basicPercent = (subscriptionStats.basic / total) * 100;
                    const professionalPercent = (subscriptionStats.professional / total) * 100;
                    const entrepreneurPercent = (subscriptionStats.entrepreneur / total) * 100;

                    return (
                      <>
                        {/* Basic Segment */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="15"
                          strokeDasharray={`${basicPercent * 2.51} ${251}`}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                        {/* Professional Segment */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="15"
                          strokeDasharray={`${professionalPercent * 2.51} ${251}`}
                          transform={`rotate(${basicPercent * 3.6 - 90} 50 50)`}
                          strokeLinecap="round"
                        />
                        {/* Entrepreneur Segment */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="15"
                          strokeDasharray={`${entrepreneurPercent * 2.51} ${251}`}
                          transform={`rotate(${(basicPercent + professionalPercent) * 3.6 - 90} 50 50)`}
                          strokeLinecap="round"
                        />
                      </>
                    );
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl lg:text-2xl font-montserrat font-medium">{subscriptionStats.total}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm">Basic</span>
                <span className="ml-auto font-montserrat font-medium">{subscriptionStats.basic}</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Professional</span>
                <span className="ml-auto font-montserrat font-medium">{subscriptionStats.professional}</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">EnterPreneur</span>
                <span className="ml-auto font-montserrat font-medium">{subscriptionStats.entrepreneur}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg lg:text-xl font-montserrat font-medium text-black">Monthly Earnings</h2>
              <select 
                className="text-sm border rounded-md px-2 py-1"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as 'monthly' | 'yearly')}
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <p className="text-2xl lg:text-3xl font-montserrat font-bold mb-4">{earnings.total}</p>
            <div className="h-24 lg:h-32 w-full">
              <div className="h-full w-full flex items-end justify-between">
                {earnings.monthly.map((value, index) => (
                  <div key={index} className="h-24 w-6 lg:w-8 bg-white rounded relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-blue-600 rounded-b"
                      style={{ height: `${(value / Math.max(...earnings.monthly, 1)) * 100}%` }}
                    ></div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      £{value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8 text-xs text-black">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}