"use client";

import MuxPlayer from "@mux/mux-player-react";

type MuxVideoProps = {
  playbackId: string;
  title?: string;
};

export default function MuxVideo({ playbackId, title }: MuxVideoProps) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <MuxPlayer
        playbackId={playbackId}
        metadata={{ video_title: title }}
        accentColor="#111111"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
