# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 website for Mitch's Soccer NEXT, a youth soccer training and community development organization. The site features a modern, dark-themed design with neon purple and green accents, built with TypeScript and Tailwind CSS.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server on port 5999
npm run dev

# Build for production
npm run build

# Start production server on port 5999
npm start

# Run linting
npm run lint
```

## Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom dark theme configuration
- **Animations**: Framer Motion for page transitions and scroll animations
- **Images**: Next.js Image optimization with Unsplash placeholder support

### Directory Structure
- `app/` - Next.js App Router pages and layouts
  - Dynamic routes: `programs/[slug]/page.tsx` for individual program pages
  - Core pages: homepage, programs overview, registration, donation, about, contact, shop, media
- `components/` - Reusable React components (Header, Footer)
- `public/` - Static assets
- Path aliases: `@/*` maps to root directory

### Routing Architecture
The application uses Next.js 14 App Router with the following page hierarchy:
- All pages share a common layout (`app/layout.tsx`) with Header and Footer
- Program pages use dynamic routing with slug parameters
- Registration flow is a multi-step form with client-side state management
- Mobile-responsive with sticky navigation and CTA bars

## Design System

### Color Palette
The site uses a dark theme with neon accents:
- **Dark backgrounds**: `dark-900` (#0A0A0A) to `dark-600` (#242424)
- **Electric Purple**: Primary brand color (`electric-purple-600` #9333EA)
- **Neon accents**: `neon-purple` (#BF40BF), `neon-green` (#00FF7F)
- **Legacy colors**: Original purple (#6B1BDB) and orange (#F97316) maintained for compatibility

### Typography
- **Headings**: Outfit font family
- **Body text**: Inter font family
- **Display sizes**: Custom scale from `display-sm` to `display-xl`

### Component Patterns
- Cards with hover effects and shadow transitions
- Sticky navigation with mega menu dropdowns
- Tab interfaces for content organization
- Multi-step forms with progress indicators
- Animated counters for statistics

## Key Implementation Details

### Performance Optimizations
- Lazy loading for images and components
- Next.js Image component for automatic optimization
- Tailwind CSS for minimal CSS bundle size
- Static generation where possible

### Accessibility Features
- Semantic HTML structure throughout
- ARIA labels and landmarks in navigation
- Focus indicators with 2px purple outline
- Keyboard navigation support
- WCAG 2.1 AA color contrast compliance

### Animation Patterns
- Framer Motion for page transitions
- CSS animations via Tailwind: `fade-up`, `scale-in`, `slide-down`
- Scroll-triggered animations using Intersection Observer
- Reduced motion support via CSS media queries

## Development Guidelines

When modifying this codebase:
1. Maintain TypeScript strict mode compliance
2. Follow the established component structure in `components/`
3. Use Tailwind utilities for styling (avoid inline styles)
4. Preserve the dark theme aesthetic with neon accents
5. Test responsive behavior at all breakpoints (mobile: 320px, tablet: 640px, desktop: 1024px, wide: 1280px+)
6. Ensure new interactive elements have proper keyboard navigation
7. Use Next.js Image component for all images requiring optimization