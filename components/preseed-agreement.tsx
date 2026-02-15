"use client";

import React, { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { PRESEED_ADDRESS, preseedAbi } from "@/lib/preseed";
import OnchainView from "@/components/onchain-view";

function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      {[100, 95, 80, 90, 60].map((width, i) => (
        <div
          key={i}
          style={{
            height: 14,
            width: `${width}%`,
            borderRadius: 4,
            background: "rgba(17, 17, 17, 0.05)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
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

export default function PreseedAgreement() {
  const [agreement, setAgreement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = createPublicClient({
      chain: base,
      transport: http(),
    });

    client
      .readContract({
        address: PRESEED_ADDRESS,
        abi: preseedAbi,
        functionName: "agreement",
      })
      .then((result) => setAgreement(result as string))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load agreement"));
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
          Failed to load agreement.
        </p>
      ) : agreement === null ? (
        <Skeleton />
      ) : (
        <p
          style={{
            fontSize: 14,
            fontWeight: 420,
            letterSpacing: "-0.02em",
            lineHeight: "1.5",
            color: "rgba(17, 17, 17, 0.75)",
            whiteSpace: "pre-wrap",
            margin: 0,
          }}
        >
          {agreement}
        </p>
      )}
    </OnchainView>
  );
}
