# Deploy to Coolify Today - Simple Checklist ✅

## Step-by-Step Deployment (60 minutes total)

### PHASE 1: Test Locally (5 min)

In Windows Terminal:
```bash
cd "C:\Users\user\Desktop\projects\mitch\site v1"
npm run build
npm start
```

- [ ] Build completes successfully
- [ ] Visit http://localhost:5999
- [ ] Homepage loads properly
- [ ] Programs page works
- [ ] Contact form submits (test it!)
- [ ] Check info@mitchssoccer.com for test email

**Press Ctrl+C to stop server when done testing**

---

### PHASE 2: Push to Git (5 min)

```bash
git add .
git commit -m "Production-ready site with Resend contact form"
git push origin main
```

- [ ] All files committed
- [ ] Pushed to remote repository
- [ ] No errors

---

### PHASE 3: Deploy to Coolify (15 min)

**In Coolify Dashboard:**

1. **Create New Application**
   - [ ] Click "+ New Resource" or "Add Application"
   - [ ] Select "Node.js" application type
   - [ ] Connect to your Git repository
   - [ ] Select branch: `main` (or `master`)

2. **Configure Build**
   - [ ] Build Command: `npm run build`
   - [ ] Start Command: `npm start`
   - [ ] Port: `5999`
   - [ ] Install Command: `npm install` (default)

3. **Add Environment Variables**
   - [ ] `RESEND_API_KEY` = `re_bj6QJXg5_CjdkNFg1wNBoxBjCJvA8uqqR`
   - [ ] `CONTACT_EMAIL` = `info@mitchssoccer.com`
   - [ ] `NODE_ENV` = `production`

4. **Deploy**
   - [ ] Click "Deploy" button
   - [ ] Wait for build to complete (3-5 minutes)
   - [ ] Check for "Deployment Successful" message

---

### PHASE 4: Test Live Site (5 min)

**Visit your Coolify URL:**

- [ ] Homepage loads
- [ ] Programs page works
- [ ] Contact page loads
- [ ] Submit contact form test
- [ ] Check info@mitchssoccer.com inbox
- [ ] Navigate through site

**If everything works → Proceed to Phase 5**
**If issues → Check Coolify logs**

---

### PHASE 5: Custom Domain Setup (20 min)

**In Coolify:**

1. **Add Domain**
   - [ ] Go to app settings → Domains
   - [ ] Add `mitchssoccer.com`
   - [ ] Add `www.mitchssoccer.com`
   - [ ] Enable HTTPS
   - [ ] Copy the IP address shown

**In Your Domain Registrar:**

2. **Update DNS Records**
   - [ ] Add A record: `@` → Coolify IP address
   - [ ] Add A record: `www` → Coolify IP address
   - [ ] Save DNS changes

3. **Wait for Propagation**
   - [ ] Check https://dnschecker.org (usually 10-30 min)
   - [ ] Once green globally → test mitchssoccer.com
   - [ ] Verify HTTPS works (🔒 in browser)

---

### PHASE 6: Production Email Setup (20 min)

**In Resend Dashboard:**

1. **Verify Domain**
   - [ ] Go to resend.com/domains
   - [ ] Click "Add Domain"
   - [ ] Enter `mitchssoccer.com`
   - [ ] Copy the 3 DNS records shown

**In Your Domain Registrar:**

2. **Add Resend DNS Records**
   - [ ] Add TXT record for DKIM
   - [ ] Add TXT record for domain verification
   - [ ] Add TXT record for SPF (if shown)
   - [ ] Save changes

3. **Wait for Verification**
   - [ ] Check Resend dashboard (usually 15-30 min)
   - [ ] Should show "Verified" status
   - [ ] You'll get email confirmation

4. **Update Code**
   ```bash
   # Edit /app/api/contact/route.ts line 47
   # Change: onboarding@resend.dev
   # To: contact@mitchssoccer.com

   git add .
   git commit -m "Use verified domain for emails"
   git push
   ```
   - [ ] Coolify auto-deploys update
   - [ ] Test contact form again

---

## ✅ DEPLOYMENT COMPLETE!

**Your site is now live at:**
- https://mitchssoccer.com
- Contact form working
- 3,000 emails/month capacity
- Professional spam protection
- SSL secured

---

## 📊 What You Have Live

**Working Pages:**
- ✅ Homepage (real content)
- ✅ Programs (2025 summer camps)
- ✅ Contact (functional form)
- ⚠️ About (placeholder - update later)
- ⚠️ Register (works - needs Pay-What-You-Can UI)
- ⚠️ Shop/Media/Donate (generic - update or remove later)

**You can update these pages anytime:**
```bash
# Make changes locally
git add .
git commit -m "Update about page"
git push
# Coolify auto-deploys!
```

---

## 🎉 Success Metrics

After deployment, monitor:
- Contact form submissions (check inbox daily)
- Resend dashboard (track email delivery)
- Coolify logs (watch for errors)
- Site performance (should be fast!)

---

## 📞 Important Contacts

- **Resend Dashboard:** https://resend.com/emails
- **Coolify Dashboard:** [Your Coolify URL]
- **Domain Registrar:** [Where you bought mitchssoccer.com]
- **Git Repository:** [Your repo URL]

---

Ready to deploy? Follow the checklist above step-by-step! 🚀
