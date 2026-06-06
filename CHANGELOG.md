# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.3.16]

### Added

- **Shared Type & Utility Layer**: Introduced a set of reusable primitives to remove duplicated inline logic and ad-hoc casts across the codebase — `src/types/api.ts` (`ApiResult`, `SiteKeyResponse` envelopes now consumed by all three API routes), `src/types/projects.ts` (`ProjectRichItem`, `ProjectStatCopy`, `ProjectDecisionCopy` for `returnObjects` i18n lookups), `src/utils/api.ts` (`parseJsonResponse` safe JSON parser used by `useRecaptchaV3` and `useContactForm`), `src/utils/translations.ts` (`getTranslationArray` / `getTranslationObject` typed helpers for `next-i18next` object lookups), `src/utils/format.ts` (`formatIndex` and `formatLongDate`, previously inline in `ProjectShowcase` and `PrivacyPage`), and `src/utils/createLocalStorageStore.ts` (a generic `useSyncExternalStore`-compatible factory)
- **Centralized Constants**: New single-source-of-truth modules — `src/constants/i18n.ts` (typed `i18nConfig` replacing the old JS `next-i18next.config.js`, now passed explicitly to `appWithTranslation` and every `serverSideTranslations` call), `src/constants/recaptcha.ts` (`RecaptchaActions` / `RecaptchaAction`), `src/constants/seo.ts` (`OG_LOCALE`, OG image constants, `buildLocalisedUrl`), and `src/constants/social.ts` (`SocialUrls` / `SOCIAL_PROFILE_URLS` consumed by both `SocialMediaLinks` and the `PageHead` schema `sameAs`, so the two can no longer drift)
- **Shared Email Styles**: New `src/emails/styles.ts` exports the inline style objects (`emailMain`, `emailContainer`, `emailLogoSection`, `emailHeading`, `emailParagraph`, `emailDivider`) shared by `ContactInquiryEmail` and `ContactConfirmationEmail`, keeping their visual shell identical from one source
- **Favicon / Manifest / Viewport Metadata**: `src/pages/_app.tsx` now emits an explicit `viewport` meta plus `icon` (`favicon.ico`, `icon0.svg`), `apple-touch-icon`, and `manifest` links globally (covering the 404 page), wiring up the existing but previously unreferenced icon assets in `public/`
- **CI Build & Format Verification**: `.github/workflows/ci.yml` now also runs `format:check` and a full `next build`, triggers on pushes to `master` / `main` (in addition to `development`), upgrades the GitHub Actions to v4, and enables npm caching; added a `format:check` script (`prettier --check .`) to `package.json`

### Changed

