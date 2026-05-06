"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serviceService } from "@/services/serviceService";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

import { bookingService } from "@/services/bookingService";

export default function BookingPage() {
    const router = useRouter();
    const params = useParams();
    const serviceId = params.id as string;
    const searchParams = useSearchParams();
    
    const [service, setService] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availabilityLoading, setAvailabilityLoading] = useState(false);
    const [availableSlots, setAvailableSlots] = useState<any[]>([]);

    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        notes: ""
    });

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) return;
            try {
                const response = await serviceService.getServiceById(serviceId);
                if (response.success) {
                    setService(response.data);
                }
            } catch (error: any) {
                console.error("Error fetching service:", error);
                toast.error("Failed to load service for booking");
            } finally {
                setIsLoading(false);
            }
        };
        fetchService();
    }, [serviceId]);

    useEffect(() => {
        const checkAvailability = async () => {
            if (!serviceId || !selectedDate) return;
            setAvailabilityLoading(true);
            try {
                const dateStr = format(selectedDate, "yyyy-MM-dd");
                const response = await serviceService.getServiceAvailability(serviceId, dateStr);
                if (response.success) {
                    setAvailableSlots(response.data || []);
                    setSelectedSlot(null); // Reset selection when date changes
                }
            } catch (error: any) {
                console.error("Error checking availability:", error);
                setAvailableSlots([]);
            } finally {
                setAvailabilityLoading(false);
            }
        };
        checkAvailability();
    }, [serviceId, selectedDate]);

    const dates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

    const nextStep = () => {
        if (step === 1 && !selectedSlot) {
            toast.error("Please select an available time slot");
            return;
        }
        setStep(step + 1);
    };

    const handleBooking = async () => {
        if (!formData.fullName || !formData.email || !formData.phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const bookingData = {
                service: serviceId,
                date: format(selectedDate, "yyyy-MM-dd"),
                startTime: selectedSlot.from,
                endTime: selectedSlot.to,
                notes: formData.notes,
                paymentMethod: "online" as const
            };

            const response = await bookingService.createBooking(bookingData);
            if (response.success) {
                setStep(3);
            } else {
                toast.error(response.message || "Failed to create booking");
            }
        } catch (error: any) {
            console.error("Booking error:", error);
            toast.error(error.message || "An error occurred during booking");
        } finally {
            setIsSubmitting(false);
        }
    };

    const prevStep = () => setStep(step - 1);

    if (isLoading) {
        return <div className="max-w-xl mx-auto py-20 text-center animate-pulse font-black text-[#064E3B] uppercase tracking-widest">Loading Service Details...</div>;
    }

    if (!service) {
        return <div className="max-w-xl mx-auto py-20 text-center font-black text-gray-400">Service not found</div>;
    }

    return (
        <div className="max-w-xl mx-auto min-h-screen bg-white md:bg-gray-50/30 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 h-20 flex items-center gap-4">
                <button 
                    disabled={isSubmitting}
                    onClick={() => step === 1 ? router.back() : prevStep()} 
                    className="p-2 hover:bg-gray-50 rounded-xl transition-all disabled:opacity-50"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-black text-gray-900 leading-tight">Book Appointment</h1>
                    <p className="text-xs font-bold text-gray-400 truncate">{service.name}</p>
                </div>
            </header>

            {/* Stepper */}
            <div className="bg-white px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between relative max-w-xs mx-auto">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-2 z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= s ? "bg-[#064E3B] text-white shadow-lg shadow-green-900/20" : "bg-gray-100 text-gray-400"
                                }`}>
                                {s}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider ${step >= s ? "text-[#064E3B]" : "text-gray-300"}`}>
                                {s === 1 ? "Date & Time" : s === 2 ? "Details" : "Payment"}
                            </span>
                        </div>
                    ))}
                    <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 z-0" />
                    <div className={`absolute top-5 left-0 h-[2px] bg-[#064E3B] transition-all duration-500 z-0`}
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
                </div>
            </div>

            <main className="flex-1 p-6 space-y-8 pb-32">
                <div className="bg-[#f8faf9] p-6 rounded-[32px] border border-[#eef2f0] flex justify-between items-center shadow-sm">
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest mb-1">Booking Summary</p>
                        <h2 className="text-xl font-black text-gray-900 line-clamp-1">{service.name}</h2>
                        <p className="text-sm font-bold text-gray-400 truncate">{service.provider?.business?.businessName}</p>
                    </div>
                    <span className="text-2xl font-black text-[#064E3B] ml-4">${service.price}</span>
                </div>

                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-900">
                                    <CalendarIcon className="w-5 h-5 text-[#064E3B]" />
                                    <h3 className="font-black text-sm uppercase tracking-widest">Select Date</h3>
                                </div>
                                {availabilityLoading && <span className="text-[10px] font-bold text-gray-400 animate-pulse">Checking...</span>}
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                {dates.map((d) => (
                                    <button
                                        key={d.toISOString()}
                                        onClick={() => setSelectedDate(d)}
                                        className={`min-w-[100px] p-4 rounded-2xl border transition-all text-left space-y-1 ${format(selectedDate, 'PP') === format(d, 'PP')
                                            ? "bg-[#ebf4f0] border-[#064E3B] shadow-inner"
                                            : "bg-white border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${format(selectedDate, 'PP') === format(d, 'PP') ? "text-[#064E3B]" : "text-gray-400"}`}>
                                            {format(d, "EEE")}
                                        </p>
                                        <p className={`text-sm font-black ${format(selectedDate, 'PP') === format(d, 'PP') ? "text-[#064E3B]" : "text-gray-900"}`}>
                                            {format(d, "MMM d")}
                                        </p>
                                    </button>
                                ))}
                            </div>
                            {!availabilityLoading && (
                                <p className={`text-[10px] font-black uppercase tracking-[1px] px-3 py-1.5 rounded-lg inline-block ${availableSlots.length > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {availableSlots.length} slots available
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-900">
                                <Clock className="w-5 h-5 text-[#064E3B]" />
                                <h3 className="font-black text-sm uppercase tracking-widest">Select Time Slot</h3>
                            </div>
                            {availabilityLoading ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-14 bg-gray-50 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                            ) : availableSlots.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {availableSlots.map((slot, idx) => (
                                        <button
                                            key={idx}
                                            disabled={slot.status !== 'available'}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`p-4 rounded-2xl border transition-all font-bold text-sm flex flex-col items-center gap-1 ${selectedSlot === slot
                                                ? "bg-[#064E3B] border-[#064E3B] text-white shadow-lg"
                                                : slot.status === 'available'
                                                    ? "bg-white border-gray-100 text-gray-600 hover:border-gray-200"
                                                    : "bg-gray-50 border-gray-50 text-gray-300 cursor-not-allowed"
                                                }`}
                                        >
                                            <span className="text-[10px] uppercase opacity-60">Available</span>
                                            {slot.from} - {slot.to}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 bg-gray-50 rounded-[32px] text-center border-2 border-dashed border-gray-100">
                                    <p className="text-gray-400 font-bold">No slots available for this date</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-[#064E3B]" />
                                <h3 className="font-black text-sm uppercase tracking-widest text-[#064E3B]">Your Information</h3>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                                    <Input
                                        placeholder="Full Name"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-medium px-6 focus:bg-white transition-all"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email *</label>
                                    <Input
                                        placeholder="Email Address"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-medium px-6 focus:bg-white transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                    <Input
                                        placeholder="Phone Number"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-medium px-6 focus:bg-white transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Special Requirements (Optional)</label>
                                    <textarea
                                        placeholder="Any special requests..."
                                        className="w-full min-h-[120px] p-6 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/10 focus:bg-white transition-all"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-16 h-16 text-[#064E3B]" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-gray-900">Booking Confirmed!</h2>
                            <p className="text-gray-400 font-bold max-w-xs mx-auto">Your appointment for {format(selectedDate, 'PP')} at {selectedSlot?.from} has been successfully booked.</p>
                        </div>
                        <div className="w-full pt-10">
                            <Button onClick={() => router.push("/home")} className="w-full h-14 bg-[#064E3B] rounded-2xl font-black uppercase tracking-widest">
                                Return Home
                            </Button>
                        </div>
                    </div>
                )}
            </main>

            {step < 3 && (
                <div className="p-6 bg-white border-t border-gray-100 flex justify-center z-40">
                    <div className="max-w-xl w-full">
                        <Button
                            onClick={step === 1 ? nextStep : handleBooking}
                            disabled={(step === 1 && (!selectedDate || !selectedSlot)) || (step === 2 && isSubmitting)}
                            className="w-full h-12 bg-[#064E3B] hover:bg-[#043327] rounded-2xl text-xl font-black shadow-2xl shadow-green-900/20 active:scale-[0.98] transition-all"
                        >
                            {isSubmitting ? "Processing..." : step === 1 ? "Continue" : "Confirm & Book"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
