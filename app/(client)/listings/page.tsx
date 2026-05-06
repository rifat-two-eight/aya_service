"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceService } from "@/services/serviceService";
import { toast } from "sonner";

export default function ListingsPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await serviceService.getServices({ page, limit });
        if (response.success) {
          setServices(response.data);
          setTotalPages(response.meta.totalPage);
        }
      } catch (error: any) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 hover:text-gray-900"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
              All Service Listings
            </h1>
            <p className="text-sm text-gray-500">
              Explore our comprehensive list of verified service providers
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-50 rounded-[40px] animate-pulse" />
          ))
        ) : services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="flex flex-col gap-6 p-6 rounded-[40px] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 group cursor-pointer relative overflow-hidden"
            >
              <div className="relative w-full h-56 rounded-[32px] overflow-hidden shadow-inner bg-gray-50">
                {service.photos?.[0] ? (
                  <Image
                    src={service.photos[0]}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    No Image
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <h4 className="font-black text-gray-900 text-xl leading-tight group-hover:text-[#0A5C36] transition-colors line-clamp-1">
                      {service.name}
                    </h4>
                    <span className="inline-block bg-green-50 text-[#0A5C36] text-[10px] font-black uppercase tracking-[1px] px-3 py-1.5 rounded-lg">
                      {service.categoryInfo?.name || "Service"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                    <MapPin className="w-4 h-4 text-red-400" />
                    {service.providerInfo?.business?.city}, {service.providerInfo?.business?.state}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-black text-gray-900">
                      {service.rating?.averageRating || 0}
                    </span>
                    <span className="text-xs text-gray-400 font-bold ml-1">
                      ({service.rating?.total || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <Link href={`/services/${service._id}`} className="flex-1">
                  <Button className="w-full h-12 bg-[#0A5C36] hover:bg-[#0d7344] rounded-2xl font-black text-xl shadow-xl shadow-green-900/20 active:scale-[0.97] transition-all">
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="h-12 w-16 rounded-2xl border-gray-100 hover:bg-white hover:border-[#0A5C36] p-0 shadow-sm group"
                  aria-label="Message"
                >
                  <MessageSquare className="w-7 h-7 text-gray-400 group-hover:text-[#0A5C36]" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold text-xl">
            No services found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`h-12 w-12 rounded-xl transition-all ${
                  page === i + 1
                    ? "bg-[#0A5C36] text-white shadow-lg shadow-green-900/20"
                    : "bg-white border border-gray-100 text-gray-600 hover:border-[#0A5C36] hover:text-[#0A5C36]"
                }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
