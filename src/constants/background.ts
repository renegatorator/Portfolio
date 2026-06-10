import { Theme, Themes } from '@/constants/theme';
import type {
  BackgroundPalette,
  BackgroundTierConfig,
  DataFlowConfig,
  FieldBounds,
  HudElementConfig,
  MicroDetailConfig,
} from '@/types/background';

export const BackgroundTiers = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
} as const;

export type BackgroundTier = (typeof BackgroundTiers)[keyof typeof BackgroundTiers];

export const BACKGROUND_TIER_CONFIGS: Record<BackgroundTier, BackgroundTierConfig> = {
  [BackgroundTiers.DESKTOP]: {
    particleCount: 180,
    connectionDistance: 1.9,
    maxSegmentsPerParticle: 3,
    showHud: true,
    showMicroDetails: true,
    pulseCount: 10,
  },
  [BackgroundTiers.TABLET]: {
    particleCount: 110,
    connectionDistance: 2.1,
    maxSegmentsPerParticle: 3,
    showHud: true,
    showMicroDetails: true,
    pulseCount: 7,
  },
  [BackgroundTiers.MOBILE]: {
    particleCount: 60,
    connectionDistance: 2.3,
    maxSegmentsPerParticle: 3,
    showHud: false,
    showMicroDetails: false,
    pulseCount: 4,
  },
};

// Sized so the field comfortably overflows the camera frustum at every aspect ratio.
export const FIELD_BOUNDS: FieldBounds = { x: 9, y: 5.5, z: 2.5 };

/** Per-axis particle velocity range, world units per second. */
export const PARTICLE_SPEED = { min: 0.04, max: 0.14 } as const;

export const PARTICLE_SIZE = 0.15;

/** Resolution of the runtime-generated radial glow sprite. */
export const GLOW_TEXTURE_SIZE = 64;

/** Clamp for frame delta so the simulation doesn't jump after a background tab resumes. */
export const MAX_FRAME_DELTA_S = 0.1;

export const CAMERA = {
  position: [0, 0, 10] as [number, number, number],
  fov: 55,
  near: 0.1,
  far: 40,
} as const;

/** Device-pixel-ratio bounds; PerformanceMonitor toggles between them under load. */
export const DPR_RANGE = { min: 1, max: 1.5 } as const;

export const PARALLAX = {
  /** World units the scene shifts per viewport-height of scroll. */
  yStrength: 0.7,
  /** Radians the scene yaws per viewport-height of scroll. */
  rotationStrength: 0.04,
  /** Smoothing factor for THREE.MathUtils.damp interpolation. */
  damping: 2.5,
} as const;

/**
 * Per-layer multipliers of the base parallax shift — the HUD drifts slightly
 * faster and the microdetails slightly slower than the particle field,
 * creating depth separation between the layers while scrolling.
 */
export const LAYER_PARALLAX = { hud: 1.15, micro: 0.85 } as const;

/** Damping for the smoothed scroll-velocity signal fed to the data-flow pulses. */
export const SCROLL_VELOCITY_DAMPING = 4;

/** Barely-perceptible idle sway of the whole scene (Layer 2: ambient motion). */
export const AMBIENT_SWAY = { frequency: 0.06, amplitude: 0.025 } as const;

const hudDashArcs = (dashCount: number, dashRatio: number) => {
  const slotAngle = (Math.PI * 2) / dashCount;
  const dashAngle = slotAngle * dashRatio;

  return Array.from({ length: dashCount }, (_, dash) => ({
    start: dash * slotAngle,
    end: dash * slotAngle + dashAngle,
  }));
};

