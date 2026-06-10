/** Half-extents of the box the particles drift inside, in world units. */
export interface FieldBounds {
  x: number;
  y: number;
  z: number;
}

/** Per-device-tier complexity settings for the background scene. */
export interface BackgroundTierConfig {
  particleCount: number;
  /** Max distance (world units) at which two particles get connected by a line. */
  connectionDistance: number;
  /** Sizes the preallocated line buffer: particleCount * maxSegmentsPerParticle. */
  maxSegmentsPerParticle: number;
  showHud: boolean;
  showMicroDetails: boolean;
  /** Size of the data-flow pulse pool. */
  pulseCount: number;
}

/** Theme-dependent colors and opacities for each background layer. */
export interface BackgroundPalette {
  particle: string;
  line: string;
  hud: string;
  pulse: string;
  particleOpacity: number;
  lineOpacity: number;
  hudOpacity: number;
  pulseOpacity: number;
  /** Additive blending makes pulses glow on dark backgrounds but washes out on light ones. */
  pulseAdditive: boolean;
  microOpacity: number;
}

/**
 * Mutable particle state shared by the particle and line layers.
 * Both typed arrays are laid out as [x0, y0, z0, x1, y1, z1, ...].
 */
export interface ParticleSimulation {
  count: number;
  positions: Float32Array;
  velocities: Float32Array;
}

/** Brighter material variant for key instrument segments. */
export type HudPartEmphasis = 'accent';

/** One arc fragment of a filled ring band; angles in radians. */
export interface HudRingArc {
  start: number;
  end: number;
  emphasis?: HudPartEmphasis;
}

/** A circle of ring fragments for the HUD layer; angles in radians. */
export interface HudRingConfig {
  radius: number;
  /** Band thickness in world units. */
  thickness: number;
  arcs: ReadonlyArray<HudRingArc>;
  /** Self-rotation around z, in radians per second. */
  rotationSpeed: number;
  emphasis?: HudPartEmphasis;
}

/** A sparse circle of short radial tick marks for the HUD layer. */
export interface HudTicksConfig {
  radius: number;
  count: number;
  length: number;
  /** Tick stroke width in world units. */
  width: number;
  rotationSpeed: number;
  emphasis?: HudPartEmphasis;
}

/** One ring layer inside a data-core instrument. */
export interface HudDataCoreRing {
  radius: number;
  thickness: number;
  arcs: ReadonlyArray<HudRingArc>;
  rotationSpeed: number;
  emphasis?: HudPartEmphasis;
}

/** Radial tick marks on a data-core ring. */
export interface HudDataCoreTickRing {
  radius: number;
  count: number;
  length: number;
  width: number;
  rotationSpeed: number;
  emphasis?: HudPartEmphasis;
}

/** Small node dots placed on a data-core ring circumference. */
export interface HudDataCoreNodeRing {
  radius: number;
  nodeRadius: number;
  /** Angles in radians where nodes sit on the ring. */
  angles: readonly number[];
  rotationSpeed: number;
  emphasis?: HudPartEmphasis;
}

/** Animated central data-core instrument for HUD clusters. */
export interface HudDataCoreConfig {
  kind: 'dataCore';
  /** Radius of the central node dot. */
  coreRadius: number;
  rings: ReadonlyArray<HudDataCoreRing>;
  /** Optional inner tick rings for calibration-style detail. */
  ticks?: ReadonlyArray<HudDataCoreTickRing>;
  /** Optional node markers on ring circumferences. */
  nodes?: ReadonlyArray<HudDataCoreNodeRing>;
  pulse: {
    /** Seconds for one full opacity ripple cycle. */
    period: number;
    /** Fraction of base opacity added/subtracted by the pulse wave. */
    opacityAmplitude: number;
    /** Radians of phase offset per layer index for outward propagation. */
    phaseStep: number;
  };
  rotationSpeed: number;
}

/** Tri-node hub mark — a small graph-node glyph scattered at depth. */
export interface HudLinkMarkConfig {
  kind: 'linkMark';
  hubRadius: number;
  stubLength: number;
  stubWidth: number;
  /** First stub angle in radians; others at +120° and +240°. */
  stubAngle: number;
  rotationSpeed: number;
  emphasis?: HudPartEmphasis;
}

/** One self-rotating piece of a HUD element; each kind maps to merged mesh geometry. */
export type HudPartConfig =
  | ({ kind: 'ring' } & HudRingConfig)
  | ({ kind: 'ticks' } & HudTicksConfig)
  | ({ kind: 'dataCore' } & HudDataCoreConfig)
  | ({ kind: 'linkMark' } & HudLinkMarkConfig)
  | {
      kind: 'dashedRing';
      radius: number;
      /** Band thickness in world units. */
      thickness: number;
      /** Number of evenly spaced dashes around the circle. */
      dashCount: number;
      /** Fraction of each slot covered by the dash (0..1). */
      dashRatio: number;
      rotationSpeed: number;
      emphasis?: HudPartEmphasis;
    };

/** A sparse, self-contained HUD cluster placed somewhere in the scene. */
export interface HudElementConfig {
  position: readonly [number, number, number];
  /** Multiplies the palette HUD opacity — deeper/smaller elements fade more. */
  opacityScale: number;
  /** Radians of extra z-rotation per viewport-height of scroll. */
  scrollRotationFactor: number;
  parts: readonly HudPartConfig[];
}

/** Tuning for the traveling data-flow pulses. */
export interface DataFlowConfig {
  /** Seconds a pulse takes to travel its edge. */
  travelDuration: { min: number; max: number };
  /** Idle seconds before an inactive pulse looks for a new route. */
  cooldown: { min: number; max: number };
  /** Retry delay (seconds) when no connected pair is found. */
  retryDelay: number;
  /** Fraction of the travel spent fading in and out. */
  fadePortion: number;
  /** Sprite size, world units. */
  size: number;
  /** Trailing sprites rendered behind each pulse head. */
  trailCount: number;
  /** Progress-units between consecutive trail sprites. */
  trailSpacing: number;
  /** Extra speed per unit of smoothed scroll velocity (viewport-heights/s). */
  scrollBoost: number;
  /** Clamp for the scroll-driven speed bonus. */
  maxScrollBoost: number;
}

/** Layout tuning for the static technical-microdetail layer. */
export interface MicroDetailConfig {
  /** Tiny "+" coordinate markers. */
  markerCount: number;
  markerSize: number;
  /** Small blueprint-like grid fragments. */
  gridCount: number;
  gridCells: number;
  gridSize: number;
  /** Short dashed line runs. */
  dashRunCount: number;
  dashesPerRun: number;
  dashLength: number;
  dashGap: number;
  /** Half-extents of the placement area on x/y. */
  extentX: number;
  extentY: number;
  /** [near, far] z placement range; depth also scales per-vertex alpha. */
  depthRange: readonly [number, number];
  /** Seed for the deterministic layout. */
  seed: number;
}
