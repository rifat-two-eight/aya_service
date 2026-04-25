"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { userService } from "@/services/userService";
import Swal from "sweetalert2";
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
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const [stats, setStats] = useState([
    {
      icon: Users,
      title: "Total Users",
      value: "0",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: CheckCircle,
      title: "Active Users",
      value: "0",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      title: "Pending",
      value: "0",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch main users list
      const response = await userService.getUsers({
        page: currentPage,
        limit: 10,
        searchTerm: searchQuery,
        role: selectedRole === "all" ? undefined : selectedRole,
      });

      // Fetch overall stats (Active and Pending) for the current role
      const [activeRes, pendingRes] = await Promise.all([
        userService.getUsers({ 
          limit: 1, 
          status: "active",
          role: selectedRole === "all" ? undefined : selectedRole 
        }),
        userService.getUsers({ 
          limit: 1, 
          status: "pending",
          role: selectedRole === "all" ? undefined : selectedRole 
        }),
      ]);

      if (response.success) {
        const usersList = response.data?.users || [];
        const meta = response.data?.meta;

        setUsers(usersList);
        setTotalPages(meta?.totalPage || 1);
        setTotalCount(meta?.total || 0);

        // Update stats using overall totals from meta
        const total = meta?.total || 0;
        const activeTotal = activeRes.data?.meta?.total || 0;
        const pendingTotal = pendingRes.data?.meta?.total || 0;

        setStats((prev) =>
          prev.map((s) => {
            if (s.title === "Total Users") return { ...s, value: total.toString() };
            if (s.title === "Active Users") return { ...s, value: activeTotal.toString() };
            if (s.title === "Pending") return { ...s, value: pendingTotal.toString() };
            return s;
          })
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch users");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, selectedRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handleDeleteUser = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A5C36",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg px-6 py-2",
        cancelButton: "rounded-lg px-6 py-2",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await userService.deleteUser(id);
          if (response.success) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              confirmButtonColor: "#0A5C36",
            });
            fetchUsers();
          } else {
            toast.error(response.message || "Failed to delete user");
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to delete user");
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">{totalCount} total users</p>
        </div>
        <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
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
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Button type="submit" variant="outline" className="border-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Apply Search
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 px-2">
        <button
          onClick={() => handleRoleChange("all")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            selectedRole === "all"
              ? "text-[#0A5C36]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Users
          {selectedRole === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A5C36]" />
          )}
        </button>
        <button
          onClick={() => handleRoleChange("client")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            selectedRole === "client"
              ? "text-[#0A5C36]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Client
          {selectedRole === "client" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A5C36]" />
          )}
        </button>
        <button
          onClick={() => handleRoleChange("business")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            selectedRole === "business"
              ? "text-[#0A5C36]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Business
          {selectedRole === "business" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A5C36]" />
          )}
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A5C36]" />
          </div>
        ) : null}
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
                Phone
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Joined
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && users?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] font-semibold">
                        {user.fullName ? user.fullName.charAt(0) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.fullName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      user.role === "citizen"
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        : user.role === "lawyer"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        : user.role === "student"
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                        : "bg-green-100 text-green-700 hover:bg-green-100"
                    }
                  >
                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "N/A"}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    }
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {user.phoneNumber || "N/A"}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && users?.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => setCurrentPage(p => p - 1)}
              className="rounded-lg h-9 px-3"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => setCurrentPage(p => p + 1)}
              className="rounded-lg h-9 px-3"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
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
                      {selectedUser.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedUser.fullName || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedUser.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={
                          selectedUser.role === "client"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        }
                      >
                        {selectedUser.role === "client" ? "Customer" : "Business"}
                      </Badge>
                      <Badge
                        className={
                          selectedUser.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {selectedUser.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl col-span-2">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Phone className="w-4 h-4" />
                      <p className="text-xs font-medium">Phone</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.phoneNumber || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <p className="text-xs font-medium">Joined Date</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <CheckCircle className="w-4 h-4" />
                      <p className="text-xs font-medium">Verified</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.verified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
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
