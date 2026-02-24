"use client";

import MuxPlayer from "@mux/mux-player-react";

type MuxVideoProps = {
  playbackId: string;
  title?: string;
  thumbnailTime?: number;
};

export default function MuxVideo({
  playbackId,
  title,
  thumbnailTime,
}: MuxVideoProps) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <MuxPlayer
        playbackId={playbackId}
        metadata={{ video_title: title }}
        accentColor="#111111"
        thumbnailTime={thumbnailTime}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
