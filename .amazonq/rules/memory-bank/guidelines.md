# CureOx Next - Development Guidelines

## Code Quality Standards

### Client/Server Component Directives
- **Always declare 'use client' at the top** of files using React hooks (useState, useEffect, useContext)
- **Always declare 'use client' at the top** of files using browser APIs (localStorage, window)
- **Always declare 'use client' at the top** of files using next-intl's useTranslations hook
- Server components (default) should NOT have 'use client' directive
- Place directive as first line before imports

### TypeScript Type Safety
- **Always define explicit types** for component props using TypeScript type aliases
- **Always type function parameters and return values** explicitly
- **Use type inference** for simple variable assignments
- **Define types inline** for component props (e.g., `type ProductPageProps = { params: { id: string } }`)
- **Export types** when shared across files (e.g., API request/response types)

### Import Organization
- **Group imports** in this order: React/Next.js, third-party libraries, local imports
- **Use path aliases** with `@/` prefix for absolute imports (e.g., `@/components/Navbar`)
- **Import specific items** rather than entire modules when possible

### Naming Conventions
- **PascalCase** for components, types, interfaces (e.g., `DemoPage`, `LoginPayload`)
- **camelCase** for variables, functions, hooks (e.g., `selectedProduct`, `handleStepChange`)
- **kebab-case** for file paths and IDs (e.g., `dental-clinic-management`)
- **SCREAMING_SNAKE_CASE** for constants (e.g., `API_BASE_URL`)
- **Prefix custom hooks** with `use` (e.g., `useI18n`, `useScrollAnimation`)

## Internationalization Patterns

### Translation Hook Usage
```tsx
const t = useTranslations('namespace');
const text = t('key');
```

- **Always use namespaced translations** (e.g., `useTranslations('demo')`)
- **Access nested translations** with dot notation (e.g., `t('dental.step1.title')`)
- **Use raw() method** for complex objects: `productCopy.raw('${key}') as { name: string; ... }`
- **Multiple translation hooks** allowed in same component for different namespaces

### Translation Key Structure
- Organize by feature/page namespace
- Use descriptive, hierarchical keys (e.g., `dental.step1.feature1`)
- Keep keys consistent across all locale files (en.json, ar.json, fr.json)

## Component Architecture

### Component Structure Pattern
```tsx
'use client'; // if needed

import statements...

type Props = { ... };

export default function ComponentName({ props }: Props) {
  // 1. Hooks (translations, state, effects)
  // 2. Derived state and computations
  // 3. Event handlers
  // 4. Return JSX
}
```

### State Management
- **Use useState** for local component state
- **Use useEffect** for side effects (localStorage, DOM updates, data loading)
- **Derive state** from props/state rather than duplicating in state when possible
- **Initialize state** from URL params using `useSearchParams()` hook

### Event Handlers
- **Prefix with 'handle'** (e.g., `handleProductChange`, `handleStepChange`)
- **Define inline arrow functions** for simple handlers
- **Extract to named functions** for complex logic
- **Use type guards** for validation (e.g., `step >= 0 && step < tutorials.length`)

## Styling Conventions

### Tailwind CSS Usage
- **Use utility classes** for all styling (no custom CSS in components)
- **Responsive design** with breakpoint prefixes (e.g., `md:text-5xl`, `lg:grid-cols-2`)
- **Conditional classes** with template literals and ternary operators
- **Theme-aware classes** using custom CSS variables (e.g., `text-theme-primary`, `bg-theme-card`)

### Dynamic Styling Pattern
```tsx
className={`base-classes ${condition ? 'true-classes' : 'false-classes'}`}
style={{ backgroundColor: '#0061A5' }} // for brand colors
```

- **Use className** for Tailwind utilities
- **Use style prop** for dynamic brand colors and gradients
- **Combine both** when needed for complex styling

### Brand Colors
- **Primary**: `#0061A5` (dark blue)
- **Secondary**: `#01C4F0` (cyan)
- **Apply via style prop** for inline colors
- **Use Tailwind classes** for theme-aware colors (e.g., `text-theme-primary`)

### Animation Classes
- Use custom Tailwind animations: `animate-fade-in`, `animate-fade-in-up`, `animate-scale-in`
- Apply `transition-*` utilities for smooth state changes
- Use `duration-*` for animation timing (e.g., `duration-200`, `duration-300`)

