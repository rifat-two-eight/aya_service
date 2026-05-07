"use client";

import { Search, MapPin, ChevronLeft, Filter, Star, Heart, MessageSquare, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { serviceService } from "@/services/serviceService";
import { toast } from "sonner";

export default function SearchPage() {
    const router = useRouter();
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");

    const fetchServices = async (query = "") => {
        setIsLoading(true);
        try {
            const response = await serviceService.getServices({
                searchTerm: query,
                limit: 50, // Fetch a good amount for the search page
            });
            if (response.success) {
                // Determine if response.data is an array or object containing services
                const data = response.data.services || response.data.data || response.data;
                setServices(Array.isArray(data) ? data : []);
            }
        } catch (error: any) {
            console.error("Failed to fetch services:", error);
            toast.error("Failed to load services");
            setServices([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchServices(searchQuery);
    };

    return (
        <div className="flex flex-col gap-10 md:gap-16 pb-20">
            {/* Search Layout Header */}
            <form onSubmit={handleSearch} className="bg-white z-10 py-8 space-y-8 rounded-[40px] border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <button type="button" onClick={() => router.back()} className="hidden md:flex p-4 bg-gray-50 hover:bg-white border border-gray-100 rounded-2xl transition-all shadow-sm">
                        <ChevronLeft className="w-8 h-8 text-gray-900" />
                    </button>
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <Input
                            placeholder="What service are you looking for?"
                            className="h-16 pl-14 rounded-3xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-xl font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="relative space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="City, State or Zip"
                                className="h-14 pl-10 rounded-2xl border-gray-100 bg-white"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Radius</label>
                        <select className="w-full h-14 px-4 rounded-xl border-gray-100 bg-white font-medium text-gray-600 outline-none focus:ring-2 focus:ring-[#0A5C36]/20 transition-all">
                            <option>5 Miles</option>
                            <option>10 Miles</option>
                            <option>25 Miles</option>
                            <option>50 Miles</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Categories</label>
                        <select className="w-full h-14 px-4 rounded-xl border-gray-100 bg-white font-medium text-gray-600 outline-none focus:ring-2 focus:ring-[#0A5C36]/20 transition-all">
                            <option>All Categories</option>
                            <option>Doctors</option>
                            <option>Plumbers</option>
                            <option>Tax Services</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <Button type="submit" className="w-full h-14 bg-[#0A5C36] hover:bg-[#0d7344] rounded-2xl font-black text-lg shadow-xl shadow-green-900/20 transition-all">
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </form>

            {/* Results */}
            <div className="relative min-h-[400px]">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#0A5C36]" />
                        <p className="text-gray-500 font-medium">Finding services...</p>
                    </div>
                ) : services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                        {services.map((service, index) => (
                            <div
                                key={service._id || index}
                                className="flex flex-col gap-6 p-6 rounded-[40px] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                            >
                                <div className="relative w-full h-56 rounded-[32px] overflow-hidden shadow-inner bg-gray-50">
                                    {service.photos?.[0] ? (
                                        <Image
                                            src={service.photos[0]}
                                            alt={service.name || service.title || "Service"}
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
                                                {service.name || service.title || "Untitled Service"}
                                            </h4>
                                            <span className="inline-block bg-green-50 text-[#0A5C36] text-[10px] font-black uppercase tracking-[1px] px-3 py-1.5 rounded-lg">
                                                {service.categoryInfo?.name || service.businessId?.category?.name || service.category || "Service"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                                            <MapPin className="w-4 h-4 text-red-400" />
                                            {service.providerInfo?.business?.city || service.businessId?.city || "Unknown"}, {service.providerInfo?.business?.state || service.businessId?.state || ""}
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
                                        className="h-12 w-16 rounded-2xl border-gray-100 hover:bg-white hover:border-[#0A5C36] p-0 shadow-sm group shrink-0"
                                        aria-label="Message"
                                    >
                                        <MessageSquare className="w-7 h-7 text-gray-400 group-hover:text-[#0A5C36]" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No services found</h3>
                        <p className="text-gray-500 max-w-md">
                            We couldn't find any services matching your search criteria. Try adjusting your search term or filters.
                        </p>
                        <Button 
                            onClick={() => { setSearchQuery(""); fetchServices(""); }} 
                            variant="outline" 
                            className="mt-8 rounded-xl border-gray-200"
                        >
                            Clear Search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
