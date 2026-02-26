"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Search, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "Home", href: "/home" },
        { icon: MessageSquare, label: "Message", href: "/messages" },
        { icon: Search, label: "Search", href: "/search" },
        { icon: User, label: "Profile", href: "/profile" },
    ];

    return (
        <div className="client-ui min-h-screen bg-gray-50 flex flex-col">
            {/* Main Content Area */}
            <main className="flex-1 pb-20 lg:pb-0 lg:pl-[280px]">
                <div className="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation (Mobile/Tablet) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 lg:hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-[#0A5C36]" : "text-gray-400"
                                }`}
                        >
                            <div className={`relative p-1 ${isActive ? "after:content-[''] after:absolute after:-top-2 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-1 after:bg-[#0A5C36] after:rounded-full" : ""}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Side Navigation (Desktop - Full Sidebar) */}
            <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-gray-100 flex-col py-10 px-6 gap-10 z-50">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-12 h-12 bg-[#0A5C36] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/10">
                        <span className="text-white font-black text-2xl">A</span>
                    </div>
                    <span className="text-2xl font-black text-gray-900 tracking-tight">AYA Shop</span>
                </div>

                <div className="flex-1 space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] px-4 mb-4">Menu</p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold ${isActive
                                    ? "bg-[#0A5C36] text-white shadow-xl shadow-green-900/20"
                                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                                    }`}
                            >
                                <Icon className="w-6 h-6" />
                                <span className="text-lg">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="px-2">
                    <div className="bg-gray-50 rounded-[32px] p-6 space-y-4">
                        <p className="text-xs font-bold text-gray-500 text-center">Need help with your bookings?</p>
                        <Button className="w-full bg-white border border-gray-100 text-[#0A5C36] hover:bg-green-50 rounded-xl font-bold shadow-sm">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
