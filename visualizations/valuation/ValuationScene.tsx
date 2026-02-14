"use client";

import { useState, useCallback, useEffect } from "react";
import {
  VIEW,
  STROKE_COLOR,
  ANIM_START,
  ANIM_DURATION,
  CX,
  SQ_INSET,
  SQ_SIZE,
  CURVE_LENGTH,
  CURVE_PATH,
  buildCurveKeyframes,
  buildSquareKeyframes,
} from "../core";
import "../core.css";

export default function ValuationScene() {
  const [mounted, setMounted] = useState(false);
  const [key, setKey] = useState(0);
  const replay = useCallback(() => setKey((k) => k + 1), []);

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <div
        className="vis-scene"
        style={{ aspectRatio: "1 / 1", maxWidth: VIEW }}
      />
    );

  const curveName = `val-curve-${key}`;
  const squareName = `val-square-${key}`;

  return (
    <div
      className="vis-scene"
      onClick={replay}
      onMouseEnter={replay}
      style={{ maxWidth: VIEW }}
    >
      <style>
        {buildCurveKeyframes(curveName)}
        {"\n"}
        {buildSquareKeyframes(squareName)}
      </style>
      <svg
        key={key}
        viewBox={`${SQ_INSET} ${SQ_INSET} ${SQ_SIZE} ${SQ_SIZE}`}
        width="100%"
      >
        {/* Square — fades in on the ease curve */}
        <rect
          x={SQ_INSET}
          y={SQ_INSET}
          width={SQ_SIZE}
          height={SQ_SIZE}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth={1}
          style={{
            opacity: 0,
            animation: `${squareName} ${ANIM_DURATION}ms linear forwards`,
            animationDelay: `${ANIM_START}ms`,
          }}
        />

        {/* S-curve — economic growth sigmoid */}
        <path
          d={CURVE_PATH}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth={1}
          style={{
            strokeDasharray: CURVE_LENGTH,
            strokeDashoffset: CURVE_LENGTH,
            animation: `${curveName} ${ANIM_DURATION}ms linear forwards`,
            animationDelay: `${ANIM_START}ms`,
          }}
        />

        {/* Question mark — center */}
        <text
          x={CX}
          y={CX}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(17, 17, 17, 0.2)"
          fontSize={20}
          style={{
            fontFamily: "var(--font-geist-sans, Inter, sans-serif)",
            opacity: 0,
            animation: `${squareName} ${ANIM_DURATION}ms linear forwards`,
            animationDelay: `${ANIM_START}ms`,
          }}
        >
          ?
        </text>
      </svg>
    </div>
  );
}
