"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Home,
    Bell,
    UserCircle,
    LayoutGrid,
    PlusSquare,
    BarChart3,
    MessageSquare,
    TrendingUp,
    ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const weeklyStats = [
    { day: "Mon", views: 45, bookings: 3, viewsPercent: 45, bookingsPercent: 30 },
    { day: "Tue", views: 52, bookings: 5, viewsPercent: 55, bookingsPercent: 50 },
    { day: "Wed", views: 38, bookings: 2, viewsPercent: 40, bookingsPercent: 20 },
    { day: "Thu", views: 61, bookings: 6, viewsPercent: 65, bookingsPercent: 60 },
    { day: "Fri", views: 78, bookings: 8, viewsPercent: 80, bookingsPercent: 80 },
    { day: "Sat", views: 95, bookings: 12, viewsPercent: 100, bookingsPercent: 100 },
    { day: "Sun", views: 87, bookings: 10, viewsPercent: 90, bookingsPercent: 90 },
];

const packages = [
    { rank: 1, name: "Lunch Special", bookings: 45, revenue: 1125 },
    { rank: 2, name: "Family Dinner", bookings: 28, revenue: 2380 },
    { rank: 3, name: "Private Event Catering", bookings: 12, revenue: 6000 },
];

export default function BusinessAnalyticsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 pb-24 client-ui">
            {/* Shared Header */}
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
                <div className="flex items-center gap-5">
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

            <div className="max-w-7xl mx-auto w-full px-5 py-6 md:py-10 space-y-8 md:space-y-12">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Performance Analytics</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Last 7 Days Chart */}
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                        <h3 className="text-xl font-black text-gray-900">Last 7 Days Activity</h3>
                        <div className="space-y-6">
                            {weeklyStats.map((stat) => (
                                <div key={stat.day} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-black text-gray-400 uppercase tracking-widest">{stat.day}</span>
                                        <span className="text-xs font-bold text-[#0A4D2E] bg-green-50 px-3 py-1 rounded-lg">
                                            {stat.views} views • {stat.bookings} bookings
                                        </span>
                                    </div>
                                    <div className="flex gap-1 h-3 relative">
                                        <div
                                            className="h-full bg-green-100 rounded-full"
                                            style={{ width: `${stat.viewsPercent}%` }}
                                        />
                                        <div
                                            className="h-full bg-[#0A4D2E] rounded-full absolute left-0"
                                            style={{ width: `${stat.bookingsPercent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Conversion Rate Card */}
                        <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm text-center space-y-6 flex flex-col justify-center">
                            <h3 className="text-lg font-black text-gray-400 uppercase tracking-widest">Global Conversion Rate</h3>
                            <div className="space-y-2">
                                <p className="text-6xl font-black text-[#0A4D2E]">7.5%</p>
                                <p className="text-sm font-bold text-gray-400">Visitor-to-Customer conversion</p>
                            </div>
                            <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-1">
                                <div className="h-full bg-[#0A4D2E] rounded-full shadow-lg shadow-green-900/20" style={{ width: '75%' }} />
                            </div>
                        </div>

                        {/* Package Performance */}
                        <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-gray-900">Top Packages</h3>
                                <TrendingUp className="w-6 h-6 text-[#0A4D2E]" />
                            </div>
                            <div className="space-y-4">
                                {packages.map((pkg) => (
                                    <div key={pkg.rank} className="flex items-center gap-5 p-5 rounded-[28px] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-[#0A4D2E] flex items-center justify-center text-white text-lg font-black shadow-lg shadow-green-900/10 shrink-0">
                                            {pkg.rank}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-gray-900 truncate text-base">{pkg.name}</p>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{pkg.bookings} successful bookings</p>
                                        </div>
                                        <div className="text-lg font-black text-[#0A4D2E] bg-white px-4 py-2 rounded-xl shadow-sm">
                                            ${pkg.revenue}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
