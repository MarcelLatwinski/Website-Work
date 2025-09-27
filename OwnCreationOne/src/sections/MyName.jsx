// src/sections/MyName.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import Marcel from "../components/Marcel";
import Planet from "../components/Planet";
import { useMediaQuery } from "react-responsive";

export default function MyName() {

  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* 🌟 Lighting setup */}
        <ambientLight intensity={0.4} /> {/* soft base light */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow /> {/* key light */}
        <directionalLight position={[-5, -5, -5]} intensity={0.5} /> {/* fill/back light */}
        <pointLight position={[0, 3, 2]} intensity={0.8} /> {/* extra point glow */}

        <Planet 
          scale={isMobile && 0.23}
          position={isMobile && [0, -1.5, 0]}
        />

        {/* 3D Model */}
        <Marcel />

        {/* 🎮 OrbitControls without scroll zoom */}
        <OrbitControls enableZoom={false} /> 
        <Environment preset="studio" />
      </Canvas>
    </section>
  );
}
