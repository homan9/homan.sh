import Image from "next/image";
import { GeistMono } from "geist/font/mono";
import { getVillagers } from "@/lib/firestore";
import List from "@/components/ui/list";
import BaseListItem from "@/components/ui/list-item";

const homan = {
  id: "0",
  displayName: "homan",
  profilePicSrc: "/homan.png",
};

const avatarSize = 36;

export default async function VillagerList() {
  const villagers = await getVillagers();
  const allVillagers = [homan, ...villagers];

  return (
    <List>
      {/* Summary row */}
      <BaseListItem passive>
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#111",
            letterSpacing: "-0.02em",
            flexShrink: 0,
          }}
        >
          Outstanding shares
        </span>

        {/* Dashed separator within the row */}
        <span
          style={{
            flex: 1,
            borderBottomWidth: "var(--dashed-border-width)",
            borderBottomStyle: "dashed",
            borderBottomColor: "var(--dashed-border-color)",
            alignSelf: "center",
            minWidth: 20,
          }}
        />

        <span
          className={GeistMono.className}
          style={{
            fontSize: "1rem",
            fontWeight: 440,
            color: "#111",
            letterSpacing: "0",
            flexShrink: 0,
          }}
        >
          0
        </span>
      </BaseListItem>

      {/* Villager rows */}
      {allVillagers.map((villager) => (
        <BaseListItem key={villager.id} href={`/villager/${villager.id}`}>
          {villager.profilePicSrc ? (
            <Image
              src={villager.profilePicSrc}
              alt={villager.displayName}
              width={avatarSize}
              height={avatarSize}
              style={{ borderRadius: "50%", flexShrink: 0 }}
            />
          ) : (
            <div
              style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: "50%",
                background: "#e4e4e7",
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#111",
              flexShrink: 0,
            }}
          >
            {villager.displayName}
          </span>

          {/* Dashed separator within the row */}
          <span
            style={{
              flex: 1,
              borderBottomWidth: "var(--dashed-border-width)",
              borderBottomStyle: "dashed",
              borderBottomColor: "var(--dashed-border-color)",
              alignSelf: "center",
              minWidth: 20,
            }}
          />

          <span
            className={GeistMono.className}
            style={{
              fontSize: "1rem",
              fontWeight: 440,
              color: "#111",
              letterSpacing: "0",
              flexShrink: 0,
            }}
          >
            0%
          </span>
        </BaseListItem>
      ))}
    </List>
  );
}
