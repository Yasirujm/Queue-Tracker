'use client';

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Users,
  Filter,
  X,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Business {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  businessType: 'Health' | 'Food' | 'Automobile' | 'Bank' | 'Government';
  currentQueue: number;
  avgWaitTime: string;
  image: string;
  amenities: string[];
  openingHours: string;
  services: string[];
  badge?: string;
}

interface FilterState {
  health: boolean;
  food: boolean;
  automobile: boolean;
  bank: boolean;
  government: boolean;
  openNow: boolean;
  shortWait: boolean;
  highRating: boolean;
  digitalPayment: boolean;
  wheelchairAccess: boolean;
}

const QueueSelectionPage: React.FC = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>('Best match');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('Colombo');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTime, setSelectedTime] = useState<string>('Anytime');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    health: false,
    food: false,
    automobile: false,
    bank: false,
    government: false,
    openNow: true,
    shortWait: false,
    highRating: false,
    digitalPayment: false,
    wheelchairAccess: false,
  });

  const businesses: Business[] = [
    {
      id: 1,
      name: 'Colombo General Hospital',
      location: 'Colombo 08 • 2.5 km away',
      rating: 4.6,
      reviews: 312,
      businessType: 'Health',
      currentQueue: 42,
      avgWaitTime: '15-25 mins',
      image: '/images/hotels/Blue-Ocean-Resort.jpg',
      amenities: ['Digital Queue', 'Emergency', 'Pharmacy', 'Parking'],
      openingHours: '8:00 AM - 8:00 PM',
      services: ['Consultation', 'Emergency', 'Lab Tests', 'Vaccination'],
      badge: 'Popular',
    },
    {
      id: 2,
      name: 'KFC Express',
      location: 'Bambalapitiya • 1.2 km away',
      rating: 4.2,
      reviews: 198,
      businessType: 'Food',
      currentQueue: 18,
      avgWaitTime: '8-12 mins',
      image: '/public/images/Qtracker bannner (1).png',
      amenities: ['Takeaway', 'Dine-in', 'Parking', 'WiFi'],
      openingHours: '10:00 AM - 10:00 PM',
      services: ['Fast Food', 'Beverages', 'Desserts'],
      badge: 'Fast Service',
    },
    {
      id: 3,
      name: 'Toyota Service Center',
      location: 'Narahenpita • 3.8 km away',
      rating: 4.7,
      reviews: 154,
      businessType: 'Automobile',
      currentQueue: 9,
      avgWaitTime: '30-45 mins',
      image: '/public/images/promotions/culture.jpg',
      amenities: ['Service', 'Repair', 'Wash', 'Parts'],
      openingHours: '8:30 AM - 5:30 PM',
      services: ['Oil Change', 'Tire Service', 'Car Wash', 'Repairs'],
      badge: 'Expert Service',
    },
    {
      id: 4,
      name: 'People\'s Bank',
      location: 'Fort • 4.1 km away',
      rating: 4.0,
      reviews: 227,
      businessType: 'Bank',
      currentQueue: 27,
      avgWaitTime: '20-35 mins',
      image: '/public/images/businesses/bank.jpg',
      amenities: ['ATM', 'Digital Banking', 'Loans', 'Insurance'],
      openingHours: '9:00 AM - 3:00 PM',
      services: ['Deposit', 'Withdrawal', 'Account', 'Loan'],
      badge: 'Secure',
    },
    {
      id: 5,
      name: 'DMV Office',
      location: 'Nugegoda • 5.2 km away',
      rating: 3.8,
      reviews: 183,
      businessType: 'Government',
      currentQueue: 35,
      avgWaitTime: '45-60 mins',
      image: '/public/images/businesses/government.jpg',
      amenities: ['License', 'Registration', 'Documentation', 'Help Desk'],
      openingHours: '8:30 AM - 4:30 PM',
      services: ['License Renewal', 'Registration', 'Permits'],
      badge: 'Official',
    },
    {
      id: 6,
      name: 'Dental Care Clinic',
      location: 'Kollupitiya • 1.8 km away',
      rating: 4.5,
      reviews: 260,
      businessType: 'Health',
      currentQueue: 12,
      avgWaitTime: '10-20 mins',
      image: '/public/images/rooms/room-1-2.jpg',
      amenities: ['Checkup', 'Cleaning', 'X-Ray', 'Emergency'],
      openingHours: '9:00 AM - 6:00 PM',
      services: ['Consultation', 'Cleaning', 'Filling', 'Extraction'],
      badge: 'Expert',
    },
  ];

  const toggleFilter = (filterName: keyof FilterState): void => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleBusinessClick = (businessId: number) => {
    //router.push(`/business/${businessId}`);
    router.push(`/hotel-details?id=${businessId}`); // Temporary redirection to hotel details for demo
  };

  const getBusinessTypeColor = (type: Business['businessType']) => {
    switch(type) {
      case 'Health': return 'bg-red-100 text-red-800';
      case 'Food': return 'bg-orange-100 text-orange-800';
      case 'Automobile': return 'bg-blue-100 text-blue-800';
      case 'Bank': return 'bg-green-100 text-green-800';
      case 'Government': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const BusinessCard: React.FC<{ business: Business }> = ({ business }) => (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-4 relative cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-blue-200"
      onClick={() => handleBusinessClick(business.id)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-64 h-48 md:h-44 flex-shrink-0">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover md:rounded-l-xl"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getBusinessTypeColor(business.businessType)}`}>
              {business.businessType}
            </span>
          </div>
          {business.badge && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                {business.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col lg:flex-row lg:justify-between">
          <div className="flex-1 lg:pr-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {business.name}
            </h3>
            <div className="flex items-center mb-3">
              <MapPin className="w-4 h-4 text-gray-500 mr-1 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">{business.location}</span>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(business.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900 mr-2">{business.rating}</span>
              <span className="text-sm text-gray-600">({business.reviews} reviews)</span>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {business.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">Available Services:</p>
              <div className="flex flex-wrap gap-1.5">
                {business.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {business.services.length > 3 && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{business.services.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Queue Info & Action */}
          <div className="flex flex-col justify-between lg:text-right lg:min-w-[200px] lg:pl-6 lg:border-l border-gray-200">
            <div>
              <div className="flex items-center lg:justify-end mb-2">
                <Clock className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium text-gray-900">Open until {business.openingHours.split(' - ')[1]}</span>
              </div>
            </div>

            {/* Queue Statistics */}
            <div className="mb-4 lg:mb-0">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Currently in queue:</span>
                  <span className="text-lg font-bold text-blue-700">{business.currentQueue} people</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg wait time:</span>
                  <span className="text-lg font-bold text-gray-900">{business.avgWaitTime}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="lg:text-right">
              <button 
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/book-token-form?business=${business.id}`);
                }}
              >
                Book Token Now
              </button>
              <button 
                className="w-full mt-2 border border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/live-queue?business=${business.id}`);
                }}
              >
                View Live Queue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FilterSidebar: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`bg-white rounded-xl p-5 h-fit shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-5 lg:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setShowMobileFilters(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search within results */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Search Businesses</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Business Type Filters */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Business Type</h3>
        <div className="space-y-3">
          {[
            { key: 'health' as keyof FilterState, label: '🏥 Health', color: 'red' },
            { key: 'food' as keyof FilterState, label: '🍔 Food', color: 'orange' },
            { key: 'automobile' as keyof FilterState, label: '🚗 Automobile', color: 'blue' },
            { key: 'bank' as keyof FilterState, label: '🏦 Bank', color: 'green' },
            { key: 'government' as keyof FilterState, label: '🏛️ Government', color: 'purple' },
          ].map((filter) => (
            <label key={filter.key} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters[filter.key]}
                onChange={() => toggleFilter(filter.key)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{filter.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Queue Filters */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Queue Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.openNow}
              onChange={() => toggleFilter('openNow')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Open Now</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.shortWait}
              onChange={() => toggleFilter('shortWait')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Short Wait Time (15 mins)</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.highRating}
              onChange={() => toggleFilter('highRating')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">High Rating (4.0+)</span>
          </label>
        </div>
      </div>

      {/* Accessibility Filters */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Accessibility</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.digitalPayment}
              onChange={() => toggleFilter('digitalPayment')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Digital Payments</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.wheelchairAccess}
              onChange={() => toggleFilter('wheelchairAccess')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Wheelchair Accessible</span>
          </label>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Queue Tips
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Book tokens during off-peak hours (2-4 PM)</li>
          <li>• Arrive 5 mins before your estimated time</li>
          <li>• Use digital payments for faster service</li>
          <li>• Check live queue before visiting</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔍 Queue Search Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Find & Book Queue Tokens</h1>
            <p className="text-blue-100">Skip the line, save your time with digital queue management</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl py-4 px-4 md:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 md:gap-4">
              {/* Location input */}
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="h-11 w-full pl-10 pr-24 md:pr-28 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-white bg-white/20 px-2 py-1 rounded">
                    1,251 choices
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-stretch gap-2 md:gap-3">
                {/* Date selector */}
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 h-11">
                  <Calendar className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="appearance-none bg-transparent border-0 text-white focus:outline-none text-sm w-full"
                  >
                    <option className="text-gray-900">Today</option>
                    <option className="text-gray-900">Tomorrow</option>
                    <option className="text-gray-900">This Week</option>
                    <option className="text-gray-900">Next Week</option>
                  </select>
                </div>

                {/* Time selector */}
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 h-11">
                  <Clock className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="appearance-none bg-transparent border-0 text-white focus:outline-none text-sm w-full"
                  >
                    <option className="text-gray-900">Anytime</option>
                    <option className="text-gray-900">Morning (8AM-12PM)</option>
                    <option className="text-gray-900">Afternoon (12PM-4PM)</option>
                    <option className="text-gray-900">Evening (4PM-8PM)</option>
                  </select>
                </div>

                {/* Service type */}
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 h-11">
                  <Users className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  <select className="appearance-none bg-transparent border-0 text-white focus:outline-none text-sm w-full">
                    <option className="text-gray-900">Any Service</option>
                    <option className="text-gray-900">Consultation</option>
                    <option className="text-gray-900">Banking</option>
                    <option className="text-gray-900">Food</option>
                    <option className="text-gray-900">Automobile</option>
                  </select>
                </div>

                {/* Search Button */}
                <button className="bg-white text-blue-600 rounded-xl h-11 px-4 md:px-6 font-bold hover:bg-blue-50 whitespace-nowrap text-sm md:text-base">
                  Find Queues
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters & Options</span>
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="absolute left-0 top-0 h-full w-80 max-w-full bg-white overflow-y-auto">
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Stats & Sort Bar */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Available Queues</h2>
                  <p className="text-gray-600">{businesses.length} businesses with digital queue management</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Best match</option>
                    <option>Shortest wait time</option>
                    <option>Highest rating</option>
                    <option>Nearest location</option>
                    <option>Lowest queue</option>
                  </select>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">89</div>
                  <div className="text-sm text-gray-600">Open Now</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">15-25</div>
                  <div className="text-sm text-gray-600">Avg Wait (mins)</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-orange-600">2.5K</div>
                  <div className="text-sm text-gray-600">Tokens Today</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Businesses List */}
            <div className="space-y-4">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>

            {/* No Results */}
            {businesses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button 
                  onClick={() => {
                    setSelectedFilters({
                      health: false,
                      food: false,
                      automobile: false,
                      bank: false,
                      government: false,
                      openNow: true,
                      shortWait: false,
                      highRating: false,
                      digitalPayment: false,
                      wheelchairAccess: false,
                    });
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Need Help Choosing?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Call Support</div>
                    <div className="text-sm text-gray-600">Get personalized assistance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Email Query</div>
                    <div className="text-sm text-gray-600">Send us your requirements</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Safe & Secure</div>
                    <div className="text-sm text-gray-600">Your data is protected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueSelectionPage;