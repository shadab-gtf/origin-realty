import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function setupHeroScroll(
  heroRef: RefObject<HTMLDivElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  titleRef: RefObject<HTMLElement | null>,
  descRef: RefObject<HTMLElement | null>
) {
  if (!heroRef.current || !videoRef.current) return;

  const isTouch =
    matchMedia("(pointer: coarse)").matches || ScrollTrigger.isTouch === 1;

  const ctx = gsap.context(() => {
    gsap.to(videoRef.current!, {
      yPercent: isTouch ? -1.5 : -3,
      scale: isTouch ? 1.04 : 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current!,
        start: "top top",
        end: "bottom top",
        scrub: isTouch ? 1.3 : 1.8,
      },
    });

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: isTouch ? -20 : -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom top",
          scrub: isTouch ? 1 : 1.2,
        },
      });
    }

    if (descRef.current) {
      gsap.to(descRef.current, {
        y: isTouch ? -12 : -35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, heroRef);

  ScrollTrigger.refresh();
  return () => ctx.revert();
}
