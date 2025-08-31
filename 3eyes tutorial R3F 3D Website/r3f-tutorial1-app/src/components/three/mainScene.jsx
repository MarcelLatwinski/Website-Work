
import { useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MainScene() {
  // Canvas element of react3five responds to the size of its parents div
  const can1Ref = useRef()
  const can1SpinRef = useRef()
  const initialPosition = [0,0,0]
  const initialRotation = [0,0,0]
  
  useGSAP(() => {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            markers: true,
        }
    })

    timeline
        .to(can1Ref.current.position, {
            x: 0.5,
            y: 0,
            z: 3
        })
        .to(can1Ref.current.position, {
            x: 0,
            y: 0,
            z: 0
        })
        .to(can1Ref.current.rotation, {
            x: Math.PI/4
        }, 0.5)
        .to(can1Ref.current.rotation, {
            x: 0,
            ease: "power2.out"
        }, 1.5)
        .to(can1SpinRef.current.rotation, {
            y: Math.PI/4
        }, 0)       
        .to(can1SpinRef.current.rotation, {
            y: 0
        })   
  })

  return (
    <>
      <group ref={can1Ref} position = {initialPosition} rotation = {initialRotation}>
        <group ref={can1SpinRef}>
          <mesh>
            <cylinderGeometry args={[1, 1, 2, 8, 8]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      </group>
    </>
  );
}
