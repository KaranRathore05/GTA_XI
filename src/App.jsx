import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);
  const dateRef = useRef(null);

  /* ─────────────────────────────────────
     1.  Intro “VI” mask animation
  ──────────────────────────────────────*/
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
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  /* ─────────────────────────────────────
     2.  Entry + parallax animations
  ──────────────────────────────────────*/
  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main",    { scale: 1, rotate: 0, duration: 3, ease: "Expo.easeInOut", delay: -1 });
    gsap.to(".sky",     { scale: 1.2, rotate: 0, duration: 4, ease: "Expo.easeInOut", delay: -0.7 });
    gsap.to(".bg",      { scale: 1.1, rotate: 0, duration: 2, ease: "Expo.easeInOut", delay: -0.7 });
    gsap.to(".text",    { scale: 1, rotate: 0, duration: 4, ease: "Expo.easeInOut", delay: -0.7 });
    gsap.to(".girl",    { scale: 1, rotate: 0, duration: 2, ease: "Expo.easeInOut", delay: -0.7, x: "-50%", bottom: "-45%" });
    gsap.to(".logo18",  { scale: 0.4, rotate: 0, duration: 4, ease: "Expo.easeInOut", delay: -0.7, x: "20%", bottom: "15%" });
    gsap.to(".star",    { scale: 0.4, rotate: 0, duration: 4, ease: "Expo.easeInOut", delay: -0.7, x: "20%", bottom: "15%" });

    /* colour‑on‑scroll tween for “MAY 26” */
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

    /* parallax on mouse‑move */
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / innerWidth - 0.5) * 40;
      const yMove = (e.clientY / innerHeight - 0.5) * 40;
      gsap.to(".imagesdiv .text", { x: `${xMove * 0.5}%`, y: yMove * 0.5 });
      gsap.to(".sky",   { x: xMove * 4,   y: yMove * 4   });
      gsap.to(".bg",    { x: xMove * 1.2, y: yMove * 1.2 });
      gsap.to(".star",  { x: xMove * 2,   y: yMove * 2   });
      gsap.to(".logo18",{                 y: yMove * 2   });
    });
  }, [showContent]);

  return (
    <>
      {/* ─────────── Intro mask ─────────── */}
      <div className="svg fixed inset-0 z-[100] flex items-center justify-center w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  fontSize="clamp(60px,15vw,250px)"
                  fill="white"
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

      {/* ─────────── Main content ─────────── */}
      {showContent && (
        <div className="main w-full bg-black rotate-[-10deg] scale-[1.7] sm:rotate-[-10deg] sm:scale-[1.7]">
          {/* ‑‑‑‑‑ Hero section ‑‑‑‑‑ */}
          <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full px-6 py-6 sm:px-10 sm:py-10">
              <div className="logo flex items-center gap-4 sm:gap-7">
                <div className="lines flex flex-col gap-[4px] sm:gap-[6px]">
                  <div className="line w-8  sm:w-12 h-0.5 sm:h-1 bg-white" />
                  <div className="line w-6  sm:w-8  h-0.5 sm:h-1 bg-white" />
                  <div className="line w-4  sm:w-5  h-0.5 sm:h-1 bg-white" />
                </div>
                <h3 className="text-2xl sm:text-4xl text-white">ROCKSTAR</h3>
              </div>
            </div>

            {/* Parallax images */}
            <div className="imagesdiv relative w-full h-full overflow-hidden">
              <img
                className="sky absolute inset-0 w-full h-full object-cover rotate-[-20deg]"
                src="../sky.png"
                alt=""
              />
              <img
                className="bg absolute inset-0 w-full h-full object-cover scale-[2] rotate-[-3deg]"
                src="../bg.png"
                alt=""
              />

              {/* title text */}
              <div className="text absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col gap-2 sm:gap-3 text-white text-[15vw] sm:text-[10rem] scale-[1.2] rotate-[10deg] leading-[0.8] text-center">
                <h1 className="-ml-[10vw] sm:-ml-40">grand</h1>
                <h1 className="ml-[5vw]  sm:ml-20">theft</h1>
                <h1 className="-ml-[10vw] sm:-ml-40">auto</h1>
              </div>

              <img
                className="logo18 absolute left-1/2 -bottom-[50%] -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:scale-[1]"
                src="../logo18.png"
                alt=""
              />
              <img
                className="girl absolute left-1/2 -bottom-[150%] -translate-x-1/2 scale-[3] rotate-[-20deg]"
                src="../girlbg.png"
                alt=""
              />
              <img
                className="star absolute scale-[0.5] top-[-5%] right-0"
                src="../star.png"
                alt=""
              />
            </div>

            {/* bottom bar */}
            <div className="btmbar absolute bottom-0 left-0 w-full px-6 py-6 sm:px-10 sm:py-11 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center gap-2 text-base sm:text-xl text-white mt-4 sm:mt-5">
                <i className="ri-arrow-down-double-line" />
                <h4>Scroll&nbsp;Down</h4>
              </div>
              <img
                className="absolute h-[35px] sm:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="../ps5.png"
                alt=""
              />
            </div>
          </div>

          {/* ‑‑‑‑‑ Second section ‑‑‑‑‑ */}
          <div className="w-full min-h-screen bg-black flex items-center justify-center py-20 sm:py-0">
            <div className="cntr w-full flex flex-col sm:flex-row items-center gap-10 sm:gap-0 px-6 sm:px-0">
              {/* left image */}
              <div className="limg relative w-full sm:w-1/2 h-[300px] sm:h-[80vh]">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[90%]"
                  src="../imag.png"
                  alt=""
                />
              </div>

              {/* right text */}
              <div className="right w-full sm:w-[30%] text-white text-center sm:text-left">
                <h2 className="text-[12vw] sm:text-9xl leading-none">COMING,</h2>
                <h2
                  ref={dateRef}
                  className="text-[12vw] sm:text-9xl text-yellow-500 leading-none"
                >
                  MAY&nbsp;26
                </h2>
                <h2 className="text-[12vw] sm:text-9xl leading-none">2026</h2>

                <p className="text-sm sm:text-2xl font-[Aerial] mt-6 sm:mt-10 w-full sm:w-[90%] mx-auto sm:mx-0">
                  Welcome to the next era of chaos and freedom.&nbsp;GTA VI
                  takes you deep into Vice&nbsp;City, re‑imagined with stunning
                  realism, gritty stories, and unparalleled open‑world detail.
                </p>

                <div className="info flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-4 sm:gap-5 mt-8 sm:mt-10">
                  <h2 className="text-lg sm:text-3xl min-w-fit">Shivam&nbsp;Rathore</h2>

                  <a
                    href="https://github.com/shivam78775"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-[32px] sm:w-[40px] bg-white rounded-[4px] hover:scale-110 transition-transform"
                      src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png"
                      alt="GitHub"
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/iamshivamrathore/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-[32px] sm:w-[40px] hover:scale-110 transition-transform"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaRP3xxoMrJPQ1IQLHGRGtIAwv_0wG7lpvKA&s"
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
