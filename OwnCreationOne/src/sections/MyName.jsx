// src/sections/MyName.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import marcelUrl from "../Assets/MARCEL.glb";

function NameModel() {
  const { scene } = useGLTF(marcelUrl); // using public/ or assetsInclude
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Rotate continuously
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

export default function MyName() {
  return (
    <section className="h-screen w-full bg-gray-900 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* 🌟 Lighting setup */}
        <ambientLight intensity={0.4} /> {/* soft base light */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow /> {/* key light */}
        <directionalLight position={[-5, -5, -5]} intensity={0.5} /> {/* fill/back light */}
        <pointLight position={[0, 3, 2]} intensity={0.8} /> {/* extra point glow */}

        {/* 3D Model */}
        <NameModel />

        {/* 🎮 OrbitControls without scroll zoom */}
        <OrbitControls enableZoom={false} /> 
        <Environment preset="studio" />
      </Canvas>
    </section>
  );
}
