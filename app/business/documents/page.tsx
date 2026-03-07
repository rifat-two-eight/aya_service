"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    FileText,
    Upload,
    Plus,
    CheckCircle2,
    Circle,
    X,
    PlusCircle,
    CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
    const router = useRouter();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const requiredDocs = [
        {
            name: "Articles of Organization",
            description: "Official document used to legally form and register the company",
            status: "verified"
        },
        {
            name: "Business License",
            description: "Required permit to operate your business legally",
            status: "pending"
        },
        {
            name: "Certificate of Good Standing",
            description: "Proof that your business is in compliance with state requirements",
            status: "pending"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30 client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center gap-4 lg:hidden">
                <button
                    onClick={() => router.push("/business")}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-xl font-black text-gray-900 leading-tight">Business Hub</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage your business</p>
                </div>
            </header>

            <div className="max-w-3xl mx-auto w-full p-6 space-y-10 pb-24">
                {/* Primary Documents Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-900">Primary Documents</h2>
                        <Button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl h-12 px-6 font-black gap-2 transition-all shadow-lg shadow-green-900/10"
                        >
                            <Upload className="w-5 h-5" />
                            Upload
                        </Button>
                    </div>

                    <div className="bg-white rounded-[32px] border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="font-black text-gray-900">Articles of Organization</h3>
                                <p className="text-xs font-bold text-gray-400">PDF • Uploaded 2024-06-10</p>
                            </div>
                        </div>
                        <div className="bg-green-50 text-[#0A4D2E] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                            Verified
                        </div>
                    </div>
                </section>

                {/* Secondary Documents Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-gray-900">Secondary Documents</h2>
                        <Button
                            onClick={() => setIsUploadModalOpen(true)}
                            variant="outline"
                            className="border-gray-100 rounded-xl h-10 px-4 font-black text-xs gap-2 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Add
                        </Button>
                    </div>

                    <div className="bg-white rounded-[32px] border border-dashed border-gray-200 p-10 text-center space-y-2">
                        <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">
                            Add additional documents (e.g., Articles of Partnership, Certificate of Existence/Good Standing)
                        </p>
                    </div>
                </section>

                {/* Required Documents Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-black text-gray-900">Required Documents</h2>
                    <div className="space-y-4">
                        {requiredDocs.map((doc) => (
                            <div key={doc.name} className={`rounded-[32px] p-6 border transition-all ${doc.status === 'verified'
                                ? 'bg-green-50/50 border-green-100/50'
                                : 'bg-gray-50/50 border-gray-100'
                                }`}>
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 ${doc.status === 'verified' ? 'text-[#0A4D2E]' : 'text-gray-300'}`}>
                                        {doc.status === 'verified' ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-black text-gray-900">{doc.name}</h3>
                                        <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                            {doc.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] p-8 w-full max-w-md relative animate-in zoom-in-95 duration-300 shadow-2xl">
                        <button
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute top-2 right-6 p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-400"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-gray-900 leading-tight">Upload Primary Document</h2>
                                <p className="text-sm font-medium text-gray-400 leading-relaxed px-4">
                                    Upload your primary business document (e.g., Articles of Organization, Business License)
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Document Type</label>
                                <div className="relative">
                                    <select className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 font-bold text-gray-900 appearance-none outline-none focus:ring-2 focus:ring-[#0A4D2E]/10">
                                        <option>Articles of Organization</option>
                                        <option>Business License</option>
                                        <option>Certificate of Good Standing</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <ChevronLeft className="w-5 h-5 -rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Upload File</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-[32px] p-10 flex flex-col items-center gap-4 hover:border-[#0A4D2E]/30 transition-all cursor-pointer bg-gray-50/30 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="text-sm font-bold text-gray-900">
                                            <span className="text-[#0A4D2E]">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PDF, PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    variant="outline"
                                    className="flex-1 h-14 border-gray-100 rounded-2xl font-black transition-all"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="flex-1 h-14 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl font-black shadow-lg shadow-green-900/10 transition-all"
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