const PRIMARY_DATA_CORE = {
  kind: 'dataCore' as const,
  coreRadius: 0.045,
  rings: [
    {
      radius: 0.055,
      thickness: 0.008,
      arcs: [
        { start: 0.3, end: 1.1 },
        { start: 1.8, end: 2.6 },
        { start: 3.4, end: 4.2 },
      ],
      rotationSpeed: 0.25,
    },
    {
      radius: 0.1,
      thickness: 0.012,
      arcs: [{ start: 0, end: Math.PI * 2 }],
      rotationSpeed: 0.12,
    },
    {
      radius: 0.135,
      thickness: 0.01,
      arcs: [
        { start: 0, end: 0.55 },
        { start: 1.2, end: 1.95 },
        { start: 3.0, end: 3.85 },
      ],
      rotationSpeed: -0.2,
    },
    {
      radius: 0.18,
      thickness: 0.025,
      arcs: [
        { start: 0.2, end: 1.4 },
        { start: 2.0, end: 3.2 },
      ],
      rotationSpeed: -0.18,
    },
    {
      radius: 0.22,
      thickness: 0.014,
      arcs: hudDashArcs(16, 0.25),
      rotationSpeed: 0.15,
    },
    {
      radius: 0.28,
      thickness: 0.018,
      arcs: [{ start: 0.8, end: 2.1, emphasis: 'accent' as const }],
      rotationSpeed: 0.22,
    },
    {
      radius: 0.31,
      thickness: 0.01,
      arcs: [
        { start: 0.5, end: 1.0, emphasis: 'accent' as const },
        { start: 2.8, end: 3.3, emphasis: 'accent' as const },
      ],
      rotationSpeed: -0.12,
    },
    {
      radius: 0.34,
      thickness: 0.012,
      arcs: hudDashArcs(10, 0.35),
      rotationSpeed: -0.28,
    },
  ],
  ticks: [
    {
      radius: 0.075,
      count: 16,
      length: 0.04,
      width: 0.008,
      rotationSpeed: 0.08,
    },
    {
      radius: 0.24,
      count: 24,
      length: 0.05,
      width: 0.01,
      rotationSpeed: -0.06,
    },
  ],
  nodes: [
    {
      radius: 0.16,
      nodeRadius: 0.012,
      angles: [0.4, 1.8, 3.2, 4.7],
      rotationSpeed: 0.1,
    },
    {
      radius: 0.3,
      nodeRadius: 0.01,
      angles: [0.9, 2.3, 3.9, 5.2],
      rotationSpeed: -0.14,
      emphasis: 'accent' as const,
    },
  ],
  pulse: { period: 3.2, opacityAmplitude: 0.35, phaseStep: 0.65 },
  rotationSpeed: 0,
};

const SECONDARY_DATA_CORE = {
  kind: 'dataCore' as const,
  coreRadius: 0.063,
  rings: [
    {
      radius: 0.077,
      thickness: 0.011,
      arcs: [
        { start: 0.3, end: 1.1 },
        { start: 1.8, end: 2.6 },
        { start: 3.4, end: 4.2 },
      ],
      rotationSpeed: 0.22,
    },
    {
      radius: 0.14,
      thickness: 0.017,
      arcs: [{ start: 0, end: Math.PI * 2 }],
      rotationSpeed: 0.1,
    },
    {
      radius: 0.19,
      thickness: 0.014,
      arcs: [
        { start: 0, end: 0.55 },
        { start: 1.2, end: 1.95 },
        { start: 3.0, end: 3.85 },
      ],
      rotationSpeed: -0.18,
    },
    {
      radius: 0.25,
      thickness: 0.035,
      arcs: [
        { start: 0.2, end: 1.4 },
        { start: 2.0, end: 3.2 },
      ],
      rotationSpeed: -0.16,
    },
    {
      radius: 0.31,
      thickness: 0.02,
      arcs: hudDashArcs(16, 0.25),
      rotationSpeed: 0.13,
    },
    {
      radius: 0.39,
      thickness: 0.025,
      arcs: [{ start: 0.8, end: 2.1, emphasis: 'accent' as const }],
      rotationSpeed: 0.2,
    },
    {
      radius: 0.43,
      thickness: 0.014,
      arcs: [
        { start: 0.5, end: 1.0, emphasis: 'accent' as const },
        { start: 2.8, end: 3.3, emphasis: 'accent' as const },
      ],
      rotationSpeed: -0.1,
    },
    {
      radius: 0.48,
      thickness: 0.017,
      arcs: hudDashArcs(10, 0.35),
      rotationSpeed: -0.24,
    },
  ],
  ticks: [
    {
      radius: 0.105,
      count: 16,
      length: 0.055,
      width: 0.011,
      rotationSpeed: 0.07,
    },
    {
      radius: 0.34,
      count: 24,
      length: 0.07,
      width: 0.014,
      rotationSpeed: -0.05,
    },
  ],
  nodes: [
    {
      radius: 0.22,
      nodeRadius: 0.017,
      angles: [0.4, 1.8, 3.2, 4.7],
      rotationSpeed: 0.09,
    },
    {
      radius: 0.42,
      nodeRadius: 0.014,
      angles: [0.9, 2.3, 3.9, 5.2],
      rotationSpeed: -0.12,
      emphasis: 'accent' as const,
    },
  ],
  pulse: { period: 3.6, opacityAmplitude: 0.3, phaseStep: 0.6 },
  rotationSpeed: 0,
};

