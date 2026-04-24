"use client";

import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  CreditCard,
  Shield,
  Smartphone,
  Mail,
  User,
  Phone,
  AlertCircle,
  FileText,
  Lock,
  Download,
  Printer,
  Share2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ServiceOption {
  id: number;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
  requirements: string[];
}

interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  idType: string;
  idNumber: string;
  specialRequirements: string;
}

const TokenBookingForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [serviceType, setServiceType] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phoneNumber: '',
    email: '',
    idType: 'NIC',
    idNumber: '',
    specialRequirements: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [generatedToken, setGeneratedToken] = useState<string>('MED00123');

  const businessInfo = {
    name: 'Colombo General Hospital',
    location: 'Colombo 08',
    businessType: 'Health',
    currentQueue: 42,
    avgWaitTime: '15-25 mins',
  };

  const serviceOptions: ServiceOption[] = [
    {
      id: 1,
      name: 'General Consultation',
      description: 'Routine medical checkup with general physician',
      price: 1500,
      estimatedTime: '15-20 mins',
      requirements: ['Previous medical records (if any)'],
    },
    {
      id: 2,
      name: 'Emergency Service',
      description: 'Immediate medical attention for urgent cases',
      price: 3000,
      estimatedTime: '10-15 mins',
      requirements: ['Priority service for emergencies'],
    },
    {
      id: 3,
      name: 'Diagnostic Tests',
      description: 'Blood tests, X-rays, and other diagnostic procedures',
      price: 2500,
      estimatedTime: '30-45 mins',
      requirements: ['Doctor\'s prescription', 'Fasting (if required)'],
    },
    {
      id: 4,
      name: 'Specialist Consultation',
      description: 'Consultation with specialized doctors',
      price: 3500,
      estimatedTime: '20-30 mins',
      requirements: ['Referral letter', 'Previous test results'],
    },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  ];

  const steps = [
    { number: 1, title: 'Select Service', icon: '🎯' },
    { number: 2, title: 'Choose Time', icon: '⏰' },
    { number: 3, title: 'Your Details', icon: '👤' },
    { number: 4, title: 'Payment', icon: '💳' },
    { number: 5, title: 'Confirmation', icon: '✅' },
  ];

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const service = serviceOptions.find(s => s.name === serviceType);
    return service ? service.price : 0;
  };

  const handleConfirmBooking = () => {
    // In real app, this would call an API
    setBookingConfirmed(true);
    setCurrentStep(5);
    setGeneratedToken(`TK${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const StepProgress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step.number === currentStep 
                ? 'bg-blue-600 text-white border-2 border-blue-600' 
                : step.number < currentStep
                ? 'bg-green-100 text-green-600 border-2 border-green-600'
                : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
            }`}>
              {step.number < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span>{step.icon}</span>
              )}
            </div>
            <span className={`text-xs font-medium ${
              step.number === currentStep ? 'text-blue-600' : 
              step.number < currentStep ? 'text-green-600' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep - 1) * 25}%` }}
        ></div>
      </div>
    </div>
  );

  const Step1SelectService = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Business Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Business</div>
            <div className="font-medium">{businessInfo.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Current Queue</div>
            <div className="font-medium text-blue-700">{businessInfo.currentQueue} people</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Type</div>
            <div className="font-medium">{businessInfo.businessType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Avg Wait Time</div>
            <div className="font-medium">{businessInfo.avgWaitTime}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Service Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceOptions.map((service) => (
            <div
              key={service.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                serviceType === service.name 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setServiceType(service.name)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>
                <div className="text-lg font-bold text-blue-700">₹{service.price}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{service.estimatedTime}</span>
                </div>
                {service.requirements.length > 0 && (
                  <div className="text-gray-500">
                    Requirements: {service.requirements.length}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {serviceType && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-green-800">Service Selected</div>
              <div className="text-green-700">{serviceType}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Step2ChooseTime = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {['Today', 'Tomorrow', 'Day After', 'Custom Date'].map((date) => (
              <button
                key={date}
                className={`py-3 px-4 rounded-lg border text-center ${
                  selectedDate === date
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="font-medium">{date}</div>
                {date === 'Today' && <div className="text-sm text-gray-600">15-25 min wait</div>}
                {date === 'Tomorrow' && <div className="text-sm text-gray-600">10-20 min wait</div>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Select Time Slot
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`py-2 px-3 rounded-lg border text-sm ${
                  selectedTime === time
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <h4 className="font-medium text-blue-900 mb-2">📋 Time Slot Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Selected Date:</div>
            <div className="font-medium">{selectedDate}</div>
          </div>
          <div>
            <div className="text-gray-600">Selected Time:</div>
            <div className="font-medium">{selectedTime}</div>
          </div>
          <div>
            <div className="text-gray-600">Estimated Wait:</div>
            <div className="font-medium text-green-600">15-25 minutes</div>
          </div>
          <div>
            <div className="text-gray-600">Queue Position:</div>
            <div className="font-medium">Approx. #{businessInfo.currentQueue + 1}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const Step3CustomerDetails = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Booking Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Service</div>
            <div className="font-medium">{serviceType}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Date & Time</div>
            <div className="font-medium">{selectedDate}, {selectedTime}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Business</div>
            <div className="font-medium">{businessInfo.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Estimated Wait</div>
            <div className="font-medium">{businessInfo.avgWaitTime}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              value={customerInfo.fullName}
              onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={customerInfo.phoneNumber}
              onChange={(e) => handleCustomerInfoChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address
          </label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email for notifications"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Type
            </label>
            <select
              value={customerInfo.idType}
              onChange={(e) => handleCustomerInfoChange('idType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="NIC">National ID Card</option>
              <option value="Passport">Passport</option>
              <option value="Driving">Driving License</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Number
            </label>
            <input
              type="text"
              value={customerInfo.idNumber}
              onChange={(e) => handleCustomerInfoChange('idNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ID number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements (Optional)
          </label>
          <textarea
            value={customerInfo.specialRequirements}
            onChange={(e) => handleCustomerInfoChange('specialRequirements', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special needs or requirements..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const Step4Payment = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="font-medium">₹{calculateTotal()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-medium">₹0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">₹0</span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-blue-700">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className={`p-4 border rounded-xl flex items-center gap-3 ${
              paymentMethod === 'card' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-sm text-gray-600">Pay securely with card</div>
            </div>
          </button>
          
          <button
            className={`p-4 border rounded-xl flex items-center gap-3 ${
              paymentMethod === 'digital' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('digital')}
          >
            <Smartphone className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <div className="font-medium">Digital Wallet</div>
              <div className="text-sm text-gray-600">eZ Cash, mCash, etc.</div>
            </div>
          </button>
          
          <button
            className={`p-4 border rounded-xl flex items-center gap-3 ${
              paymentMethod === 'cod' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('cod')}
          >
            <FileText className="w-6 h-6 text-orange-600" />
            <div className="text-left">
              <div className="font-medium">Pay at Counter</div>
              <div className="text-sm text-gray-600">Pay when you arrive</div>
            </div>
          </button>
          
          <button
            className={`p-4 border rounded-xl flex items-center gap-3 ${
              paymentMethod === 'bank' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('bank')}
          >
            <CreditCard className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <div className="font-medium">Bank Transfer</div>
              <div className="text-sm text-gray-600">Direct bank payment</div>
            </div>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the Terms of Service and Privacy Policy. I understand that I can cancel my token up to 30 minutes before the estimated time without penalty.
          </label>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <div className="font-medium">Important Notes:</div>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Arrive 5 minutes before your estimated time</li>
                <li>Bring valid ID for verification</li>
                <li>Cancellation is free up to 30 minutes before your slot</li>
                <li>You'll receive SMS updates about queue status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Step5Confirmation = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Token Booked Successfully!</h2>
      <p className="text-gray-600 mb-8">Your queue token has been booked and confirmed</p>

      <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200 p-6 max-w-md mx-auto mb-8">
        <div className="text-4xl font-bold text-blue-700 mb-2">{generatedToken}</div>
        <div className="text-sm text-gray-600 mb-4">Your Queue Token Number</div>
        
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{serviceType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">{selectedDate}, {selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Business:</span>
            <span className="font-medium">{businessInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Wait:</span>
            <span className="font-medium text-green-600">15-25 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Queue Position:</span>
            <span className="font-medium">Approx. #{businessInfo.currentQueue + 1}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="text-sm text-gray-600">
          We've sent confirmation to {customerInfo.phoneNumber}
          {customerInfo.email && ` and ${customerInfo.email}`}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download Token
          </button>
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" />
            Print Token
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Token
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Your token will be active 30 minutes before your scheduled time
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SelectService />;
      case 2: return <Step2ChooseTime />;
      case 3: return <Step3CustomerDetails />;
      case 4: return <Step4Payment />;
      case 5: return <Step5Confirmation />;
      default: return <Step1SelectService />;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return serviceType !== '';
      case 2: return selectedDate !== '' && selectedTime !== '';
      case 3: return customerInfo.fullName !== '' && customerInfo.phoneNumber !== '';
      case 4: return agreeTerms;
      case 5: return bookingConfirmed;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Book Queue Token</h1>
              <p className="text-xs text-gray-600">Step {currentStep} of 5</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <StepProgress />

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons (Hidden on confirmation) */}
        {currentStep < 5 && (
          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
              disabled={currentStep === 1}
            >
              Back
            </button>
            
            <button
              onClick={currentStep === 4 ? handleConfirmBooking : handleNextStep}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-lg font-semibold ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 4 ? 'Confirm & Book Token' : 'Continue'}
            </button>
          </div>
        )}

        {/* Security & Support */}
        {currentStep < 5 && (
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600" />
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Help Footer */}
      {currentStep < 5 && (
        <div className="bg-gray-50 border-t border-gray-200 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  <Phone className="inline w-3 h-3 mr-1" />
                  Call: 011-234-5678
                </button>
                <span className="hidden sm:inline text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  <Mail className="inline w-3 h-3 mr-1" />
                  Email Support
                </button>
                <span className="hidden sm:inline text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  <FileText className="inline w-3 h-3 mr-1" />
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenBookingForm;
