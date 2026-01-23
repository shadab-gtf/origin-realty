'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    video.muted = true
    video.playsInline = true
    video.preload = 'auto'

    const onLoaded = () => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${video.duration * 900}px`,
        scrub: 0.8,
        pin: true,
        pinType: 'fixed', // 🔥 ensures desktop-like pin
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          video.currentTime = gsap.utils.clamp(
            0,
            video.duration,
            self.progress * video.duration
          )
        },
      })
    }

    video.addEventListener('loadedmetadata', onLoaded)

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        h-[100svh]
        bg-black
        overflow-hidden
      "
    >
      <video
        ref={videoRef}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          will-change-transform
        "
        src="/Origin.mp4"
        playsInline
        muted
        preload="auto"
      />
    </section>
  )
}
