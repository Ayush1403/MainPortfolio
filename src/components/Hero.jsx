import React , {useEffect} from 'react'
import { FaArrowRight } from "react-icons/fa6";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger , SplitText } from 'gsap/all';
import { Link } from 'react-router-dom';

const Hero = () => {
    gsap.registerPlugin(ScrollTrigger , SplitText)

    useGSAP(()=>{
        const heading = SplitText.create("#HeadingDiv",{
            type: "words"
        })

        gsap.from(heading.words,{
            y:20,
            opacity:0,
            duration: 4,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: ()=>{
                heading.revert();
            }
        })
    });

    useGSAP(() => {
        const tl = gsap.timeline({paused:true})

        tl.to("#btn",{
                y: -15,
                opacity:0,
                duration: 0.5,
                ease: "power2.inOut"
            })
         tl.set("#btn",{
            y: 15,
            opacity:0
        })
         tl.to("#btn",{
            y: 0,
            opacity:1,
            duration:0.5,
             ease: "power2.inOut"
        })
         tl.eventCallback("onComplete", () => {
            const btn = document.querySelector("#btn");
            btn.addEventListener("mouseenter", () => {
                tl.restart();
            });
        }, [])

        gsap.to("#ContentDiv",{
            y:0,
            duration:2,
            opacity: 0,
            scrollTrigger:{
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

    // Fixed navigation function
    const scrollToProject = () => {
        const projectSection = document.getElementById('project');
        if (projectSection) {
            projectSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <section id='HeroDiv' className='relative w-full min-h-screen'>
            <div id='ContentDiv' className='absolute flex w-full h-full '>
                <div id='HeadingDiv' className='top-0 absolute w-full -space-y-4 lg:-space-y-11 lg:w-1/2 flex  md:flex-col z-50  text-white m-20 text-[2rem]  md:text-[4rem] lg:text-[4.2rem] p-4 font-bold font-poppins'>
                    <h1 className='uppercase mr-4'>Design <span>{" "}</span> </h1> 
                    <div><h1 className=' uppercase flex items-center gap-2'><span className='font-poppins uppercase text-[#cac9cc] text-[2.3rem]  md:text-[4.3rem] lg:text-[6.3rem]'>&  {" "} </span > Development</h1></div>
                </div>
                
                <div id='subHeading' className='absolute z-50 ml-20 bottom-1/2 text-white font-poppins w-64 flex left-10 items-start justify-start'>
                    <h6>
                         I turn bold ideas into standout brands and sleek websites. Let's bring your vision to life
                    </h6>
                </div>
                
                <div className='absolute right-0 lg:w-1/2 h-full'>
                    <video src="/videos/Untitled design.mp4" autoPlay muted loop playsInline className='size-full object-cover '></video>
                </div>
                
                <button 
                    onClick={scrollToProject} 
                    className='h-10 btn w-46 p-2 cursor-pointer overflow-hidden font-poppins font-medium flex justify-center items-center absolute left-30  rounded-full bottom-[40%] bg-white  text-black  z-50'
                >
                    <span id='btn'> Watch My Work</span>
                    <span className='h-fit bg-black ml-2 rounded-full text-white p-[9px]'>
                        <FaArrowRight />
                    </span>
                </button>
                
                <div className='lg:left-1/4 left-1/2 absolute flex flex-col gap-2 items-center bottom-10 -translate-x-1/2'>
                    <h1 className='text-white text-sm uppercase font-semibold z-50'>Scroll Down</h1>
                    <div className=' bottom-20 flex justify-center items-start h-10 w-6 rounded-4xl  border-3 border-white z-50'>
                        <span className='text-white h-full text-4xl mb-1 animate-bounce'>.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero