import { useMotionValue, useSpring } from "framer-motion";
import planet from "../Assets/Planet.glb";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";


const Planet = () => {

  const { scene } = useGLTF(planet);
  const ref = useRef();

  const yPos = useMotionValue(5);
  const ySpring = useSpring(yPos, {damping: 30});

  const rotY = useMotionValue(2*Math.PI);
  const rotYSpring  = useSpring(rotY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    ySpring.set(-1);
    rotYSpring.set(0);
  }, [ySpring]);

  useFrame(() => {
    ref.current.position.y = ySpring.get();
    ref.current.rotation.y = rotYSpring.get();
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      renderOrder={0}
      rotation={[1.5, 0, -1]}
      scale={0.7}
      position={[0, -1, -2]}
    />
);
};

export default Planet;