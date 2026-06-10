import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { HUD_ELEMENTS, PARALLAX } from '@/constants/background';
import type { BackgroundPalette, HudPartConfig, HudRingArc } from '@/types/background';

import { createDataCoreGroup, isDataCoreUserData, updateDataCoreGroup } from './hudDataCore';
import {
  createDashedRingBandGeometry,
  createLinkMarkGeometry,
  createRingBandGeometry,
  createTicksBandGeometry,
} from './hudGeometry';

interface HudLayerProps {
  palette: BackgroundPalette;
  animated: boolean;
  /** Normalized scroll position from the Scene; drives slow HUD rotation. */
  scrollRef: RefObject<number>;
}

const ACCENT_OPACITY_SCALE = 1.8;

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
    case 'linkMark':
      return createLinkMarkGeometry(
        part.hubRadius,
        part.stubLength,
        part.stubWidth,
        part.stubAngle,
      );
    case 'dataCore':
      return null;
  }
};

const resolvePartEmphasis = (part: HudPartConfig) => {
  if (part.kind === 'ring' || part.kind === 'dashedRing' || part.kind === 'linkMark') {
    return part.emphasis;
  }

  return undefined;
};

/** Builds a self-rotating mesh (or small group) for one HUD part. */
const createPartObject = (
  part: HudPartConfig,
  palette: BackgroundPalette,
  baseOpacity: number,
  baseMaterial: THREE.MeshBasicMaterial,
  accentMaterial: THREE.MeshBasicMaterial,
  extraMaterials: THREE.MeshBasicMaterial[],
) => {
  if (part.kind === 'dataCore') {
    const { group, materials } = createDataCoreGroup(part, palette, baseOpacity);

    extraMaterials.push(...materials);

    return group;
  }

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
    parts.forEach((part) =>
      element.add(
        createPartObject(part, palette, baseOpacity, baseMaterial, accentMaterial, materials),
      ),
    );

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

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const scroll = scrollRef.current;

    groupRef.current.children.forEach((element) => {
      if (animated) {
        element.rotation.z = THREE.MathUtils.damp(
          element.rotation.z,
          scroll * (element.userData.scrollRotationFactor as number),
          PARALLAX.damping,
          delta,
        );
      }

      element.children.forEach((part) => {
        if (isDataCoreUserData(part.userData)) {
          if (animated) {
            part.rotation.z += part.userData.rotationSpeed * delta;
          }

          updateDataCoreGroup(part as THREE.Group, state.clock.elapsedTime, delta, animated);
          return;
        }

        if (animated) {
          part.rotation.z += (part.userData.rotationSpeed as number) * delta;
        }
      });
    });
  });

  return <primitive ref={groupRef} object={hudGroup} />;
};

export default HudLayer;
