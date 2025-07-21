'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, Mail, MapPin, MessageSquare, CheckCircle, AlertCircle, Filter } from 'lucide-react'

// Enhanced mock data for 100+ consultants and expanded booking system
const generateExtensiveConsultantData = () => {
  const firstNames = [
    'Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Suresh', 'Kavya', 'Rohit', 'Deepika',
    'Arjun', 'Pooja', 'Karthik', 'Nisha', 'Varun', 'Ritu', 'Manish', 'Shreya', 'Aditya', 'Meera',
    'Sanjay', 'Divya', 'Ravi', 'Sunita', 'Ashish', 'Neha', 'Prakash', 'Swati', 'Rahul', 'Anjali',
    'Krishna', 'Madhuri', 'Vinod', 'Preeti', 'Naveen', 'Rekha', 'Santosh', 'Vidya', 'Manoj', 'Seema',
    'Rajiv', 'Geeta', 'Sunil', 'Lata', 'Mukesh', 'Kiran', 'Dinesh', 'Vandana', 'Ramesh', 'Shobha'
  ];
  
  const lastNames = [
    'Kumar', 'Sharma', 'Singh', 'Patel', 'Reddy', 'Gupta', 'Nair', 'Iyer', 'Agarwal', 'Joshi',
    'Mehta', 'Malhotra', 'Rao', 'Bansal', 'Kapoor', 'Saxena', 'Tiwari', 'Das', 'Kulkarni', 'Sinha',
    'Verma', 'Mishra', 'Pandey', 'Chauhan', 'Jain', 'Shah', 'Ghosh', 'Pillai', 'Bhat', 'Menon'
  ];

  const consultantTypes = [
    'Trading Expert', 'Investment Advisor', 'Property Expert', 'Mutual Fund Specialist', 
    'ETF Specialist', 'Derivatives Expert', 'Technical Analyst', 'Fundamental Analyst',
    'Portfolio Manager', 'Risk Management Expert', 'Commodity Expert', 'Forex Specialist',
    'Real Estate Advisor', 'Tax Planning Expert', 'Retirement Planning Expert', 'Insurance Advisor'
  ];

  const specializations = [
    'Stock Trading & Portfolio Management', 'Real Estate Investment & Property Management',
    'Mutual Funds & ETF Investment', 'Derivatives & Options Trading', 'Technical Analysis & Chart Patterns',
    'Fundamental Analysis & Value Investing', 'Risk Management & Portfolio Optimization',
    'Commodity Trading & Precious Metals', 'Currency Trading & Global Markets',
    'Tax-Efficient Investment Strategies', 'Retirement & Pension Planning',
    'Insurance & Health Investment Plans', 'Cryptocurrency & Digital Assets',
    'ESG & Sustainable Investing', 'International Markets & Global Funds',
    'IPO Analysis & New Issue Investments', 'Debt Instruments & Fixed Income',
    'Alternative Investments & REITs', 'Small Cap & Mid Cap Specialization',
    'High Net Worth Investment Strategies'
  ];

  const cities = ['Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
  
  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

  const consultants = [];

  for (let i = 1; i <= 150; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const type = consultantTypes[Math.floor(Math.random() * consultantTypes.length)];
    const specialization = specializations[Math.floor(Math.random() * specializations.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const experience = Math.floor(Math.random() * 15 + 3);
    const rating = (Math.random() * 1 + 4).toFixed(1);
    
    // Generate available slots (6-12 slots per consultant)
    const numSlots = Math.floor(Math.random() * 7 + 6);
    const availableSlots = [];
    const shuffledSlots = [...timeSlots].sort(() => 0.5 - Math.random());
    for (let j = 0; j < numSlots; j++) {
      availableSlots.push(shuffledSlots[j]);
    }
    availableSlots.sort();

    const consultant = {
      id: `CONS${String(i).padStart(3, '0')}`,
      name: name,
      type: type,
      specialization: specialization,
      rating: parseFloat(rating),
      experience: `${experience}+ years`,
      phone: `+91-98765${String(Math.floor(Math.random() * 90000) + 10000)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@tradepro.com`,
      image: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1560250097' : '1573496359'}-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80`,
      availableSlots: availableSlots,
      city: city,
      languages: ['English', 'Hindi', Math.random() > 0.6 ? 'Tamil' : Math.random() > 0.5 ? 'Telugu' : 'Marathi'],
      education: Math.random() > 0.7 ? 'MBA Finance, CFA' : Math.random() > 0.5 ? 'MBA, FRM' : 'M.Com, NISM Certified',
      consultationFee: Math.floor(Math.random() * 3000 + 1000), // ₹1000-₹4000
      successRate: Math.floor(Math.random() * 15 + 85), // 85-100%
      clientsServed: Math.floor(Math.random() * 2000 + 100), // 100-2100 clients
      totalExperience: `${experience} years in ${type.toLowerCase()}`,
      achievements: [
        'Top Performer 2023',
        'Client Satisfaction Award',
        'Excellence in Advisory',
        '1000+ Happy Clients'
      ].slice(0, Math.floor(Math.random() * 3 + 2)),
      availability: Math.random() > 0.2 ? 'Available Today' : 'Available Tomorrow',
      premium: Math.random() > 0.8 ? true : false,
      verified: Math.random() > 0.1 ? true : false
    };

    consultants.push(consultant);
  }

  return consultants;
};

const mockConsultants = generateExtensiveConsultantData();

// Enhanced mock bookings with more comprehensive data
const generateExtensiveBookingData = () => {
  const bookingTypes = ['Trading Consultation', 'Property Visit', 'Investment Planning', 'Portfolio Review', 'Risk Assessment', 'Tax Planning'];
  const statuses = ['Confirmed', 'Pending', 'Completed', 'Cancelled', 'Rescheduled'];
  const clientNames = [
    'John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown',
    'Sarah Wilson', 'David Miller', 'Lisa Garcia', 'James Rodriguez', 'Maria Martinez',
    'Christopher Lee', 'Amanda Taylor', 'Daniel Anderson', 'Jessica Thomas', 'Matthew Jackson'
  ];

  const bookings = [];
  const today = new Date();

  for (let i = 1; i <= 200; i++) {
    // Generate random date within last 30 days and next 60 days
    const randomDays = Math.floor(Math.random() * 90 - 30);
    const bookingDate = new Date(today);
    bookingDate.setDate(today.getDate() + randomDays);

    const consultant = mockConsultants[Math.floor(Math.random() * mockConsultants.length)];
    const bookingType = bookingTypes[Math.floor(Math.random() * bookingTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const clientName = clientNames[Math.floor(Math.random() * clientNames.length)];
    
    const booking = {
      id: `BOOK${String(i).padStart(3, '0')}`,
      consultantId: consultant.id,
      consultantName: consultant.name,
      consultantType: consultant.type,
      type: bookingType,
      date: bookingDate.toISOString().split('T')[0],
      time: consultant.availableSlots[Math.floor(Math.random() * consultant.availableSlots.length)],
      status: status,
      clientName: clientName,
      clientPhone: `+91-98765${String(Math.floor(Math.random() * 90000) + 10000)}`,
      clientEmail: `${clientName.toLowerCase().replace(' ', '.')}@example.com`,
      notes: bookingType === 'Property Visit' ? 
        `Property viewing for ${Math.random() > 0.5 ? '3BHK apartment' : '2BHK flat'} in ${consultant.city}` :
        bookingType === 'Investment Planning' ?
        'Comprehensive investment strategy discussion' :
        `${bookingType} session with detailed analysis`,
      location: bookingType === 'Property Visit' ? 
        `${consultant.city} Premium Location` : 
        `TradePro Office, ${consultant.city}`,
      duration: Math.floor(Math.random() * 60 + 30), // 30-90 minutes
      meetingMode: Math.random() > 0.4 ? 'In-Person' : Math.random() > 0.5 ? 'Video Call' : 'Phone Call',
      consultationFee: consultant.consultationFee,
      paymentStatus: status === 'Confirmed' ? 'Paid' : status === 'Pending' ? 'Pending' : 'N/A',
      rating: status === 'Completed' ? Math.floor(Math.random() * 2 + 4) : null, // 4-5 stars for completed
      feedback: status === 'Completed' ? 'Excellent consultation with valuable insights' : null
    };

    bookings.push(booking);
  }

  return bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const mockBookings = generateExtensiveBookingData();

export default function MeetingBookingSystem() {
  const [activeTab, setActiveTab] = useState('book') // book, manage
  const [selectedConsultant, setSelectedConsultant] = useState(null)
  const [bookingType, setBookingType] = useState('trading') // trading, property
  const [filteredConsultants, setFilteredConsultants] = useState(mockConsultants)
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    meetingType: 'consultation', // consultation, property-visit
    subject: '',
    notes: '',
    location: '' // for property visits
  })

  // Filter consultants based on booking type
  useEffect(() => {
    let filtered = mockConsultants
    if (bookingType === 'trading') {
      filtered = mockConsultants.filter(c => c.type === 'Trading Expert' || c.type === 'Investment Advisor')
    } else if (bookingType === 'property') {
      filtered = mockConsultants.filter(c => c.type === 'Property Expert')
    }
    setFilteredConsultants(filtered)
  }, [bookingType])

  // Generate available dates (next 30 days excluding weekends)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  const availableDates = generateAvailableDates()

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    
    const newBooking = {
      id: `BOOK${String(bookings.length + 1).padStart(3, '0')}`,
      consultantId: selectedConsultant.id,
      consultantName: selectedConsultant.name,
      type: bookingForm.meetingType === 'consultation' ? 'Trading Consultation' : 'Property Visit',
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmed',
      clientName: bookingForm.name,
      clientPhone: bookingForm.phone,
      clientEmail: bookingForm.email,
      notes: bookingForm.notes,
      subject: bookingForm.subject,
      location: bookingForm.location
    }

    setBookings([...bookings, newBooking])
    setShowBookingModal(false)
    setBookingForm({
      name: '',
      phone: '',
      email: '',
      meetingType: 'consultation',
      subject: '',
      notes: '',
      location: ''
    })
    setSelectedDate('')
    setSelectedTime('')
    setSelectedConsultant(null)
    
    alert('Meeting booked successfully!')
  }

  const ConsultantCard = ({ consultant }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Premium Badge */}
      {consultant.premium && (
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-center py-1 text-xs font-bold">
          ⭐ PREMIUM CONSULTANT
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={consultant.image}
              alt={consultant.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
            />
            {consultant.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{consultant.name}</h3>
            <p className="text-blue-600 font-semibold text-sm">{consultant.type}</p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{consultant.specialization}</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold text-gray-800">{consultant.rating}</span>
                <span className="text-gray-500 text-sm">({consultant.clientsServed}+ clients)</span>
              </div>
              <span className="text-green-600 text-sm font-medium">{consultant.availability}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Details */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-blue-600 font-semibold">Experience</div>
            <div className="text-gray-800">{consultant.experience}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-green-600 font-semibold">Success Rate</div>
            <div className="text-gray-800">{consultant.successRate}%</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-purple-600 font-semibold">Fee</div>
            <div className="text-gray-800">₹{consultant.consultationFee}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-orange-600 font-semibold">Location</div>
            <div className="text-gray-800">{consultant.city}</div>
          </div>
        </div>

        {/* Education & Languages */}
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-1">Education</div>
          <div className="text-sm font-medium text-gray-800">{consultant.education}</div>
          <div className="text-xs text-gray-600 mt-2 mb-1">Languages</div>
          <div className="flex gap-1">
            {consultant.languages.map((lang, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Available Slots Preview */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Today's Available Slots:</p>
          <div className="flex flex-wrap gap-1">
            {consultant.availableSlots.slice(0, 6).map(slot => (
              <span key={slot} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {slot}
              </span>
            ))}
            {consultant.availableSlots.length > 6 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{consultant.availableSlots.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {consultant.achievements.slice(0, 2).map((achievement, idx) => (
              <span key={idx} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                🏆 {achievement}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedConsultant(consultant)
              setShowBookingModal(true)
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Calendar className="h-4 w-4" />
            Book Now
          </button>
          <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            <MessageSquare className="h-4 w-4" />
          </button>
          <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.type}</h3>
          <p className="text-gray-600">with {booking.consultantName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(booking.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-4 w-4" />
          <span>{booking.clientName}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{booking.clientPhone}</span>
        </div>
      </div>

      {booking.location && (
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{booking.location}</span>
        </div>
      )}

      {booking.notes && (
        <div className="bg-gray-50 rounded p-3">
          <p className="text-sm text-gray-600">{booking.notes}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Booking System</h1>
        <p className="text-gray-600">Book consultations for trading advice or property visits</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('book')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'book'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Book Meeting
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'manage'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Bookings
          </button>
        </nav>
      </div>

      {activeTab === 'book' && (
        <div>
          {/* Booking Type Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Consultation Type</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setBookingType('trading')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  bookingType === 'trading'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trading & Investment
              </button>
              <button
                onClick={() => setBookingType('property')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  bookingType === 'property'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Property Consultation
              </button>
              <button
                onClick={() => setBookingType('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  bookingType === 'all'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Experts
              </button>
            </div>
          </div>

          {/* Consultants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsultants.map(consultant => (
              <ConsultantCard key={consultant.id} consultant={consultant} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Bookings</h3>
            <div className="text-sm text-gray-600">{bookings.length} total bookings</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bookings found</p>
              <button
                onClick={() => setActiveTab('book')}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Book Your First Meeting
              </button>
            </div>
          )}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedConsultant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Book Meeting</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConsultant.image}
                  alt={selectedConsultant.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedConsultant.name}</h4>
                  <p className="text-sm text-blue-600">{selectedConsultant.type}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.meetingType}
                  onChange={(e) => setBookingForm({...bookingForm, meetingType: e.target.value})}
                  required
                >
                  <option value="consultation">Consultation</option>
                  <option value="property-visit">Property Visit</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  >
                    <option value="">Select Date</option>
                    {availableDates.slice(0, 14).map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select Time</option>
                    {selectedConsultant.availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingForm.subject}
                  onChange={(e) => setBookingForm({...bookingForm, subject: e.target.value})}
                  placeholder="e.g., Portfolio review, Property investment guidance"
                  required
                />
              </div>

              {bookingForm.meetingType === 'property-visit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                    placeholder="Property address for visit"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-20"
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Book Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}