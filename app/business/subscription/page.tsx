"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const plans = [
    {
        id: "monthly",
        name: "1 Month Plan",
        price: "$9",
        duration: "1 month",
        productId: "PROD-M1",
        features: [
            "Business listing on platform",
            "Basic profile customization",
            "Customer reviews & ratings",
            "Contact information display",
            "Email support"
        ]
    },
    {
        id: "yearly",
        name: "12 Month Plan",
        price: "$86",
        duration: "12 months",
        productId: "PROD-Y12",
        features: [
            "Everything in 1 Month Plan",
            "Featured listing placement",
            "Photo gallery (up to 20 photos)",
            "Social media integration",
            "Priority customer support",
            "Monthly analytics report"
        ]
    }
];

export default function SubscriptionPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);

    const handlePlanSelect = (plan: typeof plans[0]) => {
        setSelectedPlan(plan);
        setStep(2);
    };

    if (step === 1) {
        return (
            <div className="flex flex-col min-h-screen bg-[#0A4D2E] text-white client-ui">
                {/* Header */}
                <header className="px-6 py-6 md:py-10 flex items-center gap-4">
                    <button onClick={() => router.push("/business")} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black md:text-4xl">Choose Your Plan</h1>
                        <p className="text-white/70 text-sm md:text-base">List your business and reach thousands of customers</p>
                    </div>
                </header>

                {/* Plans Body */}
                <div className="flex-1 bg-white px-6 py-10 space-y-8 pb-24">
                    <div className="max-w-xl mx-auto space-y-8">
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-xl shadow-black/5 hover:border-[#0A4D2E] transition-all group relative overflow-hidden">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                                            <div className="text-4xl font-black text-[#0A4D2E]">{plan.price}</div>
                                        </div>

                                    </div>


                                    <ul className="space-y-4 pt-4">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-[#0A4D2E]" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={() => handlePlanSelect(plan)}
                                        className="w-full h-14 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-2xl text-lg font-bold shadow-lg shadow-green-900/10 transition-all mt-4"
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Confirmation
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 client-ui">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-20 flex items-center gap-4">
                <button
                    onClick={() => setStep(1)}
                    className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-900"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <h1 className="text-xl font-black text-gray-900">
                    Payment Details
                </h1>
            </header>

            <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8">
                {/* Selection Summary */}
                <div className="bg-[#E6F4EF] rounded-[32px] p-8 border border-[#BDE3D5] relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-1">
                            <h2 className="text-xl font-black text-gray-900">{selectedPlan.name}</h2>
                            <div className="text-4xl font-black text-[#0A4D2E]">{selectedPlan.price}</div>
                            <p className="text-xs font-bold text-gray-400 mt-2">{selectedPlan.duration}</p>
                        </div>

                    </div>
                </div>

                {/* Plan Details Info */}
                <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-8">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Product ID</span>
                            <span className="text-lg font-black text-gray-900">{selectedPlan.productId}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Duration</span>
                            <span className="text-lg font-black text-gray-900">{selectedPlan.duration}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Payment Mode</span>
                            <span className="text-lg font-black text-[#0A4D2E]">One-time Payment</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-gray-900">What&apos;s included:</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedPlan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-[#0A4D2E]" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-center gap-2 py-4 bg-gray-50/50 rounded-2xl">
                        <ShieldCheck className="w-5 h-5 text-gray-400" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Secured by Stripe</span>
                    </div>

                    <Button
                        onClick={() => window.location.href = "https://stripe.com"}
                        className="w-full h-16 bg-[#0A4D2E] hover:bg-[#0d7344] rounded-[24px] text-lg font-black shadow-xl shadow-green-900/10 transition-all font-bold"
                    >
                        Confirm and Pay {selectedPlan.price}
                    </Button>
                </div>
            </div>
        </div>
    );
}
