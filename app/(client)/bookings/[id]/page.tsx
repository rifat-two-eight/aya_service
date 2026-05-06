"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { bookingService } from "@/services/bookingService";
import { ChevronLeft, Calendar, Clock, MapPin, CheckCircle2, XCircle, Clock4, User, Phone, Mail, Building2, CreditCard, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

import Swal from "sweetalert2";

export default function BookingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params.id as string;
    
    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!bookingId) return;
            try {
                const response = await bookingService.getBookingById(bookingId);
                if (response.success) {
                    setBooking(response.data);
                }
            } catch (error: any) {
                console.error("Error fetching booking detail:", error);
                toast.error("Failed to load booking details");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooking();
    }, [bookingId]);

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: "Cancel Booking?",
            text: "Are you sure you want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#0A5C36",
            confirmButtonText: "Yes, Cancel it!",
            cancelButtonText: "No, Keep it",
            background: "#fff",
            borderRadius: "32px",
            customClass: {
                title: "font-black text-gray-900",
                confirmButton: "rounded-2xl font-black uppercase tracking-widest",
                cancelButton: "rounded-2xl font-black uppercase tracking-widest"
            }
        });

        if (result.isConfirmed) {
            setIsUpdating(true);
            try {
                const response = await bookingService.updateBookingStatus(bookingId, "cancelled");
                if (response.success) {
                    setBooking({ ...booking, status: "cancelled" });
                    toast.success("Booking cancelled successfully");
                }
            } catch (error: any) {
                toast.error(error.message || "Failed to cancel booking");
            } finally {
                setIsUpdating(false);
            }
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-700 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-700 border-red-200";
            case "confirmed":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    if (isLoading) {
        return <div className="max-w-3xl mx-auto py-20 text-center animate-pulse font-black text-[#0A5C36] uppercase tracking-widest">Loading Details...</div>;
    }

    if (!booking) {
        return <div className="max-w-3xl mx-auto py-20 text-center font-black text-gray-400">Booking not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-6 min-h-screen bg-gray-50/30">
            {/* Header */}
            <header className="flex items-center gap-4 mb-10">
                <button onClick={() => router.back()} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 leading-tight">Booking Details</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID: #{booking._id?.slice(-8)}</p>
                </div>
            </header>

            <div className="grid gap-8">
                {/* Main Card */}
                <div className="bg-white border border-gray-100 rounded-[50px] p-8 md:p-12 shadow-2xl shadow-green-900/5 space-y-10">
                    {/* Status Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                                {booking.service?.photos?.[0] && (
                                    <Image src={booking.service.photos[0]} alt="" fill className="object-cover" unoptimized={true} />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900">{booking.service?.name}</h2>
                                <p className="text-sm font-bold text-[#0A5C36]">{booking.provider?.business?.businessName}</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 px-6 py-2.5 rounded-full border font-black uppercase tracking-widest text-xs ${getStatusStyles(booking.status)}`}>
                            {booking.status}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#0A5C36]" /> Schedule
                            </h3>
                            <div className="space-y-4">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-lg font-black text-gray-900">{format(new Date(booking.date), "EEEE, MMMM do")}</p>
                                    <p className="text-sm font-bold text-gray-500">{booking.startTime} - {booking.endTime}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#0A5C36]" /> Location
                            </h3>
                            <div className="space-y-4">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-lg font-black text-gray-900">{booking.provider?.business?.city}, {booking.provider?.business?.state}</p>
                                    <p className="text-sm font-bold text-gray-500 line-clamp-1">{booking.provider?.business?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Provider Info */}
                    <div className="pt-10 border-t border-gray-100 space-y-6">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Provider Contact</h3>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-[#0A5C36]" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Provider Name</p>
                                    <p className="font-bold text-gray-900">{booking.provider?.fullName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-[#0A5C36]" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone</p>
                                    <p className="font-bold text-gray-900">{booking.provider?.phone || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Payment Method</h3>
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-[#0A5C36]" />
                                <span className="font-bold text-gray-900 uppercase">{booking.paymentMethod}</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded bg-green-100 text-green-700 uppercase tracking-wider`}>
                                    {booking.paymentStatus}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                            <p className="text-4xl font-black text-[#0A5C36]">${booking.totalAmount}</p>
                        </div>
                    </div>

                    {/* Notes */}
                    {booking.notes && (
                        <div className="pt-10 border-t border-gray-100 space-y-4">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-[#0A5C36]" /> Your Notes
                            </h3>
                            <div className="p-6 bg-gray-50 rounded-3xl italic text-gray-600">
                                "{booking.notes}"
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={isUpdating || booking.status === 'cancelled' || booking.status === 'completed'}
                        className="flex-1 h-16 rounded-[28px] border-gray-200 font-black uppercase tracking-widest text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all disabled:opacity-50"
                    >
                        {isUpdating ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                    <Button className="flex-1 h-16 rounded-[28px] bg-[#0A5C36] hover:bg-[#084a2c] font-black uppercase tracking-widest shadow-xl shadow-green-900/10">
                        Support Chat
                    </Button>
                </div>
            </div>
        </div>
    );
}
