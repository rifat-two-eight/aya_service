"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Edit3,
    Mail,
    Phone,
    Globe,
    MapPin,
    User,
    TrendingUp,
    LogOut,
    Camera,
    Check,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BusinessProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    // Sample data (in a real app, this would come from an API/state)
    const [businessData, setBusinessData] = useState({
        name: "Tony's Italian Restaurant Group",
        legalName: "Tony's Italian LLC",
        type: "Restaurant Chain",
        established: "1995",
        description: "Family-owned Italian restaurant chain serving authentic Italian cuisine since 1995. We pride ourselves on using traditional recipes and fresh, locally-sourced ingredients.",
        email: "tony@restaurant.com",
        phone: "(555) 123-4567",
        website: "www.tonysitalian.com",
        address: {
            street: "123 Main Street",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            country: "United States"
        },
        owner: {
            name: "Tony Russo",
            email: "tony.russo@email.com",
            phone: "(555) 999-8888"
        }
    });

    const [editValues, setEditValues] = useState(businessData);

    const handleSave = () => {
        setBusinessData(editValues);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValues(businessData);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 pb-24 client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <h1 className="text-xl font-black text-gray-900 absolute left-1/2 -translate-x-1/2">
                    Business Profile
                </h1>
                <div className="w-12" />
            </header>

            <div className="max-w-5xl mx-auto w-full p-4 md:p-8 lg:p-12 space-y-6 md:space-y-10">
                {/* Business Logo Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-black text-gray-900">Business Logo</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-[32px] bg-green-100/50 flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden group">
                            <span className="text-3xl">🍝</span>
                            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 space-y-3">
                            <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                Upload your business logo (PNG, JPG)
                            </p>
                            <Button className="bg-[#0A4D2E] hover:bg-[#0d7344] rounded-xl h-11 px-6 font-bold gap-2 text-sm">
                                <Camera className="w-4 h-4" />
                                Change Logo
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Business Information Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-gray-900">Business Information</h2>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1.5 text-[#0A4D2E] font-bold text-sm hover:underline"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit
                            </button>
                        )}
                    </div>

                    <div className="grid gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Business Name</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.name}
                                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold text-gray-900"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{businessData.name}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Legal Name</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.legalName}
                                    onChange={(e) => setEditValues({ ...editValues, legalName: e.target.value })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold text-gray-900"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{businessData.legalName}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Business Type</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.type}
                                        onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold text-gray-900"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.type}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Year Established</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.established}
                                        onChange={(e) => setEditValues({ ...editValues, established: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold text-gray-900"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.established}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Business Description</label>
                            {isEditing ? (
                                <Textarea
                                    value={editValues.description}
                                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                                    className="rounded-xl border-gray-100 bg-gray-50 font-medium text-gray-800 leading-relaxed min-h-[120px]"
                                />
                            ) : (
                                <p className="text-sm font-medium text-gray-800 leading-relaxed">{businessData.description}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <h2 className="text-lg font-black text-gray-900">Contact Information</h2>
                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Primary Email</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.email}
                                        onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-10 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Primary Phone</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.phone}
                                        onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-10 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.phone}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Website</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.website}
                                        onChange={(e) => setEditValues({ ...editValues, website: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-10 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.website}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Address Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#0A4D2E]" />
                        <h2 className="text-lg font-black text-gray-900">Business Address</h2>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Street Address</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.address.street}
                                    onChange={(e) => setEditValues({ ...editValues, address: { ...editValues.address, street: e.target.value } })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{businessData.address.street}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">City</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.address.city}
                                        onChange={(e) => setEditValues({ ...editValues, address: { ...editValues.address, city: e.target.value } })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.address.city}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">State</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.address.state}
                                        onChange={(e) => setEditValues({ ...editValues, address: { ...editValues.address, state: e.target.value } })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.address.state}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Zip Code</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.address.zip}
                                        onChange={(e) => setEditValues({ ...editValues, address: { ...editValues.address, zip: e.target.value } })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.address.zip}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Country</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.address.country}
                                        onChange={(e) => setEditValues({ ...editValues, address: { ...editValues.address, country: e.target.value } })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900">{businessData.address.country}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Owner Information Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#0A4D2E]" />
                        <h2 className="text-lg font-black text-gray-900">Owner Information</h2>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Full Name</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.owner.name}
                                    onChange={(e) => setEditValues({ ...editValues, owner: { ...editValues.owner, name: e.target.value } })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{businessData.owner.name}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Email</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.owner.email}
                                    onChange={(e) => setEditValues({ ...editValues, owner: { ...editValues.owner, email: e.target.value } })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{businessData.owner.email}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Phone</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.owner.phone}
                                    onChange={(e) => setEditValues({ ...editValues, owner: { ...editValues.owner, phone: e.target.value } })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{businessData.owner.phone}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Business Performance Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#0A4D2E]" />
                        <h2 className="text-lg font-black text-gray-900">Business Performance</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-green-800/60 block mb-1">Total Listings</label>
                            <p className="text-2xl font-black text-[#0A4D2E]">3</p>
                        </div>
                        <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-green-800/60 block mb-1">Total Views</label>
                            <p className="text-2xl font-black text-[#0A4D2E]">12,847</p>
                        </div>
                        <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-green-800/60 block mb-1">Total Bookings</label>
                            <p className="text-2xl font-black text-[#0A4D2E]">456</p>
                        </div>
                        <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
                            <label className="text-[10px] uppercase tracking-widest font-black text-green-800/60 block mb-1">Total Revenue</label>
                            <p className="text-2xl font-black text-[#0A4D2E]">$45,230</p>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="space-y-4 pt-4">
                    {isEditing ? (
                        <div className="flex gap-4">
                            <Button
                                onClick={handleSave}
                                className="flex-1 bg-[#0A4D2E] hover:bg-[#0d7344] h-16 rounded-[24px] text-lg font-black shadow-xl shadow-green-900/10 gap-2"
                            >
                                <Check className="w-6 h-6" />
                                Save Changes
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="outline"
                                className="flex-1 h-16 rounded-[24px] text-lg font-black border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
                            >
                                <X className="w-6 h-6" />
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full h-16 rounded-[24px] text-lg font-black border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 gap-3"
                        >
                            <LogOut className="w-6 h-6" />
                            Log out
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
