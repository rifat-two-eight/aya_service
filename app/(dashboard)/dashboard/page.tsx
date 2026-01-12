"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Building2,
  Package,
  DollarSign,
  AlertCircle,
  Activity,
  TrendingUp,
  ArrowRight,
  X,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    title: "Total Users",
    value: "12,458",
    subtitle: "8,234 active",
    change: "+12%",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Building2,
    title: "Total Businesses",
    value: "1,247",
    subtitle: "892 active",
    change: "+8%",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Package,
    title: "Total Services",
    value: "3,456",
    subtitle: "",
    change: "+15%",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: DollarSign,
    title: "Total Revenue",
    value: "$458,920",
    subtitle: "$45,892 this month",
    change: "+22%",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const actionCards = [
  {
    title: "Pending Approvals",
    description: "Businesses awaiting verification",
    value: "23",
    gradient: "bg-gradient-to-r from-[#FB2C36] to-[#E7000B]",
    buttonColor: "bg-red-500 hover:bg-red-600",
    buttonText: "Review Now",
    icon: AlertCircle,
    link: "/review",
  },
  {
    title: "Active Sessions",
    description: "Currently online users",
    value: "2341",
    gradient: "bg-gradient-to-r from-[#2B7FFF] to-[#155DFC]",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    buttonText: "View Details",
    icon: Activity,
    showModal: true,
  },
  {
    title: "New Signups",
    description: "Last 7 days",
    value: "+156",
    gradient: "bg-[#0A5C36]",
    buttonColor: "bg-[#0A5C36] hover:bg-[#154a2e]",
    buttonText: "View Users",
    icon: TrendingUp,
    link: "/users",
  },
];

const activeSessions = [
  {
    name: "Sarah Johnson",
    email: "sarah@email.com",
    role: "Customer",
    location: "New York, US",
    device: "Chrome on Mac",
    lastActive: "2 min ago",
    ip: "192.168.1.1",
  },
  {
    name: "Mohammed Al-Rashid",
    email: "mohammed@email.com",
    role: "Business",
    location: "Chicago, US",
    device: "Safari on iPhone",
    lastActive: "5 min ago",
    ip: "192.168.1.2",
  },
  {
    name: "Emily Chen",
    email: "emily@email.com",
    role: "Business",
    location: "San Francisco, US",
    device: "Chrome on Windows",
    lastActive: "8 min ago",
    ip: "192.168.1.3",
  },
  {
    name: "Ahmed Hassan",
    email: "ahmed@email.com",
    role: "Customer",
    location: "Los Angeles, US",
    device: "Firefox on Mac",
    lastActive: "12 min ago",
    ip: "192.168.1.4",
  },
  {
    name: "Fatima Ali",
    email: "fatima@email.com",
    role: "Business",
    location: "Houston, US",
    device: "Edge on Windows",
    lastActive: "15 min ago",
    ip: "192.168.1.5",
  },
];

const recentUsers = [
  {
    name: "Sarah Johnson",
    email: "sarah@email.com",
    date: "2026-01-04",
    status: "active" as const,
  },
  {
    name: "Mohammed Al-Rashid",
    email: "mohammed@email.com",
    date: "2026-01-03",
    status: "active" as const,
  },
  {
    name: "Emily Chen",
    email: "emily@email.com",
    date: "2026-01-02",
    status: "pending" as const,
  },
  {
    name: "Ahmed Hassan",
    email: "ahmed@email.com",
    date: "2026-01-01",
    status: "active" as const,
  },
];

const recentTransactions = [
  {
    name: "Sarah Johnson",
    service: "Tony's Italian",
    date: "2026-01-04",
    amount: "$8",
    status: "completed" as const,
  },
  {
    name: "Ahmed Hassan",
    service: "Quick Catering",
    date: "2026-01-04",
    amount: "$50",
    status: "completed" as const,
  },
  {
    name: "Emily Chen",
    service: "Premium Events",
    date: "2026-01-03",
    amount: "$500",
    status: "pending" as const,
  },
];

export default function DashboardPage() {
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  return (
    <div className="space-y-6 mx-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actionCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className={`${card.gradient} border-0 text-white rounded-3xl`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Icon className="w-7 h-7 bg-white/20 p-1 rounded-md" />
                  <span className="text-xl font-bold bg-white/20 px-4 py-1 rounded-lg">
                    {card.value}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                <p className="text-sm text-white/80 mb-4">{card.description}</p>
                {card.showModal ? (
                  <Button
                    onClick={() => setShowSessionsModal(true)}
                    className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
                    size="sm"
                  >
                    {card.buttonText}
                  </Button>
                ) : (
                  <Link href={card.link || "#"}>
                    <Button
                      className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
                      size="sm"
                    >
                      {card.buttonText}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Users & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className="border-gray-200 rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h3>
            <Link
              href="/dashboard/users"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-gray-100">
                    <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] font-semibold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {user.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-gray-200 rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <Link
              href="/dashboard/transactions"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.service}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {transaction.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {transaction.amount}
                  </p>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : "secondary"
                    }
                    className={
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions Modal */}
      <Dialog open={showSessionsModal} onOpenChange={setShowSessionsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">
                  Active Sessions
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {activeSessions.length} users currently online
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Device
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Last Active
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeSessions.map((session, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] text-sm font-semibold">
                              {session.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {session.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            session.role === "Customer"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                              : "bg-purple-100 text-purple-700 hover:bg-purple-100"
                          }
                        >
                          {session.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {session.location}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {session.device}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-green-500" />
                          {session.lastActive}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {session.ip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setShowSessionsModal(false)}
              className="bg-[#0A5C36] hover:bg-[#154a2e] text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}