## Form and User Input

### Form State Management
- **Track form state** with useState for each input field
- **Handle submission** with async functions
- **Show loading states** during API calls
- **Display error messages** from API responses

### Input Validation
- **Client-side validation** before API calls
- **Type-safe payloads** matching API type definitions
- **Error handling** with try-catch blocks

## API Integration

### API Client Pattern
```tsx
export async function functionName(payload: PayloadType) {
  return apiRequest<ResponseType>('/endpoint', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
```

- **Define request/response types** for all API functions
- **Use generic apiRequest** wrapper for consistent error handling
- **Export typed functions** for each endpoint
- **Handle JSON parsing** with fallback to text

### Environment Variables
- **Use NEXT_PUBLIC_ prefix** for client-side variables
- **Provide fallback values** with nullish coalescing (e.g., `?? 'default'`)
- **Access via process.env** object

## Layout and Navigation

### Link Component Usage
- **Use Next.js Link** for internal navigation
- **Pass query params** via object: `href={{ pathname: '/path', query: { key: 'value' } }}`
- **Use string href** for simple paths: `href="/path"`
- **Add onClick handlers** for additional logic (e.g., closing mobile menu)

### Navigation Patterns
- **Fixed navbar** with `fixed inset-x-0 top-0 z-50`
- **Backdrop blur** for glassmorphism effect
- **Scroll-based styling** changes using scroll event listener
- **Mobile menu toggle** with state management

## Theme Management

### Theme Toggle Pattern
```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('dark');

useEffect(() => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    setTheme(stored);
    document.documentElement.classList.toggle('light-mode', stored === 'light');
    document.documentElement.classList.toggle('dark-mode', stored === 'dark');
  }
}, []);
```

- **Store preference** in localStorage
- **Apply classes** to document.documentElement
- **Sync on mount** and theme changes
- **Use CSS custom properties** for theme-aware colors

## Data Management

### Static Data Pattern
- **Define data structures** in separate files (e.g., `products-data.ts`)
- **Export helper functions** for data access (e.g., `getProductById`)
- **Use TypeScript types** for data structures
- **Keep data co-located** with related routes

### Data Lookup Pattern
```tsx
const item = items.find((i) => i.id === targetId);
if (!item) {
  notFound(); // Next.js 404 helper
}
```

## Performance Optimizations

### Image Optimization
- **Use Next.js Image component** for optimized loading
- **Provide width/height** for layout stability
- **Use priority prop** for above-the-fold images
- **Use regular img tags** for dynamic product images

### Code Splitting
- **Dynamic imports** for heavy components
- **Route-based splitting** automatic with App Router
- **Lazy load** non-critical features

### Animation Performance
- **Use CSS transitions** over JavaScript animations
- **Apply will-change** sparingly for performance
- **Debounce scroll handlers** with passive event listeners

## Accessibility

### Semantic HTML
- **Use semantic elements** (nav, main, section, article)
- **Provide alt text** for all images
- **Use sr-only class** for screen reader text

### Keyboard Navigation
- **Ensure focusable elements** have visible focus states
- **Use button elements** for clickable actions
- **Support keyboard shortcuts** where appropriate

### ARIA Attributes
- **Add aria-label** for icon-only buttons
- **Use role attributes** when semantic HTML insufficient
- **Provide aria-live regions** for dynamic content

## Error Handling

### API Error Pattern
```tsx
try {
  const result = await apiFunction(payload);
  // handle success
} catch (error) {
  setError(error instanceof Error ? error.message : 'Unknown error');
}
```

### Null Safety
- **Check for null/undefined** before accessing properties
- **Use optional chaining** (?.) for nested properties
- **Provide fallbacks** with nullish coalescing (??)
- **Call notFound()** for missing dynamic route data

## File Organization

### Component Files
- One component per file
- Export as default
- Co-locate types with component

### Utility Files
- Group related functions
- Export named functions
- Define types at top of file

### Route Files
- Use Next.js file conventions (page.tsx, layout.tsx, loading.tsx)
- Keep route-specific logic in page files
- Extract reusable logic to components or utils
