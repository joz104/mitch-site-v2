'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ProgramCategory = 'all' | 'training' | 'camps' | 'awareness' | 'coaching'
type ViewMode = 'grid' | 'list'

interface Program {
  id: string
  title: string
  category: ProgramCategory
  description: string
  longDescription: string
  image: string
  ages: string
  duration: string
  location: string
  price?: string
  badge?: string
  highlights: string[]
  schedule?: string
  maxParticipants?: number
  spotsRemaining?: number
}

const programs: Program[] = [
  {
    id: 'youth-development',
    title: 'Youth Development Program',
    category: 'training',
    description: 'Comprehensive year-round training program focused on technical skills and tactical awareness.',
    longDescription: 'Our flagship Youth Development Program provides a structured pathway for young players to develop their soccer skills in a supportive environment. Through progressive training modules, players build technical proficiency, tactical understanding, and develop important life skills like teamwork, discipline, and leadership.',
    image: 'https://images.unsplash.com/photo-1611782001266-4128d4de7428?w=800&q=80',
    ages: '8-16 years',
    duration: '12 weeks',
    location: 'Multiple locations',
    schedule: 'Tuesdays & Thursdays, 5:00-6:30 PM',
    price: '$299/season',
    badge: 'Enrolling Now',
    maxParticipants: 30,
    spotsRemaining: 8,
    highlights: [
      'Weekly training sessions with professional coaches',
      'Age-appropriate skill development curriculum',
      'Individual performance tracking and feedback',
      'End-of-season team competitions and showcases'
    ],
  },
  {
    id: 'summer-camp',
    title: 'Summer Soccer Camp',
    category: 'camps',
    description: 'Intensive week-long camps combining skill development and fun activities.',
    longDescription: 'Join us for an unforgettable summer experience! Our camps provide intensive training in a fun, supportive environment. Players participate in daily technical sessions, small-sided games, and team-building activities. Each day includes structured training, free play, and special activities designed to improve skills while building friendships.',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f2be2066?w=800&q=80',
    ages: '6-14 years',
    duration: '1 week',
    location: 'Central Sports Complex',
    schedule: 'Monday-Friday, 9:00 AM - 3:00 PM',
    price: '$349/week',
    badge: 'Limited Spots',
    maxParticipants: 60,
    spotsRemaining: 12,
    highlights: [
      'Full day program with lunch included',
      'Camp t-shirt and equipment bag',
      'Skills competition with prizes',
      'Guest appearances by professional players'
    ],
  },
  {
    id: 'community-awareness',
    title: 'Community Awareness Tour',
    category: 'awareness',
    description: 'Mobile soccer clinic bringing free training to underserved communities.',
    longDescription: 'Our Community Awareness Tour is a mobile program that brings soccer directly to underserved communities. We provide free equipment, professional coaching, and create opportunities for youth who might not otherwise have access to organized sports. This program focuses on using soccer as a tool for positive community development and youth empowerment.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    ages: 'All ages',
    duration: '1-2 days',
    location: 'Various communities',
    schedule: 'Weekends (check calendar)',
    price: 'Free',
    highlights: [
      'Free soccer equipment for participants',
      'Professional coaching and instruction',
      'Community building activities',
      'No experience or registration required'
    ],
  },
  {
    id: 'coach-certification',
    title: 'Coach Certification Program',
    category: 'coaching',
    description: 'Professional development course for aspiring and experienced coaches.',
    longDescription: 'Elevate your coaching career with our comprehensive certification program. This course covers modern coaching methodologies, player development strategies, and practical session planning. Participants gain hands-on experience through supervised coaching sessions and receive mentorship from experienced professionals in the field.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    ages: '18+ years',
    duration: '8 weeks',
    location: 'Training Center',
    schedule: 'Saturdays, 9:00 AM - 1:00 PM',
    price: '$599',
    maxParticipants: 20,
    spotsRemaining: 5,
    highlights: [
      'National coaching certification',
      'Hands-on practical experience',
      'One-on-one mentorship program',
      'Job placement assistance upon completion'
    ],
  },
  {
    id: 'elite-academy',
    title: 'Elite Academy',
    category: 'training',
    description: 'Advanced training for high-level competitive players.',
    longDescription: 'The Elite Academy is designed for serious players with aspirations of competing at the collegiate or professional level. This intensive program combines advanced technical training, tactical development, strength and conditioning, and mental preparation. Players receive exposure to college scouts and professional academy representatives.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    ages: '14-18 years',
    duration: 'Year-round',
    location: 'Elite Training Facility',
    schedule: 'Mon/Wed/Fri 6:00-8:00 PM, Sat 10:00 AM-12:00 PM',
    price: '$899/season',
    badge: 'Tryouts Required',
    maxParticipants: 25,
    spotsRemaining: 3,
    highlights: [
      'Advanced tactical and technical training',
      'Professional strength & conditioning program',
      'College recruitment support and exposure',
      'National tournament travel opportunities'
    ],
  },
  {
    id: 'goalkeeper-clinic',
    title: 'Goalkeeper Specialized Clinic',
    category: 'camps',
    description: 'Position-specific training for aspiring goalkeepers.',
    longDescription: 'Master the art of goalkeeping with our specialized clinic. This program focuses exclusively on goalkeeper development, covering technical skills, positioning, distribution, and the mental aspects of the position. Small group sizes ensure personalized attention and rapid skill development.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
    ages: '10-18 years',
    duration: '4 weeks',
    location: 'Multiple locations',
    schedule: 'Sundays, 2:00-4:00 PM',
    price: '$249',
    maxParticipants: 12,
    spotsRemaining: 4,
    highlights: [
      'Specialized goalkeeper training techniques',
      'Professional goalkeeper coach instruction',
      'Video analysis and feedback sessions',
      'Small group focus (max 4 per coach)'
    ],
  },
]

