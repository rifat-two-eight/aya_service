"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Password reset link sent to your email!");

      // Optionally redirect to login after a delay
      setTimeout(() => {
        router.push("/otp");
      }, 2000);
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600">
              Secure access to system administration
            </p>
          </div>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-[10px]"
                disabled={isLoading}
              />
            </div>

            {/* Next Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-3xl bg-[#0A5C36] hover:bg-[#154a2e] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Next"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative bg-[#0a1520]">
        <Image
          src="/auth_img.png"
          alt="Authentication"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}