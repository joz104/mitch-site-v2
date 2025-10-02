'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type DonationType = 'one-time' | 'monthly'

export default function DonatePage() {
  const [donationType, setDonationType] = useState<DonationType>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState<string>('')

  const presetAmounts = [25, 50, 100, 250, 500]

  const impactMessages: { [key: number]: string } = {
    25: 'Provides training equipment for one child',
    50: 'Sponsors one child for a week of training',
    100: 'Provides a full soccer kit for a youth player',
    250: 'Sponsors one child for an entire season',
    500: 'Funds a community awareness tour visit',
  }

  const currentAmount = customAmount ? parseInt(customAmount) : selectedAmount
  const impactMessage = impactMessages[currentAmount] || 'Makes a meaningful difference in our programs'

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt="Community impact"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 gradient-purple-overlay" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            Help Us Make an Impact
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Your donation empowers communities through soccer education,
            providing opportunities for children who need them most.
          </p>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-dark-800 to-dark-700 border-2 border-neon-purple/40 rounded-2xl shadow-dark-card p-8">
                <h2 className="font-display font-bold text-3xl text-white mb-8">
                  Make Your Donation
                </h2>

                {/* Donation Type Toggle */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      donationType === 'one-time'
                        ? 'bg-gradient-purple-electric text-white shadow-purple-subtle'
                        : 'bg-dark-800 text-gray-300 border border-gray-800 hover:bg-electric-purple-500/10 hover:border-electric-purple-500/30'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 relative ${
                      donationType === 'monthly'
                        ? 'bg-gradient-purple-electric text-white shadow-purple-subtle'
                        : 'bg-dark-800 text-gray-300 border border-gray-800 hover:bg-electric-purple-500/10 hover:border-electric-purple-500/30'
                    }`}
                  >
                    Monthly
                    <span className="badge badge-warning absolute -top-2 -right-2 text-xs">
                      Sustain Impact
                    </span>
                  </button>
                </div>

                {donationType === 'monthly' && (
                  <div className="bg-electric-purple-500/10 border border-electric-purple-500/40 rounded-xl p-4 mb-6">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-electric-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-electric-purple-300 mb-1">Maximize Your Impact</p>
                        <p className="text-sm text-gray-300">
                          Monthly donations provide sustainable support, helping us plan long-term programs and reach more communities.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="font-display font-semibold text-lg text-white mb-4">
                    Select Amount
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-4">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                        className={`py-4 rounded-xl font-semibold transition-all duration-300 ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-gradient-purple-electric text-white shadow-purple-subtle'
                            : 'bg-dark-800 text-gray-300 border border-neon-purple/20 hover:bg-neon-purple/10 hover:border-neon-purple/40'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="label">Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(0)
                        }}
                        placeholder="Enter custom amount"
                        className="input w-full pl-8"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Impact Message */}
                <div className="bg-neon-green/10 border-2 border-neon-green/40 rounded-xl p-4 mb-8">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-neon-green mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-neon-green mb-1">Your Impact</p>
                      <p className="text-sm text-gray-300">{impactMessage}</p>
                    </div>
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-display font-semibold text-lg text-white">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name *</label>
                      <input type="text" className="input w-full" required />
                    </div>
                    <div>
                      <label className="label">Last Name *</label>
                      <input type="text" className="input w-full" required />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input type="email" className="input w-full" required />
                  </div>
                  <div>
                    <label className="label">Phone Number (Optional)</label>
                    <input type="tel" className="input w-full" />
                  </div>
                </div>

                {/* Payment Section */}
                <div className="mb-8">
                  <h3 className="font-display font-semibold text-lg text-white mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Card Number *</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="input w-full" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Expiration Date *</label>
                        <input type="text" placeholder="MM / YY" className="input w-full" required />
                      </div>
                      <div>
                        <label className="label">CVV *</label>
                        <input type="text" placeholder="123" className="input w-full" required />
                      </div>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure SSL Encrypted</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="btn btn-secondary w-full text-lg">
                  Donate ${currentAmount.toLocaleString()} {donationType === 'monthly' && '/month'}
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  Mitch's Soccer NEXT is a 501(c)(3) nonprofit organization. Your donation is tax-deductible.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Impact Stats */}
              <div className="card mb-8 sticky top-32">
                <h3 className="font-display font-bold text-xl text-white mb-6">
                  Why Your Support Matters
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-300">Program Costs</span>
                      <span className="text-sm font-semibold text-electric-purple-400">85%</span>
                    </div>
                    <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-purple-electric rounded-full shadow-md" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-300">Operations</span>
                      <span className="text-sm font-semibold text-electric-purple-400">10%</span>
                    </div>
                    <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-purple-electric rounded-full shadow-md" style={{ width: '10%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-300">Fundraising</span>
                      <span className="text-sm font-semibold text-electric-purple-400">5%</span>
                    </div>
                    <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-purple-electric rounded-full shadow-md" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  85 cents of every dollar goes directly to programs that change lives through soccer.
                </p>
              </div>

              {/* Other Ways to Give */}
              <div className="card">
                <h3 className="font-display font-bold text-xl text-white mb-4">
                  Other Ways to Give
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-electric-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Corporate matching gifts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-electric-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Stock or securities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-electric-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Planned giving / estate gifts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-electric-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>In-kind donations (equipment)</span>
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-outline w-full mt-6">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section bg-dark-900/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-electric-purple-500/20 border border-electric-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-electric-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed italic">
              "Supporting Mitch's Soccer NEXT has been one of the most rewarding decisions our family has made.
              Seeing the joy on kids' faces and knowing we're part of something that builds character and
              community makes every donation meaningful."
            </p>
            <p className="font-semibold text-white">Jennifer Thompson</p>
            <p className="text-sm text-gray-400">Monthly Donor since 2020</p>
          </div>
        </div>
      </section>
    </div>
  )
}