- **God-Component Decomposition**: Split the three largest components into focused units with no behavioral change — `ScreenshotCarousel` now delegates to a `useScreenshotCarousel` hook and a `ScreenshotLightbox` subcomponent; `ProjectShowcase` is an orchestrator rendering `ProjectHeader`, `ProjectHighlights`, `ArchitectureSnapshot`, `ProjectDecisions`, `ProjectTechStack`, and `ProjectFeatures` (sequential section numbering preserved via a shared counter); `PrivacyPage` now composes `PrivacyToc` and `PrivacySection`
- **File Organization Normalized**: Moved the remaining flat UI files (`Logo`, `LanguageSwitcher`, `ProgressBar`, `SocialMediaLinks`, `ThemeToggle`) into their own `Component/Component` folders to match the rest of `src/components/UI` (history preserved via `git mv`), and relocated the `useSeo` hook from `src/constants/hooks/` to `src/utils/hooks/` alongside the other hooks
- **Logo Theme Source**: `Logo` now reads the theme from the `useTheme` context (like `ThemeToggle`) instead of running its own `MutationObserver` on `data-theme`, removing a redundant DOM observer while keeping the same light/dark logo behavior
- **State Stores Consolidated**: `ThemeContext` and `CookieConsentContext` now build on the shared `createLocalStorageStore` factory instead of each re-implementing `useSyncExternalStore` + storage plumbing (the cookie context's in-memory fallback behavior is preserved), and `useMuiTheme` memoizes its `createTheme` call
- **Stronger Domain Typing**: `ProjectStatus` is now derived from a `ProjectStatuses` const object, `apiRoutes.ts` exports a derived `ApiRoute` type, `DownloadCV` uses a `Record<Locale, string>` map with an `isLocale` guard, and `ContactForm` / `useRecaptchaV3` reference `RecaptchaActions` instead of a string literal
- **SCSS Consolidation**: Added a `decorative-orb` mixin and applied it to the repeated floating-orb gradients (`HeroSection`, `WorkExperienceSection`, `ContactPage`, `ProjectsPage`, `PrivacyPage`), and replaced the manual hover block on `WorkExperienceCard` with the existing `card-hover` mixin — compiled CSS output is unchanged
- **API Hardening**: `api/contact/send.ts` now enforces field-length limits (name/email/message), sanitizes control characters out of the email subject line, and sets a 64 kb request body-size limit; the reCAPTCHA endpoints and the contact endpoint now share the `ApiResult` / `SiteKeyResponse` types
- **Tooling Config**: Removed the conflicting Prettier import-order keys (sorting is owned by ESLint's `simple-import-sort`) and the duplicate `eslint` script, and ran a one-time repository-wide Prettier format so the new `format:check` CI step passes cleanly

### Removed

- **Dead Code & Boilerplate**: Deleted unused starter/boilerplate files (`src/pages/api/hello.ts`, `src/styles/Home.module.css`, the orphaned `GlobalLoader` component, and the `public/{vercel,file,window}.svg` assets), the now-redundant `next-i18next.config.js`, the unused `getCssVar` helper in `themeUtils.ts`, the commented-out social links in `SocialMediaLinks`, and the `prettier-plugin-organize-imports` dev dependency

## [1.3.15]

### Changed

- **Availability Copy Generalised Across All Locales**: Replaced contract- and freelance-specific availability strings (`availability` and `availabilityShort` keys in `public/locales/{en,de,sl}/common.json`) with neutral open-to-work wording — EN: "Open to New Opportunities" / "Open to Work", DE: "Offen für neue Möglichkeiten" / "Auf Jobsuche", SL: "Na voljo za nove priložnosti" / "Na voljo za priložnosti"; the `AvailabilityChip` component (rendered in `HeroSection` and `ContactPage`) reads these keys directly so no code changes were required
- **CV Files Updated**: Replaced `public/cv/Rene_Krajnc_EN_2026.pdf` and `public/cv/Rene_Krajnc_DE_2026.pdf` with revised 2026 editions (file size reduced from ~83 KB to ~65 KB per file)
- **ProjectShowcase Decision Details Top Padding**: Increased `padding-top` on `.decisionDetails` from `4px` to `12px` for better visual separation between the border and the decision item content

## [1.3.14]

### Added

- **Default-Locale Canonical Redirect Middleware**: New root-level `middleware.ts` permanently redirects `/en` and any `/en/*` route to the unprefixed canonical path (`/`, `/contact`, `/projects`, etc.), closing the duplicate-URL gap left by Next.js i18n routing where the default locale can still be reached under its prefix; the redirect is implemented at the middleware layer because locale matching happens before `next.config.ts` redirects, and the matcher is intentionally scoped to `/en` plus descendants so no other locale routing is affected

### Changed

- **Cookie Banner Reframed as Acknowledgement Notice**: `CookieConsentBanner` now presents the cookie UI as a single-action acknowledgement instead of an accept/reject choice, with updated EN / DE / SL copy that explicitly states only strictly necessary preference storage is used while Google reCAPTCHA remains always active on the contact page for spam protection; the banner layout was also reworked so copy and CTA align horizontally on larger screens and collapse into a centered stacked layout earlier on small screens for a cleaner mobile presentation
- **Contact Form reCAPTCHA Flow Simplified**: `ContactForm` no longer gates reCAPTCHA behind cookie consent or stores pending submissions while waiting for consent; the Google reCAPTCHA script now loads whenever the site key is available, the inline consent warning / retry flow was removed, the submit button is disabled only until reCAPTCHA is ready, and the legal disclosure beneath the form is now localized via `contact.recaptchaNotice` with translated Google Privacy Policy / Terms of Service links in all three locales
- **Localized Contact Form Placeholders & Softer Surface Styling**: Added locale-aware placeholder strings for name and email fields in EN / DE / SL, switched the contact form card from the solid secondary background to a translucent primary-surface treatment, and introduced `--bg-primary-rgb` CSS variables in both themes so that translucent surfaces can be derived consistently without hardcoding theme-specific RGB values

### Fixed

- **Privacy Copy Aligned with Always-On Spam Protection**: The privacy-policy and cookie-banner translation trees in EN / DE / SL were updated to remove the outdated consent-based description of Google reCAPTCHA, replacing it with wording that reflects always-on spam protection under legitimate-interest framing and clarifying that the `cookie-consent-v1` localStorage entry records acknowledgement of cookie use rather than an accept/reject preference

## [1.3.13]

### Changed

- **Cookie Banner Text & UX Refinement**: Shortened and modernized the cookie consent banner body text across all three locales (EN / DE / SL) to reduce "legal/corporate" tone and align with the site's polished, developer-focused aesthetic; removed jargon like "strictly necessary technologies" in favor of conversational phrasing like "essential cookies"; renamed the reject button from "Reject non-essential" / "Nicht notwendige ablehnen" / "Zavrni nenujne" to "Essential only" / "Nur erforderlich" / "Le nujni" for a cleaner, less negative feel; reduced vertical density via tighter padding (18px → 16px), line-height (1.55 → 1.45), and button gaps (8px → 6px)

### Fixed

- **Image Cumulative Layout Shift Warnings**: `Logo.module.scss` was overriding the explicit width/height attributes set on `next/image` components with `height: auto`, causing Next.js to emit "Image with src has either width or height unspecified" warnings; replaced `height: auto` with explicit computed heights (desktop logo: 140px × 28px, mobile logo: 40px × 40px) to preserve aspect ratios and prevent layout shift, allowing Next.js to optimize images correctly

## [1.3.12]

### Added

- **JSON-LD Structured Data for Site Name**: `PageHead` (`src/components/layouts/PageLayout/PageHead/PageHead.tsx`) now emits two `<script type="application/ld+json">` blocks on every page — a `Person` schema (name `Rene Krajnc`, locale-aware `jobTitle` sourced from the `role` translation key so EN reads `Software Engineer`, SL reads `Frontend razvijalec`, and DE reads `Frontend Entwickler`, `image: /images/rene-profile.jpg`, `email: mailto:info@renekrajnc.com`, `sameAs` pointing at GitHub, LinkedIn, and Facebook) and a `WebSite` schema (name `Rene Krajnc`, `alternateName: renekrajnc.com`, `inLanguage` covering `en_US`, `sl_SI`, `de_DE`, and `author` referencing the same `Person`); this is the canonical signal Google's site-name extractor consumes, so the SERP entity will now resolve to `Rene Krajnc` instead of the bare `renekrajnc.com` hostname (the existing `og:site_name` tag is widely reported to be insufficient on its own)
- **Privacy Policy Page**: New `/privacy` route renders a production-ready, GDPR-aligned privacy policy with controller identity (Rene Krajnc, Maribor, Slovenia, `info@renekrajnc.com`), thirteen numbered sections (intro, controller, data collected, purposes & legal bases, cookies, third-party processors, international transfers, retention, your rights, security, children, changes, contact), a scannable three-card "what we collect / who it goes to / your rights" summary, a sticky in-page table of contents on desktop, and a locale-aware "Last updated" date driven by a `PRIVACY_LAST_UPDATED` constant in `src/constants/privacy.ts`; visuals match the rest of the site (`section-glass-bg`, primary-tinted border, floating-orb decoration, top accent bars, `<Reveal>` scroll animations)
- **Full EN / SL / DE Translations**: Added a complete `privacy.*` i18n subtree to `public/locales/{en,sl,de}/common.json` — including section bodies with inline `<strong>`, `<mailLink>`, `<dpaLink>`, `<resendLink>`, `<googleLink>`, `<vercelLink>`, and `<contactLink>` components — plus a new `cookies.*` subtree for the banner and a restructured `footer.*` group (`copyright`, `links.{privacy,contact,cookies}`); the Slovenian and German policies are full translations of the English baseline (Art. 6(1) GDPR bases, IP-RS as supervisory authority, SCC / EU–US DPF wording), not stubs
- **Cookie Consent Banner & Context**: New `CookieConsentBanner` (`src/components/UI/CookieConsentBanner/`) renders a glass-backed slide-in card pinned bottom-centre with vertically stacked Accept / Reject buttons (equal prominence per EDPB guidance) and an inline link to `/privacy#cookies`; backed by a new `CookieConsentProvider` (`src/context/CookieConsentContext.tsx`) that persists `accepted | rejected | unset` to `localStorage` under `cookie-consent-v1` via `useSyncExternalStore` (mirrors the pattern used by `ThemeProviderCustom`), exposes `accept`, `reject`, `openPreferences`, and `closeBanner` actions, and is wrapped around the app in `src/pages/_app.tsx`
- **Routes.PRIVACY & SEO**: `src/constants/routes.ts` gained `PRIVACY: '/privacy'`, `useSeo` (`src/constants/hooks/useSeo.ts`) returns localised `privacy.seo.title` / `privacy.seo.description`, and `PageHead` now emits the canonical, `hreflang` alternates, and `og:url` for the privacy route in all three locales

### Changed

- **Job Title Rebrand (EN only)**: The self-descriptive job title across the English locale changed from `Frontend Developer` to `Software Engineer` to align with the LinkedIn brand (`Senior React/Next.js Engineer`) and broaden the SEO signal beyond the strict "frontend" frame; updated `title`, `role`, `landingPage.title`, `landingPage.description`, `about.headline`, and `comingSoon.seo.description` in `public/locales/en/common.json`, the JSON-LD `Person.jobTitle` field in `PageHead.tsx` now sources directly from the per-locale `role` translation key so EN renders `Software Engineer` and SL/DE keep their native equivalents (no hardcoded constant); Slovenian (`Frontend razvijalec`) and German (`Frontend Entwickler`) locales intentionally keep their native equivalents because `Inženir` / `Ingenieur` read as formal/academic in those languages; the historical `direct4me.role: 'Frontend Developer'` work-experience entry is preserved as a factual record of the past job title and is not touched
- **Footer Redesign**: `src/components/layouts/PageLayout/PageLayout.tsx` replaced the single-line centred copyright with a footer containing a legal link group (`Privacy Policy · Contact · Cookie preferences`) and a copyright row underneath separated by a hairline divider; the link group uses locale-preserving Next `Link` components, an animated underline (200 ms ease) and `--text-secondary` → `--primary` on hover, and the "Cookie preferences" button re-opens the banner so visitors can revisit their choice without leaving the page; `top-accent-bar` mixin anchors the footer above the dark gradient
- **reCAPTCHA Gated Behind Cookie Consent**: `ContactForm` (`src/components/forms/ContactForm/ContactForm.tsx`) only mounts the Google reCAPTCHA `<Script>` when `consent === 'accepted'`; without consent the form shows an inline `Alert` with an "Accept and continue" button, and if the user clicks Send before consenting their valid form data is captured in state and the submission auto-retries once consent is granted and the captcha script has finished loading — meaning Google's reCAPTCHA cookies are no longer set on page load on the contact page
- **Dark-Theme Primary-Button Contrast**: `--primary-text` in dark mode flipped from `#f5f5f5` to `#0a1a2e` in both `src/styles/globals.css` and the JS theme-aware fallback in `src/utils/themeUtils.ts`, so MUI `contained` `color="primary"` buttons (and the `LanguageSwitcher` selected-item highlight and `ContactForm`'s submit pill) now render with dark text on the light-blue dark-theme primary instead of nearly invisible white-on-light-blue; light theme is unchanged (`#fff` on `#0070f3`)
- **SCSS Token & Mixin Consolidation**: Centralized recurring SCSS literals into `src/styles/theme.scss` and `src/styles/mixins.scss` so the design system has a single source of truth — new layout tokens (`$container-max-width: 1200px`, `$header-height: 64px`, `$scroll-anchor-offset: 96px`), content-width tokens (`$content-narrow: 640px`, `$content-medium: 760px`, `$content-wide: 820px`), brand tokens for decorative orbs and gradient stops (`$brand-blue: #0070f3`, `$brand-cyan: #28b8ff`), `$border-radius-pill: 999px`, and transition tokens (`$transition-fast: 200ms ease`, `$transition-base: 300ms ease`, `$transition-card: 260ms ease`); added a `primary-mix($pct, $base)` Sass function (via `string.unquote`) that replaces ~45 inline `color-mix(in srgb, var(--primary) X%, …)` calls, plus three new mixins — `backdrop-blur($amount)` (adds the `-webkit-` prefix), `pill-button($padding, $weight)` (the recurring MUI pill-CTA `!important` block), and `page-shell($padding, $mobile-padding)` (the glass shell pattern shared by `ContactPage`, `ProjectsPage`, `PrivacyPage`, and `WorkExperienceSection`); existing `primary-gradient`, `section-glass-bg`, `top-accent-bar`, `card-hover`, `pulse-glow`, and `primary-border` now reference the brand tokens and `primary-mix` so the hardcoded `#28b8ff` and `rgba(0, 112, 243, …)` / `rgba(40, 184, 255, …)` literals are no longer scattered across module SCSS files

### Fixed

- **Canonical URL for Non-Default-Locale Roots**: `buildLocalisedUrl` in `src/components/layouts/PageLayout/PageHead/PageHead.tsx` used to return `${baseUrl}/${locale}${routePath}` unconditionally, so for `locale='sl'` + `routePath='/'` it emitted `https://renekrajnc.com/sl/` with a **trailing slash** — but Next.js (`trailingSlash: false` default) **308-redirects** `/sl/` → `/sl`, which meant Google would fetch `/sl`, read `<link rel="canonical" href=".../sl/">`, fetch `/sl/`, get bounced back to `/sl`, and flag the page as **Alternative page with proper canonical tag** (slash-less variant) or **Page with redirect** (slash variant); the builder now special-cases `routePath === '/'` for non-default locales so `/sl` and `/de` declare themselves canonical, removing the redirect loop from `canonical`, `og:url`, and every `hreflang` alternate
- **Sitemap Listing Redirecting URLs**: `public/sitemap.xml` previously listed `https://renekrajnc.com/en/`, `/en/projects`, `/en/contact`, plus `/sl/` and `/de/` with trailing slashes — every `/en/…` URL is silently redirected by Next.js i18n to `/…` (because `en` is the default locale), and the trailing-slash forms are redirected by `trailingSlash: false`; sitemap was rewritten to ship only **final canonical URLs** (`/`, `/sl`, `/de`, `/projects`, `/sl/projects`, `/de/projects`, `/contact`, `/sl/contact`, `/de/contact`, plus the previously-missing `/privacy`, `/sl/privacy`, `/de/privacy` entries), each with a full `xhtml:link` block of `en` / `sl` / `de` / `x-default` alternates, and `<lastmod>` refreshed to today, so Google Search Console's "Page with redirect" cluster (8 affected URLs) collapses to zero on the next crawl
- **`www` Subdomain Has No Explicit Redirect**: `next.config.ts` had no `redirects()` rule, so requests hitting `www.renekrajnc.com` relied entirely on Vercel's dashboard config — which apparently wasn't pinning sub-paths correctly because GSC was reporting `https://www.renekrajnc.com/contact` as a **Soft 404**, `https://www.renekrajnc.com/sl` as **Duplicate without user-selected canonical**, and every other `www.*` URL as **Page with redirect**; added a host-based 308 redirect that catches any request with `host: www.renekrajnc.com` and rewrites it to `https://renekrajnc.com/:path*` directly inside the Next.js routing layer, plus explicit `trailingSlash: false` so the default isn't relied on implicitly
- **`og:image:type` Mismatch**: `OG_IMAGE_TYPE` in `PageHead.tsx` was declared as `image/png` even though `OG_IMAGE_PATH` points at `/og-image.jpg` (the file was switched to JPG back in `1.3.8` but the MIME constant wasn't updated); corrected to `image/jpeg` so unfurlers that validate `og:image:type` against the actual response `Content-Type` no longer reject the preview

## [1.3.11]

### Fixed

- **Release Workflow Discussion Permission**: `.github/workflows/release.yml` now grants `discussions: write` alongside `contents: write`, fixing the `error finalizing release: HttpError: Discussion could not be created. Make sure you passed a valid category name.` failure seen on the `v1.3.10` run; the release itself was being created successfully, but `softprops/action-gh-release` couldn't attach a discussion in the `Releases` category because the default `GITHUB_TOKEN` lacked permission to write discussions (the API surfaces this as a generic "invalid category name" error even when Discussions is enabled and the category exists, which made the original cause look like a config typo)

## [1.3.10]

### Added

- **GitHub Release Workflow**: New `.github/workflows/release.yml` triggers on pushes of `v*.*.*` tags and uses `softprops/action-gh-release@v2` to create a GitHub Release named `Release <tag>` with auto-generated release notes (`generate_release_notes: true`), publishes (not draft, not prerelease), and seeds a discussion in the `Releases` category so each tagged version now ships with proper release notes, a comparison link, and a discussion thread without any manual GitHub UI work
- **Release Workflow Permissions & Concurrency**: The workflow runs with `contents: write` (minimum needed to publish a release), checks out with `fetch-depth: 0` so the action can diff against the previous tag for accurate notes, and uses a `release-${{ github.ref }}` concurrency group with `cancel-in-progress: false` so two tags pushed in quick succession queue rather than clobber each other

## [1.3.9]

### Changed

- **OG Image Switch**: New OG image

## [1.3.8]

### Added

- **Social Preview Crawler Allow-List**: `public/robots.txt` now explicitly lists `facebookexternalhit`, `Facebot`, `Twitterbot`, `LinkedInBot`, `Slackbot`, `Discordbot`, `WhatsApp`, and `TelegramBot` with `Allow: /`, so upstream proxy / CDN `robots.txt` overrides or stricter defaults can't accidentally block unfurlers even though `User-agent: *` already allows them — belt-and-braces for the social preview pipeline
- **Social Preview & SSR Postmortem**: New `docs/social-preview-and-ssr.md` walks through the v1.3.4 → v1.3.6 social preview work end-to-end: why bare "URL + hostname" previews were showing, what was added in v1.3.5 (OG + Twitter tag set, `og:image`, locale-aware canonical), what was fixed in v1.3.6 (SSR gate in `ThemeProviderCustom` silently hiding every tag from crawlers), and `curl -A "facebookexternalhit/1.1" …` snippets for future debugging

### Changed

- **OG Image Format Swapped to JPG**: Replaced `public/og-image.png` (~1.3 MB) with `public/og-image.jpg` (~547 KB) and pointed `OG_IMAGE_PATH` in `PageHead` at `/og-image.jpg`, cutting social preview bandwidth by ~60% at the same 1200×630 dimensions; several unfurlers (notably WhatsApp) cap preview images around ~1 MB and were skipping the PNG, so the JPG also improves preview reliability, not just performance
- **`.env.example` Comment Trimmed**: Removed the "(apex, no www)" qualifier from the production-domain comment now that the apex flip in `1.3.7` has settled and the comment is back to being generic

## [1.3.7]

### Changed

- **Canonical Host Flipped to Apex**: `SITE_URL` in `src/constants/site.ts` is now `https://renekrajnc.com` (apex, no `www.`), matching the new Vercel primary domain; every absolute URL the site emits in `<head>` (canonical, `og:url`, `og:image`, `twitter:image`, and the `hreflang` alternates) now advertises the apex host so social crawlers no longer hit the `www → apex` redirect that Facebook's debugger was reporting as a 403
- **Sitemap, robots.txt, security.txt Aligned**: Rewrote all 41 `<loc>` / `hreflang` URLs in `public/sitemap.xml`, the `Sitemap:` URL in `public/robots.txt`, and the `Canonical:` URL in `public/.well-known/security.txt` to use the apex host, so crawlers receive a coherent set of URLs from every entry point
- **Docs and Example Env Updated**: `README.md` live-demo / author links and the `.env.example` `NEXT_PUBLIC_SITE_URL` / `EMAIL_ASSET_BASE_URL` examples now show the apex URL, with the accompanying comment updated from "with www if applicable" to "apex, no www"

## [1.3.6]

### Changed

- **Theme Store via `useSyncExternalStore`**: `ThemeProviderCustom` now reads/writes theme through React 18's `useSyncExternalStore` hook backed by `localStorage`, eliminating the `setState`-inside-`useEffect` pattern and enabling cross-tab sync via the `storage` event; theme plumbing (`THEME_STORAGE_KEY`, `isTheme` type-guard, `themeInitScript`) now lives in `src/utils/themeUtils.ts` and is interpolated from the `Themes` literal union so the inline script cannot drift from the React store

### Fixed

- **Empty `<head>` for Social Crawlers**: `ThemeProviderCustom` was short-circuiting SSR with `if (!mounted) return <GlobalLoader />`, which meant `PageLayout` → `PageHead` never ran on the server and Facebook/LinkedIn/iMessage/Slack received HTML with no `<title>`, no `og:*`, and no `twitter:*` tags; removed the mount gate so the full metadata is now emitted in the initial server response
- **Theme Flash Prevention Without Blocking SSR**: Added a tiny inline pre-hydration script in `src/pages/_document.tsx` that reads `localStorage.theme` and sets `data-theme` on `<html>` before first paint, replacing the full-page loader gate with the industry-standard (next-themes) pattern — no flash for returning visitors, full SSR for crawlers
- **Cross-Tab Theme Sync Applies to DOM**: The `storage` event handler now calls `document.documentElement.setAttribute('data-theme', ...)` in addition to notifying the React store, so a theme toggle in one tab updates CSS in every other open tab (previously only the React state updated, leaving CSS stuck on the old theme)
- **Defensive `localStorage` Access**: `getClientSnapshot` and `writeTheme` now wrap `localStorage` reads and writes in `try/catch` with sensible fallbacks, so sandboxed iframes, privacy-mode storage blocks, and quota-exceeded errors no longer crash the provider or abort a theme toggle

## [1.3.5]

### Added

- **Social Link Preview Metadata**: Expanded `PageHead` with the full Open Graph and Twitter Card tag set so shared links on Facebook, LinkedIn, iMessage, Discord, and Slack render a rich preview: `og:type`, `og:site_name`, `og:url`, `og:image` (+ `secure_url`, `type`, `width`, `height`, `alt`), `og:locale:alternate` entries for the non-active supported locales, and `twitter:card=summary_large_image` with matching `twitter:title`, `twitter:description`, `twitter:image`, and `twitter:image:alt`
- **Social Preview Asset**: Added `public/og-image.png` (1200×630) referenced by all `og:image` / `twitter:image` tags

### Changed

- **Locale-Aware Canonical**: `canonical`, `og:url`, and the `hreflang` alternates now all derive from the same `buildLocalisedUrl` helper (default locale unprefixed, other locales prefixed with `/<locale>`), replacing the previous locale-agnostic canonical that contradicted the `hreflang` block
- **Shared Site Name**: `og:site_name` now reuses the existing `reneKrajnc` constant from `src/constants/rene.ts` instead of a duplicated local string
- **Consistent Asset Base URL**: OG image URL is derived from `baseUrl` (same source as `canonical` / `og:url` / `hreflang`) so production, preview, and local deployments all emit a coherent set of absolute URLs in `<head>`

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
