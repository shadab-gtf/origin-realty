"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !bgWrapperRef.current) return;

    const elements = Array.from(contentRef.current.children) as HTMLElement[];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 40,
          filter: "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      gsap
        .timeline({
          repeat: -1,
          defaults: { ease: "none" },
        })
        .to(bgWrapperRef.current, {
          rotation: 360,
          duration: 10,
        })
        .to(
          bgWrapperRef.current,
          {
            scale: 1.06,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        min-h-screen
        flex
        items-center
        justify-center
        bg-white
        overflow-hidden
        px-6
        sm:px-10
        lg:px-24
      "
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div ref={bgWrapperRef} className="will-change-transform">
          <Image
            src="/bg/about-bg.png"
            alt=""
            width={500}
            height={500}
            priority
            className="
              w-[320px]
              sm:w-[450px]
              lg:w-[500px]
              select-none
            "
          />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="
          relative
          z-10
          max-w-6xl
          text-center
          flex
          flex-col
          items-center
        "
      >
        <span className="font-bold text-sm uppercase text-[#CEB58D] mb-4">
          Who We Are
        </span>

        <h2 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-[#231F20] mb-10">
          About Us
        </h2>

        <p className="text-base sm:text-xl leading-relaxed max-w-6xl text-[#231F20]">
          Origen Realty embodies the art of thoughtful living, crafting
          residences where wellbeing becomes intuitive and beautifully
          effortless. Guided by visionary design and an unwavering dedication to
          excellence, we shape spaces that elevate the everyday into the
          exceptional, inspiring a sense of pride and belonging across every
          community we create.
        </p>

        <p className="mt-10 italic text-sm sm:text-base max-w-[804px] text-[#231F20]/70">
          We’re not just changing skylines; we’re changing lives by creating
          ecosystems that breathe with you, spaces that heal, and designs that
          make mindful living effortless.
        </p>
      </div>
    </section>
  );
}
