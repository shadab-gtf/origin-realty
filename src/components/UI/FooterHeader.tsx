'use client'

import Image from 'next/image'
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
} from 'lucide-react'

export default function FooterHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
      <Image
        src="/footer-logo.png"
        alt="footer logo"
        width={120}
        height={120}
        className="w-28 sm:w-32"
        priority
      />

      <div className="flex items-center gap-4 sm:gap-5">
        <SocialIcon href="https://instagram.com">
          <Instagram />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com">
          <Linkedin />
        </SocialIcon>
        <SocialIcon href="https://facebook.com">
          <Facebook />
        </SocialIcon>
        <SocialIcon href="https://youtube.com">
          <Youtube />
        </SocialIcon>
      </div>
    </div>
  )
}

function SocialIcon({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex items-center justify-center
        w-10 h-10 sm:w-11 sm:h-11
        rounded-full
        border border-white/20
        text-white/70
        transition-all duration-500
        ease-[cubic-bezier(0.19,1,0.22,1)]
        hover:bg-[#d6c29f]
        hover:text-[#1c1819]
        hover:border-[#d6c29f]
        sm:hover:-translate-y-1
        active:scale-95
      "
    >
      <span className="transition-transform duration-500 group-hover:scale-110">
        {children}
      </span>
    </a>
  )
}
