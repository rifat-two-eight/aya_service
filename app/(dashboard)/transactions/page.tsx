"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react";

const statsCards = [
  {
    icon: DollarSign,
    title: "Total Revenue",
    value: "$9,620",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Platform Fees",
    value: "$484",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: CheckCircle,
    title: "Completed",
    value: "5",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Pending",
    value: "1",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const transactionsData = [
  {
    id: "TXN001",
    userName: "Sarah Johnson",
    userEmail: "sarah@email.com",
    business: "Tony's Italian Restaurant",
    service: "Family Dinner Package",
    amount: "$85",
    fee: "$5",
    status: "Completed",
    date: "2026-01-04",
    time: "2:30 PM",
    payment: "Credit Card",
  },
  {
    id: "TXN002",
    userName: "Ahmed Hassan",
    userEmail: "ahmed@email.com",
    business: "Quick Catering Services",
    service: "Birthday Party Package",
    amount: "$500",
    fee: "$25",
    status: "Completed",
    date: "2026-01-04",
    time: "11:15 AM",
    payment: "PayPal",
  },
  {
    id: "TXN003",
    userName: "Emily Chen",
    userEmail: "emily@email.com",
    business: "Premium Events Co.",
    service: "Corporate Event Planning",
    amount: "$5000",
    fee: "$250",
    status: "Pending",
    date: "2026-01-03",
    time: "4:45 PM",
    payment: "Bank Transfer",
  },
  {
    id: "TXN004",
    userName: "Mohammed Al-Rashid",
    userEmail: "mohammed@email.com",
    business: "Halal Grill House",
    service: "Lunch Buffet",
    amount: "$50",
    fee: "$3",
    status: "Completed",
    date: "2026-01-03",
    time: "12:00 PM",
    payment: "Credit Card",
  },
  {
    id: "TXN005",
    userName: "Marcus Thompson",
    userEmail: "marcus@email.com",
    business: "Tony's Italian Restaurant",
    service: "Family Dinner Package",
    amount: "$85",
    fee: "$5",
    status: "Completed",
    date: "2026-01-02",
    time: "7:30 PM",
    payment: "Debit Card",
  },
  {
    id: "TXN006",
    userName: "Fatima Ali",
    userEmail: "fatima@email.com",
    business: "Quick Catering Services",
    service: "Wedding Catering",
    amount: "$3500",
    fee: "$175",
    status: "Completed",
    date: "2026-01-02",
    time: "10:00 AM",
    payment: "Bank Transfer",
  },
  {
    id: "TXN007",
    userName: "Sarah Johnson",
    userEmail: "sarah@email.com",
    business: "Premium Events Co.",
    service: "Birthday Party Package",
    amount: "$350",
    fee: "$18",
    status: "Failed",
    date: "2026-01-01",
    time: "3:15 PM",
    payment: "Credit Card",
  },
  {
    id: "TXN008",
    userName: "David Kim",
    userEmail: "david@email.com",
    business: "Halal Grill House",
    service: "Lunch Buffet",
    amount: "$50",
    fee: "$3",
    status: "Completed",
    date: "2025-12-31",
    time: "1:20 PM",
    payment: "PayPal",
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transaction Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            8 total transactions • 5 completed
          </p>
        </div>
        <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200 rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Transaction ID
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Business
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Service
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Fee
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Date & Time
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <p className="text-sm font-semibold text-gray-900">
                    {transaction.id}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.userEmail}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900">{transaction.business}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900">{transaction.service}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-semibold text-gray-900">
                    {transaction.amount}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-600">{transaction.fee}</p>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm text-gray-900">{transaction.date}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900">{transaction.payment}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}