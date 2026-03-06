"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    ChevronLeft,
    Edit3,
    Eye,
    CalendarCheck2,
    DollarSign,
    Plus,
    MapPin,
    Phone,
    Mail,
    Globe,
    Check,
    X,
    Camera,
    Upload,
    Info,
    CheckCircle2,
    Clock,
    LayoutGrid,
    Calendar,
    Image as ImageIcon,
    LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialData = {
    id: "1",
    name: "Tony's Italian Restaurant",
    category: "Restaurants",
    status: "Active",
    views: 456,
    bookings: 34,
    revenue: 4230,
    description: "Authentic Italian cuisine serving the community since 1995. Our chefs use traditional recipes passed down through generations, creating memorable dining experiences.",
    address: "123 Main St, Anytown, CA 12345",
    phone: "(555) 123-4567",
    email: "tony@restaurant.com",
    website: "www.tonysitalian.com",
    price: 18,
    duration: "1 hour",
    included: ["Consultation session", "Bread basket", "Service charge included"],
    photos: ["", "", ""], // Placeholders
    packages: [
        { name: "Lunch Special", price: 25, description: "Includes appetizer, main course, and drink", duration: "1 hour", bookings: 45 },
        { name: "Family Dinner", price: 85, description: "Perfect for 4 people, includes full 3-course meal", duration: "2 hours", bookings: 28 },
        { name: "Private Event Catering", price: 500, description: "Full catering service for private events up to 50 guests", duration: "4 hours", bookings: 12 },
    ],
    clientRequirements: "None",
    cancellationPolicy: "24 hours notice",
    maxBookings: 5
};

