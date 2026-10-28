import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/lib/portfolio/types";
import { ArrowUpRight } from "lucide-react";
import ProjectPreview from "./project-preview";

export default function ArchiveSection({
  projects,
  openGallery,
}: {
  projects: Project[];
  openGallery: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  const t = useTranslations("Portfolio");
  const locale = useLocale();

  return (
    <div className="pf-section-content">
      <div className="pf-section-heading">
        <div>
          <p className="pf-eyebrow">02 / ARCHIVE</p>
          <h2 id="pf-heading-archive">{t("sections.archive")}</h2>
        </div>
        <p className="pf-subtitle">{t("archiveLead")}</p>
      </div>
      {projects.length ? (
        <>
          <div className="pf-archive-grid">
            {projects
              .filter((item) => item.id !== projects[0]?.id)
              .slice(0, 2)
              .map((item) => (
                <article className="pf-project-card" key={item.id}>
                  <ProjectPreview
                    coverClassName="aspect-[1.7] lg:aspect-[2.25]"
                    openGallery={openGallery}
                    project={item}
                    variant={projects.indexOf(item)}
                  />
                  <div>
                    <h3>
                      <Link
                        href={`/${locale}/portfolio/projects/${encodeURIComponent(item.id)}`}
                      >
                        {item.title}
                      </Link>
                      {item.example && <span>{t("example")}</span>}
                    </h3>
                    <ArrowUpRight size={20} />
                  </div>
                  <p>{item.summary}</p>
                </article>
              ))}
          </div>
          <div className="pf-archive-list">
            {projects.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/portfolio/projects/${encodeURIComponent(item.id)}`}
              >
                <span className="pf-archive-title">
                  {item.title}
                  {item.example && <small>{t("example")}</small>}
                </span>
                <span className="pf-archive-summary">{item.summary}</span>
                <span className="pf-mono pf-archive-stack">
                  {item.stack.slice(0, 2).join(" / ")}
                </span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="pf-empty">{t("emptyProjects")}</p>
      )}
    </div>
  );
}
