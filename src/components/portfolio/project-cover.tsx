import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

export default function ProjectCover({
  project,
  className,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  openGallery,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  openGallery: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  const t = useTranslations("Portfolio.gallery");
  if (!project.cover) return null;
  return (
    <button
      type="button"
      className={cn(
        "relative block aspect-[4/3] w-full cursor-pointer bg-[var(--pf-sage,#222824)] focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-[var(--pf-accent,#47765a)] [-webkit-tap-highlight-color:transparent]",
        className,
      )}
      aria-label={t("open", { title: project.title })}
      aria-haspopup="dialog"
      onClick={(event) => openGallery(project, event.currentTarget)}
    >
      <Image
        src={project.cover}
        alt={project.coverAlt ?? project.title}
        fill
        sizes={sizes}
        className="object-contain"
      />
      <span className="absolute right-3 bottom-3 rounded bg-[#1c2220e6] px-[11px] py-[7px] text-xs text-white">
        {t("view")}
      </span>
    </button>
  );
}
