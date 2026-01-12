"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  CheckCircle,
  Building2,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  Activity,
  DollarSign,
} from "lucide-react";

const statsCards = [
  {
    icon: Users,
    title: "Total Users",
    value: "8",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: CheckCircle,
    title: "Active Users",
    value: "6",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Building2,
    title: "Business Owners",
    value: "2",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Pending",
    value: "1",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const usersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    role: "Customer",
    status: "Active",
    location: "New York, US",
    joined: "2026-01-04",
    totalSpent: "$450",
    phone: "(555) 123-4567",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Mohammed Al-Rashid",
    email: "mohammed@email.com",
    role: "Business",
    status: "Active",
    location: "Chicago, US",
    joined: "2026-01-03",
    totalSpent: "$12,450",
    phone: "(555) 234-5678",
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily@email.com",
    role: "Business",
    status: "Pending",
    location: "San Francisco, US",
    joined: "2026-01-02",
    totalSpent: "$0",
    phone: "(555) 345-6789",
    lastActive: "1 day ago",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    email: "ahmed@email.com",
    role: "Customer",
    status: "Active",
    location: "Los Angeles, US",
    joined: "2026-01-01",
    totalSpent: "$890",
    phone: "(555) 456-7890",
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@email.com",
    role: "Customer",
    status: "Inactive",
    location: "Seattle, US",
    joined: "2025-12-15",
    totalSpent: "$350",
    phone: "(555) 890-1234",
    lastActive: "7 days ago",
  },
];

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<
    (typeof usersData)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">8 total users • 6 active</p>
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

      {/* Filters */}
      <Card className="border-gray-200 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Button variant="outline" className="border-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Joined
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Total Spent
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
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
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      user.role === "Customer"
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    }
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {user.location}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {user.joined}
                </td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                  {user.totalSpent}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  User Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] text-xl font-semibold">
                      {selectedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedUser.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={
                          selectedUser.role === "Customer"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        }
                      >
                        {selectedUser.role}
                      </Badge>
                      <Badge
                        className={
                          selectedUser.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        }
                      >
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Phone className="w-4 h-4" />
                      <p className="text-xs font-medium">Phone</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.phone}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <p className="text-xs font-medium">Location</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.location}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <p className="text-xs font-medium">Joined</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.joined}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Activity className="w-4 h-4" />
                      <p className="text-xs font-medium">Last Active</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.lastActive}
                    </p>
                  </div>
                </div>

                {/* Total Spent */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-xs font-medium">Total Spent</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedUser.totalSpent}
                  </p>
                </div>

                {/* Close Button */}
                <Button
                  onClick={() => setSelectedUser(null)}
                  className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
