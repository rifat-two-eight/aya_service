"use client";

import { MessageSquare, Search, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const chats = [
    { id: 1, name: "Sarah Johnson", lastMessage: "Amazing food and excellent service!", time: "10:45 AM", unread: 1, image: "" },
    { id: 2, name: "Mike Chen", lastMessage: "I'll be there in 30 minutes for the setup.", time: "Yesterday", unread: 0, image: "" },
];

export default function BusinessMessagesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui">
            {/* Header Mirroring Client Design but with Business styling/back button */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <h1 className="text-xl font-black text-gray-900 absolute left-1/2 -translate-x-1/2">
                    Messages
                </h1>
                <div className="w-12" />
            </header>

            <div className="max-w-5xl mx-auto w-full p-4 md:p-8 lg:p-12 space-y-6">
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                    <div className="p-8 space-y-6">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0A4D2E] transition-colors" />
                            <Input placeholder="Search conversations..." className="h-14 pl-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-sm" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-8">
                        <div className="space-y-2">
                            {chats.map((chat) => (
                                <Link key={chat.id} href={`/business/messages/${chat.id}`} className="flex items-center gap-5 p-5 rounded-[32px] transition-all group border border-transparent hover:bg-gray-50 hover:border-gray-100">
                                    <div className="relative">
                                        {chat.image ? (
                                            <div className="w-16 h-16 rounded-[24px] overflow-hidden shadow-md relative">
                                                <Image src={chat.image} alt={chat.name} fill className="object-cover" unoptimized={true} />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 rounded-[24px] bg-gray-100 flex items-center justify-center text-gray-400 text-lg shadow-inner font-bold">
                                                {chat.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-black text-gray-900 group-hover:text-[#0A4D2E] transition-colors truncate text-base">{chat.name}</h3>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{chat.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500 truncate pr-4 font-medium">{chat.lastMessage}</p>
                                            {chat.unread > 0 && (
                                                <div className="bg-[#0A4D2E] text-white text-[10px] w-5 h-5 rounded-lg flex items-center justify-center shadow-sm font-bold">
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
        </div>
    );
}
