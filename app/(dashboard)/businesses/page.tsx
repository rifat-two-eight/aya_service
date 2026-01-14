"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
} from "lucide-react";

const pendingNewBusinesses = [
  {
    id: 1,
    name: "Halal Grill House",
    category: "Restaurant",
    description: "Authentic halal Mediterranean cuisine with traditional recipes",
    owner: "Ahmed Ibrahim",
    email: "ahmed@halalgrill.com",
    phone: "(555) 234-5678",
    location: "Downtown, Chicago",
    documentsSubmitted: ["Articles of Organization"],
    submittedDate: "2026-01-05",
    type: "new",
  },
  {
    id: 2,
    name: "Premium Catering Services",
    category: "Catering",
    description: "Full-service halal catering for events, weddings, and corporate functions",
    owner: "Fatima Hassan",
    email: "fatima@premiumcater.com",
    phone: "(555) 345-6789",
    location: "West Side, New York",
    documentsSubmitted: ["Articles of Organization"],
    submittedDate: "2026-01-04",
    type: "new",
  },
  {
    id: 3,
    name: "Elite Event Planning",
    category: "Events",
    description: "Professional event planning and coordination services",
    owner: "Sarah Miller",
    email: "sarah@eliteevent.com",
    phone: "(555) 456-7890",
    location: "Manhattan, New York",
    documentsSubmitted: ["Articles of Organization"],
    submittedDate: "2026-01-03",
    type: "new",
  },
];

const pendingProfileUpdates = [
  {
    id: 4,
    name: "Tony's Italian Restaurant",
    category: "Restaurant",
    owner: "Tony Russo",
    email: "tony@italianrest.com",
    changes: [
      "Added new location",
      "Updated menu",
      "New phone number",
    ],
    newLocation: "Updated: Now also serving in Brooklyn",
    submittedDate: "2026-01-06",
    type: "update",
  },
  {
    id: 5,
    name: "Quick Catering Services",
    category: "Catering",
    owner: "Sarah Miller",
    email: "sarah@quickcater.com",
    changes: [
      "Expanded service area",
      "Updated pricing",
      "Added halal certification",
    ],
    newLocation: "Updated service area to include New Jersey",
    submittedDate: "2026-01-05",
    type: "update",
  },
];

export default function BusinessesPage() {
  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    business: any;
    type: "approve" | "reject";
  }>({ open: false, business: null, type: "approve" });
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (rejectDialog.type === "approve") {
        toast.success(
          `${rejectDialog.business.name} has been approved successfully!`
        );
      } else {
        toast.success(
          `${rejectDialog.business.name} has been rejected. Owner will be notified.`
        );
      }

      setRejectDialog({ open: false, business: null, type: "approve" });
      setRejectionReason("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Business Management & Approvals
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          3 pending new businesses • 2 pending updates
        </p>
      </div>

      {/* Pending New Businesses */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Pending New Businesses (3)
          </h2>
        </div>

        <div className="space-y-4">
          {pendingNewBusinesses.map((business) => (
            <div
              key={business.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <Avatar className="w-14 h-14 bg-[#0A5C36]">
                    <AvatarFallback className="bg-[#0A5C36] text-white">
                      <Building2 className="w-7 h-7" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {business.name}
                      </h3>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        {business.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {business.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>
                          <strong>Owner:</strong> {business.owner}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{business.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{business.location}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-medium">Documents Submitted:</span>
                      </div>
                      <div className="flex gap-2">
                        {business.documentsSubmitted.map((doc, idx) => (
                          <Badge
                            key={idx}
                            className="bg-green-100 text-green-700 hover:bg-green-100"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Submitted: {business.submittedDate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleApprove(business)}
                    className="bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg min-w-25"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(business)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 rounded-lg min-w-25"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Profile Updates */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-yellow-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Pending Profile Updates (2)
          </h2>
        </div>

        <div className="space-y-4">
          {pendingProfileUpdates.map((business) => (
            <div
              key={business.id}
              className="border border-yellow-200 bg-yellow-50 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <Avatar className="w-14 h-14 bg-orange-500">
                    <AvatarFallback className="bg-orange-500 text-white">
                      <Building2 className="w-7 h-7" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {business.name}
                      </h3>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        {business.category} • Profile Update Request
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>
                          <strong>Owner:</strong> {business.owner}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{business.email}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        📝 Changes Requested:
                      </p>
                      <ul className="space-y-1 mb-3">
                        {business.changes.map((change, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-700">
                        <strong>New Location:</strong> {business.newLocation}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500">
                      Submitted: {business.submittedDate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleApprove(business)}
                    className="bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg min-w-25"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(business)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 rounded-lg min-w-25"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
                ? "Approve New Business"
                : "Reject Business"}
            </DialogTitle>
          </DialogHeader>

          {rejectDialog.business && (
            <div className="space-y-6 mt-4">
              {/* Business Info */}
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rejectDialog.business.name}
                  </h3>
                  <Badge className="bg-[#0A5C36] text-white hover:bg-[#0A5C36]">
                    {rejectDialog.business.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    <span>
                      <strong>Owner:</strong> {rejectDialog.business.owner}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>{rejectDialog.business.email}</span>
                  </div>
                </div>

                {rejectDialog.business.documentsSubmitted && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">Documents Submitted:</span>
                    </div>
                    <div className="flex gap-2">
                      {rejectDialog.business.documentsSubmitted.map((doc: string, idx: number) => (
                        <Badge
                          key={idx}
                          className="bg-green-100 text-green-700 hover:bg-green-100"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
                    className="min-h-30 rounded-xl"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: Be specific so the business owner knows exactly what to fix
                  </p>
                </div>
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
                    <X className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Rejecting..." : "Reject"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg"
                    disabled={isSubmitting}
                  >
                    <Check className="w-4 h-4 mr-2" />
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