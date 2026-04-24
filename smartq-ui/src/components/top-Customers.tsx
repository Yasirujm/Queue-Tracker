"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const TOP_BUSINESSES = [
  { 
    title: "Colombo General Hospital", 
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg", 
    subtitle: "Emergency & OPD Services",
    type: "Health",
    rating: 4.6,
    waitTime: "15-25 mins",
    queue: 42
  },
  { 
    title: "KFC Express", 
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg", 
    subtitle: "Fast Food Restaurant",
    type: "Food",
    rating: 4.2,
    waitTime: "8-12 mins",
    queue: 18
  },
  { 
    title: "Toyota Service Center", 
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg", 
    subtitle: "Car Service & Repair",
    type: "Automobile",
    rating: 4.7,
    waitTime: "30-45 mins",
    queue: 9
  },
  { 
    title: "People's Bank", 
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg", 
    subtitle: "Banking Services",
    type: "Bank",
    rating: 4.0,
    waitTime: "20-35 mins",
    queue: 27
  },
  { 
    title: "DMV Office", 
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg", 
    subtitle: "License & Registration",
    type: "Government",
    rating: 3.8,
    waitTime: "45-60 mins",
    queue: 35
  },
  { 
    title: "Dental Care Clinic", 
    image: "/images/hotels/Cinnamon-Bey-Beruwala.jpg", 
    subtitle: "Dental Services",
    type: "Health",
    rating: 4.5,
    waitTime: "10-20 mins",
    queue: 12
  },
];

export default function TopBusinesses() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const duration = 5000; // auto slide every 5s

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 3; // 1 on mobile, 3 on desktop
  const totalSlides = Math.ceil(TOP_BUSINESSES.length / itemsPerSlide);

  const next = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, duration);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  // Pause auto-slide on hover/touch
  const pauseAutoSlide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumeAutoSlide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(next, duration);
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "Health": return "bg-red-100 text-red-800";
      case "Food": return "bg-orange-100 text-orange-800";
      case "Automobile": return "bg-blue-100 text-blue-800";
      case "Bank": return "bg-green-100 text-green-800";
      case "Government": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="bg-white relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Popular Businesses</h2>
          <p className="text-gray-600">Top-rated businesses with digital queue management</p>
        </div>
        <a
          href="/businesses"
          className="mt-4 sm:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Businesses
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Carousel Wrapper */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={pauseAutoSlide}
        onMouseLeave={resumeAutoSlide}
        onTouchStart={pauseAutoSlide}
        onTouchEnd={resumeAutoSlide}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIdx) => (
            <div key={slideIdx} className="flex min-w-full gap-4 sm:gap-6 px-1">
              {TOP_BUSINESSES.slice(
                slideIdx * itemsPerSlide,
                slideIdx * itemsPerSlide + itemsPerSlide
              ).map((business) => (
                <div
                  key={business.title}
                  className="flex-1 min-w-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white border border-gray-100"
                >
                  <div className="relative h-48 sm:h-56">
                    <Image
                      src={business.image}
                      alt={business.title}
                      fill
                      className="object-cover"
                      sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                      priority={slideIdx === 0}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Business type badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(business.type)}`}>
                        {business.type}
                      </span>
                    </div>
                    
                    {/* Text on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg line-clamp-1">
                        {business.title}
                      </h3>
                      <p className="text-gray-200 text-sm drop-shadow-lg">
                        {business.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Business details below image */}
                  <div className="p-4">
                    {/* Rating and Queue info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${star <= Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm font-medium text-gray-700">{business.rating.toFixed(1)}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">In Queue</div>
                        <div className="text-sm font-bold text-blue-700">{business.queue} people</div>
                      </div>
                    </div>
                    
                    {/* Wait Time */}
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="text-xs text-gray-600">Estimated Wait</div>
                        <div className="text-sm font-bold text-gray-900">{business.waitTime}</div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Book Token
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {!isMobile && totalSlides > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous businesses"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next businesses"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Mobile Navigation Buttons */}
        {isMobile && totalSlides > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous business"
              className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-200 border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next business"
              className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-200 border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                i === index 
                  ? "bg-blue-600 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Swipe Hint */}
      {isMobile && totalSlides > 1 && (
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">Swipe to explore more businesses</p>
        </div>
      )}

      {/* Business Categories */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <a href="/businesses/health" className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
            <div className="text-2xl mb-2">🏥</div>
            <div className="font-medium text-gray-900">Health</div>
            <div className="text-xs text-gray-600">89 businesses</div>
          </a>
          <a href="/businesses/food" className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
            <div className="text-2xl mb-2">🍔</div>
            <div className="font-medium text-gray-900">Food</div>
            <div className="text-xs text-gray-600">124 businesses</div>
          </a>
          <a href="/businesses/automobile" className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
            <div className="text-2xl mb-2">🚗</div>
            <div className="font-medium text-gray-900">Automobile</div>
            <div className="text-xs text-gray-600">67 businesses</div>
          </a>
          <a href="/businesses/bank" className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
            <div className="text-2xl mb-2">🏦</div>
            <div className="font-medium text-gray-900">Bank</div>
            <div className="text-xs text-gray-600">45 businesses</div>
          </a>
          <a href="/businesses/government" className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
            <div className="text-2xl mb-2">🏛️</div>
            <div className="font-medium text-gray-900">Government</div>
            <div className="text-xs text-gray-600">38 businesses</div>
          </a>
        </div>
      </div>
    </section>
  );
}