"use client";

import { ChevronLeft, MapPin, Star, Phone, MessageSquare, Share2, Heart, CheckCircle2, ShieldCheck, Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ServiceDetailPage() {
    const router = useRouter();

    const service = {
        name: "Dr. Sarah Johnson - Family Medicine",
        category: "Doctors",
        location: "New York, NY",
        rating: 4.9,
        reviews: 203,
        description: "Board-certified family physician with over 15 years of experience. Providing comprehensive healthcare for all ages, with a focus on preventative medicine and wellness. We believe in a personalized approach to your health.",
        phone: "(555) 123-4567",
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=600&h=400",
        experience: "15+ Years",
        patients: "5K+",
        verified: true
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 pb-20">
            {/* Left Column: Image & Details */}
            <div className="flex-1 space-y-12">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[48px] overflow-hidden shadow-2xl">
                    <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
                        <button onClick={() => router.back()} className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all border border-white/20">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-[#0A5C36] text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                {service.category}
                            </span>
                            {service.verified && (
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 text-white rounded-full border border-white/20">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-xs font-bold font-outfit uppercase tracking-wider">Verified Pro</span>
                                </div>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">{service.name}</h1>
                        <div className="flex items-center gap-2 text-white/90 text-lg font-medium">
                            <MapPin className="w-5 h-5 text-red-400" />
                            {service.location}
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-[48px] p-10 md:p-14 border border-gray-100 shadow-sm space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">About Service</h3>
                        <p className="text-xl text-gray-400 leading-relaxed font-medium">
                            {service.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FeatureItem icon={<Clock className="w-6 h-6" />} label="24/7 Availability" />
                        <FeatureItem icon={<Calendar className="w-6 h-6" />} label="Flexible Booking" />
                        <FeatureItem icon={<CheckCircle2 className="w-6 h-6" />} label="Certified Professional" />
                        <FeatureItem icon={<MessageSquare className="w-6 h-6" />} label="Instant Chat Support" />
                    </div>
                </div>
            </div>

            {/* Right Column: Actions & Stats */}
            <div className="lg:w-[450px] space-y-8">
                {/* Stats Card */}
                <div className="bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm space-y-10">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-green-50 rounded-[24px] flex items-center justify-center text-3xl">⭐</div>
                            <div>
                                <p className="text-3xl font-black text-gray-900">{service.rating}</p>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{service.reviews} Genuine Reviews</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-3xl">🏆</div>
                            <div>
                                <p className="text-3xl font-black text-gray-900">{service.experience}</p>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">In-Market Experience</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-purple-50 rounded-[24px] flex items-center justify-center text-3xl">👥</div>
                            <div>
                                <p className="text-3xl font-black text-gray-900">{service.patients}</p>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Satisfied Customers</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 w-full" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-[2px] ml-1">Contact Details</label>
                            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-[#0A5C36] transition-all">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#0A5C36] transition-all">
                                    <Phone className="w-6 h-6 text-[#0A5C36] group-hover:text-white transition-all" />
                                </div>
                                <p className="text-xl font-black text-gray-900">{service.phone}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button className="w-full h-20 bg-[#0A5C36] hover:bg-[#0d7344] rounded-3xl text-2xl font-black shadow-2xl shadow-green-900/20 active:scale-[0.98] transition-all">
                                Book Appointment
                            </Button>
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 h-16 rounded-2xl border-gray-100 font-bold hover:bg-white hover:border-[#0A5C36] flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-gray-400" />
                                    <span>Send Message</span>
                                </Button>
                                <Button variant="outline" className="h-16 w-16 rounded-2xl border-gray-100 flex items-center justify-center p-0 hover:bg-gray-50">
                                    <Share2 className="w-6 h-6 text-gray-400" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promotional Help Card */}
                <div className="bg-[#0A5C36] rounded-[48px] p-10 text-white space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <h4 className="text-2xl font-black leading-tight relative z-10">Need a custom quote?</h4>
                    <p className="text-white/70 font-medium relative z-10">Describe your project and get instant responses from verified professionals.</p>
                    <Button className="w-full bg-white text-[#0A5C36] hover:bg-green-50 rounded-2xl h-14 font-black text-lg relative z-10">
                        Post your project
                    </Button>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-[#0A5C36]/50 transition-all">
            <div className="text-[#0A5C36]">{icon}</div>
            <span className="text-sm font-bold text-gray-700">{label}</span>
        </div>
    );
}
