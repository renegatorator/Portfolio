import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import { BACKGROUND_PALETTES, CAMERA, DPR_RANGE } from '@/constants/background';
import { useBackgroundConfig } from '@/utils/hooks/useBackgroundConfig';
import { useReducedMotion } from '@/utils/hooks/useReducedMotion';
import { useTheme } from '@/utils/hooks/useTheme';

import Scene from './Scene';

const BackgroundCanvas = () => {
  const prefersReducedMotion = useReducedMotion();
  const config = useBackgroundConfig();
  const { theme } = useTheme();
  const [dpr, setDpr] = useState<number>(DPR_RANGE.max);

  return (
    <Canvas
      dpr={dpr}
      camera={{
        position: CAMERA.position,
        fov: CAMERA.fov,
        near: CAMERA.near,
        far: CAMERA.far,
      }}
      // With reduced motion the scene renders once and stays static.
      frameloop={prefersReducedMotion ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      flat
    >
      <PerformanceMonitor
        onDecline={() => setDpr(DPR_RANGE.min)}
        onIncline={() => setDpr(DPR_RANGE.max)}
      >
        <Scene
          config={config}
          palette={BACKGROUND_PALETTES[theme]}
          animated={!prefersReducedMotion}
        />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default BackgroundCanvas;
