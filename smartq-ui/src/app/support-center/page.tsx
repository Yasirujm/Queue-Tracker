"use client";

import { useState } from "react";
import NextLink from "next/link";

export default function SupportCenter() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = {
    general: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Create Account' in the top navigation, fill in your details, verify your email, and you're ready to book your next adventure!"
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for certain bookings."
      },
      {
        question: "Is my personal information secure?",
        answer: "Yes, we use industry-standard SSL encryption to protect your data and never share it with third parties without your consent."
      }
    ],
    booking: [
      {
        question: "How do I modify my booking?",
        answer: "Log into your account, go to 'My Bookings', select the booking you want to modify, and follow the prompts. Some changes may incur fees."
      },
      {
        question: "What is your cancellation policy?",
        answer: "Cancellation policies vary by provider. You can check the specific policy for each booking before confirming. Most allow free cancellation within 24-48 hours."
      },
      {
        question: "How do I get my booking confirmation?",
        answer: "Confirmations are sent instantly via email. You can also access them anytime in your account under 'My Bookings'."
      }
    ],
    travel: [
      {
        question: "Do you provide travel insurance?",
        answer: "Yes, we offer comprehensive travel insurance options during the booking process. You can also add it to existing bookings within 24 hours."
      },
      {
        question: "What COVID-19 safety measures are in place?",
        answer: "We partner with properties and activities that follow local health guidelines. Look for the 'Safety Verified' badge when booking."
      },
      {
        question: "Can I book for large groups?",
        answer: "Absolutely! For groups larger than 8 people, contact our group booking specialists for personalized service and potential discounts."
      }
    ],
    technical: [
      {
        question: "The website isn't loading properly",
        answer: "Try clearing your browser cache, updating your browser, or using incognito mode. If issues persist, contact our technical support team."
      },
      {
        question: "I'm having trouble with the mobile app",
        answer: "Ensure you have the latest version installed. You can uninstall and reinstall the app, or contact us for immediate assistance."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox."
      }
    ]
  };

  const contactMethods = [
    
    {
      icon: "📞",
      title: "Phone Support",
      description: "Speak directly with our travel experts",
      availability: "Mon-Sun, 6AM-10PM EST",
      action: "Call Now"
    },
    {
      icon: "✉️",
      title: "Email Support",
      description: "Send us your questions and we'll respond within 2 hours",
      availability: "24/7 Response",
      action: "Send Email"
    }
  ];

  const filteredFAQs = faqCategories[activeCategory].filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-sky-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto">
              We're here to help you plan the perfect trip. Find answers to common questions or contact our support team.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {Object.keys(faqCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-4 font-medium capitalize transition-colors whitespace-nowrap ${
                        activeCategory === category
                          ? "text-sky-600 border-b-2 border-sky-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {category} ({faqCategories[category].length})
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFAQs.map((faq, index) => (
                      <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-sky-600 hover:text-sky-700 mt-2"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Help Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors">
                  <div className="text-3xl mb-3">📚</div>
                  <h4 className="font-semibold mb-2">Travel Guides</h4>
                  <p className="text-gray-600 mb-4">Explore our comprehensive travel guides for destinations worldwide.</p>
                  <NextLink href="/travel-guides" className="text-sky-600 hover:text-sky-700 font-medium">
                    Browse Guides →
                  </NextLink>
                </div>
                <div className="border border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors">
                  <div className="text-3xl mb-3">🏨</div>
                  <h4 className="font-semibold mb-2">Booking Tips</h4>
                  <p className="text-gray-600 mb-4">Learn how to get the best deals and make the most of your bookings.</p>
                  <NextLink href="/blog/booking-tips" className="text-sky-600 hover:text-sky-700 font-medium">
                    Read Tips →
                  </NextLink>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods Sidebar */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-4xl mb-3">{method.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-sm text-gray-500 mb-4">{method.availability}</p>
                <button className="w-full bg-sky-600 text-white py-2 rounded-xl hover:bg-sky-700 transition-colors font-medium">
                  {method.action}
                </button>
              </div>
            ))}

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-2xl mb-2">🚨</div>
              <h3 className="font-semibold text-lg mb-2 text-red-800">Emergency Assistance</h3>
              <p className="text-red-700 mb-3">For urgent travel emergencies during your trip</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-red-600">International</span>
                  <span className="font-semibold">+1-555-HELP-NOW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600">Local</span>
                  <span className="font-semibold">1-800-HELP-123</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-sky-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Was this helpful?</h2>
          <p className="text-sky-100 mb-6">Your feedback helps us improve our support center.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-sky-600 px-6 py-2 rounded-xl hover:bg-gray-100 transition-colors font-medium">
              Yes, thank you!
            </button>
            <button className="bg-sky-700 text-white px-6 py-2 rounded-xl hover:bg-sky-800 transition-colors font-medium">
              I need more help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}