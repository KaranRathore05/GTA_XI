import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);
  const dateRef = useRef(null);

  // intro mask animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate() {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  // page animations once content is visible
  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", { scale: 1, rotate: 0, duration: 2, ease: "Expo.easeInOut", delay: -1 });
    gsap.to(".sky",  { scale: 1.1, rotate: 0, duration: 2, ease: "Expo.easeInOut", delay: -0.7 });
    gsap.to(".bg",   { scale: 1.1, rotate: 0, duration: 2, ease: "Expo.easeInOut", delay: -0.7 });
    gsap.to(".text", { scale: 1,   rotate: 0, duration: 2, ease: "Expo.easeInOut", delay: -0.7 });
    gsap.to(".girl", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: -0.7,
      x: "-50%",
      bottom: "-45%",
    });
    gsap.to(".logo18", {
      scale: 0.4,
      rotate: 0,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: -0.7,
      x: "20%",
      bottom: "15%",
    });

    // colour‑on‑scroll tween for "MAY 26"
    gsap.fromTo(
      dateRef.current,
      { color: "#FF0090" },   
      {
        color: "#facc15",     
        ease: "none",
        scrollTrigger: {
          trigger: dateRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    // parallax mouse‑move
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / innerWidth - 0.5) * 40;
      gsap.to(".imagesdiv .text", { x: `${xMove * 0.5}%` });
      gsap.to(".sky", { x: xMove * 4 });
      gsap.to(".bg",  { x: xMove * 1.2 });
    });
  }, [showContent]);

  return (
    <>
      {/* intro mask */}
      <div className="svg fixed inset-0 z-[100] flex items-center justify-center w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full bg-black rotate-[-10deg] scale-[1.7]">
          {/* hero section */}
          <div className="relative w-full h-screen bg-black overflow-hidden">
            <div className="navbar absolute top-0 left-0 z-[10] w-full px-10 py-10">
              <div className="logo flex items-center gap-7">
                <div className="lines flex flex-col gap-[6px]">
                  <div className="line w-12 h-1 bg-white" />
                  <div className="line w-8  h-1 bg-white" />
                  <div className="line w-5  h-1 bg-white" />
                </div>
                <h3 className="text-4xl text-white">ROCKSTAR</h3>
              </div>
            </div>

            <div className="imagesdiv relative w-full h-full overflow-hidden">
              <img className="sky  absolute inset-0 w-full h-full object-cover rotate-[-20deg]" src="../sky.png" alt="" />
              <img className="bg   absolute inset-0 w-full h-full object-cover scale-[2] rotate-[-3deg]" src="../bg.png"  alt="" />
              <div className="text absolute top-15 left-1/2 -translate-x-1/2 flex flex-col gap-3 text-white text-9xl scale-[1.2] rotate-[10deg]">
                <h1 className="text-[10rem] -ml-40 leading-none">grand</h1>
                <h1 className="text-[10rem]  ml-20 leading-none">theft</h1>
                <h1 className="text-[10rem] -ml-40 leading-none">auto</h1>
              </div>
              <img className="logo18 absolute left-1/2 -bottom-[50%] scale-[1]" src="../logo18.png" alt="" />
              <img className="girl absolute left-1/2 -bottom-[150%] -translate-x-1/2 scale-[3] rotate-[-20deg]" src="../girlbg.png" alt="" />
            </div>

            <div className="btmbar absolute bottom-0 left-0 w-full px-10 py-11 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center gap-4 text-xl text-white mt-5">
                <i className="ri-arrow-down-double-line" />
                <h4>Scroll Down</h4>
              </div>
              <img className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="../ps5.png" alt="" />
            </div>
          </div>

          {/* second section */}
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="cntr w-full h-[80%] flex items-center">
              <div className="limg relative h-full w-1/2">
                <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="../imag.png" alt="" />
              </div>

              <div className="right w-[30%] text-white">
                <h2 className="text-9xl">COMING,</h2>
                <h2 ref={dateRef} className="text-9xl text-yellow-500">MAY&nbsp;26</h2>
                <h2 className="text-9xl">2026</h2>
                <p className="font-[Aerial] text-2xl mt-10 w-[90%]">
                  Welcome to the next era of chaos and freedom. GTA VI takes you
                  deep into Vice City, re‑imagined with stunning realism, gritty
                  stories, and unparalleled open‑world detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
