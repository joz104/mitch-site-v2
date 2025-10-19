'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const programs = [
    { name: 'Training Programs', href: '/programs/training', description: 'Comprehensive skills development' },
    { name: 'Camps & Clinics', href: '/programs/camps', description: 'Intensive soccer experiences' },
    { name: 'Awareness Tour', href: '/programs/awareness', description: 'Community outreach programs' },
    { name: 'Coach Development', href: '/programs/coaching', description: 'Professional certification' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900 border-b border-gray-800 shadow-lg h-16'
          : 'bg-dark-900 border-b border-gray-800 shadow-md h-20'
      }`}
    >
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-purple-electric rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-display font-bold text-xl">M</span>
            </div>
            <span className="font-display font-bold text-xl text-white hidden sm:block">
              Mitch's Soccer NEXT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('programs')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-gray-200 hover:text-electric-purple-400 font-medium transition-all duration-200 flex items-center space-x-1 relative group">
                <span>Programs</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-electric group-hover:w-full transition-all duration-300"></span>
              </button>

              {openDropdown === 'programs' && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl animate-slide-down">
                  <div className="bg-dark-800 border border-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-xl">
                    <div className="grid grid-cols-4 gap-6">
                      {programs.map((program) => (
                        <Link
                          key={program.name}
                          href={program.href}
                          className="group p-4 rounded-xl hover:bg-electric-purple-500/10 transition-all duration-300 border border-transparent hover:border-electric-purple-500/30"
                        >
                          <div className="w-12 h-12 bg-gradient-purple-electric rounded-lg flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="font-display font-semibold text-white mb-1">
                            {program.name}
                          </h3>
                          <p className="text-sm text-gray-400">{program.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-200 hover:text-electric-purple-400 font-medium transition-all duration-200 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-electric group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/shop" className="text-gray-200 hover:text-electric-purple-400 font-medium transition-all duration-200 relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-electric group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/media" className="text-gray-200 hover:text-electric-purple-400 font-medium transition-all duration-200 relative group">
              Media
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-electric group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-gray-200 hover:text-electric-purple-400 font-medium transition-all duration-200 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-electric group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/donate" className="btn btn-outline py-2 px-6 text-sm">
              Donate
            </Link>
            <Link href="/register" className="btn btn-primary py-2 px-6 text-sm">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-200 hover:text-neon-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-dark-900 z-50 overflow-y-auto animate-slide-down border-t border-gray-800">
          <nav className="container-custom py-6 space-y-6">
            {/* Programs Section */}
            <div>
              <h3 className="font-display font-semibold text-white mb-3">Programs</h3>
              <div className="space-y-2 pl-4">
                {programs.map((program) => (
                  <Link
                    key={program.name}
                    href={program.href}
                    className="block py-2 text-gray-300 hover:text-neon-purple transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {program.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="block py-2 font-medium text-gray-300 hover:text-neon-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/shop"
              className="block py-2 font-medium text-gray-300 hover:text-neon-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/media"
              className="block py-2 font-medium text-gray-300 hover:text-neon-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Media
            </Link>
            <Link
              href="/contact"
              className="block py-2 font-medium text-gray-300 hover:text-neon-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile CTAs */}
            <div className="pt-6 space-y-3 border-t border-gray-800">
              <Link href="/donate" className="btn btn-outline w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Donate
              </Link>
              <Link href="/register" className="btn btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
