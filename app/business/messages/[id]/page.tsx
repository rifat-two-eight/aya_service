"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Ellipsis, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const chats = [
    { id: 1, name: "Sarah Johnson", image: "" },
    { id: 2, name: "Mike Chen", image: "" },
];

const sampleMessages: Record<number, Array<{ id: string; from: "me" | "them"; text: string; time: string }>> = {
    1: [
        { id: "m1", from: "them", text: "Hi, I loved the food at your restaurant!", time: "10:45 AM" },
        { id: "m2", from: "me", text: "Thank you Sarah! We're glad you enjoyed it. When would you like to visit again?", time: "11:00 AM" },
    ],
    2: [
        { id: "p1", from: "them", text: "I'll be there in 30 minutes for the setup.", time: "Yesterday" },
        { id: "p2", from: "me", text: "Great, we have the space ready for you.", time: "Yesterday" },
    ],
};

export default function BusinessChatPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const chatId = Number(params.id);
    const chat = chats.find((c) => c.id === chatId) || { id: chatId, name: "Conversation", image: "" };
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState(sampleMessages[chatId] || []);

    const send = () => {
        const text = draft.trim();
        if (!text) return;
        const msg = {
            id: Math.random().toString(36).slice(2),
            from: "me" as const,
            text,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, msg]);
        setDraft("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui">
            {/* Header Mirroring Client Design */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                        onClick={() => router.push("/business/messages")}
                    >
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <div className="flex items-center gap-3">
                        {chat.image ? (
                            <div className="w-12 h-12 rounded-[18px] overflow-hidden relative shadow-md">
                                <Image src={chat.image} alt={chat.name} fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-[18px] bg-gray-100 flex items-center justify-center text-gray-400 text-base shadow-inner font-bold">
                                {chat.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-base font-black text-gray-900 leading-tight">{chat.name}</span>
                            <span className="text-xs font-bold text-green-600">Active Now</span>
                        </div>
                    </div>
                </div>
                <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400" aria-label="More">
                    <Ellipsis className="w-6 h-6" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 max-w-4xl mx-auto w-full">
                {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-[32px] px-6 py-4 shadow-sm ${m.from === "me"
                            ? "bg-[#0A4D2E] text-white rounded-tr-none shadow-green-900/10"
                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                            }`}>
                            <p className="text-[15px] leading-relaxed font-medium">{m.text}</p>
                            <span className={`mt-2 block text-[11px] font-bold ${m.from === "me" ? "text-white/60" : "text-gray-400"}`}>
                                {m.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="sticky bottom-4 px-4 pb-4 max-w-4xl mx-auto w-full">
                <div className="bg-white rounded-[32px] border border-gray-100 p-3 shadow-xl shadow-gray-200/50 flex items-end gap-3">
                    <Textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Write a message..."
                        className="min-h-[56px] max-h-36 rounded-2xl border-none bg-gray-50 focus:bg-white transition-all text-[15px] font-medium resize-none py-4 px-5 scrollbar-hide"
                    />
                    <button
                        onClick={send}
                        className="h-14 w-14 shrink-0 rounded-2xl bg-[#0A4D2E] hover:bg-[#0d7344] text-white flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-green-900/20"
                        aria-label="Send message"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
