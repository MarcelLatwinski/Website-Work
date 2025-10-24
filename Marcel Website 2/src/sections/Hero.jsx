import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import HeroTextMain from "../components/HeroTextMain";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Particles } from "../components/Particles";
import { Globe } from "../components/globe";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section
      id="home"
      className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space"
    >
      <HeroText />
      <HeroTextMain />
      <Particles
        className="absolute inset-0 -z-50"
        quantity={500}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <figure className="absolute sm:scale-120 sm:right-[16%] sm:bottom-[-5%] md:right-[-5%] md:bottom-[-15%] md:sm:scale-200">
          <Globe />
        </figure>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
