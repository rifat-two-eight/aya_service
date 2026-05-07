"use client";

import { useState, useEffect, useMemo } from "react";
import { Bell, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { notificationService } from "@/services/notificationService";
import { toast } from "sonner";

export default function BusinessNotificationsPage() {
    const router = useRouter();
    const [notifs, setNotifs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [unreadCount, setUnreadCount] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const [notifRes, countRes] = await Promise.allSettled([
                    notificationService.getNotifications({ page, limit }),
                    notificationService.getUnreadCount(),
                ]);

                if (notifRes.status === "fulfilled" && notifRes.value.success) {
                    const data = notifRes.value.data;
                    setNotifs(data.notifications || []);
                    setTotalPages(data.pagination?.totalPage || 1);
                }

                if (countRes.status === "fulfilled" && countRes.value.success) {
                    setUnreadCount(countRes.value.data?.unreadCount || 0);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
                toast.error("Failed to load notifications");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [page]);

    const filteredNotifs = useMemo(() => {
        if (filter === "unread") return notifs.filter(n => !n.read);
        return notifs;
    }, [notifs, filter]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return "Yesterday";
        return `${days} days ago`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <h1 className="text-xl font-black text-gray-900">Notifications</h1>
                    {unreadCount > 0 && (
                        <span className="bg-[#064E3B] text-white text-[10px] font-black rounded-full px-2 py-0.5">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className="w-12" />
            </header>

            <div className="max-w-5xl mx-auto w-full p-4 md:p-8 lg:p-12 space-y-6 pb-24">
                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {["all", "unread"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === t
                                ? "bg-[#064E3B] text-white shadow-xl shadow-green-900/20"
                                : "bg-white text-gray-400 border border-gray-100 hover:border-[#064E3B]"
                                }`}
                        >
                            {t === "unread" ? `Unread (${unreadCount})` : "All"}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#0A5C36]" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading notifications...</p>
                    </div>
                ) : filteredNotifs.length === 0 ? (
                    <div className="py-32 text-center space-y-4 bg-white/50 rounded-[48px] border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                            <Bell className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-bold">No notifications yet</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {filteredNotifs.map((notif, idx) => {
                                const isUnread = !notif.read;
                                const isHighlighted = isUnread && idx === 0;

                                return (
                                    <div
                                        key={notif._id}
                                        className={`flex gap-6 p-6 rounded-[40px] transition-all cursor-pointer relative shadow-sm border ${isHighlighted
                                            ? "bg-[#064E3B] border-[#064E3B] text-white shadow-2xl shadow-green-900/10"
                                            : "bg-white border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        {/* Pill icon */}
                                        <div className={`w-16 h-28 rounded-full shrink-0 flex flex-col items-center pt-5 shadow-inner ${isHighlighted ? "bg-[#9db4ab]" : "bg-gray-50"}`}>
                                            <Bell className={`w-5 h-5 ${isHighlighted ? "text-[#064E3B]" : "text-gray-400"}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 py-1 space-y-2">
                                            <div className="space-y-1">
                                                <h3 className={`font-black text-xl tracking-tight leading-tight ${isHighlighted ? "text-white" : "text-gray-900"}`}>
                                                    {notif.title}
                                                </h3>
                                                <p className={`text-[15px] leading-relaxed font-medium ${isHighlighted ? "text-white/80" : "text-gray-500"}`}>
                                                    {notif.message}
                                                </p>
                                            </div>
                                            <p className={`text-[13px] font-bold ${isHighlighted ? "text-white/60" : "text-gray-400"}`}>
                                                {notif.createdAt ? formatDate(notif.createdAt) : ""}
                                            </p>
                                        </div>

                                        {/* Unread dot */}
                                        {isUnread && !isHighlighted && (
                                            <div className="absolute top-8 right-10 w-3 h-3 bg-[#064E3B] rounded-full shadow-[0_0_10px_rgba(6,78,59,0.5)]" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isLoading}
                                    className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Previous
                                </Button>
                                <span className="text-sm font-black text-gray-500">{page} / {totalPages}</span>
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || isLoading}
                                    className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}


