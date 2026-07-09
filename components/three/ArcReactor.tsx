"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ReactorCoreProps {
  powerUp?: boolean;
}

export function ReactorCore({ powerUp = false }: ReactorCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringXRef = useRef<THREE.Mesh>(null);
  const ringYRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const segmentsRef = useRef<THREE.Group>(null);

  const powerUpRef = useRef(0);
  const targetPowerUpRef = useRef(0);

  const segmentPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      positions.push([Math.cos(angle) * 1.35, Math.sin(angle) * 1.35, 0]);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const { pointer } = state;
    const t = state.clock.elapsedTime;

    // target power up
    targetPowerUpRef.current = powerUp ? 1 : 0;
    powerUpRef.current = THREE.MathUtils.lerp(
      powerUpRef.current,
      targetPowerUpRef.current,
      delta * 8
    );

    // parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.3,
        0.05
      );
    }

    // rings rotation
    if (ringXRef.current) {
      ringXRef.current.rotation.x += delta * 0.4;
      ringXRef.current.rotation.z += delta * 0.15;
    }
    if (ringYRef.current) {
      ringYRef.current.rotation.y += delta * 0.5;
      ringYRef.current.rotation.x += delta * 0.1;
    }

    // core pulse
    if (coreRef.current) {
      const baseScale = 1 + Math.sin(t * 2) * 0.08;
      const powerScale = 1 + powerUpRef.current * 0.8;
      const scale = baseScale * powerScale;
      coreRef.current.scale.set(scale, scale, scale);

      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 2.5 + Math.sin(t * 3) * 0.5;
        mat.emissiveIntensity =
          baseIntensity + powerUpRef.current * 4;
      }
    }

    // segments subtle pulse
    if (segmentsRef.current) {
      segmentsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.emissiveIntensity =
            0.4 + Math.sin(t * 2 + i) * 0.2 + powerUpRef.current * 1.5;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* ambient light */}
      <ambientLight intensity={0.3} />

      {/* point lights */}
      <pointLight position={[3, 3, 3]} intensity={2} color="#00d4ff" />
      <pointLight position={[-3, -3, 2]} intensity={2} color="#d4af37" />

      {/* main torus ring */}
      <mesh>
        <torusGeometry args={[1.2, 0.08, 24, 128]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* rotating ring X */}
      <mesh ref={ringXRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#a8e6ff"
          emissive="#a8e6ff"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* rotating ring Y */}
      <mesh ref={ringYRef} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.45, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.9}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color="#a8e6ff"
          emissive="#a8e6ff"
          emissiveIntensity={2.5}
          metalness={1}
          roughness={0}
          toneMapped={false}
        />
      </mesh>

      {/* 8 gold segments */}
      <group ref={segmentsRef}>
        {segmentPositions.map((pos, i) => (
          <mesh key={i} position={pos} rotation={[0, 0, (i / 8) * Math.PI * 2]}>
            <boxGeometry args={[0.18, 0.08, 0.12]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.4}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
