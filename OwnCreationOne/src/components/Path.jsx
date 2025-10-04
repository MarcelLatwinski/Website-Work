import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import path from "../Assets/Path.glb";

const Path = () => {
  const { scene } = useGLTF(path);
  const pathRef = useRef();
  const { camera, gl } = useThree(); // grab renderer (gl) to attach listeners
  const [virtualScroll, setVirtualScroll] = useState(0);
  const isHovered = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const handleWheel = (e) => {
      if (!isHovered.current) return; // only when hovering
      e.preventDefault();
      setVirtualScroll((prev) => Math.max(0, prev + e.deltaY));
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [gl]);

  const SPEED = 0.002; // tweak this to adjust feel

  useFrame(() => {
    if (!pathRef.current) return;

    const mesh = pathRef.current.children[0];
    if (mesh && mesh.geometry) {
      if (!mesh.geometry.boundingBox) {
        mesh.geometry.computeBoundingBox();
      }
      const bbox = mesh.geometry.boundingBox;
      const pathLength = bbox.max.z - bbox.min.z; // assuming forward axis is Z

      // translate scroll to distance
      const distance = virtualScroll * SPEED;

      // wrap around smoothly
      const normalized = distance % pathLength;

      // move along Z
      camera.position.set(1, 2, normalized);
      camera.lookAt(1, 2, normalized);
      //camera.rotation.y = Math.PI;
    }
  });


  return (
    <primitive
      object={scene}
      ref={pathRef}
      onPointerOver={() => (isHovered.current = true)}
      onPointerOut={() => (isHovered.current = false)}
    />
  );
};

export default Path;
