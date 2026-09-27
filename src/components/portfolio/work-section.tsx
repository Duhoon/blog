import { useTranslations } from "next-intl";
import type { Project } from "@/lib/portfolio/types";
import { ArrowUpRight } from "lucide-react";
import Markdown from "./markdown";
import ProjectPreview from "./project-preview";
const number = (index: number) => String(index + 1).padStart(2, "0");

export default function WorkSection({
  projects,
  projectId,
  selectProject,
  openGallery,
}: {
  projects: Project[];
  openGallery: (project: Project, trigger: HTMLButtonElement) => void;
  projectId: string;
  selectProject: (id: string, navigate?: boolean) => void;
}) {
  const t = useTranslations("Portfolio");
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const projectIndex = projects.findIndex((item) => item.id === project?.id);
  const featured = projects.filter(
    (item) => item.featured || item.id === project?.id,
  );

  return (
    <div className="pf-section-content">
      <div className="pf-section-heading">
        <div>
          <p className="pf-eyebrow">01 / SELECTED WORK</p>
          <h2 id="pf-heading-work">{t("sections.work")}</h2>
        </div>
        {featured.length > 0 && (
          <div
            className="pf-project-tabs"
            role="tablist"
            aria-label={t("projectSelection")}
          >
            {featured.map((item, i) => (
              <button
                type="button"
                role="tab"
                key={item.id}
                id={`pf-tab-${item.id}`}
                aria-selected={item.id === project?.id}
                aria-controls="pf-project-panel"
                tabIndex={item.id === project?.id ? 0 : -1}
                onClick={() => selectProject(item.id)}
                onKeyDown={(event) => {
                  let target = i;
                  if (event.key === "ArrowRight")
                    target = (i + 1) % featured.length;
                  else if (event.key === "ArrowLeft")
                    target = (i + featured.length - 1) % featured.length;
                  else if (event.key === "Home") target = 0;
                  else if (event.key === "End") target = featured.length - 1;
                  else return;
                  event.preventDefault();
                  event.stopPropagation();
                  selectProject(featured[target].id);
                  document
                    .getElementById(`pf-tab-${featured[target].id}`)
                    ?.focus();
                }}
                aria-label={item.title}
              >
                {number(i)}
              </button>
            ))}
          </div>
        )}
      </div>
      {project ? (
        <div
          className="pf-featured"
          id="pf-project-panel"
          role="tabpanel"
          aria-labelledby={`pf-tab-${project.id}`}
        >
          <ProjectPreview
            project={project}
            variant={projectIndex}
            openGallery={openGallery}
          />
          <div className="pf-project-copy">
            <p className="pf-eyebrow">
              PROJECT {number(projectIndex)}
              {project.example && ` · ${t("example")}`}
            </p>
            <h3>{project.title}</h3>
            <p className="pf-summary">{project.summary}</p>
            <Markdown html={project.html} />
            <dl className="pf-facts">
              {(["role", "problem", "outcome"] as const).map(
                (key) =>
                  project[key] && (
                    <div key={key}>
                      <dt>{t(key)}</dt>
                      <dd>{project[key]}</dd>
                    </div>
                  ),
              )}
            </dl>
            {project.stack.length > 0 && (
              <ul className="pf-stack">
                {project.stack.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>
            )}
            <div className="pf-project-links">
              {Object.entries(project.links).map(
                ([key, href]) =>
                  href && (
                    <a className="pf-text-link" key={key} href={href}>
                      {key === "github" ? "GitHub" : "Demo"}
                      <ArrowUpRight size={15} />
                    </a>
                  ),
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="pf-empty">{t("emptyProjects")}</p>
      )}
    </div>
  );
}
