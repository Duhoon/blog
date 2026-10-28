"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import type { Project } from "@/lib/portfolio/types";
import "swiper/css";

function GalleryImage({ image }: { image: Project["images"][number] }) {
  const t = useTranslations("Portfolio.gallery");
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p role="status">{t("failed")}</p>
  ) : (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      unoptimized
      className="object-contain"
      sizes="90vw"
      onError={() => setFailed(true)}
    />
  );
}

function GalleryContent({
  project,
  reducedMotion,
}: {
  project: Project;
  reducedMotion: boolean;
}) {
  const t = useTranslations("Portfolio.gallery");
  const [swiper, setSwiper] = useState<SwiperInstance>();
  const [index, setIndex] = useState(0);
  const images = project.images;
  return (
    <div
      className="grid h-full min-w-0 grid-rows-[auto_minmax(0,1fr)_auto]"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();
          if (event.key === "ArrowLeft") swiper?.slidePrev();
          else swiper?.slideNext();
        }
      }}
    >
      <div className="flex items-center gap-4 border-b border-[#d8dcd8] px-5 py-4 max-md:gap-2 max-md:px-3 max-md:pt-[max(8px,env(safe-area-inset-top))] max-md:pb-2">
        <Dialog.Title className="min-w-0 flex-1 text-base font-semibold [overflow-wrap:anywhere]">
          {project.title}
        </Dialog.Title>
        <span
          className="text-[13px] whitespace-nowrap text-[#747b77]"
          aria-live="polite"
          aria-atomic="true"
        >
          {images.length ? `${index + 1} / ${images.length}` : "0 / 0"}
        </span>
        <Dialog.Close
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eef2ed]"
          aria-label={t("close")}
        >
          <X size={22} />
        </Dialog.Close>
      </div>
      <Dialog.Description className="sr-only">
        {t("description")}
      </Dialog.Description>
      {images.length ? (
        <>
          <div className="relative min-h-0 min-w-0 px-16 py-4 max-md:px-0 max-md:pt-3 max-md:pb-14">
            <Swiper
              className="h-full w-full"
              onSwiper={setSwiper}
              onSlideChange={(instance) => setIndex(instance.activeIndex)}
              slidesPerView={1}
              loop={false}
              speed={reducedMotion ? 0 : 250}
            >
              {images.map((image, i) => (
                <SwiperSlide
                  className="relative flex! items-center justify-center"
                  key={image.src}
                  aria-hidden={i !== index}
                >
                  <GalleryImage image={image} />
                </SwiperSlide>
              ))}
            </Swiper>
            {images.length > 1 && (
              <div className="pointer-events-none absolute inset-y-0 inset-x-2.5 flex items-center justify-between max-md:top-auto max-md:bottom-1.5 max-md:justify-center max-md:gap-6">
                <button
                  type="button"
                  className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full bg-[#eef2ed]"
                  aria-label={t("previous")}
                  disabled={index === 0}
                  onClick={() => swiper?.slidePrev()}
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  type="button"
                  className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full bg-[#eef2ed]"
                  aria-label={t("next")}
                  disabled={index === images.length - 1}
                  onClick={() => swiper?.slideNext()}
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>
          <div
            className="flex gap-2.5 overflow-x-auto overscroll-contain border-t border-[#d8dcd8] px-5 py-3 max-md:pb-[max(12px,env(safe-area-inset-bottom))]"
            aria-label={t("thumbnails")}
          >
            {images.map((image, i) => (
              <button
                type="button"
                className="relative h-[60px] basis-20 shrink-0 grow-0 overflow-hidden rounded border-2 border-transparent opacity-60 aria-pressed:border-[#47765a] aria-pressed:opacity-100"
                key={image.src}
                aria-label={t("show", { number: i + 1 })}
                aria-pressed={i === index}
                onClick={() => swiper?.slideTo(i)}
              >
                <Image
                  className="object-contain"
                  src={image.src}
                  alt=""
                  fill
                  unoptimized
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="self-center p-6 text-center text-[#747b77]">
          {t("empty")}
        </p>
      )}
    </div>
  );
}

export default function ProjectGallery({
  project,
  onClose,
  restoreFocus,
  reducedMotion,
}: {
  project: Project | null;
  onClose: () => void;
  restoreFocus: () => void;
  reducedMotion: boolean;
}) {
  return (
    <Dialog.Root
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-[#101613b3]" />
        <Dialog.Content
          className="fixed inset-0 z-[111] m-auto h-[min(900px,calc(100dvh-64px))] w-[min(1200px,calc(100vw-64px))] overflow-hidden rounded-xl bg-[#fdfdfb] text-[#1c2220] shadow-[0_24px_80px_#0004] font-[Arial,'Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif] max-md:h-dvh max-md:w-full max-md:rounded-none [&_button]:cursor-pointer [&_button:disabled]:cursor-default [&_button:disabled]:opacity-30 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[#47765a]"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          {project && (
            <GalleryContent
              key={project.id}
              project={project}
              reducedMotion={reducedMotion}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
