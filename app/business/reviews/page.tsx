"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";

const allReviews = [
    {
        author: "Sarah Johnson",
        text: "Amazing food and excellent service! We had the Family Dinner Package and everything was perfect. Highly recommend Tony's for any occasion.",
        target: "Tony's Italian Restaurant",
        date: "2024-01-02",
        rating: 5
    },
    {
        author: "Mike Chen",
        text: "Great catering for our office event. The food arrived on time and was hot and delicious. Will definitely use Quick Lunch Catering again.",
        target: "Quick Lunch Catering",
        date: "2024-01-01",
        rating: 4
    },
    {
        author: "Emily Davis",
        text: "The service was good, but the portions were a bit smaller than expected. Still, the flavors were authentic.",
        target: "Tony's Italian Restaurant",
        date: "2023-12-28",
        rating: 4
    },
    {
        author: "James Wilson",
        text: "Excellent communication and very professional team. The catering setup was seamless.",
        target: "Quick Lunch Catering",
        date: "2023-12-20",
        rating: 5
    },
    {
        author: "Jessica Brown",
        text: "A bit pricey for what you get, but the experience was pleasant overall.",
        target: "Tony's Italian Restaurant",
        date: "2023-12-15",
        rating: 3
    }
];

export default function BusinessReviewsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center gap-4 lg:hidden">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-xl font-black text-gray-900 leading-tight">All Reviews</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Feedback</p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto w-full p-6 space-y-6 pb-24">
                <div className="flex items-center justify-between mb-2 lg:flex">
                    <h2 className="text-2xl font-black text-gray-900 hidden lg:block">Business Reviews</h2>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                        <Star className="w-5 h-5 text-[#0A4D2E] fill-[#0A4D2E]" />
                        <span className="text-lg font-black text-gray-900">4.8</span>
                        <span className="text-xs font-bold text-gray-400 ml-1">Average Rating</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allReviews.map((r, i) => (
                        <div key={r.author + i} className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="font-black text-lg text-gray-900 leading-tight">{r.author}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{r.date}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "text-[#0A4D2E] fill-[#0A4D2E]" : "text-gray-200"}`} />
                                    ))}
                                </div>
                            </div>

                            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-6 flex-grow">
                                &quot;{r.text}&quot;
                            </p>

                            <div className="pt-6 border-t border-gray-50 mt-auto">
                                <span className="inline-block text-[10px] font-black text-[#0A4D2E] bg-green-50 px-3 py-1.5 rounded-lg border border-green-100/50">
                                    {r.target}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
