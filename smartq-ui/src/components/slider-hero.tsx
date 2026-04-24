"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ---------------- Slider ----------------

type Slide = { 
  src: string; 
  alt: string;
  title: string;
  slogan: string;
  buttonText: string;
};

const SLIDES: Slide[] = [
  { 
    src: "/images/Client-Blog-Banner-File-2025-02-24T115336.138.jpg", 
    alt: "People waiting in organized queue",
    title: "QueueSmart",
    slogan: "Skip The Line, Save Your Time",
    buttonText: "Book Token Now"
  },
  { 
    src: "/images/Client-Blog-Banner-File-2025-02-24T115500.271-e1741924974111-1024x494.jpg", 
    alt: "Digital queue display at hospital",
    title: "QueueSmart",
    slogan: "Digital Queue Management Made Easy",
    buttonText: "Join Queue Virtually"
  },
  { 
    src: "/images/Quere-management-final.png", 
    alt: "Customer getting served efficiently",
    title: "QueueSmart",
    slogan: "Smart Solutions for Busy Businesses",
    buttonText: "Get Started"
  },
];

export default function QueueHero() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [textTransition, setTextTransition] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duration = 5000; // 5s per slide

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = useMemo(() => SLIDES, []);
  const clear = () => timeoutRef.current && clearTimeout(timeoutRef.current);
  
  const goTo = (i: number) => {
    setTextTransition(true);
    setTimeout(() => {
      setIndex((i + slides.length) % slides.length);
      setTextTransition(false);
    }, 300);
  };
  
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Auto-slide only on desktop
  useEffect(() => {
    if (!isMobile) {
      clear();
      timeoutRef.current = setTimeout(next, duration);
      return clear;
    }
  }, [index, slides, isMobile]);

  const currentSlide = slides[index];

  return (
    <section className="relative w-full .,">
      {/* Responsive height */}
      <div className="relative w-full h-[60vh] md:aspect-[16/6] md:h-auto overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            {/* Fallback gradient background if image not available */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-blue-900/90" />
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover mix-blend-overlay opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-blue-900/40 via-blue-900/70 to-transparent" />
          </div>
        ))}

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <div className={`text-center text-white transition-all duration-500 transform ${
            textTransition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            {/* Website Name */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 drop-shadow-2xl">
              {currentSlide.title}
            </h1>
            
            {/* Slogan */}
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light drop-shadow-lg max-w-3xl mx-auto">
              {currentSlide.slogan}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">50K+</div>
                <div className="text-sm md:text-base opacity-90">Tokens Booked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">2K+</div>
                <div className="text-sm md:text-base opacity-90">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">95%</div>
                <div className="text-sm md:text-base opacity-90">Satisfaction</div>
              </div>
            </div>
            
            {/* Book Token Button */}
            <div className="pointer-events-auto">
              <button 
                onClick={() => window.location.href = '/book-token'}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
              >
                {currentSlide.buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Prev / Next buttons - hidden on mobile */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="rounded-full bg-white/20 backdrop-blur-sm p-3 hover:bg-white/30 transition-colors border border-white/30"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={next}
              aria-label="Next slide"
              className="rounded-full bg-white/20 backdrop-blur-sm p-3 hover:bg-white/30 transition-colors border border-white/30"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60 scale-100"
              } ${
                isMobile ? "h-3 w-3 rounded-lg" : "h-3 w-3 rounded-full"
              }`}
            />
          ))}
        </div>

        {/* Queue Booking Form Overlay */}
        <div className="absolute inset-x-0 bottom-0 md:bottom-8 flex justify-center px-3 md:px-4">
          <QueueBookingForm isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

// ---------------- Queue Booking Form ----------------

