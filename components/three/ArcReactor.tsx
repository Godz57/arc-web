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
        x: Math.cos(angle) * 0.75,
        y: Math.sin(angle) * 0.75,
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
        pointer.x * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.15,
        0.05
      );
    }

    // coils rotate around Z like a turbine
    if (coilsRef.current) {
      coilsRef.current.rotation.z +=
        delta * (shouldReduceMotion ? 0.05 : 0.3);
    }

    // core pulse
    if (coreRef.current) {
      const pulseAmp = shouldReduceMotion ? 0.01 : 0.05;
      const baseScale = 1 + Math.sin(t * 2) * pulseAmp;
      const powerScale = 1 + powerUpRef.current * 0.7;
      const scale = baseScale * powerScale;
      coreRef.current.scale.set(scale, scale, scale);

      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 3.2 + (shouldReduceMotion ? 0 : Math.sin(t * 3) * 0.4);
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 2.5;
      }
    }

    // aperture ring glow
    if (apertureRef.current) {
      const mat = apertureRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 0.8;
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 1.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* ambient base */}
      <ambientLight intensity={0.2} />

      {/* core lights */}
      <pointLight position={[0, 0, 1.5]} intensity={1.5} color="#cfefff" />
      <pointLight position={[0, 0, -1]} intensity={0.6} color="#00d4ff" />
      <pointLight position={[1.5, 1.5, 1]} intensity={0.8} color="#d4af37" />

      {/* 1. external housing — dark steel */}
      <mesh>
        <torusGeometry args={[1.3, 0.12, 32, 100]} />
        <meshStandardMaterial
          color="#202836"
          metalness={1.0}
          roughness={0.35}
        />
      </mesh>

      {/* 2. middle ring — titan gold */}
      <mesh>
        <torusGeometry args={[1.0, 0.06, 24, 80]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1.0}
          roughness={0.3}
        />
      </mesh>

      {/* 3. radial coils / bobinas — copper/gold, non-emissive */}
      <group ref={coilsRef}>
        {coilPositions.map((coil, i) => (
          <mesh
            key={i}
            position={[coil.x, coil.y, 0]}
            rotation={[0, 0, coil.angle + Math.PI / 2]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.35, 16]} />
            <meshStandardMaterial
              color="#b87333"
              metalness={1.0}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>

      {/* 4. inner aperture ring — faint cyan emissive */}
      <mesh ref={apertureRef}>
        <torusGeometry args={[0.45, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* core — small, intensely bright */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color="#cfefff"
          emissive="#cfefff"
          emissiveIntensity={3.2}
          metalness={1}
          roughness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
