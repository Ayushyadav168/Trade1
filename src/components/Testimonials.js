'use client'

import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      content: "TradeApp has completely transformed my trading experience. The interface is intuitive, and the execution speed is incredible. I've been able to make better investment decisions with their real-time data and analytics.",
      author: {
        name: 'Rajesh Kumar',
        role: 'Software Engineer',
        location: 'Bangalore',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      rating: 5,
    },
    {
      content: "As a beginner in mutual funds, TradeApp made everything so simple. The SIP calculator and educational resources helped me start my investment journey with confidence. Highly recommend!",
      author: {
        name: 'Priya Sharma',
        role: 'Marketing Manager',
        location: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      rating: 5,
    },
    {
      content: "The zero brokerage on equity delivery and competitive pricing on other segments makes TradeApp stand out. Their customer support is responsive and the platform is very reliable.",
      author: {
        name: 'Amit Patel',
        role: 'Business Owner',
        location: 'Ahmedabad',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      rating: 5,
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What our traders say about us
          </p>
        </div>
        
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, testimonialIdx) => (
              <div key={testimonialIdx} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <Quote className="h-8 w-8 text-blue-600 mb-4" />
                
                <blockquote className="text-gray-900">
                  <p className="text-sm leading-6">{testimonial.content}</p>
                </blockquote>
                
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <img
                    className="h-10 w-10 rounded-full bg-gray-50"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.author.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.author.location}</div>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-8">
            Ready to join thousands of successful traders?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Your Trading Journey
          </button>
        </div>
      </div>
    </div>
  )
}
