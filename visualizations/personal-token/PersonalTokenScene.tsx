"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CIRCLE_R,
  VIEW,
  STROKE_COLOR,
  ANIM_START,
  ANIM_DURATION,
  CX,
  CIRC,
  SQ_INSET,
  SQ_SIZE,
  ease,
  easeInverse,
  CURVE_LENGTH,
  CURVE_PATH,
  buildCurveKeyframes,
  buildSquareKeyframes,
} from "../core";
import "../core.css";
import "./personal-token-scene.css";

// ── Personal-token specific tuning ────────────────────
const SHAREHOLDERS = 33; // number of cap table slices
const POWER_ALPHA = 1.0; // power law exponent (higher = steeper)
const ICON_SCALE = 1.5; // person icon multiplier
const ICON_COLOR = "rgba(17,17,17,0.15)";

// ── Personal-token animation timing (ms) ──────────────
const LINE_DRAW = 0; // single line draw duration
const PERSON_FADE = 150; // icon fade-in duration
const PERSON_DELAY = 0; // icon fade-in delay

// ── Cap table angles (power law) ──────────────────────
function computeAngles(): number[] {
  const weights: number[] = [];
  let sum = 0;
  for (let i = 1; i <= SHAREHOLDERS; i++) {
    const w = 1 / Math.pow(i, POWER_ALPHA);
    weights.push(w);
    sum += w;
  }
  const scale = 360 / sum;
  const result: number[] = [0];
  let cum = 0;
  for (const w of weights) {
    cum += w * scale;
    result.push(cum);
  }
  return result.slice(0, -1);
}

const ANGLES = computeAngles();

// ── Personal-token keyframe builders ──────────────────

// Spin keyframes: uniform 1%-step time samples → ease(t) * 360°
function buildSpinKeyframes(name: string): string {
  const frames: string[] = [];
  for (let pct = 0; pct <= 100; pct++) {
    const angle = ease(pct / 100) * 360;
    frames.push(`${pct}% { transform: rotate(${angle.toFixed(1)}deg); }`);
  }
  return `@keyframes ${name} {\n  ${frames.join("\n  ")}\n}`;
}

// Circle keyframes: uniform 1%-step time samples → stroke-dashoffset
function buildCircleKeyframes(name: string): string {
  const frames: string[] = [];
  for (let pct = 0; pct <= 100; pct++) {
    const angle = ease(pct / 100) * 360;
    const offset = CIRC * (1 - angle / 360);
    frames.push(`${pct}% { stroke-dashoffset: ${offset.toFixed(2)}; }`);
  }
  return `@keyframes ${name} {\n  ${frames.join("\n  ")}\n}`;
}

// ── Component ─────────────────────────────────────────

export default function PersonalTokenScene() {
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

  const spinName = `pt-spin-${key}`;
  const circleName = `pt-circle-${key}`;
  const curveName = `pt-curve-${key}`;
  const squareName = `pt-square-${key}`;

  return (
    <div
      className="vis-scene"
      onClick={replay}
      onMouseEnter={replay}
      style={
        {
          maxWidth: VIEW,
          "--circle-r": CIRCLE_R,
          "--line-draw": `${LINE_DRAW}ms`,
          "--person-fade": `${PERSON_FADE}ms`,
          "--person-delay": `${PERSON_DELAY}ms`,
        } as React.CSSProperties
      }
    >
      <style>
        {buildSpinKeyframes(spinName)}
        {"\n"}
        {buildCircleKeyframes(circleName)}
        {"\n"}
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

        {/* Circle — draws on synced with lines */}
        <circle
          cx={CX}
          cy={CX}
          r={CIRCLE_R}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth={1}
          style={{
            strokeDasharray: CIRC,
            strokeDashoffset: CIRC,
            transform: `rotate(-90deg)`,
            transformOrigin: `${CX}px ${CX}px`,
            animation: `${circleName} ${ANIM_DURATION}ms linear forwards`,
            animationDelay: `${ANIM_START}ms`,
          }}
        />

        {/* Radial lines — cap table partitions */}
        {ANGLES.map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const angularProgress = a / 360;
          const timeFraction = easeInverse(angularProgress);
          const delay = ANIM_START + timeFraction * ANIM_DURATION;
          return (
            <line
              key={i}
              x1={CX}
              y1={CX}
              x2={CX + CIRCLE_R * Math.sin(rad)}
              y2={CX - CIRCLE_R * Math.cos(rad)}
              stroke={STROKE_COLOR}
              strokeWidth={1}
              className="pt-line"
              style={{ "--delay": `${delay}ms` } as React.CSSProperties}
            />
          );
        })}

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

        {/* Person icon — spins in sync with lines */}
        <g transform={`translate(${CX}, ${CX})`}>
          <g
            className="pt-person-spin"
            style={{
              animation: `${spinName} ${ANIM_DURATION}ms linear forwards`,
              animationDelay: `${ANIM_START}ms`,
            }}
          >
            <g
              className="pt-person-fade"
              transform={`scale(${ICON_SCALE}) translate(-8, -8)`}
            >
              <path
                d="M8 3C8.82843 3 9.5 2.32843 9.5 1.5C9.5 0.671573 8.82843 0 8 0C7.17157 0 6.5 0.671573 6.5 1.5C6.5 2.32843 7.17157 3 8 3Z"
                fill={ICON_COLOR}
              />
              <path
                d="M4.67148 6C5.89632 6 6.83343 7.09104 6.64857 8.30185L6.43 9.73346C6.3381 10.2159 6.1906 10.6874 6 11.1401L4.33 15.2L5.92164 15.888L7.594 11.9162C7.72668 11.6011 8.27332 11.6011 8.406 11.9162L10.0784 15.888L11.67 15.2L10 11.1401C9.8094 10.6874 9.6619 10.2159 9.57 9.73346L9.2835 8.42904C9.00946 7.18131 9.95947 6 11.2369 6H14V4.5H2V6H4.67148Z"
                fill={ICON_COLOR}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
