# Coolify Deployment Guide - Next.js with API Routes

## Overview
Your site will deploy to Coolify as a **Node.js application** (not static export) to support the contact form API route.

---

## Deployment Configuration

### 1. Coolify Application Settings

**Build Settings:**
```
Build Command: npm run build
Start Command: npm start
Port: 5999
Node Version: 18.x or higher
```

**Environment Type:**
- Node.js application (NOT static site)

---

## 2. Environment Variables

Add these in Coolify's Environment Variables section:

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Contact form destination email
CONTACT_EMAIL=your-email@example.com

# Node Environment
NODE_ENV=production
```

**Where to add in Coolify:**
1. Go to your app in Coolify
2. Click "Environment Variables"
3. Add each variable with its value
4. Click "Save"

---

## 3. Build Process

When you deploy, Coolify will:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the Next.js app:**
   ```bash
   npm run build
   ```
   This creates optimized production files in `.next/` folder

3. **Start the server:**
   ```bash
   npm start
   ```
   Runs Next.js server on port 5999

---

## 4. Required Files Check

✅ **Make sure these exist before deploying:**
- `package.json` - Dependencies and scripts
- `next.config.js` or `next.config.mjs` - Next.js configuration
- `.gitignore` - Should include `.env.local` and `.next`
- All app files in `/app` directory

❌ **DO NOT commit:**
- `.env.local` (local development only)
- `.next/` folder
- `node_modules/`

---

## 5. First Deployment Steps

### Before Pushing to Git:

1. **Create `.env.local` for local development:**
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=your-email@example.com
   ```

2. **Test locally:**
   ```bash
   npm run build
   npm start
   ```
   Visit http://localhost:5999 and test contact form

3. **Commit and push to Git**

### In Coolify:

1. **Create new application**
2. **Connect your Git repository**
3. **Configure build settings:**
   - Build: `npm run build`
   - Start: `npm start`
   - Port: `5999`

4. **Add environment variables** (from step 2 above)

5. **Deploy!**

Coolify will build and start your app. It will be running as a Node.js server.

---

## 6. How API Routes Work in Production

**Development (npm run dev):**
- Next.js dev server handles API routes
- Hot reload, fast refresh

**Production (npm start on Coolify):**
- Next.js production server handles API routes
- Optimized, cached, fast
- API routes at `/api/*` work exactly the same

**Your contact form:**
- Browser → `POST /api/contact`
- Your Next.js server receives it
- Server calls Resend API
- Resend sends email to your inbox
- Server responds to browser
- User sees success message

---

## 7. Verifying Deployment

After deploying to Coolify:

1. **Check app is running:**
   - Visit your Coolify URL
   - Should see homepage

2. **Test contact form:**
   - Go to `/contact`
   - Fill out form
   - Submit
   - Check your email inbox

3. **Check Coolify logs** if issues:
   - Look for build errors
   - Check runtime logs
   - Verify environment variables are set

---

## 8. Domain Configuration

Once deployed, you can:

1. **Point mitchssoccer.com to Coolify:**
   - Get your Coolify app URL
   - Update DNS A record to point to Coolify server IP
   - Or use Coolify's built-in domain management

2. **Verify domain in Resend:**
   - Add mitchssoccer.com in Resend dashboard
   - Add DNS records for better deliverability
   - Update API route to use `contact@mitchssoccer.com`

---

## 9. Performance Considerations

**Next.js on Node.js is still VERY fast:**
- Pages are pre-rendered at build time
- Served as static HTML (cached)
- Only API routes run on-demand
- Minimal server resources needed

**Expected Resource Usage:**
- Memory: ~150-300MB
- CPU: Minimal (only spikes during form submission)
- Disk: ~100-200MB for .next folder

---

## 10. Troubleshooting

**Build fails:**
- Check Coolify build logs
- Verify all dependencies in package.json
- Ensure Node version is 18+

**Contact form doesn't work:**
- Check environment variables are set in Coolify
- Verify RESEND_API_KEY is correct
- Check Coolify runtime logs for errors

**Emails not arriving:**
- Verify CONTACT_EMAIL is correct
- Check Resend dashboard for sent emails
- Check spam folder

---

## Quick Reference

**Local Development:**
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 5999)
npm run build        # Build for production
npm start            # Start production server
```

**Coolify Settings:**
```
Build: npm run build
Start: npm start
Port: 5999
Env: NODE_ENV=production, RESEND_API_KEY, CONTACT_EMAIL
```

**Environment Variables Needed:**
- `RESEND_API_KEY` - From resend.com/api-keys
- `CONTACT_EMAIL` - Where submissions should go
- `NODE_ENV=production` (Coolify usually sets this automatically)

---

Your site is ready to deploy to Coolify as a Node.js application! 🚀
