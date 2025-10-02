'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

const programData: { [key: string]: any } = {
  'youth-development': {
    title: 'Youth Development Program',
    category: 'Training Program',
    description: 'Our flagship youth development program provides comprehensive, year-round training focused on technical skills, tactical awareness, and personal development for young players aged 8-16.',
    image: 'https://images.unsplash.com/photo-1611782001266-4128d4de7428?w=1920&q=80',
    price: '$299/season',
    duration: '12 weeks',
    ages: '8-16 years',
    location: 'Multiple locations',
    nextSession: 'January 15, 2025',
    spotsAvailable: 8,
    overview: 'The Youth Development Program is designed to nurture young talent through structured, age-appropriate training sessions. Our experienced coaches focus on individual skill development while fostering teamwork and sportsmanship.',
    curriculum: [
      'Technical Skills: Ball control, dribbling, passing, shooting',
      'Tactical Understanding: Positioning, game awareness, decision-making',
      'Physical Development: Speed, agility, coordination, strength',
      'Mental Skills: Confidence, focus, resilience, teamwork',
    ],
    schedule: [
      { day: 'Monday & Wednesday', time: '4:00 PM - 5:30 PM', group: 'Ages 8-12' },
      { day: 'Monday & Wednesday', time: '5:45 PM - 7:15 PM', group: 'Ages 13-16' },
      { day: 'Saturday', time: '9:00 AM - 11:00 AM', group: 'Match Play (All Ages)' },
    ],
    coaches: [
      {
        name: 'Coach Martinez',
        credentials: 'UEFA B License, 15 years experience',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      },
      {
        name: 'Coach Williams',
        credentials: 'USSF A License, Former professional player',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      },
    ],
    faqs: [
      {
        question: 'What skill level is required?',
        answer: 'This program is suitable for all skill levels. We group players by age and ability to ensure appropriate challenge and development.',
      },
      {
        question: 'What should players bring?',
        answer: 'Players should bring soccer cleats, shin guards, water bottle, and appropriate athletic clothing. Soccer balls are provided.',
      },
      {
        question: 'Are makeup sessions available?',
        answer: 'Yes, if a player misses a session, they can attend a makeup session at a different time slot, subject to availability.',
      },
      {
        question: 'Is there a refund policy?',
        answer: 'Full refunds are available up to 7 days before the program starts. After that, we offer prorated refunds for medical reasons with documentation.',
      },
    ],
    testimonials: [
      {
        quote: 'My daughter has grown so much in confidence and skill. The coaches really care about each player\'s development.',
        author: 'Sarah M.',
        role: 'Parent',
      },
      {
        quote: 'Best soccer program in the area. Great coaching, excellent facilities, and my son loves it!',
        author: 'James K.',
        role: 'Parent',
      },
    ],
  },
}

