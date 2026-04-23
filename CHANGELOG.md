# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.3.5]

### Added

- **Social Link Preview Metadata**: Expanded `PageHead` with the full Open Graph and Twitter Card tag set so shared links on Facebook, LinkedIn, iMessage, Discord, and Slack render a rich preview: `og:type`, `og:site_name`, `og:url`, `og:image` (+ `secure_url`, `type`, `width`, `height`, `alt`), `og:locale:alternate` entries for the non-active supported locales, and `twitter:card=summary_large_image` with matching `twitter:title`, `twitter:description`, `twitter:image`, and `twitter:image:alt`
- **Social Preview Asset**: Added `public/og-image.png` (1200×630) referenced by all `og:image` / `twitter:image` tags

### Changed

- **Locale-Aware Canonical**: `canonical`, `og:url`, and the `hreflang` alternates now all derive from the same `buildLocalisedUrl` helper (default locale unprefixed, other locales prefixed with `/<locale>`), replacing the previous locale-agnostic canonical that contradicted the `hreflang` block
- **Shared Site Name**: `og:site_name` now reuses the existing `reneKrajnc` constant from `src/constants/rene.ts` instead of a duplicated local string
- **Consistent Asset Base URL**: OG image URL is derived from `baseUrl` (same source as `canonical` / `og:url` / `hreflang`) so production, preview, and local deployments all emit a coherent set of absolute URLs in `<head>`

## [1.3.6]

### Changed

- **Theme Store via `useSyncExternalStore`**: `ThemeProviderCustom` now reads/writes theme through React 18's `useSyncExternalStore` hook backed by `localStorage`, eliminating the `setState`-inside-`useEffect` pattern and enabling cross-tab sync via the `storage` event; theme plumbing (`THEME_STORAGE_KEY`, `isTheme` type-guard, `themeInitScript`) now lives in `src/utils/themeUtils.ts` and is interpolated from the `Themes` literal union so the inline script cannot drift from the React store

### Fixed

- **Empty `<head>` for Social Crawlers**: `ThemeProviderCustom` was short-circuiting SSR with `if (!mounted) return <GlobalLoader />`, which meant `PageLayout` → `PageHead` never ran on the server and Facebook/LinkedIn/iMessage/Slack received HTML with no `<title>`, no `og:*`, and no `twitter:*` tags; removed the mount gate so the full metadata is now emitted in the initial server response
- **Theme Flash Prevention Without Blocking SSR**: Added a tiny inline pre-hydration script in `src/pages/_document.tsx` that reads `localStorage.theme` and sets `data-theme` on `<html>` before first paint, replacing the full-page loader gate with the industry-standard (next-themes) pattern — no flash for returning visitors, full SSR for crawlers

## [1.3.4]

### Changed

- **Work Experience Copy**: Removed misleading framing that implied blockchain domain expertise; the Equaleyes role highlight no longer says "Lead frontend development for blockchain-based products" and now reads "Build the frontend (React, Next.js, TypeScript) for modern web products" in EN, SL, and DE, with no client names attached
- **Work Experience Subtitle**: Replaced "blockchain, transport and logistics" framing with a frontend-focused line ("Delivering production-ready frontend solutions with React, Next.js and TypeScript for 6+ years.") in EN, SL, and DE
- **Equaleyes Tech List**: Removed `Blockchain` from the Equaleyes `tech` array in `src/constants/rene.ts` so the displayed tech stack reflects actual frontend skills only

## [1.3.3]

### Changed

- **Ops Tracker Screenshot**: Replace Board screenshot with new image

## [1.3.2]

### Added

- **Screenshot Lightbox**: Carousel slides are now clickable and open a full-screen lightbox (MUI `Modal`) with a dark backdrop, prev/next arrow buttons, keyboard navigation (arrows + Esc), close button anchored to the image's top-right corner, and document scroll-lock while open; carousel auto-advance is paused for as long as the lightbox is open
- **Challenges & Decisions Accordion**: Replaced the static decisions card list in `ProjectShowcase` with an MUI `Accordion`; each item shows a short challenge title in the summary and an icon-led Challenge / Solution / Trade-off layout in the details (FontAwesome `triangle-exclamation`, `lightbulb`, `scale-balanced`); first item expanded by default
- **i18n Decisions Keys**: New `challengeShort` per decision and `projects.page.decisionsSubtitle` added to `en`, `sl`, and `de` locale files

