"use client";

import React, { useState, useEffect } from "react";
import { MainContent, PageLayout } from "@/layouts/PageLayout";

export default function Page() {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const tips = [
      "Pay yourself first — save at least 10% of your income before spending.",
      "Avoid high-interest debt — credit card balances can grow fast.",
      "Build an emergency fund covering 3–6 months of expenses.",
      "Check your credit score regularly and pay bills on time.",
      "Don’t finance a car that costs more than 15% of your annual income.",
      "Invest early — compound interest rewards time more than timing.",
      "Live below your means to give yourself future freedom.",
      "Use cash or debit for discretionary spending to avoid impulse debt.",
      "Track every expense for a month — awareness drives better habits.",
      "Review your subscriptions quarterly and cancel unused services.",
      "Always negotiate loan rates — small changes save big money.",
      "Automate your savings to make financial discipline effortless.",
      "Before buying a car, factor in insurance, maintenance, and fuel costs.",
    ];

    const random = tips[Math.floor(Math.random() * tips.length)];
    setAdvice(random);
  }, []);

  return (
    <PageLayout>
      <MainContent
        header={
          <>
            <h1 className="text-2xl font-light">Advice</h1>
            <p className="text-xs text-zinc-400">
              Help you be a smarter driver!
            </p>
          </>
        }
      >
        <div className="w-full h-1/2 grid grid-cols-[500px_1fr] grid-rows-[400px_200px] gap-4">
          {/* ----------------------------- */}
          {/* CREDIT SCORE RED ARCH SECTION */}
          {/* ----------------------------- */}
          <div className="relative col-start-1 flex flex-col items-center justify-center rounded-xl bg-white shadow-sm">
            <div className="relative w-72 h-72">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 200 100"
              >
                <defs>
                  <linearGradient
                    id="redGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* ✅ Frown-shaped (downward) arch */}
                <path
                  d="M10,100 A90,90 0 0,1 190,100"
                  stroke="url(#redGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Credit score label */}
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center">
                <h2 className="text-5xl font-bold text-zinc-800">720</h2>
                <p className="text-sm text-zinc-500 font-medium">Good</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-between text-xs text-zinc-500 mt-3 w-[80%]">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Very Good</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* ----------------------------- */}
          {/* RANDOM FINANCIAL ADVICE BOX   */}
          {/* ----------------------------- */}
          <div className="col-start-2 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-md border border-zinc-200 bg-gradient-to-br from-white to-zinc-50">
            <h1 className="text-3xl font-serif text-zinc-800 mb-4 tracking-tight">
              Financial Insight 💼
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-md italic">
              “{advice}”
            </p>
            <div className="mt-6 w-16 h-[2px] bg-zinc-300 rounded-full" />
          </div>

          {/* ----------------------------- */}
          {/* BOTTOM SECTION (placeholder)  */}
          {/* ----------------------------- */}
          <div className="bg-zinc-100 col-start-1 col-span-2 row-start-2 rounded-xl border border-zinc-200"></div>
        </div>
      </MainContent>
    </PageLayout>
  );
}
