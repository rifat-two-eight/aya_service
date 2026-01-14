"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Download,
  Star,
} from "lucide-react";

const statsCards = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    value: "$35,200",
    subtitle: "This month",
    change: "+22%",
    gradient: "bg-[#0A5C36] ",
  },
  {
    icon: Users,
    title: "User Growth",
    value: "267",
    subtitle: "New users",
    change: "+15%",
    gradient: "bg-gradient-to-br from-[#2B7FFF] to-[#155DFC]",
  },
  {
    icon: Activity,
    title: "Transactions",
    value: "102",
    subtitle: "This month",
    change: "+18%",
    gradient: "bg-gradient-to-br from-[#AD46FF] to-[#9810FA]",
  },
];

const revenueData = [
  { month: "Jan", amount: 12500, max: 35200 },
  { month: "Feb", amount: 15200, max: 35200 },
  { month: "Mar", amount: 18900, max: 35200 },
  { month: "Apr", amount: 22400, max: 35200 },
  { month: "May", amount: 28600, max: 35200 },
  { month: "Jun", amount: 35200, max: 35200 },
];

const topBusinesses = [
  {
    rank: 1,
    name: "Tony's Italian Restaurant",
    transactions: 45,
    revenue: "$12,450",
    rating: 4.9,
  },
  {
    rank: 2,
    name: "Quick Catering Services",
    transactions: 32,
    revenue: "$8,920",
    rating: 4.7,
  },
  {
    rank: 3,
    name: "Premium Events Co.",
    transactions: 18,
    revenue: "$5,200",
    rating: 4.5,
  },
  {
    rank: 4,
    name: "Halal Grill House",
    transactions: 28,
    revenue: "$4,100",
    rating: 4.8,
  },
  {
    rank: 5,
    name: "Islamic Wedding Planners",
    transactions: 12,
    revenue: "$3,800",
    rating: 4.6,
  },
];

const userDistribution = [
  { type: "Customers", percentage: 65, color: "from-[#0A5C36] to-[#0A5C36]" },
  { type: "Business Owners", percentage: 25, color: "from-[#155DFC] to-[#155DFC]" },
  { type: "Service Providers", percentage: 10, color: "from-[#9810FA] to-[#9810FA]" },
];

const paymentMethods = [
  { method: "Credit Card", percentage: 45 },
  { method: "PayPal", percentage: 30 },
  { method: "Bank Transfer", percentage: 25 },
];

const serviceCategories = [
  { category: "Restaurant", revenue: "$18,200" },
  { category: "Catering", revenue: "$12,400" },
  { category: "Events", revenue: "$4,600" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Platform Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Insights and performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-300 rounded-lg"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${stat.gradient} border-0 text-white rounded-2xl`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-white/20 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-white/80 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-xs text-white/70">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Trend & Top Businesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Revenue Trend (Last 6 Months)
            </h3>
            <div className="space-y-5">
              {revenueData.map((item) => (
                <div key={item.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.month}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${(item.amount / item.max) * 100}%`,
                        background: "linear-gradient(to right, #00BC7D, #009966)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Businesses */}
        <Card className="border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Performing Businesses
            </h3>
            <div className="space-y-3">
              {topBusinesses.map((business) => (
                <div
                  key={business.rank}
                  className="flex items-center bg-[#FAFAFA] px-3 rounded-lg py-3 justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-10 h-10 bg-[#0A5C36]">
                      <AvatarFallback className="bg-[#0A5C36] text-white font-bold">
                        #{business.rank}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {business.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {business.transactions} transactions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {business.revenue}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">
                        {business.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution, Payment Methods, Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <Card className="border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              User Distribution
            </h3>
            <div className="space-y-5">
              {userDistribution.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.type}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        background:
                          item.type === "Customers"
                            ? "#0A5C36"
                            : item.type === "Business Owners"
                            ? "#155DFC"
                            : "#9810FA",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Payment Methods
            </h3>
            <div className="space-y-5">
              {paymentMethods.map((item) => (
                <div
                  key={item.method}
                  className="flex items-center justify-between bg-[#FAFAFA] px-3 rounded-lg py-3"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.method}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Categories */}
        <Card className="border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Service Categories
            </h3>
            <div className="space-y-5">
              {serviceCategories.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between bg-[#FAFAFA] px-3 rounded-lg py-2"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.revenue}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}