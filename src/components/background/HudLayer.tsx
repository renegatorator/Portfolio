import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

import { HUD_ARC_POINTS, HUD_ELEMENTS, PARALLAX } from '@/constants/background';
import type { BackgroundPalette, HudPartConfig, HudRingArc, HudTicksConfig } from '@/types/background';

interface HudLayerProps {
  palette: BackgroundPalette;
  animated: boolean;
  /** Normalized scroll position from the Scene; drives slow HUD rotation. */
  scrollRef: RefObject<number>;
}

const ACCENT_OPACITY_SCALE = 1.8;
const FULL_CIRCLE = Math.PI * 2;

const createArcBandGeometry = (
  radius: number,
  thickness: number,
  startAngle: number,
  endAngle: number,
  segments = HUD_ARC_POINTS,
) => {
  const arcLength = endAngle - startAngle;

  if (arcLength <= 0) {
    return null;
  }

  const inner = Math.max(radius - thickness / 2, 0.001);
  const outer = radius + thickness / 2;

  return new THREE.RingGeometry(inner, outer, segments, 1, startAngle, arcLength);
};

const mergeBandGeometries = (geometries: THREE.BufferGeometry[]) => {
  const valid = geometries.filter((geometry): geometry is THREE.BufferGeometry => geometry !== null);

  if (valid.length === 0) {
    return null;
  }

  if (valid.length === 1) {
    return valid[0];
  }

  const merged = mergeGeometries(valid, false);

  valid.forEach((geometry) => geometry.dispose());

  return merged;
};

const createRingBandGeometry = (
  radius: number,
  thickness: number,
  arcs: ReadonlyArray<HudRingArc>,
) =>
  mergeBandGeometries(
    arcs.flatMap(({ start, end }) => {
      const geometry = createArcBandGeometry(radius, thickness, start, end);

      return geometry ? [geometry] : [];
    }),
  );

const createDashedRingBandGeometry = (
  radius: number,
  thickness: number,
  dashCount: number,
  dashRatio: number,
) => {
  const slotAngle = FULL_CIRCLE / dashCount;
  const dashAngle = slotAngle * dashRatio;
  const segments = Math.max(4, Math.ceil((dashAngle / FULL_CIRCLE) * HUD_ARC_POINTS));

  return mergeBandGeometries(
    Array.from({ length: dashCount }, (_, dash) => {
      const startAngle = dash * slotAngle;

      return createArcBandGeometry(radius, thickness, startAngle, startAngle + dashAngle, segments);
    }).flatMap((geometry) => (geometry ? [geometry] : [])),
  );
};

/** Thin quad centered at origin, then positioned and rotated into place. */
const createQuadGeometry = (width: number, height: number) => new THREE.PlaneGeometry(width, height);

const placeQuad = (
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  angle: number,
) => {
  const geometry = createQuadGeometry(width, height);

  geometry.rotateZ(angle);
  geometry.translate(centerX, centerY, 0);

  return geometry;
};

const createTicksBandGeometry = ({ radius, count, length, width }: HudTicksConfig) =>
  mergeBandGeometries(
    Array.from({ length: count }, (_, tick) => {
      const angle = (tick / count) * FULL_CIRCLE;
      const midRadius = radius + length / 2;

      return placeQuad(width, length, Math.cos(angle) * midRadius, Math.sin(angle) * midRadius, angle);
    }),
  );

const createReticleBandGeometry = (armLength: number, gap: number, width: number) =>
  mergeBandGeometries(
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].map(([dx, dy]) => {
      const segmentLength = armLength;
      const centerDistance = gap + segmentLength / 2;

      return placeQuad(
        width,
        segmentLength,
        dx * centerDistance,
        dy * centerDistance,
        Math.atan2(dy, dx) + Math.PI / 2,
      );
    }),
  );

const createBracketsBandGeometry = (halfSize: number, armLength: number, width: number) => {
  const geometries: THREE.BufferGeometry[] = [];

  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const cornerX = sx * halfSize;
      const cornerY = sy * halfSize;

      geometries.push(
        placeQuad(
          armLength,
          width,
          cornerX - (sx * armLength) / 2,
          cornerY,
          sx > 0 ? 0 : Math.PI,
        ),
        placeQuad(
          width,
          armLength,
          cornerX,
          cornerY - (sy * armLength) / 2,
          sy > 0 ? -Math.PI / 2 : Math.PI / 2,
        ),
      );
    }
  }

  return mergeBandGeometries(geometries);
};

