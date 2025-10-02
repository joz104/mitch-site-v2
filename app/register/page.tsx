'use client'

import { useState } from 'react'
import Image from 'next/image'

type Step = 1 | 2 | 3 | 4

interface FormData {
  participantFirstName: string
  participantLastName: string
  dateOfBirth: string
  parentFirstName: string
  parentLastName: string
  email: string
  phone: string
  emergencyContact: string
  emergencyPhone: string
  program: string
  session: string
  tshirtSize: string
  addMeals: boolean
  cardNumber: string
  expirationDate: string
  cvv: string
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>({
    participantFirstName: '',
    participantLastName: '',
    dateOfBirth: '',
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    program: '',
    session: '',
    tshirtSize: '',
    addMeals: false,
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  })

  const programs = [
    { id: 'youth-development', name: 'Youth Development Program', price: 299 },
    { id: 'summer-camp', name: 'Summer Soccer Camp', price: 349 },
    { id: 'elite-academy', name: 'Elite Academy', price: 899 },
    { id: 'goalkeeper-clinic', name: 'Goalkeeper Specialized Clinic', price: 249 },
  ]

  const sessions = [
    'January 15, 2025 - April 7, 2025',
    'April 14, 2025 - July 6, 2025',
    'July 13, 2025 - October 4, 2025',
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const selectedProgram = programs.find(p => p.id === formData.program)
  const total = (selectedProgram?.price || 0) + (formData.addMeals ? 50 : 0)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-dark-900 border-b border-neon-purple/20 py-8">
        <div className="container-custom">
          <h1 className="font-display font-bold text-3xl text-white mb-2">
            Program Registration
          </h1>
          <p className="text-gray-300">Complete the form below to register for your selected program</p>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="bg-dark-900/95 backdrop-blur-xl border-b border-neon-purple/20 py-6 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { step: 1, label: 'Participant Info' },
              { step: 2, label: 'Program Selection' },
              { step: 3, label: 'Payment' },
              { step: 4, label: 'Confirmation' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentStep === item.step
                        ? 'bg-gradient-purple-electric text-white shadow-purple-subtle scale-110'
                        : currentStep > item.step
                        ? 'bg-gradient-green-electric text-black shadow-lg'
                        : 'bg-dark-800 text-gray-500 border border-gray-800'
                    }`}
                  >
                    {currentStep > item.step ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      item.step
                    )}
                  </div>
                  <span className={`ml-2 font-medium hidden sm:block ${
                    currentStep >= item.step ? 'text-white' : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full transition-all duration-300 ${
                    currentStep > item.step ? 'bg-gradient-green-electric shadow-md' : 'bg-dark-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-dark-800 to-dark-700 border-2 border-neon-purple/40 rounded-2xl shadow-dark-card p-8">
                  {/* Step 1: Participant Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-display font-bold text-2xl text-white mb-2">
                          Participant Information
                        </h2>
                        <p className="text-gray-300">Tell us about the person registering for the program</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Participant First Name *</label>
                          <input
                            type="text"
                            value={formData.participantFirstName}
                            onChange={(e) => updateFormData('participantFirstName', e.target.value)}
                            className="input w-full"
                            required
                          />
                        </div>
                        <div>
                          <label className="label">Participant Last Name *</label>
                          <input
                            type="text"
                            value={formData.participantLastName}
                            onChange={(e) => updateFormData('participantLastName', e.target.value)}
                            className="input w-full"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label">Date of Birth *</label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                          className="input w-full"
                          required
                        />
                      </div>

                      <div className="pt-6 border-t border-neon-purple/20">
                        <h3 className="font-display font-semibold text-lg text-white mb-4">
                          Parent/Guardian Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="label">First Name *</label>
                            <input
                              type="text"
                              value={formData.parentFirstName}
                              onChange={(e) => updateFormData('parentFirstName', e.target.value)}
                              className="input w-full"
                              required
                            />
                          </div>
                          <div>
                            <label className="label">Last Name *</label>
                            <input
                              type="text"
                              value={formData.parentLastName}
                              onChange={(e) => updateFormData('parentLastName', e.target.value)}
                              className="input w-full"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Email Address *</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateFormData('email', e.target.value)}
                              className="input w-full"
                              required
                            />
                          </div>
                          <div>
                            <label className="label">Phone Number *</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => updateFormData('phone', e.target.value)}
                              className="input w-full"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-neon-purple/20">
                        <h3 className="font-display font-semibold text-lg text-white mb-4">
                          Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Emergency Contact Name *</label>
                            <input
                              type="text"
                              value={formData.emergencyContact}
                              onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                              className="input w-full"
                              required
                            />
                          </div>
                          <div>
                            <label className="label">Emergency Contact Phone *</label>
                            <input
                              type="tel"
                              value={formData.emergencyPhone}
                              onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                              className="input w-full"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Program Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-display font-bold text-2xl text-white mb-2">
                          Program Selection
                        </h2>
                        <p className="text-gray-300">Choose your program and session details</p>
                      </div>

                      <div>
                        <label className="label">Select Program *</label>
                        <div className="space-y-3">
                          {programs.map((program) => (
                            <label
                              key={program.id}
                              className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                formData.program === program.id
                                  ? 'border-electric-purple-500 bg-electric-purple-500/10'
                                  : 'border-neon-purple/20 bg-dark-900 hover:border-neon-purple/40 hover:bg-neon-purple/5'
                              }`}
                            >
                              <input
                                type="radio"
                                name="program"
                                value={program.id}
                                checked={formData.program === program.id}
                                onChange={(e) => updateFormData('program', e.target.value)}
                                className="mt-1 mr-3 accent-electric-purple-500"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-white">{program.name}</p>
                                <p className="text-electric-purple-400 font-semibold">${program.price}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="label">Select Session *</label>
                        <select
                          value={formData.session}
                          onChange={(e) => updateFormData('session', e.target.value)}
                          className="input w-full"
                          required
                        >
                          <option value="">Choose a session...</option>
                          {sessions.map((session) => (
                            <option key={session} value={session}>
                              {session}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="label">T-Shirt Size *</label>
                        <select
                          value={formData.tshirtSize}
                          onChange={(e) => updateFormData('tshirtSize', e.target.value)}
                          className="input w-full"
                          required
                        >
                          <option value="">Select size...</option>
                          <option value="YS">Youth Small</option>
                          <option value="YM">Youth Medium</option>
                          <option value="YL">Youth Large</option>
                          <option value="AS">Adult Small</option>
                          <option value="AM">Adult Medium</option>
                          <option value="AL">Adult Large</option>
                          <option value="AXL">Adult XL</option>
                        </select>
                      </div>

                      <div className="pt-6 border-t border-neon-purple/20">
                        <h3 className="font-display font-semibold text-lg text-white mb-4">
                          Add-Ons (Optional)
                        </h3>
                        <label className="flex items-start p-4 border-2 border-neon-purple/20 bg-dark-900 rounded-xl cursor-pointer hover:border-neon-purple/40 hover:bg-neon-purple/5 transition-all">
                          <input
                            type="checkbox"
                            checked={formData.addMeals}
                            onChange={(e) => updateFormData('addMeals', e.target.checked)}
                            className="mt-1 mr-3 accent-electric-purple-500"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-white">Daily Lunch Package</p>
                            <p className="text-sm text-gray-400 mb-1">Nutritious lunch provided each training day</p>
                            <p className="text-electric-purple-400 font-semibold">+$50</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-display font-bold text-2xl text-white mb-2">
                          Payment Information
                        </h2>
                        <p className="text-gray-300">Securely enter your payment details</p>
                      </div>

                      <div className="bg-dark-900 rounded-xl p-4 space-y-2 border border-neon-purple/20">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Program Fee</span>
                          <span className="font-semibold text-white">${selectedProgram?.price || 0}</span>
                        </div>
                        {formData.addMeals && (
                          <div className="flex justify-between">
                            <span className="text-gray-300">Daily Lunch Package</span>
                            <span className="font-semibold text-white">$50</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-neon-purple/20 flex justify-between">
                          <span className="font-semibold text-white">Total</span>
                          <span className="font-bold text-gradient-purple text-xl">${total}</span>
                        </div>
                      </div>

                      <div>
                        <label className="label">Card Number *</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => updateFormData('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="input w-full"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Expiration Date *</label>
                          <input
                            type="text"
                            value={formData.expirationDate}
                            onChange={(e) => updateFormData('expirationDate', e.target.value)}
                            placeholder="MM / YY"
                            className="input w-full"
                            required
                          />
                        </div>
                        <div>
                          <label className="label">CVV *</label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => updateFormData('cvv', e.target.value)}
                            placeholder="123"
                            className="input w-full"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-400 pt-4">
                        <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Your payment information is secure and encrypted</span>
                      </div>

                      <div className="pt-6 border-t border-neon-purple/20">
                        <label className="flex items-start cursor-pointer">
                          <input type="checkbox" className="mt-1 mr-3 accent-electric-purple-500" required />
                          <span className="text-sm text-gray-300">
                            I agree to the <a href="/terms" className="text-electric-purple-400 hover:text-neon-purple hover:underline">terms and conditions</a> and{' '}
                            <a href="/waiver" className="text-electric-purple-400 hover:text-neon-purple hover:underline">liability waiver</a>
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-green-electric rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
                        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="font-display font-bold text-3xl text-white mb-4">
                        Registration Complete!
                      </h2>
                      <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
                        Thank you for registering! A confirmation email has been sent to {formData.email}
                      </p>

                      <div className="bg-dark-900 border border-neon-purple/30 rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
                        <h3 className="font-semibold text-white mb-4">Registration Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Participant:</span>
                            <span className="font-semibold text-white">{formData.participantFirstName} {formData.participantLastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Program:</span>
                            <span className="font-semibold text-white">{selectedProgram?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Session:</span>
                            <span className="font-semibold text-white">{formData.session}</span>
                          </div>
                          <div className="pt-2 border-t border-neon-purple/20 flex justify-between">
                            <span className="text-gray-400">Total Paid:</span>
                            <span className="font-bold text-gradient-purple text-lg">${total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-primary">
                          Add to Calendar
                        </button>
                        <button className="btn btn-outline">
                          Print Confirmation
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  {currentStep < 4 && (
                    <div className="flex justify-between pt-8 border-t border-neon-purple/20 mt-8">
                      <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`btn btn-outline ${currentStep === 1 ? 'invisible' : ''}`}
                      >
                        ← Back
                      </button>
                      <button
                        onClick={nextStep}
                        className="btn btn-primary"
                      >
                        {currentStep === 3 ? 'Complete Registration' : 'Continue →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-1">
                <div className="card sticky top-32">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    Registration Summary
                  </h3>

                  {selectedProgram ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Selected Program</p>
                        <p className="font-semibold text-white">{selectedProgram.name}</p>
                      </div>

                      {formData.session && (
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Session</p>
                          <p className="font-semibold text-white">{formData.session}</p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-neon-purple/20 space-y-2">
                        <div className="flex justify-between text-gray-300">
                          <span>Program Fee</span>
                          <span className="font-semibold text-white">${selectedProgram.price}</span>
                        </div>
                        {formData.addMeals && (
                          <div className="flex justify-between text-gray-300">
                            <span>Lunch Package</span>
                            <span className="font-semibold text-white">$50</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-neon-purple/20 flex justify-between">
                          <span className="font-semibold text-white">Total</span>
                          <span className="font-bold text-gradient-purple text-xl">${total}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Select a program to see pricing details</p>
                  )}

                  <div className="mt-6 pt-6 border-t border-neon-purple/20">
                    <p className="text-sm text-gray-400 mb-2">Need help?</p>
                    <a href="/contact" className="text-electric-purple-400 font-semibold hover:text-neon-purple text-sm transition-colors">
                      Contact Support →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
