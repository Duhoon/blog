import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { getPortfolioContent } from "@/lib/portfolio/content";
import ProjectDetail from "@/components/portfolio/project-detail";

type Props = { params: Promise<{ locale: string; projectId: string }> };
const baseUrl = "https://www.412ock.dev";
export const dynamic = "force-static";

const contentForLocale = cache(getPortfolioContent);
const getDetail = cache(async (locale: string, projectId: string) => {
  if (!locales.includes(locale)) notFound();
  const { projects } = await contentForLocale(locale);
  const index = projects.findIndex((project) => project.id === projectId);
  if (index < 0) notFound();
  const translations = (
    await Promise.all(
      locales.map(async (language) => {
        const content = await contentForLocale(language);
        return content.projects.some((project) => project.id === projectId)
          ? language
          : null;
      }),
    )
  ).filter((language): language is string => language !== null);
  return {
    project: projects[index],
    previous: projects[index - 1],
    next: projects[index + 1],
    translations,
  };
});

export async function generateStaticParams() {
  return (
    await Promise.all(
      locales.map(async (locale) => {
        const { projects } = await contentForLocale(locale);
        return projects.map(({ id }) => ({ locale, projectId: id }));
      }),
    )
  ).flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, projectId } = await params;
  const { project, translations } = await getDetail(locale, projectId);
  const url = `${baseUrl}/${locale}/portfolio/projects/${encodeURIComponent(projectId)}`;
  const title = `${project.title} — Portfolio — 412ock`;
  const images = project.cover
    ? [{ url: project.cover, alt: project.coverAlt ?? project.title }]
    : [];
  return {
    title,
    description: project.summary,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        translations.map((language) => [
          language,
          `${baseUrl}/${language}/portfolio/projects/${encodeURIComponent(projectId)}`,
        ]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: "412ock Portfolio",
      title,
      description: project.summary,
      url,
      images,
    },
    twitter: {
      card: project.cover ? "summary_large_image" : "summary",
      title,
      description: project.summary,
      images,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, projectId } = await params;
  return (
    <ProjectDetail
      key={`${locale}/${projectId}`}
      locale={locale}
      {...await getDetail(locale, projectId)}
    />
  );
}
