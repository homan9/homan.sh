"use client";

import { useEffect, useState, useCallback, useRef } from "react";

type Heading = {
  id: string;
  text: string;
};

export default function TableOfContents() {
  const [h1Heading, setH1Heading] = useState<Heading | null>(null);
  const [h2Headings, setH2Headings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [topOffset, setTopOffset] = useState<number>(0);
  const navRef = useRef<HTMLElement>(null);

  // Extract h1 + h2 headings from the DOM on mount
  useEffect(() => {
    const article = document.querySelector(".essay-article");
    if (!article) return;

    // Grab the h1 title
    const h1 = article.querySelector("h1.mdx-h1[id]");
    if (h1) {
      setH1Heading({ id: h1.id, text: h1.textContent || "" });
      setActiveId(h1.id);
    }

    // Grab h2s, excluding footnotes
    const h2s = article.querySelectorAll("h2[id]");
    const items: Heading[] = [];
    h2s.forEach((el) => {
      if (el.closest(".footnotes")) return;
      items.push({ id: el.id, text: el.textContent || "" });
    });
    setH2Headings(items);
  }, []);

  // Build the full list: h1 first, then h2s
  const allHeadings: Heading[] = [];
  if (h1Heading) allHeadings.push(h1Heading);
  allHeadings.push(...h2Headings);

  // Compute the h1's document-level top (independent of scroll).
  // For position:fixed, this gives us the viewport-top the h1 sits at
  // when the page hasn't been scrolled yet — the TOC stays pinned there.
  useEffect(() => {
    const updateTop = () => {
      const h1 = document.querySelector(".essay-article .mdx-h1");
      if (!h1) return;
      const rect = h1.getBoundingClientRect();
      const docTop = rect.top + window.scrollY;
      setTopOffset(docTop);
    };

    requestAnimationFrame(updateTop);
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [h2Headings]);

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (allHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      },
    );

    allHeadings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        const wrapper = el.closest(".mdx-h2-wrapper") || el;
        observer.observe(wrapper);
      }
    });

    return () => observer.disconnect();
  }, [h1Heading, h2Headings]);

  // Track scroll for edge cases (top of page, bottom of page)
  const handleScroll = useCallback(() => {
    if (allHeadings.length === 0) return;

    // Near the top of the page → activate h1
    if (window.scrollY < 100) {
      setActiveId(allHeadings[0].id);
      return;
    }

    let current = "";
    for (const { id } of allHeadings) {
      const el = document.getElementById(id);
      if (!el) continue;
      const wrapper = el.closest(".mdx-h2-wrapper") || el;
      const rect = wrapper.getBoundingClientRect();
      if (rect.top <= 120) {
        current = id;
      }
    }
    if (current) {
      setActiveId(current);
    }
  }, [h1Heading, h2Headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Only render when there is at least one h2 (excluding footnotes)
  if (h2Headings.length === 0) return null;

  return (
    <nav
      ref={navRef}
      className="toc"
      aria-label="Table of contents"
      style={{
        top: topOffset > 0 ? topOffset : undefined,
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {allHeadings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="toc-item"
              data-active={activeId === id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  const wrapper = el.closest(".mdx-h2-wrapper") || el;
                  const top =
                    wrapper.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                  setActiveId(id);
                }
              }}
              style={{
                display: "block",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 480,
                letterSpacing: "-0.02em",
                lineHeight: 1.5,
                transition: "color 0.15s ease",
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
