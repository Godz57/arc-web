"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
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
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ReactorCore powerUp={powerUp} />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
