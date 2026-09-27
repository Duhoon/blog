"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import {
  portfolioSections,
  type PortfolioSection,
  type Project,
} from "@/lib/portfolio/types";

function writeLocation(section: PortfolioSection, project: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  if (project) url.searchParams.set("project", project);
  else url.searchParams.delete("project");
  window.history.replaceState(window.history.state, "", url);
}

export default function usePortfolioNavigation(
  projects: Project[],
  paused = false,
) {
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const [desktop, setDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [swiper, setSwiper] = useState<SwiperInstance>();
  const [section, setSection] = useState<PortfolioSection>("intro");
  const [projectId, setProjectId] = useState(
    projects.find((project) => project.featured)?.id ?? projects[0]?.id ?? "",
  );
  const root = useRef<HTMLElement>(null);
  const current = useRef({ section, projectId });
  current.current = { section, projectId };
  const restoring = useRef(false);
  const mobileNavigationUntil = useRef(0);
  const shouldFocus = useRef(false);
  const activeIndex = portfolioSections.indexOf(section);

  const selectSection = useCallback((next: PortfolioSection) => {
    current.current.section = next;
    setSection(next);
    writeLocation(next, current.current.projectId);
  }, []);

  const focusSection = useCallback((next: PortfolioSection) => {
    root.current
      ?.querySelector<HTMLElement>(`#portfolio-${next}`)
      ?.focus({ preventScroll: true });
  }, []);

  const goTo = useCallback(
    (next: PortfolioSection, focus = false) => {
      if (pausedRef.current) return;
      if (desktop && swiper) {
        if (swiper.animating) return;
        shouldFocus.current = focus;
        swiper.slideTo(
          portfolioSections.indexOf(next),
          reducedMotion ? 0 : 600,
        );
        selectSection(next);
        if (reducedMotion || !swiper.animating) {
          if (focus) focusSection(next);
          shouldFocus.current = false;
        }
      } else {
        mobileNavigationUntil.current = Date.now() + 900;
        selectSection(next);
        root.current?.querySelector(`#portfolio-${next}`)?.scrollIntoView({
          behavior: reducedMotion ? "instant" : "smooth",
          block: "start",
        });
        if (focus) focusSection(next);
      }
    },
    [desktop, swiper, reducedMotion, selectSection, focusSection],
  );

  const selectProject = (id: string, navigate = false) => {
    current.current.projectId = id;
    setProjectId(id);
    writeLocation(current.current.section, id);
    if (navigate) goTo("work", true);
  };

  useEffect(() => {
    if (!swiper) return;
    const media = window.matchMedia("(min-width: 1024px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const applyMode = () => {
      restoring.current = true;
      const target = current.current.section;
      setDesktop(media.matches);
      setReducedMotion(motion.matches);
      mobileNavigationUntil.current = Date.now() + 500;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (swiper.destroyed) return;
        swiper.update();
        if (media.matches) {
          swiper.enable();
          swiper.slideTo(portfolioSections.indexOf(target), 0);
          window.scrollTo(0, 0);
        } else {
          swiper.disable();
          swiper.setTranslate(0);
          if (target !== "intro")
            root.current
              ?.querySelector(`#portfolio-${target}`)
              ?.scrollIntoView({ behavior: "instant" });
        }
        restoring.current = false;
      });
    };
    const restoreLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedSection = params.get("section");
      const next =
        portfolioSections.find((item) => item === requestedSection) ?? "intro";
      const requestedProject = params.get("project");
      const id =
        projects.find((item) => item.id === requestedProject)?.id ??
        (requestedProject
          ? projects[0]?.id
          : (projects.find((item) => item.featured)?.id ?? projects[0]?.id)) ??
        "";
      current.current = { section: next, projectId: id };
      setSection(next);
      setProjectId(id);
      writeLocation(next, id);
      applyMode();
    };
    restoreLocation();
    media.addEventListener("change", applyMode);
    motion.addEventListener("change", applyMode);
    window.addEventListener("popstate", restoreLocation);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", applyMode);
      motion.removeEventListener("change", applyMode);
      window.removeEventListener("popstate", restoreLocation);
    };
  }, [swiper, projects]);

  useEffect(() => {
    if (desktop || !swiper) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (
          pausedRef.current ||
          restoring.current ||
          Date.now() < mobileNavigationUntil.current
        )
          return;
        const threshold = window.innerHeight * 0.35;
        let next: PortfolioSection = "intro";
        for (const id of portfolioSections) {
          const element = root.current?.querySelector(`#portfolio-${id}`);
          if (element && element.getBoundingClientRect().top <= threshold)
            next = id;
        }
        if (next !== current.current.section) selectSection(next);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [desktop, swiper, selectSection]);

  useEffect(() => {
    const element = swiper?.el;
    if (!desktop || !swiper || !element) return;
    let lastEvent = 0;
    let consumed = false;
    let distance = 0;
    const onWheel = (event: WheelEvent) => {
      if (pausedRef.current || event.ctrlKey || event.defaultPrevented) return;
      const now = performance.now();
      if (now - lastEvent > 180) {
        consumed = false;
        distance = 0;
      }
      lastEvent = now;
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta =
        (horizontal ? event.deltaX : event.deltaY) *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientHeight
            : 1);
      if (!delta) return;
      let node = event.target instanceof Element ? event.target : null;
      while (node && node !== element) {
        if (
          node instanceof HTMLElement &&
          !node.classList.contains("swiper") &&
          !node.classList.contains("swiper-wrapper")
        ) {
          const style = getComputedStyle(node);
          const overflow = horizontal ? style.overflowX : style.overflowY;
          const extent = horizontal
            ? node.scrollWidth - node.clientWidth
            : node.scrollHeight - node.clientHeight;
          const position = horizontal ? node.scrollLeft : node.scrollTop;
          if (
            /(auto|scroll)/.test(overflow) &&
            extent > 1 &&
            (delta > 0 ? position < extent - 1 : position > 1)
          ) {
            consumed = true;
            return;
          }
        }
        node = node.parentElement;
      }
      event.preventDefault();
      if (consumed || swiper.animating) {
        consumed = true;
        return;
      }
      if (Math.sign(distance) !== Math.sign(delta)) distance = 0;
      distance += delta;
      if (Math.abs(distance) < 40) return;
      consumed = true;
      const index = portfolioSections.indexOf(current.current.section);
      const next = Math.max(0, Math.min(3, index + Math.sign(distance)));
      if (next !== index) goTo(portfolioSections[next]);
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [desktop, swiper, goTo]);

  const handleSlideChange = (instance: SwiperInstance) => {
    if (!restoring.current && desktop) {
      const next = portfolioSections[instance.activeIndex];
      const previous = root.current?.querySelector(
        `#portfolio-${current.current.section}`,
      );
      if (previous?.contains(document.activeElement))
        shouldFocus.current = true;
      selectSection(next);
    }
  };
  const handleTransitionEnd = () => {
    if (shouldFocus.current) focusSection(current.current.section);
    shouldFocus.current = false;
  };
  return {
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
  };
}
