"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Beyond() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          },
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          },
        );
      }

      if (logosRef.current) {
        const logos = Array.from(logosRef.current.children);

        gsap.fromTo(
          logos,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: logosRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!bgRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(bgRef.current, {
        x,
        y,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f4ef] py-28 md:py-36"
    >
      {/* <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/bg/beyond-bg.png"
          alt=""
          fill
          priority
          className="object-cover "
        />
        <div className="absolute inset-0 " />
      </div> */}

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <span className="mb-4 inline-block text-sm tracking-normal font-bold text-[#7b6b51]">
          BEYOND BRAND ASSOCIATIONS
        </span>

        <h2
          ref={titleRef}
          className="mx-auto max-w-4xl text-[clamp(2rem,4vw,2.1rem)] font-serif leading-tight text-[#231F20]"
        >
          Designing Experiences, Not Just Spaces
        </h2>

        <p
          ref={textRef}
          className="mx-auto mt-6 max-w-4xl text-[15px] leading-relaxed text-[#231F20] md:text-base"
        >
          Our work with India’s most influential brands has shaped a disciplined
          design intelligence—one that balances scale, precision, and emotional
          resonance. Every environment we create is informed by operational
          excellence and elevated by lifestyle thinking.
        </p>

        <div
          ref={logosRef}
          className="mt-16 flex flex-wrap items-center justify-center gap-10 md:gap-14"
        >
          {[
            "/logos/haldiram.png",
            "/logos/mcdonald.png",
            "/logos/nirula.png",
            "/logos/pizza-hut-red.png",
          ].map((logo, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="
            relative h-12 w-28 md:h-20 md:w-32
            opacity-80 hover:opacity-100
            transition-all duration-500 ease-out
            filter invert grayscale
            hover:invert-0 hover:grayscale-0
      "
            >
              <Image src={logo} alt="" fill className="object-contain" />
            </motion.div>
          ))}
        </div>

        <span className="mt-10 block text-sm italic text-neutral-500">
        <Link href="">
        & Many More....
        </Link>  
        </span>
      </div>
    </section>
  );
}
