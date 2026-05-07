"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, MessageSquare, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewService } from "@/services/reviewService";
import { toast } from "sonner";

export default function BusinessReviewsPage() {
    const router = useRouter();
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            try {
                const response = await reviewService.getBusinessMyReviews({ page, limit });
                if (response.success) {
                    setReviews(response.data.reviews || []);
                    setTotalPages(response.data.meta?.totalPage || 1);
                    setTotal(response.data.meta?.total || 0);
                }
            } catch (error: any) {
                console.error("Error fetching reviews:", error);
                toast.error("Failed to load reviews");
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [page]);

    // Calculate average rating from current loaded reviews
    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
        : "0.0";

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui">
            {/* Mobile Header */}
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
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2 lg:flex">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 hidden lg:block">Business Reviews</h2>
                        <p className="text-sm text-gray-400 font-medium hidden lg:block mt-1">{total} total reviews</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                        <Star className="w-5 h-5 text-[#0A4D2E] fill-[#0A4D2E]" />
                        <span className="text-lg font-black text-gray-900">{avgRating}</span>
                        <span className="text-xs font-bold text-gray-400 ml-1">Average Rating</span>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#0A5C36]" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading reviews...</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map((r, i) => (
                                <div key={r._id || i} className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-5">
                                    {/* Reviewer Info */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                                                {r.client?.image ? (
                                                    <Image src={r.client.image} alt={r.client.fullName} width={44} height={44} className="object-cover w-full h-full" unoptimized />
                                                ) : (
                                                    <User className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-base text-gray-900 leading-tight">{r.client?.fullName || "Anonymous"}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Star Rating */}
                                        <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star key={j} className={`w-3.5 h-3.5 ${j < (r.rating || 0) ? "text-[#0A4D2E] fill-[#0A4D2E]" : "text-gray-200"}`} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-sm font-medium text-gray-600 leading-relaxed grow">
                                        &quot;{r.comment || "No comment provided."}&quot;
                                    </p>

                                    {/* Service Tag */}
                                    <div className="pt-4 border-t border-gray-50 mt-auto flex items-center gap-3">
                                        {r.service?.photos?.[0] && (
                                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                                                <Image src={r.service.photos[0]} alt={r.service.name} fill className="object-cover" unoptimized />
                                            </div>
                                        )}
                                        <span className="inline-block text-[10px] font-black text-[#0A4D2E] bg-green-50 px-3 py-1.5 rounded-lg border border-green-100/50">
                                            {r.service?.name || "Unknown Service"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-8">
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Previous
                                </Button>
                                <span className="text-sm font-black text-gray-500">
                                    {page} / {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-9 h-9 text-gray-200" />
                        </div>
                        <p className="font-black text-gray-900 text-lg">No Reviews Yet</p>
                        <p className="text-sm text-gray-400 max-w-xs">Reviews from your customers will appear here once they start rating your services.</p>
                    </div>
                )}
            </div>
        </div>
    );
}


