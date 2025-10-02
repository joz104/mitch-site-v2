'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl font-bold text-gradient-purple">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

// Hero Section - Dark with Neon
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80"
          alt="Soccer players in action"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
        <div className="absolute inset-0 gradient-purple-overlay"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center py-32">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-up">
          Empowering Communities
          <br />
          <span className="text-gradient-purple">Through Soccer</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
          Comprehensive soccer training, camps, and development programs
          for players, coaches, and communities of all ages.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/programs" className="btn btn-primary text-lg px-10">
            Explore Programs
          </Link>
          <Link href="/donate" className="btn btn-secondary text-lg px-10">
            Support Our Mission
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-electric-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

// Program Card Component
function ProgramCard({
  title,
  description,
  icon,
  href,
  badge,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  badge?: string
}) {
  return (
    <Link href={href} className="card group relative overflow-hidden">
      <div className="relative">
        {badge && (
          <span className="badge badge-success absolute -top-3 -right-3 z-10">
            {badge}
          </span>
        )}
        <div className="w-20 h-20 bg-gradient-purple-electric rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="font-display font-bold text-2xl text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center text-electric-purple-400 font-semibold group-hover:gap-2 transition-all">
        Learn More
        <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  )
}

// Programs Section
function ProgramsSection() {
  const programs = [
    {
      title: 'Youth Training',
      description: 'Comprehensive skills development programs designed to build confidence, technique, and soccer IQ for young athletes.',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      href: '/programs/training',
      badge: 'Enrolling Now',
    },
    {
      title: 'Soccer Camps',
      description: 'Intensive training experiences combining skill development, tactical awareness, and fun in a supportive environment.',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: '/programs/camps',
    },
    {
      title: 'Awareness Tour',
      description: 'Community outreach programs bringing soccer education and inspiration to underserved areas across the region.',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/programs/awareness',
    },
    {
      title: 'Coach Development',
      description: 'Professional certification and continuing education programs for coaches seeking to elevate their skills and impact.',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      href: '/programs/coaching',
    },
  ]

  return (
    <section className="section bg-black relative">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover comprehensive soccer programs designed for every age, skill level, and aspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Impact Stats Section
function ImpactStatsSection() {
  const stats = [
    { value: 5000, label: 'Youth Trained', suffix: '+' },
    { value: 50, label: 'Community Events', suffix: '+' },
    { value: 100, label: 'Scholarship Recipients', suffix: '%' },
    { value: 15, label: 'Partner Organizations', suffix: '+' },
  ]

  return (
    <section className="section relative overflow-hidden bg-gradient-to-br from-black via-dark-900 to-black">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Making a difference in communities through the beautiful game.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-8 bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonial Section
function TestimonialSection() {
  const testimonials = [
    {
      quote: "This program transformed my son's confidence both on and off the field. The coaches truly care about each player's development.",
      author: "Sarah Martinez",
      role: "Parent",
    },
    {
      quote: "The coach development program gave me the tools and certification I needed to take my coaching career to the next level.",
      author: "James Wilson",
      role: "Certified Coach",
    },
    {
      quote: "The awareness tour brought soccer to our community when we needed it most. It's been life-changing for so many kids.",
      author: "Pastor Michael Brown",
      role: "Community Leader",
    },
  ]

  return (
    <section className="section bg-black relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from our community members about their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-black via-dark-900 to-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="bg-gradient-to-br from-dark-800 to-dark-700 border-2 border-gray-800 rounded-3xl p-12 md:p-16 text-center shadow-xl hover:shadow-2xl hover:border-gray-700 transition-all duration-500">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of players, coaches, and families who have transformed their soccer journey with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn btn-primary text-lg px-10">
              Register Now
            </Link>
            <Link href="/contact" className="btn btn-outline text-lg px-10">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <ImpactStatsSection />
      <TestimonialSection />
      <CTASection />
    </>
  )
}
