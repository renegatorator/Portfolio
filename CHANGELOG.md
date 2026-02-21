# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.0.9] - 2026-02-21

### Fixed

- **Mobile menu**: Move missing CSS for the mobile menu to the correct file

## [1.0.8] - 2026-02-19

### Added

- **Breakpoint Utility Hook**: Created `useBreakpoint` hook that accepts breakpoint as argument and returns true if window size is at or below the specified breakpoint value
- **Skills Section Enhancements**:
  - Dynamic skill display on small screens (shows top 4 skills by default)
  - "Show more" and "Show less" buttons with plus/minus icons for mobile experience
  - New skills added: Jira, SEO, SQL, CI/CD, Headless CMS
- **TechStack Component**: Extracted tech stack section into standalone reusable component with dedicated SCSS file
- **Scroll-based Header Border**: Sticky header now displays border-bottom only when scrolled past 60px

### Changed

- **Page Layout Refactor**: Moved sticky header CSS into separate SCSS file for better organization
- **Contact Information**: Updated email addresses
- **Skill Icons**:
  - Improved SEO icon (database → magnifying glass)
  - Added CI/CD icon (gears)
  - Added Headless CMS icon (box)

### Fixed

- **Responsive Gradient Animation**: Fixed gradient animation responsiveness on landing page, ensuring borders don't show on screens below 768px
- **Responsive Design**: General responsive design improvements across the landing page
- **TypeScript Types**: Fixed breakpoint type inference issue by defining `Breakpoint` type in theme.ts

## [1.0.7] - 2026-02-12

### Fixed

- **Headline Translation**: Fix typo in headline on the landing page

## [1.0.6] - 2026-02-12

### Added

- **Maintenance Reasons**: Added typed maintenance reasons constants and translations

### Changed

- **Landing Page Rework**: Updated layout and content to better highlight expertise, description, and skills
- **Coming Soon Page**: Added configurable maintenance reasons display
- **Global Loader**: Keep loader visible while fonts load

### Fixed

- **Page Titles**: Corrected page titles
- **Language Switcher**: Prevented layout shift
- **Skills Label**: Corrected the skills label text
- **Import Sorting**: Fixed import sorting order
- **TSConfig JSX**: Corrected JSX configuration in tsconfig

## [1.0.5] - 2026-02-10

### Fixed

- **Security Headers Routing**: Corrected headers source pattern from `/(.*)`to `/:path*` in next.config.ts for proper i18n routing compatibility, ensuring all security headers are applied to all routes including localized paths
- **Production URLs**: Updated all references from `renekrajnc.com` to `www.renekrajnc.com` across sitemap.xml, robots.txt, security.txt, PageHead component, .env.example, and documentation to match canonical domain

## [1.0.4] - 2026-02-10

### Added

- **Security Headers**: Comprehensive security headers including Content-Security-Policy, Permissions-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy
- **SEO Files**: Added robots.txt, RFC 9116 compliant security.txt, and multilingual sitemap.xml with hreflang annotations
- **PageHead Component**: Created dedicated component for SEO meta tags with hreflang support, Open Graph locale metadata, and canonical URLs
- **Dynamic Locale Support**: HTML lang attribute now dynamically reflects current language (en/sl/de)
- **Environment Configuration**: Added .env.example template for site URL configuration

### Changed

- **PageLayout Refactoring**: Extracted SEO logic into PageHead component for better separation of concerns
- **URL Structure**: Canonical URLs and hreflang tags now use route constants for cleaner, query-parameter-free URLs

## [1.0.3] - 2026-02-10

### Added

- **Theme Toggle Translations**: Added multilingual support for theme toggle tooltips in English, Slovenian, and German

### Changed

- **Global Loader Styling**: Updated loader dot colors to use proper theme color tokens

## [1.0.2] - 2026-02-09

### Added

- **Global Loader Component**: Created elegant animated loader for theme initialization and app mounting
- **Section Component**: Added reusable Section component for consistent layout patterns
- **Progress Bar Component**: Implemented ProgressBar component with customizable styling
- **Responsive Design Mixin**: Created `mq` mixin for consistent media query handling across SCSS files
- **Breakpoints System**: Added centralized breakpoint constants for responsive design

### Changed