/**
 * Sparse HUD clusters scattered around the scene. Deeper elements get a lower
 * opacityScale so depth reads as fading, not just smaller size.
 */
export const HUD_ELEMENTS: readonly HudElementConfig[] = [
  // Primary segmented-ring instrument, top-right.
  {
    position: [13, 7, -3],
    opacityScale: 1,
    scrollRotationFactor: 0.35,
    parts: [
      {
        kind: 'ring',
        radius: 3.35,
        thickness: 0.015,
        arcs: [{ start: 0, end: Math.PI * 2 }],
        rotationSpeed: 0.05,
      },
      {
        kind: 'ring',
        radius: 3.15,
        thickness: 0.09,
        arcs: [
          { start: 0, end: 1.9 },
          { start: 2.4, end: 3.1 },
          { start: 4.1, end: 5.6, emphasis: 'accent' },
        ],
        rotationSpeed: 0.1,
      },
      {
        kind: 'dashedRing',
        radius: 2.7,
        thickness: 0.07,
        dashCount: 4,
        dashRatio: 0.8,
        rotationSpeed: -0.14,
      },
      {
        kind: 'ring',
        radius: 2.3,
        thickness: 0.04,
        arcs: [
          { start: 0, end: 1.9 },
          { start: 2.4, end: 3.1 },
          { start: 4.1, end: 5.6 },
        ],
        rotationSpeed: 0.16,
      },
      {
        kind: 'ring',
        radius: 2.0,
        thickness: 0.04,
        arcs: [
          { start: 0.6, end: 2.7 },
          { start: 3.6, end: 4.5 },
        ],
        rotationSpeed: -0.12,
      },
      {
        kind: 'ticks',
        radius: 2.45,
        count: 24,
        length: 0.14,
        width: 0.018,
        rotationSpeed: 0.05,
      },
      {
        kind: 'dashedRing',
        radius: 1.6,
        thickness: 0.02,
        dashCount: 16,
        dashRatio: 0.2,
        rotationSpeed: -0.22,
        emphasis: 'accent',
      },
      {
        kind: 'ring',
        radius: 1.25,
        thickness: 0.012,
        arcs: [{ start: 0, end: Math.PI * 2 }],
        rotationSpeed: 0.08,
      },
      PRIMARY_DATA_CORE,
    ],
  },
  // Secondary instrument with data core, bottom-left, deeper and fainter.
  {
    position: [-12, -1, -4.2],
    opacityScale: 0.85,
    scrollRotationFactor: -0.22,
    parts: [
      {
        kind: 'ring',
        radius: 1.35,
        thickness: 0.012,
        arcs: [{ start: 0, end: Math.PI * 2 }],
        rotationSpeed: 0.06,
      },
      SECONDARY_DATA_CORE,
      {
        kind: 'ring',
        radius: 0.95,
        thickness: 0.035,
        arcs: [
          { start: 0.4, end: 1.3 },
          { start: 2.1, end: 2.6 },
          { start: 3.6, end: 4.6, emphasis: 'accent' },
        ],
        rotationSpeed: 0.18,
      },
      {
        kind: 'ring',
        radius: 0.7,
        thickness: 0.03,
        arcs: [
          { start: 1.0, end: 2.4 },
          { start: 4.2, end: 5.1 },
        ],
        rotationSpeed: -0.26,
      },
      {
        kind: 'dashedRing',
        radius: 1.2,
        thickness: 0.095,
        dashCount: 3,
        dashRatio: 0.5,
        rotationSpeed: -0.08,
      },
    ],
  },
  // Tri-node link marks scattered at depth.
  {
    position: [-4.4, 2.7, -5],
    opacityScale: 0.55,
    scrollRotationFactor: 0,
    parts: [
      {
        kind: 'linkMark',
        hubRadius: 0.04,
        stubLength: 0.22,
        stubWidth: 0.025,
        stubAngle: 0.5,
        rotationSpeed: 0,
      },
    ],
  },
  {
    position: [4.8, -2.9, -5.5],
    opacityScale: 0.5,
    scrollRotationFactor: 0,
    parts: [
      {
        kind: 'linkMark',
        hubRadius: 0.038,
        stubLength: 0.18,
        stubWidth: 0.025,
        stubAngle: 1.2,
        rotationSpeed: 0,
      },
    ],
  },
  {
    position: [0.8, 3.4, -6],
    opacityScale: 0.45,
    scrollRotationFactor: 0,
    parts: [
      {
        kind: 'linkMark',
        hubRadius: 0.035,
        stubLength: 0.15,
        stubWidth: 0.025,
        stubAngle: 2.1,
        rotationSpeed: 0.01,
      },
    ],
  },
];

