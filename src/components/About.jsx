import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from 'gsap/all';

const About = () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    
    useGSAP(() => {
        // Initialize SplitText for text animation
        const titleText = new SplitText("#text", {
            type: "words"
        });

        // Keep your original text animation
        gsap.fromTo(titleText.words, {
            opacity: 0.4,
            filter: "blur(10px)"
        }, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.8,
            scrollTrigger: {
                trigger: "#AboutDiv",
                start: "top 80%",
                end: "top 20%",
                scrub: true
            }
        });

        gsap.to("#content", {
            y: -100,
            opacity: 0,
            duration: 2,
            scrollTrigger: {
                trigger: "#AboutDiv",
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
                pin: "#AboutDiv",
                pinSpacing: false,
                anticipatePin: 1,
                onUpdate: (self) => {
                  
                    const progress = self.progress;
                    gsap.set("#content", {
                        scale: 1 - (progress * 0.1),
                        rotationX: progress * 5
                    });
                }
            }
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            titleText.revert();
        };

    }, []);

    return (
        <section 
            id="AboutDiv" 
            className="min-h-screen bg-black w-full flex flex-col items-center justify-center px-10 relative"
        >
            <div 
                id="content" 
                className="w-full relative flex flex-col justify-center max-w-6xl"
            >
                <h1 
                    id="title" 
                    className="text-white font-poppins font-semibold text-4xl md:text-6xl lg:text-7xl mb-8"
                >
                    About Me
                </h1>

                <p 
                    id="text" 
                    className="text-white w-full max-w-4xl text-justify leading-relaxed text-lg md:text-xl"
                >
                    Hi, I'm{" "}
                    <span className="font-poppins font-bold text-2xl capitalize text-gray-300">
                        Ayush Srivastava
                    </span>
                    . <br />
                    I'm a{" "}
                    <span className="font-semibold text-gray-200">
                        developer
                    </span>{" "}
                    who loves turning{" "}
                    <span className="text-gray-300 italic">ideas into functional and visually engaging digital experiences</span>.
                    My focus is on building{" "}
                    <span className="font-semibold text-gray-200">clean, responsive websites</span> and{" "}
                    <span className="font-semibold text-gray-200">applications</span> that balance{" "}
                    <span className="text-gray-300">creativity</span> with{" "}
                    <span className="text-gray-300">usability</span>.
                    <br /><br />

                    I enjoy{" "}
                    <span className="font-semibold text-gray-200">problem-solving</span>, learning{" "}
                    <span className="font-semibold text-gray-200">new technologies</span>, and finding{" "}
                    <span className="text-gray-300">efficient ways to bring projects to life</span>.
                    Along the way, I've worked on{" "}
                    <span className="font-semibold text-gray-200">diverse projects</span>—from{" "}
                    <span className="italic text-gray-300">interactive web apps</span> to{" "}
                    <span className="italic text-gray-300">data-driven dashboards</span>—and I'm always
                    excited to explore{" "}
                    <span className="font-semibold text-gray-200">what's next</span>.
                    <br /><br />

                    Beyond coding, I value{" "}
                    <span className="font-semibold text-gray-200">clear communication</span>,{" "}
                    <span className="font-semibold text-gray-200">teamwork</span>, and{" "}
                    <span className="font-semibold text-gray-200">continuous growth</span>.
                    When I'm not developing, you'll often find me{" "}
                    <span className="italic text-gray-300">exploring design trends</span>,{" "}
                    <span className="italic text-gray-300">playing basketball</span>, or{" "}
                    <span className="italic text-gray-300">getting inspired through blogs and anime</span>.
                </p>
            </div>
        </section>
    );
};

export default About;