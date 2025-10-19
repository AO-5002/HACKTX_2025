"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { HorizontalCarousel } from "./dynamic-components";
import { MainContent, PageLayout } from "@/layouts/PageLayout";

export default function Page() {
  const [showHearts, setShowHearts] = useState(true);

  useEffect(() => {
    // hide the animation after 1.5s
    const timer = setTimeout(() => setShowHearts(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
          {showHearts ? (
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
              className="w-full h-full"
            >
              <HorizontalCarousel />
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>
    </PageLayout>
  );
}
