"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cars } from "@/lib/cars";

/* --------------------------------------------------- */
/* Helper: Get Image Path                              */
/* --------------------------------------------------- */
function getCarImagePath(year: number, make: string, model: string) {
  const formattedName = `${make} ${model}`
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");

  return `/CAR_MODELS/${year}_${formattedName}.jpg`;
}

/* --------------------------------------------------- */
/* Placeholder Fallback                                */
/* --------------------------------------------------- */
function PlaceholderImage() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center bg-zinc-100 rounded-xl">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
}

/* --------------------------------------------------- */
/* Car Card Component                                  */
/* --------------------------------------------------- */
export function CarCard({
  name,
  model,
  year,
  price,
  features,
  slug,
}: {
  name: string;
  model: string;
  year: number;
  price: string;
  features: string[];
  slug: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const imagePath = getCarImagePath(year, name, model);
  const [imgError, setImgError] = React.useState(false);

  return (
    <Card className="w-full h-full max-w-[1100px] border border-zinc-200 shadow-sm hover:shadow-md transition">
      <CardContent className="flex flex-col h-[550px] w-full justify-between p-6 gap-6 bg-white">
        {/* Header */}
        <div className="self-start">
          <h1 className="text-3xl font-semibold text-zinc-900">{name}</h1>
          <p className="text-sm text-zinc-500">
            {model} • {year}
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-100">
          {!imgError ? (
            <img
              src={imagePath}
              alt={`${year} ${name} ${model}`}
              className="w-full h-full object-contain object-center rounded-xl transition-transform duration-300 hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <img
              src="/CAR_MODELS/default.png"
              alt="Default Car Image"
              className="w-full h-full object-contain object-center rounded-xl opacity-80"
            />
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-xs justify-start">
          {features.map((f, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-zinc-500">
              Starting from
            </p>
            <p className="text-2xl font-semibold text-zinc-900">{price}</p>
          </div>
          <button
            onClick={() => router.push(`${pathname}/${slug}`)}
            className="bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-800 transition"
          >
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

/* --------------------------------------------------- */
/* Horizontal Carousel Component                       */
/* --------------------------------------------------- */
export function HorizontalCarousel() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Carousel className="w-full max-w-[1200px] h-full">
        <CarouselContent className="flex h-full">
          {cars.map((car) => (
            <CarouselItem
              key={car.slug}
              className="basis-full flex justify-center items-center"
            >
              <CarCard {...car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
