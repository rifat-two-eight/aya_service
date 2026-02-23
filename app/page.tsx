"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageSquare,
  Star,
  User,
  Briefcase,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Find Local Services",
    description: "Discover trusted businesses in your community - from restaurants to professional services",
    icon: <Search className="w-16 h-16 text-[#0A5C36]" />,
    image: "/logo.svg" // Placeholder or splash
  },
  {
    title: "Connect with Providers",
    description: "Chat directly with service providers and get the help you need",
    icon: <MessageSquare className="w-16 h-16 text-[#0A5C36]" />,
  },
  {
    title: "Read Reviews & Ratings",
    description: "Make informed decisions with ratings and reviews from real customers",
    icon: <Star className="w-16 h-16 text-[#0A5C36]" />,
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(-1); // -1 is Splash

  useEffect(() => {
    if (step === -1) {
      const timer = setTimeout(() => {
        setStep(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const nextStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setStep(3); // Role selection
    }
  };

  const skip = () => {
    setStep(3);
  };

  if (step === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative w-64 h-64 animate-[pulse_2s_ease-in-out_infinite] flex items-center justify-center">
          <div className="absolute inset-0 bg-green-50 rounded-full blur-3xl opacity-30" />
          <Image
            src="/logo.svg"
            alt="The Aya Shop Logo"
            width={200}
            height={200}
            className="object-contain relative z-10"
            priority
          />
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Illustration/Logo */}
          <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-12 bg-green-50 rounded-[60px] relative overflow-hidden h-full min-h-[600px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative w-48 h-48 animate-pulse">
              <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
            </div>
            <div className="text-center space-y-4 relative z-10">
              <h2 className="text-4xl font-black text-[#0A5C36]">Welcome to AYA Shop</h2>
              <p className="text-gray-500 font-medium max-w-sm">Manage your business or find local services with ease and efficiency.</p>
            </div>
          </div>

          {/* Right Side: Role Selection */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Select your role</h2>
              <p className="text-xl text-gray-500 font-medium font-outfit">How would you like to use the platform today?</p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <RoleCard
                icon={<User className="w-8 h-8 text-white" />}
                title="Client"
                description="Find the right business professional for your needs"
                onClick={() => router.push("/client/login")}
                iconBg="bg-gradient-to-br from-[#0A5C36] to-[#0D7A47]"
              />
              <RoleCard
                icon={<Briefcase className="w-8 h-8 text-white" />}
                title="Business"
                description="Highlight your work and expand your business reach"
                onClick={() => router.push("/business/login")}
                iconBg="bg-gradient-to-br from-[#0A5C36] to-[#0D7A47]"
              />
              <RoleCard
                icon={<ShieldCheck className="w-8 h-8 text-white" />}
                title="Admin"
                description="Manage platform operations and user activities"
                onClick={() => router.push("/login")}
                iconBg="bg-gradient-to-br from-gray-800 to-black"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSlide = slides[step];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row">
        {/* Left Section: Visuals */}
        <div className="hidden lg:flex flex-[1.2] bg-gray-50 items-center justify-center p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-50" />
          <div className="relative z-10 w-full max-w-lg aspect-square bg-white rounded-[80px] shadow-2xl shadow-green-900/10 flex items-center justify-center p-20 border border-white">
            <div key={step} className="animate-in fade-in zoom-in duration-700">
              {currentSlide.icon}
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0A5C36] rounded-[40px] shadow-xl flex items-center justify-center -rotate-12">
              <Image src="/logo.svg" alt="logo" width={80} height={80} className="brightness-0 invert" />
            </div>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex-1 flex flex-col justify-between p-8 md:p-16 lg:p-24 relative overflow-hidden">
          <button
            onClick={skip}
            className="absolute top-10 right-10 text-gray-400 hover:text-[#0A5C36] font-bold text-lg transition-colors z-10"
          >
            Skip
          </button>

          <div key={step} className="flex-1 flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-right-12 duration-700">
            <div className="lg:hidden w-24 h-24 mb-4">
              <Image src="/logo.svg" alt="Logo" width={96} height={96} />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
                {currentSlide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl leading-relaxed">
                {currentSlide.description}
              </p>
            </div>
          </div>

          <div className="w-full space-y-10 pt-12">
            <div className="flex gap-3">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full transition-all duration-500 ${i === step ? "w-16 bg-[#0A5C36]" : "w-3 bg-gray-100"}`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="w-full h-20 lg:w-[400px] rounded-[32px] bg-[#0A5C36] hover:bg-[#0d7344] text-white text-2xl font-black flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-2xl shadow-green-900/20 group"
            >
              {step === slides.length - 1 ? "Get Started" : "Next"}
              <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, description, onClick, iconBg }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-5 p-5 rounded-2xl border border-gray-100 hover:border-[#0A5C36] hover:bg-green-50/30 transition-all text-left group relative overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
    >
      <div className={`${iconBg} p-4 rounded-2xl shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#0A5C36] transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 font-medium truncate">{description}</p>
      </div>
      <div className="w-7 h-7 rounded-full border-2 border-gray-200 group-hover:border-[#0A5C36] flex items-center justify-center transition-all bg-white shadow-inner">
        <div className="w-3.5 h-3.5 rounded-full bg-[#0A5C36] transform scale-0 group-hover:scale-100 transition-transform" />
      </div>
    </button>
  );
}
