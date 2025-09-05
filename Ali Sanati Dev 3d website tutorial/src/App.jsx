import React from "react";
import Navbar from "./sections/navbar"
import Hero from "./sections/Hero"

const App = () => { //Defines a function component - reusable building block of UI - written as an arrow function - modern shorthand for writing functions in javascript
  return (
  <div className="container mx-auto max-w-7xl">
    <Navbar />
    <Hero />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    <section className="min-h-screen" />
    {/* about */}
    {/* projects */}
    {/* experience */}
    {/* testimonial */}
    {/* contact */}
    {/* footer */}
  </div>
  );
};

export default App; //Default export so dont need {} when importing