export const HUD_ARC_POINTS = 64;

export const DATA_FLOW: DataFlowConfig = {
  travelDuration: { min: 1.4, max: 2.6 },
  cooldown: { min: 0.8, max: 2.5 },
  retryDelay: 0.5,
  fadePortion: 0.05,
  size: 0.15,
  trailCount: 4,
  trailSpacing: 0.025,
  scrollBoost: 0.4,
  maxScrollBoost: 0.6,
};

export const MICRO_DETAILS: MicroDetailConfig = {
  markerCount: 14,
  markerSize: 0.1,
  gridCount: 3,
  gridCells: 3,
  gridSize: 0.55,
  dashRunCount: 4,
  dashesPerRun: 5,
  dashLength: 0.14,
  dashGap: 0.1,
  extentX: 7.5,
  extentY: 4.2,
  depthRange: [-1, -3.5],
  seed: 1337,
};

/**
 * Alpha multiplier for connection-line vertices at the far edge of the
 * particle field; the near edge stays at 1 (Layer 4: environmental depth).
 */
export const LINE_DEPTH_FADE_MIN = 0.35;

/** Alpha multiplier for microdetail vertices at the far end of their depth range. */
export const MICRO_DEPTH_FADE_MIN = 0.55;

// Hex values mirror the decorative brand palette in src/styles/theme.scss
// ($brand-blue / $brand-cyan) so the canvas matches CSS-driven accents.
const BRAND_BLUE = '#0070f3';
const BRAND_CYAN = '#28b8ff';
// Deeper than the brand blue — the soft glow sprite needs the extra contrast
// to stay visible against the near-white light-theme background.
const LIGHT_DEEP_BLUE = '#0055c8';
// Near-white cyan — with additive blending the pulse heads read as bright
// light packets traveling through the network.
const PULSE_CYAN = '#c2ecff';

export const BACKGROUND_PALETTES: Record<Theme, BackgroundPalette> = {
  [Themes.DARK]: {
    particle: BRAND_CYAN,
    line: BRAND_CYAN,
    hud: BRAND_CYAN,
    pulse: PULSE_CYAN,
    particleOpacity: 1,
    lineOpacity: 0.65,
    hudOpacity: 0.26,
    pulseOpacity: 0.9,
    pulseAdditive: true,
    microOpacity: 0.05,
  },
  [Themes.LIGHT]: {
    particle: LIGHT_DEEP_BLUE,
    line: LIGHT_DEEP_BLUE,
    hud: BRAND_BLUE,
    pulse: BRAND_BLUE,
    particleOpacity: 0.95,
    lineOpacity: 0.6,
    hudOpacity: 0.2,
    pulseOpacity: 0.85,
    pulseAdditive: false,
    microOpacity: 0.07,
  },
};
