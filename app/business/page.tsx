"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Eye,
  CalendarCheck2,
  Star,
  DollarSign,
  Bell,
  UserCircle,
  ListChecks,
  BarChart3,
  MessageSquare,
  Settings,
  PlusSquare,
  CreditCard,
  FileText,
  Clock,
  LayoutGrid
} from "lucide-react";

const metrics = [
  { icon: Eye, label: "Total Views", value: "1,247" },
  { icon: Clock, label: "Bookings", value: "89" },
  { icon: DollarSign, label: "Revenue", value: "$12,450" },
  { icon: ListChecks, label: "Total Listing", value: "3" },
];

const listings = [
  { name: "Tony's Italian Restaurant", category: "Restaurants", rating: 4.9 },
  { name: "Quick Lunch Catering", category: "Catering", rating: 4.7 },
];

const reviews = [
  {
    author: "Sarah Johnson",
    text: "Amazing food and excellent service!",
    target: "Tony's Italian Restaurant",
    date: "2024-01-02",
    rating: 5
  },
  {
    author: "Mike Chen",
    text: "Great catering for our office event.",
    target: "Quick Lunch Catering",
    date: "2024-01-01",
    rating: 4
  },
];

export default function BusinessOverviewPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 pb-24 client-ui">
      {/* Header */}
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

      {/* Top spacing for desktop to match client side if needed, or just let layout padding handle it */}
      <div className="px-5 py-6 md:py-10 space-y-8 md:space-y-12">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <div className="p-2 rounded-xl bg-gray-50">
                    <Icon className="w-5 h-5 text-[#0A4D2E]" />
                  </div>
                  <span>{m.label}</span>
                </div>
                <div className="text-3xl font-black text-[#0A4D2E]">{m.value}</div>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout for Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm h-full">
              <h2 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/business/subscription">
                  <Button variant="outline" className="h-16 border-gray-100 rounded-2xl text-[#0A4D2E] font-black gap-3 hover:bg-green-50 shadow-sm transition-all w-full">
                    <DollarSign className="w-5 h-5" />
                    Subscription
                  </Button>
                </Link>
                <Link href="/business/settings">
                  <Button variant="outline" className="h-16 border-gray-100 rounded-2xl text-[#0A4D2E] font-black gap-3 hover:bg-green-50 shadow-sm transition-all w-full">
                    <Settings className="w-5 h-5" />
                    Settings
                  </Button>
                </Link>
                <Link href="/business/bookings" className="w-full">
                  <Button className="h-16 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl font-black shadow-lg shadow-green-900/10 transition-all text-sm w-full">
                    Booking Requests
                  </Button>
                </Link>
                <Link href="/business/documents" className="w-full">
                  <Button className="h-16 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl font-black shadow-lg shadow-green-900/10 transition-all text-sm w-full">
                    Submit Document
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Active Listings */}
            <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">Active Listings (3)</h3>
                <Link href="/business/listings" className="text-sm font-black text-[#0A4D2E] bg-green-50 px-4 py-2 rounded-xl hover:bg-green-100 transition-all">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {listings.map((l) => (
                  <div key={l.name} className="flex items-center justify-between rounded-[28px] bg-gray-50/80 px-6 py-5 hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                    <div className="space-y-1">
                      <p className="font-black text-gray-900">{l.name}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{l.category}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                      <Star className="w-4 h-4 text-[#0A4D2E] fill-[#0A4D2E]" />
                      <span className="font-black text-gray-900">{l.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews - Full Width on Bottom */}
        <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Recent Reviews</h3>
            <Link href="/business/reviews" className="text-sm font-black text-[#0A4D2E] bg-green-50 px-4 py-2 rounded-xl hover:bg-green-100 transition-all">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((r, i) => (
              <div key={r.author + r.date} className="p-6 rounded-[32px] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-black text-gray-900">{r.author}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{r.date}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-[#0A4D2E] fill-[#0A4D2E]" : "text-gray-200"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">{r.text}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-[#0A4D2E] bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                    {r.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

