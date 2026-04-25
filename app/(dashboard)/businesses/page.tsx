"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Check,
  Clock,
  Loader2,
  Search,
  Filter,
} from "lucide-react";
import { userService } from "@/services/userService";
import { Card, CardContent } from "@/components/ui/card";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    business: any;
    type: "approve" | "reject";
  }>({ open: false, business: null, type: "approve" });
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBusinesses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userService.getUsers({
        role: "business",
        searchTerm: searchQuery,
      });

      if (response.success) {
        setBusinesses(response.data?.users || []);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch businesses");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const handleApprove = (business: any) => {
    setRejectDialog({ open: true, business, type: "approve" });
  };

  const handleReject = (business: any) => {
    setRejectDialog({ open: true, business, type: "reject" });
  };

  const handleSubmit = async () => {
    if (rejectDialog.type === "reject" && !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setIsSubmitting(true);

    try {
      const status = rejectDialog.type === "approve" ? "approved" : "rejected";
      const response = await userService.updateBusinessStatus(rejectDialog.business._id, {
        businessStatus: status,
        ...(status === "rejected" && { rejectedReason: rejectionReason }),
      });

      if (response.success) {
        toast.success(
          `${rejectDialog.business.business?.businessName || "Business"} has been ${status} successfully!`
        );
        fetchBusinesses();
        setRejectDialog({ open: false, business: null, type: "approve" });
        setRejectionReason("");
      } else {
        toast.error(response.message || "Failed to update business status");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBusinesses = businesses.filter((b) => {
    const status = b.business?.businessStatus || "pending";
    return status === activeTab;
  });

  const stats = {
    pending: businesses.filter(b => (b.business?.businessStatus || "pending") === "pending").length,
    approved: businesses.filter(b => b.business?.businessStatus === "approved").length,
    rejected: businesses.filter(b => b.business?.businessStatus === "rejected").length,
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Management & Approvals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.pending} pending • {stats.approved} approved • {stats.rejected} rejected
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "pending"
              ? "text-[#0A5C36]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending ({stats.pending})
          {activeTab === "pending" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A5C36]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "approved"
              ? "text-[#0A5C36]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Approved ({stats.approved})
          {activeTab === "approved" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A5C36]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "rejected"
              ? "text-[#0A5C36]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Rejected ({stats.rejected})
          {activeTab === "rejected" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A5C36]" />
          )}
        </button>
      </div>

      {/* Search Filter */}
      <Card className="border-gray-200 rounded-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by business name, owner, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
            <Button variant="outline" className="border-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Businesses List */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A5C36]" />
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          {activeTab === "pending" ? (
            <AlertCircle className="w-5 h-5 text-red-600" />
          ) : activeTab === "approved" ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <X className="w-5 h-5 text-gray-600" />
          )}
          <h2 className="text-lg font-semibold text-gray-900 capitalize">
            {activeTab} Businesses ({filteredBusinesses.length})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((user) => (
              <div
                key={user._id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <Avatar className="w-14 h-14 bg-[#0A5C36]">
                      <AvatarImage src={user.business?.logo} />
                      <AvatarFallback className="bg-[#0A5C36] text-white">
                        <Building2 className="w-7 h-7" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.business?.businessName || "Unnamed Business"}
                        </h3>
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                          {user.business?.category || "Business"}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {user.business?.description || "No description provided."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>
                            <strong>Owner:</strong> {user.fullName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{user.business?.address || "N/A"}, {user.business?.city || ""}</span>
                        </div>
                      </div>

                      {user.business?.primaryDocuments?.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                            <FileText className="w-4 h-4" />
                            <span className="font-medium">Documents Submitted:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {user.business.primaryDocuments.map((doc: string, idx: number) => (
                              <Badge
                                key={idx}
                                className="bg-green-100 text-green-700 hover:bg-green-100 cursor-pointer"
                                onClick={() => window.open(doc, '_blank')}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Document {idx + 1}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-500">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      
                      {activeTab === "rejected" && user.business?.rejectedReason && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                          <p className="text-sm text-red-700">
                            <strong>Rejection Reason:</strong> {user.business.rejectedReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {activeTab === "pending" && (
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleApprove(user)}
                        className="bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg min-w-[100px]"
                        size="sm"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(user)}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 rounded-lg min-w-[100px]"
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                  
                  {activeTab === "approved" && (
                    <Button
                      onClick={() => handleReject(user)}
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg"
                      size="sm"
                    >
                      Revoke Approval
                    </Button>
                  )}

                  {activeTab === "rejected" && (
                    <Button
                      onClick={() => handleApprove(user)}
                      variant="outline"
                      className="text-[#0A5C36] border-[#0A5C36]/20 hover:bg-[#0A5C36]/5 rounded-lg"
                      size="sm"
                    >
                      Re-approve
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              {searchQuery ? "No businesses found matching your search." : `No ${activeTab} businesses found.`}
            </div>
          )}
        </div>
      </div>

      {/* Approve/Reject Dialog */}
      <Dialog
        open={rejectDialog.open}
        onOpenChange={(open) =>
          !open &&
          setRejectDialog({ open: false, business: null, type: "approve" })
        }
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {rejectDialog.type === "approve"
                ? "Approve Business"
                : "Reject Business"}
            </DialogTitle>
          </DialogHeader>

          {rejectDialog.business && (
            <div className="space-y-6 mt-4">
              {/* Business Info */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rejectDialog.business.business?.businessName || "Business"}
                  </h3>
                  <Badge className="bg-[#0A5C36] text-white hover:bg-[#0A5C36]">
                    {rejectDialog.business.business?.category || "Business"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    <span>
                      <strong>Owner:</strong> {rejectDialog.business.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>{rejectDialog.business.email}</span>
                  </div>
                </div>
              </div>

              {/* Rejection Reason */}
              {rejectDialog.type === "reject" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    💬 Admin Notes / Rejection Reason
                    <span className="text-red-600">*Required for rejection</span>
                  </label>
                  <Textarea
                    placeholder="Provide detailed feedback here..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="min-h-[120px] rounded-xl border-gray-200 focus:border-[#0A5C36] focus:ring-[#0A5C36]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: Be specific so the business owner knows exactly what to fix
                  </p>
                </div>
              )}
              
              {rejectDialog.type === "approve" && (
                <p className="text-sm text-gray-600">
                  Are you sure you want to approve <strong>{rejectDialog.business.business?.businessName}</strong>? 
                  They will be notified and their profile will become visible to users.
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setRejectDialog({ open: false, business: null, type: "approve" });
                    setRejectionReason("");
                  }}
                  variant="outline"
                  className="flex-1 border-gray-300 rounded-lg"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                {rejectDialog.type === "reject" ? (
                  <Button
                    onClick={handleSubmit}
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <X className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Rejecting..." : "Reject"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Approving..." : "Approve"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
