import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Path from "../components/Path";

function PathScene() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        {/* Path handles scroll + camera movement */}
        <Path />

        {/* Lighting / background */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

export default PathScene;
