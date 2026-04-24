"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function PropertyListingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* ===== Section 1 (Gray background) ===== */}
        <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative max-w-5xl mx-auto">
            {/* Background Image (watermark style) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[url('/images/logo/sri_lanka.jpg')] bg-no-repeat bg-center bg-contain opacity-30 w-60 h-60 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]" />
            </div>

            {/* Foreground Content */}
            <div className="relative">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                List your property <br className="hidden sm:block" /> on Lily
                Lanka
              </h1>

              <p className="text-gray-600 mx-auto mb-8 text-left text-sm sm:text-base">
                Lorem Ipsum has been the industry&apos;s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries.
              </p>

              <ul className="space-y-4 max-w-2xl mx-auto text-left">
                {[
                  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-600 mt-6 text-left text-sm sm:text-base">
                Lorem Ipsum has been the industry&apos;s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type.
              </p>

              <button
                onClick={() => router.push("/start1")}
                className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors w-full sm:w-auto"
              >
                Get started now
              </button>
            </div>
          </div>
        </section>

        {/* ===== Section 2 (White background) ===== */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-10 text-left">
              Lorem worry-free. We&apos;ve got your back
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
              {[
                "Lorem or decline bookings with",
                "Lorem your guests' expectations by setting up clear house rules.",
                "Lorem your guests' expectations by setting up clear house rules.",
                "Lorem or decline bookings with",
                "Lorem your guests' expectations by setting up clear house rules.",
                "Lorem or decline bookings with",
                "Lorem your guests' expectations by setting up clear house rules. Accept or decline bookings with",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    ✓
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/start2")}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors w-full sm:w-auto"
            >
              Get started now
            </button>
          </div>
        </section>

        {/* ===== Section 3 (Gray background + description) ===== */}
        <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-left">
              Lorem or decline bookings with
            </h2>

            <p className="text-gray-600 mb-6 text-left text-sm sm:text-base">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                {[
                  "Lorem or decline bookings with setting up clear house rules.",
                  "Lorem your guests' expectations by setting up clear house rules; clear house rules.",
                  "Lorem or decline bookings with setting up clear house rules.",
                  "Lorem or decline bookings with setting up",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      ✓
                    </span>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-left text-sm sm:text-base">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting.
            </p>

            <p className="text-gray-600 mb-6 text-left text-sm sm:text-base">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting.
            </p>

            <button
              onClick={() => router.push("/start3")}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors w-full sm:w-auto"
            >
              Get started now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
