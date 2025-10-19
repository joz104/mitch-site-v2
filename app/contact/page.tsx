'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [formLoadTime, setFormLoadTime] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Track when form loads for time-based spam protection
  useEffect(() => {
    setFormLoadTime(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Time-based spam check (reject if submitted < 3 seconds after load)
    const submissionTime = Date.now()
    const timeDiff = (submissionTime - formLoadTime) / 1000

    if (timeDiff < 3) {
      console.log('Spam detected: Too fast submission')
      return
    }

    // Check honeypot field
    const formElement = e.currentTarget
    const honeypot = formElement.querySelector('input[name="botcheck"]') as HTMLInputElement
    if (honeypot && honeypot.checked) {
      console.log('Spam detected: Honeypot triggered')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit to our API route (using Resend)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          timestamp: formLoadTime,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=80"
            alt="Contact us"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our programs? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-800/80 backdrop-blur-sm border border-gray-800/30 rounded-2xl shadow-lift p-8">
                <h2 className="font-display font-bold text-2xl text-white mb-6">
                  Send Us a Message
                </h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-accent-green/10 border border-accent-green/30 rounded-xl">
                    <p className="text-accent-green font-semibold">
                      ✓ Message sent successfully! We'll get back to you within 24-48 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 font-semibold">
                      There was an error sending your message. Please try again or contact us directly via social media.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot - Hidden from users, visible to bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input w-full"
                        required
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input w-full"
                        required
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input w-full"
                        maxLength={20}
                      />
                    </div>
                    <div>
                      <label className="label">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input w-full"
                        required
                      >
                        <option value="">Select a subject...</option>
                        <option value="Program Inquiry">Program Inquiry</option>
                        <option value="Registration Question">Registration Question</option>
                        <option value="Awareness Tour Booking">Awareness Tour Booking</option>
                        <option value="Partnership/Sponsorship">Partnership/Sponsorship</option>
                        <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-800/80 border-2 border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 transition-all duration-200 focus:border-accent-purple/50 focus:bg-dark-800/80 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 min-h-[150px] resize-y"
                      placeholder="Tell us how we can help..."
                      required
                      maxLength={2000}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.message.length}/2000 characters
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-400 p-4 bg-dark-900/50 rounded-lg">
                    <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>
                      Your information is protected and will never be shared. We typically respond within 24-48 hours.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full sm:w-auto px-12"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner h-5 w-5 mr-2"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Social Media */}
              <div className="card">
                <h3 className="font-display font-semibold text-lg text-white mb-4">
                  Connect With Us
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com/mitchssoccer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-dark-900/50 hover:bg-accent-purple/10 border border-gray-800/50 hover:border-accent-purple/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-accent-purple/10 border border-gray-800/50 rounded-lg flex items-center justify-center text-accent-purple group-hover:border-accent-purple/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Instagram</p>
                      <p className="text-sm text-gray-400">@mitchssoccer</p>
                    </div>
                  </a>

                  <a
                    href="https://facebook.com/mitchssoccer2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-dark-900/50 hover:bg-accent-purple/10 border border-gray-800/50 hover:border-accent-purple/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-accent-purple/10 border border-gray-800/50 rounded-lg flex items-center justify-center text-accent-purple group-hover:border-accent-purple/40 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Facebook</p>
                      <p className="text-sm text-gray-400">Mitch's Soccer 2.0</p>
                    </div>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800/50">
                  <p className="text-sm text-gray-400">
                    Prefer social media? Send us a direct message on Instagram or Facebook for the fastest response.
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="card">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent-purple mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Response Time</p>
                    <p className="text-white font-semibold">Within 24-48 hours</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card">
                <h3 className="font-display font-semibold text-lg text-white mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="/programs" className="block text-gray-300 hover:text-accent-purple transition-colors">
                    View Programs
                  </a>
                  <a href="/register" className="block text-gray-300 hover:text-accent-purple transition-colors">
                    Register Now
                  </a>
                  <a href="/about" className="block text-gray-300 hover:text-accent-purple transition-colors">
                    About Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-dark-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-white mb-8 text-center">
              Common Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30">
                <h3 className="font-semibold text-white mb-2">What does "Pay What You Can" mean?</h3>
                <p className="text-gray-300">
                  We provide suggested pricing for our programs, but families choose what they can afford to pay.
                  No one is turned away for inability to pay.
                </p>
              </div>

              <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30">
                <h3 className="font-semibold text-white mb-2">Do I need soccer experience to join?</h3>
                <p className="text-gray-300">
                  No! All our programs welcome players of all skill levels, from complete beginners to advanced players.
                </p>
              </div>

              <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30">
                <h3 className="font-semibold text-white mb-2">How do I book the Awareness Tour for my school?</h3>
                <p className="text-gray-300">
                  Use the contact form above with subject "Awareness Tour Booking" or message us on Instagram/Facebook.
                  The Awareness Tour is completely free for schools.
                </p>
              </div>

              <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30">
                <h3 className="font-semibold text-white mb-2">Where are programs located?</h3>
                <p className="text-gray-300">
                  Our programs run at various locations across Dartmouth and Halifax including Brownlow Park,
                  Cole Harbour All Weather Field, BMO Soccer Centre, and Dartmouth Sportsplex.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
