"use client"
import { ArrowUp, Users, Download, FileText, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import api, { statsService, authService } from "../services/api";
// Remove Recharts imports and only use Chart.js imports
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import ChartJSChart from "../components/ui/ChartJSChart";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartJSTooltip, ChartJSLegend);

interface DashboardStats {
  totalUsers: number;
  totalDownloads: number;
  totalDocuments: number;
  totalEmails: number;
  newUsersMonthly?: number[]; // Added for new users per month
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
  const [useChartJS, setUseChartJS] = useState({
    documents: false,
    subscriptions: false,
    earnings: false,
  });

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

  // Remove the new users chart and arrange the three charts in a column

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <h1 className="text-2xl lg:text-3xl font-montserrat font-bold mb-8">Dashboard</h1>
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Users Added */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-100">
          <div className="p-3 rounded-full bg-blue-100 mb-4"><Users className="h-6 w-6 text-blue-600" /></div>
          <span className="text-gray-500 text-sm mb-1">Total Users</span>
          <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
        </div>
        {/* Total Downloads */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-100">
          <div className="p-3 rounded-full bg-yellow-100 mb-4"><Download className="h-6 w-6 text-yellow-500" /></div>
          <span className="text-gray-500 text-sm mb-1">Total Downloads</span>
          <span className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</span>
        </div>
        {/* Total Documents Added */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-100">
          <div className="p-3 rounded-full bg-blue-50 mb-4"><FileText className="h-6 w-6 text-blue-800" /></div>
          <span className="text-gray-500 text-sm mb-1">Total Documents</span>
          <span className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</span>
        </div>
        {/* Total Emails sent */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-100">
          <div className="p-3 rounded-full bg-green-100 mb-4"><Mail className="h-6 w-6 text-green-600" /></div>
          <span className="text-gray-500 text-sm mb-1">Total Emails Sent</span>
          <span className="text-2xl font-bold text-gray-900">{stats.totalEmails}</span>
        </div>
      </div>
      {/* Charts Column */}
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        {/* Documents Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col border border-gray-100" style={{ height: 250 }}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Documents Overview</h2>
          <Bar
            data={{
              labels: ["Documents"],
              datasets: [
                {
                  label: "Total Documents",
                  data: [stats.totalDocuments],
                  backgroundColor: "#3b82f6",
                },
                {
                  label: "Total Downloads",
                  data: [stats.totalDownloads],
                  backgroundColor: "#eab308",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
                tooltip: { enabled: true },
              },
              scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } },
              },
            }}
          />
        </div>
        {/* Subscription Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription Distribution</h2>
          <ChartJSChart
            type="pie"
            data={{
              labels: ["Basic", "Professional", "Entrepreneur"],
              datasets: [
                {
                  label: "Subscriptions",
                  data: [subscriptionStats.basic, subscriptionStats.professional, subscriptionStats.entrepreneur],
                  backgroundColor: ["#3b82f6", "#eab308", "#22c55e"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
                tooltip: { enabled: true },
              },
            }}
            height={250}
          />
          <div className="flex justify-center gap-4 mt-4">
            <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-blue-600 mr-2"></span>Basic: {subscriptionStats.basic}</span>
            <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>Professional: {subscriptionStats.professional}</span>
            <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>Entrepreneur: {subscriptionStats.entrepreneur}</span>
          </div>
        </div>
        {/* Monthly Earnings Line Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Earnings</h2>
            <select 
              className="text-sm border rounded-md px-2 py-1"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as 'monthly' | 'yearly')}
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <p className="text-2xl font-bold mb-4 text-gray-900">{earnings.total}</p>
          <ChartJSChart
            type="line"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              datasets: [
                {
                  label: "Earnings",
                  data: earnings.monthly,
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59,130,246,0.2)",
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
                tooltip: { enabled: true },
              },
              scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } },
              },
            }}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}