export default function EnhancedProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const categories = [
    { id: 'all' as ProgramCategory, name: 'All Programs', count: programs.length },
    { id: 'training' as ProgramCategory, name: 'Training', count: programs.filter(p => p.category === 'training').length },
    { id: 'camps' as ProgramCategory, name: 'Camps', count: programs.filter(p => p.category === 'camps').length },
    { id: 'awareness' as ProgramCategory, name: 'Community', count: programs.filter(p => p.category === 'awareness').length },
    { id: 'coaching' as ProgramCategory, name: 'Coaching', count: programs.filter(p => p.category === 'coaching').length },
  ]

  const filteredPrograms = useMemo(() => {
    return selectedCategory === 'all'
      ? programs
      : programs.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  const toggleProgramExpansion = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with reduced intensity */}
      <section className="relative h-[35vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1920&q=80"
            alt="Soccer programs"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-dark-subtle" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <nav className="text-gray-400 mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2">
              <li>
                <Link href="/" className="hover:text-electric-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="text-gray-600">/</span>
              </li>
              <li>
                <span className="text-white" aria-current="page">Programs</span>
              </li>
            </ol>
          </nav>
          <h1 className="font-display font-extrabold text-display-xl text-white mb-4">
            Our Programs
          </h1>
          <p className="text-body-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive soccer education designed to develop skills, build character, and create opportunities for players of all ages and abilities
          </p>
        </div>
      </section>

      {/* Filter Section with View Toggle */}
      <section className="sticky top-20 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-purple-electric text-white shadow-purple-subtle'
                      : 'bg-dark-800/60 text-gray-300 border border-gray-800/50 hover:bg-electric-purple-500/10 hover:border-electric-purple-500/30 hover:text-white'
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2 bg-dark-800/60 rounded-lg p-1 border border-gray-800/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-electric-purple-500/20 text-electric-purple-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-electric-purple-500/20 text-electric-purple-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Display */}
      <section className="content-section">
        <div className="container-custom">
          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <article key={program.id} className="card group relative overflow-hidden">
                  {/* Badge */}
                  {program.badge && (
                    <span className="badge badge-success absolute top-4 right-4 z-10">
                      {program.badge}
                    </span>
                  )}

                  {/* Image */}
                  <div className="relative h-48 -m-8 mb-6 overflow-hidden rounded-t-2xl">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-electric-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-display-sm text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="text-body text-gray-300 mb-6 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Program Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-400">Ages: <span className="text-white">{program.ages}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-400">Duration: <span className="text-white">{program.duration}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-400">Location: <span className="text-white">{program.location}</span></span>
                    </div>
                    {program.price && (
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">Price: <span className="text-gradient-purple font-bold">{program.price}</span></span>
                      </div>
                    )}
                  </div>

                  {/* Availability Indicator */}
                  {program.spotsRemaining !== undefined && (
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Availability</span>
                        <span>{program.spotsRemaining} of {program.maxParticipants} spots left</span>
                      </div>
                      <div className="w-full bg-dark-800 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            program.spotsRemaining! < 5
                              ? 'bg-gradient-to-r from-red-500 to-orange-500'
                              : program.spotsRemaining! < 10
                              ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                              : 'bg-gradient-green-electric'
                          }`}
                          style={{ width: `${(program.spotsRemaining! / program.maxParticipants!) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/programs/${program.id}`}
                      className="btn btn-primary flex-1 text-center"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/register"
                      className="btn btn-outline flex-1 text-center"
                    >
                      Register
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* List View - Desktop Only */
            <div className="space-y-6">
              {filteredPrograms.map((program) => (
                <article key={program.id} className="card">
                  <div className="desktop-columns gap-8">
                    {/* Left Column - Image and Quick Info */}
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="relative w-full lg:w-64 h-48 lg:h-40 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {program.badge && (
                          <span className="badge badge-success absolute top-3 right-3">
                            {program.badge}
                          </span>
                        )}
                      </div>

                      {/* Program Info */}
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-display-sm text-white mb-3">
                          {program.title}
                        </h3>
                        <p className="text-body text-gray-300 mb-4">
                          {expandedProgram === program.id ? program.longDescription : program.description}
                        </p>

                        {/* Inline Details */}
                        <div className="flex flex-wrap gap-6 text-sm">
                          <span className="text-gray-400">
                            Ages: <span className="text-white font-semibold">{program.ages}</span>
                          </span>
                          <span className="text-gray-400">
                            Duration: <span className="text-white font-semibold">{program.duration}</span>
                          </span>
                          <span className="text-gray-400">
                            Location: <span className="text-white font-semibold">{program.location}</span>
                          </span>
                          {program.schedule && (
                            <span className="text-gray-400">
                              Schedule: <span className="text-white font-semibold">{program.schedule}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Price and Actions */}
                    <div className="lg:w-64 flex flex-col justify-between">
                      {/* Price Display */}
                      {program.price && (
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-400 mb-1">Investment</p>
                          <p className="text-gradient-purple font-bold text-2xl">{program.price}</p>
                        </div>
                      )}

                      {/* Availability */}
                      {program.spotsRemaining !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Spots Available</span>
                            <span>{program.spotsRemaining}/{program.maxParticipants}</span>
                          </div>
                          <div className="w-full bg-dark-800 rounded-full h-2">
                            <div
                              className={`h-full rounded-full ${
                                program.spotsRemaining! < 5
                                  ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                  : 'bg-gradient-green-electric'
                              }`}
                              style={{ width: `${(program.spotsRemaining! / program.maxParticipants!) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Link href="/register" className="btn btn-primary w-full text-center">
                          Register Now
                        </Link>
                        <button
                          onClick={() => toggleProgramExpansion(program.id)}
                          className="btn btn-ghost w-full"
                        >
                          {expandedProgram === program.id ? 'Show Less' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedProgram === program.id && (
                    <div className="mt-6 pt-6 border-t border-gray-800/50">
                      <h4 className="font-display font-semibold text-lg text-white mb-4">Program Highlights</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {program.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">No Programs Found</h3>
              <p className="text-gray-400 mb-6">There are no programs available in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn btn-primary"
              >
                View All Programs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-gradient-dark-radial">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-display-lg text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of players who have developed their skills and achieved their goals through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary text-lg px-10">
              Register Today
            </Link>
            <Link href="/contact" className="btn btn-outline text-lg px-10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}