const createPartGeometry = (part: HudPartConfig): THREE.BufferGeometry | null => {
  switch (part.kind) {
    case 'ring':
      return createRingBandGeometry(part.radius, part.thickness, part.arcs);
    case 'dashedRing':
      return createDashedRingBandGeometry(
        part.radius,
        part.thickness,
        part.dashCount,
        part.dashRatio,
      );
    case 'ticks':
      return createTicksBandGeometry(part);
    case 'reticle':
      return createReticleBandGeometry(part.armLength, part.gap, part.width);
    case 'brackets':
      return createBracketsBandGeometry(part.halfSize, part.armLength, part.width);
  }
};

const resolvePartEmphasis = (part: HudPartConfig) =>
  part.kind === 'ring' ? part.emphasis : part.emphasis;

/** Builds a self-rotating mesh (or small group) for one HUD part. */
const createPartObject = (
  part: HudPartConfig,
  baseMaterial: THREE.MeshBasicMaterial,
  accentMaterial: THREE.MeshBasicMaterial,
) => {
  if (part.kind === 'ring') {
    const baseArcs = part.arcs.filter((arc) => arc.emphasis !== 'accent');
    const accentArcs = part.arcs.filter((arc) => arc.emphasis === 'accent');
    const container = new THREE.Group();
    const wholePartAccent = part.emphasis === 'accent';

    const addBand = (
      arcs: ReadonlyArray<HudRingArc>,
      material: THREE.MeshBasicMaterial,
    ) => {
      const geometry = createRingBandGeometry(part.radius, part.thickness, arcs);

      if (geometry) {
        container.add(new THREE.Mesh(geometry, material));
      }
    };

    if (wholePartAccent) {
      addBand(part.arcs, accentMaterial);
    } else {
      addBand(baseArcs, baseMaterial);
      addBand(accentArcs, accentMaterial);
    }

    container.userData.rotationSpeed = part.rotationSpeed;

    return container;
  }

  const geometry = createPartGeometry(part);

  if (!geometry) {
    const empty = new THREE.Group();
    empty.userData.rotationSpeed = part.rotationSpeed;

    return empty;
  }

  const material = resolvePartEmphasis(part) === 'accent' ? accentMaterial : baseMaterial;
  const mesh = new THREE.Mesh(geometry, material);

  mesh.userData.rotationSpeed = part.rotationSpeed;

  return mesh;
};

/**
 * Each direct child of the returned group is one HUD element whose z-rotation
 * follows scroll (userData.scrollRotationFactor); its children self-rotate at
 * userData.rotationSpeed (rad/s).
 */
const createHudGroup = (palette: BackgroundPalette) => {
  const group = new THREE.Group();
  const materials: THREE.MeshBasicMaterial[] = [];

  HUD_ELEMENTS.forEach(({ position, opacityScale, scrollRotationFactor, parts }) => {
    const baseOpacity = palette.hudOpacity * opacityScale;
    const baseMaterial = new THREE.MeshBasicMaterial({
      color: palette.hud,
      opacity: baseOpacity,
      transparent: true,
      depthWrite: false,
    });
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: palette.hud,
      opacity: Math.min(baseOpacity * ACCENT_OPACITY_SCALE, 1),
      transparent: true,
      depthWrite: false,
    });

    materials.push(baseMaterial, accentMaterial);

    const element = new THREE.Group();

    element.position.set(...position);
    element.userData.scrollRotationFactor = scrollRotationFactor;
    parts.forEach((part) => element.add(createPartObject(part, baseMaterial, accentMaterial)));

    group.add(element);
  });

  return { group, materials };
};

const disposeGroupResources = (group: THREE.Group) => {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
    }
  });
};

const HudLayer = ({ palette, animated, scrollRef }: HudLayerProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Rebuilt only on theme change, which is rare and cheap for a handful of meshes.
  const { group: hudGroup, materials } = useMemo(() => createHudGroup(palette), [palette]);

  useEffect(
    () => () => {
      disposeGroupResources(hudGroup);
      materials.forEach((material) => material.dispose());
    },
    [hudGroup, materials],
  );

  useFrame((_, delta) => {
    if (!animated || !groupRef.current) {
      return;
    }

    const scroll = scrollRef.current;

    groupRef.current.children.forEach((element) => {
      element.rotation.z = THREE.MathUtils.damp(
        element.rotation.z,
        scroll * (element.userData.scrollRotationFactor as number),
        PARALLAX.damping,
        delta,
      );

      element.children.forEach((part) => {
        part.rotation.z += (part.userData.rotationSpeed as number) * delta;
      });
    });
  });

  return <primitive ref={groupRef} object={hudGroup} />;
};

export default HudLayer;
