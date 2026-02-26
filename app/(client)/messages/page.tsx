"use client";

import { MessageSquare, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const chats = [
    { id: 1, name: "Dr. Sarah Johnson", lastMessage: "Looking forward to seeing you at 10 AM.", time: "10:45 AM", unread: 2, image: "" },
    { id: 2, name: "Quick Fix Plumbing", lastMessage: "I'll be there in 30 minutes.", time: "Yesterday", unread: 0, image: "" },
];

export default function ClientMessagesPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-8">
            <div className="flex flex-col bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Messages</h1>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0A5C36] transition-colors" />
                        <Input placeholder="Search conversations..." className="h-12 pl-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-sm" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-8">
                    <div className="space-y-2">
                        {chats.map((chat) => (
                            <Link key={chat.id} href={`/messages/${chat.id}`} className="flex items-center gap-5 p-5 rounded-2xl transition-all group border border-transparent hover:bg-gray-50 hover:border-gray-100">
                                <div className="relative">
                                    {chat.image ? (
                                        <div className="w-16 h-16 rounded-[24px] overflow-hidden shadow-md relative">
                                            <Image src={chat.image} alt={chat.name} fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-[24px] bg-gray-100 flex items-center justify-center text-gray-400 text-lg shadow-inner">
                                            {chat.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-medium text-gray-900 group-hover:text-[#0A5C36] transition-colors truncate text-base">{chat.name}</h3>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 truncate pr-4">{chat.lastMessage}</p>
                                        {chat.unread > 0 && (
                                            <div className="bg-[#0A5C36] text-white text-[10px] w-5 h-5 rounded-lg flex items-center justify-center shadow-sm">
                                                {chat.unread}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
