import "server-only";

import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { locales } from "@/i18n/routing";
import type { PortfolioContent, Project, Experience } from "./types";

type Fields = Record<string, unknown>;
const root = path.join(process.cwd(), "content/portfolio");
const publicRoot = path.join(process.cwd(), "public");

function fail(file: string, field: string, message: string): never {
  throw new Error(
    `[Portfolio] ${path.relative(process.cwd(), file)}: ${field} ${message}`,
  );
}

function stringField(
  fields: Fields,
  key: string,
  file: string,
  required = false,
) {
  const value = fields[key];
  if (value === undefined && !required) return undefined;
  if (typeof value !== "string" || !value.trim()) {
    fail(file, key, "must be a non-empty string");
  }
  return value.trim();
}

function booleanField(fields: Fields, key: string, file: string) {
  const value = fields[key];
  if (value === undefined) return false;
  if (typeof value !== "boolean") fail(file, key, "must be a boolean");
  return value;
}

function orderField(fields: Fields, file: string) {
  if (typeof fields.order !== "number" || !Number.isFinite(fields.order)) {
    fail(file, "order", "must be a finite number");
  }
  return fields.order;
}

function webLink(value: string | undefined, file: string, field: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) throw new Error();
  } catch {
    fail(file, field, "must be an absolute HTTP(S) URL");
  }
  return value;
}

async function validateImage(url: string, file: string) {
  let decoded: string;
  try {
    decoded = decodeURIComponent(url);
  } catch {
    fail(file, "image", `has an invalid path: ${url}`);
  }
  const resolved = path.resolve(publicRoot, `.${decoded}`);
  const allowed = path.join(publicRoot, "portfolio") + path.sep;
  if (!url.startsWith("/portfolio/") || !resolved.startsWith(allowed)) {
    fail(file, "image", `must point inside /portfolio/: ${url}`);
  }
  try {
    await access(resolved);
  } catch {
    fail(file, "image", `does not exist: ${url}`);
  }
}

async function parse(file: string) {
  const source = await readFile(file, "utf8");
  const images: string[] = [];
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ["yaml"])
      .use(remarkParseFrontmatter)
      .use(remarkGfm)
      .use(() => (tree) => {
        visit(tree, "heading", (node: { depth?: number }) => {
          if (typeof node.depth === "number")
            node.depth = Math.min(6, node.depth + 1);
        });
        visit(tree, "image", (node: { url?: string }) => {
          if (node.url) images.push(node.url);
        });
        visit(
          tree,
          "definition",
          (node: { url?: string; identifier?: string }) => {
            // Reference images are checked below using their matching definitions.
            visit(tree, "imageReference", (image: { identifier?: string }) => {
              if (image.identifier === node.identifier && node.url)
                images.push(node.url);
            });
          },
        );
      })
      .use(remarkRehype)
      .use(() => (tree) => {
        visit(
          tree,
          "element",
          (node: {
            tagName?: string;
            properties?: Record<string, unknown>;
          }) => {
            if (node.tagName !== "a" || !node.properties) return;
            const href = String(node.properties.href ?? "");
            if (!/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href)) {
              delete node.properties.href;
            }
          },
        );
      })
      .use(rehypeStringify)
      .process(source);
    const fields = result.data.frontmatter;
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      fail(file, "frontmatter", "must be a YAML object");
    }
    const metadata = fields as Fields;
    // Drafts can contain unfinished prose and missing assets.
    if (!booleanField(metadata, "draft", file)) {
      await Promise.all(images.map((url) => validateImage(url, file)));
    }
    return { fields: metadata, html: String(result.value) };
  } catch (error) {
    fail(
      file,
      "Markdown",
      error instanceof Error ? error.message : String(error),
    );
  }
}

async function files(directory: string) {
  try {
    return (await readdir(directory, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => path.join(directory, entry.name));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function sort<T extends { order: number; id: string }>(items: T[]) {
  return items.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export async function getPortfolioContent(
  locale: string,
): Promise<PortfolioContent> {
  if (!locales.includes(locale))
    throw new Error("Unsupported portfolio locale");
  const directory = path.join(root, locale);
  const profileFile = path.join(directory, "profile.md");
  const { fields: profile, html } = await parse(profileFile);
  const email = stringField(profile, "email", profileFile);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fail(profileFile, "email", "must be an email address");
  }
  const projects: Project[] = [];
  for (const file of await files(path.join(directory, "projects"))) {
    const { fields, html } = await parse(file);
    if (booleanField(fields, "draft", file)) continue;
    const cover = stringField(fields, "cover", file);
    if (cover) await validateImage(cover, file);
    const stack = fields.stack ?? [];
    if (
      !Array.isArray(stack) ||
      !stack.every((item) => typeof item === "string" && item.trim())
    ) {
      fail(file, "stack", "must be a list of non-empty strings");
    }
    const links = fields.links ?? {};
    if (!links || typeof links !== "object" || Array.isArray(links)) {
      fail(file, "links", "must be an object");
    }
    projects.push({
      id: path.basename(file, ".md"),
      title: stringField(fields, "title", file, true)!,
      summary: stringField(fields, "summary", file, true)!,
      order: orderField(fields, file),
      featured: booleanField(fields, "featured", file),
      example: booleanField(fields, "example", file),
      cover,
      coverAlt: stringField(fields, "coverAlt", file, Boolean(cover)),
      stack: stack as string[],
      role: stringField(fields, "role", file),
      problem: stringField(fields, "problem", file),
      outcome: stringField(fields, "outcome", file),
      links: {
        github: webLink(
          stringField(links as Fields, "github", file),
          file,
          "links.github",
        ),
        demo: webLink(
          stringField(links as Fields, "demo", file),
          file,
          "links.demo",
        ),
      },
      html,
    });
  }
  const experiences: Experience[] = [];
  for (const file of await files(path.join(directory, "experiences"))) {
    const { fields, html } = await parse(file);
    if (booleanField(fields, "draft", file)) continue;
    experiences.push({
      id: path.basename(file, ".md"),
      title: stringField(fields, "title", file, true)!,
      period: stringField(fields, "period", file, true)!,
      role: stringField(fields, "role", file),
      order: orderField(fields, file),
      example: booleanField(fields, "example", file),
      html,
    });
  }
  return {
    profile: {
      title: stringField(profile, "title", profileFile, true)!,
      contactTitle: stringField(profile, "contactTitle", profileFile, true)!,
      contactDescription: stringField(
        profile,
        "contactDescription",
        profileFile,
      ),
      github: webLink(
        stringField(profile, "github", profileFile),
        profileFile,
        "github",
      ),
      email,
      html,
    },
    projects: sort(projects),
    experiences: sort(experiences),
  };
}
