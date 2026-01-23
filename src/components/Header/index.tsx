"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { opacity, background } from "./Anim";
import Nav from "./Nav/Index";
import AnimatedPathLine from "../UI/AnimatedPathLine";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top+=80 top",
          end: "top+=81 top",
          toggleActions: "play none reverse none",
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 ">
        <div
          ref={bgRef}
          className="
          absolute inset-0
          bg-white/10
          backdrop-blur-md
          pointer-events-none
          opacity-0
        "
        />
        <div
          ref={bgRef}
          className="
          absolute inset-0
          bg-white/10
          backdrop-blur-md
          pointer-events-none
          opacity-0
        "
        />

        {/* top bar  */}
        <div
          className="
    relative z-20 pointer-events-auto
    px-4 sm:px-6 lg:px-16
    py-4
    flex items-center justify-between
    uppercase text-[12px] sm:text-[14px]
  "
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/or.png"
              alt="Company logo"
              width={300}
              height={50}
              sizes="(max-width: 768px) 140px, 180px"
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>

          <div
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 cursor-pointer select-none border border-white hover:border-[#231F20] px-5 py-2 rounded-3xl  bg-transparent
          hover:bg-[#231F20]
            transition-colors duration-300 ease-out"
          >
            {/* Burger Icon */}
            <div
              className={`
        relative w-9 
        before:content-[''] before:block before:h-px before:w-full before:bg-white
        before:relative before:top-1
        after:content-[''] after:block after:h-px after:w-full after:bg-white
        after:relative after:-top-1
        before:transition-all after:transition-all
        before:duration-700 after:duration-700
        before:ease-[cubic-bezier(0.76,0,0.24,1)]
        after:ease-[cubic-bezier(0.76,0,0.24,1)]
        ${
          isActive
            ? "before:-rotate-45 before:top-px after:rotate-45 after:-top-px"
            : ""
        }
      `}
            />

            {/* hamburger menu */}
            <div className="relative text-white ">
              <motion.span
                initial={false}
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
              >
                Menu
              </motion.span>

              <motion.span
                initial={false}
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                className="absolute left-0 top-0"
              >
                Close
              </motion.span>
            </div>
          </div>
        </div>
        {/* border bottom  */}
        <div
          className="
    absolute bottom-0 left-4 right-4
    sm:left-6 sm:right-6
    lg:left-16 lg:right-16
    h-px
    pointer-events-none
    z-10
  "
        >
          <AnimatedPathLine />
        </div>
        {/*  Menu overlay */}
        <motion.div
          variants={background}
          initial="false"
          animate={isActive ? "open" : "closed"}
          className="absolute left-0 top-full w-full bg-[#0606065d] "
        />

        {/* Navbar  */}
        <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
      </header>
    </>
  );
}
