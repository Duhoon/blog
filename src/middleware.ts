import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-US", "ko"];

function getLocale(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language")!,
  };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en-US";

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  if (locale !== "en-US") {
    request.nextUrl.pathname = `/${locale}${pathname}`;
  } else {
    request.nextUrl.pathname = pathname;
  }

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/list/(.*)", "/post/(.*)"],
};
