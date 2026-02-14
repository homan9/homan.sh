// ── Shared scene tuning ───────────────────────────────
export const EASE_EXPONENT = 4; // easing curve sharpness (2=quad, 3=cubic, 4+=extreme)
export const SIGMOID_K = 18; // S-curve steepness (higher = sharper transition)
export const CIRCLE_R = 160; // circle radius (svg units)
export const VIEW = 300; // max rendered size (px)
export const STROKE_COLOR = "rgba(17,17,17,0.1)";

// ── Shared animation timing (ms) ──────────────────────
export const ANIM_START = 0; // delay before animation begins
export const ANIM_DURATION = 1000; // total duration of animation sequence

// ── Derived geometry ──────────────────────────────────
export const CX = VIEW / 2;
export const CIRC = 2 * Math.PI * CIRCLE_R;

// Square circumscribes the circle exactly
export const SQ_INSET = CX - CIRCLE_R;
export const SQ_SIZE = CIRCLE_R * 2;

// ── Easing ────────────────────────────────────────────
// Symmetric ease-in-out powered by EASE_EXPONENT.
// Accelerates for the first half, decelerates for the second half.
// The takeoff and landing curves are mirror images.
//   n=2 → quadratic (gentle)
//   n=3 → cubic (default)
//   n=4+ → increasingly snappy start/stop with fast middle
const n = EASE_EXPONENT;
const half = Math.pow(2, n - 1);

export function ease(t: number): number {
  return t < 0.5 ? half * Math.pow(t, n) : 1 - Math.pow(-2 * t + 2, n) / 2;
}

// Inverse of ease: given a progress p ∈ [0,1], return the
// time fraction t ∈ [0,1] at which ease(t) = p.
export function easeInverse(p: number): number {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  if (p < 0.5) {
    return Math.pow(p / half, 1 / n);
  }
  return 1 - Math.pow(2 * (1 - p), 1 / n) / 2;
}

// ── S-curve geometry (sigmoid) ────────────────────────
// Normalized sigmoid mapped to hit exact corners of the square.
const S_MIN = 1 / (1 + Math.exp(SIGMOID_K / 2));
const S_MAX = 1 / (1 + Math.exp(-SIGMOID_K / 2));
const S_RANGE = S_MAX - S_MIN;

function sigmoid(nx: number): number {
  const raw = 1 / (1 + Math.exp(-SIGMOID_K * (nx - 0.5)));
  return (raw - S_MIN) / S_RANGE;
}

const CURVE_STEPS = 200;
const curveCoords: [number, number][] = [];
const curveLengths: number[] = [0];

for (let i = 0; i <= CURVE_STEPS; i++) {
  const nx = i / CURVE_STEPS;
  const x = SQ_INSET + nx * SQ_SIZE;
  const y = SQ_INSET + SQ_SIZE - sigmoid(nx) * SQ_SIZE;
  curveCoords.push([x, y]);
  if (i > 0) {
    const dx = x - curveCoords[i - 1][0];
    const dy = y - curveCoords[i - 1][1];
    curveLengths.push(curveLengths[i - 1] + Math.sqrt(dx * dx + dy * dy));
  }
}

export const CURVE_LENGTH = curveLengths[curveLengths.length - 1];

export const CURVE_PATH = curveCoords
  .map(([x, y], i) =>
    i === 0
      ? `M${x.toFixed(1)},${y.toFixed(1)}`
      : `L${x.toFixed(1)},${y.toFixed(1)}`,
  )
  .join(" ");

// Arc length at a given x-progress fraction (0–1)
export function arcLengthAt(progress: number): number {
  const idx = progress * CURVE_STEPS;
  const lo = Math.floor(idx);
  const hi = Math.min(Math.ceil(idx), CURVE_STEPS);
  if (lo === hi) return curveLengths[lo];
  const frac = idx - lo;
  return curveLengths[lo] + frac * (curveLengths[hi] - curveLengths[lo]);
}

// ── Shared keyframe builders ──────────────────────────

// S-curve keyframes: x-progress follows ease(t), mapped to arc length
export function buildCurveKeyframes(name: string): string {
  const frames: string[] = [];
  for (let pct = 0; pct <= 100; pct++) {
    const xProgress = ease(pct / 100);
    const drawn = arcLengthAt(xProgress);
    const offset = CURVE_LENGTH - drawn;
    frames.push(`${pct}% { stroke-dashoffset: ${offset.toFixed(2)}; }`);
  }
  return `@keyframes ${name} {\n  ${frames.join("\n  ")}\n}`;
}

// Square opacity follows ease(t)
export function buildSquareKeyframes(name: string): string {
  const frames: string[] = [];
  for (let pct = 0; pct <= 100; pct++) {
    const opacity = ease(pct / 100);
    frames.push(`${pct}% { opacity: ${opacity.toFixed(4)}; }`);
  }
  return `@keyframes ${name} {\n  ${frames.join("\n  ")}\n}`;
}
