import React from "react";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Project from "./components/Project.jsx";
import Contact from "./components/Contact.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

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
