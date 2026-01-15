"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Plus } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const [distance, setDistance] = useState([25]);

  return (
    <section className="relative py-16 lg:py-24 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-6">
              Trusted by 10,000+ users
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find & Book <br />
              <span className="text-[#0A5C36]">Trusted Services</span> <br />
              Near You
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Connect with verified Muslim-friendly service providers in your
              community. From restaurants to events, find everything you need in
              one place.
            </p>

            {/* Search Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
              {/* Search Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  What are you looking for?
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="e.g., restaurants, plumbers, doctors"
                    className="pl-10 h-12 rounded-lg border-gray-300"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Where?
                </label>
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="City, State or ZIP code"
                      className="pl-10 h-12 rounded-lg border-gray-300"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-12 w-12 rounded-lg border-gray-300"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Distance (optional)
                  </label>
                  <span className="text-sm font-semibold text-gray-900">
                    {distance[0]} miles
                  </span>
                </div>
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">1 mi</span>
                  <span className="text-xs text-gray-500">50 mi</span>
                </div>
              </div>

              {/* Search Button */}
              <Button className="w-full h-12 bg-[#0A5C36] hover:bg-[#154a2e] text-white rounded-lg text-base font-semibold">
                Search
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative hidden lg:block">
            <Image
              src="/hero.png"
              alt="hero_image"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
