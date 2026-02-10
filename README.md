# 🚀 Rene Krajnc - Portfolio

> A modern, performant, and accessible portfolio website built with Next.js, featuring multilingual support, dark mode, and comprehensive SEO optimization.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Live Demo:** [www.renekrajnc.com](https://www.renekrajnc.com)

---

## ✨ Features

### 🌍 **Internationalization**

- Full multilingual support (English, Slovenian, German)
- Dynamic language switching with next-i18next
- Proper hreflang tags and locale-specific meta tags for SEO

### 🎨 **Theme System**

- Custom dark/light theme with smooth transitions
- Persistent theme preference (localStorage)
- Material-UI integration with dynamic theme switching
- No flash on page load (SSR-friendly)

### 🔒 **Security & SEO**

- Comprehensive security headers (CSP, HSTS, Permissions-Policy)
- RFC 9116 compliant security.txt
- Robots.txt and XML sitemap with multilingual support
- Canonical URLs and Open Graph metadata
- Perfect score on securityheaders.com

### 🎯 **Performance**

- Optimized bundle size with tree shaking
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Responsive design with mobile-first approach

### 🛠️ **Developer Experience**

- TypeScript for type safety
- ESLint with flat config for code quality
- SCSS modules with centralized responsive design mixins
- Automated sorting of imports
- Hot reload in development

---

## 🏗️ Tech Stack

### **Core**

- **Framework:** [Next.js 16.1.6](https://nextjs.org/) (Pages Router)
- **React:** 19.2.4
- **TypeScript:** 5.7.2
- **Styling:** SCSS Modules + [Material-UI 7.2.0](https://mui.com/)

### **Internationalization**

- [next-i18next 15.4.2](https://github.com/i18next/next-i18next)
- i18next for translation management

### **Forms & Validation**

- [React Hook Form 7.54.2](https://react-hook-form.com/)
- Client-side validation

### **Code Quality**

- ESLint 9.39.2 (Flat Config)
- Prettier 3.4.2
- TypeScript Strict Mode

### **Deployment**

- [Vercel](https://vercel.com/) (Continuous Deployment)
- Automatic deployments on main branch

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.9.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run tsc          # TypeScript type checking
```

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   ├── .well-known/
│   │   └── security.txt      # Security contact info
│   ├── locales/              # Translation files
│   │   ├── en/
│   │   ├── sl/
│   │   └── de/
│   ├── robots.txt            # Crawler instructions
│   └── sitemap.xml           # SEO sitemap
├── src/
│   ├── components/
│   │   ├── forms/            # Form components
│   │   ├── layouts/          # Page layouts
│   │   └── UI/               # Reusable UI components
│   ├── constants/            # App constants
│   ├── context/              # React contexts (Theme)
│   ├── pages/                # Next.js pages
│   ├── styles/               # Global styles & mixins
│   └── utils/                # Helper functions
├── .env.example              # Environment template
├── next.config.ts            # Next.js configuration
└── tsconfig.json             # TypeScript config
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site URL (used for canonical URLs and sitemaps)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production deployment on Vercel:

1. Go to **Project Settings** → **Environment Variables**
2. Add `NEXT_PUBLIC_SITE_URL` with your production domain
3. Redeploy the application

---

## 🎨 Styling Architecture

### Responsive Design

Built with a mobile-first approach using centralized breakpoint mixins:

```scss
@use 'styles';

.component {
  // Mobile styles (default)
  padding: 1rem;

  // Tablet and up
  @include mq(sm) {
    padding: 2rem;
  }
}
```

### Theme System

- CSS custom properties for dynamic theming
- Material-UI theme integration
- Smooth transitions between themes
- Persistent user preference

---

## 🌐 Internationalization

### Adding a New Language

1. Create translation file:

   ```bash
   cp public/locales/en/common.json public/locales/fr/common.json
   ```

2. Update `next-i18next.config.js`:

   ```js
   locales: ['en', 'sl', 'de', 'fr'];
   ```

3. Add locale to sitemap and hreflang tags in `PageHead.tsx`

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables
4. Deploy automatically on push to main

### Manual Deployment

```bash
npm run build
npm run start
```

The app will be available on port 3000.

---

## 🔒 Security Features

- **Content-Security-Policy:** Prevents XSS attacks
- **Strict-Transport-Security:** Forces HTTPS
- **Permissions-Policy:** Disables unused browser features
- **X-Frame-Options:** Prevents clickjacking
- **Security.txt:** Responsible disclosure contact

Test your deployment: [securityheaders.com](https://securityheaders.com)

---

## 📊 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Bundle Size:** Optimized with code splitting
- **Image Optimization:** WebP/AVIF with responsive sizes
- **TTI:** < 3s on 3G networks

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Rene Krajnc**

- Website: [www.renekrajnc.com](https://www.renekrajnc.com)
- GitHub: [@renegatorator](https://github.com/renegatorator)
- LinkedIn: [Rene Krajnc](https://linkedin.com/in/rene-krajnc)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Material-UI](https://mui.com/) - React component library
- [Vercel](https://vercel.com/) - Hosting platform
- [next-i18next](https://github.com/i18next/next-i18next) - Internationalization

---

<p align="center">Made with ❤️ by Rene Krajnc</p>
