"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { hasWebGL, isTouchOrMobile } from "@/lib/device";
import ClientErrorBoundary from "@/components/ui/ClientErrorBoundary";

export interface AssemblyModule {
  code: string;
  label: string;
  short: string;
}

interface SuitAssemblyProps {
  /** 0–1 scroll assembly progress */
  progress: number;
  modules?: AssemblyModule[];
  className?: string;
}

const DEFAULT_MODULES: AssemblyModule[] = [
  { code: "01", label: "BRIEFING", short: "OBJETIVOS" },
  { code: "02", label: "DESIGN", short: "INTERFACE" },
  { code: "03", label: "BUILD", short: "CÓDIGO" },
  { code: "04", label: "LAUNCH", short: "DEPLOY" },
];

const STEEL = "#9aa3b0";
const STEEL_DARK = "#2a303a";
const CYAN = "#4db8ff";
const GOLD = "#c9a84c";

function smoothstep(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * How far each module has docked (0–1).
 * Fast stagger: all four lock by ~55% scroll progress through the dock trigger.
 */
function moduleEase(progress: number, index: number) {
  const start = index * 0.09; // 0 → 0.27
  const span = 0.2;
  return smoothstep((progress - start) / span);
}

function ModuleIcon({
  index,
  active,
}: {
  index: number;
  active: number;
}) {
  const glow = 0.15 + active * 0.55;
  const color = active > 0.5 ? CYAN : STEEL;

  // Distinct silhouette per step so the metaphor is readable
  if (index === 0) {
    // Briefing — document stack
    return (
      <group position={[0, 0, 0.12]}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.42, 0.5, 0.04]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
        </mesh>
        {[0.12, 0, -0.12].map((y, i) => (
          <mesh key={i} position={[0, y, 0.04]}>
            <boxGeometry args={[0.28, 0.03, 0.01]} />
            <meshStandardMaterial
              color={CYAN}
              emissive={CYAN}
              emissiveIntensity={glow * 0.4}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (index === 1) {
    // Design — layered frames
    return (
      <group position={[0, 0, 0.12]}>
        {[0.1, 0, -0.1].map((z, i) => (
          <mesh key={i} position={[i * 0.06 - 0.06, i * 0.04 - 0.04, z]}>
            <boxGeometry args={[0.45 - i * 0.06, 0.32 - i * 0.04, 0.03]} />
            <meshStandardMaterial
              color={i === 2 ? CYAN : STEEL}
              metalness={0.6}
              roughness={0.35}
              emissive={i === 2 ? CYAN : "#000"}
              emissiveIntensity={i === 2 ? glow * 0.5 : 0}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (index === 2) {
    // Build — brick modules
    return (
      <group position={[0, 0, 0.12]}>
        {[
          [-0.14, 0.12],
          [0.14, 0.12],
          [-0.14, -0.12],
          [0.14, -0.12],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.2, 0.18, 0.14]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? STEEL : STEEL_DARK}
              metalness={0.7}
              roughness={0.35}
              emissive={CYAN}
              emissiveIntensity={glow * 0.15 * active}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    );
  }

  // Launch — power core
  return (
    <group position={[0, 0, 0.12]}>
      <mesh>
        <torusGeometry args={[0.2, 0.035, 12, 32]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.3 + glow}
          metalness={0.2}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial
          color="#e8fbff"
          emissive={CYAN}
          emissiveIntensity={0.5 + glow}
          metalness={0}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ModuleCard({
  module,
  index,
  progressRef,
}: {
  module: AssemblyModule;
  index: number;
  progressRef: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const frameMat = useRef<THREE.MeshBasicMaterial>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const plateMat = useRef<THREE.MeshStandardMaterial>(null);
  const statusRef = useRef<THREE.Group>(null);
  const activeRef = useRef(0);

  const restPositions: [number, number, number][] = [
    [-0.72, 0.55, 0],
    [0.72, 0.55, 0],
    [-0.72, -0.55, 0],
    [0.72, -0.55, 0],
  ];

  const startPositions: [number, number, number][] = [
    [-2.8, 1.4, -0.8],
    [2.8, 1.4, -0.8],
    [-2.8, -1.4, 0.6],
    [2.8, -1.4, 0.6],
  ];

  const rest = restPositions[index];
  const start = startPositions[index];

  useFrame(() => {
    if (!group.current) return;
    const e = moduleEase(progressRef.current, index);
    activeRef.current = e;

    group.current.position.set(
      THREE.MathUtils.lerp(start[0], rest[0], e),
      THREE.MathUtils.lerp(start[1], rest[1], e),
      THREE.MathUtils.lerp(start[2], rest[2], e)
    );
    group.current.rotation.y = (1 - e) * 0.9 * (index % 2 === 0 ? 1 : -1);
    group.current.rotation.x = (1 - e) * 0.25;

    if (plateMat.current) {
      plateMat.current.opacity = 0.35 + e * 0.65;
    }
    const docked = e > 0.85;
    const mid = e > 0.15;
    const col = docked ? CYAN : mid ? GOLD : STEEL_DARK;
    if (frameMat.current) {
      frameMat.current.color.set(col);
      frameMat.current.opacity = 0.08 + e * 0.12;
    }
    if (edgeMat.current) {
      edgeMat.current.color.set(col);
      edgeMat.current.opacity = 0.35 + e * 0.55;
    }
  });

  return (
    <group ref={group} position={start}>
      <RoundedBox args={[1.2, 0.95, 0.12]} radius={0.04} smoothness={4}>
        <meshStandardMaterial
          ref={plateMat}
          color={STEEL_DARK}
          metalness={0.75}
          roughness={0.35}
          transparent
          opacity={0.4}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.12, 0.87]} />
        <meshBasicMaterial
          ref={frameMat}
          color={STEEL_DARK}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>

      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.18, 0.93, 0.13)]} />
        <lineBasicMaterial
          ref={edgeMat}
          color={STEEL_DARK}
          transparent
          opacity={0.4}
        />
      </lineSegments>

      <ModuleIconAnimated index={index} activeRef={activeRef} />

      <Text
        position={[-0.48, 0.32, 0.1]}
        fontSize={0.11}
        color={CYAN}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
        outlineWidth={0.004}
        outlineColor="#0a0e14"
      >
        {`MOD ${module.code}`}
      </Text>
      <Text
        position={[-0.48, -0.28, 0.1]}
        fontSize={0.13}
        color="#cfefff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
        outlineWidth={0.005}
        outlineColor="#0a0e14"
      >
        {module.label}
      </Text>
      <group ref={statusRef}>
        <Text
          position={[0.48, -0.32, 0.1]}
          fontSize={0.07}
          color={CYAN}
          anchorX="right"
          anchorY="middle"
          letterSpacing={0.04}
        >
          MODULE
        </Text>
      </group>
    </group>
  );
}

function ModuleIconAnimated({
  index,
  activeRef,
}: {
  index: number;
  activeRef: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const a = activeRef.current;
    group.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial && m.emissive) {
            if (m.emissive.g > 0.2 || m.emissive.b > 0.2) {
              m.emissiveIntensity = 0.15 + a * 0.7;
            }
          }
        });
      }
    });
  });

  return (
    <group ref={group}>
      <ModuleIcon index={index} active={1} />
    </group>
  );
}

function AssemblyScene({
  progress,
  modules,
}: {
  progress: number;
  modules: AssemblyModule[];
}) {
  const rig = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const hubLight = useRef<THREE.PointLight>(null);
  const shouldReduceMotion = useReducedMotion();
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Derived in render (scroll prop) — not only inside useFrame
  const complete = smoothstep((progress - 0.48) / 0.18);
  const assembled = complete > 0.85;

  useFrame((state) => {
    progressRef.current = progress;
    const c = smoothstep((progressRef.current - 0.48) / 0.18);

    if (rig.current && !shouldReduceMotion) {
      rig.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
      rig.current.rotation.x = 0.08;
    }

    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.2 + c * 1.2;
      const s = 0.6 + c * 0.55;
      coreRef.current.scale.setScalar(s);
      mat.opacity = 0.15 + c * 0.85;
    }

    if (hubLight.current) {
      hubLight.current.intensity = 0.4 + c;
    }
  });

  return (
    <group ref={rig}>
      <ambientLight intensity={0.5} color="#7a8694" />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#e8eef5" />
      <directionalLight position={[-3, -1, 2]} intensity={0.3} color="#4a5560" />
      <pointLight
        ref={hubLight}
        position={[0, 0, 2]}
        intensity={0.4 + complete}
        color={CYAN}
      />

      {/* Center docking hub — modules lock around this */}
      <mesh position={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 32]} />
        <meshStandardMaterial
          color={STEEL_DARK}
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
      <mesh ref={coreRef} position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color="#e8fbff"
          emissive={CYAN}
          emissiveIntensity={0.3}
          metalness={0}
          roughness={0.2}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      <Text
        position={[0, -1.25, 0]}
        fontSize={0.1}
        color={CYAN}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        fillOpacity={0.5 + complete * 0.5}
      >
        {assembled ? "SYSTEM ASSEMBLED" : "DOCKING MODULES"}
      </Text>

      {/* Cross rails so the layout reads as intentional chassis */}
      <mesh position={[0, 0, -0.12]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.9, 0.03, 0.03]} />
        <meshStandardMaterial color={STEEL} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[0.03, 1.55, 0.03]} />
        <meshStandardMaterial color={STEEL} metalness={0.85} roughness={0.3} />
      </mesh>

      {modules.map((mod, i) => (
        <ModuleCard
          key={mod.code}
          module={mod}
          index={i}
          progressRef={progressRef}
        />
      ))}
    </group>
  );
}

