"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Home, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

export default function BusinessSettingsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 pb-24 client-ui">
            {/* Header */}
            <div className="bg-[#0A4D2E] text-white px-6 py-4 flex items-center justify-between lg:hidden">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/business")}
                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                        <Home className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold leading-tight">Business Hub</h1>
                        <p className="text-xs text-white/70">Manage your business</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <Link href="/business/profile" className="flex flex-col items-center gap-0.5">
                        <UserCircle className="w-6 h-6" />
                        <span className="text-[10px]">Profile</span>
                    </Link>
                </div>
            </div>

            <div className="px-5 py-6 space-y-8 max-w-3xl mx-auto w-full">
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Business Settings</h2>

                {/* Business Information */}
                <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-gray-900">Business Information</h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Business Name</label>
                            <Input
                                placeholder="Enter business name"
                                defaultValue="Tony's Italian Restaurant"
                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Business Category</label>
                            <Input
                                placeholder="Enter business category"
                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                            <Textarea
                                placeholder="Enter business description"
                                className="min-h-[120px] rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium resize-none px-4 py-3"
                            />
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-gray-900">Business Hours</h3>

                    <div className="space-y-4">
                        {days.map((day) => (
                            <div key={day} className="flex items-center justify-between gap-4">
                                <span className="text-sm font-bold text-gray-500 w-24">{day}</span>
                                <div className="flex items-center gap-3 flex-1">
                                    <Input
                                        placeholder="00:00"
                                        className="h-12 rounded-xl border-gray-100 bg-gray-50/50 text-center font-bold"
                                    />
                                    <span className="text-xs font-bold text-gray-400">to</span>
                                    <Input
                                        placeholder="00:00"
                                        className="h-12 rounded-xl border-gray-100 bg-gray-50/50 text-center font-bold"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <Button className="w-full h-16 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-[24px] text-lg font-black shadow-xl shadow-green-900/10 transition-all">
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
