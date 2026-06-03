import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCALE } from '@/constants/locales';

// Next.js i18n routing serves the default locale (/en) at root (/) — any request
// that reaches /en or /en/* is a duplicate that must be permanently redirected to
// the unprefixed canonical path. This must live in middleware rather than
// next.config.ts redirects() because i18n locale detection runs before that layer,
// so the /en prefix is already matched and served before redirects() can act.
//
// config.matcher only accepts static strings, so it cannot reference DEFAULT_LOCALE
// at build time. Keep the matcher below in sync with src/constants/locales.ts
// if the default locale ever changes.
const defaultLocalePrefix = `/${DEFAULT_LOCALE}`;

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;

  if (pathname === defaultLocalePrefix || pathname.startsWith(`${defaultLocalePrefix}/`)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname.slice(defaultLocalePrefix.length) || '/';
    return NextResponse.redirect(redirectUrl, { status: 308 });
  }

  return NextResponse.next();
};

export const config = {
  // Keep in sync with DEFAULT_LOCALE in src/constants/locales.ts
  matcher: ['/en', '/en/:path*'],
};
