"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

export default function AuthChoicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Visual Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-12 bg-gray-50 rounded-[32px] h-full min-h-[540px] border border-gray-100">
          <div className="relative w-48 h-48">
            <Image
              src="/logo.svg"
              alt="AYA Shop Logo"
              fill
              className="object-contain"
              priority
              unoptimized={true}
            />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome to AYA Shop
            </h2>
            <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
              Choose your role to continue. Whether you're looking for services or growing your business, we've got you covered.
            </p>
          </div>
        </div>

        {/* Right Side - Role Selection */}
        <div className="space-y-10">
          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group mb-4"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to onboarding</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Select your role
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              How would you like to use the platform today?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <RoleCard
              icon={<User className="w-8 h-8" />}
              title="Client"
              description="Find the right business professional for your needs"
              onClick={() => router.push("/client/login")}
              primaryColor="#0A5C36"
            />
            <RoleCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Business"
              description="Highlight your work and expand your business reach"
              onClick={() => router.push("/business/login")}
              primaryColor="#0A5C36"
            />
            <div className="pt-4 mt-4 border-t border-gray-100">
              <RoleCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Admin Portal"
                description="Manage platform operations and user activities"
                onClick={() => router.push("/login")}
                isSecondary
              />
            </div>
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
  primaryColor?: string;
  isSecondary?: boolean;
};

function RoleCard({ icon, title, description, onClick, isSecondary }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 text-left group ${
        isSecondary 
          ? "bg-gray-50 border-transparent hover:bg-gray-100" 
          : "bg-white border-gray-100 hover:border-[#0A5C36] hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1"
      }`}
    >
      <div className={`p-4 rounded-xl transition-colors duration-300 ${
        isSecondary 
          ? "bg-gray-200 text-gray-600 group-hover:bg-gray-300" 
          : "bg-[#0A5C36] text-white group-hover:bg-[#0d7344]"
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-gray-900 ${isSecondary ? "text-base" : "text-xl"}`}>
          {title}
        </h3>
        <p className="text-gray-500 font-medium text-sm mt-0.5">{description}</p>
      </div>
      <div className={`p-2 rounded-full transition-all duration-300 ${
        isSecondary ? "bg-transparent" : "bg-gray-50 group-hover:bg-green-50"
      }`}>
        <ChevronRight className={`w-5 h-5 ${isSecondary ? "text-gray-400" : "text-gray-300 group-hover:text-[#0A5C36]"}`} />
      </div>
    </button>
  );
}
