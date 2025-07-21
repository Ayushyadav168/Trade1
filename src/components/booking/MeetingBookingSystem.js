'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, Mail, MapPin, MessageSquare, CheckCircle, AlertCircle, Filter } from 'lucide-react'

// Mock data for available slots and consultants
const mockConsultants = [
  {
    id: 'CONS001',
    name: 'Rajesh Kumar',
    type: 'Trading Expert',
    specialization: 'Stock Trading & Portfolio Management',
    rating: 4.8,
    experience: '8+ years',
    phone: '+91-9876543210',
    email: 'rajesh@tradepro.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    availableSlots: ['10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: 'CONS002',
    name: 'Priya Sharma',
    type: 'Property Expert',
    specialization: 'Real Estate Investment & Property Management',
    rating: 4.9,
    experience: '10+ years',
    phone: '+91-9876543211',
    email: 'priya@tradepro.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    availableSlots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
  },
  {
    id: 'CONS003',
    name: 'Amit Singh',
    type: 'Investment Advisor',
    specialization: 'Mutual Funds & ETF Investment',
    rating: 4.7,
    experience: '6+ years',
    phone: '+91-9876543212',
    email: 'amit@tradepro.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    availableSlots: ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00']
  }
]

const mockBookings = [
  {
    id: 'BOOK001',
    consultantId: 'CONS001',
    consultantName: 'Rajesh Kumar',
    type: 'Trading Consultation',
    date: '2024-07-25',
    time: '10:00',
    status: 'Confirmed',
    clientName: 'John Doe',
    clientPhone: '+91-9876543220',
    clientEmail: 'john@example.com',
    notes: 'Portfolio review and investment strategy discussion'
  },
  {
    id: 'BOOK002',
    consultantId: 'CONS002',
    consultantName: 'Priya Sharma',
    type: 'Property Visit',
    date: '2024-07-26',
    time: '14:00',
    status: 'Confirmed',
    clientName: 'Jane Smith',
    clientPhone: '+91-9876543221',
    clientEmail: 'jane@example.com',
    notes: 'Property viewing for 3BHK apartment in Bandra',
    location: 'Bandra West, Mumbai'
  }
]

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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={consultant.image}
          alt={consultant.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{consultant.name}</h3>
          <p className="text-blue-600 font-medium">{consultant.type}</p>
          <p className="text-gray-600 text-sm mt-1">{consultant.specialization}</p>
          
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{consultant.rating}</span>
            </div>
            <span>{consultant.experience}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{consultant.phone}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Available Slots Today:</p>
        <div className="flex flex-wrap gap-2">
          {consultant.availableSlots.slice(0, 4).map(slot => (
            <span key={slot} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {slot}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setSelectedConsultant(consultant)
          setShowBookingModal(true)
        }}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        Book Meeting
      </button>
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