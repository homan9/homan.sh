import AvatarName from "@/components/ui/avatar-name";

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
      <p
        style={{
          fontSize: "1rem",
          fontWeight: 460,
          color: "rgba(17, 17, 17, 1.0)",
          letterSpacing: "-0.02em",
          lineHeight: "22px",
          marginTop: 12,
        }}
      >
        Welcome to my personal token! It represents the value I will create over
        my life. With shares. Grounded in my capital gains.
      </p>
    </div>
  );
}
