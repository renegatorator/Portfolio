# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Created SocialMediaLinks component with hover effects and responsive design
- Enhanced ContactPage with descriptive text and improved layout
- Added social media section with GitHub, LinkedIn, Twitter, Instagram, and Discord links
- Implemented two-column layout for contact form and social media sections
- Added contact page translations for Slovenian and German languages
- Enhanced StickyHeader with responsive navigation and mobile hamburger menu
- Added desktop navigation links with hover effects and underline animations
- Implemented mobile sidebar with navigation, language switcher, and theme toggle
- Added smooth slide-in animation for mobile menu
- Integrated Material UI component library with custom theme
- Enhanced ContactForm with Material UI components (Card, TextField, Button)
- Added Material UI ThemeProvider and CssBaseline for consistent styling

### Fixed

- Fixed navigation links to preserve locale when switching between pages
- Replaced regular anchor tags with Next.js Link components in LandingPage navigation
- Added locale preservation to ensure users stay on their selected language when navigating
- Fixed missing translation key for contact form title in all languages
- Replaced hardcoded "Send me a message" text with proper translation keys

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
