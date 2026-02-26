import fs from "fs";
import path from "path";

const invitationsDirectory = path.join(process.cwd(), "invitations");
const snippetsDirectory = path.join(invitationsDirectory, "snippets");

export function getInvitationSlugs(): string[] {
  return fs
    .readdirSync(invitationsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getInvitationBySlug(slug: string): {
  title: string;
  content: string;
} {
  const fullPath = path.join(invitationsDirectory, `${slug}.mdx`);
  const content = fs.readFileSync(fullPath, "utf8");
  const title = extractTitleFromMdx(content) ?? slug;
  return { title, content };
}

function extractTitleFromMdx(source: string): string | null {
  const match = source.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/,\s*$/, "").trim() : null;
}

export function getSnippetSources(): Record<string, string> {
  if (!fs.existsSync(snippetsDirectory)) return {};

  const snippets: Record<string, string> = {};

  fs.readdirSync(snippetsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .forEach((file) => {
      const name = file.replace(/\.mdx$/, "");
      const content = fs.readFileSync(
        path.join(snippetsDirectory, file),
        "utf8",
      );
      snippets[name] = content;
    });

  return snippets;
}
