import { portfolioClasses } from "./portfolio-styles";
import ProjectCover from "./project-cover";
import { useTranslations } from "next-intl";
import { LayoutDashboard, Rows3, FileText, Search, Plus } from "lucide-react";
import type { Project } from "@/lib/portfolio/types";

export default function ProjectPreview({
  project,
  variant = 0,
  coverClassName,
  openGallery,
}: {
  project: Project;
  variant?: number;
  coverClassName?: string;
  openGallery: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  const t = useTranslations("Portfolio");
  if (project.cover) {
    return (
      <ProjectCover
        project={project}
        className={coverClassName}
        openGallery={openGallery}
      />
    );
  }
  return (
    <div
      className={portfolioClasses(`pf-preview pf-preview-${variant % 3}`)}
      role="img"
      aria-label={`${t("preview")}: ${project.title}. ${t("previewCaption")}`}
    >
      <div className={portfolioClasses("pf-preview-app")} aria-hidden="true">
        <aside className={portfolioClasses("pf-preview-sidebar")}>
          <strong>{variant % 3 === 2 ? "dev / notes" : "Workspace."}</strong>
          <span>
            <LayoutDashboard size={12} /> {t("dashboard")}
          </span>
          <span>
            <Rows3 size={12} /> {t("tasks")}
          </span>
          <span>
            <FileText size={12} /> {t("notes")}
          </span>
          <div className={portfolioClasses("pf-preview-sidebar-bottom")}>
            412ock / studio
          </div>
        </aside>
        <div className={portfolioClasses("pf-preview-main")}>
          <div className={portfolioClasses("pf-preview-toolbar")}>
            <span>{variant % 3 === 2 ? "index.tsx" : t("dashboard")}</span>
            <Search size={12} />
          </div>
          {variant % 3 === 2 ? (
            <div className={portfolioClasses("pf-code-preview")}>
              <p>
                <i>01</i>
                <span>export</span> function Project() &#123;
              </p>
              <p>
                <i>02</i> <span>const</span> idea = explore();
              </p>
              <p>
                <i>03</i> <span>const</span> work = build(idea);
              </p>
              <p>
                <i>04</i>
              </p>
              <p>
                <i>05</i> <span>return</span> (
              </p>
              <p>
                <i>06</i> &lt;SomethingUseful
              </p>
              <p>
                <i>07</i> value=&#123;work&#125;
              </p>
              <p>
                <i>08</i> /&gt;
              </p>
              <p>
                <i>09</i> );
              </p>
              <p>
                <i>10</i>&#125;
              </p>
            </div>
          ) : variant % 3 === 1 ? (
            <div className={portfolioClasses("pf-board-preview")}>
              {["Ideas", "In progress", "Done"].map((label, index) => (
                <div key={label}>
                  <h4>
                    {label} <Plus size={10} />
                  </h4>
                  {[0, 1, 2].slice(0, 3 - (index % 2)).map((item) => (
                    <div
                      className={portfolioClasses("pf-mini-card")}
                      key={item}
                    >
                      <b />
                      <b />
                      <span />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className={portfolioClasses("pf-preview-greeting")}>
                <span>WORK IN PROGRESS</span>
                <h4>A little better, every day.</h4>
              </div>
              <div className={portfolioClasses("pf-preview-stats")}>
                {["Projects", "In progress", "Completed"].map((label) => (
                  <div key={label}>
                    <span>{label}</span>
                    <b>—</b>
                  </div>
                ))}
              </div>
              <div className={portfolioClasses("pf-preview-widgets")}>
                <div>
                  <span>{t("activity")}</span>
                  <svg viewBox="0 0 240 100" fill="none">
                    <path
                      d="M0 90C20 90 25 45 48 55S75 90 98 50 135 90 160 30 195 60 240 5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M0 99H240" stroke="currentColor" opacity=".15" />
                  </svg>
                </div>
                <div className={portfolioClasses("pf-mini-list")}>
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i}>
                      <i />
                      <b />
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <span className={portfolioClasses("pf-preview-caption")}>
        {t("previewLabel")}
      </span>
    </div>
  );
}
