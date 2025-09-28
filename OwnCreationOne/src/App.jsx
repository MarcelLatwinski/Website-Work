import React from "react";
import Navbar from "./sections/Navbar";
import MyName from "./sections/myName";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <MyName />
      <section className="min-h-screen" />
      <section className="min-h-screen" />
    </div>
  );
}

export default App;
