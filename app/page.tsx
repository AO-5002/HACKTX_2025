"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <h1>Join</h1>
      <Link href="/onboarding" className="bg-black p-4 text-white">
        Go to Onboarding
      </Link>
    </div>
  );
}
