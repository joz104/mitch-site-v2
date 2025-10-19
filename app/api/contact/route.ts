import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resend = new Resend(apiKey)
  }
  return resend
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, botcheck, timestamp } = body

    // Honeypot check - if botcheck is filled, it's a bot
    if (botcheck) {
      console.log('Spam detected: Honeypot triggered')
      return NextResponse.json({ success: false, error: 'Invalid submission' }, { status: 400 })
    }

    // Time-based check - if submitted too quickly, likely spam
    if (timestamp) {
      const submissionTime = Date.now()
      const timeDiff = (submissionTime - timestamp) / 1000

      if (timeDiff < 3) {
        console.log('Spam detected: Too fast submission')
        return NextResponse.json({ success: false, error: 'Invalid submission' }, { status: 400 })
      }
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const resendClient = getResend()
    const { data, error } = await resendClient.emails.send({
      from: "Mitch's Soccer NEXT <onboarding@resend.dev>", // Using Resend test domain until mitchssoccer.com is verified
      to: process.env.CONTACT_EMAIL || 'info@mitchssoccer.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
