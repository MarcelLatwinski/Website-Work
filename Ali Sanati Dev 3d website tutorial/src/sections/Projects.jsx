import { myProjects } from "../constants"; //Project Data
import Project from "../components/Project";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

const Projects = () => {
  const x = useMotionValue(0); //JUST CREATES A MOTION-ENABLED VARAIBLE (a stateful value that framer motion can animate)
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 5, stiffness: 200 }); //Take the cursor values and applies spring physics
  const springY = useSpring(y, { damping: 5, stiffness: 200 });
  const handleMouseMove = (e) => { //e->event object passed automatically to every event handler in react. As this func is attatched to the <section> it will run every time the mouse is in that section
    x.set(e.clientX + 20); //Gives Coordinates of Mouse Position and sets the x value it
    y.set(e.clientY + 20);
  };

  const [preview, setPreview] = useState(null); //Holds the currently hovered/selected projects preview image

  return (
    //onMouseMove binds to mouse tracker
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {/* Loops through myProjects Array and for each one-> creates a <Project/> Componnet, passes all the projects properties via {...project}, adds a key for reacts list rendering, and gives it setPreview so that the child can trigger hover previews */}
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {/* Floating Preview Image that follows cursor */}
      {preview && <motion.img
        className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
        src={preview}
        style={{ x: springX, y: springY }}
      />}
    </section>
  );
};

export default Projects;
