import { createPublicClient, http, formatUnits } from "viem";
import { base } from "viem/chains";

export const PRESEED_ADDRESS =
  "0xbFC98d013Ee9647771eBb0cA6669642979BE94e2" as const;

export const preseedAbi = [
  {
    name: "agreement",
    type: "function",
    stateMutability: "pure",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    name: "getAllInvestments",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "villagerId", type: "uint256" },
          { name: "amount", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getInvestorIds",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256[]" }],
  },
  {
    name: "getTotalInvested",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "villagerId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "totalRaised",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "isComplete",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "remaining",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

const client = createPublicClient({
  chain: base,
  transport: http(),
});

export async function getAgreement(): Promise<string> {
  return client.readContract({
    address: PRESEED_ADDRESS,
    abi: preseedAbi,
    functionName: "agreement",
  });
}

export type InvestmentRecord = {
  villagerId: bigint;
  amount: bigint;
  timestamp: bigint;
};

export type AggregatedInvestor = {
  villagerId: string;
  totalAmount: bigint;
};

export async function getAllInvestments(): Promise<InvestmentRecord[]> {
  const result = await client.readContract({
    address: PRESEED_ADDRESS,
    abi: preseedAbi,
    functionName: "getAllInvestments",
  });
  return result as InvestmentRecord[];
}

export async function getInvestorIds(): Promise<bigint[]> {
  const result = await client.readContract({
    address: PRESEED_ADDRESS,
    abi: preseedAbi,
    functionName: "getInvestorIds",
  });
  return result as bigint[];
}

export async function getTotalInvested(villagerId: bigint): Promise<bigint> {
  return client.readContract({
    address: PRESEED_ADDRESS,
    abi: preseedAbi,
    functionName: "getTotalInvested",
    args: [villagerId],
  });
}

export async function getAggregatedInvestors(): Promise<AggregatedInvestor[]> {
  const ids = await getInvestorIds();
  const totals = await Promise.all(ids.map((id) => getTotalInvested(id)));
  return ids.map((id, i) => ({
    villagerId: id.toString(),
    totalAmount: totals[i],
  }));
}

/** Format a USDC amount (6 decimals) to a display string like "$25,000" */
export function formatUSDC(amount: bigint): string {
  const num = Number(formatUnits(amount, 6));
  return (
    "$" +
    num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}
