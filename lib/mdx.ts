import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export async function getMdxSource(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}

export async function getMdxBySlug(directory: string, slug: string) {
  const filePath = path.join(directory, `${slug}.mdx`);
  return getMdxSource(filePath);
}

export function getAllSlugs(directory: string): string[] {
  const dirPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
