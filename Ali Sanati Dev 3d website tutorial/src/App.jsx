import React from "react";
import Navbar from "./sections/navbar"
import Hero from "./sections/Hero"
import About from "./sections/About";
import Projects from "./sections/Projects";

const App = () => { //Defines a function component - reusable building block of UI - written as an arrow function - modern shorthand for writing functions in javascript
  return (
  <div className="container mx-auto max-w-7xl">
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    {/* experience */}
    {/* testimonial */}
    {/* contact */}
    {/* footer */}
  </div>
  );
};

export default App; //Default export so dont need {} when importing