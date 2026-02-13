import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const VILLAGE_ADDRESS = "0xA2C7d149fD50A277313F2349A558fdD59FCC6bCA" as const;

const villageAbi = [
  {
    name: "getVillager",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "wallet", type: "address" },
          { name: "cap", type: "uint256" },
          { name: "voteReinvest", type: "bool" },
          { name: "joinedAt", type: "uint256" },
          { name: "isActive", type: "bool" },
        ],
      },
    ],
  },
] as const;

const client = createPublicClient({
  chain: base,
  transport: http(),
});

export type OnchainVillager = {
  wallet: string;
  cap: bigint;
  voteReinvest: boolean;
  joinedAt: bigint;
  isActive: boolean;
};

export async function getOnchainVillager(id: number): Promise<OnchainVillager> {
  const result = await client.readContract({
    address: VILLAGE_ADDRESS,
    abi: villageAbi,
    functionName: "getVillager",
    args: [BigInt(id)],
  });

  return {
    wallet: result.wallet,
    cap: result.cap,
    voteReinvest: result.voteReinvest,
    joinedAt: result.joinedAt,
    isActive: result.isActive,
  };
}

/**
 * Format cap from basis points to a human-readable percentage string.
 * e.g. 10n -> "0.1%", 5000n -> "50%", 10000n -> "100%"
 */
export function formatCap(capBps: bigint): string {
  const pct = Number(capBps) / 100;
  // Drop trailing zeros: 50.0 -> "50", 0.1 -> "0.1"
  return `${pct}%`;
}

/**
 * Format a Unix timestamp (seconds) to a readable date string.
 * e.g. "Jun 15, 2025"
 */
export function formatJoinedAt(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toLowerCase();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
}
