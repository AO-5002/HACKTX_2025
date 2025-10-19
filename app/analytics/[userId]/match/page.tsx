"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HorizontalCarousel } from "./dynamic-components";
import { MainContent, PageLayout } from "@/layouts/PageLayout";

const TypedHorizontalCarousel =
  HorizontalCarousel as unknown as React.ComponentType<{ data: any[] }>;

export default function Page() {
  const router = useRouter();
  const [showHearts, setShowHearts] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setShowHearts(true);
    setLoading(true);

    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData)
        throw new Error("No user data found in localStorage.");

      const rawUserData = JSON.parse(storedUserData);

      // ✅ Convert vehicleYear string → array of numbers
      let vehicleYear: number[] = [2016, 2025];
      if (typeof rawUserData.vehicleYear === "string") {
        const parts = rawUserData.vehicleYear
          .split("-")
          .map((y: string) => Number(y.trim()))
          .filter((n: number) => !isNaN(n));
        if (parts.length === 2) vehicleYear = parts;
      } else if (Array.isArray(rawUserData.vehicleYear)) {
        vehicleYear = rawUserData.vehicleYear.map((n: any) => Number(n));
      }

      // ✅ Format data exactly as backend expects
      const formattedData = {
        id: rawUserData.id || "USER#001",
        name: rawUserData.name || "Anonymous",
        password: rawUserData.password || "defaultPass",
        userSpecific: {
          income: Number(rawUserData.userSpecific?.income) || 0,
          creditScore: Number(rawUserData.userSpecific?.creditScore) || 0,
        },
        monthlyBudget: Number(rawUserData.monthlyBudget) || 0,
        vehicleType: rawUserData.vehicleType || "SEDAN",
        fuelType: rawUserData.fuelType || "GAS",
        vehicleCondition: rawUserData.vehicleCondition || "USED",
        vehicleYear, // ✅ proper numeric array
      };

      console.log("📤 Sending formatted data:", formattedData);

      const res = await fetch(
        "https://hacktx-backend.onrender.com/cars/recommend-cars",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        }
      );

      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();

      console.log("✅ Recommendations:", data);
      setRecommendations(data?.cars || []);
    } catch (err) {
      console.error("❌ Failed to fetch recommendations:", err);
    } finally {
      setTimeout(() => {
        setShowHearts(false);
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  /* --------------------------------------------------- */
  /* SELECT HANDLER                                      */
  /* --------------------------------------------------- */
  const handleSelect = () => {
    router.push(`/analytics/${1}/suggestions`);
  };

  /* --------------------------------------------------- */
  /* UI                                                  */
  /* --------------------------------------------------- */
  return (
    <PageLayout>
      <MainContent
        mode="btm"
        rightPanel={false}
        header={
          <>
            <h1 className="text-2xl font-light">Car Suggestions</h1>
            <p className="text-xs text-zinc-400">Find your perfect match!</p>
          </>
        }
      >
        <AnimatePresence mode="wait">
          {showHearts || loading ? (
            <motion.div
              key="hearts"
              className="relative flex items-center justify-center w-full h-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: Math.random() * 50 + 20,
                    x: Math.random() * 100 - 50,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    y: -200 - Math.random() * 200,
                    scale: 1.2,
                    rotate: Math.random() * 360,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.2 + Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute"
                >
                  <Heart
                    className="text-pink-500 opacity-80"
                    size={28 + Math.random() * 20}
                    fill="pink"
                  />
                </motion.div>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-10 text-zinc-600 text-sm font-light"
              >
                Finding your match...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex flex-col items-center"
            >
              <TypedHorizontalCarousel data={recommendations} />

              {/* ✅ Select Button */}
              <Button
                onClick={handleSelect}
                className="mt-8 bg-[#EB0A1E] hover:bg-[#c00918] text-white px-8 py-2 rounded-lg shadow-md transition"
              >
                SELECT
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>
    </PageLayout>
  );
}
