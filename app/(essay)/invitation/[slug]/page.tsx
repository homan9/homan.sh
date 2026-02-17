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
  letterSpacing: "-0.065em",
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

const hrStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid rgba(17, 17, 17, 0.1)",
  margin: "2rem 0",
};

const blockquoteStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 480,
  letterSpacing: "-0.025em",
  lineHeight: "1.4rem",
  color: "rgba(17, 17, 17, 0.5)",
  margin: 0,
  marginBottom: "1rem",
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
        {invitation.firstName} 👋
      </h1>

      {/*<h2 className="invitation-caption" style={captionStyle}>
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
        </span>
        .
      </h2>*/}

      <p style={bodyStyle}>
        I'm inviting you to join the village – a curated group of people who can
        trade shares of my{" "}
        <a href="/my-token" className="link-readmore">
          personal token
        </a>{" "}
        freely amongst themselves.
      </p>

      {/*<hr style={hrStyle} />*/}

      <p style={blockquoteStyle}>
        My personal token represents the value I create over my life. Its value
        is grounded in my actual capital gains from selling equity. It&rsquo;s
        backed by a legal agreement and represented onchain.
      </p>

      <hr style={hrStyle} />

      {invitation.videoID && (
        <div>
          <MuxVideo
            playbackId={invitation.videoID}
            title={`Invitation for ${invitation.firstName}`}
          />
        </div>
      )}

      <hr style={hrStyle} />
      <p style={blockquoteStyle}>
        There is no obligation to buy or trade shares of my token. By joining
        the village, you simply give yourself the option to.
      </p>
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
