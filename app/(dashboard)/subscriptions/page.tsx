"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { planService, PlanData } from "@/services/planService";
import Swal from "sweetalert2";
import {
  Users,
  DollarSign,
  Package,
  Plus,
  CheckCircle,
  MoreVertical,
  X,
  Loader2,
  Trash2,
  Edit,
} from "lucide-react";

// Initial stats template
const initialStats = [
  {
    icon: Users,
    title: "Active Subscriptions",
    value: "0",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    key: "activeSubscriptions",
  },
  {
    icon: Package,
    title: "Plans Available",
    value: "0",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    key: "plansCount",
  },
  {
    icon: CheckCircle,
    title: "Success Rate",
    value: "100%",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    key: "successRate",
  },
];

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [stats, setStats] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(true);
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<PlanData | null>(null);
  const [newPlan, setNewPlan] = useState<PlanData>({
    title: "",
    description: "",
    price: 0,
    duration: "1 month",
    paymentType: "Monthly",
    features: [""],
  });

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await planService.getPlans();
      if (response.success) {
        setPlans(response.data.plans);

        // Update stats from meta
        const meta = response.data.meta;
        setStats(prev => prev.map(s => {
          if (s.key === "activeSubscriptions") return { ...s, value: meta.activeSubscriptions.toString() };
          if (s.key === "plansCount") return { ...s, value: response.data.plans.length.toString() };
          return s;
        }));
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch plans");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddFeature = (isEdit: boolean = false) => {
    if (isEdit && editDialog) {
      setEditDialog({
        ...editDialog,
        features: [...editDialog.features, ""],
      });
    } else {
      setNewPlan({
        ...newPlan,
        features: [...newPlan.features, ""],
      });
    }
  };

  const handleRemoveFeature = (index: number, isEdit: boolean = false) => {
    if (isEdit && editDialog) {
      const updatedFeatures = editDialog.features.filter((_, i) => i !== index);
      setEditDialog({ ...editDialog, features: updatedFeatures });
    } else {
      const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
      setNewPlan({ ...newPlan, features: updatedFeatures });
    }
  };

  const handleFeatureChange = (index: number, value: string, isEdit: boolean = false) => {
    if (isEdit && editDialog) {
      const updatedFeatures = [...editDialog.features];
      updatedFeatures[index] = value;
      setEditDialog({ ...editDialog, features: updatedFeatures });
    } else {
      const updatedFeatures = [...newPlan.features];
      updatedFeatures[index] = value;
      setNewPlan({ ...newPlan, features: updatedFeatures });
    }
  };

  const handleCreatePlan = async () => {
    if (!newPlan.title || !newPlan.price || !newPlan.duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await planService.createPlan({
        ...newPlan,
        features: newPlan.features.filter(f => f.trim() !== "")
      });
      if (response.success) {
        Swal.fire({
          title: "Created!",
          text: "New subscription plan has been created.",
          icon: "success",
          confirmButtonColor: "#0A5C36",
          customClass: { popup: "rounded-2xl" }
        });
        setCreateDialog(false);
        setNewPlan({
          title: "",
          description: "",
          price: 0,
          duration: "1 month",
          paymentType: "Monthly",
          features: [""],
        });
        fetchPlans();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create plan");
    }
  };

  const handleSaveEdit = async () => {
    if (!editDialog || !editDialog._id) return;

    try {
      const response = await planService.updatePlan(editDialog._id, {
        title: editDialog.title,
        description: editDialog.description,
        price: Number(editDialog.price),
        duration: editDialog.duration,
        paymentType: editDialog.paymentType,
        features: editDialog.features.filter(f => f.trim() !== "")
      });
      if (response.success) {
        Swal.fire({
          title: "Updated!",
          text: "Plan has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#0A5C36",
          customClass: { popup: "rounded-2xl" }
        });
        setEditDialog(null);
        fetchPlans();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update plan");
    }
  };

  const handleDeletePlan = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This plan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0A5C36",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-2xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await planService.deletePlan(id);
          if (response.success) {
            Swal.fire({
              title: "Deleted!",
              text: "The plan has been deleted.",
              icon: "success",
              confirmButtonColor: "#0A5C36",
              customClass: { popup: "rounded-2xl" }
            });
            fetchPlans();
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to delete plan");
        }
      }
    });
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage pricing plans and subscribers
          </p>
        </div>
        <Button
          onClick={() => setCreateDialog(true)}
          className="bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Plans Grid */}
      <div className="relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A5C36]" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card key={plan._id} className="border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {plan.title}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-sm text-gray-600">
                        /{plan.duration}
                      </span>
                    </div>
                  </div>
                  <Badge className={`${plan.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} hover:bg-transparent`}>
                    {plan.status || 'Active'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Features:
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditDialog(plan)}
                    className="flex-1 bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Plan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => plan._id && handleDeletePlan(plan._id)}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {!isLoading && plans.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No subscription plans found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create New Plan
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="planTitle" className="text-sm font-medium">
                Plan Title
              </Label>
              <Input
                id="planTitle"
                placeholder="e.g., Professional Plan"
                value={newPlan.title}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, title: e.target.value })
                }
                className="mt-1 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="planDesc" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="planDesc"
                placeholder="Short description of the plan"
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
                className="mt-1 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="29.99"
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, price: Number(e.target.value) })
                  }
                  className="mt-1 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="text-sm font-medium">
                  Duration
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g., 1 month"
                  value={newPlan.duration}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, duration: e.target.value })
                  }
                  className="mt-1 rounded-lg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="paymentType" className="text-sm font-medium">
                Payment Type
              </Label>
              <select
                id="paymentType"
                value={newPlan.paymentType}
                onChange={(e) => setNewPlan({ ...newPlan, paymentType: e.target.value })}
                className="w-full mt-1 border border-gray-200 rounded-lg p-2 text-sm"
              >
                <option value="Monthly">Monthly</option>
                <option value="One-time">One-time</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div>
              <Label className="text-sm font-medium block mb-2">Features</Label>
              {newPlan.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFeature(index)}
                    className="shrink-0 border-gray-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => handleAddFeature(false)}
                variant="outline"
                size="sm"
                className="mt-1 border-gray-300 rounded-lg w-full dashed"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>

            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
              <Button
                onClick={() => setCreateDialog(false)}
                variant="outline"
                className="flex-1 border-gray-300 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreatePlan}
                className="flex-1 bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg"
              >
                Create Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {editDialog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Edit Subscription Plan
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="editTitle" className="text-sm font-medium">
                    Plan Title
                  </Label>
                  <Input
                    id="editTitle"
                    value={editDialog.title}
                    onChange={(e) => setEditDialog({ ...editDialog, title: e.target.value })}
                    className="mt-1 rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="editDesc" className="text-sm font-medium">
                    Description
                  </Label>
                  <Input
                    id="editDesc"
                    value={editDialog.description}
                    onChange={(e) => setEditDialog({ ...editDialog, description: e.target.value })}
                    className="mt-1 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editPrice" className="text-sm font-medium">
                      Price ($)
                    </Label>
                    <Input
                      id="editPrice"
                      type="number"
                      value={editDialog.price}
                      onChange={(e) => setEditDialog({ ...editDialog, price: Number(e.target.value) })}
                      className="mt-1 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editDuration" className="text-sm font-medium">
                      Duration
                    </Label>
                    <Input
                      id="editDuration"
                      value={editDialog.duration}
                      onChange={(e) => setEditDialog({ ...editDialog, duration: e.target.value })}
                      className="mt-1 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium block mb-2">Features</Label>
                  {editDialog.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value, true)}
                        className="rounded-lg"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveFeature(idx, true)}
                        className="shrink-0 border-gray-200 hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() => handleAddFeature(true)}
                    variant="outline"
                    size="sm"
                    className="mt-1 border-gray-300 rounded-lg w-full dashed"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </Button>
                </div>

                <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                  <Button
                    onClick={() => setEditDialog(null)}
                    variant="outline"
                    className="flex-1 border-gray-300 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
