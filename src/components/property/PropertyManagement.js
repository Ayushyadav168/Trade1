'use client'

import React, { useState, useEffect } from 'react'
import { Home, MapPin, Calendar, DollarSign, User, Star, Filter, Search, Eye, Heart, TrendingUp, Phone, Mail } from 'lucide-react'

// Enhanced mock AMF-like data source with 100+ premium properties
const generateExtensivePropertyData = () => {
  const locations = [
    'Bandra West, Mumbai', 'Andheri East, Mumbai', 'Powai, Mumbai', 'Lower Parel, Mumbai', 'Worli, Mumbai',
    'Juhu, Mumbai', 'Versova, Mumbai', 'Malad West, Mumbai', 'Goregaon East, Mumbai', 'Thane West, Mumbai',
    'Whitefield, Bangalore', 'Koramangala, Bangalore', 'Indiranagar, Bangalore', 'Hebbal, Bangalore', 'Electronic City, Bangalore',
    'HSR Layout, Bangalore', 'Marathahalli, Bangalore', 'JP Nagar, Bangalore', 'Rajajinagar, Bangalore', 'Yelahanka, Bangalore',
    'Gurgaon Sector 45, Delhi NCR', 'Gurgaon Sector 56, Delhi NCR', 'Noida Sector 62, Delhi NCR', 'Faridabad, Delhi NCR', 'Greater Noida, Delhi NCR',
    'DLF Phase 1, Delhi NCR', 'Cyber City, Delhi NCR', 'MG Road, Gurgaon', 'Golf Course Road, Gurgaon', 'Sohna Road, Gurgaon',
    'Hitech City, Hyderabad', 'Kondapur, Hyderabad', 'Gachibowli, Hyderabad', 'Jubilee Hills, Hyderabad', 'Banjara Hills, Hyderabad',
    'Madhapur, Hyderabad', 'Kukatpally, Hyderabad', 'Miyapur, Hyderabad', 'Secunderabad, Hyderabad', 'Kompally, Hyderabad',
    'Anna Nagar, Chennai', 'T Nagar, Chennai', 'Adyar, Chennai', 'Velachery, Chennai', 'Porur, Chennai',
    'OMR, Chennai', 'Thoraipakkam, Chennai', 'Sholinganallur, Chennai', 'Tambaram, Chennai', 'Chrompet, Chennai',
    'Viman Nagar, Pune', 'Hinjewadi, Pune', 'Baner, Pune', 'Wakad, Pune', 'Aundh, Pune',
    'Kharadi, Pune', 'Magarpatta City, Pune', 'Koregaon Park, Pune', 'Camp Area, Pune', 'Hadapsar, Pune'
  ];

  const propertyTypes = ['Apartment', 'Villa', 'Studio', 'Penthouse', 'Townhouse', 'Duplex'];
  const bhkTypes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6+ BHK'];
  const developers = [
    'Lodha Group', 'Brigade Group', 'DLF Limited', 'Prestige Group', 'Godrej Properties',
    'Sobha Realty', 'Phoenix Mills', 'Oberoi Realty', 'Hiranandani Group', 'Mahindra Lifespace',
    'Puravankara', 'Embassy Group', 'Tata Housing', 'Shapoorji Pallonji', 'L&T Realty'
  ];
  
  const amenitiesList = [
    ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Clubhouse'],
    ['Gym', 'Parking', 'Security', 'Clubhouse', 'Garden', 'Play Area'],
    ['Private Pool', 'Garden', 'Parking', 'Security', 'Terrace', 'Home Theater'],
    ['Swimming Pool', 'Spa', 'Gym', 'Parking', 'Security', 'Concierge'],
    ['Gym', 'Parking', 'Security', 'Co-working', 'Cafe', 'Rooftop'],
    ['Swimming Pool', 'Tennis Court', 'Gym', 'Parking', 'Security', 'Golf Course'],
    ['Infinity Pool', 'Sky Lounge', 'Gym', 'Valet Parking', '24/7 Security', 'Private Elevator']
  ];

  const agentNames = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy',
    'Anita Gupta', 'Suresh Nair', 'Kavya Iyer', 'Rohit Agarwal', 'Deepika Joshi',
    'Arjun Mehta', 'Pooja Malhotra', 'Karthik Rao', 'Nisha Bansal', 'Varun Kapoor',
    'Ritu Saxena', 'Manish Tiwari', 'Shreya Das', 'Aditya Kulkarni', 'Meera Sinha'
  ];

  const properties = [];
  
  for (let i = 1; i <= 120; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const city = location.split(',')[1].trim();
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const bhk = bhkTypes[Math.floor(Math.random() * bhkTypes.length)];
    const developer = developers[Math.floor(Math.random() * developers.length)];
    const amenities = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
    const agent = agentNames[Math.floor(Math.random() * agentNames.length)];
    
    const basePrice = city === 'Mumbai' ? 
      Math.random() * 100000000 + 30000000 : // 3Cr - 13Cr for Mumbai
      city === 'Bangalore' || city === 'Delhi NCR' ? 
      Math.random() * 80000000 + 20000000 : // 2Cr - 10Cr for Bangalore/NCR
      Math.random() * 60000000 + 15000000; // 1.5Cr - 7.5Cr for other cities
    
    const sqft = type === 'Studio' ? 
      Math.random() * 400 + 350 : // 350-750 sqft
      type === 'Villa' || type === 'Penthouse' ? 
      Math.random() * 2000 + 2000 : // 2000-4000 sqft
      Math.random() * 1500 + 600; // 600-2100 sqft
    
    const rentPrice = Math.floor(basePrice * 0.0003 + Math.random() * basePrice * 0.0002);
    
    const property = {
      id: `PRP${String(i).padStart(3, '0')}`,
      title: `${type === 'Studio' ? 'Premium' : type === 'Villa' ? 'Luxury' : type === 'Penthouse' ? 'Ultra-Luxury' : 'Modern'} ${bhk} ${type}`,
      location: location,
      price: Math.floor(basePrice),
      rentPrice: rentPrice,
      type: type,
      bhk: bhk,
      sqft: Math.floor(sqft),
      status: Math.random() > 0.1 ? 'Available' : Math.random() > 0.5 ? 'Under Construction' : 'Sold Out',
      images: [
        `https://images.unsplash.com/photo-${1560000000000 + Math.floor(Math.random() * 100000000)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`
      ],
      amenities: amenities,
      description: `${type === 'Villa' ? 'Spacious luxury villa' : type === 'Penthouse' ? 'Ultra-premium penthouse' : type === 'Studio' ? 'Contemporary studio apartment' : 'Modern apartment'} with world-class amenities in prime ${city} location. ${type === 'Villa' ? 'Private gardens and premium finishes throughout.' : 'Excellent connectivity and lifestyle amenities.'}`,
      developer: developer,
      possessionDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      roi: Math.random() * 6 + 5, // 5-11% ROI
      appreciation: Math.random() * 15 + 8, // 8-23% appreciation
      rating: Math.random() * 1 + 4, // 4-5 star rating
      views: Math.floor(Math.random() * 1000 + 100), // 100-1100 views
      agent: {
        name: agent,
        phone: `+91-98765${String(Math.floor(Math.random() * 90000) + 10000)}`,
        email: `${agent.toLowerCase().replace(' ', '.')}@properties.com`,
        rating: Math.random() * 1 + 4,
        experience: Math.floor(Math.random() * 15 + 2) + '+ years',
        speciality: Math.random() > 0.5 ? 'Luxury Properties' : Math.random() > 0.5 ? 'Investment Properties' : 'Residential Properties'
      },
      features: [
        'Premium Location',
        'High ROI Potential',
        'Ready to Move',
        'Bank Loan Available',
        'RERA Approved'
      ],
      pricePerSqft: Math.floor(basePrice / sqft),
      floorPlan: `${bhk} configuration with optimized space utilization`,
      legalStatus: 'Clear Title',
      emi: Math.floor(basePrice * 0.01), // Approximate EMI
      category: Math.random() > 0.7 ? 'Premium' : Math.random() > 0.5 ? 'Luxury' : 'Standard'
    };
    
    properties.push(property);
  }
  
  return properties;
};

