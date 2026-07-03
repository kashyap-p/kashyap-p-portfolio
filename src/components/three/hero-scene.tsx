"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Icosahedron,
  Torus,
  Octahedron,
  Tetrahedron,
} from "@react-three/drei";
import * as THREE from "three";

function CoreBlob() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25;
      inner.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Wireframe outer shell */}
      <Icosahedron args={[1.55, 1]}>
        <meshBasicMaterial
          color="#5eead4"
          wireframe
          transparent
          opacity={0.18}
        />
      </Icosahedron>

      {/* Distorted glowing core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 4]} />
        <MeshDistortMaterial
          color="#10b981"
          emissive="#047857"
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.55}
          distort={0.42}
          speed={1.6}
        />
      </mesh>

      {/* Inner amber gem */}
      <Octahedron args={[0.5, 0]}>
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </Octahedron>
    </group>
  );
}

type OrbitingShapeProps = {
  radius: number;
  speed: number;
  phase: number;
  yOffset: number;
  children: React.ReactNode;
  scale?: number;
};

function OrbitingShape({
  radius,
  speed,
  phase,
  yOffset,
  children,
  scale = 1,
}: OrbitingShapeProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = yOffset + Math.sin(t * 1.4) * 0.25;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.014;
    }
  });
  return (
    <group ref={ref} scale={scale}>
      {children}
    </group>
  );
}

function FloatingShapes() {
  return (
    <>
      <OrbitingShape radius={2.6} speed={0.5} phase={0} yOffset={0.2}>
        <Torus args={[0.32, 0.12, 16, 40]}>
          <meshStandardMaterial
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.7}
          />
        </Torus>
      </OrbitingShape>

      <OrbitingShape
        radius={2.9}
        speed={-0.38}
        phase={2.1}
        yOffset={-0.4}
        scale={0.9}
      >
        <Tetrahedron args={[0.34, 0]}>
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.6}
          />
        </Tetrahedron>
      </OrbitingShape>

      <OrbitingShape
        radius={2.3}
        speed={0.62}
        phase={4.2}
        yOffset={0.6}
        scale={0.8}
      >
        <Octahedron args={[0.28, 0]}>
          <meshStandardMaterial
            color="#f472b6"
            emissive="#db2777"
            emissiveIntensity={0.5}
            roughness={0.25}
            metalness={0.65}
          />
        </Octahedron>
      </OrbitingShape>

      <OrbitingShape
        radius={3.2}
        speed={-0.3}
        phase={1.2}
        yOffset={-0.2}
        scale={1.1}
      >
        <Icosahedron args={[0.26, 0]}>
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#0d9488"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.7}
          />
        </Icosahedron>
      </OrbitingShape>
    </>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (group.current) {
      const targetX = pointer.y * 0.25;
      const targetY = pointer.x * 0.4;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    }
  });

  return <group ref={group}>{children}</group>;
}

function SceneContents() {
  const lights = useMemo(
    () => (
      <>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} color="#a7f3d0" />
        <pointLight position={[-6, -3, -4]} intensity={2.2} color="#fbbf24" />
        <pointLight position={[6, 3, 4]} intensity={1.6} color="#f472b6" />
        <spotLight
          position={[0, 8, 2]}
          angle={0.5}
          penumbra={1}
          intensity={1.2}
          color="#5eead4"
        />
      </>
    ),
    []
  );

  return (
    <>
      {lights}
      <MouseParallax>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
          <CoreBlob />
        </Float>
        <FloatingShapes />
      </MouseParallax>

      <Sparkles
        count={60}
        scale={[12, 8, 8]}
        size={2.2}
        speed={0.35}
        opacity={0.7}
        color="#5eead4"
      />
      <Sparkles
        count={20}
        scale={[10, 7, 6]}
        size={3.5}
        speed={0.25}
        opacity={0.6}
        color="#fbbf24"
      />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
