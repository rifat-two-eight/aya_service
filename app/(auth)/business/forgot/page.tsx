"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BusinessForgotPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // For demo, just redirect back or to a success state
            router.push("/business/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[450px] space-y-12">
                <div className="flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Forgot password</h1>
                    <p className="text-gray-500 font-medium text-lg">Password recovery</p>
                    <p className="text-gray-400">Enter your email address and we will send you a reset instructions.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="h-16 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all pl-12"
                                disabled={isLoading}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Button
                            type="submit"
                            className="w-full h-16 rounded-2xl bg-[#0A5C36] hover:bg-[#0d7344] text-white text-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-xl shadow-green-900/10"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send"}
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
