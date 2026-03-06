"use client";

import { useState, useMemo } from "react";
import { Bell, ChevronLeft, CheckCircle2, CreditCard, Info, UserPlus, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const initialNotifications = [
    {
        id: 1,
        title: "New Booking Request",
        description: "You have a new booking request for Tony's Italian Restaurant",
        time: "Just now",
        timestamp: new Date().getTime(),
        type: "booking",
        icon: <CheckCircle2 className="w-6 h-6 text-white" />,
        iconBg: "bg-[#0A5C36]",
        unread: true
    },
    {
        id: 2,
        title: "Payment Received",
        description: "Payment for booking #4521 has been successfully processed",
        time: "1 hour ago",
        timestamp: new Date().getTime() - 1 * 60 * 60 * 1000,
        type: "payment",
        icon: <CreditCard className="w-6 h-6 text-white" />,
        iconBg: "bg-blue-500",
        unread: true
    },
    {
        id: 3,
        title: "Document Verified",
        description: "Your business license has been verified successfully",
        time: "3 hours ago",
        timestamp: new Date().getTime() - 3 * 60 * 60 * 1000,
        type: "verification",
        icon: <FileCheck className="w-6 h-6 text-white" />,
        iconBg: "bg-green-600",
        unread: false
    },
    {
        id: 4,
        title: "New Review",
        description: "Sarah Johnson left a 5-star review for your service",
        time: "Yesterday",
        timestamp: new Date().getTime() - 24 * 60 * 60 * 1000,
        type: "review",
        icon: <Info className="w-6 h-6 text-white" />,
        iconBg: "bg-orange-500",
        unread: false
    },
    {
        id: 5,
        title: "Subscription Renewed",
        description: "Your business subscription has been renewed for another month",
        time: "2 days ago",
        timestamp: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
        type: "payment",
        icon: <CreditCard className="w-6 h-6 text-white" />,
        iconBg: "bg-blue-500",
        unread: false
    }
];

export default function BusinessNotificationsPage() {
    const router = useRouter();
    const [notifs, setNotifs] = useState(initialNotifications);
    const [filter, setFilter] = useState("all");

    const filteredNotifs = useMemo(() => {
        if (filter === "all") return notifs;
        if (filter === "unread") return notifs.filter(n => n.unread);
        return notifs.filter(n => n.type === filter);
    }, [notifs, filter]);

    const markRead = (id: number) => {
        setNotifs(notifs.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30">
            {/* Centered Sticky Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <h1 className="text-xl font-black text-gray-900 absolute left-1/2 -translate-x-1/2">
                    Notifications
                </h1>
                <div className="w-12" /> {/* Spacer for symmetry */}
            </header>

            <div className="max-w-5xl mx-auto w-full p-4 md:p-8 lg:p-12 space-y-6">
                {/* Optional Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {["all", "unread", "booking", "payment", "verification"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === t
                                ? "bg-[#064E3B] text-white shadow-xl shadow-green-900/20"
                                : "bg-white text-gray-400 border border-gray-100 hover:border-[#064E3B]"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredNotifs.map((notif, idx) => {
                        const isMainActive = notif.unread && idx === 0;

                        return (
                            <div
                                key={notif.id}
                                onClick={() => markRead(notif.id)}
                                className={`flex gap-6 p-6 rounded-[40px] transition-all cursor-pointer relative shadow-sm border ${isMainActive
                                    ? "bg-[#064E3B] border-[#064E3B] text-white shadow-2xl shadow-green-900/10"
                                    : "bg-white border-gray-100 hover:border-gray-200"
                                    }`}
                            >
                                {/* Left Section: The Pill Icon */}
                                <div className={`w-16 h-28 rounded-full shrink-0 flex flex-col items-center pt-5 shadow-inner ${isMainActive ? "bg-[#9db4ab]" : "bg-gray-50"
                                    }`}>
                                    <Bell className={`w-5 h-5 ${isMainActive ? "text-[#064E3B]" : "text-gray-400"}`} />
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 py-1 space-y-2">
                                    <div className="space-y-1">
                                        <h3 className={`font-black text-xl tracking-tight leading-tight ${isMainActive ? "text-white" : "text-gray-900"
                                            }`}>
                                            {notif.title}
                                        </h3>
                                        <p className={`text-[15px] leading-relaxed font-medium ${isMainActive ? "text-white/80" : "text-gray-500"
                                            }`}>
                                            {notif.description}
                                        </p>
                                    </div>
                                    <p className={`text-[13px] font-bold ${isMainActive ? "text-white/60" : "text-gray-400"
                                        }`}>
                                        {notif.time}
                                    </p>
                                </div>

                                {/* Red Dot indicator for other unread messages */}
                                {notif.unread && !isMainActive && (
                                    <div className="absolute top-8 right-10 w-3 h-3 bg-[#064E3B] rounded-full shadow-[0_0_10px_rgba(6,78,59,0.5)]" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredNotifs.length === 0 && (
                    <div className="py-32 text-center space-y-4 bg-white/50 rounded-[48px] border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                            <Bell className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-bold">No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
