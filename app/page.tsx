"use client";

import { useState, useEffect, type ReactNode } from "react";
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
      router.push("/auth");
    }
  };

  const skip = () => {
    router.push("/auth");
  };

  if (step === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="The Aya Shop Logo"
            width={160}
            height={160}
            className="object-contain"
            priority
            unoptimized={true}
          />
        </div>
      </div>
    );
  }

  const currentSlide = slides[step];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto min-h-screen flex flex-col lg:flex-row">
        <div className="hidden lg:flex flex-[1.1] bg-gray-50 items-center justify-center p-16">
          <div className="w-full max-w-md aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center p-16 border border-gray-100">
            <div key={step} className="text-[#0A5C36]">
              {currentSlide.icon}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between p-8 md:p-16">
          <button
            onClick={skip}
            className="self-end text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Skip
          </button>

          <div key={step} className="flex-1 flex flex-col justify-center space-y-6">
            <div className="lg:hidden w-20 h-20 mb-2">
              <Image src="/logo.svg" alt="Logo" width={80} height={80} unoptimized={true} />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-medium text-gray-900 tracking-tight">
                {currentSlide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl font-medium">
                {currentSlide.description}
              </p>
            </div>
          </div>

          <div className="w-full space-y-6 pt-8">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-10 bg-[#0A5C36]" : "w-2 bg-gray-200"}`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="w-full h-14 lg:w-[320px] rounded-xl bg-[#0A5C36] hover:bg-[#0d7344] text-white text-base font-medium flex items-center justify-center gap-3"
            >
              {step === slides.length - 1 ? "Get Started" : "Next"}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
