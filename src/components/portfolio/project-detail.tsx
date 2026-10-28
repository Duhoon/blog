"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio/types";
import { locales } from "@/i18n/routing";
import Markdown from "./markdown";
import ProjectGallery from "./project-gallery";
import ProjectCover from "./project-cover";
import "swiper/css";

type Props = {
  locale: string;
  project: Project;
  previous?: Project;
  next?: Project;
  translations: string[];
};

export default function ProjectDetail({
  locale,
  project,
  previous,
  next,
  translations,
}: Props) {
  const t = useTranslations("Portfolio");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const detailHref = (id: string, language = locale) =>
    `/${language}/portfolio/projects/${encodeURIComponent(id)}`;
  const backHref = `/${locale}/portfolio?${new URLSearchParams({ section: "work", project: project.id })}`;
  return (
    <div className="min-h-dvh bg-[#fdfdfb] px-6 text-[#1c2220] antialiased font-[Arial,'Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif] max-[601px]:px-3 [&_a]:transition-colors [&_a]:duration-200 [&_a]:[-webkit-tap-highlight-color:transparent] [&_a:hover]:text-[var(--pf-accent,#47765a)] [&_:is(a,button,[tabindex]):focus-visible]:outline-2 [&_:is(a,button,[tabindex]):focus-visible]:outline-offset-5 [&_:is(a,button,[tabindex]):focus-visible]:outline-[var(--pf-accent,#47765a)] motion-reduce:[&_*]:transition-none motion-reduce:[&_*]:scroll-auto">
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-[200%] bg-white p-3 focus:translate-y-0"
        href="#project-content"
      >
        {t("skip")}
      </a>
      <header className="mx-auto flex min-h-[86px] max-w-[1120px] flex-wrap items-center gap-6 py-5 max-[601px]:gap-3.5">
        <Link
          className="text-[28px] font-bold tracking-[-1.6px] whitespace-nowrap max-[601px]:text-2xl"
          href={`/${locale}/portfolio`}
        >
          412ock<span className="text-[#75937d]">.</span>
        </Link>
        <Link
          className="ml-auto flex items-center gap-2 text-[13px] max-[601px]:text-xs"
          href={backHref}
        >
          <ArrowLeft size={16} />
          {t("detail.back")}
        </Link>
        <nav
          className="flex gap-3 border-l border-[#d8dcd8] pl-7 text-[10px] tracking-[0.08em] text-[#90948f] max-[601px]:pl-3 [&_[aria-current]]:font-bold [&_[aria-current]]:text-[#1c2220] [&_[aria-disabled=true]]:opacity-40"
          aria-label={t("detail.language")}
        >
          {locales.map((language) =>
            translations.includes(language) ? (
              <Link
                key={language}
                href={detailHref(project.id, language)}
                hrefLang={language}
                lang={language}
                aria-current={language === locale ? "page" : undefined}
              >
                {language === "ko" ? "KO" : "EN"}
              </Link>
            ) : (
              <span
                key={language}
                aria-disabled="true"
                title={t("detail.unavailable")}
              >
                {language === "ko" ? "KO" : "EN"}
              </span>
            ),
          )}
        </nav>
      </header>
      <main
        id="project-content"
        className="mx-auto max-w-[1120px] rounded-2xl bg-[#151817] p-[clamp(24px,5vw,64px)] text-[#f3f5f2] [overflow-wrap:anywhere] [--pf-ink:#f3f5f2] [--pf-muted:#b4bdb6] [--pf-line:#39443d] [--pf-sage:#222824] [--pf-accent:#a6d6b2] max-[601px]:rounded-xl max-[601px]:px-5 max-[601px]:py-7"
        tabIndex={-1}
      >
        <article>
          <header className="mx-auto mb-10 max-w-[760px]">
            <p className="mb-5 font-['SFMono-Regular',Consolas,'Liberation_Mono',monospace] text-[11px] tracking-[0.16em] text-[#b4bdb6]">
              PORTFOLIO / PROJECT{project.example && ` · ${t("example")}`}
            </p>
            <h1 className="text-[clamp(30px,4.5vw,58px)] leading-[1.15] font-[650] tracking-[-0.04em]">
              {project.title}
            </h1>
            <p className="mt-6 leading-[1.7] text-[#b4bdb6]">
              {project.summary}
            </p>
          </header>
          {project.cover && (
            <ProjectCover
              className="max-h-[620px] overflow-hidden rounded-lg"
              sizes="(min-width: 1120px) 992px, 100vw"
              project={project}
              openGallery={(_, button) => {
                trigger.current = button;
                setGalleryOpen(true);
              }}
            />
          )}
          <div className="mx-auto mt-12 max-w-[760px] max-[601px]:mt-8">
            <h2 className="text-[22px] font-semibold">
              {t("detail.overview")}
            </h2>
            <dl className="mt-[26px] [&>div]:grid [&>div]:grid-cols-[54px_minmax(0,1fr)] [&>div]:gap-5 [&>div]:border-t [&>div]:border-[#39443d] [&>div]:py-3.5 [&>div]:text-xs [&>div]:leading-[1.6] [&>div:last-child]:border-b [&_dt]:font-bold [&_dd]:text-[#b4bdb6] [&_dd]:[overflow-wrap:anywhere]">
              {(["role", "problem", "outcome"] as const).map(
                (field) =>
                  project[field] && (
                    <div key={field}>
                      <dt>{t(field)}</dt>
                      <dd>{project[field]}</dd>
                    </div>
                  ),
              )}
            </dl>
            {project.stack.length > 0 && (
              <ul
                className="flex flex-wrap gap-x-[18px] gap-y-1.5 py-5 text-[10px] text-[#b4bdb6] [&_li+li]:list-['·__']"
                aria-label={t("detail.stack")}
              >
                {project.stack.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            )}
            <div className="mt-2.5 flex gap-6">
              {Object.entries(project.links).map(
                ([name, href]) =>
                  href && (
                    <a
                      className="inline-flex items-center justify-between gap-5 border-b border-[#f3f5f2] pb-2 text-[13px] font-semibold"
                      key={name}
                      href={href}
                    >
                      {name === "github" ? "GitHub" : "Demo"}
                      <ArrowUpRight size={15} />
                    </a>
                  ),
              )}
            </div>
          </div>
          {project.html.trim() && (
            <div className="mx-auto mt-12 max-w-[760px] border-t border-[#39443d] pt-10 max-[601px]:mt-8">
              <Markdown html={project.html} variant="detail" />
            </div>
          )}
        </article>
        <nav
          className="mt-14 mb-8 grid grid-cols-2 gap-6 border-t border-[#39443d] pt-6 [&_a]:flex [&_a]:flex-col [&_a]:gap-3 [&_a:last-child]:items-end [&_a:last-child]:text-right [&_span]:flex [&_span]:items-center [&_span]:gap-2 [&_span]:text-xs [&_span]:text-[#b4bdb6] [&_strong]:text-[15px] [&_strong]:font-medium"
          aria-label={t("detail.navigation")}
        >
          {previous ? (
            <Link href={detailHref(previous.id)}>
              <span>
                <ArrowLeft size={16} />
                {t("detail.previous")}
              </span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={detailHref(next.id)}>
              <span>
                {t("detail.next")}
                <ArrowRight size={16} />
              </span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <div />
          )}
        </nav>
        <Link
          className="inline-flex items-center justify-between gap-5 border-b border-[#f3f5f2] pb-2 text-[13px] font-semibold"
          href={backHref}
        >
          <ArrowLeft size={16} />
          {t("detail.back")}
        </Link>
      </main>
      <footer className="mx-auto max-w-[1120px] py-6 font-['SFMono-Regular',Consolas,'Liberation_Mono',monospace] text-[11px] tracking-[0.07em] text-[#747b77]">
        412ock / PORTFOLIO
      </footer>
      <ProjectGallery
        project={galleryOpen ? project : null}
        onClose={() => setGalleryOpen(false)}
        restoreFocus={() => trigger.current?.focus({ preventScroll: true })}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
