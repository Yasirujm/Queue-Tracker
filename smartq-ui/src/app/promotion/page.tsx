"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { ArrowRight, Copy, Clock, Users, Calendar, Shield, TrendingUp, Zap, Star, CheckCircle } from "lucide-react";

const PROMOTIONS = [
  {
    title: "Launch Special: 50% OFF First Year",
    text: "Be among the first 100 businesses to sign up and get 50% off your first year subscription! Limited time offer.",
    link: "/signup?promo=launch50",
    image: "/images/promotions/launch-special.jpg",
    code: "LAUNCH50",
    expires: "Limited spots left",
    discount: "50% OFF",
    category: "business",
    icon: "🚀",
    stats: "First 100 businesses only",
    features: ["Full platform access", "Priority support", "White-label branding"]
  },
  {
    title: "Healthcare Hero Plan",
    text: "Special discounted plan for hospitals, clinics, and healthcare providers with HIPAA compliance included.",
    link: "/promotions/healthcare",
    image: "/images/promotions/healthcare-plan.jpg",
    code: "HEALTHCARE30",
    expires: "Dec 31, 2024",
    discount: "30% OFF",
    category: "healthcare",
    icon: "🏥",
    stats: "200+ healthcare providers",
    features: ["HIPAA compliance", "Emergency priority", "Doctor scheduling"]
  },
  {
    title: "Restaurant Queue Optimization",
    text: "Transform your restaurant waitlist with digital queuing. Special package for F&B businesses.",
    link: "/promotions/restaurant",
    image: "/images/promotions/restaurant-offer.jpg",
    code: "DINEIN25",
    expires: "Ongoing",
    discount: "25% OFF",
    category: "restaurant",
    icon: "🍽️",
    stats: "40% faster table turnover",
    features: ["Virtual waitlist", "Table management", "SMS notifications"]
  },
  {
    title: "Enterprise Scale Package",
    text: "For large organizations with multiple branches. Includes custom integrations and dedicated support.",
    link: "/contact/enterprise",
    image: "/images/promotions/enterprise.jpg",
    code: "ENTERPRISE",
    expires: "Custom quote",
    discount: "Bulk Discount",
    category: "enterprise",
    icon: "🏢",
    stats: "Unlimited tokens",
    features: ["Multi-branch", "Custom API", "Dedicated manager"]
  },
  {
    title: "Government & Public Service",
    text: "Special rates for government offices and public service institutions. Includes accessibility features.",
    link: "/promotions/government",
    image: "/images/promotions/government.jpg",
    code: "GOV25",
    expires: "Ongoing",
    discount: "25% OFF",
    category: "government",
    icon: "🏛️",
    stats: "GDPR compliant",
    features: ["Multi-language", "Accessibility", "Offline mode"]
  },
  {
    title: "Startup Accelerator Program",
    text: "Exclusive offer for startups and small businesses. Pay only for what you use with our flexible plan.",
    link: "/promotions/startup",
    image: "/images/promotions/startup.jpg",
    code: "STARTUPFREE",
    expires: "3 months free",
    discount: "Free Trial",
    category: "startup",
    icon: "🚀",
    stats: "500 startups enrolled",
    features: ["Pay-as-you-go", "No setup fee", "Technical support"]
  },
];

const BUSINESS_BENEFITS = [
  {
    title: "Increase Customer Capacity",
    description: "Serve 75% more customers daily",
    icon: "📈",
    metric: "+75%"
  },
  {
    title: "Reduce Wait Times",
    description: "Average wait time reduction",
    icon: "⏱️",
    metric: "-65%"
  },
  {
    title: "Boost Customer Satisfaction",
    description: "Rating improvement",
    icon: "😊",
    metric: "4.7/5"
  },
  {
    title: "Staff Efficiency",
    description: "Productivity increase",
    icon: "👥",
    metric: "+35%"
  }
];

