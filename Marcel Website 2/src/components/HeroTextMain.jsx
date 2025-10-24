import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import Marcel from "../components/Marcel";
import { Environment } from "@react-three/drei";

const HeroTextMain = () => {
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="z-10 mt-20 text-left md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-6xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm
        </motion.h1>
        <div className="transform -translate-x-40 translate-y-10 h-90 w-[75rem]">
          <Canvas camera={{ position: [0, 0, 7], fov: 11 }} className="!overflow-visible h-full">
            {/* 🌟 Lighting setup */}
            <ambientLight intensity={0.4} /> {/* soft base light */}
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.2}
              castShadow
            />{" "}
            {/* key light */}
            <directionalLight position={[-5, -5, -5]} intensity={0.5} />{" "}
            {/* fill/back light */}
            <pointLight position={[0, 3, 2]} intensity={0.8} />{" "}
            {/* 3D Model */}
            <Marcel />
            <Environment preset="studio" />
          </Canvas>
          </div>
        </div>
      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, Im
        </motion.p>
        <div></div>
      </div>
    </div>
  );
};

export default HeroTextMain;
