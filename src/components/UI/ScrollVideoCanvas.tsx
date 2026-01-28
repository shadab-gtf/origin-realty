'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 311

export default function ScrollVideoCanvas() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const images: HTMLImageElement[] = []
  const frame = { index: 0 }

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    /* --------------------------------
       PRELOAD FRAMES
    -------------------------------- */
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `/Origin/Origin_${String(i).padStart(5, '0')}.jpg`
      images.push(img)
    }

    /* --------------------------------
       GSAP SCROLL CONTROL
    -------------------------------- */
    const ctx = gsap.context(() => {
      gsap.to(frame, {
        index: FRAME_COUNT - 1,
        ease: 'none',
        snap: 'index',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
        onUpdate: () => {
          const img = images[frame.index]
          if (img && imageRef.current) {
            imageRef.current.src = img.src
          }
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      <img
        ref={imageRef}
        src="/Origin/Origin_00000.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        decoding="async"
        loading="eager"
      />
    </section>
  )
}
