"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * A fake 3D car model made out of primitives.
 * Click + drag to rotate, scroll to zoom.
 */
export default function CarModelViewer() {
  return (
    <div className="w-full h-[400px] bg-zinc-100 rounded-lg shadow-inner">
      <Canvas camera={{ position: [4, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <FakeCar />
          <Environment preset="city" />
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * A minimal placeholder "car" made of boxes + cylinders.
 */
function FakeCar() {
  const bodyColor = new THREE.Color("#d4d4d8"); // zinc-ish
  const tireColor = new THREE.Color("#111");

  return (
    <group position={[0, -0.3, 0]}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.9]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-0.9, 0, 0.45],
        [0.9, 0, 0.45],
        [-0.9, 0, -0.45],
        [0.9, 0, -0.45],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.2, 0.2, 0.3, 32]} />
          <meshStandardMaterial color={tireColor} />
        </mesh>
      ))}
    </group>
  );
}
