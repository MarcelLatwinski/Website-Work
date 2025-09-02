
import * as THREE from "three"

export function Sky() {

  return (
    <>
          <mesh>
                <sphereGeometry args = {[100,100,32,32]} />
                <meshStandardMaterial color="skyblue" side={THREE.DoubleSide} />
          </mesh>
    </>
  );
}
