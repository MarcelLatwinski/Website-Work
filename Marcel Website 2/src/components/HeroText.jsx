import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Blender", "Figma", "Jsx", "Css", "Github"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="sm:top-[40%] md:top-[15%] absolute right-0 z-10 sm:pr-4 md:pr-2 text-right">
  {/* Desktop View */}
  <div className="hidden md:flex flex-col c-space items-end">
    <motion.p
      className="text-2xl font-medium text-neutral-300 mt-2"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.5 }}
    >
      Built Using
    </motion.p>
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.8 }}
    >
      <FlipWords
        words={words}
        className="font-black text-white text-2xl"
      />
    </motion.div>
  </div>

  {/* Mobile View */}
  <div className="flex flex-col md:hidden items-end pr-4">
    <motion.p
      className="text-2xl font-black text-neutral-300"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.5 }}
    >
      Built Using
    </motion.p>
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.8 }}
    >
      <FlipWords
        words={words}
        className="font-bold text-white text-2xl"
      />
    </motion.div>
  </div>
</div>

  );
};

export default HeroText;
