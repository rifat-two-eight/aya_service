"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, MapPin, Star, Phone, MessageSquare, Clock, Globe, Mail, Users, Facebook, Instagram, Twitter } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { serviceService } from "@/services/serviceService";
import { chatService } from "@/services/chatService";
import { reviewService } from "@/services/reviewService";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

export default function ServiceDetailPage() {
    const router = useRouter();
    const params = useParams();
    const serviceId = params.id as string;
    
    const [service, setService] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isChatLoading, setIsChatLoading] = useState(false);
    
    // Review State
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) return;
            try {
                const [serviceRes, reviewsRes] = await Promise.all([
                    serviceService.getServiceById(serviceId),
                    reviewService.getReviewsByServiceId(serviceId, { limit: 10 })
                ]);
                
                if (serviceRes.success) {
                    setService(serviceRes.data);
                }
                if (reviewsRes.success) {
                    setReviews(reviewsRes.data.reviews || reviewsRes.data || []);
                }
            } catch (error: any) {
                console.error("Error fetching service:", error);
                toast.error("Failed to load service details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [serviceId]);

    const handleChatWithProvider = async () => {
        if (!service?.provider?._id) return;
        
        setIsChatLoading(true);
        try {
            const response = await chatService.createChat(service.provider._id);
            if (response.success) {
                toast.success("Conversation started");
                router.push("/messages");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to start conversation");
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return toast.error("Please enter a comment");
        
        setIsSubmittingReview(true);
        try {
            const response = await reviewService.createReview({
                service: serviceId,
                rating: newReview.rating,
                comment: newReview.comment
            });
            if (response.success) {
                toast.success("Review submitted!");
                setReviews([response.data, ...reviews]);
                setNewReview({ rating: 5, comment: "" });
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to submit review");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        const result = await Swal.fire({
            title: "Delete Review?",
            text: "Are you sure you want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#0A5C36",
            confirmButtonText: "Yes, Delete",
        });

        if (result.isConfirmed) {
            try {
                await reviewService.deleteReview(reviewId);
                setReviews(reviews.filter(r => r._id !== reviewId));
                toast.success("Review deleted");
            } catch (error: any) {
                toast.error(error.message || "Failed to delete review");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto pb-20 space-y-8 px-4 md:px-6 animate-pulse">
                <div className="h-32 bg-gray-100 rounded-[40px]" />
                <div className="h-64 bg-gray-50 rounded-[40px]" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="max-w-7xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Service not found</h2>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-8 px-4 md:px-6">
            {/* Header / Basic Info */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <button onClick={() => router.back()} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                    <ChevronLeft className="w-8 h-8 text-gray-900" />
                </button>
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-50">
                        {service.photos?.[0] ? (
                            <Image src={service.photos[0]} alt={service.name} fill className="object-cover" unoptimized={true} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{service.name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-[#064E3B] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                {service.category?.name || "Service"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-gray-900">
                                {service.rating?.averageRating || 0}
                            </span>
                            <span className="text-sm font-bold text-gray-400 ml-1">
                                ({service.rating?.total || 0} reviews)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
                {service.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-400">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🏪</span> {service.provider?.business?.businessName || "Verified Provider"}
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {service.maxBookingsPerDay || 0} slots per day
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-gray-100">
                {/* Left/Middle: Services & About */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Pricing & Details</h2>
                        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-gray-900">{service.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                                        <Clock className="w-4 h-4" />
                                        Duration: {service.duration} minutes
                                    </div>
                                </div>
                                <span className="text-3xl font-black text-[#064E3B]">${service.price}</span>
                            </div>
                            <Link href={`/services/${service._id}/book`}>
                                <Button className="w-full h-14 bg-[#064E3B] hover:bg-[#043327] rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-green-900/10">
                                    Book This Service
                                </Button>
                            </Link>
                        </div>
                    </section>

                    <Button 
                        variant="outline" 
                        onClick={handleChatWithProvider}
                        disabled={isChatLoading}
                        className="w-full h-14 rounded-2xl border-gray-100 bg-[#EBF4F0] text-[#064E3B] font-black uppercase tracking-widest text-xs hover:bg-[#deede6] flex items-center gap-2 disabled:opacity-50"
                    >
                        <MessageSquare className="w-4 h-4" />
                        {isChatLoading ? "Starting Conversation..." : "Chat with Provider"}
                    </Button>

                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Features</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features?.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-2 h-2 bg-[#064E3B] rounded-full" />
                                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section className="space-y-8 pt-8 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Reviews</h2>
                            <span className="text-xs font-bold text-gray-400">{reviews.length} reviews</span>
                        </div>

                        {/* Submit Review Form */}
                        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-[32px] space-y-4 border border-gray-100">
                            <h3 className="text-sm font-black text-gray-900">Write a Review</h3>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="focus:outline-none"
                                    >
                                        <Star className={`w-8 h-8 ${star <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} transition-colors`} />
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder="Share your experience..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                className="w-full h-24 p-4 rounded-2xl border-gray-200 bg-white font-medium focus:ring-2 focus:ring-[#0A5C36]/20 focus:border-[#0A5C36] transition-all resize-none"
                            />
                            <Button 
                                type="submit" 
                                disabled={isSubmittingReview}
                                className="w-full h-12 bg-[#0A5C36] hover:bg-[#084a2c] rounded-xl font-black uppercase tracking-widest shadow-lg shadow-green-900/10"
                            >
                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                            </Button>
                        </form>

                        {/* Review List */}
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review._id} className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm flex gap-4 group">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 flex-shrink-0 overflow-hidden">
                                        {review.client?.image ? (
                                            <img src={review.client.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-black text-gray-900">{review.client?.fullName || "Anonymous"}</h4>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteReview(review._id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                            </button>
                                        </div>
                                        <p className="text-sm font-medium text-gray-600 leading-relaxed">{review.comment}</p>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest pt-2">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right/Sidebar: Contact Info & Social */}
                <div className="space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Contact Information</h2>
                        <div className="space-y-6">
                            <ContactLink icon={<MapPin className="w-5 h-5" />} text={service.provider?.business?.address || "Location not provided"} />
                            <ContactLink icon={<Phone className="w-5 h-5" />} text={service.provider?.phone || "Phone not provided"} />
                            <ContactLink icon={<Mail className="w-5 h-5" />} text={service.provider?.email || "Email not provided"} />
                            <ContactLink icon={<Globe className="w-5 h-5" />} text={service.provider?.business?.businessStatus === 'approved' ? "Verified Business" : "Business Profile"} />
                        </div>
                    </section>

                    <section className="space-y-4">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Follow on social media</p>
                        <div className="flex gap-3">
                            <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/20 hover:scale-110 transition-transform">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-600/20 hover:scale-110 transition-transform">
                                <Instagram className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/20 hover:scale-110 transition-transform">
                                <Twitter className="w-5 h-5" />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function ContactLink({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-start gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#064E3B] group-hover:text-white transition-all">
                {icon}
            </div>
            <p className="text-sm font-bold text-gray-600 pt-2 group-hover:text-[#064E3B] transition-colors line-clamp-2">{text}</p>
        </div>
    );
}
