import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const grid2Container = useRef();

  return (
    <section className="c-space section-spacing">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            alt="Coding"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Marcel Latwinski</p>
            <p className="subtext">
              Over my Lifetime, I have developed numerous skills including{" "}
              <b>Graphic Design, Music Production</b>
              and <b>Web Design.</b> This allows me to approach to <b>any </b>
              situation with <b>out-of-the-box</b> thinking.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -button-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              {" "}
              CODE IS CRAFT{" "}
            </p>
            <Card
              containerRef={grid2Container}
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="GRASP"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="SRP"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
            />
            <Card
              containerRef={grid2Container}
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in Durham / London / Polska, and open to remote work
              across the galaxy
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you Want to start a Project Together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">I'm a Genius</p>
            <p className="subtext">I do not specialise, I adapt. <br /> I do not know, I learn. <br /> I do not eat, I starve. <br /> Hire me, I need money.</p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
          <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
