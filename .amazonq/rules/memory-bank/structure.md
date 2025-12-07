# CureOx Next - Project Structure

## Directory Organization

```
cureox-next/
├── app/                    # Next.js 14 App Router - pages and layouts
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization configuration
├── messages/               # Translation JSON files
├── public/                 # Static assets (images, icons)
├── utils/                  # Shared utility functions
└── [config files]          # Root-level configuration
```

## Core Directories

### `/app` - Application Routes (App Router)
Next.js 14 App Router structure with file-based routing:

- **`layout.tsx`**: Root layout with theme provider, i18n setup, navigation, footer
- **`page.tsx`**: Homepage with hero, features, products, CTA sections
- **`loading.tsx`**: Global loading UI fallback
- **`globals.css`**: Global styles, CSS custom properties, theme tokens

**Route Pages:**
- **`/blog/[slug]/`**: Dynamic blog post pages (slug-based routing)
- **`/checkout/`**: Subscription purchase flow
- **`/contact/`**: Contact form page
- **`/demo/`**: Demo request form
- **`/login/`**: User authentication
- **`/payment-status/`**: Post-checkout confirmation
- **`/pricing/`**: Pricing comparison page
- **`/privacy/`**: Privacy policy
- **`/products/`**: Product catalog listing
- **`/products/[id]/`**: Individual product detail pages (dynamic routing)
- **`/verify-email/`**: Email verification flow

**Data Files:**
- **`products/products-data.ts`**: Product catalog data structure and helper functions

### `/components` - UI Components
Reusable React components organized by function:

**Layout Components:**
- **`Navbar.tsx`**: Main navigation with language switcher, theme toggle, mobile menu
- **`Footer.tsx`**: Site footer with links and company info
- **`NavigationLoader.tsx`**: Loading indicator for route transitions

**Section Components:**
- **`Hero.tsx`**: Homepage hero section with primary CTA
- **`Features.tsx`**: Feature highlights grid
- **`ProductsSection.tsx`**: Product catalog display
- **`AboutSection.tsx`**: Company information section
- **`ProcessSection.tsx`**: Workflow/process visualization
- **`Services.tsx`**: Services breakdown
- **`CTA.tsx`**: Call-to-action sections

**Form Components:**
- **`ContactForm.tsx`**: General inquiry form
- **`DemoRequestForm.tsx`**: Demo scheduling form
- **`CheckoutForm.tsx`**: Subscription purchase form
- **`LoginForm.tsx`**: Authentication form
- **`VerifyEmailForm.tsx`**: Email verification form

**Utility Components:**
- **`ProductCard.tsx`**: Product display card for catalog
- **`LanguageSwitcher.tsx`**: Language selection dropdown

### `/hooks` - Custom React Hooks
Client-side React hooks for shared logic:

- **`useScrollAnimation.ts`**: Scroll-triggered animation effects

### `/i18n` - Internationalization
next-intl configuration and providers:

- **`config.ts`**: i18n configuration (locales, default locale, routing)
- **`I18nProvider.tsx`**: Client-side i18n context provider with theme and locale management

### `/messages` - Translation Files
JSON translation catalogs for each supported locale:

- **`en.json`**: English translations
- **`ar.json`**: Arabic translations (RTL)
- **`fr.json`**: French translations

Structure: Nested JSON with namespaced keys for organized translations

### `/public` - Static Assets
Publicly accessible files served directly:

- **`/images/`**: Product images, hero images, demo screenshots
  - `Dentist.jpg`, `Doctor.jpg`, `Patient.jpg`, `Pharmacy.png`
  - `HeroSection.jpg`
  - Patient app demo screenshots (appointments, medications, messaging, records, telehealth)
- **`/lang_icon/`**: Language flag icons (france_icon.png, ksa_icon.png, uk_icon.png)
- **`/logo/`**: Company logo (logo.png)

### `/utils` - Utility Functions
Shared helper functions and utilities:

- **`api.ts`**: API client functions and data fetching utilities
- **`format.ts`**: Formatting helpers (currency, dates, etc.)
- **`helpers.ts`**: General utility functions

## Configuration Files

- **`next.config.mjs`**: Next.js configuration (image domains, etc.)
- **`tailwind.config.ts`**: Tailwind CSS configuration (theme, colors, animations)
- **`tsconfig.json`**: TypeScript compiler configuration
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind
- **`.eslintrc.json`**: ESLint rules and Next.js linting config
- **`package.json`**: Dependencies and npm scripts

## Architectural Patterns

### App Router Architecture
- **Server Components by Default**: Pages and layouts are React Server Components unless marked 'use client'
- **Client Components**: Interactive components (forms, theme toggles) use 'use client' directive
- **File-based Routing**: Folder structure defines URL routes automatically
- **Dynamic Routes**: `[id]` and `[slug]` folders for parameterized routes
- **Layouts**: Nested layouts for shared UI (root layout wraps all pages)

### Component Organization
- **Separation of Concerns**: Components split by function (layout, sections, forms, utilities)
- **Reusability**: Generic components (ProductCard, CTA) used across multiple pages
- **Composition**: Complex pages compose multiple section components

### Data Management
- **Static Data**: Product catalog stored in TypeScript files (products-data.ts)
- **Helper Functions**: Data access through utility functions (getProductById)
- **Type Safety**: TypeScript interfaces for product data structures

### Styling Strategy
- **Utility-First**: Tailwind CSS for component styling
- **CSS Custom Properties**: Theme tokens in globals.css for dynamic theming
- **Responsive Design**: Mobile-first with Tailwind breakpoints (md:, lg:)
- **Animation System**: Tailwind custom animations defined in config

### Internationalization Pattern
- **next-intl Integration**: Translation hook (useTranslations) in components
- **Namespace Organization**: Translations grouped by feature/page
- **RTL Support**: Automatic layout direction switching for Arabic
- **Type-Safe Translations**: TypeScript support for translation keys

### Theme Management
- **CSS Variables**: Theme colors defined as custom properties
- **Class-based Switching**: Dark mode via data-theme attribute
- **Client-Side Toggle**: Theme state managed in I18nProvider
- **Persistent Preference**: Theme choice stored in localStorage

## Key Relationships

- **App Router → Components**: Pages import and compose section components
- **Components → i18n**: Components use useTranslations hook for localized text
- **Components → Utils**: Components import formatting and helper functions
- **I18nProvider → App**: Root layout wraps app in i18n context
- **Tailwind Config → Components**: Components reference custom theme tokens
- **Products Data → Product Pages**: Dynamic routes fetch data from products-data.ts
