import { useGLTF } from "@react-three/drei";
import marcel from "../Assets/MARCEL.glb";

export default function Marcel(props) {
  const { scene } = useGLTF(marcel);
  return <primitive object={scene} {...props} />;
}
