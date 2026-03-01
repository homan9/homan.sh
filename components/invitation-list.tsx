import { getInvitations } from "@/lib/firestore";
import List from "@/components/ui/list";
import BaseListItem from "@/components/ui/list-item";
import AvatarName from "@/components/ui/avatar-name";

export default async function InvitationList() {
  const invitations = await getInvitations();

  return (
    <List>
      {invitations.map((invitation) => (
        <BaseListItem
          key={invitation.id}
          href={invitation.postLink ?? `/invitation/${invitation.id}`}
          external={!!invitation.postLink}
        >
          <AvatarName
            src={invitation.profilePicSrc}
            name={invitation.displayName}
            grayscale
          />
        </BaseListItem>
      ))}
    </List>
  );
}
