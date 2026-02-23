"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientOTPPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate verification
        setTimeout(() => {
            setIsLoading(false);
            router.push("/home"); // Redirect to client homepage
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

                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">Verify Number</h1>
                    <p className="text-gray-400">Enter the 4-Digit code sent to you at <span className="text-gray-900 font-semibold">01630******</span></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="flex justify-between gap-4">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={inputRefs[i]}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="w-16 h-16 md:w-20 md:h-20 text-center text-3xl font-bold rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-[#0A5C36] focus:bg-white focus:ring-4 focus:ring-green-50 outline-none transition-all"
                                required
                            />
                        ))}
                    </div>

                    <div className="space-y-6">
                        <Button
                            type="submit"
                            className="w-full h-16 rounded-2xl bg-[#0A5C36] hover:bg-[#0d7344] text-white text-xl font-bold transition-all active:scale-[0.97] shadow-xl shadow-green-900/10 disabled:bg-gray-400"
                            disabled={isLoading || otp.some(d => !d)}
                        >
                            {isLoading ? "Verifying..." : "Submit"}
                        </Button>

                        <p className="text-center text-gray-500 font-medium">
                            Don't have code? <button type="button" className="text-[#0A5C36] font-bold hover:underline">Resend Again</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
