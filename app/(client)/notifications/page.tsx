"use client";

import { Bell, ChevronLeft, CheckCircle2, CreditCard, Gift, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const notifications = [
    {
        id: 1,
        title: "Booking Confirmed",
        description: "Your cleaning service booking for Jan 5 has been confirmed",
        time: "2 hours ago",
        type: "success",
        icon: <CheckCircle2 className="w-6 h-6 text-white" />,
        iconBg: "bg-[#0A5C36]",
        unread: true
    },
    {
        id: 2,
        title: "Payment Successful",
        description: "Payment of BDT 2,500 received successfully",
        time: "1 day ago",
        type: "payment",
        icon: <CreditCard className="w-6 h-6 text-white" />,
        iconBg: "bg-blue-500",
        unread: false
    },
    {
        id: 3,
        title: "New Offer Available",
        description: "Special discount on electrical services this week",
        time: "2 days ago",
        type: "promo",
        icon: <Gift className="w-6 h-6 text-white" />,
        iconBg: "bg-orange-500",
        unread: false
    }
];

export default function NotificationsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-10 md:gap-16 pb-20">
            <div className="w-full space-y-12">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-2xl font-black text-gray-900 mx-auto -ml-10">Notifications</h1>
                </div>

                {/* Grid List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`flex gap-6 p-8 rounded-[40px] border border-gray-100 transition-all cursor-pointer relative group ${notif.unread ? "bg-white shadow-xl shadow-black/5" : "bg-white/40 opacity-80 hover:opacity-100"
                                }`}
                        >
                            {notif.unread && (
                                <div className="absolute top-8 right-8 w-3 h-3 bg-[#0A5C36] rounded-full shadow-[0_0_15px_rgba(10,92,54,0.5)]" />
                            )}

                            <div className={`${notif.iconBg} w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-lg shadow-black/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                {notif.icon}
                            </div>

                            <div className="flex-1 min-w-0 space-y-2">
                                <h3 className="font-black text-gray-900 text-xl tracking-tight leading-tight">{notif.title}</h3>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">{notif.description}</p>
                                <div className="flex items-center gap-2 pt-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{notif.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Mockup */}
                <div className="pt-12 text-center space-y-4 opacity-30 select-none">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                        <Bell className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="font-bold text-gray-400">No more notifications</p>
                </div>
            </div>
        </div>
    );
}
