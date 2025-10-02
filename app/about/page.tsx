import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const team = [
    {
      name: 'Mitch',
      role: 'Founder & Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Passionate about making soccer accessible to everyone, Mitch founded this organization to break down barriers and create opportunities through the beautiful game.',
    },
    {
      name: 'Coach Martinez',
      role: 'Head Training Coach',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: 'UEFA B License holder with 15 years of youth development experience, specializing in technical skills and player development.',
    },
    {
      name: 'Coach Williams',
      role: 'Elite Programs Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Former professional player and USSF A License coach dedicated to developing the next generation of soccer talent.',
    },
    {
      name: 'Sarah Chen',
      role: 'Community Outreach Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Coordinates our awareness tours and ensures soccer reaches underserved communities across the region.',
    },
  ]

  const values = [
    {
      title: 'Accessibility',
      description: 'Everyone deserves the opportunity to play. Our pay-what-you-can model ensures financial barriers never prevent participation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Community',
      description: 'Soccer is more than a sport—it\'s a vehicle for bringing people together, building friendships, and strengthening communities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Excellence',
      description: 'We provide professional-quality coaching and training to all participants, regardless of ability or background.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Development',
      description: 'We focus on holistic player development—technical skills, tactical awareness, physical fitness, and mental resilience.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1920&q=80"
            alt="Soccer community"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 gradient-purple-overlay" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            About Mitch's Soccer NEXT
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Empowering communities through accessible, inclusive soccer education
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                At Mitch's Soccer NEXT, we believe that soccer is for everyone. We're dedicated to breaking down
                barriers and creating opportunities for players of all ages, abilities, and backgrounds to experience
                the joy and benefits of the beautiful game.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Through our pay-what-you-can registration model and community-focused programs, we ensure that
                financial constraints never prevent someone from participating. Every child, every coach, every
                community member deserves the chance to learn, grow, and thrive through soccer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-dark-900/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-gradient-purple-electric rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
                  {value.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dedicated professionals committed to transforming lives through soccer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center group">
                <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-electric-purple-500/40">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-electric-purple-400 font-semibold text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section bg-gradient-to-br from-black via-dark-900 to-black">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Our Impact in 2024
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Making a real difference in communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="text-5xl font-bold text-gradient-purple mb-3">5,000+</div>
              <p className="text-gray-300 font-medium">Youth Trained</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-gradient-purple mb-3">100%</div>
              <p className="text-gray-300 font-medium">Pay What You Can</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-gradient-purple mb-3">50+</div>
              <p className="text-gray-300 font-medium">Community Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-dark-800 to-dark-700 border-2 border-gray-800 rounded-3xl p-12 md:p-16 text-center shadow-xl">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate coaches, volunteers, and partners who share our vision
              of making soccer accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                Get Involved
              </Link>
              <Link href="/donate" className="btn btn-outline">
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
