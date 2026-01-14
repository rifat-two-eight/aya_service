"use client";

import { useState } from "react";
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
import {
  Users,
  DollarSign,
  Package,
  Plus,
  CheckCircle,
  MoreVertical,
  X,
} from "lucide-react";

const statsCards = [
  {
    icon: Users,
    title: "Total Subscribers",
    value: "76",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: DollarSign,
    title: "Monthly Recurring Revenue",
    value: "$4,714",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Package,
    title: "Active Plans",
    value: "3",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

const initialPlans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 9,
    interval: "month",
    subscribers: 45,
    monthlyRevenue: 1305,
    status: "active",
    features: [
      "List up to 5 services",
      "Basic analytics",
      "Email support",
      "Standard listing placement",
    ],
  },
  {
    id: 2,
    name: "Professional Plan",
    price: 86,
    interval: "12/month",
    subscribers: 23,
    monthlyRevenue: 1817,
    status: "active",
    features: [
      "List up to 20 services",
      "Advanced analytics",
      "Priority support",
      "Featured listing placement",
      "Custom branding",
    ],
  },
];

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({
    name: "",
    months: "",
    price: "",
    features: [""],
  });

  const handleAddFeature = () => {
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, ""],
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.months || !newPlan.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Plan created successfully!");
    setCreateDialog(false);
    setNewPlan({ name: "", months: "", price: "", features: [""] });
  };

  const handleSaveEdit = () => {
    toast.success("Plan updated successfully!");
    setEditDialog(null);
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

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="border-gray-200 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-gray-600">
                      /{plan.interval}
                    </span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {plan.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subscribers</span>
                  <span className="font-semibold text-gray-900">
                    {plan.subscribers}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold text-gray-900">
                    ${plan.monthlyRevenue}
                  </span>
                </div>
              </div>

              <div className="mb-4">
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
                  Edit Plan
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-300"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600">
                      Delete Plan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Plan CTA */}
      <Card className="border-0 bg-linear-to-br from-[#0A5C36] to-[#154a2e] text-white rounded-2xl">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Need a Custom Plan?</h3>
          <p className="text-white/80 mb-6">
            Create tailored subscription plans for specific business needs
          </p>
          <Button
            onClick={() => setCreateDialog(true)}
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Plan
          </Button>
        </CardContent>
      </Card>

      {/* Create Plan Dialog */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create New Plan
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="planName" className="text-sm font-medium">
                Plan Name
              </Label>
              <Input
                id="planName"
                placeholder="e.g., Professional Plan"
                value={newPlan.name}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, name: e.target.value })
                }
                className="mt-1 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="months" className="text-sm font-medium">
                How Many Month
              </Label>
              <Input
                id="months"
                type="number"
                placeholder="6"
                value={newPlan.months}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, months: e.target.value })
                }
                className="mt-1 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-sm font-medium">
                6 Month Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="9"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: e.target.value })
                }
                className="mt-1 rounded-lg"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Features</Label>
              {newPlan.features.map((feature, index) => (
                <Input
                  key={index}
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="mt-2 rounded-lg"
                />
              ))}
              <Button
                onClick={handleAddFeature}
                variant="outline"
                size="sm"
                className="mt-3 border-gray-300 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>

            {/* Preview */}
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                Preview
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">
                  {newPlan.name || "Plan Name"}
                </h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-gray-900">
                    ${newPlan.price || "9"}
                  </span>
                  <span className="text-sm text-gray-600">/6month</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {newPlan.features.filter((f) => f).length > 0
                    ? `${newPlan.features.filter((f) => f).length} features`
                    : "No features added yet"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
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
        <DialogContent className="max-w-md">
          {editDialog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Edit Subscription Plan
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {editDialog.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Current Price: ${editDialog.price} per month
                  </p>
                </div>

                <div>
                  <Label htmlFor="editName" className="text-sm font-medium">
                    New Plan Name
                  </Label>
                  <Input
                    id="editName"
                    defaultValue={editDialog.name}
                    className="mt-1 rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="editPrice" className="text-sm font-medium">
                    New Price
                  </Label>
                  <Input
                    id="editPrice"
                    type="number"
                    defaultValue={editDialog.price}
                    className="mt-1 rounded-lg"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Features
                  </Label>
                  {editDialog.features.map((feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 mb-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <Input
                    placeholder="Features"
                    className="mt-2 rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 bg-[#0A5C36] text-white hover:bg-[#154a2e] rounded-lg"
                  >
                    Add Feature
                  </Button>
                </div>

                <div className="flex gap-3 pt-2">
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