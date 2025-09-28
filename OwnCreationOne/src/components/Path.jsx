import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import path from "../Assets/Path.glb";

const PathScene = () => {
  const { scene } = useGLTF(path);
  const cameraRef = useRef();
  const pathRef = useRef();
  
  const [scrollPos, setScrollPos] = useState(0);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!cameraRef.current || !pathRef.current) return;

    const normalized = (scrollPos % 5000) / 5000; // loop every 5000px
    const pathLength = pathRef.current.children[0].geometry.boundingBox.max.x;

    // Move camera along the path's X-axis
    cameraRef.current.position.x = normalized * pathLength;

    // Optional: make the camera look slightly forward along the path
    cameraRef.current.lookAt(
      normalized * pathLength + 1,
      cameraRef.current.position.y,
      cameraRef.current.position.z
    );
  });

  return (
    <>
      <primitive object={scene} ref={pathRef} />
      <perspectiveCamera ref={cameraRef} position={[0, 2, 5]} />
    </>
  );
};

export default PathScene;