import { portfolioClasses } from "./portfolio-styles";
import { useTranslations } from "next-intl";
import {
  portfolioSections,
  type PortfolioContent,
  type PortfolioSection,
} from "@/lib/portfolio/types";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Markdown from "./markdown";
const number = (index: number) => String(index + 1).padStart(2, "0");

export default function IntroSection({
  profile,
  goTo,
}: {
  profile: PortfolioContent["profile"];
  goTo: (section: PortfolioSection, focus?: boolean) => void;
}) {
  const t = useTranslations("Portfolio");

  return (
    <div className={portfolioClasses("pf-intro")}>
      <div className="pf-intro-copy">
        <p className={portfolioClasses("pf-eyebrow")}>{t("eyebrow")}</p>
        <h1 id="pf-heading-intro">{profile.title}</h1>
        <Markdown
          html={profile.html}
          className="max-w-[600px] text-sm text-[var(--pf-muted)] lg:text-base"
        />
        <div className={portfolioClasses("pf-intro-links")}>
          <button
            type="button"
            className={portfolioClasses("pf-text-link")}
            onClick={() => goTo("work", true)}
          >
            {t("viewWork")}
            <ArrowRight size={18} />
          </button>
          {profile.github && (
            <a
              className={portfolioClasses("pf-text-link")}
              href={profile.github}
            >
              GitHub
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        <span className={portfolioClasses("pf-scroll-hint")}>
          <ArrowDown size={14} />
          {t("scrollHint")}
        </span>
      </div>
      <div className={portfolioClasses("pf-index")}>
        {portfolioSections.map((item, i) => (
          <button type="button" key={item} onClick={() => goTo(item, true)}>
            <span className={portfolioClasses("pf-mono")}>{number(i)}</span>
            <span>{t(`sections.${item}`)}</span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
    </div>
  );
}