function QueueBookingForm({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const [businessType, setBusinessType] = useState<"Health" | "Food" | "Automobile" | "Bank" | "Government">("Health");
  const [values, setValues] = useState({
    location: "",
    serviceType: "",
    customerName: "",
    phoneNumber: "",
  });

  const [searchExpanded, setSearchExpanded] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      type: businessType.toLowerCase(),
      location: values.location,
      service: values.serviceType,
      name: values.customerName,
      phone: values.phoneNumber,
    });
    router.push(`/book-token?${params.toString()}`);
  };

  // Get service options based on business type
  const getServiceOptions = () => {
    const services = {
      Health: ["Consultation", "Emergency", "Pharmacy", "Lab Test", "Vaccination"],
      Food: ["Dine-in", "Takeaway", "Delivery", "Reservation", "Catering"],
      Automobile: ["Service", "Repair", "Wash", "Tire Change", "Insurance"],
      Bank: ["Deposit", "Withdrawal", "Account", "Loan", "Credit Card"],
      Government: ["License", "Passport", "Tax", "Permit", "Certificate"]
    };
    return services[businessType];
  };

  // Mobile compact view
  if (isMobile && !searchExpanded) {
    return (
      <div className="w-full max-w-md">
        <button
          onClick={() => setSearchExpanded(true)}
          className="w-full rounded-2xl bg-white/95 px-6 py-4 shadow-xl backdrop-blur text-left border border-gray-200"
          aria-label="Open booking form"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Book Queue Token</div>
              <div className="text-lg font-semibold text-gray-900">
                {values.location || "Any Business"}
              </div>
              <div className="text-xs text-gray-500">
                {values.serviceType ? `${values.serviceType} • ${businessType}` : "Select service type"}
              </div>
            </div>
            <div className="rounded-full bg-blue-600 p-2">
              <QueueIcon />
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`w-full max-w-6xl rounded-2xl border bg-white/95 shadow-2xl backdrop-blur transition-all ${
        isMobile ? "px-4 py-4" : "px-6 py-4"
      }`}
      aria-label="Book Queue Token"
    >
      {/* Close button for mobile expanded view */}
      {isMobile && (
        <div className="flex items-center justify-between mb-3 pb-2 border-b">
          <button
            type="button"
            onClick={() => setSearchExpanded(false)}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close booking form"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="text-sm font-medium text-gray-700">Book Token</div>
          <div className="w-6"></div>
        </div>
      )}

      {/* Business type tabs */}
      <div className={`flex items-center gap-2 border-b pb-2 overflow-x-auto ${isMobile ? "scrollbar-hide" : ""}`}>
        {(["Health", "Food", "Automobile", "Bank", "Government"] as const).map((type) => (
          <BusinessTypeTab
            key={type}
            label={type}
            value={type}
            active={businessType === type}
            onClick={() => {
              setBusinessType(type);
              setValues(prev => ({ ...prev, serviceType: "" }));
            }}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Grid layout */}
      <div className={`mt-4 grid gap-4 items-end ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12"}`}>
        {/* Location */}
        <div className={isMobile ? "" : "md:col-span-3"}>
          <InputWithIcon
            ariaLabel="Location"
            placeholder={isMobile ? "Enter location..." : "Enter city or area..."}
            value={values.location}
            onChange={(v) => setValues((s) => ({ ...s, location: v }))}
            icon={<LocationIcon />}
            isMobile={isMobile}
          />
        </div>

        {/* Service Type */}
        <div className={isMobile ? "" : "md:col-span-3"}>
          <div className="relative">
            <div className={`flex items-center gap-2 rounded-xl border px-3 ${isMobile ? "py-3" : "py-2"} bg-white cursor-pointer`}>
              <span className="text-gray-500"><ServiceIcon /></span>
              <select
                value={values.serviceType}
                onChange={(e) => setValues(s => ({ ...s, serviceType: e.target.value }))}
                className="w-full bg-transparent outline-none appearance-none py-1"
                aria-label="Service Type"
              >
                <option value="">Select Service</option>
                {getServiceOptions().map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Customer Name */}
        <div className={isMobile ? "" : "md:col-span-3"}>
          <InputWithIcon
            ariaLabel="Your Name"
            placeholder="Your Name"
            value={values.customerName}
            onChange={(v) => setValues((s) => ({ ...s, customerName: v }))}
            icon={<UserIcon />}
            isMobile={isMobile}
          />
        </div>

        {/* Phone Number */}
        <div className={isMobile ? "" : "md:col-span-2"}>
          <InputWithIcon
            ariaLabel="Phone Number"
            placeholder="Phone"
            type="tel"
            value={values.phoneNumber}
            onChange={(v) => setValues((s) => ({ ...s, phoneNumber: v }))}
            icon={<PhoneIcon />}
            isMobile={isMobile}
          />
        </div>

        {/* Book Token Button */}
        <div className={isMobile ? "" : "md:col-span-1"}>
          <button
            type="submit"
            className={`bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium w-full ${
              isMobile
                ? "h-12 rounded-xl text-base"
                : "h-11 rounded-xl px-4 py-2 text-sm"
            }`}
          >
            {isMobile ? (
              <div className="flex items-center justify-center gap-2">
                <QueueIcon />
                <span>Book Now</span>
              </div>
            ) : (
              "Book"
            )}
          </button>
        </div>
      </div>

      {/* Estimated Wait Time */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Estimated Wait:</span>
          <span className="font-semibold text-blue-700">15-25 minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Queue Position:</span>
          <span className="font-semibold">#12</span>
        </div>
      </div>
    </form>
  );
}

// ---------------- Business Type Tab ----------------

function BusinessTypeTab({
  label,
  value,
  active,
  onClick,
  isMobile,
}: {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const getIcon = () => {
    switch(label) {
      case "Health": return "🏥";
      case "Food": return "🍔";
      case "Automobile": return "🚗";
      case "Bank": return "🏦";
      case "Government": return "🏛️";
      default: return "📍";
    }
  };

  const getColor = () => {
    switch(label) {
      case "Health": return "bg-red-100 text-red-700 border-red-200";
      case "Food": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Automobile": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Bank": return "bg-green-100 text-green-700 border-green-200";
      case "Government": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors border flex items-center gap-2 ${
        active 
          ? `${getColor()} scale-105` 
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
      } ${isMobile ? "text-sm px-3 py-1.5" : "text-sm px-4 py-2"}`}
      aria-pressed={active}
    >
      <span className="text-base">{getIcon()}</span>
      {label}
    </button>
  );
}

// ---------------- UI Components ----------------

type InputWithIconProps = {
  label?: string;
  ariaLabel?: string;
  icon: React.ReactNode;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  min?: number;
  className?: string;
  onContainerClick?: () => void;
  readOnly?: boolean;
  isMobile?: boolean;
};

function InputWithIcon({
  label,
  ariaLabel,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  className = "",
  onContainerClick,
  readOnly = false,
  isMobile = false,
}: InputWithIconProps) {
  const a11y = label ? undefined : ariaLabel || placeholder || "";
  return (
    <label className={"flex flex-col " + (label ? "gap-1" : "")}>
      {label && (
        <span className="mb-1 text-[11px] md:text-xs font-medium text-gray-600">
          {label}
        </span>
      )}
      <div
        className={`flex items-center gap-2 rounded-xl border border-gray-300 px-3 bg-white ${
          isMobile ? "py-3" : "py-2"
        } ${className}`}
        onClick={onContainerClick}
        role={onContainerClick ? "button" : undefined}
        tabIndex={onContainerClick ? 0 : undefined}
      >
        <span className="text-gray-500">{icon}</span>
        <input
          type={type}
          min={min}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          aria-label={a11y}
          className="w-full bg-transparent outline-none placeholder:text-gray-500"
          readOnly={readOnly}
        />
      </div>
    </label>
  );
}

// ---------------- Icons ----------------

function QueueIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ServiceIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="7" r="4" strokeWidth="2" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" strokeWidth="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}