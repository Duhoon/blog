export const portfolioSections = [
  "intro",
  "work",
  "archive",
  "experience",
] as const;
export type PortfolioSection = (typeof portfolioSections)[number];

export type Project = {
  id: string;
  title: string;
  summary: string;
  order: number;
  featured: boolean;
  example: boolean;
  cover?: string;
  coverAlt?: string;
  images: { src: string; alt: string }[];
  stack: string[];
  role?: string;
  problem?: string;
  outcome?: string;
  links: { github?: string; demo?: string };
  html: string;
};

export type Experience = {
  id: string;
  title: string;
  period: string;
  role?: string;
  order: number;
  example: boolean;
  html: string;
};

export type PortfolioContent = {
  profile: {
    title: string;
    contactTitle: string;
    contactDescription?: string;
    github?: string;
    email?: string;
    html: string;
  };
  projects: Project[];
  experiences: Experience[];
};
