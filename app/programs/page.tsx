'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ProgramCategory = 'all' | 'camps' | 'training' | 'pd-camps' | 'awareness'
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
  dates?: string[]
  time?: string
  price?: string
  badge?: string
  highlights: string[]
  coaches?: string[]
  includes?: string[]
  registration?: string
}

const programs: Program[] = [
  {
    id: 'classic-camps',
    title: 'Classic Summer Camps',
    category: 'camps',
    description: 'Full-day camps for recreational players combining soccer with swimming at Dartmouth Sportsplex.',
    longDescription: 'Our Classic Camps provide a perfect balance of soccer training and summer fun. Players enjoy morning soccer sessions followed by afternoon swimming at the Dartmouth Sportsplex. Designed for players of all skill levels who want to improve their game while making new friends in a supportive, inclusive environment.',
    image: 'https://images.unsplash.com/photo-1611782001266-4128d4de7428?w=800&q=80',
    ages: '5-13 years',
    duration: '1 week (Monday-Friday)',
    location: 'Brownlow Park + Dartmouth Sportsplex',
    time: '9:00 AM - 4:00 PM',
    dates: ['July 7-11, 2025', 'July 21-25, 2025', 'August 11-15, 2025'],
    price: 'Pay What You Can',
    badge: 'Swimming Included',
    highlights: [
      'Full day program with swimming',
      'Halifax Wanderers FC guest coaches',
      'All skill levels welcome',
      'No club membership required',
      'Early drop-off available',
      'Awards for acts of beauty'
    ],
    includes: [
      'Daily soccer training',
      'Swimming at Dartmouth Sportsplex',
      'Professional coaching',
      'Mental health awareness activities',
      'Nutrition education',
      'End-of-week celebration'
    ],
    registration: 'Open - Register anytime'
  },
  {
    id: 'performance-camps',
    title: 'Performance Summer Camps',
    category: 'camps',
    description: 'Intensive training camps for competitive players seeking advanced skill development.',
    longDescription: 'Performance Camps are designed for players who want to take their game to the next level. With focus on technical skills, tactical awareness, and physical conditioning, these camps provide intensive training in a competitive but supportive environment. Players work with professional coaches including Halifax Wanderers FC players and NCAA-level athletes.',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f2be2066?w=800&q=80',
    ages: 'U10-U18 (9-18 years)',
    duration: '1 week (Monday-Friday)',
    location: 'Cole Harbour All Weather Field',
    time: '9:00 AM - 2:00 PM',
    dates: ['July 14-18, 2025', 'August 4-8, 2025', 'August 25-29, 2025'],
    price: 'Pay What You Can',
    badge: 'Elite Training',
    highlights: [
      'Advanced technical training',
      'Position-specific coaching',
      'Video analysis sessions',
      'Speed and agility training',
      'Small-sided games',
      'Professional guest coaches'
    ],
    includes: [
      'Intensive skill development',
      'Tactical awareness training',
      'Physical conditioning',
      'Video evaluation',
      'Nutrition guidance',
      'Cape Breton University champion coaches'
    ],
    coaches: ['Halifax Wanderers FC players', 'NCAA coaches', 'Cape Breton University champions'],
    registration: 'Open - Limited spots'
  },
  {
    id: '1on1-training',
    title: '1-on-1 Training',
    category: 'training',
    description: 'Personalized individual training programs with customized development plans.',
    longDescription: 'Our 1-on-1 training provides the ultimate personalized soccer development experience. Each player receives a customized training plan based on their specific needs and goals. Sessions include technical skill work, position-specific training, and mental preparation. Perfect for players wanting rapid improvement with dedicated attention.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    ages: 'All ages',
    duration: '10 weeks',
    location: 'Various locations in Dartmouth',
    price: '$550 (suggested)',
    highlights: [
      'Completely personalized training',
      'Video evaluation included',
      'Speed training program',
      'Nutrition education package',
      'Sleep and recovery guidance',
      'Flexible scheduling'
    ],
    coaches: ['Mitch Doell', 'Beth Padfield', 'Will Veinot', 'Kenzie Purcell'],
    registration: 'Year-round enrollment'
  },
  {
    id: 'small-group-training',
    title: 'Small Group Training',
    category: 'training',
    description: '2-on-1 training sessions combining personalized attention with peer learning.',
    longDescription: 'Small group training offers the perfect balance between individual attention and the benefits of training with peers. Players work in groups of 2-3, allowing for competitive drills, teamwork development, and social interaction while still receiving focused coaching. Ideal for friends or siblings who want to train together.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    ages: 'All ages',
    duration: '10 weeks',
    location: 'Various locations in Dartmouth',
    price: '$350 (suggested)',
    highlights: [
      'Small group dynamics',
      'Peer learning opportunities',
      'Video analysis',
      'Competition and teamwork',
      'Customized group plans',
      'Friend/sibling discounts'
    ],
    registration: 'Year-round enrollment'
  },
  {
    id: 'pd-holiday-camps',
    title: 'PD & Holiday Camps',
    category: 'pd-camps',
    description: 'Day camps during school breaks at premier indoor facilities.',
    longDescription: 'Make the most of school breaks with our PD and Holiday camps! These camps run during professional development days and school holidays, providing a safe, fun, and active environment for players. Located at the state-of-the-art BMO Soccer Centre and other premium facilities, players enjoy indoor soccer regardless of weather conditions.',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
    ages: '9-15 years',
    duration: 'Single day or multi-day options',
    location: 'BMO Soccer Centre / BATLX Halifax',
    price: 'Pay What You Can',
    badge: 'Indoor Facilities',
    highlights: [
      'Convenient PD day coverage',
      'World-class indoor facilities',
      'All weather conditions',
      'Professional coaching',
      'Fun tournament play',
      'Healthy snack options'
    ],
    dates: ['Fall PD Days', 'Winter Break', 'March Break', 'Spring PD Days'],
    registration: 'Register per session'
  },
  {
    id: 'awareness-tour',
    title: 'Awareness Tour',
    category: 'awareness',
    description: 'School visits combining soccer with mental health and IBD awareness education.',
    longDescription: 'Our Awareness Tour brings soccer directly to schools, combining fun soccer activities with important life lessons. Mitch and the coaching team share their personal experiences with mental health and IBD, teaching students about resilience, inclusion, and anti-bullying. This free program makes a lasting impact on school communities.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    ages: 'All school ages',
    duration: '1-2 hours per visit',
    location: 'Your school',
    price: 'FREE',
    badge: 'Community Service',
    highlights: [
      'Free for all schools',
      'Mental health education',
      'IBD/Crohn\'s awareness',
      'Anti-bullying initiatives',
      'Interactive soccer activities',
      'Inspirational speaker sessions'
    ],
    includes: [
      'Soccer equipment provided',
      'Age-appropriate activities',
      'Classroom presentations',
      'Q&A with coaches',
      'Mental wellness resources',
      'Follow-up support'
    ],
    registration: 'Contact to book'
  }
]

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const categories = [
    { id: 'all' as ProgramCategory, name: 'All Programs', count: programs.length },
    { id: 'camps' as ProgramCategory, name: 'Summer Camps', count: programs.filter(p => p.category === 'camps').length },
    { id: 'training' as ProgramCategory, name: 'Training', count: programs.filter(p => p.category === 'training').length },
    { id: 'pd-camps' as ProgramCategory, name: 'PD/Holiday', count: programs.filter(p => p.category === 'pd-camps').length },
    { id: 'awareness' as ProgramCategory, name: 'Awareness', count: programs.filter(p => p.category === 'awareness').length },
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
      {/* Hero Section */}
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
          <p className="text-body-lg text-gray-300 max-w-3xl mx-auto">
            Pay-What-You-Can soccer programs for everyone. No club membership required,
            no experience necessary, and no one turned away for inability to pay.
          </p>
        </div>
      </section>

      {/* Pay What You Can Banner */}
      <section className="bg-gradient-purple-electric py-6">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-semibold">
              All programs operate on a Pay-What-You-Can basis • Suggested prices are guidelines only
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
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
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-display-sm text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="text-body text-gray-300 mb-6">
                    {program.description}
                  </p>

                  {/* Program Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-400">Ages: <span className="text-white font-semibold">{program.ages}</span></span>
                    </div>
                    {program.time && (
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">Time: <span className="text-white font-semibold">{program.time}</span></span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-400">Location: <span className="text-white font-semibold">{program.location}</span></span>
                    </div>
                    {program.price && (
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-4 h-4 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">
                          {program.price === 'FREE' ? (
                            <span className="text-neon-green font-bold">FREE</span>
                          ) : (
                            <>Price: <span className="text-gradient-purple font-bold">{program.price}</span></>
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dates if available */}
                  {program.dates && program.dates.length > 0 && (
                    <div className="mb-6 p-3 bg-dark-900/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-2">Available Dates:</p>
                      <div className="space-y-1">
                        {program.dates.map((date, index) => (
                          <p key={index} className="text-sm text-white">{date}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => toggleProgramExpansion(program.id)}
                      className="btn btn-outline flex-1 text-center"
                    >
                      View Details
                    </button>
                    <Link
                      href="/register"
                      className="btn btn-primary flex-1 text-center"
                    >
                      Register
                    </Link>
                  </div>

                  {/* Expanded Details */}
                  {expandedProgram === program.id && (
                    <div className="absolute inset-0 bg-dark-900/98 p-8 overflow-y-auto z-20">
                      <button
                        onClick={() => setExpandedProgram(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <h3 className="font-display font-bold text-display-sm text-white mb-4">
                        {program.title}
                      </h3>
                      <p className="text-body text-gray-300 mb-6">
                        {program.longDescription}
                      </p>

                      {program.highlights && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-white mb-3">Program Highlights</h4>
                          <ul className="space-y-2">
                            {program.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-300 text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {program.coaches && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-white mb-3">Coaching Staff</h4>
                          <ul className="space-y-1">
                            {program.coaches.map((coach, index) => (
                              <li key={index} className="text-gray-300 text-sm">• {coach}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        href="/register"
                        className="btn btn-primary w-full text-center"
                      >
                        Register for This Program
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            /* List View */
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
                        </div>

                        {/* Dates for list view */}
                        {program.dates && program.dates.length > 0 && (
                          <div className="mt-4">
                            <span className="text-sm text-gray-400">Dates: </span>
                            <span className="text-sm text-white">{program.dates.join(' • ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Price and Actions */}
                    <div className="lg:w-64 flex flex-col justify-between">
                      {/* Price Display */}
                      {program.price && (
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-400 mb-1">Investment</p>
                          {program.price === 'FREE' ? (
                            <p className="text-neon-green font-bold text-2xl">FREE</p>
                          ) : (
                            <p className="text-gradient-purple font-bold text-xl">{program.price}</p>
                          )}
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
                      {program.highlights && (
                        <>
                          <h4 className="font-display font-semibold text-lg text-white mb-4">Program Highlights</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {program.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-300">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {program.coaches && (
                        <>
                          <h4 className="font-display font-semibold text-lg text-white mb-3">Coaching Staff</h4>
                          <div className="flex flex-wrap gap-3">
                            {program.coaches.map((coach, index) => (
                              <span key={index} className="badge badge-info">{coach}</span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section bg-gradient-dark-radial">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-display-lg text-white mb-4">
            Ready to Join?
          </h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Register for our Pay-What-You-Can programs today. Every child deserves
            the opportunity to play, learn, and grow through soccer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary text-lg px-10">
              Register Now
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