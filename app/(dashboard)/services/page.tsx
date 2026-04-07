"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { serviceService } from "@/services/serviceService";
import Swal from "sweetalert2";
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
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [stats, setStats] = useState([
    {
      icon: Package,
      title: "Total Services",
      value: "0",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      title: "Average Price",
      value: "0",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Calendar,
      title: "Booking Success",
      value: "95%",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Star,
      title: "Avg Rating",
      value: "0",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ]);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await serviceService.getServices({
        page: currentPage,
        limit: 10,
        searchTerm: searchQuery,
      });

      if (response.success) {
        setServices(response.data);
        setTotalPages(response.meta.totalPage);
        setTotalCount(response.meta.total);

        // Update stats
        const total = response.meta.total;
        const avgPrice = response.data.length > 0 
          ? (response.data.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0) / response.data.length).toFixed(2)
          : 0;
        const avgRating = response.data.length > 0
          ? (response.data.reduce((acc: number, curr: any) => acc + (curr.rating?.averageRating || 0), 0) / response.data.length).toFixed(1)
          : 0;

        setStats(prev => prev.map(s => {
          if (s.title === "Total Services") return { ...s, value: total.toString() };
          if (s.title === "Average Price") return { ...s, value: `$${avgPrice}` };
          if (s.title === "Avg Rating") return { ...s, value: avgRating.toString() };
          return s;
        }));
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch services");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage, searchQuery]);

  const handleDeleteService = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0A5C36",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await serviceService.deleteService(id);
          if (response.success) {
            Swal.fire({
              title: "Deleted!",
              text: "The service has been deleted.",
              icon: "success",
              confirmButtonColor: "#0A5C36",
              customClass: { popup: "rounded-2xl" }
            });
            fetchServices();
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to delete service");
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
            Service Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalCount} total services available in the platform
          </p>
        </div>
        <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Download className="w-4 h-4 mr-2" />
          Export
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

      {/* Filters */}
      <Card className="border-gray-200 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search services or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Button variant="outline" className="border-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Category
            </Button>
            <Button variant="outline" className="border-gray-300 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
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
                Service
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Provider/Business
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Duration
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
            {!isLoading && services.map((service) => (
              <tr
                key={service._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 rounded-lg">
                      <AvatarImage src={service.photos?.[0]} className="object-cover" />
                      <AvatarFallback className="bg-[#E8F5E9] text-[#0A5C36] font-semibold rounded-lg">
                        {service.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {service.providerInfo?.business?.businessName || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.providerInfo?.fullName || "N/A"}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-0">
                    {service.categoryInfo?.name || "Uncategorized"}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-gray-900">
                  ${service.price}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {service.duration} mins
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {service.rating?.averageRating || 0}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({service.bookingCount})
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    className={
                      service.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-100 border-0"
                        : "bg-red-100 text-red-700 hover:bg-red-100 border-0"
                    }
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <Eye className="w-4 h-4 text-gray-600 group-hover:text-[#0A5C36]" />
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service._id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && services.length === 0 && (
              <tr>
                <td colSpan={8} className="py-20 text-center text-gray-500 bg-gray-50">
                  No services found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{services.length}</span> of <span className="font-medium">{totalCount}</span> services
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

      {/* Service Details Modal */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                  Service Details
                  <Badge className={selectedService.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {selectedService.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-8 mt-6">
                {/* Visual Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-video relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                    {selectedService.photos?.[0] ? (
                      <img 
                        src={selectedService.photos[0]} 
                        alt={selectedService.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                         <Package className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedService.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{selectedService.categoryInfo?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold text-gray-900">{selectedService.rating?.averageRating || 0}</span>
                      <span className="text-sm text-gray-500">({selectedService.bookingCount} bookings)</span>
                    </div>
                    <div className="text-3xl font-bold text-[#0A5C36]">
                      ${selectedService.price}
                      <span className="text-sm font-normal text-gray-400 ml-1">/ {selectedService.duration} mins</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl">
                    {selectedService.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.features?.map((feature: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="px-3 py-1 rounded-full border-gray-200 text-gray-600 bg-white">
                        <CheckCircle className="w-3 h-3 text-[#0A5C36] mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Provider Card */}
                <Card className="border-gray-200 rounded-2xl bg-gray-50 overflow-hidden border-dashed border-2">
                  <CardContent className="p-5">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Service Provider</h4>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 rounded-xl border border-white shadow-sm">
                        <AvatarImage src={selectedService.providerInfo?.image} className="object-cover" />
                        <AvatarFallback className="bg-white text-gray-400 rounded-xl font-bold">
                          {selectedService.providerInfo?.fullName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-base font-bold text-gray-900">{selectedService.providerInfo?.business?.businessName}</p>
                        <p className="text-sm text-gray-600">{selectedService.providerInfo?.fullName}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border">
                            <MapPin className="w-3 h-3" />
                            {selectedService.providerInfo?.business?.city}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 font-medium">
                            {selectedService.providerInfo?.business?.businessStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Close Button */}
                <Button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg h-12 text-base font-semibold transition-all shadow-lg shadow-green-900/10"
                >
                  Close Details
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}