import Image from "next/image";
import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import { getVillagers } from "@/lib/firestore";

const homan = {
  id: "0",
  displayName: "homan",
  profilePicSrc: "/homan.png",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.5rem 1.5rem",
  margin: "0 -1.5rem",
  width: "calc(100% + 3rem)",
  borderRadius: 6,
  transition: "background 0.15s ease",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
};

const nameStyle: React.CSSProperties = {
  fontSize: "1.125rem",
  fontWeight: 500,
  letterSpacing: "-0.04em",
  color: "#111",
};

const equityLabel: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: 450,
  letterSpacing: "0em",
  color: "rgba(17, 17, 17, 0.25)",
  marginLeft: "auto",
};

export default async function VillagerList() {
  const villagers = await getVillagers();
  const allVillagers = [homan, ...villagers];

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {allVillagers.map((villager) => (
        <li key={villager.id}>
          <Link
            href={`/villager/${villager.id}`}
            style={rowStyle}
            className="villager-row"
          >
            {villager.profilePicSrc ? (
              <Image
                src={villager.profilePicSrc}
                alt={villager.displayName}
                width={36}
                height={36}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#e4e4e7",
                }}
              />
            )}
            <span style={nameStyle}>{villager.displayName}</span>
            <span className={GeistMono.className} style={equityLabel}>
              0%
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