### Changed

- **Lightbox Nav Buttons**: Prev/next buttons are positioned absolutely against the lightbox container instead of flexed inline with the image, so they stay in a fixed viewport position regardless of slide width and never overlap the image; image `max-width`/`max-height` use `calc(100vw - …)` and `calc(100vh - …)` that reserve space for the nav lanes at every breakpoint

### Fixed

- **ProjectShowcase Non-Null Assertions**: Replaced `project.stats!` and `project.decisions!` with narrowed local consts (`stats`/`decisions`) derived once via `Array.isArray(...) ? ... : []`, so the optional arrays are iterated safely and the file complies with the no-`!` rule
- **Code Conventions Translations Rule**: Updated the Translations section in `.cursor/rules/code-conventions.mdc` to reference `useTranslation()` from `next-i18next` (the API actually used in this codebase) instead of the unrelated `useTranslations`, and added a pointer to `<Trans>` for inline markup interpolation

## [1.3.1]

### Added

- **Ops Tracker image set**: `public/images/ops-tracker-images/` with seven showcase PNGs; theme-aware SVG logos copied from the legacy screenshots folder; all project constants now point at this directory
- **Screenshot subtitle**: Optional `subtitle` on each `Screenshot`; carousel renders title and subtitle in a bottom gradient overlay on each slide
- **Architecture Snapshot**: New `ProjectShowcase` panel after Engineering Highlights with four bullets from locale `projects.data.opsTracker.architectureSnapshot`
- **Hero key props**: Three pill chips below the Ops Tracker tagline, driven by `projects.data.opsTracker.keyProps` in EN, DE, and SL
- **Projects page locale keys**: `engineeringHighlights`, `architectureSnapshot`, and `ctaTrust` under `projects.page` in all locale files

### Changed

- **Ops Tracker project data**: Reduced screenshots from nineteen to seven with per-slide captions and subtitles; trimmed `features` to six entries; compressed `techCategories` to four groups (frontend, data state, backend, infrastructure)
- **ProjectShowcase layout**: About panel retitled to Engineering Highlights; description stacked full width above a two-column highlights grid; Live Demo button before GitHub; trust line under CTAs
- **Ops Tracker locale copy**: New tagline; highlights list reduced to five engineering-focused bullets; tech category keys aligned with the four data groups; removed unused feature strings for dropped feature keys
- **ScreenshotCarousel styling**: Stronger bottom gradient and text shadow on overlay text; active dot stays circular (no pill width); auto-advance interval increased from 4s to 5s
- **ScreenshotCarousel behaviour**: Slide and `next/image` keys use `screenshot.src` instead of array index for stable reconciliation when navigating slides

## [1.3.0]

### Added

- **Projects Page**: Replaced the coming-soon placeholder on `/projects` with a fully data-driven project showcase page
- **Project Data Layer**: Added typed `Project` interface in `src/constants/projects.ts` with fields for screenshots, tech categories (via `categoryKey`), features (via `featureKey`), theme-aware logo paths, and status; all translatable text is resolved from locale files via `projectKey`
- **Ops Tracker Showcase**: Added first project entry with 19 ordered screenshots, 7 tech categories, 9 key features, and a theme-aware SVG logo
- **ScreenshotCarousel Component**: Custom carousel with a browser chrome frame (traffic-light dots + URL bar), auto-advance every 4 seconds, pause on hover/focus, looping, arrow navigation, dot indicators, progress bar, group chip label, and full keyboard support
- **ProjectShowcase Component**: Per-project showcase with status chip, theme-aware SVG logo, tagline, GitHub and Live Demo CTA buttons, screenshot carousel, and stacked About / Tech Stack / Key Features panels
- **TechBadge Component**: Reusable pill chip component for tech stack labels with hover border glow; usable across the whole site
- **ProjectsPage Layout**: Page layout with a glass shell matching Contact page visual language (section-glass-bg, primary-border, floating orb, light/dark box-shadow), a gradient divider separating the page header from the project list, and a page description
- **Theme-Aware Project Logo**: Projects can supply `logoLight` and `logoDark` SVG paths; the correct variant is shown via CSS `data-theme` toggling with no JavaScript state or flash
- **Description Highlights**: Project descriptions in locale files use `<highlight>` markup rendered via the i18next `Trans` component; nine key terms displayed with a blue primary colour and subtle glow in the Ops Tracker About section
- **Projects i18n**: Added `projects.page.*` UI chrome keys (About, Tech Stack, Key Features, View on GitHub, Live Demo, Open Source, Screenshots) to English, German, and Slovenian locale files

