"use client";

import { useState } from "react";
import { ChevronLeft, Calendar as CalendarIcon, Clock, User, Mail, Phone, FileText, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceName = searchParams.get("service") || "Service Name";
    const servicePrice = searchParams.get("price") || "0";

    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<string | null>("Jan 8");
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        notes: ""
    });

    const dates = [
        { day: "Mon", date: "Jan 5" },
        { day: "Tue", date: "Jan 6" },
        { day: "Wed", date: "Jan 7" },
        { day: "Thu", date: "Jan 8", active: true },
        { day: "Fri", date: "Jan 9" },
        { day: "Sat", date: "Jan 10" },
        { day: "Sun", date: "Jan 11" },
        { day: "Mon", date: "Jan 12" },
        { day: "Tue", date: "Jan 13" },
        { day: "Wed", date: "Jan 14" },
    ];

    const times = [
        "9:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "1:00 PM", "2:00 PM",
        "3:00 PM", "4:00 PM", "5:00 PM"
    ];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="max-w-xl mx-auto min-h-screen bg-white md:bg-gray-50/30 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 h-20 flex items-center gap-4">
                <button onClick={() => step === 1 ? router.back() : prevStep()} className="p-2 hover:bg-gray-50 rounded-xl transition-all">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-black text-gray-900 leading-tight">Book Appointment</h1>
                    <p className="text-xs font-bold text-gray-400 truncate">{serviceName}</p>
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
                    {/* Progress Lines */}
                    <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-0" />
                    <div className={`absolute top-5 left-0 h-[2px] bg-[#064E3B] transition-all duration-500 -z-0`}
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
                </div>
            </div>

            <main className="flex-1 p-6 space-y-8 pb-32">
                {/* Booking Summary Card */}
                <div className="bg-[#f8faf9] p-6 rounded-[32px] border border-[#eef2f0] flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest mb-1">Booking Summary</p>
                        <h2 className="text-xl font-black text-gray-900">{serviceName}</h2>
                        <p className="text-sm font-bold text-gray-400">Tony's Italian Restaurant • Full event</p>
                    </div>
                    <span className="text-2xl font-black text-[#064E3B]">${servicePrice}</span>
                </div>

                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Date Picker Grid */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-900">
                                <CalendarIcon className="w-5 h-5 text-[#064E3B]" />
                                <h3 className="font-black text-sm uppercase tracking-widest">Select Date</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {dates.map((d) => (
                                    <button
                                        key={d.date}
                                        onClick={() => setSelectedDate(d.date)}
                                        className={`p-4 rounded-2xl border transition-all text-left space-y-1 ${selectedDate === d.date
                                                ? "bg-[#ebf4f0] border-[#064E3B] shadow-inner"
                                                : "bg-white border-gray-100 hover:border-gray-200"
                                            }`}
                                    >
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${selectedDate === d.date ? "text-[#064E3B]" : "text-gray-400"}`}>
                                            {d.day}
                                        </p>
                                        <p className={`text-sm font-black ${selectedDate === d.date ? "text-[#064E3B]" : "text-gray-900"}`}>
                                            {d.date}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Picker Grid */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-900">
                                <Clock className="w-5 h-5 text-[#064E3B]" />
                                <h3 className="font-black text-sm uppercase tracking-widest">Select Time</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {times.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTime(t)}
                                        className={`py-4 rounded-2xl border transition-all font-black text-xs ${selectedTime === t
                                                ? "bg-[#064E3B] border-[#064E3B] text-white shadow-lg"
                                                : "bg-white border-gray-100 text-gray-600 hover:border-gray-200"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
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
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email *</label>
                                    <Input
                                        placeholder="Email Address"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-medium px-6 focus:bg-white transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                    <Input
                                        placeholder="Phone Number"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 font-medium px-6 focus:bg-white transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Special Requirements (Optional)</label>
                                    <textarea
                                        placeholder="Any special requests or information the provider should know..."
                                        className="w-full min-h-[120px] p-6 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/10 focus:bg-white transition-all"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                            <p className="text-gray-400 font-bold max-w-xs mx-auto">Your appointment for {selectedDate} at {selectedTime} has been successfully booked.</p>
                        </div>
                        <div className="w-full pt-10">
                            <Button onClick={() => router.push("/home")} className="w-full h-14 bg-[#064E3B] rounded-2xl font-black uppercase tracking-widest">
                                Return Home
                            </Button>
                        </div>
                    </div>
                )}
            </main>

            {/* Sticky Bottom Actions */}
            {step < 3 && (
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex justify-center z-40 lg:hidden">
                    <div className="max-w-xl w-full">
                        <Button
                            onClick={nextStep}
                            disabled={step === 1 && (!selectedDate || !selectedTime)}
                            className="w-full h-16 bg-[#064E3B] hover:bg-[#043327] rounded-2xl text-xl font-black shadow-2xl shadow-green-900/20 active:scale-[0.98] transition-all"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            )}

            {/* Desktop Action (Centered) */}
            {step < 3 && (
                <div className="hidden lg:flex fixed bottom-10 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-8">
                    <Button
                        onClick={nextStep}
                        className="w-full h-20 bg-[#064E3B] hover:bg-[#043327] rounded-[28px] text-2xl font-black shadow-2xl shadow-green-900/30 active:scale-[0.98] transition-all"
                    >
                        Continue
                    </Button>
                </div>
            )}
        </div>
    );
}
