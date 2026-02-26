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
      setStep(3); // Role selection
    }
  };

  const skip = () => {
    setStep(3);
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
          />
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:flex flex-col items-center justify-center space-y-6 p-8 bg-gray-50 rounded-2xl h-full min-h-[480px]">
            <div className="relative w-40 h-40">
              <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">Welcome to AYA Shop</h2>
              <p className="text-gray-500 max-w-sm">Manage your business or find local services with ease.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 tracking-tight">Select your role</h2>
              <p className="text-base text-gray-500">How would you like to use the platform today?</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <RoleCard
                icon={<User className="w-8 h-8 text-white" />}
                title="Client"
                description="Find the right business professional for your needs"
                onClick={() => router.push("/client/login")}
                iconBg=""
              />
              <RoleCard
                icon={<Briefcase className="w-8 h-8 text-white" />}
                title="Business"
                description="Highlight your work and expand your business reach"
                onClick={() => router.push("/business/login")}
                iconBg=""
              />
              <RoleCard
                icon={<ShieldCheck className="w-8 h-8 text-white" />}
                title="Admin"
                description="Manage platform operations and user activities"
                onClick={() => router.push("/login")}
                iconBg=""
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
              <Image src="/logo.svg" alt="Logo" width={80} height={80} />
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

type RoleCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  iconBg?: string;
};

function RoleCard({ icon, title, description, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-5 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left bg-white"
    >
      <div className="bg-[#0A5C36] p-3 rounded-xl text-white">{icon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}
