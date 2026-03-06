"use client";

import { useState } from "react";
import {
    Plus,
    Star,
    MapPin,
    Phone,
    Mail,
    Eye,
    CalendarCheck2,
    ChevronRight,
    Trash2,
    Edit3,
    ExternalLink,
    Home,
    Bell,
    UserCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const initialListings = [
    {
        id: "1",
        name: "Tony's Italian Restaurant",
        category: "Restaurants",
        status: "Active",
        rating: 4.9,
        address: "123 Main St, Anytown, CA 12345",
        phone: "(555) 123-4567",
        email: "tony@restaurant.com",
        views: 456,
        bookings: 34,
        image: ""
    },
    {
        id: "2",
        name: "Quick Lunch Catering",
        category: "Catering",
        status: "Active",
        rating: 4.7,
        address: "456 Oak Ave, Anytown, CA 12345",
        phone: "(555) 987-6543",
        email: "info@quicklunch.com",
        views: 234,
        bookings: 18,
        image: ""
    },
    {
        id: "3",
        name: "Premium Event Services",
        category: "Catering",
        status: "Pending",
        rating: 4.5,
        address: "789 Pine Rd, Anytown, CA 12345",
        phone: "(555) 456-7890",
        email: "events@premium.com",
        views: 89,
        bookings: 5,
        image: ""
    }
];

export default function BusinessListingsPage() {
    const [listings, setListings] = useState(initialListings);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 pb-24 client-ui">
            {/* Standard Header */}
            <div className="bg-[#0A4D2E] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 lg:hidden">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Home className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold leading-tight">Business Hub</h1>
                        <p className="text-xs text-white/70">Manage your business</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 ml-auto">
                    <Link href="/business/notifications" className="relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#0A4D2E] rounded-full text-[8px] flex items-center justify-center font-bold">1</span>
                    </Link>
                    <Link href="/business/profile" className="flex flex-col items-center gap-0.5">
                        <UserCircle className="w-6 h-6" />
                        <span className="text-[10px]">Profile</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-5 py-6 md:py-10 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Business Listings</h1>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Manage and track your services</p>
                    </div>
                    <Link href="/business/listings/create">
                        <Button className="bg-[#0A4D2E] hover:bg-[#0d7344] h-12 px-6 rounded-2xl font-black shadow-lg shadow-green-900/10 gap-2 transition-all active:scale-95">
                            <Plus className="w-5 h-5" />
                            Add New Listing
                        </Button>
                    </Link>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {listings.map((item) => (
                        <div key={item.id} className="bg-white rounded-[40px] border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all group flex flex-col h-full">
                            {/* Card Header: Name, Status, Rating */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-2 flex-1">
                                    <h2 className="text-xl font-black text-gray-900 group-hover:text-[#0A4D2E] transition-colors leading-tight">{item.name}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.status === 'Active'
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-orange-50 text-orange-700 border border-orange-100'
                                            }`}>
                                            {item.status}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-black text-gray-900">{item.rating}</span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                                    <span className="truncate">{item.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>{item.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                    <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                                    <span className="truncate">{item.email}</span>
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className="bg-gray-50/80 rounded-2xl p-4 border border-transparent group-hover:bg-white group-hover:border-gray-100 transition-all text-center">
                                    <div className="flex flex-col items-center">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Views</p>
                                        <p className="text-lg font-black text-[#0A4D2E]">{item.views}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50/80 rounded-2xl p-4 border border-transparent group-hover:bg-white group-hover:border-gray-100 transition-all text-center">
                                    <div className="flex flex-col items-center">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Bookings</p>
                                        <p className="text-lg font-black text-[#0A4D2E]">{item.bookings}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto grid grid-cols-3 gap-2">
                                <Link href={`/business/listings/${item.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full h-11 border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-green-50 hover:text-[#0A4D2E] hover:border-[#0A4D2E]/20">
                                        View
                                    </Button>
                                </Link>
                                <Link href={`/business/listings/${item.id}?edit=true`} className="flex-1">
                                    <Button variant="outline" className="w-full h-11 border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-11 border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-red-50 hover:text-red-700 hover:border-red-100">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {listings.length === 0 && (
                    <div className="py-32 text-center space-y-6 bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full mx-auto flex items-center justify-center">
                            <CalendarCheck2 className="w-10 h-10 text-gray-300" />
                        </div>
                        <div className="space-y-2 px-6">
                            <h3 className="text-xl font-black text-gray-900">No Listings Found</h3>
                            <p className="text-sm font-bold text-gray-400 max-w-xs mx-auto">Start growing your business by adding your first service listing today.</p>
                        </div>
                        <Link href="/business/listings/create" className="inline-block">
                            <Button className="bg-[#0A4D2E] h-12 px-8 rounded-2xl font-black shadow-lg">
                                Create First Listing
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
