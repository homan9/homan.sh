"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPublicClient, http, formatUnits } from "viem";
import { base } from "viem/chains";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PRESEED_ADDRESS, preseedAbi } from "@/lib/preseed";
import OnchainView from "@/components/onchain-view";
import { GeistMono } from "geist/font/mono";

type InvestorDisplay = {
  villagerId: string;
  displayName: string;
  profilePicSrc: string;
  totalAmount: string;
};

function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 0",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(17, 17, 17, 0.05)",
              flexShrink: 0,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              height: 14,
              width: 100,
              borderRadius: 4,
              background: "rgba(17, 17, 17, 0.05)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              height: 14,
              width: 60,
              borderRadius: 4,
              background: "rgba(17, 17, 17, 0.05)",
              marginLeft: "auto",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function formatUSDC(amount: bigint): string {
  const num = Number(formatUnits(amount, 6));
  return (
    "$" +
    num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

export default function PreseedInvestors() {
  const [investors, setInvestors] = useState<InvestorDisplay[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const client = createPublicClient({
          chain: base,
          transport: http(),
        });

        const [allInvestments, villagersSnap] = await Promise.all([
          client.readContract({
            address: PRESEED_ADDRESS,
            abi: preseedAbi,
            functionName: "getAllInvestments",
          }),
          getDocs(collection(db, "villagers")),
        ]);

        const records = allInvestments as {
          villagerId: bigint;
          amount: bigint;
          timestamp: bigint;
        }[];

        if (records.length === 0) {
          setInvestors([]);
          return;
        }

        // Aggregate totals by villagerId
        const totalsMap = new Map<string, bigint>();
        for (const r of records) {
          const idStr = r.villagerId.toString();
          totalsMap.set(idStr, (totalsMap.get(idStr) ?? 0n) + r.amount);
        }

        const villagersMap = new Map<
          string,
          { displayName: string; profilePicSrc: string }
        >();
        villagersSnap.docs.forEach((doc) => {
          const data = doc.data();
          villagersMap.set(doc.id, {
            displayName: data.displayName ?? doc.id,
            profilePicSrc: data.profilePicSrc ?? "",
          });
        });

        const result: InvestorDisplay[] = Array.from(totalsMap.entries()).map(
          ([idStr, total]) => {
            const villager = villagersMap.get(idStr);
            return {
              villagerId: idStr,
              displayName: villager?.displayName ?? `villager ${idStr}`,
              profilePicSrc: villager?.profilePicSrc ?? "",
              totalAmount: formatUSDC(total),
            };
          },
        );

        setInvestors(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load investments",
        );
      }
    }

    load();
  }, []);

  return (
    <OnchainView contractAddress={PRESEED_ADDRESS}>
      {error ? (
        <p
          style={{
            fontSize: 14,
            color: "rgba(17, 17, 17, 0.4)",
            fontWeight: 450,
            letterSpacing: "-0.025em",
          }}
        >
          Failed to load investments.
        </p>
      ) : investors === null ? (
        <Skeleton />
      ) : investors.length === 0 ? (
        <p
          style={{
            fontSize: 14,
            color: "rgba(17, 17, 17, 0.4)",
            fontWeight: 450,
            letterSpacing: "-0.025em",
          }}
        >
          No investments yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {investors.map((investor) => (
            <li key={investor.villagerId}>
              <a
                href={`/villager/${investor.villagerId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  margin: "0 -0.75rem",
                  width: "calc(100% + 1.5rem)",
                  borderRadius: 6,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background 0.15s ease",
                }}
                className="preseed-investor-row"
              >
                {investor.profilePicSrc ? (
                  <Image
                    src={investor.profilePicSrc}
                    alt={investor.displayName}
                    width={32}
                    height={32}
                    style={{ borderRadius: "50%", flexShrink: 0 }}
                  />
                ) : (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#e4e4e7",
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 480,
                    letterSpacing: "-0.03em",
                    color: "#111",
                  }}
                >
                  {investor.displayName}
                </span>
                <span
                  className={GeistMono.className}
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "rgba(17, 17, 17, 0.3)",
                    marginLeft: "auto",
                    letterSpacing: "0",
                  }}
                >
                  {investor.totalAmount}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </OnchainView>
  );
}
