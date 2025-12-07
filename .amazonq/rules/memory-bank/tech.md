# CureOx Next - Technology Stack

## Programming Languages

### TypeScript 5.5.2
- **Primary Language**: All application code written in TypeScript
- **Type Safety**: Strict typing for components, utilities, and data structures
- **Configuration**: `tsconfig.json` with Next.js-optimized settings
- **File Extensions**: `.ts` for utilities, `.tsx` for React components

### JavaScript (JSX/TSX)
- **React Components**: TSX syntax for component markup
- **Configuration Files**: `.mjs` for ES module configs (Next.js, PostCSS)

### CSS
- **Global Styles**: `app/globals.css` for base styles and CSS custom properties
- **Tailwind CSS**: Utility-first CSS framework for component styling
- **PostCSS**: CSS processing pipeline with Tailwind and Autoprefixer

## Core Framework & Runtime

### Next.js 14.2.3
- **Framework**: React-based full-stack framework
- **App Router**: File-based routing with React Server Components
- **Rendering**: Server-side rendering (SSR), static generation (SSG), client-side rendering (CSR)
- **Image Optimization**: Built-in next/image component
- **API Routes**: Serverless API endpoints (if needed)
- **Requirements**: Node.js 18.17+ (Next 14 requirement)

### React 18.3.1
- **UI Library**: Component-based UI development
- **Server Components**: Default rendering mode in App Router
- **Client Components**: Interactive components with 'use client' directive
- **Hooks**: useState, useEffect, custom hooks for state and side effects

### React DOM 18.3.0
- **DOM Rendering**: React to browser DOM bridge
- **Hydration**: Client-side hydration of server-rendered content

## Key Dependencies

### next-intl 4.5.6
- **Internationalization**: i18n library for Next.js App Router
- **Features**: Translation hooks, locale routing, RTL support
- **Usage**: `useTranslations()` hook in components
- **Configuration**: `i18n/config.ts` for locale setup

### lucide-react 0.555.0
- **Icon Library**: React components for Lucide icons
- **Usage**: Import specific icons as React components
- **Benefits**: Tree-shakeable, TypeScript support, consistent design

### Tailwind CSS 3.4.4
- **Utility Framework**: Utility-first CSS framework
- **Configuration**: `tailwind.config.ts` with custom theme
- **Features**: Custom colors, animations, responsive utilities
- **JIT Mode**: Just-in-time compilation for optimal bundle size

### Autoprefixer 10.4.19
- **CSS Processing**: Automatic vendor prefix addition
- **Integration**: PostCSS plugin for cross-browser compatibility

## Development Dependencies

### TypeScript Tooling
- **@types/node** 20.14.2: Node.js type definitions
- **@types/react** 18.3.3: React type definitions
- **@types/react-dom** 18.3.0: React DOM type definitions

### Linting & Code Quality
- **ESLint** 8.57.0: JavaScript/TypeScript linter
- **eslint-config-next** 14.2.3: Next.js-specific ESLint rules
- **Configuration**: `.eslintrc.json` with Next.js preset

### Build Tools
- **PostCSS** 8.4.38: CSS transformation tool
- **postcss.config.mjs**: PostCSS configuration with Tailwind

## Build System

### Package Manager
- **npm**: Default package manager (ships with Node.js)
- **Version**: npm 9+ recommended
- **Lock File**: `package-lock.json` for dependency locking

### Build Process
1. **TypeScript Compilation**: TSC compiles `.ts`/`.tsx` to JavaScript
2. **Next.js Build**: Bundles app, optimizes assets, generates static pages
3. **Tailwind Processing**: Scans files, generates CSS, purges unused styles
4. **PostCSS**: Processes CSS with Autoprefixer
5. **Output**: `.next/` directory with optimized production build

### Build Artifacts
- **`.next/`**: Next.js build output (server, static, cache)
- **`.next/server/`**: Server-side code and manifests
- **`.next/static/`**: Static assets (JS, CSS, media)
- **`.next/cache/`**: Build cache for faster rebuilds

## Development Commands

### Primary Scripts
```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Create production build
npm run start      # Serve production build locally
npm run lint       # Run ESLint on codebase
```

### Development Workflow
1. **Install**: `npm install` to install dependencies
2. **Develop**: `npm run dev` for hot-reloading dev server
3. **Lint**: `npm run lint` to check code quality
4. **Build**: `npm run build` to verify production build
5. **Preview**: `npm start` to test production build locally

## Environment & Configuration

### Node.js Requirements
- **Minimum Version**: Node.js 18.17+ (Next.js 14 requirement)
- **Recommended**: Latest LTS version
- **Verification**: `node -v` to check version

### Environment Variables
- **None Required by Default**: No mandatory env vars for basic operation
- **Optional**: Can add API keys, database URLs, etc. in `.env.local`
- **Next.js Support**: Automatic loading of `.env.local`, `.env.production`, etc.

### Configuration Files

**TypeScript Configuration** (`tsconfig.json`):
- Compiler options for Next.js
- Path aliases (e.g., `@/` for root imports)
- Strict type checking enabled

**Next.js Configuration** (`next.config.mjs`):
- Image optimization settings
- Remote image patterns
- Build and runtime options

**Tailwind Configuration** (`tailwind.config.ts`):
- Content paths for file scanning
- Custom theme extensions (colors, animations)
- Dark mode configuration
- Plugin setup

**PostCSS Configuration** (`postcss.config.mjs`):
- Tailwind CSS plugin
- Autoprefixer plugin

**ESLint Configuration** (`.eslintrc.json`):
- Next.js recommended rules
- TypeScript support
- Custom rule overrides

## Browser Support

### Target Browsers
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Fallbacks**: Autoprefixer handles vendor prefixes for broader support

### Polyfills
- **Next.js Built-in**: Automatic polyfills for modern JavaScript features
- **React 18**: Requires modern browser with ES6+ support

## Performance Optimizations

### Next.js Features
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: next/image with lazy loading and responsive images
- **Font Optimization**: Automatic font loading optimization
- **Static Generation**: Pre-rendered pages for fast initial load

### Tailwind Optimizations
- **JIT Mode**: On-demand CSS generation
- **Purging**: Unused styles removed in production
- **Minification**: CSS minified in production builds

### Build Optimizations
- **Tree Shaking**: Unused code eliminated
- **Minification**: JavaScript and CSS minified
- **Compression**: Gzip/Brotli compression support
- **Caching**: Aggressive caching strategies for static assets