export default function ProgramPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const program = programData[slug]
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  if (!program) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Program Not Found</h1>
          <Link href="/programs" className="btn btn-primary">
            View All Programs
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'schedule', name: 'Schedule' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'coaches', name: 'Coaches' },
    { id: 'faqs', name: 'FAQs' },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 gradient-purple-overlay" />
        </div>

        <div className="container-custom relative z-10 pb-12">
          <nav className="text-gray-400 mb-4">
            <Link href="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/programs" className="hover:text-neon-purple transition-colors">Programs</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{program.title}</span>
          </nav>
          <span className="badge badge-info mb-4">{program.category}</span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white ">
            {program.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content Area */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex overflow-x-auto gap-2 mb-8 border-b border-neon-purple/20 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-semibold whitespace-nowrap transition-all duration-300 rounded-t-lg ${
                      activeTab === tab.id
                        ? 'text-white bg-electric-purple-500/20 border-b-2 border-electric-purple-500 shadow-md'
                        : 'text-gray-400 hover:text-electric-purple-400 hover:bg-electric-purple-500/5'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display font-bold text-3xl text-white mb-4">
                        Program Overview
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {program.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-2xl text-white mb-4">
                        What You'll Learn
                      </h3>
                      <ul className="space-y-3">
                        {program.curriculum.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-6 h-6 text-neon-green mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Testimonials */}
                    <div>
                      <h3 className="font-display font-semibold text-2xl text-white mb-6">
                        What Parents Say
                      </h3>
                      <div className="space-y-4">
                        {program.testimonials.map((testimonial: any, index: number) => (
                          <div key={index} className="bg-dark-900/50 border border-neon-purple/20 rounded-xl p-6">
                            <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                            <div>
                              <p className="font-semibold text-white">{testimonial.author}</p>
                              <p className="text-sm text-gray-400">{testimonial.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div>
                    <h2 className="font-display font-bold text-3xl text-white mb-6">
                      Training Schedule
                    </h2>
                    <div className="space-y-4">
                      {program.schedule.map((session: any, index: number) => (
                        <div key={index} className="flex items-start gap-6 p-6 bg-dark-900/50 border border-neon-purple/20 rounded-xl hover:border-neon-purple/40 transition-colors">
                          <div className="w-16 h-16 bg-gradient-purple-electric rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-xl text-white mb-2">
                              {session.day}
                            </h3>
                            <p className="text-lg text-electric-purple-400 font-semibold mb-1">{session.time}</p>
                            <p className="text-gray-300">{session.group}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h2 className="font-display font-bold text-3xl text-white mb-6">
                      Detailed Curriculum
                    </h2>
                    <div className="space-y-6">
                      {program.curriculum.map((item: string, index: number) => {
                        const [title, description] = item.split(': ')
                        return (
                          <div key={index} className="card">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-gradient-purple-electric rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                              </div>
                              <div>
                                <h3 className="font-display font-semibold text-xl text-white mb-2">
                                  {title}
                                </h3>
                                <p className="text-gray-300">{description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'coaches' && (
                  <div>
                    <h2 className="font-display font-bold text-3xl text-white mb-6">
                      Meet Your Coaches
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {program.coaches.map((coach: any, index: number) => (
                        <div key={index} className="card text-center">
                          <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-electric-purple-500/40 shadow-md">
                            <Image
                              src={coach.image}
                              alt={coach.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-display font-bold text-xl text-white mb-2">
                            {coach.name}
                          </h3>
                          <p className="text-gray-300">{coach.credentials}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div>
                    <h2 className="font-display font-bold text-3xl text-white mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {program.faqs.map((faq: any, index: number) => (
                        <div key={index} className="border border-neon-purple/20 rounded-xl overflow-hidden bg-dark-900/50">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-neon-purple/5 transition-colors"
                          >
                            <span className="font-semibold text-left text-white">
                              {faq.question}
                            </span>
                            <svg
                              className={`w-5 h-5 text-electric-purple-400 transition-transform ${
                                expandedFaq === index ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {expandedFaq === index && (
                            <div className="px-6 pb-4 text-gray-300 border-t border-neon-purple/20">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="font-display font-bold text-xl text-white mb-6">
                  Program Details
                </h3>

                {/* Details List */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-electric-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="font-semibold text-white">{program.price}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-electric-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-semibold text-white">{program.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-electric-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400">Ages</p>
                      <p className="font-semibold text-white">{program.ages}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-electric-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-semibold text-white">{program.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-electric-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-400">Next Session</p>
                      <p className="font-semibold text-white">{program.nextSession}</p>
                    </div>
                  </div>
                </div>

                {/* Urgency Badge */}
                {program.spotsAvailable && program.spotsAvailable < 10 && (
                  <div className="bg-orange-500/10 border border-orange-400/40 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-orange-300">
                      Only {program.spotsAvailable} spots remaining!
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link href="/register" className="btn btn-primary w-full">
                    Register Now
                  </Link>
                  <button className="btn btn-outline w-full">
                    Download Brochure
                  </button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-neon-purple/20">
                  <p className="text-sm text-gray-400 mb-3">Questions about this program?</p>
                  <Link href="/contact" className="text-electric-purple-400 font-semibold hover:text-neon-purple transition-colors">
                    Contact Us →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="section bg-dark-900/50">
        <div className="container-custom">
          <h2 className="font-display font-bold text-3xl text-white mb-8 text-center ">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/programs" className="card group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-purple-electric rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-white">View All Programs</h3>
                <p className="text-gray-400 text-sm">Explore our full range of offerings</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-dark-900 border-t border-neon-purple/40 p-4 z-40 shadow-md backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">Starting at</p>
            <p className="font-display font-bold text-xl text-gradient-purple">{program.price}</p>
          </div>
          <Link href="/register" className="btn btn-primary flex-1">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  )
}
