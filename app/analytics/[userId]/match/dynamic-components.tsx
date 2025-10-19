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

function PlaceholderImage() {
  return <Skeleton className="h-full w-full bg-zinc-200 rounded-lg" />;
}

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
  const pathname = usePathname(); // e.g. /analytics/1/match

  return (
    <Card className="w-full h-full max-w-[1100px] border border-zinc-200 shadow-sm hover:shadow-md transition">
      <CardContent className="flex flex-col h-[500px] w-full justify-between p-6 gap-6 bg-white">
        <div className="self-start">
          <h1 className="text-3xl font-semibold text-zinc-900">{name}</h1>
          <p className="text-sm text-zinc-500">
            {model} • {year}
          </p>
        </div>

        <div className="flex-1 w-full overflow-hidden rounded-lg">
          <PlaceholderImage />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {features.map((f, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700"
            >
              {f}
            </span>
          ))}
        </div>

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
