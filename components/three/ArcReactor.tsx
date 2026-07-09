"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface ReactorCoreProps {
  powerUp?: boolean;
}

export function ReactorCore({ powerUp = false }: ReactorCoreProps) {
  const shouldReduceMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const coilsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const apertureRef = useRef<THREE.Mesh>(null);

  const powerUpRef = useRef(0);
  const targetPowerUpRef = useRef(0);

  const coilCount = 10;
  const coilPositions = useMemo(() => {
    const positions: { angle: number; x: number; y: number }[] = [];
    for (let i = 0; i < coilCount; i++) {
      const angle = (i / coilCount) * Math.PI * 2;
      positions.push({
        angle,
        x: Math.cos(angle) * 0.62,
        y: Math.sin(angle) * 0.62,
      });
    }
    return positions;
  }, []);

  const boltPositions = useMemo(() => {
    const positions: { angle: number; x: number; y: number }[] = [];
    const boltCount = 8;
    for (let i = 0; i < boltCount; i++) {
      const angle = (i / boltCount) * Math.PI * 2;
      positions.push({
        angle,
        x: Math.cos(angle) * 1.38,
        y: Math.sin(angle) * 1.38,
      });
    }
    return positions;
  }, []);

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

    // coils rotate around Z like a turbine
    if (coilsRef.current) {
      coilsRef.current.rotation.z +=
        delta * (shouldReduceMotion ? 0.02 : 0.25);
    }

    // core pulse
    if (coreRef.current) {
      const pulseAmp = shouldReduceMotion ? 0.01 : 0.04;
      const baseScale = 1 + Math.sin(t * 2) * pulseAmp;
      const powerScale = 1 + powerUpRef.current * 0.6;
      const scale = baseScale * powerScale;
      coreRef.current.scale.set(scale, scale, scale);

      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 1.6 + (shouldReduceMotion ? 0 : Math.sin(t * 3) * 0.15);
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 1.4;
      }
    }

    // aperture ring glow
    if (apertureRef.current) {
      const mat = apertureRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 0.35;
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 0.8;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* ambient base */}
      <ambientLight intensity={0.15} />

      {/* core lights — soft, concentrated */}
      <pointLight position={[0, 0, 1.2]} intensity={0.7} color="#e8f7ff" />
      <pointLight position={[0, 0, -0.6]} intensity={0.25} color="#00d4ff" />
      <pointLight position={[1.4, 1.4, 0.8]} intensity={0.4} color="#d4af37" />

      {/* outer housing — dark gunmetal */}
      <mesh>
        <torusGeometry args={[1.25, 0.14, 32, 120]} />
        <meshStandardMaterial
          color="#1a1f29"
          metalness={1.0}
          roughness={0.42}
        />
      </mesh>

      {/* bolts around housing */}
      <group>
        {boltPositions.map((bolt, i) => (
          <mesh
            key={`bolt-${i}`}
            position={[bolt.x, bolt.y, 0.04]}
            rotation={[0, 0, bolt.angle]}
          >
            <cylinderGeometry args={[0.038, 0.038, 0.09, 12]} />
            <meshStandardMaterial
              color="#3a404d"
              metalness={1.0}
              roughness={0.45}
            />
          </mesh>
        ))}
      </group>

      {/* inner recess ring — darker steel */}
      <mesh>
        <torusGeometry args={[1.0, 0.08, 24, 80]} />
        <meshStandardMaterial
          color="#141821"
          metalness={0.9}
          roughness={0.55}
        />
      </mesh>

      {/* radial coils — dark bronze/copper */}
      <group ref={coilsRef}>
        {coilPositions.map((coil, i) => (
          <mesh
            key={i}
            position={[coil.x, coil.y, 0.02]}
            rotation={[0, 0, coil.angle + Math.PI / 2]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.32, 16]} />
            <meshStandardMaterial
              color="#5c4129"
              metalness={1.0}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>

      {/* aperture ring — faint cyan emissive */}
      <mesh ref={apertureRef}>
        <torusGeometry args={[0.42, 0.022, 16, 80]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* core — bright white-blue, the main bloom source */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e8f7ff"
          emissiveIntensity={1.6}
          metalness={1}
          roughness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
