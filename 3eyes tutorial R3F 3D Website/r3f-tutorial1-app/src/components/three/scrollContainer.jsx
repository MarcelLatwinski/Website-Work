import { ScrollControls } from "@react-three/drei";
import { MainScene } from "./mainScene";

export function ScrollContainer() {
  return (
    <>
      <ScrollControls pages={6} damping={0.3}>
        <MainScene />
      </ScrollControls>
    </>
  );
}
