"use client";

import { User, LogOut, ChevronRight, Settings, Shield, Bell, Heart, History, Wallet, UserCircle, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClientProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear user data and redirect to role selection
        router.push("/");
    };

    const sections = [
        {
            title: "Account",
            items: [
                { icon: UserCircle, label: "Personal Information" },
                { icon: History, label: "Booking History" },
                { icon: Wallet, label: "Payments & Payouts" },
            ]
        },
        {
            title: "Support & Preferences",
            items: [
                { icon: Heart, label: "My Favorites" },
                { icon: Bell, label: "Notifications" },
                { icon: MessageCircle, label: "Help Center" },
            ]
        },
        {
            title: "Legal & Settings",
            items: [
                { icon: Shield, label: "Privacy Policy" },
                { icon: Settings, label: "Security Settings" },
            ]
        }
    ];

    return (
        <div className="flex flex-col gap-10 md:gap-16 pb-20">
            <div className="w-full space-y-16">

                {/* Header/User Profile */}
                <div className="flex flex-col items-center text-center space-y-4 pt-10">
                    <div className="relative">
                        <div className="w-28 h-28 bg-gradient-to-br from-[#0A5C36] to-[#0D7A47] rounded-[32px] flex items-center justify-center shadow-xl shadow-green-900/20 border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-500">
                            <User className="w-14 h-14 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-gray-900">Rifat Ahmed</h1>
                        <p className="text-sm font-medium text-gray-400">rifat@example.com</p>
                    </div>
                    <Button variant="outline" className="h-10 rounded-full px-6 border-gray-200 bg-white text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all">
                        Edit Profile
                    </Button>
                </div>

                {/* Menu Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[2px] ml-4">{section.title}</h2>
                            <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
                                {section.items.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.label}
                                            className={`w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all group ${idx !== section.items.length - 1 ? "border-b border-gray-50" : ""
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all text-gray-400 group-hover:text-[#0A5C36]">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <span className="font-black text-gray-900">{item.label}</span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-gray-400 transition-colors" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    className="w-full h-16 rounded-[24px] bg-red-50 hover:bg-red-100 text-red-600 font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.97] mb-10"
                >
                    <LogOut className="w-5 h-5" />
                    Logout Account
                </Button>
            </div>
        </div>
    );
}
