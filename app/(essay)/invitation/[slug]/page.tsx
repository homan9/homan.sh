import { notFound } from "next/navigation";
import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getInvitationSlugs,
  getInvitationBySlug,
  getSnippetSources,
} from "@/lib/invitations";
import { getMDXComponents } from "@/components/mdx-components";
import type { Metadata } from "next";
import type { JSX } from "react";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getInvitationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { title } = getInvitationBySlug(slug);
    return { title };
  } catch {
    return { title: "Invitation" };
  }
}

async function buildSnippetComponents(): Promise<
  Record<string, () => JSX.Element>
> {
  const sources = getSnippetSources();
  const mdxComponents = getMDXComponents();
  const components: Record<string, () => JSX.Element> = {};

  for (const [name, source] of Object.entries(sources)) {
    const { content } = await compileMDX({
      source,
      components: mdxComponents,
      options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    });
    components[name] = () => content;
  }

  return components;
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const slugs = getInvitationSlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }

  const { content } = getInvitationBySlug(slug);
  const mdxComponents = getMDXComponents();
  const snippetComponents = await buildSnippetComponents();

  return (
    <MDXRemote
      source={content}
      components={{ ...mdxComponents, ...snippetComponents }}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
