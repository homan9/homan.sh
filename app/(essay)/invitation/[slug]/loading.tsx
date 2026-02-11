export default function InvitationLoading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Greeting skeleton */}
      <div
        style={{
          width: 180,
          height: 20,
          borderRadius: 4,
          background: "rgba(17, 17, 17, 0.06)",
        }}
      />

      {/* Paragraph skeletons */}
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

      {/* Video skeleton */}
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
