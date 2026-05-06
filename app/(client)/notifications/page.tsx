"use client";

import { useState, useEffect } from "react";
import { notificationService } from "@/services/notificationService";
import { Bell, CheckCircle2, Clock, ShieldCheck, CreditCard, CalendarCheck, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await notificationService.getNotifications();
            if (response.success) {
                // Determine structure based on API response
                const notifs = response.data?.notifications || response.data || [];
                setNotifications(notifs);
            }
        } catch (error: any) {
            console.error("Error fetching notifications:", error);
            toast.error("Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    const getIcon = (title: string) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("payment")) return <CreditCard className="w-5 h-5 text-blue-500" />;
        if (lowerTitle.includes("booking") || lowerTitle.includes("accept")) return <CalendarCheck className="w-5 h-5 text-green-500" />;
        if (lowerTitle.includes("cancel")) return <X className="w-5 h-5 text-red-500" />;
        return <Bell className="w-5 h-5 text-gray-500" />;
    };

    const getIconBackground = (title: string) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("payment")) return "bg-blue-50";
        if (lowerTitle.includes("booking") || lowerTitle.includes("accept")) return "bg-green-50";
        if (lowerTitle.includes("cancel")) return "bg-red-50";
        return "bg-gray-50";
    };

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-6 space-y-4">
                <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse mb-8" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-50 rounded-3xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-6 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Stay updated on your account</p>
                </div>
            </div>

            {/* Notification List */}
            <div className="space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`p-6 rounded-[32px] border ${notification.read ? 'bg-white border-gray-100' : 'bg-green-50/30 border-green-100'} hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 flex gap-5 items-start group`}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconBackground(notification.title)}`}>
                                {getIcon(notification.title)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className={`text-base font-black ${notification.read ? 'text-gray-900' : 'text-[#0A5C36]'}`}>
                                        {notification.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap uppercase tracking-widest">
                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                    {notification.message}
                                </p>
                                
                                {notification.referenceId && notification.title.toLowerCase().includes("booking") && (
                                    <Link href={`/bookings/${notification.referenceId}`} className="inline-block mt-3 text-xs font-black text-[#0A5C36] hover:text-[#084a2c] uppercase tracking-widest hover:underline transition-all">
                                        View Details &rarr;
                                    </Link>
                                )}
                            </div>

                            {/* Unread Dot */}
                            {!notification.read && (
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full mt-2" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 space-y-6 bg-white border-2 border-dashed border-gray-100 rounded-[40px]">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                            <Bell className="w-10 h-10" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-gray-900">All caught up!</p>
                            <p className="text-xs font-bold text-gray-400">You have no new notifications.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
