"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Ellipsis, Send, Paperclip, FileText, X, ShieldCheck, User, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { chatService } from "@/services/chatService";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import { format } from "date-fns";

export default function BusinessChatPage() {
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

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "";

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
                    const currentChat = chatResponse.data?.find((c: any) => c._id === chatId);
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
        return (
            <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui items-center justify-center">
                <div className="animate-pulse font-black text-[#0A5C36] uppercase tracking-widest">
                    Loading Conversation...
                </div>
            </div>
        );
    }

    const isSupport = chat?.isAdminSupport;
    const participant = chat?.participants?.[0];
    const name = isSupport ? "Admin Support" : participant?.fullName || "Unknown";
    const initials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");

    return (
        <div className="flex flex-col h-screen bg-gray-50/30 client-ui">
            {/* Header Mirroring Client Design */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                        onClick={() => router.push("/business/messages")}
                    >
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-[18px] overflow-hidden relative shadow-md bg-gray-100 flex items-center justify-center">
                            {isSupport ? (
                                <div className="w-full h-full bg-[#0A4D2E] flex items-center justify-center">
                                    <ShieldCheck className="w-7 h-7 text-white" />
                                </div>
                            ) : participant?.image ? (
                                <Image src={`${baseUrl}${participant.image}`} alt={name} fill className="object-cover" unoptimized={true} />
                            ) : (
                                <span className="text-gray-400 text-base font-bold">{initials}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-black text-gray-900 leading-tight">{name}</span>
                            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Active Now
                            </span>
                        </div>
                    </div>
                </div>
                <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400" aria-label="More">
                    <Ellipsis className="w-6 h-6" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 max-w-4xl mx-auto w-full scrollbar-hide">
                <div className="text-center py-4">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[3px]">Today, {format(new Date(), "PP")}</p>
                </div>

                {messages.map((msg, idx) => {
                    const senderId = typeof msg.sender === 'object' ? msg.sender?._id : msg.sender;
                    const isMe = senderId === currentUser?._id;
                    
                    return (
                        <div key={msg._id || idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] space-y-1`}>
                                <div className={`px-6 py-4 rounded-[32px] shadow-sm ${
                                    isMe 
                                        ? "bg-[#0A4D2E] text-white rounded-tr-none shadow-green-900/10" 
                                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                }`}>
                                    {msg.type === 'file' && msg.files?.length > 0 ? (
                                        <div className="space-y-2">
                                            {msg.files[0].match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                                                    <Image src={`${baseUrl}${msg.files[0]}`} alt="attachment" fill className="object-cover" unoptimized={true} />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-sm font-bold">
                                                    <FileText className="w-5 h-5" />
                                                    <span className="truncate max-w-[120px]">Attachment</span>
                                                </div>
                                            )}
                                            {msg.text && <p className="text-[15px] leading-relaxed font-medium mt-2">{msg.text}</p>}
                                        </div>
                                    ) : (
                                        <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
                                    )}
                                </div>
                                <span className={`mt-2 block text-[11px] font-bold px-2 ${isMe ? "text-right text-gray-400" : "text-left text-gray-400"}`}>
                                    {format(new Date(msg.createdAt || Date.now()), "HH:mm")}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="shrink-0 p-4 max-w-4xl mx-auto w-full bg-transparent">
                {selectedFile && (
                    <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-2xl border border-gray-100 mb-3 animate-in slide-in-from-bottom-2">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#0A5C36]">
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

                <div className="bg-white rounded-[32px] border border-gray-100 p-3 shadow-xl shadow-gray-200/50 flex items-center gap-3">
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
                        className="p-3 text-gray-400 hover:text-[#0A5C36] hover:bg-green-50 rounded-xl transition-all"
                    >
                        <Paperclip className="w-6 h-6" />
                    </button>
                    
                    <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-3">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Write a message..."
                            className="h-14 rounded-2xl border-none bg-gray-50 focus:bg-white transition-all text-[15px] font-medium py-4 px-5"
                        />
                        <button
                            type="submit"
                            disabled={(!newMessage.trim() && !selectedFile) || isSending}
                            className="h-14 w-14 shrink-0 rounded-2xl bg-[#0A4D2E] hover:bg-[#0d7344] text-white flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:scale-100"
                            aria-label="Send message"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
