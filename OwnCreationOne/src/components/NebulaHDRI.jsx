import { useGLTF } from "@react-three/drei";
import HDRI from "../Assets/NebulaHDRI.glb"

const NebulaHDRI = () => {

  const { scene } = useGLTF(HDRI);

  return (
    <primitive
      object={scene}
      scale={5} // huge scale so it surrounds everything
      rotation={[0, 0, 0]}
    />
  );
};

export default NebulaHDRI;