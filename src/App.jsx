import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);

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
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main",{
      scale:1,
      rotate: 0,
      duration: 2,
      ease: "Expo.easeInOut",
      delay:-1
    })

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.5}%`,
      });
      gsap.to(".sky", {
        x: xMove * 4, // or "none" if you want linear
      });
      gsap.to(".bg", {
        x: xMove * 1.2, // or "none" if you want linear
      });
    });
  }, [showContent]);
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
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
          <div className="w-full h-screen bg-black ">
            <div className="navbar w-full px-10 py-10 absolute z-[10] top-0 left-0 ">
              <div className="logo flex gap-7 items-center">
                <div className="lines flex flex-col gap-[6px]">
                  <div className="line w-12 h-1 bg-white"></div>
                  <div className="line w-8 h-1 bg-white"></div>
                  <div className="line w-5 h-1 bg-white"></div>
                </div>
                <h3 className="text-4xl text-white">ROCKSTAR</h3>
              </div>
            </div>
            <div className="imagesdiv overflow-hidden relative w-full h-full">
              <img
                className="w-full sky h-full object-cover absolute top-0 left-0"
                src="../sky.png"
                alt=""
              />
              <img
                className="w-full bg h-full object-cover absolute top-0 left-0"
                src="../bg.png"
                alt=""
              />
              <div className="text absolute top-15 left-1/2 -translate-x-1/2 text-white text-9xl flex flex-col gap-3">
                <h1 className="text-[10rem] -ml-40 leading-none">grand</h1>
                <h1 className="text-[10rem] ml-20 leading-none">theft</h1>
                <h1 className="text-[10rem] -ml-40 leading-none">auto</h1>
              </div>
              <img
                className="girl absolute -bottom-[45%] left-1/2 -translate-x-1/2 scale-[1.1]"
                src="../girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar items-center w-full px-10 py-11 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 text-white mt-5 text-xl">
                <i className="ri-arrow-down-double-line"></i>
                <h4>Scroll Down</h4>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="../ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="cntr w-full h-[80%] flex items-center">
              <div className="limg relative h-full w-1/2">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="../imag.png"
                  alt=""
                />
              </div>
              <div className="right text-white w-[30%]">
                <h2 className="text-7xl">STAY GROUNDED,</h2>
                <h2 className="text-7xl">RUN WILD</h2>
                <p className="font-[Aerial] text-2xl mt-10 w-[90%]">
                  Welcome to the next era of chaos and freedom. GTA VI takes you
                  deep into Vice City, reimagined with stunning realism, gritty
                  stories, and unparalleled open-world detail.
                </p>
                <p className="font-[Aerial] text-2xl mt-5 w-[90%]">
                  Experience dynamic characters, insane heists, and a living
                  world that reacts to your every move. From neon nights to
                  high-speed pursuits, every second in GTA VI is unforgettable.
                </p>
                <button className="text-3xl pointer bg-yellow-500 px-3 py-3 mt-10 text-black">
                  DOWNLOAD NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
