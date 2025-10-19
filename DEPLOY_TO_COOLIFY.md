# Complete Deployment Guide - Coolify Setup

## 🚀 Deploy Mitch's Soccer NEXT to Coolify

### Current Status
- ✅ Homepage - Ready (real content)
- ✅ Programs - Ready (2025 dates)
- ✅ Contact - Ready (Resend integrated)
- ⚠️ About - Has placeholder content
- ⚠️ Register - Has placeholder content
- ⚠️ Shop/Media/Donate - Has placeholder content

**Recommendation:** Deploy now, update content later (site works perfectly as-is)

---

## Part 1: Prepare for Deployment

### Step 1: Test Build Locally (In Windows Terminal)

```bash
# Make sure you're in the project directory
cd "C:\Users\user\Desktop\projects\mitch\site v1"

# Build the production version
npm run build

# If build succeeds, test production server
npm start

# Visit http://localhost:5999 and test everything
# Press Ctrl+C to stop when done
```

**Expected output:**
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

If build fails, fix errors before proceeding.

---

## Part 2: Push to Git

### Step 2: Check Git Status

```bash
git status
```

You should see all your modified files.

### Step 3: Stage All Changes

```bash
git add .
```

### Step 4: Commit Changes

```bash
git commit -m "Complete site redesign with Resend contact form

- Clean professional design matching mitchssoccer.com
- Real content from current website
- Resend contact form integration with spam protection
- Programs page with 2025 summer camp dates
- Updated navigation with programs dropdown
- Removed donate buttons
- Ready for Coolify deployment"
```

### Step 5: Push to Remote

```bash
git push origin main
```

Or if your branch is named differently:
```bash
git push origin master
```

**Your code is now in Git and ready for Coolify!**

---

## Part 3: Deploy to Coolify

### Step 6: Create New Application in Coolify

1. **Log into Coolify dashboard**

2. **Click "+ New Resource" or "Add Application"**

3. **Select "Application"**

4. **Choose Git Source:**
   - Select your Git provider (GitHub/GitLab/etc)
   - Find your repository
   - Select the branch (usually `main` or `master`)

### Step 7: Configure Build Settings

**Application Type:**
- Select: **Node.js**

**Build Configuration:**
```
Build Command:     npm run build
Start Command:     npm start
Port:             5999
Install Command:  npm install
```

**Optional Settings:**
```
Base Directory:   / (leave default)
Node Version:     18.x or higher (Coolify default is fine)
```

### Step 8: Add Environment Variables

Click "Environment Variables" and add:

```
RESEND_API_KEY=re_bj6QJXg5_CjdkNFg1wNBoxBjCJvA8uqqR
CONTACT_EMAIL=info@mitchssoccer.com
NODE_ENV=production
```

**Important:**
- Click "Add" after each variable
- Save the configuration

### Step 9: Deploy!

1. **Click "Deploy" or "Start Deployment"**

2. **Watch the build logs:**
   - Installing dependencies... ✓
   - Building Next.js app... ✓
   - Starting server... ✓

3. **Wait for "Deployed Successfully" message**

### Step 10: Access Your Site

Coolify will give you a URL like:
- `https://your-app-name.coolify.domain`
- Or your custom domain if configured

**Visit the URL and test:**
- Homepage loads ✓
- Programs page works ✓
- Contact form sends emails ✓

---

## Part 4: Configure Custom Domain (mitchssoccer.com)

### Step 11: Add Domain in Coolify

1. **In your Coolify app, go to "Domains"**

2. **Click "Add Domain"**

3. **Enter:** `mitchssoccer.com`

4. **Also add:** `www.mitchssoccer.com`

5. **Enable HTTPS** (Coolify will auto-generate SSL certificate)

### Step 12: Update DNS Records

In your domain registrar (where you bought mitchssoccer.com):

**Add A Record:**
```
Type: A
Name: @
Value: [Your Coolify server IP]
TTL: 3600
```

**Add A Record for www:**
```
Type: A
Name: www
Value: [Your Coolify server IP]
TTL: 3600
```

**Coolify will show you the exact IP address to use.**

### Step 13: Wait for DNS Propagation

- Usually takes 5-60 minutes
- Check status: https://dnschecker.org
- Once propagated, mitchssoccer.com will point to Coolify

### Step 14: SSL Certificate

Coolify automatically:
- Generates Let's Encrypt SSL certificate
- Enables HTTPS
- Redirects HTTP → HTTPS

Your site will be secure with `https://mitchssoccer.com` 🔒

---

## Part 5: Verify Domain in Resend (For Production Emails)

### Step 15: Add Domain in Resend

1. **Go to:** https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter:** `mitchssoccer.com`

### Step 16: Add DNS Records

Resend will show you 3 DNS records to add:

**In your domain registrar, add these TXT records:**
```
Name: resend._domainkey.mitchssoccer.com
Value: [Resend will provide this]

Name: _resend.mitchssoccer.com
Value: [Resend will provide this]

(May be a third one for SPF)
```

### Step 17: Wait for Verification

- Resend checks DNS records every few minutes
- Usually verified within 30 minutes
- You'll get email confirmation when verified

### Step 18: Update "From" Address

Once domain is verified, update `/app/api/contact/route.ts` line 47:

**Change from:**
```typescript
from: "Mitch's Soccer NEXT <onboarding@resend.dev>",
```

**To:**
```typescript
from: "Mitch's Soccer NEXT <contact@mitchssoccer.com>",
```

Then:
```bash
git add app/api/contact/route.ts
git commit -m "Update email sender to verified domain"
git push
```

Coolify will auto-deploy the update.

---

## 🎯 Quick Reference

### Git Commands (Windows Terminal)
```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to remote
git push origin main

# Check current branch
git branch
```

### Coolify Deploy Settings
```
Type:          Node.js Application
Build:         npm run build
Start:         npm start
Port:          5999
Branch:        main (or master)
Auto Deploy:   Enable (redeploys on git push)
```

### Environment Variables (Add in Coolify)
```
RESEND_API_KEY=re_bj6QJXg5_CjdkNFg1wNBoxBjCJvA8uqqR
CONTACT_EMAIL=info@mitchssoccer.com
NODE_ENV=production
```

---

## Troubleshooting

**Build fails in Coolify:**
- Check build logs in Coolify dashboard
- Verify package.json has all dependencies
- Make sure Node version is 18+

**Contact form doesn't work:**
- Check environment variables are set in Coolify
- Check Coolify logs for API errors
- Verify Resend API key is correct

**Domain not working:**
- Check DNS propagation: dnschecker.org
- Verify A records point to correct IP
- Wait up to 1 hour for propagation

**SSL certificate issues:**
- Coolify generates this automatically
- If issues, try "Force SSL" in Coolify settings
- Check domain is properly configured

---

## Next Steps Summary

1. ✅ Test locally (`npm run build && npm start`)
2. ✅ Push to Git (`git add . && git commit && git push`)
3. ✅ Create Coolify app with Node.js settings
4. ✅ Add environment variables
5. ✅ Deploy and test
6. ✅ Configure custom domain
7. ✅ Verify Resend domain for production emails

**You're ready to deploy!** 🚀

All documentation is organized in your project root for easy reference.
