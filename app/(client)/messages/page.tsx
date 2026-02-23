"use client";

import { MessageSquare, ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const chats = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        lastMessage: "Looking forward to seeing you at 10 AM.",
        time: "10:45 AM",
        unread: 2,
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
        id: 2,
        name: "Quick Fix Plumbing",
        lastMessage: "I'll be there in 30 minutes.",
        time: "Yesterday",
        unread: 0,
        image: "https://images.unsplash.com/photo-1541235052301-4432128b9eee?auto=format&fit=crop&q=80&w=100&h=100"
    }
];

export default function ClientMessagesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-8">
            {/* Left Sidebar: Conversations List */}
            <div className="lg:w-[450px] flex flex-col bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Messages</h1>
                        <div className="w-12 h-12 bg-green-50 text-[#0A5C36] rounded-2xl flex items-center justify-center shadow-sm">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0A5C36] transition-colors" />
                        <Input
                            placeholder="Search conversations..."
                            className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium text-lg"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-8">
                    <div className="space-y-2">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className="flex items-center gap-5 p-6 rounded-[32px] hover:bg-gray-50 cursor-pointer transition-all group border border-transparent hover:border-gray-100"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-[24px] overflow-hidden shadow-md">
                                        <Image src={chat.image} alt={chat.name} fill className="object-cover" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-black text-gray-900 group-hover:text-[#0A5C36] transition-colors truncate text-lg tracking-tight">{chat.name}</h3>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-400 font-bold truncate pr-4">{chat.lastMessage}</p>
                                        {chat.unread > 0 && (
                                            <div className="bg-[#0A5C36] text-white text-[10px] font-black w-6 h-6 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20">
                                                {chat.unread}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Conversation Content (Placeholder) */}
            <div className="flex-1 bg-white rounded-[48px] border border-gray-100 shadow-sm flex flex-col items-center justify-center p-20 text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50/30 rounded-full -mr-[250px] -mt-[250px] blur-3xl" />

                <div className="w-40 h-40 bg-gray-50 rounded-[60px] flex items-center justify-center rotate-6 relative z-10 shadow-inner">
                    <MessageSquare className="w-16 h-16 text-gray-200" />
                </div>

                <div className="space-y-3 relative z-10 max-w-sm">
                    <h2 className="text-2xl font-black text-gray-900">Your Secure Inbox</h2>
                    <p className="text-gray-400 font-medium">Select a conversation from the list to start chatting with verified service providers.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 relative z-10">
                    <div className="bg-green-50 px-5 py-2.5 rounded-full text-[10px] font-black text-[#0A5C36] uppercase tracking-widest shadow-sm">Verified Doctors</div>
                    <div className="bg-blue-50 px-5 py-2.5 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">Local Experts</div>
                    <div className="bg-purple-50 px-5 py-2.5 rounded-full text-[10px] font-black text-purple-600 uppercase tracking-widest shadow-sm">24/7 Support</div>
                </div>
            </div>
        </div>
    );
}
