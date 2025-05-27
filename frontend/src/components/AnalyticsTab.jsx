import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-[#202F55] to-[#3B4A6B]" // deep blue to steel blue
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-[#2D3C66] to-[#4B5D87]" // dusk tones
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-[#2C3E50] to-[#1C2833]" // darker gray blue
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-[#364152] to-[#4C5C70]" // silver navy
        />
      </div>
      ...
      <motion.div
        className="bg-[#1a202c]/80 rounded-lg p-6 shadow-xl backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid stroke="#2D3748" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#CBD5E0" />
            <YAxis yAxisId="left" stroke="#CBD5E0" />
            <YAxis yAxisId="right" orientation="right" stroke="#CBD5E0" />
            <Tooltip
              contentStyle={{ backgroundColor: "#2D3748", color: "#E2E8F0" }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#63B3ED"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#90CDF4"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
export default AnalyticsTab;

// eslint-disable-next-line no-unused-vars
const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`relative rounded-lg p-6 shadow-xl overflow-hidden bg-gradient-to-br ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center relative z-10">
      <div>
        <p className="text-blue-200 text-sm mb-1 font-medium tracking-wide">
          {title}
        </p>
        <h3 className="text-white text-3xl font-extrabold">{value}</h3>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 text-blue-300/30">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
