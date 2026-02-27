"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function ClientProfileEditPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("+34 600 123 456");
  const [location, setLocation] = useState("Barcelona, Spain");
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile saved");
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/profile")}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-medium text-gray-900">Edit Profile</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm text-gray-700">First Name</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm text-gray-700">Last Name</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm text-gray-700">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm text-gray-700">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSave}
          disabled={saving}
          className="bg-[#0A5C36] hover:bg-[#0d7344] rounded-xl px-6"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/profile")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
