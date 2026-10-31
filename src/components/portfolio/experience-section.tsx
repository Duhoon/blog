import { portfolioClasses } from "./portfolio-styles";
import { useTranslations } from "next-intl";
import type { PortfolioContent, Experience } from "@/lib/portfolio/types";
import { ArrowUpRight } from "lucide-react";
import Markdown from "./markdown";

export default function ExperienceSection({
  profile,
  experiences,
}: {
  profile: PortfolioContent["profile"];
  experiences: Experience[];
}) {
  const t = useTranslations("Portfolio");

  return (
    <div className={portfolioClasses("pf-experience")}>
      <div>
        <p className={portfolioClasses("pf-eyebrow")}>03 / EXPERIENCE</p>
        <h2 id="pf-heading-experience">{t("experienceTitle")}</h2>
        <p className={portfolioClasses("pf-experience-lead")}>
          {t("experienceLead")}
        </p>
        <div className={portfolioClasses("pf-timeline")}>
          {experiences.length ? (
            experiences.map((item) => (
              <article key={item.id}>
                <p className={portfolioClasses("pf-mono")}>
                  {item.period}
                  {item.example && ` · ${t("example")}`}
                </p>
                <h3>{item.title}</h3>
                {item.role && (
                  <p className={portfolioClasses("pf-experience-role")}>
                    {item.role}
                  </p>
                )}
                <Markdown
                  html={item.html}
                  className="text-xs text-[var(--pf-muted)]"
                />
              </article>
            ))
          ) : (
            <p className={portfolioClasses("pf-empty")}>
              {t("emptyExperience")}
            </p>
          )}
        </div>
      </div>
      <aside className={portfolioClasses("pf-contact")}>
        <span className={portfolioClasses("pf-eyebrow")}>GET IN TOUCH</span>
        <h2>{profile.contactTitle}</h2>
        {profile.contactDescription && <p>{profile.contactDescription}</p>}
        <div>
          {profile.email && (
            <a
              className={portfolioClasses("pf-text-link")}
              href={`mailto:${profile.email}`}
            >
              Email
              <ArrowUpRight size={16} />
            </a>
          )}
          {profile.github && (
            <a
              className={portfolioClasses("pf-text-link")}
              href={profile.github}
            >
              GitHub
              <ArrowUpRight size={16} />
            </a>
          )}
          {!profile.email && !profile.github && (
            <span className={portfolioClasses("pf-contact-empty")}>
              {t("emptyContact")}
            </span>
          )}
        </div>
        <span className={portfolioClasses("pf-contact-signature")}>
          412ock<span> / Portfolio</span>
        </span>
      </aside>
    </div>
  );
}