export default function QueueSmartPromotions() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPromo, setSelectedPromo] = useState(PROMOTIONS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({
    businesses: 523,
    tokensIssued: 125430,
    avgWaitReduction: 65,
    customerSatisfaction: 4.7
  });

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredPromotions = useMemo(() => {
    if (activeCategory === "all") return PROMOTIONS;
    return PROMOTIONS.filter(promo => promo.category === activeCategory);
  }, [activeCategory]);

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Toast notification would go here
    alert(`Promo code "${code}" copied to clipboard!`);
  };

  const openPromoModal = (promo: typeof PROMOTIONS[0]) => {
    setSelectedPromo(promo);
    setIsModalOpen(true);
  };

  const categories = [
    { id: "all", label: "All Offers", icon: "🎯" },
    { id: "business", label: "Business Plans", icon: "💼" },
    { id: "healthcare", label: "Healthcare", icon: "🏥" },
    { id: "restaurant", label: "Restaurants", icon: "🍽️" },
    { id: "government", label: "Government", icon: "🏛️" },
    { id: "startup", label: "Startups", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                🎉 LAUNCH SPECIAL
              </span>
              <span className="px-3 py-1 bg-yellow-500 text-blue-900 rounded-full text-sm font-bold">
                LIMITED TIME OFFER
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Queue Management
              <span className="block text-blue-200">With Smart Savings</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl">
              Join 500+ businesses that have eliminated long waits and increased customer satisfaction by 65% with QueueSmart.
              Special launch offers available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#offers"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                View Offers
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BUSINESS_BENEFITS.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold mb-1">{benefit.metric}</div>
                <div className="text-sm text-blue-100">{benefit.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Offers Section */}
      <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Specialized solutions for every business type. All plans include 14-day free trial.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPromotions.map((promo, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
            >
              {/* Promo Header */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-5xl mb-2">{promo.icon}</div>
                    <div className="text-2xl font-bold">{promo.discount}</div>
                    <div className="text-sm opacity-90">Year 1 Discount</div>
                  </div>
                </div>
                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                    {promo.discount}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {promo.category.toUpperCase()}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {promo.expires}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700">
                  {promo.title}
                </h3>
                <p className="text-gray-600 mb-4">{promo.text}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Includes:</div>
                  <ul className="space-y-1">
                    {promo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">{promo.stats}</div>
                </div>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <div className="text-xs text-gray-500">PROMO CODE</div>
                      <div className="font-mono font-bold text-lg text-blue-700">{promo.code}</div>
                    </div>
                    <button
                      onClick={() => copyPromoCode(promo.code)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => openPromoModal(promo)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-200 group-hover:shadow-lg flex items-center justify-center"
                >
                  <span>Claim This Offer</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Plan Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Feature</th>
                  <th className="text-center py-3 px-4 text-gray-700">Starter</th>
                  <th className="text-center py-3 px-4 text-gray-700">Professional</th>
                  <th className="text-center py-3 px-4 text-gray-700">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly Tokens", "2,000", "20,000", "Unlimited"],
                  ["Businesses", "1", "10", "Unlimited"],
                  ["Users", "5", "50", "Unlimited"],
                  ["SMS Credits", "200", "2,000", "Unlimited"],
                  ["Support", "Email", "Priority 24/7", "Dedicated Manager"],
                  ["White Label", "❌", "✅", "✅"],
                  ["Custom API", "❌", "Limited", "✅"],
                  ["Launch Price", "$24.50/mo", "$99.50/mo", "Custom"],
                ].map(([feature, ...plans], idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700 font-medium">{feature}</td>
                    {plans.map((plan, planIdx) => (
                      <td
                        key={planIdx}
                        className={`py-3 px-4 text-center ${
                          planIdx === 2 ? "bg-blue-50 text-blue-700 font-bold" : ""
                        }`}
                      >
                        {plan}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Queue Management?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join businesses that have increased customer satisfaction by 65% and reduced wait times by 60%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Start 14-Day Free Trial
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Book a Demo
            </a>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            No credit card required • Cancel anytime • Free onboarding
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Trusted by Businesses Worldwide</h2>
            <p className="text-gray-300">Join hundreds of businesses transforming their customer experience</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{stats.businesses}+</div>
              <div className="text-gray-300">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{stats.tokensIssued.toLocaleString()}+</div>
              <div className="text-gray-300">Tokens Issued</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{stats.avgWaitReduction}%</div>
              <div className="text-gray-300">Wait Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">{stats.customerSatisfaction}/5</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How does the 14-day free trial work?",
              a: "You get full access to all features for 14 days. No credit card required. After 14 days, choose a plan that fits your needs."
            },
            {
              q: "Can I switch plans later?",
              a: "Yes, you can upgrade, downgrade, or cancel anytime. Changes take effect at the start of your next billing cycle."
            },
            {
              q: "Do you offer discounts for non-profits?",
              a: "Yes! We offer special pricing for non-profit organizations. Contact our sales team for more information."
            },
            {
              q: "What support is included?",
              a: "All plans include email support. Professional and Enterprise plans include priority support and dedicated account managers."
            },
            {
              q: "Is there a setup fee?",
              a: "No setup fees. We include free onboarding and training with all plans to ensure you get started smoothly."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="font-bold text-gray-900 mb-2">{faq.q}</div>
              <div className="text-gray-600">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Claim Your Offer</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="text-4xl mb-2">{selectedPromo.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedPromo.title}</h4>
                <p className="text-gray-600 mb-4">{selectedPromo.text}</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="font-bold text-blue-900 mb-2">Special Offer Details:</div>
                  <div className="text-blue-700">
                    • Code: <span className="font-mono font-bold">{selectedPromo.code}</span><br />
                    • Discount: <span className="font-bold">{selectedPromo.discount}</span><br />
                    • Valid until: <span className="font-bold">{selectedPromo.expires}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="font-bold text-gray-900 mb-3">This plan includes:</div>
                  <ul className="space-y-2">
                    {selectedPromo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedPromo.link}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Claim This Offer Now
                  </a>
                  <button
                    onClick={() => copyPromoCode(selectedPromo.code)}
                    className="flex-1 py-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Promo Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA */}
      <div className="fixed bottom-4 right-4 z-40">
        <a
          href="/signup"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <span className="font-bold">Start Free Trial</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}