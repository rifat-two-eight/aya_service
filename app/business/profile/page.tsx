"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    X,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";
import { toast } from "sonner";

export default function BusinessProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const [userData, setUserData] = useState<any>(null);
    const [editValues, setEditValues] = useState({
        fullName: "",
        businessName: "",
        yearsInBusiness: "",
        description: "",
        website: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "";

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await userService.getMe();
            if (response.success && response.data) {
                setUserData(response.data);
                const business = response.data.business || {};
                setEditValues({
                    fullName: response.data.fullName || "",
                    businessName: business.businessName || "",
                    yearsInBusiness: business.yearsInBusiness || "",
                    description: business.description || "",
                    website: business.website || "",
                    address: business.address || "",
                    city: business.city || "",
                    state: business.state || "",
                    zipCode: business.zipCode || ""
                });
            }
        } catch (error) {
            toast.error("Failed to load profile data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // 1. Update User Profile (fullName, image)
            const userFormData = new FormData();
            userFormData.append("fullName", editValues.fullName);
            if (selectedImage) {
                userFormData.append("image", selectedImage);
            }

            // 2. Update Business Profile (data, logo)
            const businessFormData = new FormData();
            const businessData = {
                businessName: editValues.businessName,
                description: editValues.description,
                yearsInBusiness: editValues.yearsInBusiness,
                address: editValues.address,
                city: editValues.city,
                state: editValues.state,
                zipCode: editValues.zipCode,
                website: editValues.website
            };
            businessFormData.append("data", JSON.stringify(businessData));
            if (selectedLogo) {
                businessFormData.append("logo", selectedLogo);
            }

            const [userResponse, businessResponse] = await Promise.all([
                userService.updateProfile(userFormData),
                userService.updateBusinessProfile(businessFormData)
            ]);

            if (userResponse.success && businessResponse.success) {
                toast.success("Profile and business information updated successfully");
                // Refresh profile data to get latest from server
                await fetchProfile();
                setIsEditing(false);
                setSelectedImage(null);
                setImagePreview(null);
                setSelectedLogo(null);
                setLogoPreview(null);
            } else {
                toast.error("Some updates failed. Please check your information.");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (userData) {
            const business = userData.business || {};
            setEditValues({
                fullName: userData.fullName || "",
                businessName: business.businessName || "",
                yearsInBusiness: business.yearsInBusiness || "",
                description: business.description || "",
                website: business.website || "",
                address: business.address || "",
                city: business.city || "",
                state: business.state || "",
                zipCode: business.zipCode || ""
            });
        }
        setSelectedImage(null);
        setImagePreview(null);
        setSelectedLogo(null);
        setLogoPreview(null);
        setIsEditing(false);
    };

    const handleLogout = () => {
        authService.logout();
        router.push("/auth");
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50/50 client-ui items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#0A4D2E]" />
                <p className="mt-4 font-black uppercase tracking-widest text-sm text-[#0A4D2E]">Loading Profile...</p>
            </div>
        );
    }

    const business = userData?.business || {};

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
                {/* Images Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Image Section */}
                    <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-black text-gray-900">Profile Image</h2>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-[32px] bg-green-100/50 flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden group">
                                {imagePreview ? (
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                ) : userData?.image ? (
                                    <Image src={`${baseUrl}${userData.image}`} alt="Profile" fill className="object-cover" unoptimized />
                                ) : (
                                    <User className="w-10 h-10 text-[#0A4D2E]" />
                                )}
                                
                                {isEditing && (
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    >
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>
                                )}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="flex-1 space-y-3">
                                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                    User profile image
                                </p>
                                {isEditing && (
                                    <Button 
                                        onClick={() => fileInputRef.current?.click()}
                                        variant="outline"
                                        className="border-gray-100 rounded-xl h-10 px-4 font-bold gap-2 text-xs"
                                    >
                                        <Camera className="w-4 h-4" />
                                        Update
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Business Logo Section */}
                    <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-black text-gray-900">Business Logo</h2>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-[32px] bg-blue-100/50 flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden group">
                                {logoPreview ? (
                                    <Image src={logoPreview} alt="Logo Preview" fill className="object-cover" />
                                ) : business?.logo ? (
                                    <Image src={`${baseUrl}${business.logo}`} alt="Logo" fill className="object-cover" unoptimized />
                                ) : (
                                    <TrendingUp className="w-10 h-10 text-blue-600" />
                                )}
                                
                                {isEditing && (
                                    <button 
                                        onClick={() => logoInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    >
                                        <Camera className="w-6 h-6 text-white" />
                                    </button>
                                )}
                                <input 
                                    type="file" 
                                    ref={logoInputRef} 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                />
                            </div>
                            <div className="flex-1 space-y-3">
                                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                    Official business logo
                                </p>
                                {isEditing && (
                                    <Button 
                                        onClick={() => logoInputRef.current?.click()}
                                        variant="outline"
                                        className="border-gray-100 rounded-xl h-10 px-4 font-bold gap-2 text-xs"
                                    >
                                        <Camera className="w-4 h-4" />
                                        Update
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Owner Information Section */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-[#0A4D2E]" />
                            <h2 className="text-lg font-black text-gray-900">Owner Information</h2>
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1.5 text-[#0A4D2E] font-bold text-sm hover:underline"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit All
                            </button>
                        )}
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Full Name</label>
                            {isEditing ? (
                                <Input
                                    value={editValues.fullName}
                                    onChange={(e) => setEditValues({ ...editValues, fullName: e.target.value })}
                                    className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                />
                            ) : (
                                <p className="font-bold text-gray-900">{userData?.fullName || "Not provided"}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Email Address (Read-only)</label>
                                <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{userData?.email}</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Phone (Read-only)</label>
                                <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{userData?.phone || "Not provided"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Information Section (Now Editable) */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-gray-900">Business Details</h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Business Name</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.businessName}
                                        onChange={(e) => setEditValues({ ...editValues, businessName: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{business.businessName || "Not provided"}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Year Established</label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.yearsInBusiness}
                                        onChange={(e) => setEditValues({ ...editValues, yearsInBusiness: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{business.yearsInBusiness || "Not provided"}</p>
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
                                <p className="text-sm font-medium text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px]">
                                    {business.description || "No description provided."}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Digital Presence & Location (Now Editable) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-black text-gray-900">Digital Presence</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 flex items-center gap-2">
                                    <Globe className="w-3 h-3" /> Website
                                </label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.website}
                                        onChange={(e) => setEditValues({ ...editValues, website: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{business.website || "Not provided"}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-black text-gray-900">Location Details</h2>
                        <div className="grid gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> Address
                                </label>
                                {isEditing ? (
                                    <Input
                                        value={editValues.address}
                                        onChange={(e) => setEditValues({ ...editValues, address: e.target.value })}
                                        className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                    />
                                ) : (
                                    <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{business.address || "Not provided"}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">City</label>
                                    {isEditing ? (
                                        <Input
                                            value={editValues.city}
                                            onChange={(e) => setEditValues({ ...editValues, city: e.target.value })}
                                            className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                        />
                                    ) : (
                                        <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{business.city || "N/A"}</p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Zip Code</label>
                                    {isEditing ? (
                                        <Input
                                            value={editValues.zipCode}
                                            onChange={(e) => setEditValues({ ...editValues, zipCode: e.target.value })}
                                            className="rounded-xl border-gray-100 bg-gray-50 h-11 font-bold"
                                        />
                                    ) : (
                                        <p className="font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">{business.zipCode || "N/A"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="space-y-4 pt-4">
                    {isEditing ? (
                        <div className="flex gap-4">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex-1 bg-[#0A4D2E] hover:bg-[#0d7344] h-16 rounded-[24px] text-lg font-black shadow-xl shadow-green-900/10 gap-2 disabled:opacity-70"
                            >
                                {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Check className="w-6 h-6" />}
                                {isSaving ? "Saving All..." : "Save All Changes"}
                            </Button>
                            <Button
                                onClick={handleCancel}
                                disabled={isSaving}
                                variant="outline"
                                className="flex-1 h-16 rounded-[24px] text-lg font-black border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
                            >
                                <X className="w-6 h-6" />
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={handleLogout}
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
