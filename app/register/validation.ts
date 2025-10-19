// Form validation utilities for registration

export interface ValidationError {
  field: string
  message: string
}

export interface FieldValidation {
  isValid: boolean
  error?: string
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (US format)
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

// Credit card validation
const CARD_REGEX = /^[0-9]{13,19}$/
const CVV_REGEX = /^[0-9]{3,4}$/
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/([0-9]{2})$/

export const validateEmail = (email: string): FieldValidation => {
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  return { isValid: true }
}

export const validatePhone = (phone: string): FieldValidation => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' }
  }
  if (!PHONE_REGEX.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number (e.g., 555-123-4567)' }
  }
  return { isValid: true }
}

export const validateRequired = (value: string, fieldName: string): FieldValidation => {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` }
  }
  return { isValid: true }
}

export const validateDateOfBirth = (dob: string): FieldValidation => {
  if (!dob) {
    return { isValid: false, error: 'Date of birth is required' }
  }

  const date = new Date(dob)
  const today = new Date()
  const minAge = 4 // Minimum age for programs
  const maxAge = 18 // Maximum age for youth programs

  const age = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365))

  if (age < minAge) {
    return { isValid: false, error: `Participant must be at least ${minAge} years old` }
  }
  if (age > maxAge) {
    return { isValid: false, error: `Youth programs are for ages ${minAge}-${maxAge}` }
  }

  return { isValid: true }
}

export const validateCardNumber = (cardNumber: string): FieldValidation => {
  const cleaned = cardNumber.replace(/\s/g, '')

  if (!cleaned) {
    return { isValid: false, error: 'Card number is required' }
  }
  if (!CARD_REGEX.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid card number' }
  }

  // Basic Luhn algorithm check
  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Please enter a valid card number' }
  }

  return { isValid: true }
}

export const validateExpirationDate = (expiry: string): FieldValidation => {
  if (!expiry) {
    return { isValid: false, error: 'Expiration date is required' }
  }

  if (!EXPIRY_REGEX.test(expiry)) {
    return { isValid: false, error: 'Format must be MM/YY' }
  }

  const [month, year] = expiry.split('/')
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
  const currentDate = new Date()

  if (expiryDate < currentDate) {
    return { isValid: false, error: 'Card has expired' }
  }

  return { isValid: true }
}

export const validateCVV = (cvv: string): FieldValidation => {
  if (!cvv) {
    return { isValid: false, error: 'CVV is required' }
  }
  if (!CVV_REGEX.test(cvv)) {
    return { isValid: false, error: 'CVV must be 3 or 4 digits' }
  }
  return { isValid: true }
}

// Validate entire step
export const validateStep1 = (formData: any): ValidationError[] => {
  const errors: ValidationError[] = []

  const firstNameCheck = validateRequired(formData.participantFirstName, 'First name')
  if (!firstNameCheck.isValid) {
    errors.push({ field: 'participantFirstName', message: firstNameCheck.error! })
  }

  const lastNameCheck = validateRequired(formData.participantLastName, 'Last name')
  if (!lastNameCheck.isValid) {
    errors.push({ field: 'participantLastName', message: lastNameCheck.error! })
  }

  const dobCheck = validateDateOfBirth(formData.dateOfBirth)
  if (!dobCheck.isValid) {
    errors.push({ field: 'dateOfBirth', message: dobCheck.error! })
  }

  const parentFirstCheck = validateRequired(formData.parentFirstName, 'Parent first name')
  if (!parentFirstCheck.isValid) {
    errors.push({ field: 'parentFirstName', message: parentFirstCheck.error! })
  }

  const parentLastCheck = validateRequired(formData.parentLastName, 'Parent last name')
  if (!parentLastCheck.isValid) {
    errors.push({ field: 'parentLastName', message: parentLastCheck.error! })
  }

  const emailCheck = validateEmail(formData.email)
  if (!emailCheck.isValid) {
    errors.push({ field: 'email', message: emailCheck.error! })
  }

  const phoneCheck = validatePhone(formData.phone)
  if (!phoneCheck.isValid) {
    errors.push({ field: 'phone', message: phoneCheck.error! })
  }

  const emergencyContactCheck = validateRequired(formData.emergencyContact, 'Emergency contact')
  if (!emergencyContactCheck.isValid) {
    errors.push({ field: 'emergencyContact', message: emergencyContactCheck.error! })
  }

  const emergencyPhoneCheck = validatePhone(formData.emergencyPhone)
  if (!emergencyPhoneCheck.isValid) {
    errors.push({ field: 'emergencyPhone', message: emergencyPhoneCheck.error! })
  }

  return errors
}

export const validateStep2 = (formData: any): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!formData.program) {
    errors.push({ field: 'program', message: 'Please select a program' })
  }

  if (!formData.session) {
    errors.push({ field: 'session', message: 'Please select a session' })
  }

  if (!formData.tshirtSize) {
    errors.push({ field: 'tshirtSize', message: 'Please select a t-shirt size' })
  }

  return errors
}

export const validateStep3 = (formData: any): ValidationError[] => {
  const errors: ValidationError[] = []

  const cardCheck = validateCardNumber(formData.cardNumber)
  if (!cardCheck.isValid) {
    errors.push({ field: 'cardNumber', message: cardCheck.error! })
  }

  const expiryCheck = validateExpirationDate(formData.expirationDate)
  if (!expiryCheck.isValid) {
    errors.push({ field: 'expirationDate', message: expiryCheck.error! })
  }

  const cvvCheck = validateCVV(formData.cvv)
  if (!cvvCheck.isValid) {
    errors.push({ field: 'cvv', message: cvvCheck.error! })
  }

  return errors
}