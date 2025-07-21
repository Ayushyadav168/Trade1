'use client'

import React, { useState, useEffect } from 'react'
import { Home, MapPin, Calendar, DollarSign, User, Star, Filter, Search, Eye, Heart, TrendingUp, Phone, Mail } from 'lucide-react'

// Mock AMF-like data source for properties
const mockPropertyData = [
  {
    id: 'PRP001',
    title: 'Luxury 3BHK Apartment',
    location: 'Bandra West, Mumbai',
    price: 85000000,
    rentPrice: 85000,
    type: 'Apartment',
    bhk: '3 BHK',
    sqft: 1250,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
    description: 'Spacious 3BHK apartment with modern amenities and sea view.',
    developer: 'Lodha Group',
    possessionDate: '2024-12-01',
    roi: 8.5,
    appreciation: 15.2,
    agent: {
      name: 'Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'rajesh@properties.com'
    }
  },
  {
    id: 'PRP002',
    title: 'Modern 2BHK Flat',
    location: 'Whitefield, Bangalore',
    price: 45000000,
    rentPrice: 35000,
    type: 'Apartment',
    bhk: '2 BHK',
    sqft: 980,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Gym', 'Parking', 'Security', 'Clubhouse', 'Garden'],
    description: 'Contemporary 2BHK flat in tech hub with excellent connectivity.',
    developer: 'Brigade Group',
    possessionDate: '2025-03-01',
    roi: 7.8,
    appreciation: 12.5,
    agent: {
      name: 'Priya Sharma',
      phone: '+91-9876543211',
      email: 'priya@properties.com'
    }
  },
  {
    id: 'PRP003',
    title: 'Spacious 4BHK Villa',
    location: 'Gurgaon, Delhi NCR',
    price: 125000000,
    rentPrice: 120000,
    type: 'Villa',
    bhk: '4 BHK',
    sqft: 2500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Private Pool', 'Garden', 'Parking', 'Security', 'Terrace'],
    description: 'Luxurious 4BHK villa with private amenities and premium location.',
    developer: 'DLF Limited',
    possessionDate: '2024-10-15',
    roi: 9.2,
    appreciation: 18.3,
    agent: {
      name: 'Amit Singh',
      phone: '+91-9876543212',
      email: 'amit@properties.com'
    }
  },
  {
    id: 'PRP004',
    title: 'Premium 1BHK Studio',
    location: 'Koramangala, Bangalore',
    price: 25000000,
    rentPrice: 25000,
    type: 'Studio',
    bhk: '1 BHK',
    sqft: 650,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Gym', 'Parking', 'Security', 'Co-working'],
    description: 'Modern studio apartment perfect for young professionals.',
    developer: 'Prestige Group',
    possessionDate: '2024-08-01',
    roi: 6.5,
    appreciation: 10.8,
    agent: {
      name: 'Sneha Patel',
      phone: '+91-9876543213',
      email: 'sneha@properties.com'
    }
  }
]

export default function PropertyManagement() {
  const [properties, setProperties] = useState(mockPropertyData)
  const [filteredProperties, setFilteredProperties] = useState(mockPropertyData)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [sortBy, setSortBy] = useState('price')
  const [favorites, setFavorites] = useState([])
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingData, setBookingData] = useState({
    propertyId: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  // Filter and search logic
  useEffect(() => {
    let filtered = properties

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== 'All') {
      filtered = filtered.filter(property => property.type === filterType)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'sqft':
          return b.sqft - a.sqft
        case 'roi':
          return b.roi - a.roi
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }, [searchTerm, filterType, sortBy, properties])

  const handleBookVisit = (property) => {
    setBookingData({ ...bookingData, propertyId: property.id })
    setShowBookingModal(true)
  }

  const handleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    }
    return `₹${price.toLocaleString()}`
  }

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => handleFavorite(property.id)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            favorites.includes(property.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:scale-110 transition-transform`}
        >
          <Heart className="h-4 w-4" fill={favorites.includes(property.id) ? 'white' : 'none'} />
        </button>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          {property.type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div>{property.bhk}</div>
          <div>{property.sqft} sqft</div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-lg font-bold text-green-600">{formatPrice(property.price)}</div>
            <div className="text-sm text-gray-500">Rent: ₹{property.rentPrice.toLocaleString()}/month</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-600">ROI: {property.roi}%</div>
            <div className="text-xs text-green-600">+{property.appreciation}% appreciation</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProperty(property)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
          <button
            onClick={() => handleBookVisit(property)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Book Visit
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
        <p className="text-gray-600">Discover and invest in premium real estate properties</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Sort by Price</option>
            <option value="sqft">Sort by Area</option>
            <option value="roi">Sort by ROI</option>
          </select>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{filteredProperties.length} properties found</span>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedProperty.images[0]} 
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProperty.title}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedProperty.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Property Type</div>
                      <div className="font-semibold">{selectedProperty.type}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Configuration</div>
                      <div className="font-semibold">{selectedProperty.bhk}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Area</div>
                      <div className="font-semibold">{selectedProperty.sqft} sqft</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Status</div>
                      <div className="font-semibold text-green-600">{selectedProperty.status}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedProperty.description}</p>
                  </div>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sale Price</span>
                        <span className="font-bold text-green-600">{formatPrice(selectedProperty.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Rent</span>
                        <span className="font-semibold">₹{selectedProperty.rentPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI</span>
                        <span className="font-semibold text-blue-600">{selectedProperty.roi}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Appreciation</span>
                        <span className="font-semibold text-green-600">+{selectedProperty.appreciation}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Possession</span>
                        <span className="font-semibold">{new Date(selectedProperty.possessionDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Contact Agent</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{selectedProperty.agent.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedProperty.agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{selectedProperty.agent.email}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProperty(null)
                      handleBookVisit(selectedProperty)
                    }}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    Book Site Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book Property Visit</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  >
                    <option value="">Select Time</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-20"
                  value={bookingData.message}
                  onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault()
                    // Handle booking submission here
                    alert('Booking request submitted successfully!')
                    setShowBookingModal(false)
                    setBookingData({
                      propertyId: '',
                      date: '',
                      time: '',
                      name: '',
                      phone: '',
                      email: '',
                      message: ''
                    })
                  }}
                >
                  Book Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}