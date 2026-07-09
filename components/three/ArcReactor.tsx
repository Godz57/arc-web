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
        const isEmissive =
          mat.emissiveIntensity > 0.05 ||
          name.includes("emiss") ||
          mat.name === "Material.003";

        if (isEmissive) {
          mat.color.set("#e3e6ec");
          mat.emissive.set("#e3e6ec");
          mat.emissiveIntensity = 0.35;
          mat.toneMapped = false;
          mat.metalness = 0.8;
          mat.roughness = 0.2;
          emissiveMats.push(mat);
        } else if (mat.name === "Base") {
          mat.color.set("#4e4744");
          mat.metalness = 1.0;
          mat.roughness = 0.5;
        } else {
          mat.color.set("#282827");
          mat.metalness = 0.9;
          mat.roughness = 0.55;
        }
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
    const baseIntensity = 0.35 + (shouldReduceMotion ? 0 : Math.sin(t * 2) * 0.05);
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
      {/* cool-silver ambient base */}
      <ambientLight intensity={0.18} color="#9a9fa6" />

      {/* silver/glacial lights — softened to reduce overall glow */}
      <pointLight position={[0, 0, 2]} intensity={0.3} color="#e3e6ec" />
      <pointLight position={[0, 0, -1]} intensity={0.08} color="#d8dde3" />
      <pointLight position={[2, 2, 1]} intensity={0.15} color="#d4af37" />

      {/* real arc reactor model */}
      <primitive object={scene} ref={reactorRef} />
    </group>
  );
}

useGLTF.preload("/models/arc-reactor.glb");
