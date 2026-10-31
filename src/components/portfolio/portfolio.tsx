"use client";

import { portfolioClasses } from "./portfolio-styles";
import { useRef, useState } from "react";
import ProjectGallery from "./project-gallery";
import type { Project } from "@/lib/portfolio/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  portfolioSections,
  type PortfolioContent,
} from "@/lib/portfolio/types";
import usePortfolioNavigation from "./use-portfolio-navigation";
import IntroSection from "./intro-section";
import WorkSection from "./work-section";
import ArchiveSection from "./archive-section";
import ExperienceSection from "./experience-section";

const INTERACTIVE =
  "a,button,input,textarea,select,[contenteditable='true'],[role='tab']";
const number = (index: number) => String(index + 1).padStart(2, "0");

export default function Portfolio({
  locale,
  content,
}: {
  locale: string;
  content: PortfolioContent;
}) {
  const t = useTranslations("Portfolio");
  const { profile, projects, experiences } = content;
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const galleryTrigger = useRef<HTMLButtonElement | null>(null);
  const openGallery = (project: Project, trigger: HTMLButtonElement) => {
    galleryTrigger.current = trigger;
    setGalleryProject(project);
  };
  const {
    root,
    desktop,
    reducedMotion,
    setSwiper,
    section,
    projectId,
    activeIndex,
    goTo,
    focusSection,
    selectProject,
    handleSlideChange,
    handleTransitionEnd,
  } = usePortfolioNavigation(projects, Boolean(galleryProject));

  const languageHref = (language: string) =>
    `/${language}/portfolio?${new URLSearchParams({ section, ...(projectId ? { project: projectId } : {}) })}`;

  const header = () => (
    <header className={portfolioClasses("pf-header")}>
      <Link className={portfolioClasses("pf-wordmark")} href={`/${locale}`}>
        412ock<span className={portfolioClasses("pf-wordmark-dot")}>.</span>
      </Link>
      <nav aria-label={t("navigation")}>
        {portfolioSections.map((id) => (
          <button
            type="button"
            key={id}
            aria-current={section === id ? "page" : undefined}
            onClick={() => goTo(id)}
          >
            {t(`sections.${id}`)}
          </button>
        ))}
        <Link
          className={portfolioClasses("pf-blog-link")}
          href={`/${locale}/list`}
        >
          {t("blog")}
          <ArrowUpRight size={13} />
        </Link>
      </nav>
      <div className={portfolioClasses("pf-languages")}>
        <Link
          href={languageHref("ko")}
          hrefLang="ko"
          lang="ko"
          aria-current={locale === "ko" ? "true" : undefined}
        >
          KO
        </Link>
        <span>/</span>
        <Link
          href={languageHref("en-US")}
          hrefLang="en-US"
          lang="en"
          aria-current={locale === "en-US" ? "true" : undefined}
        >
          EN
        </Link>
      </div>
    </header>
  );

  const footer = (index: number) => (
    <footer className={portfolioClasses("pf-footer")}>
      <span className={portfolioClasses("pf-mono")}>412ock / PORTFOLIO</span>
      <div className={portfolioClasses("pf-dots")}>
        {portfolioSections.map((id, i) => (
          <button
            type="button"
            key={id}
            aria-label={t(`sections.${id}`)}
            aria-current={index === i ? "step" : undefined}
            onClick={() => goTo(id)}
          >
            <span />
          </button>
        ))}
      </div>
      <div className={portfolioClasses("pf-step")}>
        <span className={portfolioClasses("pf-mono")}>
          {number(index)} <i>/ 04</i>
        </span>
        <button
          type="button"
          disabled={index === 0}
          aria-label={t("previous")}
          onClick={() => goTo(portfolioSections[index - 1])}
        >
          <ArrowLeft size={17} />
        </button>
        <button
          type="button"
          disabled={index === 3}
          aria-label={t("next")}
          onClick={() => goTo(portfolioSections[index + 1])}
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </footer>
  );

  return (
    <main
      ref={root}
      className={portfolioClasses("portfolio")}
      onKeyDown={(event) => {
        if (
          galleryProject ||
          !desktop ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          (event.target instanceof Element && event.target.closest(INTERACTIVE))
        )
          return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        goTo(
          portfolioSections[
            Math.max(
              0,
              Math.min(3, activeIndex + (event.key === "ArrowRight" ? 1 : -1)),
            )
          ],
          true,
        );
      }}
    >
      <a
        className={portfolioClasses("pf-skip")}
        href={`#portfolio-${section}`}
        onClick={(event) => {
          event.preventDefault();
          focusSection(section);
        }}
      >
        {t("skip")}
      </a>
      {header()}
      <div
        className={portfolioClasses("pf-announcement")}
        aria-live="polite"
        aria-atomic="true"
      >
        {t(`sections.${section}`)} · {number(activeIndex)} / 04
      </div>
      <Swiper
        className={portfolioClasses("pf-swiper")}
        enabled={desktop}
        allowTouchMove={!galleryProject}
        slidesPerView={1}
        spaceBetween={0}
        speed={reducedMotion ? 0 : 600}
        loop={false}
        resistanceRatio={0}
        preventInteractionOnTransition
        touchStartPreventDefault={false}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionEnd={handleTransitionEnd}
      >
        {portfolioSections.map((id) => (
          <SwiperSlide
            key={id}
            inert={desktop && section !== id ? true : undefined}
            aria-hidden={desktop && section !== id ? true : undefined}
          >
            <section
              className={portfolioClasses(`pf-page pf-page-${id}`)}
              id={`portfolio-${id}`}
              tabIndex={-1}
              aria-labelledby={`pf-heading-${id}`}
            >
              <div className={portfolioClasses("pf-scroll")}>
                {id === "intro" && (
                  <IntroSection profile={profile} goTo={goTo} />
                )}
                {id === "work" && (
                  <WorkSection
                    projects={projects}
                    projectId={projectId}
                    selectProject={selectProject}
                    openGallery={openGallery}
                  />
                )}
                {id === "archive" && (
                  <ArchiveSection
                    projects={projects}
                    openGallery={openGallery}
                  />
                )}
                {id === "experience" && (
                  <ExperienceSection
                    profile={profile}
                    experiences={experiences}
                  />
                )}
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
      <ProjectGallery
        project={galleryProject}
        onClose={() => setGalleryProject(null)}
        restoreFocus={() =>
          galleryTrigger.current?.focus({ preventScroll: true })
        }
        reducedMotion={reducedMotion}
      />
      <div className={portfolioClasses("pf-bottom-bar")}>
        {footer(activeIndex)}
        {(projects.some((item) => item.example) ||
          experiences.some((item) => item.example)) && (
          <p className={portfolioClasses("pf-example-notice")}>
            {t("exampleNotice")}
          </p>
        )}
      </div>
    </main>
  );
}
