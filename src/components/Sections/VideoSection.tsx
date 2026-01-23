"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoWrapRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };

          const startSize = desktop ? 320 : 160;
          const endWidth = desktop ? 900 : window.innerWidth * 0.94;
          const endHeight = desktop ? 520 : window.innerWidth * 0.56;

          /* MAIN PINNED ANIMATION */
          gsap.fromTo(
            videoWrapRef.current,
            {
              width: startSize,
              height: startSize,
              borderRadius: 24,
            },
            {
              width: endWidth,
              height: endHeight,
              borderRadius: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=120%",
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            }
          );

          /* SCROLL VELOCITY SCALE (SUBTLE) */
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: true,
            onUpdate: (self) => {
              const velocity = self.getVelocity();

              gsap.to(videoWrapRef.current, {
                scale: 1 + Math.min(Math.abs(velocity) * 0.00025, 0.05),
                duration: 0.35,
                ease: "power3.out",
              });
            },
          });
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
        h-screen
        bg-[#0b0b0b]
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      <div
        ref={videoWrapRef}
        className="
          relative
          overflow-hidden
          bg-black
          will-change-[width,height,transform]
        "
      >
        <video
          src="/Origin.mp4"
          autoPlay
          muted
          loop
          // playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
