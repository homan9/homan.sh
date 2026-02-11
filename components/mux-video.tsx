"use client";

import MuxPlayer from "@mux/mux-player-react";

type MuxVideoProps = {
  playbackId: string;
  title?: string;
};

export default function MuxVideo({ playbackId, title }: MuxVideoProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{ video_title: title }}
      accentColor="#111111"
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 6,
        overflow: "hidden",
      }}
    />
  );
}
