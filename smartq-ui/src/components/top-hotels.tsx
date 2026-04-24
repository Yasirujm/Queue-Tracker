"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/** ───────── Types & Data ───────── */
type Hotel = {
  id: string;
  name: string;
  type: string;           // e.g., "Boutique Hotel"
  stars: number;          // 0..5 (supports halves if you want later)
  membership?: "Gold" | "Silver" | "Platinum" | "Member";
  location: string;       // e.g., "Colombo, Sri Lanka"
  rating: number;         // e.g., 4.6
  reviews: number;        // e.g., 312
  priceFrom: string;      // formatted, e.g. "USD 89"
  image: string;          // /public path
  href: string;           // details page
};

const HOTELS: Hotel[] = [
  {
    id: "h1",
    name: "Marino Beach Colombo",
    type: "5 Star Hotel",
    stars: 4,
    membership: "Gold",
    location: "Colombo, Sri Lanka",
    rating: 4.6,
    reviews: 312,
    priceFrom: "USD 89",
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg",
    href: "/hotels/ocean-vista",
  },
  {
    id: "h2",
    name: "Nil Ralla",
    type: "Resort",
    stars: 5,
    membership: "Platinum",
    location: "Matara, Sri Lanka",
    rating: 4.8,
    reviews: 227,
    priceFrom: "USD 140",
    image: "/images/hotels/Nil-Ralla.jpg",
    href: "/hotels/tea-valley",
  },
  {
    id: "h3",
    name: "Cinnamon Bey Beruwala",
    type: "Heritage Hotel",
    stars: 4,
    membership: "Member",
    location: "Beruwala, Sri Lanka",
    rating: 4.5,
    reviews: 198,
    priceFrom: "USD 105",
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg",
    href: "/hotels/fort-heritage",
  },
  {
    id: "h4",
    name: "Blue Ocean Resort",
    type: "Boutique Hotel",
    stars: 3,
    membership: "Silver",
    location: "Tangalle, Sri Lanka",
    rating: 4.2,
    reviews: 154,
    priceFrom: "USD 72",
    image: "/images/hotels/Blue-Ocean-Resort.jpg",
    href: "/hotels/hilltop-escape",
  },
  {
    id: "h5",
    name: "Garcinia Leaf",
    type: "Lodge",
    stars: 4,
    membership: "Gold",
    location: "Hikkaduwa, Sri Lanka",
    rating: 4.4,
    reviews: 260,
    priceFrom: "USD 95",
    image: "/images/hotels/Garcinia-Leaf.jpg",
    href: "/hotels/safari-edge",
  },
  {
    id: "h6",
    name: "Halcyon Galle",
    type: "Resort",
    stars: 5,
    membership: "Platinum",
    location: "Galle, Sri Lanka",
    rating: 4.7,
    reviews: 183,
    priceFrom: "USD 129",
    image: "/images/hotels/Halcyon-Galle.jpg",
    href: "/hotels/lagoon-breeze",
  },
];

/** ───────── Component ───────── */
export default function TopHotels({
  items = HOTELS,
  interval = 6000, // ms
  auto = true,
}: {
  items?: Hotel[];
  interval?: number;
  auto?: boolean;
}) {
  const perView = 4; // 4 boxes in a line
  const pages = useMemo(() => Math.max(1, Math.ceil(items.length / perView)), [items.length]);

  // chunk into pages of 4
  const groups = useMemo(() => {
    const out: Hotel[][] = [];
    for (let i = 0; i < items.length; i += perView) out.push(items.slice(i, i + perView));
    return out;
  }, [items]);

  const [page, setPage] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (p: number) => setPage((p + pages) % pages);
  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);

  // autoplay
  useEffect(() => {
    if (!auto || pages <= 1) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(next, interval);
    return () => timer.current && clearTimeout(timer.current);
  }, [auto, page, pages, interval]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      {/* Header + arrows */}
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Top Hotels</h2>
          <p className="mt-1 text-sm text-muted-foreground">Hand-picked stays with great ratings and prices</p>
        </div>

        {/* Desktop arrows */}
        <div className="hidden md:flex items-center gap-2">
          <button
            aria-label="Previous"
            onClick={prev}
            className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-muted/60"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-muted/60"
          >
            ›
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative overflow-hidden">
        {/* Track slides by page */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ width: `${pages * 100}%`, transform: `translateX(-${(page * 100) / pages}%)` }}
        >
          {groups.map((group, i) => (
            <div
              key={i}
              className="grid w-full shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              style={{ width: `${100 / pages}%` }}
            >
              {group.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
              {/* If the last page has fewer than 4, keep grid structure */}
              {group.length < perView &&
                Array.from({ length: perView - group.length }).map((_, k) => (
                  <div key={`pad-${k}`} className="hidden sm:block" />
                ))}
            </div>
          ))}
        </div>

        {/* Mobile arrows overlay */}
        <div className="md:hidden pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1">
          <button
            aria-label="Previous"
            onClick={prev}
            className="pointer-events-auto rounded-full border bg-white/80 p-2 backdrop-blur hover:bg-white"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="pointer-events-auto rounded-full border bg-white/80 p-2 backdrop-blur hover:bg-white"
          >
            ›
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setPage(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === page ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* View all (right-aligned text link) */}
      <div className="mt-6 flex justify-end">
        <NextLink href="/hotels" className="text-sm font-medium text-purple-600 hover:underline">
          View All →
        </NextLink>
      </div>
    </section>
  );
}

/** ───────── Card ───────── */
function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <NextLink
      href={hotel.href}
      className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-44 md:h-48">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type + stars + membership */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>{hotel.type}</span>
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < hotel.stars} />
            ))}
          </span>
          {hotel.membership && (
            <span className="ml-auto rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700">
              {hotel.membership}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mt-2 line-clamp-1 text-sm font-semibold">{hotel.name}</h3>

        {/* Location */}
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{hotel.location}</p>

        {/* Rating + reviews */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center rounded-md bg-emerald-600 px-1.5 py-0.5 font-semibold text-white">
            {hotel.rating.toFixed(1)}
          </span>
          <span className="text-gray-600">{hotel.reviews.toLocaleString()} reviews</span>
        </div>

        {/* Starting price */}
        <div className="mt-3">
          <span className="text-xs text-gray-500">Starting from</span>
          <div className="text-sm font-semibold">{hotel.priceFrom}</div>
        </div>
      </div>
    </NextLink>
  );
}

/** ───────── Icons ───────── */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden
      className={filled ? "text-amber-500" : "text-gray-300"}
      fill="currentColor"
    >
      <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.79 1.402 8.168L12 18.896l-7.339 3.873 1.402-8.168L.125 9.211l8.207-1.193L12 .587z" />
    </svg>
  );
}
