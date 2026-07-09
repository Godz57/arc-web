"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
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
        toneMappingExposure: 1.0,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <ReactorCore powerUp={powerUp} />
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.78}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.35} darkness={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
