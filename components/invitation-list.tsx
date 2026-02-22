import Image from "next/image";
import { getInvitations } from "@/lib/firestore";
import List from "@/components/ui/list";
import BaseListItem from "@/components/ui/list-item";

const avatarSize = 36;

export default async function InvitationList() {
  const invitations = await getInvitations();

  return (
    <List>
      {invitations.map((invitation) => (
        <BaseListItem key={invitation.id} href={`/invitation/${invitation.id}`}>
          {invitation.profilePicSrc ? (
            <Image
              src={invitation.profilePicSrc}
              alt={invitation.displayName}
              width={avatarSize}
              height={avatarSize}
              style={{
                borderRadius: "50%",
                filter: "grayscale(1) contrast(1.1)",
                flexShrink: 0,
              }}
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
            }}
          >
            {invitation.displayName}
          </span>
        </BaseListItem>
      ))}
    </List>
  );
}
