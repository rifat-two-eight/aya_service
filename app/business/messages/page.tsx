"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Search, ChevronLeft, Loader2, User, Shield } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { chatService } from "@/services/chatService";
import { toast } from "sonner";

export default function BusinessMessagesPage() {
    const router = useRouter();
    const [chats, setChats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingSupport, setIsCreatingSupport] = useState(false);
    const [search, setSearch] = useState("");

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "";

    useEffect(() => {
        const fetchChats = async () => {
            setIsLoading(true);
            try {
                const response = await chatService.getChats({ page: 1, limit: 50 });
                if (response.success) {
                    setChats(response.data || []);
                }
            } catch (error: any) {
                toast.error("Failed to load messages");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChats();
    }, []);

    const formatTime = (dateStr?: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (days === 1) return "Yesterday";
        return `${days}d ago`;
    };

    const handleContactSupport = async () => {
        setIsCreatingSupport(true);
        try {
            const response = await chatService.createAdminSupportChat();
            if (response.success && response.data?._id) {
                router.push(`/business/messages/${response.data._id}`);
            } else {
                toast.error("Failed to connect to support");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to connect to support");
        } finally {
            setIsCreatingSupport(false);
        }
    };

    const filteredChats = chats.filter((chat) => {
        if (!search) return true;
        const name = chat.isAdminSupport
            ? "Admin Support"
            : chat.participants?.[0]?.fullName || "";
        return name.toLowerCase().includes(search.toLowerCase());
    });

    const getDisplayName = (chat: any) => {
        if (chat.isAdminSupport) return "Admin Support";
        return chat.participants?.[0]?.fullName || "Unknown";
    };

    const getAvatar = (chat: any) => {
        if (chat.isAdminSupport) return null;
        return chat.participants?.[0]?.image || null;
    };

    const getInitials = (chat: any) => {
        if (chat.isAdminSupport) return "AS";
        const name = chat.participants?.[0]?.fullName || "?";
        return name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <h1 className="text-xl font-black text-gray-900">Messages</h1>
                    {chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0) > 0 && (
                        <span className="bg-[#0A4D2E] text-white text-[10px] font-black rounded-full px-2 py-0.5">
                            {chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0)}
                        </span>
                    )}
                </div>
                <div className="w-12" />
            </header>

            <div className="max-w-5xl mx-auto w-full p-4 md:p-8 lg:p-12 space-y-6 pb-24">
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                    {/* Search & Actions */}
                    <div className="p-8 pb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative group flex-1 w-full">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0A4D2E] transition-colors" />
                            <Input
                                placeholder="Search conversations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-14 pl-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-sm w-full"
                            />
                        </div>
                        <button
                            onClick={handleContactSupport}
                            disabled={isCreatingSupport}
                            className="h-14 px-6 rounded-xl bg-[#0A4D2E] hover:bg-[#0d7344] text-white font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-green-900/10 shrink-0 disabled:opacity-70"
                        >
                            {isCreatingSupport ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Shield className="w-5 h-5" />
                            )}
                            Contact Support
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-8 h-8 animate-spin text-[#0A5C36]" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading chats...</p>
                            </div>
                        ) : filteredChats.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-8 h-8 text-gray-200" />
                                </div>
                                <p className="font-black text-gray-900">No conversations yet</p>
                                <p className="text-sm text-gray-400">Messages from clients will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {filteredChats.map((chat) => {
                                    const avatar = getAvatar(chat);
                                    const name = getDisplayName(chat);
                                    const initials = getInitials(chat);
                                    const lastMsg = chat.lastMessage?.text || "No messages yet";
                                    const time = formatTime(chat.lastMessageAt);
                                    const unread = chat.unreadCount || 0;

                                    return (
                                        <Link
                                            key={chat._id}
                                            href={`/business/messages/${chat._id}`}
                                            className="flex items-center gap-5 p-5 rounded-[32px] transition-all group border border-transparent hover:bg-gray-50 hover:border-gray-100"
                                        >
                                            {/* Avatar */}
                                            <div className="relative shrink-0">
                                                <div className="w-16 h-16 rounded-[24px] overflow-hidden bg-gray-100 flex items-center justify-center shadow-inner">
                                                    {chat.isAdminSupport ? (
                                                        <div className="w-full h-full bg-[#0A4D2E] flex items-center justify-center">
                                                            <Shield className="w-7 h-7 text-white" />
                                                        </div>
                                                    ) : avatar ? (
                                                        <Image
                                                            src={`${baseUrl}${avatar}`}
                                                            alt={name}
                                                            width={64}
                                                            height={64}
                                                            className="object-cover w-full h-full"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500 font-black text-lg">{initials}</span>
                                                    )}
                                                </div>
                                                {unread > 0 && (
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0A4D2E] border-2 border-white rounded-full flex items-center justify-center">
                                                        <span className="text-white text-[8px] font-black">{unread > 9 ? "9+" : unread}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className={`font-black text-base truncate transition-colors group-hover:text-[#0A4D2E] ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}>
                                                        {name}
                                                    </h3>
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold shrink-0 ml-2">{time}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className={`text-sm truncate pr-4 ${unread > 0 ? "font-bold text-gray-700" : "font-medium text-gray-500"}`}>
                                                        {lastMsg}
                                                    </p>
                                                    {unread > 0 && (
                                                        <div className="bg-[#0A4D2E] text-white text-[10px] min-w-[20px] h-5 px-1 rounded-lg flex items-center justify-center shadow-sm font-bold shrink-0">
                                                            {unread}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
