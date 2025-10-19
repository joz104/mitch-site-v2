# Contact Form Setup Guide - Resend Integration

## Overview
Your contact form now uses Resend to send emails directly to your inbox with built-in spam protection.

**Benefits:**
- ✅ 3,000 emails/month FREE
- ✅ Excellent email deliverability
- ✅ Built-in spam protection (honeypot + time-based checks)
- ✅ Dashboard to view all sent emails
- ✅ No submission limits for your volume

---

## Setup Instructions (10 minutes)

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Click "Sign Up" (free account)
3. Verify your email address

### Step 2: Get Your API Key
1. Once logged in, go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it: "Mitch's Soccer Contact Form"
4. Copy the API key (starts with `re_...`)

### Step 3: Configure Environment Variables
1. In your project root, create a file named `.env.local`
2. Add these two lines:
```
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=your-email@example.com
```
3. Replace `re_your_actual_api_key_here` with your real API key from Step 2
4. Replace `your-email@example.com` with the email where you want to receive submissions

### Step 4: Verify Domain (Important!)
1. In Resend dashboard, go to https://resend.com/domains
2. Click "Add Domain"
3. Add your domain: `mitchssoccer.com`
4. Follow their DNS verification steps (add TXT records to your domain)

**OR Use Resend's Test Domain (for testing):**
- Use `onboarding@resend.dev` as the "from" address
- Limited to 1 email/day, but good for testing

### Step 5: Update API Route
Open `/app/api/contact/route.ts` and update line 16:
```typescript
from: "Mitch's Soccer NEXT <contact@mitchssoccer.com>",
```

If you're still testing and haven't verified your domain yet, use:
```typescript
from: "Mitch's Soccer NEXT <onboarding@resend.dev>",
```

### Step 6: Restart Development Server
```bash
npm run dev
```

The `.env.local` file will be loaded automatically.

---

## Testing the Contact Form

1. Go to http://localhost:5999/contact
2. Fill out the form
3. Submit
4. Check your email inbox (the one you put in CONTACT_EMAIL)
5. You should receive the submission within seconds!

**Spam Protection Automatic:**
- Honeypot field catches bots
- Time-based checks prevent instant submissions
- Resend has built-in spam filtering

---

## File Structure

```
/app/api/contact/route.ts   - API endpoint that handles form submissions
/app/contact/page.tsx        - Contact form page with spam protection
/.env.local                  - Your API keys (create this file)
/.env.local.example          - Template (already created)
```

---

## Troubleshooting

**"Failed to send email" error:**
- Check that RESEND_API_KEY is correct in .env.local
- Verify you restarted the dev server after adding .env.local
- Check Resend dashboard for any errors

**Emails not arriving:**
- Check spam folder
- Verify CONTACT_EMAIL is correct
- Check Resend dashboard → Emails to see if they were sent
- Verify domain if using custom domain

**Rate Limits:**
- Free tier: 3,000 emails/month
- That's 100 emails/day average
- More than enough for your 100-500/month estimate

---

## Next Steps After Testing

Once everything works:
1. Verify your domain in Resend for better deliverability
2. Update the "from" address to use your domain
3. Monitor submissions in Resend dashboard
4. Consider adding email autoresponder (optional)

---

## Security Notes

- `.env.local` is already in `.gitignore` (API keys won't be committed)
- Honeypot and timing checks prevent most spam
- Resend has additional spam protection
- Character limits prevent abuse
- Email validation prevents invalid addresses

Your contact form is production-ready with enterprise-grade spam protection! 🎯
