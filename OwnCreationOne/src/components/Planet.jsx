import { useMotionValue, useSpring } from "framer-motion";
import planet from "../Assets/Planet.glb";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Planet = () => {
  const { scene } = useGLTF(planet);
  const ref = useRef();

  // Idle springs for position only
  const yPos = useMotionValue(5);
  const ySpring = useSpring(yPos, { damping: 30 });

  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  // Store "idle center" orientation
  const idleCenter = useRef({ x: Math.PI / 2 * 0.9, y: 0 });

  useEffect(() => {
    ySpring.set(-1);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const baseY = ySpring.get();

    // Floating offsets
    const floatY = Math.sin(t) * 0.05 + 0.5;
    const floatX = Math.sin(t * 0.5) * 0.02;

    if (!isDragging) {
      // Apply inertia
      ref.current.rotation.y += vel.current.x;
      ref.current.rotation.x += vel.current.y;

      vel.current.x *= 0.95; // damping
      vel.current.y *= 0.95;

      // When inertia fades, update idle center to current orientation
      if (
        Math.abs(vel.current.x) < 0.0005 &&
        Math.abs(vel.current.y) < 0.0005
      ) {
        idleCenter.current.x = ref.current.rotation.x;
        idleCenter.current.y = ref.current.rotation.y;

        // Idle oscillations around wherever it stopped
        ref.current.rotation.y =
          idleCenter.current.y + Math.sin(t * 0.5) * 0.002;
        ref.current.rotation.x =
          idleCenter.current.x + Math.sin(t * 0.7) * 0.002;
      }
    }

    // Always apply Z wobble
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.1 - 1;

    // Apply floating position
    ref.current.position.y = baseY + floatY;
    ref.current.position.x = floatX;
  });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - last.current.x) * 0.002;
    const deltaY = (e.clientY - last.current.y) * 0.002;

    ref.current.rotation.y += deltaX;
    ref.current.rotation.x += deltaY;

    vel.current.x = deltaX;
    vel.current.y = deltaY;

    last.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.6}
      position={[0, -1, -2]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    />
  );
};

export default Planet;
