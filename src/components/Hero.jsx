import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from 'gsap/all';

const Hero = () => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    useGSAP(() => {
        const heading = SplitText.create("#HeadingDiv", { type: "words" })
        gsap.from(heading.words, {
            y: 20,
            opacity: 0,
            duration: 4,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: () => heading.revert()
        })
    });

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true })
        tl.to("#btn", { y: -15, opacity: 0, duration: 0.5, ease: "power2.inOut" })
          .set("#btn", { y: 15, opacity: 0 })
          .to("#btn", { y: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" })
          .eventCallback("onComplete", () => {
              const btn = document.querySelector("#btn");
              btn.addEventListener("mouseenter", () => tl.restart());
          })

        gsap.to("#ContentDiv", {
            y: 0,
            duration: 2,
            opacity: 0,
            scrollTrigger: {
                trigger: "#HeroDiv",
                scrub: true,
                start: "center center",
                end: "top top",
                pin: true,
                pinSpacing: false,
                endTrigger: "#AboutDiv"
            }
        })
    })

    const scrollToProject = () => {
        const projectSection = document.getElementById('project');
        if (projectSection) projectSection.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id='HeroDiv' className='relative w-full min-h-screen flex items-center'>
            <div id='ContentDiv' className='relative w-full flex flex-col md:flex-row h-full'>
                <div className='w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-white p-6 md:p-20'>
                    <div id='HeadingDiv' className='space-y-2'>
                        <h1 className='uppercase text-[4rem] md:text-[6rem] lg:text-[7rem] font-bold font-poppins text-center md:text-left'>
                            DESIGN
                        </h1>
                        <h1 className='uppercase flex items-center gap-2 text-center md:text-left'>
                            <span className='text-[#cac9cc] text-[4rem] md:text-[6rem] lg:text-[7rem] font-poppins'>&</span>
                            <span className='text-white text-[4rem] font-bold md:text-[6rem] lg:text-[7rem] font-poppins'>DEVELOPMENT</span>
                        </h1>
                    </div>
                    <h6 className='text-center md:text-left mt-4 max-w-xs'>
                        I turn bold ideas into standout brands and sleek websites. Let's bring your vision to life
                    </h6>
                    <button
                        onClick={scrollToProject}
                        className='mt-6 h-10 w-46 p-2 cursor-pointer overflow-hidden font-poppins font-medium flex justify-center items-center rounded-full bg-white text-black'
                    >
                        <span id='btn'> Watch My Work</span>
                        <span className='h-fit bg-black ml-2 rounded-full text-white p-[9px]'>
                            <FaArrowRight />
                        </span>
                    </button>
                </div>

                <div className='w-full md:w-1/2 h-96 md:h-full relative'>
                    <video src="/videos/Untitled design.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover'></video>
                </div>
            </div>

            <div className='absolute left-1/2 bottom-10 flex flex-col items-center -translate-x-1/2'>
                <h1 className='text-white text-sm uppercase font-semibold z-50'>Scroll Down</h1>
                <div className='flex justify-center items-start h-10 w-6 rounded-4xl border-3 border-white z-50 mt-2'>
                    <span className='text-white h-full text-4xl mb-1 animate-bounce'>.</span>
                </div>
            </div>
        </section>
    )
}

export default Hero
