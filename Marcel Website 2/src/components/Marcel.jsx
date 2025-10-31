import { useGLTF } from "@react-three/drei";
const marcel = "/assets/MARCEL.glb";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Letter({ mesh }) {
  const ref = useRef(); //Creates a mutable object that survives re-renders
  const [hovered, setHovered] = useState(false);  

  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => { //R3F Render loop hook that runs ~60 times per sec; state -> the r3f state object , delta -> the time (in sec) since the last frame
    if (!ref.current) return; // Check the mesh exists before doing anything
    
    const t = state.clock.getElapsedTime();
    ref.current.position.y = mesh.position.y + Math.sin(t + offset) * 0.001;
    ref.current.rotation.y = Math.sin(t * 0.5 + offset) * 0.01;
    ref.current.position.x = Math.sin(t * 0.5 + offset) * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.5 + offset) * 0.02 + Math.PI/2 * 0.9;
    ref.current.rotation.z = Math.sin(t * 0.5 + offset) * 0.05;
    
    const target = hovered ? 1.2 : 1; 
    const s = THREE.MathUtils.lerp(ref.current.scale.x, target, 6 * delta); //Core smoothing step
    ref.current.scale.set(s, s, s);
  });


  return (
    <primitive
      ref={ref}
      object={mesh}
      position={[0, 0, 1]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        console.log("pointer over");
      }}
      onPointerOut={() => setHovered(false)}
    />
  );
}

export default function Marcel() {
  const { scene } = useGLTF(marcel);

  // Collect all meshes from the GLB
  const meshes = [];
  scene.traverse((child) => {
  if (child.isMesh) {
    const clone = child.clone();
    // Set a new color (e.g., purple)
    clone.material = clone.material.clone(); // ensure we don't modify original
    clone.material.color = new THREE.Color("#F2EFFF"); 
    meshes.push(clone);
  }
});

  return (
     <group position={[0, -0.2, 0]} scale={[1,1,1]}>
      {meshes.map((mesh, i) => (
        <Letter key={i} mesh={mesh} />
      ))}
      </group>
  );
}