export default function SuitAssembly({
  progress,
  modules = DEFAULT_MODULES,
  className = "",
}: SuitAssemblyProps) {
  const list = useMemo(() => modules, [modules]);
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isTouchOrMobile());
    setOk(hasWebGL());
    setReady(true);
  }, []);

  return (
    <div
      className={`h-full w-full min-h-[320px] ${className}`}
      aria-hidden="true"
    >
      {!ready || !ok ? (
        <div className="flex h-full min-h-[320px] items-center justify-center">
          <div
            className="h-24 w-24 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(77,184,255,0.35) 0%, transparent 70%)",
              boxShadow: "0 0 40px rgba(77,184,255,0.25)",
            }}
          />
        </div>
      ) : (
        <ClientErrorBoundary
          name="SuitAssembly"
          fallback={
            <div className="flex h-full min-h-[320px] items-center justify-center font-rajdhani text-xs uppercase tracking-wider text-arc-blue/40">
              Módulos em modo 2D
            </div>
          }
        >
          <Canvas
            dpr={mobile ? [1, 1] : [1, 1.5]}
            camera={{ position: [0, 0.15, 4.2], fov: 38 }}
            gl={{
              antialias: !mobile,
              alpha: true,
              powerPreference: mobile ? "low-power" : "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
          >
            <AssemblyScene progress={progress} modules={list} />
          </Canvas>
        </ClientErrorBoundary>
      )}
    </div>
  );
}
