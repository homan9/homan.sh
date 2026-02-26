import AvatarName from "@/components/ui/avatar-name";

function Bio({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="bio"
      style={{
        fontSize: "1rem",
        fontWeight: 460,
        color: "rgba(17, 17, 17, 1.0)",
        letterSpacing: "-0.02em",
        lineHeight: "22px",
      }}
    >
      <style>{`
        .bio a {
          color: var(--color-link);
          text-decoration: none;
          transition: color 0.15s ease;
          font-weight: 500;
        }
        .bio a:hover {
          color: var(--color-link-hover);
        }
      `}</style>
      {children}
    </p>
  );
}

export default function ProfileHeader() {
  return (
    <div style={{ padding: "24px 24px 0", marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <AvatarName src="/homan.png" name="homan" id="profile-pic" />
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Bio>
          welcome to my personal token! <a href="/how">Here's how it works</a>.
        </Bio>
      </div>
    </div>
  );
}
