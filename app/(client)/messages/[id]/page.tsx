"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Ellipsis, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const chats = [
  { id: 1, name: "Dr. Sarah Johnson", image: "" },
  { id: 2, name: "Quick Fix Plumbing", image: "" },
];

const sampleMessages: Record<number, Array<{ id: string; from: "me" | "them"; text: string; time: string }>> = {
  1: [
    { id: "m1", from: "me", text: "Hi, I would like to schedule an appointment.", time: "03:00 PM" },
    { id: "m2", from: "them", text: "Hello! I would be happy to help you. What days work best for you?", time: "03:15 PM" },
    { id: "m3", from: "me", text: "I am available this Wednesday or Thursday afternoon.", time: "03:20 PM" },
    { id: "m4", from: "them", text: "Thank you for your inquiry. Thursday at 3 PM works great. Does that work for you?", time: "04:30 PM" },
  ],
  2: [
    { id: "p1", from: "me", text: "Sink is leaking under the kitchen counter.", time: "10:10 AM" },
    { id: "p2", from: "them", text: "I can come tomorrow at 2 PM to fix your sink.", time: "10:20 AM" },
  ],
};

export default function ClientChatPage() {
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
    <div className="flex flex-col h-[calc(100vh-140px)] gap-8">
      <div className="flex-1 bg-white rounded-[48px] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-50" onClick={() => router.push("/messages")}>
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            {chat.image ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden relative">
                <Image src={chat.image} alt={chat.name} fill />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                {chat.name.split(" ").map(n => n[0]).slice(0,2).join("")}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{chat.name}</span>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-50" aria-label="More">
            <Ellipsis className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${m.from === "me" ? "bg-[#0A5C36] text-white" : "bg-white text-gray-800 border border-gray-100"}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className={`mt-1 block text-[10px] ${m.from === "me" ? "text-white/80" : "text-gray-400"}`}>{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 p-4 bg-white">
          <div className="flex items-end gap-3">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[44px] max-h-36 rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm"
            />
            <button
              onClick={send}
              className="h-11 w-11 rounded-xl bg-[#0A5C36] hover:bg-[#0d7344] text-white flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
