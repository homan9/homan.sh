export {
  getVillagers,
  getVillagerById,
  getInvitations,
  getInvitationBySlug,
} from "@/lib/firestore";
export type { Villager, Invitation } from "@/lib/types";

import { getInvitations } from "@/lib/firestore";

/**
 * Thin wrapper kept so the home page can continue calling
 * `getPendingInvitations()` without a rename.
 */
export async function getPendingInvitations() {
  const invitations = await getInvitations();
  return invitations.map((inv) => ({
    displayName: inv.firstName,
    invitationSlug: inv.id,
  }));
}
