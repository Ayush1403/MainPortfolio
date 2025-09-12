import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const headingRef = useRef(null);
  const createdTriggers = useRef([]);
  const [deviceType, setDeviceType] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Chaty",
      description: "A real time messaging app",
      tech: ["React", "Tailwind CSS", "Express", "Node.js", "SocketIO"],
      image: "/images/ChatWin.png",
      sourceCode: "https://github.com/Ayush1403/Chaty",
      demo: "https://chaty-2.onrender.com/",
    },
    {
      id: 2,
      name: "Sanskriti",
      description: "Heritage platform",
      tech: ["Node.js", "Express", "MongoDB", "ReactJs", "Leaflet.js"],
      image: "/images/sansWin.png",
      sourceCode: "https://github.com/Ayush1403/sanskriti",
      demo: "https://sanskrit-omega.vercel.app/",
    },
    {
      id: 3,
      name: "Makaan",
      description: "Real estate app",
      tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS"],
      image: "/images/MakWin.png",
      sourceCode: "https://github.com/Ayush1403/Makaan",
      demo: "https://makaan-gray.vercel.app/",
    },
    {
      id: 4,
      name: "Zentry",
      description: "A Game Company",
      tech: ["React js", "HTML", "CSS", "ScrollTrigger", "GSAP"],
      image: "/images/ZenWin.png",
      sourceCode: "https://github.com/Ayush1403/Zentry",
      demo: "https://zentry-pink.vercel.app/",
    },
  ];

  const getDeviceType = useCallback(() => {
    const w = window.innerWidth;
    if (w < 768) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  }, []);

  const killCreatedTriggers = useCallback(() => {
    if (createdTriggers.current && createdTriggers.current.length) {
      createdTriggers.current.forEach((t) => {
        try {
          t.kill?.();
        } catch (e) {}
      });
      createdTriggers.current.length = 0;
    }
  }, []);

  const initializeDesktopAnimation = useCallback(() => {
    if (!projectsRef.current || !containerRef.current) return;
    ScrollTrigger.getAll().forEach((trigger) => {
      try {
        if (trigger.vars && trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      } catch (e) {}
    });
    gsap.set(projectsRef.current, { x: 0 });
    if (window.innerWidth >= 1024) {
      const totalWidth = projectsRef.current.scrollWidth - window.innerWidth;
      if (totalWidth > 0) {
        const tween = gsap.to(projectsRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top 10%",
            end: `+=${totalWidth + window.innerHeight}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        if (tween.scrollTrigger) createdTriggers.current.push(tween.scrollTrigger);
      }
    }
  }, []);

  const initializeRevealAnimations = useCallback(() => {
    if (deviceType === "desktop") {
      ScrollTrigger.refresh();
      return;
    }
    if (headingRef.current) {
      const tween = gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
      if (tween.scrollTrigger) createdTriggers.current.push(tween.scrollTrigger);
    }
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card) => {
      const tween = gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
      if (tween.scrollTrigger) createdTriggers.current.push(tween.scrollTrigger);
    });
    ScrollTrigger.refresh();
  }, [deviceType]);

  useEffect(() => {
    const dt = getDeviceType();
    setDeviceType(dt);
    setIsInitialized(true);
  }, [getDeviceType]);

  useEffect(() => {
    if (!isInitialized) return;
    killCreatedTriggers();
    if (deviceType === "desktop") {
      initializeDesktopAnimation();
    } else {
      initializeRevealAnimations();
    }
    let resizeTimeout;
    const handleResize = () => {
      const currentDevice = getDeviceType();
      if (currentDevice !== deviceType) {
        setDeviceType(currentDevice);
      } else {
        if (deviceType === "desktop") {
          initializeDesktopAnimation();
        }
      }
    };
    const debounced = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };
    window.addEventListener("resize", debounced);
    return () => {
      window.removeEventListener("resize", debounced);
      clearTimeout(resizeTimeout);
      killCreatedTriggers();
      ScrollTrigger.getAll().forEach((trigger) => {
        try {
          if (trigger.vars && trigger.vars.trigger === containerRef.current) {
            trigger.kill();
          }
        } catch (e) {}
      });
    };
  }, [
    isInitialized,
    deviceType,
    getDeviceType,
    initializeDesktopAnimation,
    initializeRevealAnimations,
    killCreatedTriggers,
  ]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-black w-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
      id="project"
    >
      <div className="w-full flex flex-col items-center lg:items-start py-8 md:py-12 lg:py-16">
        <h1
          ref={headingRef}
          className="text-white font-poppins font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 md:mb-12 lg:mb-16 text-center lg:text-left leading-tight"
        >
          My Work
        </h1>
      </div>

      <div
        ref={projectsRef}
        className={`flex items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-wrap
          ${
            deviceType === "desktop"
              ? "flex-row flex-nowrap w-max"
              : "flex-col md:flex-row md:flex-wrap w-full max-w-5xl mx-auto items-center"
          }
        `}
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className={`project-card border-2 border-transparent hover:border-white transition-all duration-500 overflow-hidden
              ${
                deviceType === "mobile"
                  ? "w-full max-w-xs mx-auto"
                  : deviceType === "tablet"
                  ? "w-full md:w-1/2 px-2 mb-6 max-w-sm mx-auto"
                  : "w-72 lg:w-80 xl:w-84 h-72 lg:h-80 xl:h-84 flex-shrink-0 relative group"
              }
            `}
            style={{
              animationDelay: deviceType !== "desktop" ? `${idx * 0.06}s` : "0s",
            }}
          >
            {deviceType !== "desktop" ? (
              <div className="flex flex-col w-full">
                <div className="relative w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                  <h2 className="text-white absolute top-3 sm:top-4 left-3 sm:left-4 font-poppins font-semibold text-lg sm:text-xl z-10 drop-shadow-lg">
                    {project.name}
                  </h2>
                </div>
                <div className="w-full bg-black/60 backdrop-blur-sm flex flex-col justify-end p-4 sm:p-6 mt-3">
                  <h3 className="text-white font-poppins font-semibold text-xl sm:text-2xl mb-2">
                    {project.name}
                  </h3>
                  <p className="text-white text-sm sm:text-base mb-3 font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-gray-700/80 backdrop-blur-sm text-xs sm:text-sm rounded-md text-white px-2 sm:px-3 py-1 border border-gray-600/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white border border-white/80 px-3 sm:px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm flex-1 text-center rounded-sm backdrop-blur-sm font-medium"
                    >
                      Source
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black bg-white/90 border border-white px-3 sm:px-4 py-2 hover:bg-white transition-all duration-300 text-xs sm:text-sm flex-1 text-center rounded-sm backdrop-blur-sm font-medium"
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <h2 className="text-white absolute top-3 sm:top-4 left-3 sm:left-4 font-poppins font-semibold text-lg sm:text-xl lg:text-2xl z-10 drop-shadow-lg">
                  {project.name}
                </h2>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm sm:text-base mb-3 font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-gray-700/80 backdrop-blur-sm text-xs sm:text-sm rounded-md text-white px-2 sm:px-3 py-1 border border-gray-600/50 hover:bg-gray-600/80 transition-colors duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white border border-white/80 px-3 sm:px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm flex-1 text-center rounded-sm backdrop-blur-sm font-medium"
                    >
                      Source
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black bg-white/90 border border-white px-3 sm:px-4 py-2 hover:bg-white transition-all duration-300 text-xs sm:text-sm flex-1 text-center rounded-sm backdrop-blur-sm font-medium"
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
