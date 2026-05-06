"use client";

import { useState, useEffect } from "react";
import { bookingService } from "@/services/bookingService";
import { ChevronRight, Calendar, Clock, MapPin, CheckCircle2, XCircle, Clock4 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await bookingService.getMyBookings();
                if (response.success) {
                    setBookings(response.data);
                }
            } catch (error: any) {
                console.error("Error fetching bookings:", error);
                toast.error("Failed to load your bookings");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
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

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return <CheckCircle2 className="w-3 h-3" />;
            case "cancelled":
                return <XCircle className="w-3 h-3" />;
            default:
                return <Clock4 className="w-3 h-3" />;
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-6 space-y-6">
                <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse" />
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-50 rounded-[32px] animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 min-h-screen">
            <div className="space-y-2 mb-10">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Bookings</h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Manage your appointments and history</p>
            </div>

            {bookings.length > 0 ? (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <Link
                            key={booking._id}
                            href={`/bookings/${booking._id}`}
                            className="group bg-white border border-gray-100 rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center hover:shadow-2xl hover:shadow-green-900/10 hover:border-[#0A5C36]/20 transition-all duration-500"
                        >
                            {/* Service Image */}
                            <div className="relative w-full md:w-32 h-32 rounded-[28px] overflow-hidden bg-gray-50 flex-shrink-0">
                                {booking.service?.photos?.[0] ? (
                                    <Image
                                        src={booking.service.photos[0]}
                                        alt={booking.service.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300">
                                        <Calendar className="w-8 h-8" />
                                    </div>
                                )}
                            </div>

                            {/* Booking Info */}
                            <div className="flex-1 space-y-3 w-full">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-gray-900 group-hover:text-[#0A5C36] transition-colors line-clamp-1">
                                            {booking.service?.name}
                                        </h3>
                                        <p className="text-sm font-bold text-gray-400">
                                            {booking.provider?.business?.businessName}
                                        </p>
                                    </div>
                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyles(booking.status)}`}>
                                        {getStatusIcon(booking.status)}
                                        {booking.status}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-xs font-black text-gray-500">
                                        <Calendar className="w-4 h-4 text-[#0A5C36]" />
                                        {format(new Date(booking.date), "PPP")}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-black text-gray-500">
                                        <Clock className="w-4 h-4 text-[#0A5C36]" />
                                        {booking.startTime} - {booking.endTime}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                                <span className="text-2xl font-black text-[#0A5C36]">
                                    ${booking.totalAmount}
                                </span>
                                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-green-50 group-hover:text-[#0A5C36] transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 space-y-6 bg-white border-2 border-dashed border-gray-100 rounded-[50px]">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                        <Calendar className="w-12 h-12 text-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-gray-900">No Bookings Yet</h2>
                        <p className="text-gray-400 font-bold max-w-xs mx-auto">You haven't made any appointments yet. Start exploring services to book your first one!</p>
                    </div>
                    <Link href="/home">
                        <button className="mt-4 px-8 py-4 bg-[#0A5C36] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#084a2c] transition-all shadow-xl shadow-green-900/10">
                            Explore Services
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
