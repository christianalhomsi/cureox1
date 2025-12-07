# CureOx Next

Modern marketing and e-commerce platform for CureOx healthcare software solutions. Built with Next.js 16, App Router, TypeScript, and Tailwind CSS. The platform showcases healthcare management software across multiple medical verticals with full internationalization, theme support, and integrated conversion flows.

## Overview

CureOx Next serves as the primary customer-facing website for showcasing, demoing, and selling healthcare management software including:

- **Dental Clinic Management** - Complete practice management solution
- **Pharmacy Management** - Inventory and prescription management
- **Medical Practice Management** - Patient records and clinic operations
- **Patient Companion App** - Mobile app for patient engagement

## Key Features

- **Multi-language Support**: English, Arabic (RTL), and French via next-intl
- **Dark/Light Themes**: CSS custom properties with persistent user preference
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Product Catalog**: Dynamic product pages with pricing and features
- **Demo Requests**: Multi-step form for scheduling live demonstrations
- **Checkout Flow**: Integrated subscription purchase with payment processing
- **Contact Forms**: General inquiries and customer support
- **Authentication**: Login and email verification flows
- **Smooth Animations**: Scroll-triggered effects and transitions

## Prerequisites

- Node.js 18.18+ (Next.js 16 requirement)
- npm 10+ (ships with Node 18)

Verify your versions:

```bash
node -v
npm -v
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000. Use `npm run build` and `npm start` to create and serve the production bundle.

## Available Scripts

- `npm run dev` – Start Next.js dev server with hot reloading
- `npm run build` – Create optimized production build
- `npm run start` – Serve production build locally
- `npm run lint` – Run ESLint with Next.js config

## Technology Stack

- **Framework**: Next.js 16.0.7 with App Router
- **Language**: TypeScript 5.7.2
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: lucide-react 0.555.0
- **Internationalization**: next-intl 4.5.6
- **Linting**: ESLint 9.18.0 with Next.js config
- **Build Tools**: PostCSS 8.4.49, Autoprefixer 10.4.20

## Internationalization

Translations are stored in `messages/<locale>.json` and consumed via `next-intl`.

**Supported Languages:**
- English (en)
- Arabic (ar) with RTL layout
- French (fr)

**To add or update translations:**

1. Edit the locale file (e.g., `messages/ar.json` for Arabic)
2. Keep keys consistent across all locale files
3. Use namespaced keys (e.g., `demo.step1.title`)
4. Restart dev server if adding new namespaces

The `I18nProvider` handles language detection, RTL layout toggling, and exposes translations via the `useTranslations()` hook.

## Styling & Theming

**Tailwind CSS** (`tailwind.config.ts`):
- Utility-first styling with custom theme extensions
- Custom animations: fade-in, slide, scale, float effects
- Brand colors: Primary (#0061A5), Secondary (#01C4F0)
- Responsive breakpoints: mobile-first design

**Global Styles** (`app/globals.css`):
- CSS custom properties for theme tokens
- RTL layout helpers for Arabic
- Dark/light mode via data-theme attribute

**Theme Management:**
- User preference stored in localStorage
- Toggle via theme switcher in navigation
- Automatic class application to document root

## Project Structure

```
app/
  ├── layout.tsx              # Root layout with theme, i18n, nav, footer
  ├── page.tsx                # Homepage with hero, features, products
  ├── globals.css             # Global styles and CSS custom properties
  ├── blog/[slug]/            # Dynamic blog post pages
  ├── checkout/               # Subscription purchase flow
  ├── contact/                # Contact form
  ├── demo/                   # Demo request form
  ├── login/                  # User authentication
  ├── payment-status/         # Post-checkout confirmation
  ├── pricing/                # Pricing comparison
  ├── products/               # Product catalog
  │   ├── [id]/               # Individual product pages (dynamic)
  │   └── products-data.ts    # Product data and helpers
  └── verify-email/           # Email verification

components/
  ├── Navbar.tsx              # Main navigation with language/theme switchers
  ├── Footer.tsx              # Site footer
  ├── Hero.tsx                # Homepage hero section
  ├── Features.tsx            # Feature highlights
  ├── ProductsSection.tsx     # Product catalog display
  ├── ProductCard.tsx         # Product display card
  └── [forms, sections]       # Additional UI components

hooks/
  └── useScrollAnimation.ts   # Scroll-triggered animations

i18n/
  ├── config.ts               # Locale configuration
  └── I18nProvider.tsx        # Client-side i18n context

messages/
  ├── en.json                 # English translations
  ├── ar.json                 # Arabic translations (RTL)
  └── fr.json                 # French translations

public/
  ├── images/                 # Product and hero images
  ├── lang_icon/              # Language flag icons
  └── logo/                   # Company logo

utils/
  ├── api.ts                  # API client functions
  ├── format.ts               # Formatting helpers
  └── helpers.ts              # General utilities
```

## Architecture Patterns

**App Router:**
- Server Components by default for optimal performance
- Client Components ('use client') for interactive features
- File-based routing with dynamic routes ([id], [slug])
- Nested layouts for shared UI structure

**Component Organization:**
- Separation by function: layout, sections, forms, utilities
- Reusable components across multiple pages
- Composition pattern for complex pages

**State Management:**
- useState for local component state
- useEffect for side effects and localStorage
- URL params via useSearchParams for shareable state

**Type Safety:**
- Explicit TypeScript types for all props
- Type inference for simple assignments
- Inline types for component props, exported types for shared interfaces

## Development Guidelines

**Client/Server Components:**
- Add 'use client' for React hooks (useState, useEffect)
- Add 'use client' for browser APIs (localStorage, window)
- Add 'use client' for useTranslations hook
- Server components (default) have no 'use client' directive

**Import Organization:**
1. React/Next.js imports
2. Third-party libraries
3. Local imports with @/ path alias

**Naming Conventions:**
- PascalCase: Components, types, interfaces
- camelCase: Variables, functions, hooks
- kebab-case: File paths and IDs
- SCREAMING_SNAKE_CASE: Constants

## Deployment

1. Run `npm run build` to verify production build
2. Set environment variables if needed (none required by default)
3. Deploy to Vercel, Netlify, or custom Node.js host
4. Ensure Node.js 18.18+ on production server

## Browser Support

- Modern browsers: Chrome, Firefox, Safari, Edge (latest)
- Mobile: iOS Safari, Chrome Mobile
- Automatic polyfills via Next.js
- Vendor prefixes via Autoprefixer

## Contributing

1. Fork or branch off `main`
2. Run `npm run lint` before submitting PR
3. Update translations across all locales (en, ar, fr)
4. Test dark/light themes and RTL layout

---

Questions or feedback? Open an issue or contact the CureOx team.

