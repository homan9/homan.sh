export type Villager = {
  id: string;
  displayName: string;
  legalName: string;
  walletAddress: string;
  profilePicSrc: string;
  isActive: boolean;
};

export type Invitation = {
  id: string;
  firstName: string;
  displayName: string;
  profilePicSrc: string;
  videoID: string;
};

export type TokenOwner = {
  name: string;
  legalName: string;
  profileVideoSrc: string;
  walletAddress: string;
  villageAddress: string;
  personalTokenAddress: string;
  outstandingShares: number;
};