- **Dependency Updates**: Upgraded to Next.js 16.1.6 and React 19.2.4 for latest features and performance
- **Theme Context Refactoring**: Improved theme initialization and hydration handling
- **ESLint Configuration**: Migrated from legacy .eslintrc.json to flat config (eslint.config.mjs)
- **Responsive Design**: Refactored all SCSS files to use mq mixin instead of hardcoded media queries
- **Typography Usage**: Enhanced typography consistency across components using Material-UI Typography
- **CSS Organization**: Added `@use 'styles'` imports to SCSS modules for better dependency management

### Fixed

- **Theme Hydration**: Resolved theme flash and hydration mismatch issues with proper SSR handling
- **MUI Theme Synchronization**: Fixed Material-UI theme not updating on theme toggle by using theme-aware fallbacks
- **Fishing Page Visibility**: Implemented server-side redirect to properly hide fishing page from users and crawlers
- **ESLint Import Issues**: Fixed ES module import errors with proper .mjs extension
- **CI/CD Pipeline**: Resolved GitHub Actions linting and build failures
- **Sass Deprecation**: Updated from deprecated `map-get` to `map.get` with proper `sass:map` import
- **Mobile Padding**: Fixed responsive padding issues across all pages
- **Language Switcher**: Fixed dropdown behavior to only close when clicking active language

### Technical Improvements

- **Node Version**: Updated to Node.js 20.9.0 for improved performance and compatibility
- **Build Configuration**: Optimized package.json scripts and removed conflicting module type
- **Import Sorting**: Configured and applied automatic import sorting with eslint-plugin-simple-import-sort
- **Unused Import Cleanup**: Integrated eslint-plugin-unused-imports for cleaner codebase

## [1.0.1] - 2025-08-02

### Added

- **Prepare for release**: Prepare content for release, hide unfinished contact form
- **Coming soon Page**: Created a coming soon page and displayed it in place of the Projects page
- **Fishing Page**: Created a fishing page with a countdown timer to the start of the trip with grandpa
- **Logo Component**: Created dedicated Logo component with theme-aware switching between light/dark logos
- **Responsive Logo Design**: Implemented full logo for desktop and initials logo for mobile screens
- **Enhanced Visual Hierarchy**: Implemented distinct background colors for better visual separation
- **Backdrop Filter Effects**: Added glass-morphism effect to header with backdrop blur
- **Improved Color System**: Refactored to semantic color tokens with proper light/dark theme support
- **Theme Utilities**: Created themeUtils.ts with type-safe color token access and theme-aware fallbacks
- **Enhanced Form Styling**: Added icons to contact form fields (Person, Email, Message icons)
- **Language Switcher Improvements**: Integrated country flag icons using country-flag-icons library
- **Navigation Enhancements**: Added elegant hover effects with animated underlines and background highlights
- **Mobile Menu Refinements**: Enhanced mobile sidebar with improved animations and styling
- **Card Design System**: Implemented consistent card styling with shadows, borders, and rounded corners
- **Semantic Color Tokens**: Created comprehensive color system with primary, secondary, and tertiary backgrounds
- **Theme Synchronization**: Fixed Material-UI theme integration with custom CSS variable system
- **Hydration Fixes**: Resolved theme mismatch issues on page refresh with proper SSR handling
- **Enhanced ContactPage**: Added descriptive text and improved layout
- **Social Media Section**: Added GitHub, LinkedIn, Twitter, Instagram, and Discord links
- **Two-Column Layout**: Implemented for contact form and social media sections
- **Contact Page Translations**: Added translations for Slovenian and German languages
- **Enhanced StickyHeader**: Added responsive navigation and mobile hamburger menu
- **Desktop Navigation**: Added links with hover effects and underline animations
- **Mobile Sidebar**: Implemented with navigation, language switcher, and theme toggle
- **Smooth Animations**: Added slide-in animation for mobile menu
- **Material UI Integration**: Integrated component library with custom theme
- **Enhanced ContactForm**: Added Material UI components (Card, TextField, Button)
- **Material UI ThemeProvider**: Added and CssBaseline for consistent styling

### Changed

