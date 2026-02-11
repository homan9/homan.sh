import { Suspense } from "react";
import { notFound } from "next/navigation";
import MuxVideo from "@/components/mux-video";
import { getInvitationBySlug } from "@/lib/firestore";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `invitation – ${slug}` };
}

const titleStyle: React.CSSProperties = {
  fontWeight: 580,
  maxWidth: 900,
  width: "90vw",
  marginLeft: "50%",
  transform: "translateX(-50%)",
  fontFamily: "sans-serif",
  letterSpacing: "-0.025em",
  color: "#111",
  marginBottom: "3.5rem",
  lineHeight: 1.1,
  textAlign: "center",
};

const captionStyle: React.CSSProperties = {
  fontSize: "var(--invitation-caption-size)",
  fontWeight: 540,
  letterSpacing: "-0.045em",
  color: "#111",
  marginTop: "3rem",
  marginBottom: "1.2rem",
  lineHeight: 1.2,
};

const bodyStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 480,
  letterSpacing: "-0.03em",
  lineHeight: "1.4rem",
  color: "#111",
  marginBottom: "1.2rem",
};

const footerStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 500,
  letterSpacing: "-0.025em",
  lineHeight: "1.3rem",
  color: "rgba(17, 17, 17, 0.4)",
  marginTop: "1.2rem",
};

async function InvitationContent({ slug }: { slug: string }) {
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  return (
    <div
      style={{
        fontSize: "17px",
        fontWeight: 420,
        lineHeight: "1.5rem",
        letterSpacing: "-0.03em",
        color: "#111",
      }}
    >
      <h1 className="mdx-h1" style={titleStyle}>
        hey {invitation.firstName} 👋
      </h1>

      <h2 className="invitation-caption" style={captionStyle}>
        I&rsquo;m inviting you to join the{" "}
        <span
          className="invitation-georgia"
          style={{
            fontFamily: "Georgia",
            letterSpacing: 0,
            fontSize: "var(--invitation-georgia-size)",
            color: "green",
          }}
        >
          <i>village</i>
        </span>{" "}
        &ndash; a curated group of people who can trade shares of my{" "}
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="link-readmore"
        >
          personal token{" "}
        </a>
        freely amongst themselves.
      </h2>

      {invitation.videoID && (
        <div style={{ marginTop: "1.2rem" }}>
          <MuxVideo
            playbackId={invitation.videoID}
            title={`Invitation for ${invitation.firstName}`}
          />
        </div>
      )}

      <p style={footerStyle}>
        There is no obligation to buy or trade shares of my token. By joining
        the village, you simply give yourself the option to.
      </p>

      {/*<p style={{ ...footerStyle, marginTop: "1.2rem" }}>
        note: joining my village isn&rsquo;t an obligation to buy or trade
        shares of my token.
      </p>*/}
    </div>
  );
}

function InvitationSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          width: 180,
          height: 20,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.06)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 0.85, 0.92, 0.78, 0.6].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w * 100}%`,
              height: 16,
              borderRadius: 4,
              background: "rgba(17, 17, 17, 0.04)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 2,
          background: "rgba(17, 17, 17, 0.03)",
        }}
      />
    </div>
  );
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={<InvitationSkeleton />}>
      <InvitationContent slug={slug} />
    </Suspense>
  );
}
