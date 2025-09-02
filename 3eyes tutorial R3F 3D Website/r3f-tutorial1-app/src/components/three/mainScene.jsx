import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, MotionPathControls, useMotion } from "@react-three/drei";
import * as THREE from "three";

export function MainScene() {
  const boxRef = useRef();
  const scroll = useScroll();
  const motion = useMotion();

  const { straightLine } = useMemo(() => {
    const start = new THREE.Vector3(0, -2, 0);
    const end = new THREE.Vector3(0, 2, 0);
    const straightLine = new THREE.CatmullRomCurve3([start, end], false);

    return { straightLine };
  }, []);

  useFrame((state, delta) => {
    //console.log(scroll.offset)
  });

  return (
    <>
      <MotionPathControls
        curves={[straightLine]}
        object={boxRef}
        debug={true}
      ></MotionPathControls>
      <group ref={boxRef}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </>
  );
}
