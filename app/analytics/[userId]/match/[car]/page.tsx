"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { cars } from "@/lib/cars";
import { PageLayout, MainContent } from "@/layouts/PageLayout";
import CarModelViewer from "@/components/CarModelViewer";
import { Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnalyticStat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-sm p-6 border border-zinc-100 hover:shadow-md transition">
      <p className="text-xs font-medium text-zinc-600 mb-2">{label}</p>
      <div className="text-xl font-semibold text-zinc-800">{value}</div>
    </div>
  );
}

export default function CarDetailPage() {
  const { car: carSlug } = useParams() as { car: string };
  const router = useRouter();
  const car = cars.find((c) => c.slug === carSlug);

  const analytics = useMemo(() => {
    if (!car) return null;

    const baseYear = 2015;
    const yearDiff = car.year - baseYear;
    const priceNum = Number(car.price.replace(/[^0-9.]/g, ""));
    const featureFactor = car.features.length * 2;

    const fuelEfficiency = 24 + Math.min(10, yearDiff) + featureFactor * 0.1;
    const demandScore = Math.min(100, 60 + (car.model.length % 10) * 4);
    const resaleScore = Math.min(
      10,
      Math.max(6, 10 - priceNum / 10000 + featureFactor * 0.05)
    );

    const acceleration = Math.max(5.5, 8 - yearDiff * 0.3);
    const reliability = Math.min(99, 85 + yearDiff * 1.2);
    const comfort = Math.min(95, 75 + featureFactor * 1.3);

    return {
      fuelEfficiency: (
        <span className="flex items-baseline gap-1">
          <span>{fuelEfficiency.toFixed(1)}</span>
          <span className="text-[10px] uppercase text-zinc-500 font-medium">
            MPG
          </span>
        </span>
      ),
      demand: demandScore > 85 ? "Very High" : "High",
      resale: `${resaleScore.toFixed(1)}/10`,
      perf: { acceleration, reliability, comfort },
    };
  }, [car]);

  if (!car || !analytics) {
    return (
      <PageLayout>
        <MainContent
          mode="btm"
          header={<h1 className="text-2xl">Car not found</h1>}
        >
          <p className="text-zinc-500">Sorry, this car doesn’t exist.</p>
        </MainContent>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <MainContent
        mode="btm"
        header={
          <>
            <h1 className="text-2xl font-light">{car.name}</h1>
            <p className="text-xs text-zinc-400">
              {car.model} • {car.year}
            </p>
          </>
        }
      >
        <div className="w-full h-full grid grid-cols-[600px_1fr] gap-6">
          {/* ---------- Left: 3D Viewer ---------- */}
          <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-100 shadow-inner">
            <CarModelViewer />
          </div>

          {/* ---------- Right: analytics + features ---------- */}
          <div className="h-full w-full flex flex-col gap-6">
            {/* Analytics row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AnalyticStat
                label="Fuel Efficiency"
                value={analytics.fuelEfficiency}
              />
              <AnalyticStat label="Market Demand" value={analytics.demand} />
            </div>

            {/* Performance section */}
            <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium flex items-center gap-2 text-zinc-700">
                  <Gauge className="h-4 w-4 text-zinc-500" /> Performance
                  Overview
                </h2>
              </div>

              <div className="flex flex-col gap-4 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Acceleration</span>
                  <span>
                    {analytics.perf.acceleration.toFixed(1)} s 0–60 mph
                  </span>
                </div>
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-800 rounded-full"
                    style={{
                      width: `${(9 - analytics.perf.acceleration) * 15}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <span>Reliability</span>
                  <span>{analytics.perf.reliability.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${analytics.perf.reliability}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <span>Comfort Rating</span>
                  <span>{analytics.perf.comfort.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${analytics.perf.comfort}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="w-full flex flex-col gap-3">
              <h1 className="text-base font-medium text-zinc-800">Features</h1>
              <div className="flex flex-wrap gap-2">
                {car.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 bg-zinc-100 rounded-full text-xs text-zinc-700"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* ---------- Action Buttons ---------- */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="px-6"
              >
                Go Back
              </Button>

              <Button
                variant="default"
                onClick={() => router.push("/analytics/1/suggestions")}
                className="px-6 bg-[#EB0A1E] hover:bg-[#c00918] text-white"
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      </MainContent>
    </PageLayout>
  );
}
