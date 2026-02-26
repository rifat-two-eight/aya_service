"use client";

import { Search, MapPin, ChevronLeft, Filter, Star, Heart, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const searchResults = [
    {
        name: "Dr. Sarah Johnson - Family Medicine",
        category: "Doctors",
        location: "New York, NY",
        rating: 4.9,
        reviews: 203,
        description: "Board-certified family physician with over 15 years of experience. Providing comprehensive healthcare for all.",
        phone: "(555) 123-4567",
        image: "",
    }
];

export default function SearchPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-10 md:gap-16 pb-20">
            {/* Search Layout Header */}
            <div className="bg-white z-10 py-8 space-y-8 rounded-[40px] border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <button onClick={() => router.back()} className="hidden md:flex p-4 bg-gray-50 hover:bg-white border border-gray-100 rounded-2xl transition-all shadow-sm">
                        <ChevronLeft className="w-8 h-8 text-gray-900" />
                    </button>
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <Input
                            placeholder="What service are you looking for?"
                            className="h-16 pl-14 rounded-3xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-xl font-medium"
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
                        <Button className="w-full h-14 bg-[#0A5C36] hover:bg-[#0d7344] rounded-2xl font-black text-lg shadow-xl shadow-green-900/20 transition-all">
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                {searchResults.map((service) => (
                    <div key={service.name} className="flex flex-col gap-6 p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-500 group">
                        <div className="flex gap-6">
                            <div className="relative w-28 h-28 rounded-[32px] overflow-hidden shadow-inner">
                                <Image src={service.image} alt={service.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h4 className="font-black text-gray-900 leading-tight text-xl group-hover:text-[#0A5C36] transition-colors">{service.name}</h4>
                                        <span className="inline-block bg-green-50 text-[#0A5C36] text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full">{service.category}</span>
                                    </div>
                                    <button className="text-gray-300 hover:text-red-500 transition-all">
                                        <Heart className="w-7 h-7" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-black text-gray-900 ml-1">{service.rating} ({service.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-sm text-gray-400 font-bold">
                                <MapPin className="w-5 h-5 text-red-400" />
                                {service.location}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed min-h-[60px]">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-3 p-4 bg-green-50/50 rounded-2xl border border-green-100/50">
                                <span className="text-xl">📞</span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Phone</span>
                                    <span className="text-lg font-black text-[#0A5C36] leading-tight">{service.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Link href="/services/1" className="flex-1">
                                <Button className="w-full h-16 bg-[#0A5C36] hover:bg-[#0d7344] rounded-2xl font-black text-xl shadow-xl shadow-green-900/20 active:scale-[0.97] transition-all">
                                    View Details
                                </Button>
                            </Link>
                            <Button variant="outline" className="h-16 w-16 rounded-2xl border-gray-100 hover:bg-white hover:border-[#0A5C36] p-0 shadow-sm group">
                                <MessageSquare className="w-7 h-7 text-gray-400 group-hover:text-[#0A5C36]" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