- **Header Background**: Fixed transparent header issue with proper opaque backgrounds
- **Color Variables**: Migrated from generic `--background-color` to semantic `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- **Text Colors**: Updated from `--text-color` to semantic `--text-primary` and `--text-secondary`
- **Component Architecture**: Refactored logo implementation into separate reusable component
- **Styling Organization**: Moved logo-specific styles to dedicated Logo.module.scss
- **Theme Detection**: Improved theme detection with MutationObserver for real-time theme switching
- **Form Field Styling**: Enhanced input fields with proper background colors and semantic styling
- **Navigation Styling**: Updated navigation links to use semantic color variables
- **Mobile Controls**: Improved mobile menu button and close button styling
- **Card Styling**: Enhanced all cards with consistent shadows, borders, and spacing

### Fixed

- **Header Transparency**: Fixed header background transparency issues in both light and dark themes
- **Theme Hydration**: Resolved hydration mismatch when refreshing page in dark theme
- **Flag Icon Display**: Fixed country flag rendering issues in language switcher
- **Layout Shift**: Prevented layout shift when opening language switcher dropdown
- **Color Consistency**: Eliminated hardcoded colors in favor of semantic color tokens
- **Mobile Menu Styling**: Fixed mobile sidebar header border color references
- **Form Input Styling**: Updated contact form inputs to use semantic color variables
- **Navigation Underlines**: Fixed underline width to go full width of navigation text
- **Brand Logo Styling**: Removed unnecessary underline effect from brand/logo link
- **Navigation Links**: Fixed to preserve locale when switching between pages
- **Anchor Tags**: Replaced regular anchor tags with Next.js Link components in LandingPage navigation
- **Locale Preservation**: Added to ensure users stay on their selected language when navigating
- **Translation Keys**: Fixed missing translation key for contact form title in all languages
- **Hardcoded Text**: Replaced hardcoded "Send me a message" text with proper translation keys

### Technical Improvements

- **Type Safety**: Added ColorToken type and ColorTokens constant for type-safe color usage
- **Theme Utilities**: Created getCssVar and getCssVarWithTheme functions for consistent color access
- **Component Separation**: Isolated logo logic into dedicated component for better maintainability
- **CSS Organization**: Improved SCSS structure with proper component-specific styling
- **Performance**: Optimized theme detection with efficient MutationObserver implementation
- **Accessibility**: Enhanced logo component with proper alt text and semantic markup
- **Responsive Design**: Improved logo responsive behavior with proper breakpoint handling

## [0.1.1] - 2025-08-02

- Enhanced Next.js configuration with comprehensive optimizations and security settings
- Added i18n configuration supporting English, Slovenian, and German locales
- Configured image optimization with WebP and AVIF formats for better performance
- Implemented security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- Enabled compression and disabled powered-by header for better performance and security
- Added comprehensive device and image size configurations for responsive image handling
- Added Slovenian and German translation JSON files for i18n (next-i18next).
- Created a LanguageSwitcher component for language selection and placed it on the LandingPage.
- Fixed SEO translation fallback and improved useSeo hook for better reliability.
- Refactored PageLayout to accept a route prop for dynamic SEO data.
- Removed unnecessary 'use client' directive from LandingPage (not needed in Pages Router).
- Updated navigation links in LandingPage to use Routes constants for consistency and type safety.
- Improved section structure in LandingPage for better semantics and maintainability.
- Moved ThemeToggle and LanguageSwitcher to a global sticky header for consistent access across all pages.
- Refactored header as a separate StickyHeader component in PageLayout.
- Made header fixed for robust sticky behavior and improved layout compatibility.

## [0.1.0] - 2025-07-25

- Project initialized and configured
- Added a CHANGELOG and updated the README with changelog reference
- Fixed .prettierrc invalid escape character errors
- Set up i18n with next-i18next and created English translation JSON
- Refactored landing page to use translations and serverSideTranslations
- Moved skills list to a TypeScript constant with Font Awesome icons
- Added and styled a dark/light theme toggle with CSS variables
- Implemented ThemeToggle component and integrated it into the UI
- Updated all styles to use CSS variables for theme support
- Fixed hydration and image path issues for Next.js best practices
- Refactored contact form into a separate component using react-hook-form for validation and state management
- Moved contact form styles to ContactForm.module.scss for modular styling
- Added react-hook-form to project dependencies for form state management and validation
