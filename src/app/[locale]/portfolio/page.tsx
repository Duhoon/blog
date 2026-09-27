import type { Metadata } from "next";
import { getPortfolioContent } from "@/lib/portfolio/content";
import Portfolio from "@/components/portfolio/portfolio";
import { locales } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

// Local Markdown edits are visible on refresh in development and after deployment.
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { profile } = await getPortfolioContent(locale);
  return {
    title: "Portfolio — 412ock",
    description: profile.title.replaceAll("\n", " "),
    alternates: {
      canonical: `https://www.412ock.dev/${locale}/portfolio`,
      languages: {
        ko: "https://www.412ock.dev/ko/portfolio",
        "en-US": "https://www.412ock.dev/en-US/portfolio",
      },
    },
    openGraph: { title: "Portfolio — 412ock", description: profile.title },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  return (
    <Portfolio locale={locale} content={await getPortfolioContent(locale)} />
  );
}
