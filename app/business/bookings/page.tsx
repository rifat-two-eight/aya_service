"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    User,
    Calendar,
    Clock,
    DollarSign,
    Mail,
    Check,
    X,
    CheckCircle2,
    XCircle,
    Loader2,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingService, BookingStatus } from "@/services/bookingService";
import { toast } from "sonner";

const STATUS_STYLES: Record<string, string> = {
    registered: "bg-yellow-50 text-yellow-700",
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
};

export default function BookingRequestsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [modalState, setModalState] = useState<{ type: 'accepted' | 'rejected' | null }>({ type: null });

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const response = await bookingService.getMyBookings({ page, limit: 10 });
            if (response.success) {
                setBookings(response.data || []);
                setTotalPages(response.meta?.totalPage || 1);
                setTotal(response.meta?.total || 0);
            }
        } catch (error: any) {
            toast.error("Failed to load bookings");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [page]);

    const handleStatusUpdate = async (id: string, status: BookingStatus) => {
        setActionLoading(id + status);
        try {
            const response = await bookingService.updateBookingStatus(id, status);
            if (response.success) {
                setModalState({ type: status === "confirmed" ? "accepted" : "rejected" });
                // Optimistically update UI
                setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        } finally {
            setActionLoading(null);
        }
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "";

    return (
        <div className="flex flex-col min-h-screen bg-white client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/business")}
                        className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                    >
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900">Booking Requests</h1>
                        <p className="text-xs font-bold text-gray-400">{total} total bookings</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-[#0A4D2E] rounded-full flex items-center justify-center text-white text-xs font-black">
                    {total}
                </div>
            </header>

            <div className="max-w-3xl mx-auto w-full p-4 space-y-6 pb-24">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#0A5C36]" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading bookings...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                            <FileText className="w-9 h-9 text-gray-200" />
                        </div>
                        <p className="font-black text-gray-900 text-lg">No Bookings Yet</p>
                        <p className="text-sm text-gray-400 max-w-xs">Booking requests from clients will appear here.</p>
                    </div>
                ) : (
                    <>
                        {bookings.map((b) => (
                            <div key={b._id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-[#0A4D2E]">
                                <div className="p-6 space-y-5">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                                                {b.user?.image ? (
                                                    <Image src={`${baseUrl}${b.user.image}`} alt={b.user.fullName} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                                                ) : (
                                                    <User className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-black text-gray-900">{b.user?.fullName || "Unknown Client"}</h2>
                                                <p className="text-xs font-bold text-gray-400">{b.user?.email}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${STATUS_STYLES[b.status] || "bg-gray-50 text-gray-500"}`}>
                                            {b.status}
                                        </span>
                                    </div>

                                    {/* Service Box */}
                                    <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50 flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                            {b.service?.photos?.[0] ? (
                                                <Image src={`${baseUrl}${b.service.photos[0]}`} alt={b.service.name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-green-800/60 uppercase tracking-widest">Service Requested</p>
                                            <p className="text-base font-black text-[#0A4D2E] leading-tight">{b.service?.name}</p>
                                            <p className="text-sm font-bold text-gray-500">${b.service?.price} · {b.service?.duration} min</p>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                                            </div>
                                            <p className="text-sm font-black text-gray-900">{b.date}</p>
                                        </div>
                                        <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                                            </div>
                                            <p className="text-sm font-black text-gray-900">{b.startTime} – {b.endTime}</p>
                                        </div>
                                        <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <DollarSign className="w-4 h-4" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Total</span>
                                            </div>
                                            <p className="text-sm font-black text-[#0A4D2E]">${b.totalAmount}</p>
                                        </div>
                                        <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Payment</span>
                                            </div>
                                            <p className="text-sm font-black text-gray-900 capitalize">{b.paymentMethod}</p>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {b.notes && (
                                        <div className="bg-blue-50/30 rounded-2xl p-4 border border-blue-100/50 border-l-4 border-l-blue-400">
                                            <p className="text-[10px] font-black text-blue-800/60 uppercase tracking-widest mb-1">Notes</p>
                                            <p className="text-sm font-medium text-gray-600 leading-relaxed italic">&quot;{b.notes}&quot;</p>
                                        </div>
                                    )}

                                    {(b.status === "registered" || b.status === "pending") && (
                                        <div className="flex gap-4 pt-1">
                                            <Button
                                                onClick={() => handleStatusUpdate(b._id, "confirmed")}
                                                disabled={!!actionLoading}
                                                className="flex-1 h-14 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl font-black gap-2 transition-all shadow-lg shadow-green-900/10"
                                            >
                                                {actionLoading === b._id + "confirmed" ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Check className="w-5 h-5" />
                                                )}
                                                Confirm
                                            </Button>
                                            <Button
                                                onClick={() => handleStatusUpdate(b._id, "cancelled")}
                                                disabled={!!actionLoading}
                                                variant="outline"
                                                className="flex-1 h-14 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-2xl font-black gap-2 transition-all"
                                            >
                                                {actionLoading === b._id + "cancelled" ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <XCircle className="w-5 h-5" />
                                                )}
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isLoading}
                                    className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Previous
                                </Button>
                                <span className="text-sm font-black text-gray-500">{page} / {totalPages}</span>
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || isLoading}
                                    className="h-12 px-6 rounded-xl border-gray-100 hover:text-[#0A5C36] hover:border-[#0A5C36] disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Success/Reject Modal */}
            {modalState.type && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[40px] p-10 w-full max-w-sm text-center relative space-y-6 shadow-2xl">
                        <button
                            onClick={() => setModalState({ type: null })}
                            className="absolute top-4 right-6 p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${modalState.type === 'accepted' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {modalState.type === 'accepted' ? (
                                <CheckCircle2 className="w-12 h-12 text-[#0A4D2E]" />
                            ) : (
                                <XCircle className="w-12 h-12 text-red-500" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900">
                                {modalState.type === 'accepted' ? 'Booking Confirmed' : 'Booking Cancelled'}
                            </h2>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                {modalState.type === 'accepted'
                                    ? 'The customer has been notified and the booking is now confirmed.'
                                    : 'A notification has been sent to the customer regarding the cancellation.'}
                            </p>
                        </div>
                        <Button
                            onClick={() => setModalState({ type: null })}
                            className={`w-full h-14 rounded-2xl font-black text-lg transition-all ${modalState.type === 'accepted'
                                ? 'bg-[#0A4D2E] hover:bg-[#0d7344]'
                                : 'bg-red-600 hover:bg-red-700'
                                }`}
                        >
                            {modalState.type === 'accepted' ? 'Great!' : 'Close'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}