### Changed

- **Screenshot Filename**: Renamed `landing-01,png.png` to `landing-01.png` to fix a comma typo in the filename
- **Project Title Typography**: Reduced project name heading from `clamp(2rem, 5vw, 3rem)` to `clamp(1.5rem, 2.5vw, 2rem)` so it reads as a section heading
- **Tagline Font Size**: Reduced from MUI `subtitle1` default (~16px) to an explicit `13px`
- **Projects Page Header**: Centred title and description with `text-align: center` / `margin: 0 auto` to match Contact page visual language; increased top padding on xs from `24px` to `40px`
- **Project Showcase Mobile Layout**: Switched header to `flex-direction: column` on `sm` so CTA buttons always flow below the meta block and cannot overflow the container on narrow screens
- **Reveal Animation Sensitivity**: Lowered `IntersectionObserver` threshold from `0.2` to `0.05` and removed the negative `-8%` bottom `rootMargin` so large elements (carousel, panels) reveal as soon as they enter the viewport rather than requiring 20 %+ of their height to be visible

### Fixed

- **ScreenshotCarousel Ref Mutation**: Moved `stateRef.current` sync from the render phase into a `useEffect` to resolve a React render-purity violation (`Cannot update ref during render`)

## [1.2.6]

### Changed

- **Profile Image**: Replaced `rene-profile.png` with `rene-profile.jpg` on ContactPage; reduces asset size from ~474 KB to ~30 KB

### Added

- **Email Logo Asset**: Added `logo-email.png` to `public/images/logo/` for use in email templates

## [1.2.5]

### Added

- **Work Experience i18n**: Moved `role`, `location`, and `highlights` fields out of `rene.ts` constants and into locale files (`en`, `sl`, `de`) under `workExperience.experiences.{id}.*`

### Changed

- **WorkExperienceCard**: All translatable content (role, location, highlights, period label) now resolved via `useTranslation`; period string constructed at render time from `startDate`/`endDate` fields
- **WorkExperience Interface**: Removed hardcoded `role`, `period`, `location`, and `highlights` fields from `WorkExperience`; replaced `period` with `startDate` and optional `endDate`
- **WorkExperienceCard Mobile Layout**: Company logo rendered inside the card header on mobile (`≤sm`); timeline avatar column hidden at the same breakpoint
- **Dev Script**: Switched from `--turbopack` to `--webpack`

## [1.2.4]

### Changed

- **Profile Images**: Added anime-style profile picture (`rene-anime.png`) to HeroSection; updated profile image on ContactPage; replaced `rene-profile.jpg` with `rene-profile.png` and `rene-anime.png`

## [1.2.3]

### Added

- **Work Experience Section**: Added `WorkExperienceSection` with glass shell, animated timeline, and company logo avatars; rendered as the last section on the landing page
- **WorkExperienceCard Component**: Card component displaying company, role, period, location, highlights, and tech stack pills with top accent bar and hover lift
- **Work Experience Data**: Added `WorkExperience` interface and `workExperiences` constant to `src/constants/rene.ts`
- **DownloadCV Component**: Reusable locale-aware download button; EN/SL locales link to the English CV, DE locale links to the German CV
- **CV PDFs**: Added `Rene_Krajnc_EN_2026.pdf` and `Rene_Krajnc_DE_2026.pdf` to `public/cv/`
- **Company Logos**: Added Equaleyes, Margento, and Direct4.me logo images to `public/images/`
- **SCSS Mixins**: Added `pulse-glow`, `orb-drift`, `float-y`, and `rotate-spin` mixins to `mixins.scss`
- **Work Experience i18n**: Added `workExperience.*` translation keys to EN, DE, and SL locale files

