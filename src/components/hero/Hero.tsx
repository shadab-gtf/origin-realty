"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../UI/Button";
import { textVariants } from "./hero.animations";
import { setupHeroScroll } from "./hero.utils";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeout = setTimeout(() => setVideoReady(true), 5000);

    const ready = () => {
      setVideoReady(true);
      clearTimeout(timeout);
    };

    const error = () => {
      setVideoError(true);
      setVideoReady(true);
    };

    video.addEventListener("canplaythrough", ready, { once: true });
    video.addEventListener("error", error, { once: true });

    video.play().catch(() => {});

    return () => {
      clearTimeout(timeout);
      video.removeEventListener("canplaythrough", ready);
      video.removeEventListener("error", error);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current || reduceMotion) return;
    return setupHeroScroll(heroRef, videoRef, titleRef, descRef);
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      className="relative h-svh w-full overflow-hidden bg-black isolate"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover will-change-transform pointer-events-none"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      />

      <motion.img
        src="/hero-poster.png"
        aria-hidden
        initial={{ opacity: 1, scale: 1.02 }}
        animate={{
          opacity: videoReady || videoError ? 0 : 1,
          scale: videoReady && !videoError ? 1.05 : 1.02,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-[1] size-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      <div className="relative z-20 h-full flex items-end pb-16 sm:pb-20 px-6 sm:px-10 lg:px-24">
        <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-[820px]">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="block mb-4 text-sm font-bold uppercase text-white"
            >
              From Real Estate to Real Living
            </motion.span>

            <motion.h1
              ref={titleRef}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-white font-light tracking-tight text-[42px] sm:text-[56px] md:text-[68px] lg:text-[82px] leading-[1.04]"
            >
              Design to Belong
            </motion.h1>

            <motion.p
              ref={descRef}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-white text-base sm:text-lg lg:text-xl max-w-[520px] leading-relaxed font-medium"
            >
              Where every space is carefully crafted to foster connections and
              enhance your living experience, creating a sense of home and
              belonging.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              label="Discover More"
              bg="transparent"
              text="#ffffff"
              hoverBg="#ffffff"
              hoverText="#000000"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
