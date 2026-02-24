import { GeistMono } from "geist/font/mono";
import { getVillagers } from "@/lib/firestore";
import List from "@/components/ui/list";
import BaseListItem from "@/components/ui/list-item";
import AvatarName from "@/components/ui/avatar-name";

const homan = {
  id: "0",
  displayName: "homan",
  profilePicSrc: "/homan.png",
};

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
          <AvatarName
            src={villager.profilePicSrc}
            name={villager.displayName}
          />

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
