# Mitch's Soccer NEXT - Website Redesign

A modern, responsive website built with Next.js 14, TypeScript, and Tailwind CSS for Mitch's Soccer NEXT, featuring comprehensive soccer training programs, camps, and community development initiatives.

## 🎨 Design Highlights

- **Modern UI/UX**: Clean, energetic design with purple (#6B1BDB) and orange (#F97316) accent colors
- **Mobile-First**: Fully responsive design optimized for all devices
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance**: Optimized images, lazy loading, and fast page loads
- **Animations**: Smooth transitions and scroll-triggered animations

## 🚀 Features

### Pages Implemented

1. **Homepage**
   - Dynamic hero section with call-to-actions
   - Program showcase cards with hover effects
   - Animated impact statistics counter
   - Testimonial section
   - Newsletter signup

2. **Programs Overview**
   - Filterable program grid (Training, Camps, Awareness, Coaching)
   - Sticky category navigation
   - Detailed program cards with pricing and details
   - Responsive image galleries

3. **Individual Program Pages**
   - Tabbed interface (Overview, Schedule, Curriculum, Coaches, FAQs)
   - Sticky sidebar with registration details
   - Urgency indicators (spots remaining)
   - Mobile-optimized with sticky CTA bar

4. **Registration Flow**
   - Multi-step form with progress indicator
   - Step 1: Participant and parent/guardian information
   - Step 2: Program selection with add-ons
   - Step 3: Secure payment processing
   - Step 4: Confirmation with order summary

5. **Donation Page**
   - One-time and monthly donation options
   - Preset amounts with impact messaging
   - Real-time total calculation
   - Fund allocation transparency
   - Alternative giving methods

### Components

- **Header**: Sticky navigation with mega menu dropdown, mobile hamburger menu
- **Footer**: Multi-column layout with newsletter signup, social links
- **Cards**: Reusable card components with hover effects
- **Buttons**: Primary, secondary, outline, and ghost variants
- **Forms**: Accessible form inputs with validation states
- **Badges**: Status indicators (success, warning, info)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion, CSS animations
- **Fonts**: Inter (body), Outfit (headings) via Google Fonts
- **Icons**: Heroicons (SVG)
- **Images**: Next.js Image optimization

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
site-v1/
├── app/
│   ├── globals.css           # Global styles and Tailwind directives
│   ├── layout.tsx             # Root layout with header/footer
│   ├── page.tsx               # Homepage
│   ├── programs/
│   │   ├── page.tsx           # Programs overview
│   │   └── [slug]/page.tsx    # Individual program pages
│   ├── donate/page.tsx        # Donation page
│   └── register/page.tsx      # Registration flow
├── components/
│   ├── Header.tsx             # Navigation header
│   └── Footer.tsx             # Site footer
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🎨 Design System

### Colors

```css
Purple (Brand):
- purple-50: #F5E8FF
- purple-600: #6B1BDB (Primary)
- purple-700: #5B17B5

Orange (CTA):
- orange-500: #F97316 (Primary)
- orange-600: #EA580C

Gray (Neutrals):
- gray-50: #FAFAFA (Light backgrounds)
- gray-600: #52525B (Body text)
- gray-900: #18181B (Headings)
```

### Typography

```css
Font Families:
- Display: 'Outfit' (headings, bold weights)
- Sans: 'Inter' (body, UI elements)

Scale:
- Display XL: 56px (Hero headings)
- Display LG: 40px (Section headings)
- Display MD: 32px (Subsections)
- Body: 16px (Base text)
```

### Spacing

Based on 4px grid system:
- Micro: 4px
- Small: 8px
- Base: 16px
- Medium: 24px
- Large: 32px
- XL: 48px
- 2XL: 64px

## 🚀 Build & Deploy

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deployment Options

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm run build
# Deploy the .next folder
```

## 📱 Responsive Breakpoints

```css
Mobile: 320px - 639px
Tablet: 640px - 1023px
Desktop: 1024px - 1279px
Wide: 1280px+
```

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Focus indicators (2px purple outline)
- Alt text for all images
- Color contrast ratios meet WCAG AA
- Screen reader optimizations
- Reduced motion support

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      purple: { 600: '#YOUR_COLOR' },
      orange: { 500: '#YOUR_COLOR' },
    }
  }
}
```

### Adding Pages

1. Create new file in `app/` directory
2. Export default React component
3. Add navigation link in `components/Header.tsx`

### Modifying Components

All reusable components are in `components/` directory. Edit as needed and changes will reflect across the site.

## 🎯 Future Enhancements

- [ ] About/Team pages
- [ ] Shop/E-commerce integration (WooCommerce)
- [ ] Blog/News section
- [ ] Contact form with backend
- [ ] User authentication and dashboard
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email newsletter integration (Mailchimp)
- [ ] Multilingual support (Spanish)
- [ ] Search functionality
- [ ] Interactive program calendar

## 📄 License

Copyright © 2025 Mitch's Soccer NEXT. All rights reserved.

## 🤝 Support

For questions or support:
- Website: [mitchssoccer.com](https://mitchssoccer.com)
- Email: info@mitchssoccer.com

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
