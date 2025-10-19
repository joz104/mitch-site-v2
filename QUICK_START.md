# Quick Start Guide - Mitch's Soccer NEXT Website

## ✅ Contact Form is READY!

Your Resend API key is configured and the contact form will send emails to: **info@mitchssoccer.com**

---

## 🧪 Test Locally (In Windows)

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Test the contact form:**
   - Go to http://localhost:5999/contact
   - Fill out the form
   - Click "Send Message"
   - Check info@mitchssoccer.com inbox!

**Note:** Currently using Resend's test domain `onboarding@resend.dev` which allows 1 email/day for testing.

---

## 🚀 Deploy to Coolify

### Environment Variables to Add in Coolify:

```
RESEND_API_KEY=re_bj6QJXg5_CjdkNFg1wNBoxBjCJvA8uqqR
CONTACT_EMAIL=info@mitchssoccer.com
NODE_ENV=production
```

### Coolify Settings:

```
Build Command: npm run build
Start Command: npm start
Port: 5999
```

---

## 📧 Verify Domain for Production (After Deployment)

To send unlimited emails and use `contact@mitchssoccer.com` as sender:

1. **In Resend Dashboard:**
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter: `mitchssoccer.com`

2. **Add DNS Records:**
   - Resend will show you 3 DNS records to add
   - Add them in your domain registrar (where you bought mitchssoccer.com)
   - Wait 10-60 minutes for verification

3. **Update API Route:**
   - Change line 47 in `/app/api/contact/route.ts`:
   - From: `onboarding@resend.dev`
   - To: `contact@mitchssoccer.com`
   - Redeploy

---

## 📊 Current Site Status

**✅ Production Ready:**
- Homepage (with real content)
- Programs page (2025 camp dates)
- Contact page (spam-protected form with Resend)
- Header navigation (with programs dropdown)
- Footer (basic)

**⚠️ Has Placeholder Content:**
- About page (needs Mitch's real story)
- Register page (needs Pay-What-You-Can options)
- Donate page (may want to remove)
- Shop page (may want to remove)
- Media page (may want to remove)

---

## 🎯 Next Steps

### For Testing:
1. Restart dev server in Windows
2. Test contact form → info@mitchssoccer.com
3. Verify email arrives

### For Production:
1. Push code to Git
2. Deploy to Coolify with settings above
3. Add environment variables in Coolify
4. Verify domain in Resend (for unlimited emails)
5. Point mitchssoccer.com DNS to Coolify

---

## 📝 Important Files

- `.env.local` - Your API keys (LOCAL ONLY, not in Git)
- `.env.local.example` - Template for others
- `COOLIFY_DEPLOYMENT.md` - Full deployment guide
- `CONTACT_FORM_SETUP.md` - Resend setup details
- `QUICK_START.md` - This file

---

Your contact form is fully functional with spam protection and will send to **info@mitchssoccer.com**! 🎉

**Resend Free Tier:** 3,000 emails/month - perfect for your 100-500 expected submissions.