export default function ListingDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
    const [data, setData] = useState(initialData);

    // Edit mode states
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        setIsEditing(searchParams.get('edit') === 'true');
    }, [searchParams]);

    const handleSave = () => {
        setIsEditing(false);
        router.replace(`/business/listings/${data.id}`);
    };

    const addIncludedItem = () => {
        if (newItem.trim()) {
            setData({ ...data, included: [...data.included, newItem.trim()] });
            setNewItem("");
        }
    };

    const removeIncludedItem = (index: number) => {
        setData({ ...data, included: data.included.filter((_, i) => i !== index) });
    };

    if (isEditing) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50/50 client-ui">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900 flex items-center gap-2"
                    >
                        <ChevronLeft className="w-6 h-6" />
                        <span className="text-sm font-black uppercase tracking-widest hidden md:inline">Cancel</span>
                    </button>
                    <h1 className="text-xl font-black text-gray-900 absolute left-1/2 -translate-x-1/2">
                        Edit Listing
                    </h1>
                    <div className="w-12" />
                </header>

                <div className="max-w-3xl mx-auto w-full p-5 md:p-10 space-y-10">
                    {/* Basic Information */}
                    <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-green-50">
                                <Info className="w-5 h-5 text-[#0A4D2E]" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">Basic Information</h2>
                        </div>

                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Service Name *</label>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Category *</label>
                                <Input
                                    value={data.category}
                                    onChange={(e) => setData({ ...data, category: e.target.value })}
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Main Description *</label>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    className="min-h-[140px] rounded-[32px] border-gray-100 bg-gray-50 font-medium py-6 px-6"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Price (USD) *</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            value={data.price}
                                            onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
                                            className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Duration *</label>
                                    <div className="relative">
                                        <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            value={data.duration}
                                            onChange={(e) => setData({ ...data, duration: e.target.value })}
                                            className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What's Included */}
                    <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-blue-50">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">What's Included (Optional)</h2>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Common items across all packages</p>

                            <div className="flex gap-3">
                                <Input
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    placeholder="e.g., Consultation session"
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold flex-1"
                                    onKeyDown={(e) => e.key === 'Enter' && addIncludedItem()}
                                />
                                <Button
                                    onClick={addIncludedItem}
                                    type="button"
                                    className="h-14 px-6 rounded-2xl bg-[#0A4D2E] text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-900/10"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Item
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {data.included.map((item, idx) => (
                                    <div key={idx} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border border-gray-100">
                                        {item}
                                        <button onClick={() => removeIncludedItem(idx)} className="hover:text-red-500 transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Service Photos */}
                    <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-orange-50">
                                <ImageIcon className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">Service Photos (Max 5)</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {data.photos.map((_, idx) => (
                                <div key={idx} className="aspect-square bg-gray-100 rounded-[32px] overflow-hidden relative shadow-inner group cursor-pointer border border-transparent hover:border-[#0A4D2E]/20 transition-all">
                                    <div className="absolute inset-0 bg-gray-200" />
                                    <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            ))}
                            <div className="aspect-square border-4 border-dashed border-gray-100 rounded-[32px] flex items-center justify-center hover:border-[#0A4D2E]/20 transition-all cursor-pointer group">
                                <Plus className="w-8 h-8 text-gray-300 group-hover:text-[#0A4D2E] transition-colors" />
                            </div>
                        </div>
                    </section>

                    {/* Additional Details */}
                    <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-purple-50">
                                <LayoutGrid className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">Additional Details</h2>
                        </div>

                        <div className="grid gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Client Requirements</label>
                                <Textarea
                                    value={data.clientRequirements}
                                    onChange={(e) => setData({ ...data, clientRequirements: e.target.value })}
                                    className="min-h-[120px] rounded-[32px] border-gray-100 bg-gray-50 font-medium py-6 px-6"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Cancellation Policy</label>
                                <Input
                                    value={data.cancellationPolicy}
                                    onChange={(e) => setData({ ...data, cancellationPolicy: e.target.value })}
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Max Bookings Per Day</label>
                                <Input
                                    type="number"
                                    value={data.maxBookings}
                                    onChange={(e) => setData({ ...data, maxBookings: Number(e.target.value) })}
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            className="h-16 rounded-[28px] text-lg font-black border-red-100 text-red-600 hover:bg-red-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="h-16 rounded-[28px] text-lg font-black bg-[#064E3B] hover:bg-[#065F46] shadow-2xl shadow-green-900/20"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // View Mode (Original Detail Page)
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => router.push("/business/listings")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900 flex items-center gap-2"
                >
                    <ChevronLeft className="w-6 h-6" />
                    <span className="text-sm font-black uppercase tracking-widest hidden md:inline">Back</span>
                </button>
                <h1 className="text-xl font-black text-gray-900 absolute left-1/2 -translate-x-1/2 truncate max-w-[200px] md:max-w-none">
                    {data.name}
                </h1>
                <div className="w-12" />
            </header>

            <div className="max-w-3xl mx-auto w-full p-5 md:p-10 space-y-8">
                {/* Status and Edit Action */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                    <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[32px] border border-gray-100 shadow-sm flex-1">
                        <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Listing Status</span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-100">{data.status}</span>
                            <div className="w-12 h-7 bg-[#0A4D2E] rounded-full p-1 relative cursor-pointer shadow-inner">
                                <div className="w-5 h-5 bg-white rounded-full absolute right-1 shadow-md" />
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="h-14 px-8 rounded-[24px] font-black bg-[#0A4D2E] hover:bg-[#0d7344] shadow-lg shadow-green-900/10 gap-2"
                    >
                        <Edit3 className="w-5 h-5" />
                        Edit Listing
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <StatCard icon={Eye} label="Total Views" value={data.views.toString()} />
                    <StatCard icon={CalendarCheck2} label="Bookings" value={data.bookings.toString()} />
                    <StatCard icon={DollarSign} label="Revenue" value={`$${data.revenue}`} />
                </div>

                {/* Photos */}
                <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-gray-900">Photos ({data.photos.length})</h2>
                        <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-gray-100 gap-2">
                            <Plus className="w-4 h-4" />
                            Add Photos
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {data.photos.map((_, idx) => (
                            <div key={idx} className="aspect-square bg-gray-100 rounded-[32px] overflow-hidden relative shadow-inner group">
                                <div className="absolute inset-0 bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Description */}
                <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-6">
                    <h2 className="text-lg font-black text-gray-900">Description</h2>
                    <p className="text-gray-600 font-medium leading-relaxed">{data.description}</p>
                </section>

                {/* Contact Information */}
                <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-6">
                    <h2 className="text-lg font-black text-gray-900">Contact Information</h2>
                    <div className="grid gap-6">
                        <ContactField icon={MapPin} label="Address" value={data.address} />
                        <ContactField icon={Phone} label="Phone" value={data.phone} />
                        <ContactField icon={Mail} label="Email" value={data.email} />
                        <ContactField icon={Globe} label="Website" value={data.website} />
                    </div>
                </section>

                {/* Service Packages */}
                <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-gray-900">Service Packages</h2>
                    </div>
                    <div className="space-y-4">
                        {data.packages.map((pkg, idx) => (
                            <div key={idx} className="p-6 rounded-[32px] bg-gray-50/50 border border-transparent hover:bg-white hover:border-gray-100 transition-all space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1 flex-1 pr-4">
                                        <h3 className="font-black text-gray-900 text-base">{pkg.name}</h3>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{pkg.description}</p>
                                    </div>
                                    <div className="text-lg font-black text-[#0A4D2E]">
                                        ${pkg.price}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-t border-gray-100/50">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <CalendarCheck2 className="w-4 h-4" />
                                        {pkg.duration}
                                    </div>
                                    <div className="text-[10px] font-black text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 uppercase tracking-widest">
                                        {pkg.bookings} bookings
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
    return (
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm text-center space-y-2 flex flex-col items-center justify-center">
            <div className="p-2.5 bg-gray-50 rounded-2xl">
                <Icon className="w-5 h-5 text-[#0A4D2E]" />
            </div>
            <div className="space-y-0.5">
                <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">{label}</p>
            </div>
        </div>
    );
}

function ContactField({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
    return (
        <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1 space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">{label}</label>
                <p className="font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}
