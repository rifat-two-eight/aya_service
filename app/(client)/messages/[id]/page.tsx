"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { chatService } from "@/services/chatService";
import { userService } from "@/services/userService";
import { ChevronLeft, Send, Paperclip, MoreVertical, ShieldCheck, User, Image as ImageIcon, FileText, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export default function ChatDetailPage() {
    const params = useParams();
    const router = useRouter();
    const chatId = params.id as string;
    
    const [messages, setMessages] = useState<any[]>([]);
    const [chat, setChat] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!chatId) return;
            try {
                // Fetch current user
                const userResponse = await userService.getMe();
                if (userResponse.success) {
                    setCurrentUser(userResponse.data);
                }

                // Fetch chat details first to get participant info
                const chatResponse = await chatService.getChats();
                if (chatResponse.success) {
                    const currentChat = chatResponse.data.find((c: any) => c._id === chatId);
                    setChat(currentChat);
                }

                // Fetch messages
                const msgResponse = await chatService.getMessages(chatId, { page: 1, limit: 50 });
                if (msgResponse.success) {
                    let fetchedMessages = [];
                    if (Array.isArray(msgResponse.data)) {
                        fetchedMessages = msgResponse.data;
                    } else if (Array.isArray(msgResponse.data?.data)) {
                        fetchedMessages = msgResponse.data.data;
                    } else if (Array.isArray(msgResponse.data?.messages)) {
                        fetchedMessages = msgResponse.data.messages;
                    }
                    
                    // We check the dates of the first and last to determine order
                    if (fetchedMessages.length > 1) {
                        const firstDate = new Date(fetchedMessages[0].createdAt).getTime();
                        const lastDate = new Date(fetchedMessages[fetchedMessages.length - 1].createdAt).getTime();
                        // If newest is first, we need to reverse it to render newest at bottom
                        if (firstDate > lastDate) {
                            fetchedMessages = [...fetchedMessages].reverse();
                        }
                    }
                    setMessages(fetchedMessages);
                }
            } catch (error: any) {
                console.error("Error fetching chat data:", error);
                toast.error("Failed to load messages");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [chatId]);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if ((!newMessage.trim() && !selectedFile) || isSending) return;

        setIsSending(true);
        try {
            const payload: any = {
                chatId,
                text: newMessage,
                type: selectedFile ? "file" : "text",
            };
            if (selectedFile) payload.file = selectedFile;

            const response = await chatService.sendMessage(payload);
            if (response.success) {
                setMessages([...messages, response.data]);
                setNewMessage("");
                setSelectedFile(null);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to send message");
        } finally {
            setIsSending(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    if (isLoading) {
        return <div className="max-w-2xl mx-auto h-screen flex items-center justify-center animate-pulse font-black text-[#0A5C36] uppercase tracking-widest">Loading Conversation...</div>;
    }

    const participant = chat?.participants?.[0];
    const isSupport = chat?.isAdminSupport;

    return (
        <div className="max-w-2xl mx-auto h-screen flex flex-col bg-white md:bg-gray-50/30">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 h-20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-50 rounded-xl transition-all">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                            {isSupport ? (
                                <div className="w-full h-full bg-[#0A5C36] flex items-center justify-center text-white">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                            ) : participant?.image ? (
                                <Image src={participant.image} alt="" fill className="object-cover" unoptimized={true} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <User className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-gray-900 leading-tight">
                                {isSupport ? "AYA Support" : participant?.fullName}
                            </h2>
                            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Online
                            </p>
                        </div>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-xl transition-all">
                    <MoreVertical className="w-6 h-6 text-gray-400" />
                </button>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <div className="flex flex-col gap-4">
                    <div className="text-center py-8">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[3px]">Today, {format(new Date(), "PP")}</p>
                    </div>

                    {messages.map((msg, idx) => {
                        const senderId = typeof msg.sender === 'object' ? msg.sender?._id : msg.sender;
                        const isMe = senderId === currentUser?._id;
                        return (
                            <div key={msg._id || idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] space-y-1`}>
                                    <div className={`p-4 rounded-[24px] shadow-sm ${
                                        isMe ? "bg-[#0A5C36] text-white rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                                    }`}>
                                        {msg.type === 'file' && msg.files?.length > 0 ? (
                                            <div className="space-y-2">
                                                {msg.files[0].match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                    <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                                                        <Image src={msg.files[0]} alt="" fill className="object-cover" unoptimized={true} />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-sm font-bold">
                                                        <FileText className="w-5 h-5" />
                                                        <span className="truncate max-w-[120px]">Attachment</span>
                                                    </div>
                                                )}
                                                {msg.text && <p className="text-sm font-medium">{msg.text}</p>}
                                            </div>
                                        ) : (
                                            <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                        )}

                                    </div>
                                    <p className={`text-[10px] font-bold text-gray-400 ${isMe ? "text-right" : "text-left"}`}>
                                        {format(new Date(msg.createdAt || Date.now()), "HH:mm")}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <footer className="p-6 bg-white border-t border-gray-100 pb-10 md:pb-6">
                <div className="space-y-4">
                    {/* File Preview */}
                    {selectedFile && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200 animate-in slide-in-from-bottom-2">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0A5C36]">
                                {selectedFile.type.startsWith('image/') ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-gray-900 truncate">{selectedFile.name}</p>
                                <p className="text-[10px] font-bold text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-red-50 text-red-500 rounded-lg transition-all">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*,application/pdf"
                        />
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-4 bg-gray-50 text-gray-400 hover:text-[#0A5C36] hover:bg-green-50 rounded-2xl transition-all"
                        >
                            <Paperclip className="w-6 h-6" />
                        </button>
                        <div className="flex-1 relative">
                            <Input
                                placeholder="Write a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white font-medium pl-6 pr-14 transition-all"
                            />
                            <button 
                                type="submit"
                                disabled={(!newMessage.trim() && !selectedFile) || isSending}
                                className="absolute right-2 top-2 p-3 bg-[#0A5C36] text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </footer>
        </div>
    );
}
