'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Star,
  Check,
  X,
  Calendar,
  Map,
  Users,
  Clock,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  AlertCircle,
  User,
  CreditCard,
  Shield,
  MessageSquare,
  Download,
  Printer,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface QueueToken {
  id: number;
  tokenNumber: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  estimatedTime: string;
  waitTime: string;
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  bookingTime: string;
  queuePosition: number;
}

interface ServiceOption {
  id: number;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
  requirements: string[];
  popularity: 'High' | 'Medium' | 'Low';
  currentQueue: number;
  features: string[];
}

interface Review {
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
  serviceUsed: string;
  likes: string[];
  dislikes: string[];
  verified: boolean;
}

interface BusinessDetail {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  businessType: 'Health' | 'Food' | 'Automobile' | 'Bank' | 'Government';
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  amenities: string[];
  acceptedPayments: string[];
  languages: string[];
  services: string[];
  access: string[];
  policies: {
    cancellation: string;
    booking: string;
    privacy: string;
    other: string;
  };
  nearby: Array<{ name: string; distance: string; category: string }>;
  reviews: Review[];
  currentQueueStats: {
    totalWaiting: number;
    avgWaitTime: string;
    peakHours: string;
    serviceSpeed: string;
  };
}

const BusinessDetailPage: React.FC = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedTokenService, setSelectedTokenService] = useState('');

  const business: BusinessDetail = {
    id: 1,
    name: 'Colombo General Hospital',
    location: 'No 325, Colombo 08 • View on map',
    rating: 4.6,
    reviewCount: 312,
    businessType: 'Health',
    description: `Colombo General Hospital is one of Sri Lanka's largest and most advanced healthcare facilities, offering comprehensive medical services with state-of-the-art technology and expert medical professionals.

Services include emergency care, specialized consultations, diagnostic services, surgical procedures, and rehabilitation. Our digital queue management system ensures minimal waiting times and efficient service delivery.

Facilities feature modern waiting areas, comfortable consultation rooms, advanced diagnostic centers, pharmacy services, and dedicated parking. We prioritize patient comfort and timely service through our smart queue system.`,
    images: [
      '/images/businesses/hospital-main.jpg',
      '/images/businesses/hospital-waiting.jpg',
      '/images/businesses/hospital-reception.jpg',
      '/images/businesses/hospital-facilities.jpg',
      '/images/businesses/hospital-pharmacy.jpg',
    ],
    openingHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '8:00 AM - 4:00 PM',
      sunday: 'Emergency only'
    },
    contact: {
      phone: '+94 11 269 1111',
      email: 'info@colombohospital.lk',
      website: 'www.colombohospital.lk',
      address: 'No 325, Norris Canal Road, Colombo 08, Sri Lanka'
    },
    amenities: ['Free WiFi', 'Parking Available', 'Wheelchair Accessible', 'Pharmacy', 'Cafeteria', 'Restrooms', 'ATM', 'Digital Queue System'],
    acceptedPayments: ['Cash', 'Credit/Debit Cards', 'Insurance', 'Digital Payments'],
    languages: ['English', 'Sinhala', 'Tamil'],
    services: ['Emergency Services', 'General Consultation', 'Specialist Consultation', 'Diagnostic Tests', 'Pharmacy', 'Vaccination', 'Health Checkup', 'Surgery'],
    access: ['24/7 Emergency', 'Wheelchair Access', 'Ambulance Service', 'Valet Parking', 'Digital Appointments'],
    policies: {
      cancellation: 'Tokens can be cancelled up to 30 minutes before estimated time without penalty.',
      booking: 'Online token booking available up to 7 days in advance. Walk-ins accepted.',
      privacy: 'All personal and medical information is kept confidential and secure.',
      other: 'Priority service available for emergency cases and senior citizens.'
    },
    nearby: [
      { name: 'Colombo City Center', distance: '750m', category: 'Shopping' },
      { name: 'National Hospital Pharmacy', distance: '800m', category: 'Medical' },
      { name: 'Colombo Medical College', distance: '1.2 km', category: 'Education' },
      { name: 'Beira Lake', distance: '1.5 km', category: 'Recreation' },
      { name: 'Colombo Fort Railway Station', distance: '2.0 km', category: 'Transport' },
      { name: 'Galle Face Green', distance: '2.5 km', category: 'Recreation' },
      { name: 'National Museum', distance: '3.0 km', category: 'Cultural' },
      { name: 'BMICH', distance: '3.5 km', category: 'Conference' },
    ],
    reviews: [
      {
        rating: 5.0,
        title: 'Excellent Service',
        comment: 'The digital queue system made my visit incredibly smooth. Booked my token online, arrived 10 minutes before my slot, and was seen immediately. No waiting in long lines!',
        author: 'Sanjaya P.',
        date: 'March 16, 2025',
        serviceUsed: 'General Consultation',
        likes: ['Quick service', 'Digital system', 'Professional staff', 'Clean facilities'],
        dislikes: [],
        verified: true
      },
      {
        rating: 4.0,
        title: 'Very efficient',
        comment: 'Used the mobile app to book a token for lab tests. Estimated wait time was accurate and the process was hassle-free. Would definitely use again.',
        author: 'Nimali R.',
        date: 'March 15, 2025',
        serviceUsed: 'Diagnostic Tests',
        likes: ['Accurate wait times', 'Easy booking', 'Modern facilities'],
        dislikes: ['Parking limited during peak hours'],
        verified: true
      },
      {
        rating: 3.5,
        title: 'Good but busy',
        comment: 'The queue system works well but the place gets very crowded during mornings. Suggest booking afternoon slots for shorter waits.',
        author: 'Kamal S.',
        date: 'March 14, 2025',
        serviceUsed: 'Specialist Consultation',
        likes: ['Digital queue', 'Professional doctors', 'Clean environment'],
        dislikes: ['Crowded mornings', 'Limited seating'],
        verified: true
      },
      {
        rating: 4.5,
        title: 'Life-saving efficiency',
        comment: 'Emergency service with digital queue management saved valuable time. Staff were professional and the system kept us informed every step.',
        author: 'Emergency Patient',
        date: 'March 13, 2025',
        serviceUsed: 'Emergency Services',
        likes: ['Fast emergency response', 'Clear communication', 'Efficient system'],
        dislikes: ['Waiting area could be larger'],
        verified: false
      }
    ],
    currentQueueStats: {
      totalWaiting: 42,
      avgWaitTime: '15-25 mins',
      peakHours: '9:00 AM - 12:00 PM',
      serviceSpeed: '8-10 mins per customer'
    }
  };

  const serviceOptions: ServiceOption[] = [
    {
      id: 1,
      name: 'General Consultation',
      description: 'Routine medical checkup and consultation with general physician',
      price: 1500,
      estimatedTime: '15-20 mins',
      requirements: ['Previous medical records (if any)'],
      popularity: 'High',
      currentQueue: 18,
      features: ['Digital prescription', 'E-medical records', 'Follow-up scheduling']
    },
    {
      id: 2,
      name: 'Specialist Consultation',
      description: 'Consultation with specialized doctors (Cardiology, Neurology, etc.)',
      price: 2500,
      estimatedTime: '20-30 mins',
      requirements: ['Referral letter', 'Previous test results'],
      popularity: 'Medium',
      currentQueue: 9,
      features: ['Detailed diagnosis', 'Treatment plan', 'Second opinion available']
    },
    {
      id: 3,
      name: 'Diagnostic Tests',
      description: 'Blood tests, X-rays, Ultrasound, ECG and other diagnostic procedures',
      price: 800,
      estimatedTime: '30-45 mins',
      requirements: ['Doctor\'s prescription', 'Fasting (if required)'],
      popularity: 'High',
      currentQueue: 12,
      features: ['Digital reports', 'Same-day results', 'Online access']
    },
    {
      id: 4,
      name: 'Health Checkup Package',
      description: 'Comprehensive health screening package with multiple tests',
      price: 5000,
      estimatedTime: '60-90 mins',
      requirements: ['Fasting required', 'Previous health records'],
      popularity: 'Low',
      currentQueue: 3,
      features: ['Full body checkup', 'Doctor consultation', 'Health report', 'Diet plan']
    }
  ];

  const queueTokens: QueueToken[] = [
    {
      id: 1,
      tokenNumber: 'MED001',
      status: 'in-progress',
      estimatedTime: 'Now',
      waitTime: '0 mins',
      customerName: 'John Silva',
      phoneNumber: '0771234567',
      serviceType: 'General Consultation',
      bookingTime: 'Today, 10:30 AM',
      queuePosition: 1
    },
    {
      id: 2,
      tokenNumber: 'MED002',
      status: 'waiting',
      estimatedTime: '11:45 AM',
      waitTime: '15 mins',
      customerName: 'Maria Perera',
      phoneNumber: '0772345678',
      serviceType: 'Diagnostic Tests',
      bookingTime: 'Today, 10:45 AM',
      queuePosition: 2
    },
    {
      id: 3,
      tokenNumber: 'MED003',
      status: 'waiting',
      estimatedTime: '12:00 PM',
      waitTime: '30 mins',
      customerName: 'Kamal Fernando',
      phoneNumber: '0773456789',
      serviceType: 'Specialist Consultation',
      bookingTime: 'Today, 11:00 AM',
      queuePosition: 3
    },
    {
      id: 4,
      tokenNumber: 'MED004',
      status: 'waiting',
      estimatedTime: '12:15 PM',
      waitTime: '45 mins',
      customerName: 'Nimal Rathnayake',
      phoneNumber: '0774567890',
      serviceType: 'General Consultation',
      bookingTime: 'Today, 11:15 AM',
      queuePosition: 4
    }
  ];

  const getStatusColor = (status: QueueToken['status']) => {
    switch(status) {
      case 'in-progress': return 'bg-green-100 text-green-800 border-green-200';
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPopularityColor = (popularity: ServiceOption['popularity']) => {
    switch(popularity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Tab content components
  const OverviewTab = () => (
    <div className="space-y-8">
      {/* About Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About this Business</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{business.description}</p>
        </div>
      </section>

      {/* Current Queue Stats */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Queue Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{business.currentQueueStats.totalWaiting}</div>
            <div className="text-sm font-medium">Currently Waiting</div>
            <div className="text-xs text-gray-500">In queue now</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{business.currentQueueStats.avgWaitTime}</div>
            <div className="text-sm font-medium">Avg Wait Time</div>
            <div className="text-xs text-gray-500">For current queue</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">{business.currentQueueStats.peakHours}</div>
            <div className="text-sm font-medium">Peak Hours</div>
            <div className="text-xs text-gray-500">Busiest time</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">{business.currentQueueStats.serviceSpeed}</div>
            <div className="text-sm font-medium">Service Speed</div>
            <div className="text-xs text-gray-500">Per customer</div>
          </div>
        </div>
      </section>

      {/* Live Queue Display */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Queue Display</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 px-6 py-3 text-sm font-medium text-gray-700">
            <div>Token No</div>
            <div>Customer</div>
            <div>Service</div>
            <div>Status</div>
          </div>
          {queueTokens.map((token) => (
            <div key={token.id} className="grid grid-cols-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="font-mono font-bold text-lg text-blue-700">{token.tokenNumber}</div>
              <div>
                <div className="font-medium">{token.customerName}</div>
                <div className="text-sm text-gray-500">{token.phoneNumber}</div>
              </div>
              <div className="text-sm">{token.serviceType}</div>
              <div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(token.status)}`}>
                  {token.status === 'in-progress' ? 'In Progress' : token.status}
                </span>
                {token.status === 'in-progress' && (
                  <span className="ml-2 inline-flex h-2 w-2 animate-ping rounded-full bg-green-400"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ServicesTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Service to Book Token</h3>
        <p className="text-gray-600">Choose from available services and book your queue token instantly</p>
      </div>
      {serviceOptions.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );

  const FacilitiesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Amenities & Facilities
          </h3>
          <ul className="space-y-2">
            {business.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Accepted Payments
          </h3>
          <ul className="space-y-2">
            {business.acceptedPayments.map((payment, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                {payment}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            Languages Spoken
          </h3>
          <ul className="space-y-2">
            {business.languages.map((language, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold mb-4">Opening Hours</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {Object.entries(business.openingHours).map(([day, hours]) => (
            <div key={day} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-medium capitalize">{day}</div>
              <div className="text-sm text-gray-600 mt-1">{hours}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LocationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-64 bg-gray-200 rounded-lg relative mb-6">
          <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">Business Location</div>
              <div className="text-sm text-gray-600">{business.contact.address}</div>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                Get Directions
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium">{business.contact.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{business.contact.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Website</div>
                  <div className="font-medium text-blue-600">{business.contact.website}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Nearby Facilities</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {business.nearby.map((place, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-700">{place.name}</span>
                    <div className="text-xs text-gray-500">{place.category}</div>
                  </div>
                  <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                    {place.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReviewsTab = () => (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="text-center md:text-left">
            <div className="text-4xl font-bold text-gray-900 mb-2">{business.rating}</div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <div className="font-semibold text-lg">Excellent</div>
            <div className="text-sm text-gray-600">{business.reviewCount} verified reviews</div>
          </div>
          
          <div className="flex-1">
            <div className="space-y-2">
              {['Queue Efficiency', 'Staff Service', 'Facility Cleanliness', 'Wait Time Accuracy', 'Overall Experience'].map((category, index) => (
                <div key={category} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-32">{category}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${80 + index * 3}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-8">{(4.0 + index * 0.2).toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {business.reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );

  const ServiceCard: React.FC<{ service: ServiceOption }> = ({ service }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 bg-blue-50 p-6 flex flex-col justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">₹{service.price}</div>
            <div className="text-sm text-gray-600">Service Fee</div>
            <div className="mt-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPopularityColor(service.popularity)}`}>
                {service.popularity} Demand
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{service.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span className="text-gray-600">{service.currentQueue} in queue</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Estimated Time</div>
                    <div className="text-gray-600">{service.estimatedTime}</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium">Requirements</div>
                  <ul className="text-gray-600 text-sm">
                    {service.requirements.map((req, idx) => (
                      <li key={idx} className="list-disc ml-4">• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 lg:text-right lg:pl-4">
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 w-full lg:w-auto transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  setSelectedService(service.id);
                  setSelectedTokenService(service.name);
                  setShowTokenModal(true);
                }}
              >
                <Calendar className="w-4 h-4" />
                Book Token
              </button>
              <div className="mt-2 text-sm text-gray-500">No booking fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
            {review.rating.toFixed(1)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{review.title}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>By {review.author}</span>
              {review.verified && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">Service: {review.serviceUsed}</div>
          </div>
        </div>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {review.likes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Check className="w-4 h-4" />
              <span className="font-medium">Positive experience</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {review.likes.map((like, index) => (
                <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                  {like}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {review.dislikes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <X className="w-4 h-4" />
              <span className="font-medium">Areas for improvement</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {review.dislikes.map((dislike, index) => (
                <span key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                  {dislike}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'services', label: 'Services & Booking', icon: '🎫' },
    { id: 'facilities', label: 'Facilities', icon: '🏢' },
    { id: 'location', label: 'Location & Contact', icon: '📍' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'services': return <ServicesTab />;
      case 'facilities': return <FacilitiesTab />;
      case 'location': return <LocationTab />;
      case 'reviews': return <ReviewsTab />;
      default: return <OverviewTab />;
    }
  };

  const BookTokenModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Book Queue Token</h3>
            <button
              onClick={() => setShowTokenModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-medium text-blue-900 mb-2">Service Selected</div>
              <div className="text-lg font-bold">{selectedTokenService}</div>
              <div className="text-sm text-blue-700 mt-2">Estimated wait: 15-25 minutes</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
              <p className="text-xs text-gray-500 mt-2">We'll send queue updates via SMS</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date & Time
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                  <div className="font-medium">Today</div>
                  <div className="text-sm text-gray-600">15-25 min wait</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50">
                  <div className="font-medium">Tomorrow</div>
                  <div className="text-sm text-gray-600">10-20 min wait</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">₹{serviceOptions.find(s => s.id === selectedService)?.price || 0}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">₹0</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{serviceOptions.find(s => s.id === selectedService)?.price || 0}</span>
              </div>
            </div>
            
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => {
                // Handle token booking logic
                alert(`Token booked successfully! You'll receive SMS updates.`);
                setShowTokenModal(false);
              }}
            >
              Confirm & Book Token
            </button>
            
            <p className="text-center text-sm text-gray-500">
              You can cancel up to 30 minutes before your estimated time
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to businesses</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Status Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-sm opacity-90">Current Queue Status</div>
              <div className="text-xl font-bold">{business.currentQueueStats.totalWaiting} people waiting</div>
              <div className="text-sm opacity-90">Avg wait: {business.currentQueueStats.avgWaitTime}</div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Live Chat</span>
                </div>
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  {business.businessType}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{business.rating}</span>
                  <span className="text-gray-600">({business.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{business.location}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                onClick={() => setActiveTab('services')}
              >
                <Calendar className="w-5 h-5" />
                Book Token Now
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Queue App
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          <div className="md:col-span-2 md:row-span-2">
            <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={business.images[0] || '/images/businesses/hospital-main.jpg'}
                alt={business.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {business.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-32 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`${business.name} ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {renderTabContent()}
        </div>

        {/* Business Policies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Policies</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Cancellation Policy
                </h3>
                <p className="text-sm text-gray-600">{business.policies.cancellation}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Booking Policy
                </h3>
                <p className="text-sm text-gray-600">{business.policies.booking}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Privacy Policy
                </h3>
                <p className="text-sm text-gray-600">{business.policies.privacy}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Other Policies
                </h3>
                <p className="text-sm text-gray-600">{business.policies.other}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600"></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Support
              </button>
              <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Live Chat
              </button>
              <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Token Modal */}
      {showTokenModal && <BookTokenModal />}
    </div>
  );
};

export default BusinessDetailPage;