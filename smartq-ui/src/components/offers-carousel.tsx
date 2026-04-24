"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

const PROMOTIONS = [
  {
    title: "First Token Free",
    text: "New users get their first queue token absolutely free! No booking charges for first-time customers.",
    link: "/promotions/first-token-free",
    image: "/images/promotions/hotel.jpg",
    code: "FIRSTFREE",
    expires: "Dec 31, 2024",
    discount: "100% OFF"
  },
  {
    title: "Weekend Special",
    text: "Book tokens on weekends and get 20% off on service charges. Perfect for weekend errands!",
    link: "/promotions/weekend-special",
    image: "/images/promotions/hotel.jpg",
    code: "WEEKEND20",
    expires: "Ongoing",
    discount: "20% OFF"
  },
  {
    title: "Health Day Discount",
    text: "Special 30% discount on hospital and clinic tokens every Wednesday. Stay healthy, save money!",
    link: "/promotions/health-day",
    image: "/images/promotions/hotel.jpg",
    code: "HEALTH30",
    expires: "Dec 31, 2024",
    discount: "30% OFF"
  },
  {
    title: "Family Package",
    text: "Book tokens for your entire family and get 25% off. Perfect for family outings and appointments.",
    link: "/promotions/family-package",
    image: "/images/promotions/hotel.jpg",
    code: "FAMILY25",
    expires: "Ongoing",
    discount: "25% OFF"
  },
  {
    title: "Early Bird Offer",
    text: "Book tokens before 10 AM and enjoy 15% off on all service charges. Beat the rush!",
    link: "/promotions/early-bird",
    image: "/images/promotions/hotel.jpg",
    code: "EARLY15",
    expires: "Ongoing",
    discount: "15% OFF"
  },
  {
    title: "Student Special",
    text: "Students get 40% off on all queue tokens. Valid student ID required at service point.",
    link: "/promotions/student-offer",
    image: "/images/promotions/hotel.jpg",
    code: "STUDENT40",
    expires: "Dec 31, 2024",
    discount: "40% OFF"
  },
];

export default function PromotionsSlider() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const duration = 6000; // 6s interval

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 2;

  const slides = useMemo(() => {
    const result: typeof PROMOTIONS[] = [];
    for (let i = 0; i < PROMOTIONS.length; i += itemsPerView) {
      result.push(PROMOTIONS.slice(i, i + itemsPerView));
    }
    return result;
  }, [itemsPerView]);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, duration);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  const nextSlide = () => {
    setIndex((i) => (i + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You can add a toast notification here
    alert(`Promo code "${code}" copied to clipboard!`);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers & Promotions</h2>
          <p className="text-gray-600">Save time and money with our exclusive queue token offers</p>
        </div>
        <a
          href="/promotions"
          className="mt-4 sm:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          View all promotions
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Navigation Arrows */}
        {!isMobile && slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous promotions"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next promotions"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slider Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((group, i) => (
              <div key={i} className="flex w-full flex-shrink-0">
                {group.map((promo, j) => (
                  <div
                    key={j}
                    className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0 px-2 sm:px-3 md:px-4`}
                  >
                    <div className="h-full rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-blue-100 group relative overflow-hidden">
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-full shadow-md">
                          {promo.discount}
                        </span>
                      </div>
                      
                      {/* Expiry Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center justify-center px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full border border-gray-200">
                          ⏰ {promo.expires}
                        </span>
                      </div>

                      {/* Text Section */}
                      <div className="mt-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                          {promo.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {promo.text}
                        </p>
                      </div>
                      
                      {/* Promo Code */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                          <div>
                            <div className="text-xs text-gray-500">Promo Code</div>
                            <div className="font-mono font-bold text-blue-700">{promo.code}</div>
                          </div>
                          <button
                            onClick={() => copyPromoCode(promo.code)}
                            className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-md transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      
                      {/* Image Section */}
                      <div className={`relative w-full ${isMobile ? 'h-48' : 'h-40'} rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-10" />
                        <Image
                          src={promo.image}
                          alt={promo.title}
                          fill
                          className="object-cover"
                          sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                        />
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-4 pt-4 border-t border-blue-100">
                        <a
                          href={promo.link}
                          className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 group-hover:shadow-lg"
                        >
                          <span>Claim This Offer</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        {slides.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {slides.map((_, i) => (
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

        {/* Auto-play Status */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-blue-500 animate-pulse'}`}></div>
            <span className="text-xs text-gray-500">
              {isPaused ? 'Paused' : 'Auto-sliding'}
            </span>
          </div>
        </div>

        {/* Mobile Swipe Instructions */}
        {isMobile && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Swipe to see more offers</p>
          </div>
        )}
      </div>

      {/* Mobile Navigation Buttons */}
      {isMobile && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-3 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors shadow-sm"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="p-3 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors shadow-sm"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100">
          <div className="text-2xl font-bold text-blue-700">6+</div>
          <div className="text-sm text-gray-600">Active Offers</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100">
          <div className="text-2xl font-bold text-blue-700">5K+</div>
          <div className="text-sm text-gray-600">Tokens Saved</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100">
          <div className="text-2xl font-bold text-blue-700">₹2.5L+</div>
          <div className="text-sm text-gray-600">User Savings</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100">
          <div className="text-2xl font-bold text-blue-700">98%</div>
          <div className="text-sm text-gray-600">Satisfaction Rate</div>
        </div>
      </div>

      {/* How to Use Offers */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 text-white">
        <h3 className="text-xl font-bold mb-4">How to Use Promo Codes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">1</span>
            </div>
            <div>
              <div className="font-medium mb-1">Copy Promo Code</div>
              <div className="text-sm opacity-90">Click the "Copy" button next to any offer</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">2</span>
            </div>
            <div>
              <div className="font-medium mb-1">Book Your Token</div>
              <div className="text-sm opacity-90">Proceed to book a queue token as normal</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">3</span>
            </div>
            <div>
              <div className="font-medium mb-1">Apply at Checkout</div>
              <div className="text-sm opacity-90">Paste the code in the promo field during payment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}