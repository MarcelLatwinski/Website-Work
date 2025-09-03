import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, MotionPathControls } from '@react-three/drei'
import { useMemo } from 'react'

export function MainScene() {
  // ✅ define curve properly
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 2, -5),
      new THREE.Vector3(10, 0, -10),
      new THREE.Vector3(15, -2, -15),
    ])
  }, [])

  return (
    <>
      {/* Wrap content with ScrollControls */}
      <ScrollControls pages={3}>
        {/* ✅ MotionPathControls expects an array of curves */}
        <MotionPathControls curves={[curve]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </MotionPathControls>
      </ScrollControls>
    </>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight />
      <MainScene />
    </Canvas>
  )
}