const mockPropertyData = generateExtensivePropertyData();

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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Premium Badge */}
        {property.category === 'Premium' && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-xs font-bold">
            🏆 PREMIUM
          </div>
        )}
        {property.category === 'Luxury' && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            👑 LUXURY
          </div>
        )}
        
        <button
          onClick={() => handleFavorite(property.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${
            favorites.includes(property.id) 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600'
          } hover:scale-110 transition-all duration-200 shadow-lg`}
        >
          <Heart className="h-5 w-5" fill={favorites.includes(property.id) ? 'white' : 'none'} />
        </button>
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.type}
          </div>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs">
            <Eye className="h-3 w-3" />
            {property.views} views
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-sm">{property.location}</span>
          </div>
        </div>

        {/* Property Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
          <div className="text-center bg-blue-50 rounded-lg p-2">
            <div className="font-semibold text-blue-700">{property.bhk}</div>
            <div className="text-xs text-gray-600">Configuration</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg p-2">
            <div className="font-semibold text-green-700">{property.sqft}</div>
            <div className="text-xs text-gray-600">Sq Ft</div>
          </div>
          <div className="text-center bg-purple-50 rounded-lg p-2">
            <div className="font-semibold text-purple-700">₹{(property.pricePerSqft/1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-600">Per Sq Ft</div>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-2xl font-bold text-green-700">{formatPrice(property.price)}</div>
              <div className="text-sm text-gray-600">Sale Price</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-700">₹{property.rentPrice.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Monthly Rent</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-600">{property.roi.toFixed(1)}% ROI</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-green-600">+{property.appreciation.toFixed(1)}% Growth</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-purple-600">₹{(property.emi/1000).toFixed(0)}K EMI</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                ✓ {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Agent Info */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">{property.agent.name}</div>
              <div className="text-xs text-gray-600">{property.agent.speciality}</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium">{property.agent.rating.toFixed(1)}</span>
              </div>
              <div className="text-xs text-gray-600">{property.agent.experience}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProperty(property)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
          <button
            onClick={() => handleBookVisit(property)}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
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