import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./components/Contact";
import { Route, Routes } from "react-router-dom";
import Navbar from "./assets/NavBar";

const App = () => {
  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-black">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="project">
        <Project />
      </section>
      <section id="contact">
        <Contact />
      </section>

      <Routes>
        <Route path="project" element={<Project />} />
      </Routes>
    </main>
  );
};

export default App;
