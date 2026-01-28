"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const initialClipPaths = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
  "polygon(66.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
  "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
  "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
  "polygon(66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
  "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
  "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
  "polygon(66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
];

const finalClipPaths = [
  "polygon(0% 0%, 33.33% 0%, 33.33% 33.33%, 0% 33.33%)",
  "polygon(33.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 33.33%)",
  "polygon(66.66% 0%, 100% 0%, 100% 33.33%, 66.66% 33.33%)",
  "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
  "polygon(33.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
  "polygon(66.66% 33.33%, 100% 33.33%, 100% 66.66%, 66.66% 66.66%)",
  "polygon(0% 66.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
  "polygon(33.33% 66.66%, 66.66% 66.66%, 66.66% 100%, 33.33% 100%)",
  "polygon(66.66% 66.66%, 100% 66.66%, 100% 100%, 66.66% 100%)",
];
const stats = [
  { value: 30, suffix: " Years", label: "Business Acumen" },
  { value: 500, suffix: "+ Projects", label: "Combined Experience" },
  { value: 2, suffix: " Generations", label: "Business Excellence" },
];
function IOSCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numberRef.current) return;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: value,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        numberRef.current!.textContent = Math.floor(obj.val).toString();
      },
    });
  }, [value]);

  return (
    <h3 className="font-serif text-3xl text-[#231F20] tabular-nums">
      <span ref={numberRef}>0</span>
      {suffix}
    </h3>
  );
}
export default function OurExpertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masks = gsap.utils.toArray<HTMLDivElement>(
        ".mask",
        visualWrapRef.current!,
      );

      masks.forEach((mask, i) => {
        gsap.set(mask, { clipPath: initialClipPaths[i] });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visualWrapRef.current,
          start: "top 75%",
        },
      });

      const order = [[0], [1, 3], [2, 4, 6], [5, 7], [8]];

      order.forEach((group, i) => {
        tl.to(
          group.map((idx) => masks[idx]),
          {
            clipPath: (index, el) =>
              finalClipPaths[masks.indexOf(el as HTMLDivElement)],
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
          },
          i * 0.15,
        );
      });

      gsap.fromTo(
        ".stat-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-24">
      {/* HEADER */}
      <div className="mx-auto max-w-[1082px] w-full text-center">
        <p className="text-sm font-bold text-[#F1D8A8]">THE ORIGEN ADVANTAGE</p>

        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,2.5rem)] text-[#231F20]">
          Our Expertise
        </h2>
        <p className="mt-6 text-[#231F20] font-light sm:text-xl text-base">
          Our foundation is built on decades of real delivery and a legacy of
          business excellence. We lead with knowledge, creating human impact and
          increasing life value per square foot. Through detail-driven
          construction and a foundation of deep industry expertise, we bring a
          distinctive craftsmanship to every project.
        </p>
      </div>

      {/* CONTENT */}
      <div className="mx-auto mt-20 grid max-w-[1082px]  grid-col-2 sm:grid-cols-[1fr_560px] gap-20 sm:gap-0">
        {/* STATS */}
        <div className="flex flex-col justify-center sm:gap-20 gap-16">
          {/* {[
            ["30 Years", "Business Acumen"],
            ["500+ Projects", "Combined Experience"],
            ["2 Generations", "Business Excellence"],
          ].map(([title, subtitle]) => (
            <div key={title} className="flex items-center gap-6">
              <div className="min-w-[280px]">
                <h3 className="font-serif text-3xl text-[#231F20]">{title}</h3>
                <p className="text-sm text-[#231F20]">{subtitle}</p>
              </div>
              <span className="stat-line sm:block hidden h-px flex-1 bg-[#CEB58D]" />
            </div>
          ))} */}

           {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="min-w-[280px]">
                <IOSCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
                <p className="text-sm text-[#231F20]">
                  {stat.label}
                </p>
              </div>

              <span className="stat-line hidden sm:block h-px flex-1 bg-[#CEB58D]" />
            </div>
          ))}
        </div>

        {/* IMAGE */}
        <div
          ref={visualWrapRef}
          className="relative h-[360px] sm:h-[400px] w-[350px] sm:w-[560px] overflow-hidden"
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="mask absolute inset-0"
              style={{
                backgroundImage: "url(/about.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat",
                zIndex: 10,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
