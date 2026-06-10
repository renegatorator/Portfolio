import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

import { HUD_ARC_POINTS } from '@/constants/background';
import type { HudRingArc, HudTicksConfig } from '@/types/background';

export const FULL_CIRCLE = Math.PI * 2;
const STUB_COUNT = 3;
const STUB_ANGLE_STEP = FULL_CIRCLE / STUB_COUNT;

export const createArcBandGeometry = (
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

export const mergeBandGeometries = (geometries: THREE.BufferGeometry[]) => {
  const valid = geometries.filter(
    (geometry): geometry is THREE.BufferGeometry => geometry !== null,
  );

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

export const createRingBandGeometry = (
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

export const createDashedRingBandGeometry = (
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
const createQuadGeometry = (width: number, height: number) =>
  new THREE.PlaneGeometry(width, height);

export const placeQuad = (
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

export const createTicksBandGeometry = ({ radius, count, length, width }: HudTicksConfig) =>
  createDataCoreTicksGeometry(radius, count, length, width);

export const createDataCoreTicksGeometry = (
  radius: number,
  count: number,
  length: number,
  width: number,
) =>
  mergeBandGeometries(
    Array.from({ length: count }, (_, tick) => {
      const angle = (tick / count) * FULL_CIRCLE;
      const midRadius = radius + length / 2;

      return placeQuad(
        width,
        length,
        Math.cos(angle) * midRadius,
        Math.sin(angle) * midRadius,
        angle,
      );
    }),
  );

export const createRingNodesGeometry = (
  radius: number,
  nodeRadius: number,
  angles: readonly number[],
) =>
  mergeBandGeometries(
    angles.flatMap((angle) => {
      const geometry = createCoreNodeGeometry(nodeRadius);

      if (!geometry) {
        return [];
      }

      geometry.translate(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);

      return [geometry];
    }),
  );

export const createCoreNodeGeometry = (coreRadius: number) =>
  createRingBandGeometry(coreRadius, coreRadius * 1.6, [{ start: 0, end: FULL_CIRCLE }]);

export const createLinkMarkGeometry = (
  hubRadius: number,
  stubLength: number,
  stubWidth: number,
  stubAngle: number,
) => {
  const geometries: THREE.BufferGeometry[] = [];
  const hubGeometry = createCoreNodeGeometry(hubRadius);

  if (hubGeometry) {
    geometries.push(hubGeometry);
  }

  for (let stub = 0; stub < STUB_COUNT; stub++) {
    const angle = stubAngle + stub * STUB_ANGLE_STEP;
    const midRadius = hubRadius + stubLength / 2;

    geometries.push(
      placeQuad(
        stubWidth,
        stubLength,
        Math.cos(angle) * midRadius,
        Math.sin(angle) * midRadius,
        angle,
      ),
    );
  }

  return mergeBandGeometries(geometries);
};
