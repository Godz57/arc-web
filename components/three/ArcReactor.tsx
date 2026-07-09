"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface ReactorCoreProps {
  powerUp?: boolean;
}

export function ReactorCore({ powerUp = false }: ReactorCoreProps) {
  const shouldReduceMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const reactorRef = useRef<THREE.Group>(null);
  const powerUpRef = useRef(0);
  const targetPowerUpRef = useRef(0);
  const emissiveMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const gltf = useGLTF("/models/arc-reactor.glb");

  const scene = useMemo(() => {
    const s = gltf.scene.clone();
    // Model exports already face-on (Y-up, gltf export_yup). No rotation needed.
    // If it reads tilted later, re-add rotation here (e.g. s.rotation.x = Math.PI/2).
    s.scale.setScalar(1.3);
    return s;
  }, [gltf.scene]);

  useLayoutEffect(() => {
    const emissiveMats: THREE.MeshStandardMaterial[] = [];

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;

        const name = mat.name.toLowerCase();
        const emis =
          (mat.emissive.r + mat.emissive.g + mat.emissive.b > 0.01) ||
          name.includes("emiss") ||
          (mat.emissiveIntensity ?? 0) > 0.05 ||
          mat.name === "Material.003";
        const isEmissive = emis;

        if (isEmissive) {
          // Core: electric cyan emissive at low intensity (color, no blinding flare).
          mat.toneMapped = false;
          mat.metalness = 0.0;
          mat.roughness = 0.4;
          mat.emissive.set("#00c8e0");
          mat.emissiveIntensity = 0.3;
          emissiveMats.push(mat);
        }
        // Non-emissive materials (steel housing, bronze coils) keep their
        // baked Principled colors from the GLB.
      });
    });

    emissiveMaterialsRef.current = emissiveMats;
  }, [scene]);

  useFrame((state, delta) => {
    const { pointer } = state;
    const t = state.clock.elapsedTime;

    // smooth power-up state
    targetPowerUpRef.current = powerUp ? 1 : 0;
    powerUpRef.current = THREE.MathUtils.lerp(
      powerUpRef.current,
      targetPowerUpRef.current,
      delta * 8
    );

    // gentle face-on parallax
    if (groupRef.current && !shouldReduceMotion) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.12,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.12,
        0.05
      );
    }

    // slow turbine rotation
    if (reactorRef.current) {
      reactorRef.current.rotation.z +=
        delta * (shouldReduceMotion ? 0.02 : 0.12);
    }

    // pulse emissive intensity on all glowing materials
    const baseIntensity = 0.3 + (shouldReduceMotion ? 0 : Math.sin(t * 2) * 0.05);
    const targetIntensity = baseIntensity + powerUpRef.current * 0.4;

    emissiveMaterialsRef.current.forEach((mat) => {
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetIntensity,
        0.1
      );
    });
  });

  return (
    <group ref={groupRef}>
      {/* matte lighting: high ambient so albedo reads (no env reflections, no specular flare). White-ish lights to not tint the metals. */}
      <ambientLight intensity={1.1} color="#cfd2d6" />
      <directionalLight position={[3, 4, 5]} intensity={0.7} color="#d8dde2" />
      <directionalLight position={[-3, -2, 3]} intensity={0.4} color="#9aa0a8" />
      {/* only the core emissive gives the cyan accent — no colored reflection lights */}

      {/* real arc reactor model */}
      <primitive object={scene} ref={reactorRef} />
    </group>
  );
}

useGLTF.preload("/models/arc-reactor.glb");
