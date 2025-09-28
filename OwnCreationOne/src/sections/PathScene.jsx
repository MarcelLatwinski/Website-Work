import { Canvas } from "@react-three/fiber";
import PathScene from "./PathScene";

function pathScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <PathScene />
    </Canvas>
  );
}

export default pathScene;
