"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    User,
    Calendar,
    Clock,
    Users,
    DollarSign,
    Phone,
    Mail,
    Check,
    X,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const initialRequests = [
    {
        id: "REQ001",
        customerName: "Sarah Johnson",
        status: "Pending",
        submittedDate: "2025-01-04",
        serviceName: "Tony's Italian Restaurant",
        packageName: "Family Dinner Package",
        date: "2025-01-10",
        time: "19:00",
        guests: "4 people",
        budget: "$85",
        phone: "(555) 234-5678",
        email: "sarah.j@email.com",
        specialRequests: "Window seating preferred, celebrating anniversary"
    },
    {
        id: "REQ002",
        customerName: "Mohammed Al-Rashid",
        status: "Pending",
        submittedDate: "2025-01-03",
        serviceName: "Quick Lunch Catering",
        packageName: "Corporate Lunch",
        date: "2025-01-10",
        time: "19:00",
        guests: "4 people",
        budget: "$85",
        phone: "(555) 876-5432",
        email: "mohammed.r@email.com",
        specialRequests: "Halal food required, vegetarian options needed"
    }
];

export default function BookingRequestsPage() {
    const router = useRouter();
    const [requests, setRequests] = useState(initialRequests);
    const [modalState, setModalState] = useState<{ type: 'accepted' | 'rejected' | null }>({ type: null });

    const handleAccept = (id: string) => {
        setModalState({ type: 'accepted' });
        // In a real app, update state/API
    };

    const handleReject = (id: string) => {
        setModalState({ type: 'rejected' });
        // In a real app, update state/API
    };

    const closeModal = () => {
        setModalState({ type: null });
    };

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
                        <h1 className="text-xl font-black text-gray-900">Service Requests</h1>
                        <p className="text-xs font-bold text-gray-400">{requests.length} pending requests</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-[#0A4D2E] rounded-full flex items-center justify-center text-white text-xs font-black">
                    8
                </div>
            </header>

            <div className="max-w-3xl mx-auto w-full p-4 space-y-6 pb-24">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row border-l-4 border-l-[#0A4D2E]">
                        <div className="p-6 flex-1 space-y-6">
                            {/* User Info Header */}
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-black text-gray-900">{req.customerName}</h2>
                                        <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">
                                            <Clock className="w-3 h-3" />
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400">Request ID: {req.id}</p>
                                    <p className="text-[10px] font-bold text-gray-400">Submitted: {req.submittedDate}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <User className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>

                            {/* Service Details Box */}
                            <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50 space-y-1">
                                <p className="text-xs font-bold text-green-800/60 uppercase tracking-widest leading-none">Service Requested:</p>
                                <p className="text-lg font-black text-[#0A4D2E] leading-tight">{req.serviceName}</p>
                                <p className="text-sm font-bold text-gray-500">{req.packageName}</p>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-900">{req.date}</p>
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-900">{req.time}</p>
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Users className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Guests</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-900">{req.guests}</p>
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-3 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <DollarSign className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Budget</span>
                                    </div>
                                    <p className="text-sm font-black text-[#0A4D2E]">{req.budget}</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-gray-500">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm font-bold">{req.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-500">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-bold">{req.email}</span>
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div className="bg-blue-50/30 rounded-2xl p-4 border border-blue-100/50 border-l-4 border-l-blue-400 space-y-2">
                                <p className="text-[10px] font-black text-blue-800/60 uppercase tracking-widest">Special Requests:</p>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                                    &quot;{req.specialRequests}&quot;
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-2">
                                <Button
                                    onClick={() => handleAccept(req.id)}
                                    className="flex-1 h-14 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl font-black gap-2 transition-all shadow-lg shadow-green-900/10"
                                >
                                    <Check className="w-5 h-5" />
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => handleReject(req.id)}
                                    variant="outline"
                                    className="flex-1 h-14 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-2xl font-black gap-2 transition-all"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {modalState.type && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] p-10 w-full max-w-sm text-center relative space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-6 p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${modalState.type === 'accepted' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                            {modalState.type === 'accepted' ? (
                                <CheckCircle2 className="w-12 h-12 text-[#0A4D2E]" />
                            ) : (
                                <XCircle className="w-12 h-12 text-red-500" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900">
                                {modalState.type === 'accepted' ? 'Request Accepted' : 'Request Rejected'}
                            </h2>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                {modalState.type === 'accepted'
                                    ? 'The customer has been notified and the service has been scheduled.'
                                    : 'A notification has been sent to the customer regarding the update.'}
                            </p>
                        </div>
                        <Button
                            onClick={closeModal}
                            className={`w-full h-14 rounded-2xl font-black text-lg transition-all ${modalState.type === 'accepted'
                                ? 'bg-[#0A4D2E] hover:bg-[#0d7344]'
                                : 'bg-red-600 hover:bg-red-700'
                                }`}
                        >
                            {modalState.type === 'accepted' ? 'Great!' : 'Discard'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
