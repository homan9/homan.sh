import Image from "next/image";
import Link from "next/link";
import { getInvitations } from "@/lib/firestore";

export default async function InvitationList() {
  const invitations = await getInvitations();

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {invitations.map((invitation) => (
        <li key={invitation.id}>
          <Link
            href={`/invitation/${invitation.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.5rem 1.25rem",
              margin: "0 -1.25rem",
              width: "calc(100% + 2.5rem)",
              borderRadius: 6,
              transition: "background 0.15s ease",
              textDecoration: "none",
              color: "inherit",
              opacity: 0.5,
            }}
            className="villager-row"
          >
            {invitation.profilePicSrc ? (
              <Image
                src={invitation.profilePicSrc}
                alt={invitation.displayName}
                width={32}
                height={32}
                style={{ borderRadius: "50%", filter: "grayscale(1)" }}
              />
            ) : (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#e4e4e7",
                }}
              />
            )}
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: 460,
                letterSpacing: "-0.03em",
                color: "#111",
              }}
            >
              {invitation.displayName}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
