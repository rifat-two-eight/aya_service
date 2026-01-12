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
  Package,
  DollarSign,
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Star,
  MapPin,
  User,
  Phone,
} from "lucide-react";

const statsCards = [
  {
    icon: Package,
    title: "Total Services",
    value: "12",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: DollarSign,
    title: "Total Revenue",
    value: "$276,595",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Calendar,
    title: "Total Bookings",
    value: "405",
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

const servicesData = [
  {
    id: 1,
    name: "Family Dinner Package",
    duration: "2 hours",
    business: "Tony's Italian Restaurant",
    businessOwner: "Tony Russo",
    category: "Restaurant",
    price: "$85",
    bookings: 45,
    revenue: "$3,825",
    rating: 4.8,
    status: "Active",
  },
  {
    id: 2,
    name: "Wedding Catering Premium",
    duration: "8 hours",
    business: "Premium Catering",
    businessOwner: "Sarah Miller",
    category: "Catering",
    price: "$5000",
    bookings: 12,
    revenue: "$60,000",
    rating: 4.9,
    status: "Active",
  },
  {
    id: 3,
    name: "Corporate Event Planning",
    duration: "1 day",
    business: "Islamic Wedding Planners",
    businessOwner: "Mariam Ali",
    category: "Events",
    price: "$2000",
    bookings: 23,
    revenue: "$46,000",
    rating: 4.7,
    status: "Active",
  },
  {
    id: 4,
    name: "Lunch Buffet Special",
    duration: "1.5 hours",
    business: "Halal Grill House",
    businessOwner: "Ahmed Ibrahim",
    category: "Restaurant",
    price: "$50",
    bookings: 89,
    revenue: "$4,450",
    rating: 4.9,
    status: "Active",
  },
  {
    id: 5,
    name: "Birthday Party Package",
    duration: "4 hours",
    business: "Quick Catering Services",
    businessOwner: "Sarah Miller",
    category: "Catering",
    price: "$350",
    bookings: 34,
    revenue: "$11,900",
    rating: 4.5,
    status: "Pending",
  },
  {
    id: 6,
    name: "Private Chef Experience",
    duration: "3 hours",
    business: "Tony's Italian Restaurant",
    businessOwner: "Tony Russo",
    category: "Restaurant",
    price: "$450",
    bookings: 18,
    revenue: "$8,100",
    rating: 5,
    status: "Active",
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<
    typeof servicesData[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = servicesData.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.business.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Service Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            12 total services • 10 active • 1 pending
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

      {/* Filters */}
      <Card className="border-gray-200 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search services or businesses..."
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

      {/* Services Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Service
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Business
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Bookings
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Revenue
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Rating
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr
                key={service.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] font-semibold">
                        {service.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {service.business}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.businessOwner}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      service.category === "Restaurant"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        : service.category === "Catering"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-100"
                    }
                  >
                    {service.category}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                  {service.price}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {service.bookings}
                </td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                  {service.revenue}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {service.rating}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      service.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {service.status}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
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

      {/* Service Details Modal */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-md">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Service Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Service Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] text-xl font-semibold">
                      {selectedService.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedService.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedService.duration}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={
                          selectedService.category === "Restaurant"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            : selectedService.category === "Catering"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-100"
                        }
                      >
                        {selectedService.category}
                      </Badge>
                      <Badge
                        className={
                          selectedService.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        }
                      >
                        {selectedService.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <p className="text-xs font-medium">Business</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedService.business}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedService.businessOwner}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <p className="text-xs font-medium">Price</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedService.price}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <p className="text-xs font-medium">Bookings</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedService.bookings}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Star className="w-4 h-4" />
                      <p className="text-xs font-medium">Rating</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <p className="text-lg font-bold text-gray-900">
                        {selectedService.rating}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <p className="text-xs font-medium">Duration</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedService.duration}
                    </p>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-xs font-medium">Total Revenue</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedService.revenue}
                  </p>
                </div>

                {/* Close Button */}
                <Button
                  onClick={() => setSelectedService(null)}
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