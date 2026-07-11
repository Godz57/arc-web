"use client";

import { useRef, useMemo, useLayoutEffect, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface ReactorCoreProps {
  powerUp?: boolean;
  onPowerUp?: () => void;
  /** Softer lights / scale when used as hero wallpaper */
  background?: boolean;
}

const COLORS = {
  steel: "#c5ccd6",
  steelDark: "#3a4250",
  graphite: "#141820",
  copper: "#b87333",
  gold: "#c9a227",
  energy: "#00d4ff",
  energyDeep: "#4db8ff",
  energyCore: "#e8fbff",
};

const MODEL_SCALE_PANEL = 0.87;
const MODEL_SCALE_BG = 1.15;

function styleMaterial(
  mat: THREE.MeshStandardMaterial,
  kind: "steel" | "steelDark" | "graphite" | "copper" | "gold" | "energy"
) {
  mat.side = THREE.DoubleSide;
  mat.transparent = false;
  mat.opacity = 1;
  mat.needsUpdate = true;

  switch (kind) {
    case "steel":
      mat.color.set(COLORS.steel);
      mat.metalness = 0.92;
      mat.roughness = 0.28;
      mat.emissive.set("#000000");
      mat.emissiveIntensity = 0;
      mat.toneMapped = true;
      break;
    case "steelDark":
      mat.color.set(COLORS.steelDark);
      mat.metalness = 0.85;
      mat.roughness = 0.4;
      mat.emissive.set("#000000");
      mat.emissiveIntensity = 0;
      mat.toneMapped = true;
      break;
    case "graphite":
      mat.color.set(COLORS.graphite);
      mat.metalness = 0.55;
      mat.roughness = 0.55;
      mat.emissive.set("#000000");
      mat.emissiveIntensity = 0;
      mat.toneMapped = true;
      break;
    case "copper":
      mat.color.set(COLORS.copper);
      mat.metalness = 0.88;
      mat.roughness = 0.35;
      mat.emissive.set("#000000");
      mat.emissiveIntensity = 0;
      mat.toneMapped = true;
      break;
    case "gold":
      mat.color.set(COLORS.gold);
      mat.metalness = 0.9;
      mat.roughness = 0.32;
      mat.emissive.set("#000000");
      mat.emissiveIntensity = 0;
      mat.toneMapped = true;
      break;
    case "energy":
      mat.color.set(COLORS.energyCore);
      mat.metalness = 0.05;
      mat.roughness = 0.25;
      mat.emissive.set(COLORS.energy);
      mat.emissiveIntensity = 0.75;
      mat.toneMapped = false;
      break;
  }
}

function classifyMaterial(
  matName: string,
  meshName: string
): "steel" | "steelDark" | "graphite" | "copper" | "gold" | "energy" {
  const m = matName.toLowerCase();
  const n = meshName.toLowerCase();

  if (n.includes("emr") || n.includes("center") || n.includes("torus")) {
    return "energy";
  }
  if (n.includes("cooling") || n.includes("holewheel")) return "steel";

  if (m.includes("red") || m === "redmed" || m === "redvivo") return "steel";
  if (m.includes("grafite") || m.includes("graphite")) return "graphite";
  if (m.includes("ouro") || m.includes("gold")) return "gold";
  if (m.includes("bronze") || m.includes("glossy") || m.includes("copper")) {
    return "copper";
  }
  if (m.includes("silver") || m.includes("silvergr")) return "steel";

  if (n.includes("solenoid") || n.includes("solder") || n.includes("support")) {
    return "copper";
  }
  if (n.includes("plastic") || n.includes("holer")) return "graphite";
  if (n.includes("cylinder")) return "steelDark";

  return "steel";
}

/** Soft radial glow disc behind the reactor (billboard-ish plane). */
function GlowDisc({
  power,
  reduced,
}: {
  power: MutableRefObject<number>;
  reduced: boolean | null;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const map = useMemo(() => {
    try {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      g.addColorStop(0, "rgba(0, 212, 255, 0.55)");
      g.addColorStop(0.35, "rgba(77, 184, 255, 0.18)");
      g.addColorStop(0.7, "rgba(0, 180, 255, 0.04)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    } catch {
      return null;
    }
  }, []);

  useFrame((state) => {
    if (!matRef.current || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    const breath = reduced ? 1 : 1 + Math.sin(t * 1.1) * 0.06;
    const p = power.current;
    matRef.current.opacity = (0.55 + p * 0.35) * breath;
    const s = (1.6 + p * 0.5) * breath;
    meshRef.current.scale.setScalar(s);
  });

  if (!map) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, -0.25]} scale={1.6}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshBasicMaterial
        ref={matRef}
        map={map}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.55}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Thin anamorphic horizontal flare for cinematic punch. */
function AnamorphicFlare({
  power,
  reduced,
}: {
  power: MutableRefObject<number>;
  reduced: boolean | null;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!matRef.current) return;
    const t = state.clock.elapsedTime;
    const base = reduced ? 0.12 : 0.14 + Math.sin(t * 1.4) * 0.03;
    matRef.current.opacity = base + power.current * 0.35;
  });

  return (
    <mesh position={[0, 0, 0.2]} scale={[2.8, 0.06, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        color={COLORS.energy}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.14}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Expanding shockwave ring on power-up. */
function Shockwave({ power }: { power: MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return;
    const p = power.current;
    if (p < 0.02) {
      matRef.current.opacity = 0;
      return;
    }
    const s = 0.4 + (1 - p) * 0.05 + p * 1.8;
    meshRef.current.scale.setScalar(s);
    matRef.current.opacity = p * 0.45;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.18]} rotation={[0, 0, 0]}>
      <ringGeometry args={[0.55, 0.62, 64]} />
      <meshBasicMaterial
        ref={matRef}
        color={COLORS.energyCore}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export function ReactorCore({
  powerUp = false,
  onPowerUp,
  background = false,
}: ReactorCoreProps) {
  const shouldReduceMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const reactorRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const powerUpRef = useRef(0);
  const targetPowerUpRef = useRef(0);
  const introRef = useRef(0);
  const emissiveMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  const modelScale = background ? MODEL_SCALE_BG : MODEL_SCALE_PANEL;
  const ACCENT = modelScale / 1.35;

  const gltf = useGLTF("/models/arc-reactor.glb");

  const scene = useMemo(() => {
    const s = gltf.scene.clone(true);
    s.scale.setScalar(modelScale);
    return s;
  }, [gltf.scene, modelScale]);

  useLayoutEffect(() => {
    const emissiveMats: THREE.MeshStandardMaterial[] = [];

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((m) => m.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      const meshName = child.name || child.parent?.name || "";

      materials.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;

        const kind = classifyMaterial(mat.name || "", meshName);
        styleMaterial(mat, kind);

        if (kind === "energy") {
          emissiveMats.push(mat);
        }
      });
    });

    emissiveMaterialsRef.current = emissiveMats;
  }, [scene]);

  useFrame((state, delta) => {
    const { pointer } = state;
    const t = state.clock.elapsedTime;

    // Cinematic intro: ease in scale from 0.85 → 1
    if (introRef.current < 1) {
      introRef.current = Math.min(1, introRef.current + delta * 0.55);
    }
    const introEase = 1 - Math.pow(1 - introRef.current, 3);

    targetPowerUpRef.current = powerUp ? 1 : 0;
    powerUpRef.current = THREE.MathUtils.lerp(
      powerUpRef.current,
      targetPowerUpRef.current,
      delta * 7
    );
    const p = powerUpRef.current;

    // Face-on parallax + micro “float”
    if (groupRef.current) {
      if (!shouldReduceMotion) {
        const floatY = Math.sin(t * 0.9) * 0.04;
        const floatZ = Math.sin(t * 0.55) * 0.02;
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          floatY,
          0.08
        );
        groupRef.current.position.z = floatZ;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          pointer.x * 0.14,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          -pointer.y * 0.11,
          0.05
        );
      } else {
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.y = 0;
        groupRef.current.position.set(0, 0, 0);
      }

      const breath = shouldReduceMotion
        ? 1
        : 1 + Math.sin(t * 1.15) * 0.012 + p * 0.04;
      groupRef.current.scale.setScalar(introEase * breath);
    }

    // Turbine spin — speeds up on power-up
    if (reactorRef.current) {
      const spin =
        (shouldReduceMotion ? 0.02 : 0.1) + p * 0.45 + Math.sin(t * 0.5) * 0.02;
      reactorRef.current.rotation.z += delta * spin;
    }

    // Living pulse (heartbeat-ish)
    const beat =
      0.62 +
      (shouldReduceMotion
        ? 0
        : Math.sin(t * 2.1) * 0.08 + Math.sin(t * 4.2) * 0.03) +
      p * 0.75;

    emissiveMaterialsRef.current.forEach((mat) => {
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        beat,
        0.12
      );
    });

    if (coreRef.current) {
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = beat * 1.1;
      const s =
        ACCENT *
        (1 + p * 0.18 + (shouldReduceMotion ? 0 : Math.sin(t * 2.8) * 0.02));
      coreRef.current.scale.setScalar(s);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -=
        delta * (shouldReduceMotion ? 0.05 : 0.35 + p * 0.8);
      const ringMat = ringRef.current.material as THREE.MeshStandardMaterial;
      ringMat.emissiveIntensity = beat * 0.85;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z +=
        delta * (shouldReduceMotion ? 0.03 : 0.12 + p * 0.25);
      const m = outerRingRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = beat * 0.5;
      m.opacity = 0.55 + p * 0.25;
    }

    const lightMul = background ? 0.55 : 1;
    if (coreLightRef.current) {
      coreLightRef.current.intensity =
        (0.4 + beat * 0.35 + p * 1.4) * lightMul;
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity =
        (0.35 + Math.sin(t * 1.3) * 0.08 + p * 0.6) * lightMul;
    }
    if (keyLightRef.current) {
      keyLightRef.current.intensity = (0.95 + p * 0.25) * (background ? 0.65 : 1);
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onPowerUp?.();
      }}
      onPointerOver={() => {
        try {
          document.body.style.cursor = background ? "default" : "pointer";
        } catch {
          /* ignore */
        }
      }}
      onPointerOut={() => {
        try {
          document.body.style.cursor = "default";
        } catch {
          /* ignore */
        }
      }}
    >
      <ambientLight
        intensity={background ? 0.18 : 0.28}
        color="#5a6570"
      />
      <directionalLight
        ref={keyLightRef}
        position={[3.5, 4.5, 5]}
        intensity={background ? 0.65 : 1}
        color="#e8eef6"
      />
      <directionalLight
        position={[-3.5, -1.5, 2.5]}
        intensity={background ? 0.2 : 0.35}
        color="#3d4a58"
      />
      <directionalLight
        position={[-2, 2, -3]}
        intensity={background ? 0.14 : 0.28}
        color="#c4a574"
      />
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0.45]}
        intensity={background ? 0.4 : 0.7}
        color={COLORS.energy}
        distance={7}
        decay={2}
      />
      <pointLight
        ref={rimLightRef}
        position={[0, 0, -1.2]}
        intensity={background ? 0.22 : 0.4}
        color={COLORS.energyDeep}
        distance={5}
        decay={2}
      />

      {/* Atmosphere — softer as wallpaper */}
      {!background && (
        <>
          <GlowDisc power={powerUpRef} reduced={shouldReduceMotion} />
          <AnamorphicFlare power={powerUpRef} reduced={shouldReduceMotion} />
          <Shockwave power={powerUpRef} />
        </>
      )}
      {background && (
        <GlowDisc power={powerUpRef} reduced={shouldReduceMotion} />
      )}

      <primitive object={scene} ref={reactorRef} />

      {/* Core plasma */}
      <mesh ref={coreRef} position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color={COLORS.energyCore}
          emissive={COLORS.energy}
          emissiveIntensity={0.9}
          metalness={0}
          roughness={0.18}
          toneMapped={false}
        />
      </mesh>

      {/* Inner spinning ring */}
      <mesh
        ref={ringRef}
        position={[0, 0, 0.12]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={ACCENT}
      >
        <torusGeometry args={[0.38, 0.03, 16, 64]} />
        <meshStandardMaterial
          color={COLORS.energyDeep}
          emissive={COLORS.energy}
          emissiveIntensity={0.7}
          metalness={0.15}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Outer energy halo */}
      <mesh
        ref={outerRingRef}
        position={[0, 0, 0.08]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={ACCENT}
      >
        <torusGeometry args={[0.72, 0.014, 12, 64]} />
        <meshStandardMaterial
          color={COLORS.energy}
          emissive={COLORS.energy}
          emissiveIntensity={0.45}
          metalness={0.25}
          roughness={0.35}
          toneMapped={false}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/arc-reactor.glb");
