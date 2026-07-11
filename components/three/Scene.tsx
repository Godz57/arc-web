"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { ReactorCore } from "./ArcReactor";
import { hasWebGL, isTouchOrMobile } from "@/lib/device";
import ClientErrorBoundary from "@/components/ui/ClientErrorBoundary";

export type SceneVariant = "panel" | "background";

interface SceneProps {
  powerUp?: boolean;
  onPowerUp?: () => void;
  className?: string;
  /** background = discreet hero backdrop */
  variant?: SceneVariant;
}

function CameraRig({
  powerUp,
  variant,
}: {
  powerUp: boolean;
  variant: SceneVariant;
}) {
  const shouldReduceMotion = useReducedMotion();
  const powerRef = useRef(0);
  const isBg = variant === "background";

  useFrame((state, delta) => {
    powerRef.current = THREE.MathUtils.lerp(
      powerRef.current,
      powerUp ? 1 : 0,
      delta * 6
    );

    const cam = state.camera as THREE.PerspectiveCamera;
    const baseZ = isBg ? 5.4 : 4.9;
    const baseFov = isBg ? 34 : 36;

    if (shouldReduceMotion) {
      cam.position.set(isBg ? 0.35 : 0, isBg ? 0.15 : 0, baseZ);
      cam.lookAt(0, 0, 0);
      cam.fov = baseFov;
      cam.updateProjectionMatrix();
      return;
    }

    const t = state.clock.elapsedTime;
    const p = powerRef.current;

    if (isBg) {
      cam.position.x = 0.45 + Math.sin(t * 0.12) * 0.04;
      cam.position.y = 0.12 + Math.sin(t * 0.15) * 0.03;
      cam.position.z = baseZ + Math.sin(t * 0.18) * 0.05 - p * 0.06;
      cam.lookAt(-0.15, 0, 0);
      cam.fov = baseFov - p * 0.4;
    } else {
      cam.position.x = Math.sin(t * 0.16) * 0.015;
      cam.position.y = Math.sin(t * 0.2) * 0.02;
      cam.position.z = baseZ + Math.sin(t * 0.25) * 0.04 - p * 0.08;
      cam.lookAt(0, 0, 0);
      cam.fov = baseFov - p * 0.8 + Math.sin(t * 0.3) * 0.08;
    }
    cam.updateProjectionMatrix();
  });

  return null;
}

type BloomEffectLike = { intensity: number };

function PostFX({
  powerUp,
  variant,
}: {
  powerUp: boolean;
  variant: SceneVariant;
}) {
  const shouldReduceMotion = useReducedMotion();
  const bloomRef = useRef<BloomEffectLike>(null);
  const isBg = variant === "background";

  useFrame((_, delta) => {
    const idle = isBg ? 0.22 : 0.32;
    const hot = isBg ? 0.38 : 0.55;
    const targetBloom = powerUp ? hot : idle;
    if (bloomRef.current) {
      bloomRef.current.intensity = THREE.MathUtils.lerp(
        bloomRef.current.intensity,
        targetBloom,
        delta * 5
      );
    }
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        ref={bloomRef as never}
        intensity={shouldReduceMotion ? 0.18 : isBg ? 0.22 : 0.32}
        luminanceThreshold={isBg ? 0.62 : 0.58}
        luminanceSmoothing={0.55}
        mipmapBlur
        radius={isBg ? 0.5 : 0.38}
      />
      <Vignette
        eskil={false}
        offset={isBg ? 0.35 : 0.3}
        darkness={isBg ? 0.55 : shouldReduceMotion ? 0.4 : 0.48}
      />
    </EffectComposer>
  );
}

/** CSS-only fallback when WebGL is unavailable or crashes */
function SceneFallback({
  className = "",
  variant = "panel",
}: {
  className?: string;
  variant?: SceneVariant;
}) {
  const isBg = variant === "background";
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: isBg
            ? "radial-gradient(ellipse 55% 50% at 68% 48%, rgba(77,184,255,0.22) 0%, rgba(77,184,255,0.06) 35%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(77,184,255,0.28) 0%, rgba(77,184,255,0.08) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: isBg ? 120 : 100,
          height: isBg ? 120 : 100,
          background:
            "radial-gradient(circle, #e8fbff 0%, #4db8ff 40%, transparent 70%)",
          boxShadow: "0 0 60px rgba(77,184,255,0.55)",
          opacity: isBg ? 0.55 : 0.75,
          marginLeft: isBg ? "12%" : 0,
        }}
      />
    </div>
  );
}

function SceneCanvas({
  powerUp,
  onPowerUp,
  className,
  variant,
  mobile,
}: SceneProps & { mobile: boolean }) {
  const isBg = variant === "background";

  return (
    <Canvas
      className={className}
      camera={{
        position: isBg ? [0.45, 0.12, 5.4] : [0, 0, 4.9],
        fov: isBg ? 34 : 36,
      }}
      gl={{
        antialias: !mobile,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isBg ? 0.85 : 0.98,
        alpha: true,
        powerPreference: mobile ? "low-power" : "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={mobile ? [1, 1] : isBg ? [1, 1.25] : [1, 1.5]}
      frameloop="always"
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        const onLost = (e: Event) => {
          e.preventDefault();
        };
        canvas.addEventListener("webglcontextlost", onLost, false);
      }}
    >
      <Suspense fallback={null}>
        <CameraRig powerUp={!!powerUp} variant={variant ?? "panel"} />
        <ReactorCore
          powerUp={powerUp}
          onPowerUp={onPowerUp}
          background={isBg}
        />
        {/* Postprocessing is a common crash source on mobile Safari */}
        {!mobile && (
          <PostFX powerUp={!!powerUp} variant={variant ?? "panel"} />
        )}
      </Suspense>
    </Canvas>
  );
}

export default function Scene({
  powerUp = false,
  onPowerUp,
  className = "",
  variant = "panel",
}: SceneProps) {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isTouchOrMobile());
    setSupported(hasWebGL());
    setReady(true);
  }, []);

  if (!ready) {
    return <SceneFallback className={className} variant={variant} />;
  }

  if (!supported) {
    return <SceneFallback className={className} variant={variant} />;
  }

  return (
    <ClientErrorBoundary
      name="Scene"
      fallback={<SceneFallback className={className} variant={variant} />}
    >
      <SceneCanvas
        powerUp={powerUp}
        onPowerUp={onPowerUp}
        className={className}
        variant={variant}
        mobile={mobile}
      />
    </ClientErrorBoundary>
  );
}
