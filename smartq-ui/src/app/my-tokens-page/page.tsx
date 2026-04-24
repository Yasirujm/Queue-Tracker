"use client";

import { useState } from "react";
type TokenStatus = "Active" | "Completed" | "Cancelled" | "Expired";
type TokenType = "Food" | "Health" | "Automobile" | "Bank" | "Government";

interface Token {
  id: string;
  tokenNumber: string;
  businessName: string;
  businessType: TokenType;
  status: TokenStatus;
  bookedTime: string;
  estimatedTime: string;
  actualTime?: string;
  queuePosition: number;
  waitTime: string;
  serviceType: string;
  location: string;
}

export default function MyTokensPage() {
  const [activeFilter, setActiveFilter] = useState<TokenStatus | "All">("All");
  const [tokens, setTokens] = useState<Token[]>([
    { id: "1", tokenNumber: "H101", businessName: "Colombo General Hospital", businessType: "Health", status: "Active", bookedTime: "Today, 10:30 AM", estimatedTime: "11:45 AM", queuePosition: 3, waitTime: "15 mins", serviceType: "Consultation", location: "Colombo 08" },
    { id: "2", tokenNumber: "F205", businessName: "KFC Express", businessType: "Food", status: "Active", bookedTime: "Today, 11:15 AM", estimatedTime: "11:45 AM", queuePosition: 5, waitTime: "8 mins", serviceType: "Takeaway", location: "Bambalapitiya" },
    { id: "3", tokenNumber: "A312", businessName: "Toyota Service Center", businessType: "Automobile", status: "Active", bookedTime: "Yesterday, 2:30 PM", estimatedTime: "3:15 PM", queuePosition: 8, waitTime: "25 mins", serviceType: "Oil Change", location: "Narahenpita" },
    { id: "4", tokenNumber: "B401", businessName: "People's Bank", businessType: "Bank", status: "Completed", bookedTime: "Jan 15, 9:00 AM", estimatedTime: "9:45 AM", actualTime: "9:40 AM", queuePosition: 0, waitTime: "-", serviceType: "Deposit", location: "Fort" },
    { id: "5", tokenNumber: "G109", businessName: "DMV Office", businessType: "Government", status: "Cancelled", bookedTime: "Jan 14, 10:00 AM", estimatedTime: "11:30 AM", queuePosition: 0, waitTime: "-", serviceType: "License Renewal", location: "Nugegoda" },
    { id: "6", tokenNumber: "H502", businessName: "Dental Care Clinic", businessType: "Health", status: "Completed", bookedTime: "Jan 13, 3:15 PM", estimatedTime: "4:00 PM", actualTime: "3:55 PM", queuePosition: 0, waitTime: "-", serviceType: "Checkup", location: "Kollupitiya" },
    { id: "7", tokenNumber: "F307", businessName: "Pizza Hut", businessType: "Food", status: "Expired", bookedTime: "Jan 12, 7:30 PM", estimatedTime: "8:15 PM", queuePosition: 0, waitTime: "-", serviceType: "Dine-in", location: "Colombo 03" },
  ]);

  const filteredTokens = tokens.filter(token => 
    activeFilter === "All" || token.status === activeFilter
  );

  const getStatusColor = (status: TokenStatus) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      case "Expired": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: TokenType) => {
    const colors = {
      Food: "bg-orange-100 text-orange-800",
      Health: "bg-red-100 text-red-800",
      Automobile: "bg-blue-100 text-blue-800",
      Bank: "bg-green-100 text-green-800",
      Government: "bg-purple-100 text-purple-800",
    };
    return colors[type];
  };

  const handleCancelToken = (tokenId: string) => {
    if (confirm("Are you sure you want to cancel this token?")) {
      setTokens(tokens.map(token => 
        token.id === tokenId ? { ...token, status: "Cancelled" } : token
      ));
    }
  };

  const handleExtendToken = (tokenId: string) => {
    const extendedTime = new Date();
    extendedTime.setMinutes(extendedTime.getMinutes() + 15);
    alert(`Token extended by 15 minutes. New estimated time: ${extendedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Queue Tokens</h1>
          <p className="text-gray-600">Manage and track all your booked queue tokens</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-600">Total Tokens</div>
            <div className="text-2xl font-bold text-gray-900">{tokens.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-600">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {tokens.filter(t => t.status === "Active").length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-2xl font-bold text-blue-600">
              {tokens.filter(t => t.status === "Completed").length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-600">Cancelled</div>
            <div className="text-2xl font-bold text-red-600">
              {tokens.filter(t => t.status === "Cancelled").length}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => window.location.href = "/book-token"}
              className="flex items-center justify-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <span className="text-2xl">🎫</span>
              <div className="text-left">
                <div className="font-medium">Book New Token</div>
                <div className="text-xs">Quick booking</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="font-medium">Share Status</div>
                <div className="text-xs">With family/friends</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <div className="font-medium">View History</div>
                <div className="text-xs">Past 30 days</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition-colors">
              <span className="text-2xl">⭐</span>
              <div className="text-left">
                <div className="font-medium">Rate Services</div>
                <div className="text-xs">Help others choose</div>
              </div>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === "All" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Tokens
          </button>
          {(["Active", "Completed", "Cancelled", "Expired"] as TokenStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === status 
                  ? `${getStatusColor(status)} font-medium border`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Tokens List */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filteredTokens.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎫</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tokens found</h3>
              <p className="text-gray-600 mb-4">You don't have any {activeFilter.toLowerCase()} tokens</p>
              <button 
                onClick={() => window.location.href = "/book-token"}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Your First Token
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTokens.map((token) => (
                <div key={token.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left side - Token Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex flex-col items-center">
                          <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-700 font-bold text-2xl rounded-xl mb-2">
                            {token.tokenNumber}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(token.status)}`}>
                            {token.status}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{token.businessName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(token.businessType)}`}>
                              {token.businessType}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Service</div>
                              <div className="font-medium">{token.serviceType}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Location</div>
                              <div className="font-medium">{token.location}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Booked Time</div>
                              <div className="font-medium">{token.bookedTime}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Estimated Time</div>
                              <div className={`font-medium ${
                                token.status === "Active" ? "text-green-600" : ""
                              }`}>
                                {token.estimatedTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar for active tokens */}
                      {token.status === "Active" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Queue Progress</span>
                            <span className="font-medium">Position: #{token.queuePosition}</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{ width: `${100 - (token.queuePosition * 10)}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            Estimated wait: {token.waitTime}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      {token.status === "Active" ? (
                        <>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            View Live Status
                          </button>
                          <button 
                            onClick={() => handleExtendToken(token.id)}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            Extend Token
                          </button>
                          <button 
                            onClick={() => handleCancelToken(token.id)}
                            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Cancel Token
                          </button>
                        </>
                      ) : token.status === "Completed" ? (
                        <>
                          <div className="text-center mb-2">
                            <div className="text-sm text-gray-600">Served at</div>
                            <div className="font-medium">{token.actualTime}</div>
                          </div>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Rate Service
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Book Again
                          </button>
                        </>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Token Management Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Active Tokens</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Arrive 5 minutes before your estimated time</li>
                <li>• Keep notifications enabled for updates</li>
                <li>• You can extend your token by 15 minutes if running late</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">General Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Book tokens during off-peak hours for shorter waits</li>
                <li>• Rate businesses to help others make informed choices</li>
                <li>• Share your token status with family if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}