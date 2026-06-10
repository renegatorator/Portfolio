import * as THREE from 'three';

import type {
  BackgroundPalette,
  HudDataCoreConfig,
  HudDataCoreNodeRing,
  HudDataCoreRing,
  HudRingArc,
} from '@/types/background';

import {
  createCoreNodeGeometry,
  createDataCoreTicksGeometry,
  createRingBandGeometry,
  createRingNodesGeometry,
  FULL_CIRCLE,
} from './hudGeometry';

const ACCENT_OPACITY_SCALE = 1.8;
const TWO_PI = FULL_CIRCLE;

interface DataCoreLayerMaterial {
  material: THREE.MeshBasicMaterial;
  baseOpacity: number;
  layerIndex: number;
}

export interface DataCoreUserData {
  kind: 'dataCore';
  layerMaterials: DataCoreLayerMaterial[];
  coreMaterial: THREE.MeshBasicMaterial | undefined;
  coreBaseOpacity: number;
  pulseConfig: HudDataCoreConfig['pulse'];
  rotationSpeed: number;
}

const createRingMaterial = (
  color: string,
  baseOpacity: number,
  accent: boolean,
): THREE.MeshBasicMaterial =>
  new THREE.MeshBasicMaterial({
    color,
    opacity: accent ? Math.min(baseOpacity * ACCENT_OPACITY_SCALE, 1) : baseOpacity,
    transparent: true,
    depthWrite: false,
  });

const trackMaterial = (
  material: THREE.MeshBasicMaterial,
  layerMaterials: DataCoreLayerMaterial[],
  materials: THREE.MeshBasicMaterial[],
  layerIndex: number,
) => {
  materials.push(material);
  layerMaterials.push({ material, baseOpacity: material.opacity, layerIndex });
};

const addArcRingMeshes = (
  container: THREE.Group,
  ring: HudDataCoreRing,
  palette: BackgroundPalette,
  baseOpacity: number,
  layerIndex: number,
  layerMaterials: DataCoreLayerMaterial[],
  materials: THREE.MeshBasicMaterial[],
) => {
  const wholePartAccent = ring.emphasis === 'accent';
  const baseArcs = ring.arcs.filter((arc) => arc.emphasis !== 'accent');
  const accentArcs = ring.arcs.filter((arc) => arc.emphasis === 'accent');

  const addBand = (arcs: ReadonlyArray<HudRingArc>, accent: boolean) => {
    const geometry = createRingBandGeometry(ring.radius, ring.thickness, arcs);

    if (!geometry) {
      return;
    }

    const material = createRingMaterial(palette.hud, baseOpacity, accent);
    const mesh = new THREE.Mesh(geometry, material);

    container.add(mesh);
    trackMaterial(material, layerMaterials, materials, layerIndex);
  };

  if (wholePartAccent) {
    addBand(ring.arcs, true);
    return;
  }

  if (baseArcs.length > 0) {
    addBand(baseArcs, false);
  }

  if (accentArcs.length > 0) {
    addBand(accentArcs, true);
  }
};

const addRotatingLayer = (
  group: THREE.Group,
  rotationSpeed: number,
  build: (container: THREE.Group) => void,
) => {
  const layerGroup = new THREE.Group();

  layerGroup.userData.rotationSpeed = rotationSpeed;
  build(layerGroup);
  group.add(layerGroup);
};

