import { Card, CardContent } from "@/components/ui/card";
import {
  UtensilsCrossed,
  Briefcase,
  Stethoscope,
  Wrench,
  Hammer,
  Scale,
  Home,
  ShoppingCart,
} from "lucide-react";

const categories = [
  { icon: UtensilsCrossed, name: "Restaurants", color: "text-orange-600" },
  { icon: Briefcase, name: "Tax Services", color: "text-blue-600" },
  { icon: Stethoscope, name: "Doctors", color: "text-red-600" },
  { icon: Wrench, name: "Plumbers", color: "text-gray-600" },
  { icon: Hammer, name: "Handyman", color: "text-yellow-600" },
  { icon: Scale, name: "Attorney", color: "text-purple-600" },
  { icon: Home, name: "Real Estate", color: "text-green-600" },
  { icon: ShoppingCart, name: "Grocery", color: "text-pink-600" },
];

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600">
            Discover services across various categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="border-gray-200 hover:shadow-lg transition-all cursor-pointer rounded-2xl group"
              >
                <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">
                    <Icon className={`w-12 h-12 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}