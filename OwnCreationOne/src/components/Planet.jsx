import { useMotionValue, useSpring } from "framer-motion";
import planet from "../Assets/Planet.glb";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Planet = () => {
  const { scene } = useGLTF(planet);
  const ref = useRef();

  const yPos = useMotionValue(5);
  const ySpring = useSpring(yPos, { damping: 30 });

  const rotY = useMotionValue(2 * Math.PI);
  const rotYSpring = useSpring(rotY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    ySpring.set(-1);
    rotYSpring.set(0);
  }, [yPos, rotY]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    // Entrance animation values
    const baseY = ySpring.get();
    const baseRotY = rotYSpring.get();

    // Floating offset (very small so it looks like idle drift)
    const floatY = Math.sin(t) * 0.05 + 0.5;
    const floatX = Math.sin(t * 0.5) * 0.02;

    // Apply combined transforms
    ref.current.position.y = baseY + floatY;
    ref.current.position.x = floatX;
    ref.current.rotation.y = baseRotY + Math.sin(t * 0.5) * 0.01;
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.02 + (Math.PI / 2) * 0.9;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.05 - 1;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      renderOrder={0}
      //rotation={[1.5, 0, -1]}
      scale={0.6}
      position={[0, -1, -2]}
    />
  );
};

export default Planet;
