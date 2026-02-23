"use client";

import { Search, MapPin, Bell, Filter, Star, CheckCircle2, SearchCode, LocateFixed, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
    { name: "Restaurants", icon: "🍴" },
    { name: "Tax Services", icon: "💼" },
    { name: "Doctors", icon: "🩺" },
    { name: "Plumbers", icon: "🔧" },
    { name: "Handyman", icon: "🔨" },
    { name: "Attorney", icon: "⚖️" },
    { name: "Real Estate", icon: "🏠" },
    { name: "Groceries", icon: "🛒" },
];

const topServices = [
    {
        name: "Dr. Sarah Johnson - Family Medicine",
        category: "Doctors",
        location: "New York, NY",
        rating: 4.9,
        reviews: 423,
        image: "",
    },
    {
        name: "Premier Tax Solutions",
        category: "Tax Services",
        location: "New York, NY",
        rating: 4.8,
        reviews: 156,
        image: "",
    },
    {
        name: "Quick Fix Plumbing",
        category: "Plumbers",
        location: "Brooklyn, NY",
        rating: 4.6,
        reviews: 89,
        image: "",
    }
];

export default function ClientHomePage() {
    return (
        <div className="flex flex-col gap-10 md:gap-16 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Discover Services</h2>
                    <div className="flex items-center gap-2 text-gray-400 text-lg font-medium">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span>Barcelona, Spain</span>
                    </div>
                </div>
                <button className="p-4 bg-white border border-gray-100 rounded-[28px] text-gray-400 hover:text-[#0A5C36] transition-all relative shadow-sm hover:shadow-md">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white" />
                </button>
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
                    src=""
                    alt="Featured Service"
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-center items-start gap-6">
                    <span className="text-white bg-[#0A5C36] px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-lg">Featured Today</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white max-w-2xl leading-[1.1]">Book the Most Trusted Services Near You</h2>
                    <Button size="lg" className="h-16 px-10 bg-white text-[#0A5C36] hover:bg-gray-100 rounded-full flex items-center gap-3 font-black text-xl shadow-2xl shadow-green-900/20">
                        Explore Now <ChevronRight className="w-6 h-6" />
                    </Button>
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
                    {categories.map((cat) => (
                        <div key={cat.name} className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white border border-gray-100 rounded-[32px] flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 group-hover:border-[#0A5C36] group-hover:shadow-xl transition-all duration-500">
                                {cat.icon}
                            </div>
                            <span className="text-sm font-black text-gray-500 group-hover:text-[#0A5C36] transition-colors text-center">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-black/5">
                <div className="text-center space-y-2 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0">
                    <p className="text-4xl lg:text-5xl font-black text-[#0A5C36]">2.5K+</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Verified Providers</p>
                </div>
                <div className="text-center space-y-2 border-b md:border-b-0 md:border-r border-gray-100 py-8 md:py-0">
                    <p className="text-4xl lg:text-5xl font-black text-[#0A5C36]">15K+</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Jobs Completed</p>
                </div>
                <div className="text-center space-y-2 pt-8 md:pt-0">
                    <p className="text-4xl lg:text-5xl font-black text-[#0A5C36]">4.9★</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Customer Satisfaction</p>
                </div>
            </div>

            {/* Top Rated Services */}
            <section className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Top Rated Services</h3>
                    <button className="text-xs font-black text-[#0A5C36] bg-green-50 px-6 py-3 rounded-full hover:bg-green-100 transition-all flex items-center gap-2 uppercase tracking-widest shadow-sm">
                        View All Listings <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topServices.map((service) => (
                        <div key={service.name} className="flex flex-col gap-6 p-6 rounded-[40px] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 group cursor-pointer relative overflow-hidden">
                            <div className="relative w-full h-56 rounded-[32px] overflow-hidden shadow-inner">
                                <div className="absolute inset-0 bg-gray-100" />
                                <Image src={service.image} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/20">
                                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1 flex-1">
                                        <h4 className="font-black text-gray-900 text-xl leading-tight group-hover:text-[#0A5C36] transition-colors">{service.name}</h4>
                                        <span className="inline-block bg-green-50 text-[#0A5C36] text-[10px] font-black uppercase tracking-[1px] px-3 py-1.5 rounded-lg">{service.category}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                                        <MapPin className="w-4 h-4 text-red-400" />
                                        {service.location}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-black text-gray-900">{service.rating}</span>
                                        <span className="text-xs text-gray-400 font-bold ml-1">({service.reviews} reviews)</span>
                                    </div>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-gray-50 text-gray-900 font-black hover:bg-[#0A5C36] hover:text-white transition-all shadow-sm">
                                    View Provider Details
                                </Button>
                            </div>
                        </div>
                    ))}
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

function ChevronRight({ className }: { className?: string }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
}
