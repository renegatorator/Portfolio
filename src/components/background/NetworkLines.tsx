import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import type {
  BackgroundPalette,
  BackgroundTierConfig,
  ParticleSimulation,
} from '@/types/background';

import { writeConnectionSegments } from './particleSimulation';

interface NetworkLinesProps {
  simulation: ParticleSimulation;
  config: BackgroundTierConfig;
  palette: BackgroundPalette;
  animated: boolean;
}

const VERTICES_PER_SEGMENT = 2;
const POSITION_COMPONENTS = 3;
// itemSize 4 (RGBA) enables three's per-vertex alpha, used for the distance fade.
const COLOR_COMPONENTS = 4;

const NetworkLines = ({ simulation, config, palette, animated }: NetworkLinesProps) => {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);

  const { geometry, segmentPositions, segmentColors, maxSegments } = useMemo(() => {
    const segmentBudget = simulation.count * config.maxSegmentsPerParticle;
    const positions = new Float32Array(segmentBudget * VERTICES_PER_SEGMENT * POSITION_COMPONENTS);
    // RGB stays at 1 so the material color drives the hue; only alpha is rewritten.
    const colors = new Float32Array(segmentBudget * VERTICES_PER_SEGMENT * COLOR_COMPONENTS).fill(
      1,
    );

    const positionAttribute = new THREE.BufferAttribute(positions, POSITION_COMPONENTS);
    const colorAttribute = new THREE.BufferAttribute(colors, COLOR_COMPONENTS);

    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    colorAttribute.setUsage(THREE.DynamicDrawUsage);

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', positionAttribute);
    bufferGeometry.setAttribute('color', colorAttribute);

    const segments = writeConnectionSegments(
      simulation,
      config.connectionDistance,
      segmentBudget,
      positions,
      colors,
    );
    bufferGeometry.setDrawRange(0, segments * VERTICES_PER_SEGMENT);

    return {
      geometry: bufferGeometry,
      segmentPositions: positions,
      segmentColors: colors,
      maxSegments: segmentBudget,
    };
  }, [simulation, config]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    if (!animated || !lineSegmentsRef.current) {
      return;
    }

    const segments = writeConnectionSegments(
      simulation,
      config.connectionDistance,
      maxSegments,
      segmentPositions,
      segmentColors,
    );

    const liveGeometry = lineSegmentsRef.current.geometry;

    liveGeometry.setDrawRange(0, segments * VERTICES_PER_SEGMENT);
    liveGeometry.attributes.position.needsUpdate = true;
    liveGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineSegmentsRef} geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial
        color={palette.line}
        vertexColors
        transparent
        opacity={palette.lineOpacity}
        depthWrite={false}
      />
    </lineSegments>
  );
};

export default NetworkLines;
