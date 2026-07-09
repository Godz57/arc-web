"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// Environment (HDRI) import disabled — relying on lights only for matte look
// EffectComposer/Bloom/Vignette disabled to remove bloom flare
import { ACESFilmicToneMapping } from "three";
import { ReactorCore } from "./ArcReactor";

interface SceneProps {
  powerUp?: boolean;
  className?: string;
}

export default function Scene({ powerUp = false, className = "" }: SceneProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        {/* Environment (HDRI) disabled — it was causing mirror reflections on metals (the shine). Relying on flat lights only. */}
        <ReactorCore powerUp={powerUp} />
        {/* Bloom+Vignette disabled — matte metal look */}
      </Suspense>
    </Canvas>
  );
}
