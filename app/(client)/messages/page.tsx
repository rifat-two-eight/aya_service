"use client";

import { useState, useEffect } from "react";
import { chatService } from "@/services/chatService";
import { MessageSquare, ShieldCheck, ChevronRight, Search, Plus, Trash2, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

export default function MessagesPage() {
    const [chats, setChats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await chatService.getChats();
            if (response.success) {
                setChats(response.data);
            }
        } catch (error: any) {
            console.error("Error fetching chats:", error);
            toast.error("Failed to load messages");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const result = await Swal.fire({
            title: "Delete Chat?",
            text: "This will permanently remove this conversation.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#0A5C36",
            confirmButtonText: "Yes, Delete",
            background: "#fff",
            borderRadius: "32px",
        });

        if (result.isConfirmed) {
            try {
                const response = await chatService.deleteChat(id);
                if (response.success) {
                    setChats(chats.filter(chat => chat._id !== id));
                    toast.success("Chat deleted");
                }
            } catch (error: any) {
                toast.error(error.message || "Failed to delete chat");
            }
        }
    };

    const handleCreateAdminSupport = async () => {
        try {
            const response = await chatService.createAdminSupportChat();
            if (response.success) {
                toast.success("Admin support chat created");
                fetchChats();
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to create support chat");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto py-20 px-6 space-y-6">
                <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse" />
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-50 rounded-[32px] animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-12 px-6 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Messages</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Conversations with providers & support</p>
                </div>
                <Button 
                    onClick={handleCreateAdminSupport}
                    className="bg-[#0A5C36] hover:bg-[#084a2c] rounded-2xl h-12 w-12 p-0 shadow-lg shadow-green-900/10"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            {/* Search */}
            <div className="relative mb-8 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0A5C36] transition-colors" />
                <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-14 rounded-2xl border-gray-100 bg-white shadow-sm focus:bg-white transition-all font-medium"
                />
            </div>

            {/* Chat List */}
            <div className="space-y-4">
                {chats.length > 0 ? (
                    chats.map((chat) => {
                        const isSupport = chat.isAdminSupport;
                        const participant = chat.participants?.[0];
                        
                        return (
                            <Link
                                key={chat._id}
                                href={`/messages/${chat._id}`}
                                className="group flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl hover:shadow-green-900/5 hover:border-[#0A5C36]/20 transition-all duration-500 relative"
                            >
                                {/* Avatar */}
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-50">
                                    {isSupport ? (
                                        <div className="w-full h-full bg-[#0A5C36] flex items-center justify-center text-white">
                                            <ShieldCheck className="w-8 h-8" />
                                        </div>
                                    ) : participant?.image ? (
                                        <Image
                                            src={participant.image}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            unoptimized={true}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <User className="w-8 h-8" />
                                        </div>
                                    )}
                                    {chat.unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-black text-gray-900 truncate pr-2">
                                            {isSupport ? "AYA Admin Support" : participant?.fullName || "Aya User"}
                                        </h3>
                                        <span className="text-[10px] font-black text-gray-300 uppercase">2m ago</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 line-clamp-1">
                                        {isSupport ? "Our team will assist you shortly..." : "Hello! Is the service still available?"}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => handleDeleteChat(chat._id, e)}
                                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-green-50 group-hover:text-[#0A5C36]">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-32 space-y-6 bg-white border-2 border-dashed border-gray-100 rounded-[40px]">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                            <MessageSquare className="w-10 h-10" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-gray-900">Your Inbox is Empty</p>
                            <p className="text-xs font-bold text-gray-400">Start a conversation with a service provider</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
