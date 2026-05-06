"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Bell, Filter, Star, CheckCircle2, SearchCode, LocateFixed, ChevronRight, Calendar, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serviceService } from "@/services/serviceService";
import { categoryService } from "@/services/categoryService";
import { notificationService } from "@/services/notificationService";
import { metaService } from "@/services/metaService";
import { toast } from "sonner";

export default function ClientHomePage() {
    const [services, setServices] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [landingStats, setLandingStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const [unreadNotifCount, setUnreadNotifCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, categoriesRes, notifRes, statsRes] = await Promise.allSettled([
                    serviceService.getTopRatedServices(),
                    categoryService.getCategories(),
                    notificationService.getUnreadCount(),
                    metaService.getLandingStats()
                ]);

                if (servicesRes.status === 'fulfilled' && servicesRes.value.success) {
                    setServices(servicesRes.value.data.slice(0, 3));
                }

                if (categoriesRes.status === 'fulfilled' && categoriesRes.value.success) {
                    setCategories(categoriesRes.value.data.categories);
                }

                if (notifRes.status === 'fulfilled' && notifRes.value.success) {
                    setUnreadNotifCount(notifRes.value.data?.unreadCount || 0);
                }

                if (statsRes.status === 'fulfilled' && statsRes.value.success) {
                    setLandingStats(statsRes.value.data);
                }
            } catch (error: any) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data");
            } finally {
                setIsLoading(false);
                setIsCategoriesLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="flex flex-col gap-10 md:gap-16 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl md:text-3xl font-medium text-[#0A5C36] tracking-tight">Aya Shop</h2>
                    <div className="flex items-center gap-2 text-gray-400 text-lg font-medium">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span>Barcelona, Spain</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/profile" className="p-4 bg-white border border-gray-100 rounded-[28px] text-gray-400 hover:text-[#0A5C36] transition-all shadow-sm hover:shadow-md group">
                        <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link href="/messages" className="p-4 bg-white border border-gray-100 rounded-[28px] text-gray-400 hover:text-[#0A5C36] transition-all shadow-sm hover:shadow-md group relative">
                        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white" />
                    </Link>
                    <Link href="/bookings" className="p-4 bg-white border border-gray-100 rounded-[28px] text-gray-400 hover:text-[#0A5C36] transition-all shadow-sm hover:shadow-md group">
                        <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link href="/notifications" className="p-4 bg-white border border-gray-100 rounded-[28px] text-gray-400 hover:text-[#0A5C36] transition-all relative shadow-sm hover:shadow-md group">
                        <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        {unreadNotifCount > 0 && (
                            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black rounded-full px-1.5 py-0.5 border-2 border-white flex items-center justify-center min-w-[20px]">
                                {unreadNotifCount}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#0A5C36] transition-colors" />
                    <Input
                        placeholder="Search for any service..."
                        className="h-16 pl-14 rounded-3xl border-gray-100 bg-white focus:bg-white transition-all text-xl shadow-sm"
                    />
                </div>
                <Button className="h-16 px-8 rounded-3xl bg-white border border-gray-100 text-[#0A5C36] hover:bg-green-50 shadow-sm flex items-center gap-3 font-bold text-lg">
                    <Filter className="w-6 h-6" />
                    <span className="hidden md:inline">Advanced Filters</span>
                </Button>
            </div>

            {/* Featured Banner */}
            <div className="relative rounded-[40px] overflow-hidden bg-[#2D333B] h-64 md:h-80 lg:h-[400px] group cursor-pointer shadow-2xl shadow-black/10">
                <Image
                    unoptimized={true}
                    src="/handshake.jpg"
                    alt="Featured Service"
                    fill
                    className=""
                />
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                <div className="absolute inset-0 flex items-center">
                    <div className="flex flex-col ml-8 gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-white/90 bg-white/10 ring-1 ring-white/20">
                            Featured
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-medium">
                            Book Top-Rated Service
                        </h3>
                        <Link href="/listings" className="mt-1 inline-flex">
                            <Button className="h-10 px-4 rounded-lg bg-white text-[#0A5C36] hover:bg-gray-100 font-medium">
                                Explore Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>



            {/* Business Owner Promo */}
            <div className="bg-green-50/50 rounded-3xl p-6 flex items-center justify-between border border-green-100/50">
                <div className="space-y-1">
                    <p className="font-bold text-gray-900">Are you a business owner?</p>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">Subscribe to list your business and reach thousands of customers</p>
                </div>
                <Button className="bg-[#0A5C36] hover:bg-[#0d7344] rounded-xl px-5 font-bold shadow-md shadow-green-900/10">Subscribe</Button>
            </div>

            {/* Categories */}
            <section className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Top Business Categories</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">
                    {isCategoriesLoading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 animate-pulse">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-[32px]" />
                                <div className="h-4 w-16 bg-gray-50 rounded-lg" />
                            </div>
                        ))
                    ) : categories.length > 0 ? (
                        categories.map((cat) => (
                            <div key={cat._id} className="flex flex-col items-center gap-4 group cursor-pointer">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-white border border-gray-100 rounded-[32px] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-110 group-hover:border-[#0A5C36] group-hover:shadow-xl transition-all duration-500 relative">
                                    {cat.image ? (
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover"
                                            unoptimized={true}
                                        />
                                    ) : (
                                        <div className="text-2xl opacity-20">📦</div>
                                    )}
                                </div>
                                <span className="text-sm font-black text-gray-500 group-hover:text-[#0A5C36] transition-colors text-center line-clamp-1">{cat.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-400 font-bold">No categories found</div>
                    )}
                </div>
            </section>

            {/* Landing Stats */}
            {landingStats && (
                <div className="grid grid-cols-3 gap-4 md:gap-8 bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm mt-8">
                    <div className="text-center space-y-1">
                        <p className="text-2xl md:text-4xl font-black text-[#0A5C36]">{landingStats.totalProviders}+</p>
                        <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Total Providers</p>
                    </div>
                    <div className="text-center space-y-1 border-x border-gray-100">
                        <p className="text-2xl md:text-4xl font-black text-[#0A5C36]">{landingStats.totalJobsDone}+</p>
                        <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Jobs Completed</p>
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-2xl md:text-4xl font-black text-[#0A5C36]">{landingStats.totalServices}+</p>
                        <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Total Services</p>
                    </div>
                </div>
            )}


            {/* Top Rated Services */}
            <section className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Top Rated Services</h3>
                    <Link href="/listings" className="text-xs font-black text-[#0A5C36] bg-green-50 px-6 py-3 rounded-full hover:bg-green-100 transition-all flex items-center gap-2 uppercase tracking-widest shadow-sm">
                        View All Listings <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-gray-50 rounded-[40px] animate-pulse" />
                        ))
                    ) : services.length > 0 ? (
                        services.map((service) => (
                            <Link
                                href={`/services/${service._id}`}
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
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400 font-bold text-xl">
                            No services found matching your criteria.
                        </div>
                    )}
                </div>
            </section>

            {/* Why AYA? */}
            <section className="space-y-10">
                <h3 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight text-center">The AYA Shop Advantage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
                    <FeatureCard
                        icon={<CheckCircle2 className="w-8 h-8 text-white" />}
                        title="Verified Businesses"
                        description="Every business listed on our platform undergoes a rigorous manual verification process by our admin team."
                    />
                    <FeatureCard
                        icon={<SearchCode className="w-8 h-8 text-white" />}
                        title="Easy Search"
                        description="Find exactly what you are looking for with our powerful location-based search and advanced category filtering."
                    />
                    <FeatureCard
                        icon={<LocateFixed className="w-8 h-8 text-white" />}
                        title="Hyper-Local Results"
                        description="Auto-detect your current location or browse by specific neighborhoods to support local experts in your area."
                    />
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: any) {
    return (
        <div className="flex gap-5 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#0A5C36] transition-all group">
            <div className="w-14 h-14 bg-[#0A5C36] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/10 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="flex-1 space-y-1">
                <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{description}</p>
            </div>
        </div>
    );
}
