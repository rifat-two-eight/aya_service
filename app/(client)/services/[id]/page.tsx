"use client";

import { ChevronLeft, MapPin, Star, Phone, MessageSquare, Share2, Heart, CheckCircle2, ShieldCheck, Clock, Calendar, Globe, Mail, Users, Facebook, Instagram, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceDetailPage() {
    const router = useRouter();

    const service = {
        name: "Dr. Sarah Johnson - Family Medicine",
        category: "Doctors",
        location: "123 Medical Plaza, New York, NY 10001",
        rating: 4.9,
        reviews_count: 203,
        description: "Board-certified family physician with over 15 years of experience. Providing comprehensive healthcare for all ages.",
        phone: "(555) 123-4567",
        email: "info@drjohnson.com",
        website: "www.drjohnson.com",
        image: "",
        experience: "15 years in business",
        employees: "8 employees",
        verified: true,
        services: [
            { id: 1, name: "Lunch Special", price: 18, description: "Pasta, salad, and drink combo", duration: "45 minutes" },
            { id: 2, name: "Family Dinner Package", price: 85, description: "Feeds 4-6 people with appetizers and dessert", duration: "1.5 hours" },
            { id: 3, name: "Private Event Catering", price: 500, description: "Custom menu for private events (minimum 20 guests)", duration: "Full event" }
        ],
        reviews: [
            { id: 1, user: "John Smith", initial: "J", rating: 5, date: "12/1/2024", comment: "Dr. Johnson is amazing! Very thorough and caring. Highly recommend." },
            { id: 2, user: "Mary Williams", initial: "M", rating: 5, date: "11/28/2024", comment: "Best family doctor in the area. The staff is also very friendly." }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-8 px-4 md:px-6">
            {/* Header / Basic Info */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <button onClick={() => router.back()} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                    <ChevronLeft className="w-8 h-8 text-gray-900" />
                </button>
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{service.name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-[#064E3B] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                {service.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                            ))}
                            <span className="text-sm font-bold text-gray-400 ml-2">{service.rating} ({service.reviews_count} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
                {service.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-400">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🏪</span> {service.experience}
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {service.employees}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-gray-100">
                {/* Left/Middle: Services & About */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Services & Pricing</h2>
                        <div className="space-y-4">
                            {service.services.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-5">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-400 font-medium">{item.description}</p>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold pt-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {item.duration}
                                            </div>
                                        </div>
                                        <span className="text-xl font-black text-[#064E3B]">${item.price}</span>
                                    </div>
                                    <Link href={`/services/1/book?service=${encodeURIComponent(item.name)}&price=${item.price}`}>
                                        <Button className="w-full h-12 bg-[#064E3B] hover:bg-[#043327] rounded-2xl font-black uppercase tracking-widest text-xs">
                                            Book Now
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-100 bg-[#EBF4F0] text-[#064E3B] font-black uppercase tracking-widest text-xs hover:bg-[#deede6] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Chat
                    </Button>

                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Reviews ({service.reviews.length})</h2>
                            <button className="text-[#064E3B] font-black text-xs uppercase tracking-widest hover:underline">Write Review</button>
                        </div>
                        <div className="space-y-8">
                            {service.reviews.map((rev) => (
                                <div key={rev.id} className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#064E3B] rounded-full flex items-center justify-center text-white font-black">
                                                {rev.initial}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900">{rev.user}</h4>
                                                <p className="text-xs text-gray-400 font-bold">{rev.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium leading-relaxed">{rev.comment}</p>
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
                            <ContactLink icon={<MapPin className="w-5 h-5" />} text={service.location} />
                            <ContactLink icon={<Phone className="w-5 h-5" />} text={service.phone} />
                            <ContactLink icon={<Mail className="w-5 h-5" />} text={service.email} />
                            <ContactLink icon={<Globe className="w-5 h-5" />} text={service.website} />
                        </div>
                    </section>

                    <section className="space-y-4">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Follow us on social media</p>
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
            <p className="text-sm font-bold text-gray-600 pt-2 group-hover:text-[#064E3B] transition-colors">{text}</p>
        </div>
    );
}
