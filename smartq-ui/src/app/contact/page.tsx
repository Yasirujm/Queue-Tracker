"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Phone, Mail, MessageSquare, Clock, HelpCircle, FileText, Settings, AlertCircle } from "lucide-react";

export default function QueueSmartSupportCenter() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = {
    general: [
      {
        question: "How do I book a queue token?",
        answer: "You can book a token by selecting a business/service type, choosing your preferred service, entering your details, and confirming the booking. Tokens are sent via SMS/email instantly."
      },
      {
        question: "What is a queue token?",
        answer: "A queue token is a digital ticket that holds your place in a virtual queue. It shows your position, estimated wait time, and gets updated in real-time."
      },
      {
        question: "Is QueueSmart free for customers?",
        answer: "Yes, QueueSmart is completely free for customers to book tokens. Businesses pay for our service to manage their queues efficiently."
      }
    ],
    booking: [
      {
        question: "How do I modify or cancel my token?",
        answer: "Go to 'My Tokens' in the app or website, select your active token, and choose 'Modify' or 'Cancel'. Note that some businesses may have cancellation policies."
      },
      {
        question: "What happens if I miss my turn?",
        answer: "If you miss your turn, your token status changes to 'Missed'. You can rejoin the queue or book a new token, but you'll lose your original position."
      },
      {
        question: "Can I transfer my token to someone else?",
        answer: "Tokens are non-transferable as they're linked to your phone number and identity. The person receiving the service must match the token details."
      },
      {
        question: "How do priority tokens work?",
        answer: "Priority tokens (marked with 'P' prefix) are for urgent cases and get served before regular tokens. Businesses determine priority eligibility."
      }
    ],
    business: [
      {
        question: "How do businesses use QueueSmart?",
        answer: "Businesses sign up for an account, configure their services, set up counters/staff, and start accepting digital tokens through our dashboard or integration."
      },
      {
        question: "What types of businesses can use QueueSmart?",
        answer: "Any service-based business including hospitals, banks, restaurants, government offices, salons, pharmacies, and more."
      },
      {
        question: "How much does QueueSmart cost for businesses?",
        answer: "We offer flexible pricing plans starting from $24.50/month. Contact our sales team for enterprise pricing and custom solutions."
      }
    ],
    technical: [
      {
        question: "The app isn't showing my token status",
        answer: "Ensure you have internet connection. If issue persists, try refreshing the app, clearing cache, or reinstalling. Your token remains valid even if app has issues."
      },
      {
        question: "I didn't receive my token SMS/notification",
        answer: "Check your spam folder. You can also view your token in the app under 'My Tokens'. Ensure your phone number is correct."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on login page, enter your registered email/phone, and follow the instructions sent to you."
      },
      {
        question: "Is there a mobile app available?",
        answer: "Yes! Download QueueSmart from Google Play Store or Apple App Store. The app provides push notifications and offline access to your tokens."
      }
    ]
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Customer Support",
      description: "For token booking issues and general inquiries",
      number: "1-800-QUEUE-NOW",
      availability: "24/7",
      action: "Call Support"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Business Sales",
      description: "For business accounts and enterprise solutions",
      number: "sales@queuesmart.com",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Email Sales"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant help from our support agents",
      number: "Available in app",
      availability: "24/7",
      action: "Start Chat"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Technical Support",
      description: "For app/website technical issues",
      number: "tech@queuesmart.com",
      availability: "24/7",
      action: "Get Help"
    }
  ];

  const commonIssues = [
    {
      title: "Token Not Updating",
      solution: "Refresh the page or restart the app. Your position is still saved on our servers.",
      icon: "🔄"
    },
    {
      title: "Missed Notification",
      solution: "Check notification settings in your device. You can always view token status in the app.",
      icon: "🔔"
    },
    {
      title: "Wrong Token Details",
      solution: "Contact the business directly for corrections. Most can update token details at the counter.",
      icon: "📝"
    },
    {
      title: "App Crashing",
      solution: "Update to latest version. If problem persists, use our web version at queuesmart.com",
      icon: "📱"
    }
  ];

  const filteredFAQs = faqCategories[activeCategory].filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">QueueSmart Support Center</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get help with token booking, queue management, and business solutions. We're here to ensure smooth queuing for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help with tokens, booking, or business setup..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium flex items-center gap-2">
              Search Help
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2 min</div>
              <div className="text-sm text-gray-600">Avg. Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Businesses Supported</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ & Help Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex overflow-x-auto scrollbar-hide px-4">
                  {Object.keys(faqCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-4 font-medium capitalize transition-all duration-200 whitespace-nowrap ${
                        activeCategory === category
                          ? "text-blue-600 border-b-2 border-blue-600 bg-white shadow-sm"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {category} ({faqCategories[category].length})
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Content */}
              <div className="p-6">
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🔍</div>
                    <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-blue-600 hover:text-blue-700 mt-4 font-medium"
                    >
                      Clear search and show all
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Common Issues Quick Fix */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">🚀 Quick Solutions for Common Issues</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{issue.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{issue.title}</h4>
                        <p className="text-blue-100 text-sm">{issue.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">📚 Helpful Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">🎥</div>
                  <h4 className="font-semibold mb-2">Video Tutorials</h4>
                  <p className="text-gray-600 mb-4">Step-by-step guides for booking and managing tokens</p>
                  <NextLink href="/tutorials" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Watch Tutorials <span className="ml-1">→</span>
                  </NextLink>
                </div>
                <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">📖</div>
                  <h4 className="font-semibold mb-2">User Guide</h4>
                  <p className="text-gray-600 mb-4">Complete documentation for all features</p>
                  <NextLink href="/user-guide" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Read Guide <span className="ml-1">→</span>
                  </NextLink>
                </div>
                <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">🏢</div>
                  <h4 className="font-semibold mb-2">Business Setup</h4>
                  <p className="text-gray-600 mb-4">Resources for businesses using QueueSmart</p>
                  <NextLink href="/business-resources" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Get Started <span className="ml-1">→</span>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods Sidebar */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-gray-900">{method.number}</span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {method.availability}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium">
                  {method.action}
                </button>
              </div>
            ))}

            {/* Emergency Token Support */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-red-800">🚨 Urgent Token Support</h3>
                  <p className="text-red-700">For immediate assistance with active tokens</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                  <span className="text-red-600 font-medium">Active Token Issues</span>
                  <span className="font-bold text-red-700">+1-555-TOKEN-HELP</span>
                </div>
                <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                  <span className="text-red-600 font-medium">Business Emergencies</span>
                  <span className="font-bold text-red-700">1-800-BIZ-HELP</span>
                </div>
              </div>
              <p className="text-sm text-red-600 mt-4">Available 24/7 for urgent queue management issues</p>
            </div>

            {/* Status Page */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-lg text-green-800">✅ System Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Token Booking</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">SMS Notifications</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Queue Updates</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Operational</span>
                </div>
              </div>
              <NextLink href="/status" className="text-green-700 hover:text-green-800 font-medium text-sm mt-4 inline-flex items-center">
                View detailed status →
              </NextLink>
            </div>

            {/* Business Support Card */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">🏢 Business Support</h3>
              <p className="text-blue-100 mb-4">Dedicated support for businesses using QueueSmart</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Account setup assistance</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Integration support</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Staff training sessions</span>
                </li>
              </ul>
              <button className="w-full bg-white text-blue-700 py-3 rounded-xl hover:bg-gray-100 transition-colors font-bold">
                Business Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Was this information helpful?</h2>
          <p className="text-blue-100 mb-6">Help us improve our support center by providing feedback</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium">
              👍 Yes, problem solved!
            </button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-all duration-200 font-medium">
              👎 No, I need more help
            </button>
            <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium">
              💬 Suggest improvement
            </button>
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-200 flex items-center justify-center">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-blue-50 transition-colors group"
      >
        <span className="font-medium text-gray-900 group-hover:text-blue-700 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "transform rotate-180 text-blue-600" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}