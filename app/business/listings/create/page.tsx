"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Plus,
    X,
    Upload,
    Info,
    CheckCircle2,
    Clock,
    DollarSign,
    LayoutGrid,
    Calendar,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateListingPage() {
    const router = useRouter();
    const [includedItems, setIncludedItems] = useState(["Consultation session"]);
    const [newItem, setNewItem] = useState("");

    const addIncludedItem = () => {
        if (newItem.trim()) {
            setIncludedItems([...includedItems, newItem.trim()]);
            setNewItem("");
        }
    };

    const removeIncludedItem = (index: number) => {
        setIncludedItems(includedItems.filter((_, i) => i !== index));
    };

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
                <h1 className="text-xl font-black text-gray-900 absolute left-1/2 -translate-x-1/2">
                    Create New Service
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
                            <Input placeholder="e.g., Tony's Italian Restaurant" className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Category *</label>
                            <Input placeholder="Select Category" className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Main Description *</label>
                            <Textarea placeholder="Brief description of your business..." className="min-h-[140px] rounded-[32px] border-gray-100 bg-gray-50 font-medium py-6 px-6" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Price (USD) *</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input placeholder="18" className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 font-bold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Duration *</label>
                                <div className="relative">
                                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input placeholder="1 hour" className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50 font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-blue-50">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-lg font-black text-gray-900">What's Included (Optional)</h2>
                        </div>
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
                            {includedItems.map((item, idx) => (
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

                    <div className="border-4 border-dashed border-gray-100 rounded-[40px] p-12 text-center space-y-6 hover:border-[#0A4D2E]/20 transition-all cursor-pointer group">
                        <div className="w-20 h-20 bg-gray-50 rounded-[28px] mx-auto flex items-center justify-center group-hover:bg-[#0A4D2E]/5 transition-colors">
                            <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#0A4D2E] transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-400 font-bold text-sm">Upload photos of your service</p>
                            <Button className="bg-[#064E3B] hover:bg-[#065F46] rounded-2xl h-12 px-8 font-black shadow-lg">Choose Files</Button>
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
                            <Textarea placeholder="What should clients prepare or bring?" className="min-h-[120px] rounded-[32px] border-gray-100 bg-gray-50 font-medium py-6 px-6" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Cancellation Policy</label>
                            <Input className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Max Bookings Per Day</label>
                            <Input type="number" defaultValue="5" className="h-14 rounded-2xl border-gray-100 bg-gray-50 font-bold" />
                        </div>
                    </div>
                </section>

                {/* Availability */}
                <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-[#0A4D2E]" />
                            </div>
                            <div>
                                <h2 className="text-base font-black text-gray-900">Available Now</h2>
                                <p className="text-[10px] font-bold text-gray-400 mt-0.5">Clients can book this service immediately</p>
                            </div>
                        </div>
                        <div className="w-14 h-8 bg-[#0A4D2E] rounded-full p-1 relative cursor-pointer shadow-inner">
                            <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-md" />
                        </div>
                    </div>
                </section>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-6 pt-4">
                    <Button
                        onClick={() => router.push("/business/listings")}
                        variant="outline"
                        className="h-16 rounded-[28px] text-lg font-black border-gray-100 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => router.push("/business/listings")}
                        className="h-16 rounded-[28px] text-lg font-black bg-[#064E3B] hover:bg-[#065F46] shadow-2xl shadow-green-900/20"
                    >
                        Create Service
                    </Button>
                </div>
            </div>
        </div>
    );
}
