"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { paymentService } from "@/services/paymentService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Download,
  Search,
  Eye,
  Calendar,
  User,
  Hash,
  ArrowUpRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Mail,
} from "lucide-react";

export default function TransactionsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [stats, setStats] = useState([
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: "$0",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Avg Amount",
      value: "$0",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: CheckCircle,
      title: "Completed",
      value: "0",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: ShieldCheck,
      title: "Success Rate",
      value: "100%",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ]);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await paymentService.getPayments({
        page: currentPage,
        limit: 10,
        searchTerm: searchQuery,
      });

      if (response.success) {
        setPayments(response.data);
        setTotalPages(response.meta.totalPage);
        setTotalCount(response.meta.total);

        // Update stats (calculating based on current page/total count for demo)
        const totalAmount = response.data.reduce((acc: number, item: any) => acc + (item.amount || 0), 0);
        const avg = response.data.length > 0 ? (totalAmount / response.data.length).toFixed(2) : 0;

        setStats(prev => prev.map(s => {
          if (s.title === "Total Revenue") return { ...s, value: `$${totalAmount.toLocaleString()}` };
          if (s.title === "Avg Amount") return { ...s, value: `$${avg}` };
          if (s.title === "Completed") return { ...s, value: response.meta.total.toString() };
          return s;
        }));
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch payments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transaction Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalCount} total processed payments
          </p>
        </div>
        <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200 rounded-2xl shadow-sm">
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

      {/* Search Bar */}
      <Card className="border-gray-200 rounded-2xl">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by User Name, Email or Transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A5C36]" />
          </div>
        ) : null}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Transaction ID
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Date & Time
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && payments.map((payment) => (
              <tr
                key={payment._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-gray-500 truncate max-w-[120px]">
                      {payment.transactionId}
                    </span>
                    <Badge variant="outline" className="text-[10px] py-0 px-1 border-gray-100">
                      STRIPE
                    </Badge>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {payment.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.email}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-[#0A5C36]">
                  ${payment.amount}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {formatDate(payment.dateTime)}
                </td>
                <td className="py-4 px-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPayment(payment)}
                    className="hover:bg-[#E8F5E9] hover:text-[#0A5C36]"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {!isLoading && payments.length === 0 && (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-500 bg-gray-50">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white rounded-b-2xl">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{payments.length}</span> of <span className="font-medium">{totalCount}</span> results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => setCurrentPage(p => p - 1)}
              className="rounded-lg h-9"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1 mx-2">
              <span className="text-sm font-medium text-gray-900">{currentPage}</span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm text-gray-400">{totalPages}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => setCurrentPage(p => p + 1)}
              className="rounded-lg h-9"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Dialog
        open={!!selectedPayment}
        onOpenChange={() => setSelectedPayment(null)}
      >
        <DialogContent className="max-w-md bg-white rounded-2xl p-0 overflow-hidden">
          {selectedPayment && (
            <div className="flex flex-col">
              <div className="bg-[#0A5C36] p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-white font-semibold">Payment Details</DialogTitle>
                  <CreditCard className="w-6 h-6 opacity-50" />
                </div>
                <div className="mt-4">
                  <p className="text-white/70 text-sm">Total Amount Paid</p>
                  <h2 className="text-4xl font-bold mt-1">${selectedPayment.amount}</h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Customer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">{selectedPayment.customerName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedPayment.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="text-gray-900 font-medium">{formatDate(selectedPayment.dateTime)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="text-gray-900 font-mono text-xs">{selectedPayment.transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Reference ID</span>
                    <span className="text-gray-900 font-mono text-xs truncate max-w-[150px]">{selectedPayment.referenceId}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Payment Channel</span>
                    <Badge className="bg-green-50 text-green-700 border-0">Stripe Checkout</Badge>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mt-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Secure Transaction</p>
                      <p className="text-[10px] text-gray-500">Verified by Payment Gateway</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedPayment(null)}
                  className="w-full bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-xl h-11"
                >
                  Close Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}