export const createDataCoreGroup = (
  part: HudDataCoreConfig,
  palette: BackgroundPalette,
  baseOpacity: number,
): { group: THREE.Group; materials: THREE.MeshBasicMaterial[] } => {
  const group = new THREE.Group();
  const materials: THREE.MeshBasicMaterial[] = [];
  const layerMaterials: DataCoreLayerMaterial[] = [];
  let layerIndex = 0;

  const coreGeometry = createCoreNodeGeometry(part.coreRadius);

  if (coreGeometry) {
    const coreMaterial = createRingMaterial(palette.hud, baseOpacity, false);

    group.add(new THREE.Mesh(coreGeometry, coreMaterial));
    materials.push(coreMaterial);
  }

  const coreMaterial = materials[materials.length - 1];
  const coreBaseOpacity = coreMaterial?.opacity ?? baseOpacity;

  part.rings.forEach((ring) => {
    const currentLayerIndex = layerIndex;

    layerIndex += 1;
    addRotatingLayer(group, ring.rotationSpeed, (container) => {
      addArcRingMeshes(
        container,
        ring,
        palette,
        baseOpacity,
        currentLayerIndex,
        layerMaterials,
        materials,
      );
    });
  });

  part.ticks?.forEach((tickRing) => {
    const currentLayerIndex = layerIndex;

    layerIndex += 1;
    addRotatingLayer(group, tickRing.rotationSpeed, (container) => {
      const geometry = createDataCoreTicksGeometry(
        tickRing.radius,
        tickRing.count,
        tickRing.length,
        tickRing.width,
      );

      if (!geometry) {
        return;
      }

      const material = createRingMaterial(
        palette.hud,
        baseOpacity,
        tickRing.emphasis === 'accent',
      );

      container.add(new THREE.Mesh(geometry, material));
      trackMaterial(material, layerMaterials, materials, currentLayerIndex);
    });
  });

  part.nodes?.forEach((nodeRing) => {
    const currentLayerIndex = layerIndex;

    layerIndex += 1;
    addRotatingLayer(group, nodeRing.rotationSpeed, (container) => {
      addNodeRingMeshes(
        container,
        nodeRing,
        palette,
        baseOpacity,
        currentLayerIndex,
        layerMaterials,
        materials,
      );
    });
  });

  group.userData = {
    kind: 'dataCore',
    layerMaterials,
    coreMaterial,
    coreBaseOpacity,
    pulseConfig: part.pulse,
    rotationSpeed: part.rotationSpeed,
  } satisfies DataCoreUserData;

  group.userData.rotationSpeed = part.rotationSpeed;

  return { group, materials };
};

const addNodeRingMeshes = (
  container: THREE.Group,
  nodeRing: HudDataCoreNodeRing,
  palette: BackgroundPalette,
  baseOpacity: number,
  layerIndex: number,
  layerMaterials: DataCoreLayerMaterial[],
  materials: THREE.MeshBasicMaterial[],
) => {
  const geometry = createRingNodesGeometry(nodeRing.radius, nodeRing.nodeRadius, nodeRing.angles);

  if (!geometry) {
    return;
  }

  const material = createRingMaterial(
    palette.hud,
    baseOpacity,
    nodeRing.emphasis === 'accent',
  );
  const mesh = new THREE.Mesh(geometry, material);

  container.add(mesh);
  trackMaterial(material, layerMaterials, materials, layerIndex);
};

export const updateDataCoreGroup = (
  group: THREE.Group,
  elapsedTime: number,
  delta: number,
  animated: boolean,
) => {
  const userData = group.userData as DataCoreUserData;

  group.children.forEach((child) => {
    const rotationSpeed = child.userData.rotationSpeed as number | undefined;

    if (rotationSpeed !== undefined) {
      child.rotation.z += rotationSpeed * delta;
    }
  });

  const resetLayerOpacities = () => {
    userData.layerMaterials.forEach(({ material, baseOpacity }) => {
      material.opacity = baseOpacity;
    });
  };

  if (!animated) {
    if (userData.coreMaterial) {
      userData.coreMaterial.opacity = userData.coreBaseOpacity;
    }

    resetLayerOpacities();
    return;
  }

  const pulsePhase = (elapsedTime / userData.pulseConfig.period) * TWO_PI;

  if (userData.coreMaterial) {
    userData.coreMaterial.opacity =
      userData.coreBaseOpacity *
      (1 + userData.pulseConfig.opacityAmplitude * Math.sin(pulsePhase));
  }

  userData.layerMaterials.forEach(({ material, baseOpacity, layerIndex }) => {
    material.opacity =
      baseOpacity *
      (1 +
        userData.pulseConfig.opacityAmplitude *
          Math.sin(pulsePhase + layerIndex * userData.pulseConfig.phaseStep));
  });
};

export const isDataCoreUserData = (
  userData: THREE.Object3D['userData'],
): userData is DataCoreUserData => userData.kind === 'dataCore';
