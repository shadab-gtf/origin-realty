"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!contentRef.current) return;

  const elements = Array.from(
    contentRef.current.children
  ) as HTMLElement[];

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 40,
        filter: "blur(6px)",
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
      }
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
      
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
        "
      >
        <img
          src="/bg/about-bg.png" 
          alt=""
          className="
            w-[320px]
            sm:w-[450px]
            lg:w-[500px]
            select-none
          "
        />
      </div>

      
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
       
        <span
          className="
            font-sans 
            font-bold
            text-sm
            tracking-normal
            uppercase
            text-[#CEB58D]
            mb-4
          "
        >
          Who We Are
        </span>

        {/* Title */}
        <h2
          className="
            font-serif
            text-[40px]
            sm:text-[48px]
            md:text-[56px]
            lg:text-[64px]
            leading-tight
            text-[#231F20]
            mb-10
          "
        >
          About Us
        </h2>

        {/* Main Paragraph */}
        <p
          className="
            text-[#231F20]
            text-base
            sm:text-xl
            leading-relaxed
            max-w-6xl
          "
        >
          We are here to reimagine what it means to build around people.
          To shift the focus from structures to stories, from spaces to souls,
          from profit to purpose. For us, you are not the end user.
          You are the starting point. Every choice we make begins with one question:
          Will this make your life and your family’s life better, healthier,
          and more meaningful?
        </p>

      
        <p
          className="
            mt-10
            text-[#231F20]/70
            italic
            text-sm
            sm:text-base
            leading-relaxed
            max-w-[804px]
          "
        >
          We’re not just changing skylines; we’re changing lives by creating
          ecosystems that breathe with you, spaces that heal, and designs
          that make mindful living effortless.
        </p>
      </div>
    </section>
  );
}
