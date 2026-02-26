"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ClientLoginPage() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    if (!checked) {
        if (typeof document !== "undefined" && document.cookie.includes("aya_client_session=1")) {
            router.replace("/home");
        }
        setChecked(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push("/client/otp");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[450px] space-y-12">
                {/* Header */}
                <div className="flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    <p className="text-gray-500 font-medium text-lg">Get started</p>
                    <p className="text-gray-400">Enter your phone number to Booking</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                            Phone Number
                        </Label>
                        <div className="relative flex items-center">
                            <div className="absolute left-4 flex items-center gap-2 border-r pr-3 border-gray-200">
                                <div className="w-7 h-5 relative overflow-hidden rounded-sm shadow-sm">
                                    {/* BD Flag placeholder style */}
                                    <div className="absolute inset-0 bg-[#006a4e]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#f42a41] rounded-full" />
                                </div>
                                <span className="text-gray-600 font-medium">+880</span>
                            </div>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="01630******"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="h-16 pl-[110px] rounded-2xl border-gray-200 focus:border-[#0A5C36] focus:ring-[#0A5C36] text-lg font-medium shadow-sm transition-all"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Button
                            type="submit"
                            className="w-full h-16 rounded-2xl bg-[#0A5C36] hover:bg-[#0d7344] text-white text-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-xl shadow-green-900/10 disabled:bg-gray-400"
                            disabled={isLoading || !phoneNumber}
                        >
                            {isLoading ? "Sending..." : "Send"}
                            <Send className="w-5 h-5" />
                        </Button>

                        <p className="text-center text-gray-500 font-medium">
                            Don&apos;t have code? <button type="button" className="text-[#0A5C36] font-bold hover:underline">Resend Again</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