### Changed

- **LandingPage Order**: Work experience section placed last — Hero → TechStack → About → WorkExperience
- **DownloadCV Placement**: Button added to HeroSection CTA row and ContactPage connect card
- **HeroSection Typography**: Role label reduced to small uppercase eyebrow style; name and tagline font sizes pulled back; content gap increased for breathing room
- **Keyframe Consolidation**: Replaced 8 duplicate `@keyframes` blocks across HeroSection, ContactPage, WorkExperienceSection, and AboutSection with `@include orb-drift`, `@include float-y`, and `@include rotate-spin` mixin calls
- **WorkExperienceCard SCSS**: Merged duplicate block definitions; replaced inline `@keyframes pulseGlow` with `@include pulse-glow`; cleaned up decorative `// ──` comments
- **WorkExperienceSection**: Changed outermost wrapper from `<div>` to `<section>` for correct document semantics

### Fixed

- **External Link Security**: Company links in WorkExperienceCard now include `rel="noopener noreferrer"` and render as plain text when no URL is provided
- **pulseGlow Visibility**: Ring glow is now visible at peak expansion (was rendering fully transparent)
- **Removed Unused Dependency**: Removed `pdf-parse` from devDependencies

## [1.1.5]

### Changed

- **Contact Emails**: Reduce logo size in email templates to make it load faster

### Fixed

- **Contact Form**: Fixed label of name field,

## [1.1.4]

### Fixed

- **Contact reCAPTCHA Lifecycle**: Fixed reCAPTCHA badge visibility and readiness state when navigating between landing and contact pages, preventing a stuck disabled submit button on return

## [1.1.3]

### Added

- **Centralized Email Constants**: Added `EmailAddresses` and `EmailAddress` in `src/constants/rene.ts` for reusable address references

### Changed

- **Contact Email Routing**: Updated contact send API and email utility fallback logic to use centralized `EmailAddresses` constants
- **Social Links Email Address**: Updated social media email link to use centralized email constants instead of hardcoded mailto
- **Contact Page Layout**: Refined header/content spacing and responsiveness in contact page and page layout styles
- **Contact Form Styling**: Improved responsive input/textarea spacing and full-width form sizing behavior
- **SCSS Breakpoint Consistency**: Normalized mixin usage in section and page layout styles

### Fixed

- **Security Contact Address**: Updated `.well-known/security.txt` contact email to `security@renekrajnc.com`

## [1.1.2]

### Changed

- **App Version**: update app version

## [1.1.1]

### Fixed

- **Social Media Section**: Fixes vertical alignment

## [1.1.0]

### Added

- **Resend Contact Delivery**: Added `api/contact/send` endpoint to send contact submissions to `info@renekrajnc.com` and send localized confirmation emails to submitters
- **Email Templates**: Added React Email templates for inquiry and confirmation emails with branded logo presentation
- **Contact Form Hook**: Added `useContactForm` hook to centralize submit, API request, reset, and success/error state logic
- **Contact Email Utilities**: Added `contactEmail` utility module for locale resolution, sender formatting, public asset URL handling, and localized email copy loading
- **Email Locale Files**: Added dedicated `public/locales/{en,sl,de}/email.json` files for email-specific translation content
- **Form Validation Rules**: Added shared `EMAIL_PATTERN` in `src/constants/formRules.ts`

### Changed

- **Contact Form UX**: Replaced placeholder alert submit flow with API-backed submission and added visible success/error notifications
- **Localization**: Added localized contact submit states (`sending`, `sendSuccess`, `sendError`) in English, Slovenian, and German
- **Environment Configuration**: Documented Resend-related variables (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, `EMAIL_ASSET_BASE_URL`) in `.env.example` and README
- **Dependencies**: Added `resend` and `@react-email/components`

### Fixed

- **Email Branding Visibility**: Improved logo readability in email clients by using a visibility-safe email logo asset

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
