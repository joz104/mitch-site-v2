'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useAutoSave, useAutoSaveStatus } from './useAutoSave'
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateEmail,
  validatePhone,
  validateDateOfBirth,
  validateCardNumber,
  validateExpirationDate,
  validateCVV,
  ValidationError
} from './validation'
import { toast, ToastContainer } from '@/components/Toast'

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
  termsAccepted: boolean
}

interface FieldError {
  [key: string]: string | undefined
}

export default function EnhancedRegisterPage() {
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
    termsAccepted: false
  })

  const [fieldErrors, setFieldErrors] = useState<FieldError>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSaveStatus } = useAutoSaveStatus()

  // Auto-save configuration
  const { loadSavedData, clearSavedData } = useAutoSave(formData, {
    key: 'registration-form-data',
    delay: 2000,
    onSave: () => showSaveStatus('saved'),
    onRestore: () => toast.info('Form data restored', 'Your previous progress has been loaded')
  })

  // Load saved data on mount
  useEffect(() => {
    const saved = loadSavedData()
    if (saved) {
      setFormData(saved)
    }
  }, [])

  const programs = [
    { id: 'youth-development', name: 'Youth Development Program', price: 299, description: 'Comprehensive training for young athletes ages 8-14' },
    { id: 'summer-camp', name: 'Summer Soccer Camp', price: 349, description: 'Intensive 2-week camp with daily training sessions' },
    { id: 'elite-academy', name: 'Elite Academy', price: 899, description: 'Advanced training for competitive players' },
    { id: 'goalkeeper-clinic', name: 'Goalkeeper Specialized Clinic', price: 249, description: 'Focused training for aspiring goalkeepers' },
  ]

  const sessions = [
    'January 15, 2025 - April 7, 2025',
    'April 14, 2025 - July 6, 2025',
    'July 13, 2025 - October 4, 2025',
  ]

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '')
    if (phone.length >= 6) {
      return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`
    } else if (phone.length >= 3) {
      return `${phone.slice(0, 3)}-${phone.slice(3)}`
    }
    return phone
  }

  // Format card number as user types
  const formatCardNumber = (value: string) => {
    const card = value.replace(/\s/g, '')
    const chunks = card.match(/.{1,4}/g)
    return chunks ? chunks.join(' ') : card
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const expiry = value.replace(/\D/g, '')
    if (expiry.length >= 2) {
      return `${expiry.slice(0, 2)}/${expiry.slice(2, 4)}`
    }
    return expiry
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    // Format specific fields
    if (field === 'phone' || field === 'emergencyPhone') {
      value = formatPhoneNumber(value)
    } else if (field === 'cardNumber') {
      value = formatCardNumber(value)
    } else if (field === 'expirationDate') {
      value = formatExpiryDate(value)
    }

    setFormData(prev => ({ ...prev, [field]: value }))
    setTouchedFields(prev => new Set(prev).add(field))

    // Validate field on change
    validateField(field, value)
  }

  const validateField = (field: string, value: any) => {
    let error: string | undefined

    switch (field) {
      case 'email':
        const emailResult = validateEmail(value)
        error = emailResult.isValid ? undefined : emailResult.error
        break
      case 'phone':
      case 'emergencyPhone':
        const phoneResult = validatePhone(value)
        error = phoneResult.isValid ? undefined : phoneResult.error
        break
      case 'dateOfBirth':
        const dobResult = validateDateOfBirth(value)
        error = dobResult.isValid ? undefined : dobResult.error
        break
      case 'cardNumber':
        const cardResult = validateCardNumber(value)
        error = cardResult.isValid ? undefined : cardResult.error
        break
      case 'expirationDate':
        const expiryResult = validateExpirationDate(value)
        error = expiryResult.isValid ? undefined : expiryResult.error
        break
      case 'cvv':
        const cvvResult = validateCVV(value)
        error = cvvResult.isValid ? undefined : cvvResult.error
        break
      default:
        if (!value && field.includes('Name')) {
          error = 'This field is required'
        }
        break
    }

    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }

  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field))
    validateField(field, formData[field as keyof FormData])
  }

  const validateCurrentStep = (): boolean => {
    let errors: ValidationError[] = []

    switch (currentStep) {
      case 1:
        errors = validateStep1(formData)
        break
      case 2:
        errors = validateStep2(formData)
        break
      case 3:
        errors = validateStep3(formData)
        if (!formData.termsAccepted) {
          errors.push({ field: 'termsAccepted', message: 'You must accept the terms and conditions' })
        }
        break
    }

    // Update field errors
    const errorMap: FieldError = {}
    errors.forEach(error => {
      errorMap[error.field] = error.message
    })
    setFieldErrors(errorMap)

    // Mark all fields as touched for current step
    const stepFields = getStepFields(currentStep)
    setTouchedFields(prev => {
      const newSet = new Set(prev)
      stepFields.forEach(field => newSet.add(field))
      return newSet
    })

    if (errors.length > 0) {
      toast.error('Please fix the errors before continuing')
      // Focus first error field
      const firstErrorField = errors[0].field
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
      element?.focus()
      return false
    }

    return true
  }

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ['participantFirstName', 'participantLastName', 'dateOfBirth', 'parentFirstName', 'parentLastName', 'email', 'phone', 'emergencyContact', 'emergencyPhone']
      case 2:
        return ['program', 'session', 'tshirtSize']
      case 3:
        return ['cardNumber', 'expirationDate', 'cvv', 'termsAccepted']
      default:
        return []
    }
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 3) {
        handleSubmit()
      } else {
        setCurrentStep((currentStep + 1) as Step)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        toast.success('Step completed', 'Moving to next step')
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear saved data on successful submission
    clearSavedData()

    setIsSubmitting(false)
    setCurrentStep(4)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast.success('Registration Complete!', 'Check your email for confirmation')
  }

  const selectedProgram = programs.find(p => p.id === formData.program)
  const total = (selectedProgram?.price || 0) + (formData.addMeals ? 50 : 0)

  // Input field component with error display
  const InputField = ({
    name,
    label,
    type = 'text',
    value,
    required = false,
    placeholder = '',
    autoComplete = ''
  }: {
    name: string
    label: string
    type?: string
    value: string | number
    required?: boolean
    placeholder?: string
    autoComplete?: string
  }) => {
    const hasError = touchedFields.has(name) && fieldErrors[name]

    return (
      <div>
        <label className="label" htmlFor={name}>
          {label} {required && <span className="text-electric-purple-400">*</span>}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => updateFormData(name as keyof FormData, e.target.value)}
          onBlur={() => handleFieldBlur(name)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`input w-full ${hasError ? 'input-error' : ''}`}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
        {hasError && (
          <p id={`${name}-error`} className="text-red-500 text-sm mt-1" role="alert">
            {fieldErrors[name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <ToastContainer />

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Header */}
      <section className="bg-dark-900 border-b border-electric-purple-500/20 py-8">
        <div className="container-custom">
          <h1 className="font-display font-bold text-display-lg text-white mb-2">
            Program Registration
          </h1>
          <p className="text-body text-gray-300">Complete the form below to register for your selected program</p>
        </div>
      </section>

      {/* Progress Indicator with improved accessibility */}
      <section className="bg-dark-900/95 backdrop-blur-xl border-b border-electric-purple-500/20 py-6 sticky top-20 z-40">
        <div className="container-custom">
          <nav aria-label="Registration progress">
            <ol className="flex items-center justify-between max-w-3xl mx-auto">
              {[
                { step: 1, label: 'Participant Info' },
                { step: 2, label: 'Program Selection' },
                { step: 3, label: 'Payment' },
                { step: 4, label: 'Confirmation' },
              ].map((item, index) => (
                <li key={item.step} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                        currentStep === item.step
                          ? 'bg-gradient-purple-electric text-white shadow-purple-subtle scale-110'
                          : currentStep > item.step
                          ? 'bg-gradient-green-electric text-black shadow-md'
                          : 'bg-dark-800 text-gray-500 border border-gray-800/50'
                      }`}
                      aria-current={currentStep === item.step ? 'step' : undefined}
                      aria-label={`Step ${item.step}: ${item.label} ${currentStep > item.step ? '(completed)' : currentStep === item.step ? '(current)' : ''}`}
                    >
                      {currentStep > item.step ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span aria-hidden="true">{item.step}</span>
                      )}
                    </div>
                    <span className={`ml-3 font-medium hidden sm:block ${
                      currentStep >= item.step ? 'text-white' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`h-0.5 flex-1 mx-4 rounded-full transition-all duration-200 ${
                      currentStep > item.step ? 'bg-gradient-green-electric' : 'bg-dark-800'
                    }`} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Form Content */}
      <main id="main-content" className="content-section">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="desktop-sidebar">
              {/* Form */}
              <div className="lg:col-span-1">
                <div className="card">
                  {/* Step 1: Participant Information */}
                  {currentStep === 1 && (
                    <div className="content-spacing">
                      <div>
                        <h2 className="font-display font-bold text-display-sm text-white mb-2">
                          Participant Information
                        </h2>
                        <p className="text-body">Tell us about the person registering for the program</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                          name="participantFirstName"
                          label="Participant First Name"
                          value={formData.participantFirstName}
                          required
                          autoComplete="given-name"
                        />
                        <InputField
                          name="participantLastName"
                          label="Participant Last Name"
                          value={formData.participantLastName}
                          required
                          autoComplete="family-name"
                        />
                      </div>

                      <InputField
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        value={formData.dateOfBirth}
                        required
                      />

                      <div className="divider-thick" />

                      <div>
                        <h3 className="font-display font-semibold text-lg text-white mb-4">
                          Parent/Guardian Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                          <InputField
                            name="parentFirstName"
                            label="First Name"
                            value={formData.parentFirstName}
                            required
                            autoComplete="given-name"
                          />
                          <InputField
                            name="parentLastName"
                            label="Last Name"
                            value={formData.parentLastName}
                            required
                            autoComplete="family-name"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <InputField
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            required
                            placeholder="you@example.com"
                            autoComplete="email"
                          />
                          <InputField
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            value={formData.phone}
                            required
                            placeholder="555-123-4567"
                            autoComplete="tel"
                          />
                        </div>
                      </div>

                      <div className="divider-thick" />

                      <div>
                        <h3 className="font-display font-semibold text-lg text-white mb-4">
                          Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <InputField
                            name="emergencyContact"
                            label="Emergency Contact Name"
                            value={formData.emergencyContact}
                            required
                          />
                          <InputField
                            name="emergencyPhone"
                            label="Emergency Contact Phone"
                            type="tel"
                            value={formData.emergencyPhone}
                            required
                            placeholder="555-123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Program Selection */}
                  {currentStep === 2 && (
                    <div className="content-spacing">
                      <div>
                        <h2 className="font-display font-bold text-display-sm text-white mb-2">
                          Program Selection
                        </h2>
                        <p className="text-body">Choose your program and session details</p>
                      </div>

                      <div>
                        <label className="label">
                          Select Program <span className="text-electric-purple-400">*</span>
                        </label>
                        <div className="space-y-4" role="radiogroup" aria-required="true">
                          {programs.map((program) => (
                            <label
                              key={program.id}
                              className={`flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                formData.program === program.id
                                  ? 'border-electric-purple-500 bg-electric-purple-500/10 shadow-purple-subtle'
                                  : 'border-gray-800/50 bg-dark-900/50 hover:border-electric-purple-500/30 hover:bg-electric-purple-500/5'
                              }`}
                            >
                              <input
                                type="radio"
                                name="program"
                                value={program.id}
                                checked={formData.program === program.id}
                                onChange={(e) => updateFormData('program', e.target.value)}
                                className="mt-1 mr-4 accent-electric-purple-500"
                                aria-describedby={`${program.id}-description`}
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-white text-lg">{program.name}</p>
                                <p id={`${program.id}-description`} className="text-gray-400 text-sm mt-1 mb-2">
                                  {program.description}
                                </p>
                                <p className="text-electric-purple-400 font-bold text-lg">${program.price}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                        {touchedFields.has('program') && fieldErrors.program && (
                          <p className="text-red-500 text-sm mt-2" role="alert">
                            {fieldErrors.program}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="label" htmlFor="session">
                          Select Session <span className="text-electric-purple-400">*</span>
                        </label>
                        <select
                          id="session"
                          name="session"
                          value={formData.session}
                          onChange={(e) => updateFormData('session', e.target.value)}
                          onBlur={() => handleFieldBlur('session')}
                          className={`input w-full ${touchedFields.has('session') && fieldErrors.session ? 'input-error' : ''}`}
                          required
                        >
                          <option value="">Choose a session...</option>
                          {sessions.map((session) => (
                            <option key={session} value={session}>
                              {session}
                            </option>
                          ))}
                        </select>
                        {touchedFields.has('session') && fieldErrors.session && (
                          <p className="text-red-500 text-sm mt-1" role="alert">
                            {fieldErrors.session}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="label" htmlFor="tshirtSize">
                          T-Shirt Size <span className="text-electric-purple-400">*</span>
                        </label>
                        <select
                          id="tshirtSize"
                          name="tshirtSize"
                          value={formData.tshirtSize}
                          onChange={(e) => updateFormData('tshirtSize', e.target.value)}
                          onBlur={() => handleFieldBlur('tshirtSize')}
                          className={`input w-full ${touchedFields.has('tshirtSize') && fieldErrors.tshirtSize ? 'input-error' : ''}`}
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
                        {touchedFields.has('tshirtSize') && fieldErrors.tshirtSize && (
                          <p className="text-red-500 text-sm mt-1" role="alert">
                            {fieldErrors.tshirtSize}
                          </p>
                        )}
                      </div>

                      <div className="divider-thick" />

                      <div>
                        <h3 className="font-display font-semibold text-lg text-white mb-4">
                          Add-Ons (Optional)
                        </h3>
                        <label className="flex items-start p-5 border-2 border-gray-800/50 bg-dark-900/50 rounded-xl cursor-pointer hover:border-electric-purple-500/30 hover:bg-electric-purple-500/5 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={formData.addMeals}
                            onChange={(e) => updateFormData('addMeals', e.target.checked)}
                            className="mt-1 mr-4 accent-electric-purple-500"
                            aria-describedby="meals-description"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-white">Daily Lunch Package</p>
                            <p id="meals-description" className="text-sm text-gray-400 mt-1 mb-2">
                              Nutritious lunch provided each training day, including drinks and snacks
                            </p>
                            <p className="text-electric-purple-400 font-bold">+$50</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div className="content-spacing">
                      <div>
                        <h2 className="font-display font-bold text-display-sm text-white mb-2">
                          Payment Information
                        </h2>
                        <p className="text-body">Securely enter your payment details</p>
                      </div>

                      <div className="bg-dark-900/50 rounded-xl p-6 space-y-3 border border-electric-purple-500/20">
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
                        <div className="pt-3 border-t border-electric-purple-500/20 flex justify-between">
                          <span className="font-semibold text-white text-lg">Total</span>
                          <span className="font-bold text-gradient-purple text-2xl">${total}</span>
                        </div>
                      </div>

                      <InputField
                        name="cardNumber"
                        label="Card Number"
                        value={formData.cardNumber}
                        required
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <InputField
                          name="expirationDate"
                          label="Expiration Date"
                          value={formData.expirationDate}
                          required
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                        />
                        <InputField
                          name="cvv"
                          label="CVV"
                          value={formData.cvv}
                          required
                          placeholder="123"
                          autoComplete="cc-csc"
                        />
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-400 p-4 bg-dark-900/50 rounded-lg">
                        <svg className="w-5 h-5 text-neon-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Your payment information is secure and encrypted using industry-standard SSL</span>
                      </div>

                      <div className="divider-thick" />

                      <div>
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                            className="mt-1 mr-3 accent-electric-purple-500"
                            aria-describedby="terms-text"
                            required
                          />
                          <span id="terms-text" className="text-sm text-gray-300">
                            I agree to the{' '}
                            <a href="/terms" className="text-electric-purple-400 hover:text-electric-purple-300 underline">
                              terms and conditions
                            </a>{' '}
                            and{' '}
                            <a href="/waiver" className="text-electric-purple-400 hover:text-electric-purple-300 underline">
                              liability waiver
                            </a>
                          </span>
                        </label>
                        {touchedFields.has('termsAccepted') && fieldErrors.termsAccepted && (
                          <p className="text-red-500 text-sm mt-2" role="alert">
                            {fieldErrors.termsAccepted}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-green-electric rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-scale-in">
                        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="font-display font-bold text-display-md text-white mb-4">
                        Registration Complete!
                      </h2>
                      <p className="text-body-lg text-gray-300 mb-10 max-w-md mx-auto">
                        Thank you for registering! A confirmation email has been sent to <strong className="text-white">{formData.email}</strong>
                      </p>

                      <div className="bg-dark-900/50 border border-electric-purple-500/20 rounded-xl p-8 max-w-md mx-auto mb-10 text-left">
                        <h3 className="font-display font-semibold text-lg text-white mb-6">Registration Summary</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Participant:</span>
                            <span className="font-semibold text-white">
                              {formData.participantFirstName} {formData.participantLastName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Program:</span>
                            <span className="font-semibold text-white">{selectedProgram?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Session:</span>
                            <span className="font-semibold text-white text-right">{formData.session}</span>
                          </div>
                          <div className="pt-3 border-t border-electric-purple-500/20 flex justify-between">
                            <span className="text-gray-400">Total Paid:</span>
                            <span className="font-bold text-gradient-purple text-xl">${total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-primary">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Add to Calendar
                        </button>
                        <button className="btn btn-outline">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          Print Confirmation
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  {currentStep < 4 && (
                    <div className="flex justify-between pt-8 border-t border-electric-purple-500/20 mt-8">
                      <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`btn btn-outline ${currentStep === 1 ? 'invisible' : ''}`}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="loading-spinner h-5 w-5 mr-2" />
                            Processing...
                          </>
                        ) : currentStep === 3 ? (
                          <>
                            Complete Registration
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Continue
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Summary - Desktop Only */}
              <aside className="hidden lg:block">
                <div className="card sticky top-32">
                  <h3 className="font-display font-bold text-lg text-white mb-6">
                    Registration Summary
                  </h3>

                  {selectedProgram ? (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Selected Program</p>
                        <p className="font-semibold text-white">{selectedProgram.name}</p>
                      </div>

                      {formData.session && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Session</p>
                          <p className="font-semibold text-white">{formData.session}</p>
                        </div>
                      )}

                      {formData.participantFirstName && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Participant</p>
                          <p className="font-semibold text-white">
                            {formData.participantFirstName} {formData.participantLastName}
                          </p>
                        </div>
                      )}

                      <div className="divider" />

                      <div className="space-y-3">
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
                        <div className="pt-3 border-t border-electric-purple-500/20 flex justify-between">
                          <span className="font-semibold text-white">Total</span>
                          <span className="font-bold text-gradient-purple text-xl">${total}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Select a program to see pricing details</p>
                  )}

                  <div className="mt-8 pt-8 border-t border-electric-purple-500/20">
                    <p className="text-sm text-gray-400 mb-3">Need help?</p>
                    <a
                      href="/contact"
                      className="inline-flex items-center text-electric-purple-400 font-semibold hover:text-electric-purple-300 text-sm transition-colors"
                    >
                      Contact Support
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}