import PersonalTokenScene from "@/visualizations/personal-token/PersonalTokenScene";
import List from "@/components/ui/list";
import BaseListItem from "@/components/ui/list-item";
import ExternalArrow from "@/components/ui/external-arrow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about",
};

type AboutItem = {
  title: string;
  caption?: string;
  href: string;
  external?: boolean;
};

const items: AboutItem[] = [
  {
    title: "My token",
    caption: "overview, why, mechanics, the village, trust, faq.",
    href: "/my-token",
  },
  {
    title: "Whitepaper",
    caption: "personal token v0.1",
    href: "https://github.com/homan9/personal-token/blob/main/whitepaper.md",
    external: true,
  },
  {
    title: "What is a personal token worth?",
    caption: "how i think about valuation",
    href: "/valuation",
  },
  {
    title: "Creating your villager account",
    href: "/personal-token",
  },
  {
    title: "Welcome to the village!",
    caption: "villager onboarding & resources",
    href: "/invitation",
  },
  {
    title: "Village smart contract",
    caption: "0xA2C7d149fD50A277313F2349A558fdD59FCC6bCA",
    href: "https://basescan.org/address/0xA2C7d149fD50A277313F2349A558fdD59FCC6bCA",
    external: true,
  },
  {
    title: "Onchain source",
    caption: "for whitepaper, smart contract code.",
    href: "https://github.com/homan9/personal-token",
    external: true,
  },
  {
    title: "Website source",
    caption: "for homantoken.com",
    href: "https://github.com/homan9/homan",
    external: true,
  },
];

const titleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  color: "#111",
  letterSpacing: "-0.02em",
  lineHeight: 1.4,
};

const captionStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: "rgba(17, 17, 17, 0.4)",
  letterSpacing: "-0.01em",
  lineHeight: 1.4,
  marginTop: 1,
};

export default function AboutPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        {/* Visualization — padded, dashed bottom border */}
        <div className="section" style={{ padding: 24, borderTopWidth: 0 }}>
          <PersonalTokenScene fill />
        </div>

        {/* Links list */}
        <div style={{ paddingBottom: 64 }}>
          <List>
            {items.map((item) => (
              <BaseListItem
                key={item.title}
                href={item.href}
                external={item.external}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={titleStyle}>{item.title}</div>
                  {item.caption && (
                    <div style={captionStyle}>{item.caption}</div>
                  )}
                </div>
                {item.external && <ExternalArrow />}
              </BaseListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
