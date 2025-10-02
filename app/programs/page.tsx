'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ProgramCategory = 'all' | 'training' | 'camps' | 'awareness' | 'coaching'

interface Program {
  id: string
  title: string
  category: ProgramCategory
  description: string
  image: string
  ages: string
  duration: string
  location: string
  price?: string
  badge?: string
  highlights: string[]
}

const programs: Program[] = [
  {
    id: 'youth-development',
    title: 'Youth Development Program',
    category: 'training',
    description: 'Comprehensive year-round training program focused on technical skills, tactical awareness, and personal development for young players.',
    image: 'https://images.unsplash.com/photo-1611782001266-4128d4de7428?w=800&q=80',
    ages: '8-16 years',
    duration: '12 weeks',
    location: 'Multiple locations',
    price: '$299/season',
    badge: 'Enrolling Now',
    highlights: ['Weekly training sessions', 'Professional coaching', 'Performance tracking', 'Team competitions'],
  },
  {
    id: 'summer-camp',
    title: 'Summer Soccer Camp',
    category: 'camps',
    description: 'Intensive week-long camps combining skill development, small-sided games, and fun activities in a supportive environment.',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f2be2066?w=800&q=80',
    ages: '6-14 years',
    duration: '1 week',
    location: 'Central Sports Complex',
    price: '$349/week',
    badge: 'Limited Spots',
    highlights: ['Daily training 9am-3pm', 'Lunch included', 'Camp t-shirt', 'Skills competition'],
  },
  {
    id: 'community-awareness',
    title: 'Community Awareness Tour',
    category: 'awareness',
    description: 'Mobile soccer clinic bringing free training, equipment, and inspiration to underserved communities across the region.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    ages: 'All ages',
    duration: '1-2 days',
    location: 'Various communities',
    price: 'Free',
    highlights: ['Free equipment', 'Professional instruction', 'Community building', 'No experience needed'],
  },
  {
    id: 'coach-certification',
    title: 'Coach Certification Program',
    category: 'coaching',
    description: 'Professional development course providing certification and advanced training techniques for aspiring and experienced coaches.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    ages: '18+ years',
    duration: '8 weeks',
    location: 'Training Center',
    price: '$599',
    highlights: ['National certification', 'Hands-on experience', 'Mentorship program', 'Job placement support'],
  },
  {
    id: 'elite-academy',
    title: 'Elite Academy',
    category: 'training',
    description: 'Advanced training program for high-level players seeking to compete at the collegiate or professional level.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    ages: '14-18 years',
    duration: 'Year-round',
    location: 'Elite Training Facility',
    price: '$899/season',
    badge: 'Tryouts Required',
    highlights: ['Advanced tactics', 'Strength & conditioning', 'College recruitment', 'Tournament travel'],
  },
  {
    id: 'goalkeeper-clinic',
    title: 'Goalkeeper Specialized Clinic',
    category: 'camps',
    description: 'Position-specific training focusing on technical skills, positioning, and mental aspects of goalkeeper play.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
    ages: '10-18 years',
    duration: '4 weeks',
    location: 'Multiple locations',
    price: '$249',
    highlights: ['Specialized training', 'Professional GK coach', 'Video analysis', 'Small group focus'],
  },
]

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('all')

  const categories = [
    { id: 'all' as ProgramCategory, name: 'All Programs' },
    { id: 'training' as ProgramCategory, name: 'Training' },
    { id: 'camps' as ProgramCategory, name: 'Camps' },
    { id: 'awareness' as ProgramCategory, name: 'Awareness Tour' },
    { id: 'coaching' as ProgramCategory, name: 'Coach Development' },
  ]

  const filteredPrograms = selectedCategory === 'all'
    ? programs
    : programs.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80"
            alt="Soccer programs"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 gradient-purple-overlay" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <nav className="text-gray-400 mb-4">
            <Link href="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Programs</span>
          </nav>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            Our Programs
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Comprehensive soccer education for players, coaches, and communities
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-gray-800 shadow-md">
        <div className="container-custom py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-purple-electric text-white shadow-purple-subtle'
                    : 'bg-dark-800 text-gray-300 border border-gray-800 hover:bg-electric-purple-500/10 hover:border-electric-purple-500/30 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="card group relative overflow-hidden">
                {/* Badge */}
                {program.badge && (
                  <span className="badge badge-success absolute top-4 right-4 z-10">
                    {program.badge}
                  </span>
                )}

                {/* Image */}
                <div className="relative h-48 -m-6 mb-4 overflow-hidden rounded-t-2xl">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-electric-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {program.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-electric-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{program.ages}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-electric-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-electric-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{program.location}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-neon-purple/20">
                  <span className="font-display font-bold text-2xl text-neon-green">
                    {program.price}
                  </span>
                  <Link
                    href={`/programs/${program.id}`}
                    className="btn btn-primary py-2 px-6 text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No programs found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-black via-dark-900 to-black relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Not Sure Which Program is Right?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect program for your goals and experience level.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
            <Link href="/register" className="btn btn-secondary">
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
