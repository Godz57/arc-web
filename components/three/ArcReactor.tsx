"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface ReactorCoreProps {
  powerUp?: boolean;
}

function createTriangleShape(radius: number) {
  const shape = new THREE.Shape();
  const angles = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];
  const pts = angles.map((a) => ({
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
  }));
  shape.moveTo(pts[0].x, pts[0].y);
  shape.lineTo(pts[1].x, pts[1].y);
  shape.lineTo(pts[2].x, pts[2].y);
  shape.lineTo(pts[0].x, pts[0].y);
  return shape;
}

export function ReactorCore({ powerUp = false }: ReactorCoreProps) {
  const shouldReduceMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const coilsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const apertureRef = useRef<THREE.Mesh>(null);

  const powerUpRef = useRef(0);
  const targetPowerUpRef = useRef(0);

  const apertureGeometry = useMemo(() => {
    const outer = createTriangleShape(0.46);
    const hole = createTriangleShape(0.3);
    outer.holes.push(hole);
    return new THREE.ExtrudeGeometry(outer, {
      depth: 0.045,
      bevelEnabled: false,
      curveSegments: 24,
    });
  }, []);

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

    // aperture disc glow (face-on emissive surface)
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 0.9 + (shouldReduceMotion ? 0 : Math.sin(t * 2) * 0.1);
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 0.7;
      }
    }

    // halo ring behind disc
    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 0.35 + (shouldReduceMotion ? 0 : Math.sin(t * 2) * 0.05);
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 0.5;
      }
    }

    // triangular aperture ring glow
    if (apertureRef.current) {
      const mat = apertureRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const baseIntensity = 0.25;
        mat.emissiveIntensity = baseIntensity + powerUpRef.current * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* cool-silver ambient base */}
      <ambientLight intensity={0.18} color="#9a9fa6" />

      {/* silver/glacial lights */}
      <pointLight position={[0, 0, 1.2]} intensity={0.5} color="#e3e6ec" />
      <pointLight position={[0, 0, -0.6]} intensity={0.15} color="#d8dde3" />
      <pointLight position={[1.4, 1.4, 0.8]} intensity={0.25} color="#d4af37" />

      {/* outer housing — satin steel */}
      <mesh>
        <torusGeometry args={[1.25, 0.14, 32, 120]} />
        <meshStandardMaterial
          color="#4e4744"
          metalness={1.0}
          roughness={0.5}
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
              color="#3a3a37"
              metalness={1.0}
              roughness={0.45}
            />
          </mesh>
        ))}
      </group>

      {/* inner recess ring — neutral dark gray */}
      <mesh>
        <torusGeometry args={[1.0, 0.08, 24, 80]} />
        <meshStandardMaterial
          color="#282827"
          metalness={0.9}
          roughness={0.55}
        />
      </mesh>

      {/* thin gold accent ring */}
      <mesh>
        <torusGeometry args={[0.88, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1.0}
          roughness={0.3}
        />
      </mesh>

      {/* radial coils — muted bronze */}
      <group ref={coilsRef}>
        {coilPositions.map((coil, i) => (
          <mesh
            key={i}
            position={[coil.x, coil.y, 0.02]}
            rotation={[0, 0, coil.angle + Math.PI / 2]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.32, 16]} />
            <meshStandardMaterial
              color="#6e4a30"
              metalness={1.0}
              roughness={0.45}
            />
          </mesh>
        ))}
      </group>

      {/* triangular aperture ring — soft glacial emissive */}
      <mesh
        ref={apertureRef}
        geometry={apertureGeometry}
        position={[0, 0, -0.022]}
      >
        <meshStandardMaterial
          color="#d8dde3"
          emissive="#d8dde3"
          emissiveIntensity={0.25}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* halo ring behind the aperture disc */}
      <mesh ref={haloRef} position={[0, 0, 0.03]}>
        <torusGeometry args={[0.42, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#e3e6ec"
          emissive="#e3e6ec"
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* aperture disc — flat face-on emissive surface */}
      <mesh ref={coreRef} position={[0, 0, 0.05]}>
        <circleGeometry args={[0.42, 64]} />
        <meshStandardMaterial
          color="#e3e6ec"
          emissive="#e3e6ec"
          emissiveIntensity={0.9}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
