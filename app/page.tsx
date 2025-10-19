'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
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
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Clean Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80"
          alt="Youth soccer players in action"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center py-32">
        <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6 animate-fade-up">
          Soccer for <span className="text-accent-purple">Everyone</span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-100 max-w-4xl mx-auto mb-4 font-semibold">
          Over <span className="text-accent-purple">10,000 players</span> developed since 2013
        </p>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Pay-What-You-Can soccer programs in Dartmouth, Nova Scotia.
          No one turned away for inability to pay.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/programs" className="btn btn-primary text-lg px-10">
            View Programs
          </Link>
          <Link href="/about" className="btn btn-outline text-lg px-10">
            Our Story
          </Link>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 p-6 bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 max-w-2xl mx-auto">
          <p className="text-lg text-gray-200 italic">
            "Soccer for everyone and help for those in need"
          </p>
        </div>
      </div>
    </section>
  )
}

// Clean Impact Statistics
function ImpactSection() {
  const stats = [
    { number: 10000, suffix: '+', label: 'Players Developed' },
    { number: 12, suffix: '', label: 'Years of Service' },
    { number: 100, suffix: '%', label: 'Accessible to All' },
    { number: 4, suffix: '', label: 'Core Programs' },
  ]

  return (
    <section className="content-section bg-dark-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-display-lg text-white mb-4">
            Our Community Impact
          </h2>
          <p className="text-body-lg text-gray-300 max-w-2xl mx-auto">
            Making soccer accessible to everyone in Dartmouth through our Pay-What-You-Can model
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30 hover:border-accent-purple/40 hover:-translate-y-1 transition-all"
            >
              <div className="mb-4">
                <AnimatedCounter
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2500}
                />
              </div>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Professional Programs Section
function ProgramsOverview() {
  const programs = [
    {
      title: 'Summer Camps',
      description: 'Classic and Performance camps with swimming at Dartmouth Sportsplex, professional coaching from Halifax Wanderers FC players, and comprehensive skill development.',
      features: ['Halifax Wanderers FC coaches', 'Swimming included', 'All skill levels welcome', 'Pay What You Can pricing'],
      link: '/programs',
      image: 'https://images.unsplash.com/photo-1611782001266-4128d4de7428?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '1-on-1 & Small Group Training',
      description: 'Personalized 10-week training programs featuring video evaluation, speed training, nutrition education, and customized development plans.',
      features: ['Video analysis included', 'Custom development plans', 'Flexible scheduling', '$350-550 suggested pricing'],
      link: '/programs',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Awareness Tour',
      description: 'Free school visits combining soccer activities with mental health education, IBD awareness, and anti-bullying initiatives led by our coaching team.',
      features: ['Free for schools', 'Mental health education', 'Interactive sessions', 'Community impact'],
      link: '/awareness-tour',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'PD & Holiday Camps',
      description: 'Day camps during school breaks at BMO Soccer Centre and premier indoor facilities across Dartmouth and Halifax.',
      features: ['Ages 9-15', 'Indoor facilities', 'Professional coaching', 'Convenient timing'],
      link: '/programs',
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80'
    },
  ]

  return (
    <section className="content-section relative">
      {/* Clean photo background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80"
          alt="Soccer training"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-display-lg text-white mb-4">
            Our Programs
          </h2>
          <p className="text-body-lg text-gray-300 max-w-3xl mx-auto">
            No club membership required • No experience necessary • Everyone welcome
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program) => (
            <article key={program.title} className="group">
              <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/30 hover:border-accent-purple/40 hover:-translate-y-1 transition-all shadow-lift hover:shadow-lift-lg">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-display font-bold text-2xl text-white mb-4">
                    {program.title}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={program.link}
                    className="inline-flex items-center text-accent-purple hover:text-accent-purple/80 font-semibold transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Mitch's Story Section
function StoryPreview() {
  return (
    <section className="content-section bg-dark-900">
      <div className="container-custom">
        <div className="desktop-columns items-center gap-12">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571698185064-445ba59d6582?auto=format&fit=crop&w=800&q=80"
              alt="Soccer coach with youth players"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div>
            <h2 className="font-display font-bold text-display-lg text-white mb-6">
              From Adversity to <span className="text-accent-purple">Advocacy</span>
            </h2>

            <div className="text-gray-300 space-y-4">
              <p>
                In June 2018, Mitchell Doell was diagnosed with Crohn's disease, forcing him to step away
                from the successful soccer camps he'd been running.
              </p>
              <p>
                From that hospital bed in January 2019, Mitch conceived <strong className="text-white">Mitch's Soccer 2.0</strong> –
                a not-for-profit organization combining soccer with mental health awareness and a revolutionary
                <strong className="text-accent-purple"> Pay-What-You-Can</strong> model.
              </p>
              <p>
                Today, over 10,000 players have benefited from programs where{' '}
                <strong className="text-white">no child is turned away</strong> for inability to pay.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/about" className="btn btn-primary">
                Read Full Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Clean Testimonial Section
function TestimonialSection() {
  return (
    <section className="content-section relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1920&q=80"
          alt="Soccer community"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <svg className="w-16 h-16 text-accent-purple mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="text-2xl md:text-3xl text-white font-bold mb-6">
            "They had to see it to believe it on the first day"
          </blockquote>

          <p className="text-accent-purple mb-8 font-semibold">
            — Parent reaction to Pay-What-You-Can
          </p>

          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our revolutionary approach ensures every child, regardless of financial situation,
            has access to quality soccer training, professional coaching, and a supportive community
            that values mental health and inclusion.
          </p>
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
function CTASection() {
  return (
    <section className="content-section bg-dark-900">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-accent-purple-dark to-accent-purple p-1 rounded-3xl shadow-lift-lg">
          <div className="bg-dark-900 rounded-3xl p-12 text-center">
            <h2 className="font-display font-bold text-display-lg text-white mb-4">
              Ready to Join Our Community?
            </h2>

            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Register for our <span className="text-accent-green font-semibold">Pay-What-You-Can</span> programs today
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/register" className="btn btn-primary text-lg px-10">
                Register Now
              </Link>
              <Link href="/contact" className="btn btn-outline text-lg px-10">
                Contact Us
              </Link>
            </div>

            <div className="pt-8 border-t border-gray-800/50">
              <p className="text-gray-400 mb-3">
                Follow us for updates
              </p>
              <div className="flex justify-center gap-6">
                <a href="https://instagram.com/mitchssoccer" className="text-accent-purple hover:text-accent-purple/80 transition-colors">
                  Instagram
                </a>
                <span className="text-gray-600">•</span>
                <a href="https://facebook.com/mitchssoccer2.0" className="text-accent-purple hover:text-accent-purple/80 transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <ImpactSection />
      <ProgramsOverview />
      <StoryPreview />
      <TestimonialSection />
      <CTASection />
    </main>
  )
}