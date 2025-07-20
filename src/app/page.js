'use client'

import { SignInButton, SignOutButton, SignUpButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{user.firstName?.[0]}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-xl text-gray-600 mb-8">Redirecting to your trading dashboard...</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary text-lg px-8 py-3"
              >
                Go to Dashboard
              </button>
              <SignOutButton>
                <button className="btn-secondary text-lg px-8 py-3">Sign Out</button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}
