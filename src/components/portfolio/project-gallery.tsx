"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import type { Project } from "@/lib/portfolio/types";

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
      className="pf-gallery-body"
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
      <div className="pf-gallery-header">
        <Dialog.Title>{project.title}</Dialog.Title>
        <span aria-live="polite" aria-atomic="true">
          {images.length ? `${index + 1} / ${images.length}` : "0 / 0"}
        </span>
        <Dialog.Close aria-label={t("close")}>
          <X size={22} />
        </Dialog.Close>
      </div>
      <Dialog.Description className="pf-announcement">
        {t("description")}
      </Dialog.Description>
      {images.length ? (
        <>
          <div className="pf-gallery-stage">
            <Swiper
              className="pf-gallery-swiper"
              onSwiper={setSwiper}
              onSlideChange={(instance) => setIndex(instance.activeIndex)}
              slidesPerView={1}
              loop={false}
              speed={reducedMotion ? 0 : 250}
            >
              {images.map((image, i) => (
                <SwiperSlide key={image.src} aria-hidden={i !== index}>
                  <GalleryImage image={image} />
                </SwiperSlide>
              ))}
            </Swiper>
            {images.length > 1 && (
              <div className="pf-gallery-controls">
                <button
                  type="button"
                  aria-label={t("previous")}
                  disabled={index === 0}
                  onClick={() => swiper?.slidePrev()}
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label={t("next")}
                  disabled={index === images.length - 1}
                  onClick={() => swiper?.slideNext()}
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            )}
          </div>
          <div className="pf-gallery-thumbnails" aria-label={t("thumbnails")}>
            {images.map((image, i) => (
              <button
                type="button"
                key={image.src}
                aria-label={t("show", { number: i + 1 })}
                aria-pressed={i === index}
                onClick={() => swiper?.slideTo(i)}
              >
                <Image src={image.src} alt="" fill unoptimized sizes="80px" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="pf-gallery-empty">{t("empty")}</p>
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
        <Dialog.Overlay className="pf-gallery-overlay" />
        <Dialog.Content
          className="pf-gallery"
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
