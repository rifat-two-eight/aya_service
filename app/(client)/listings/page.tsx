"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const topServices = [
  {
    name: "Dr. Sarah Johnson - Family Medicine",
    category: "Doctors",
    location: "New York, NY",
    rating: 4.9,
    reviews: 423,
    image: "",
  },
  {
    name: "Premier Tax Solutions",
    category: "Tax Services",
    location: "New York, NY",
    rating: 4.8,
    reviews: 156,
    image: "",
  },
  {
    name: "Quick Fix Plumbing",
    category: "Plumbers",
    location: "Brooklyn, NY",
    rating: 4.6,
    reviews: 89,
    image: "",
  },
  {
    name: "Elite Event Planning",
    category: "Events",
    location: "Queens, NY",
    rating: 4.7,
    reviews: 132,
    image: "",
  },
  {
    name: "Green Leaf Grocers",
    category: "Groceries",
    location: "Bronx, NY",
    rating: 4.5,
    reviews: 210,
    image: "",
  },
  {
    name: "H2O Plumbing Experts",
    category: "Plumbers",
    location: "Manhattan, NY",
    rating: 4.8,
    reviews: 321,
    image: "",
  },
];

export default function ListingsPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 hover:text-gray-900"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
              Top Rated Services
            </h1>
            <p className="text-sm text-gray-500">
              Browse all highly rated providers in your area
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topServices.map((service) => (
          <div
            key={service.name}
            className="flex flex-col gap-6 p-6 rounded-[40px] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            <div className="relative w-full h-56 rounded-[32px] overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gray-100" />
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <h4 className="font-black text-gray-900 text-xl leading-tight group-hover:text-[#0A5C36] transition-colors">
                    {service.name}
                  </h4>
                  <span className="inline-block bg-green-50 text-[#0A5C36] text-[10px] font-black uppercase tracking-[1px] px-3 py-1.5 rounded-lg">
                    {service.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400 font-bold">
                  <MapPin className="w-4 h-4 text-red-400" />
                  {service.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-black text-gray-900">
                    {service.rating}
                  </span>
                  <span className="text-xs text-gray-400 font-bold ml-1">
                    ({service.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
