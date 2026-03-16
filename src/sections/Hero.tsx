import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { profileData, nameMeta } from '../data/profile'
import { NameMeaning } from '../components/NameMeaning'

/**
 * 极简但更具高级感的 Hero：主标题 + 名言 + 英文名含义按钮
 */
export function Hero() {
  const [showMeaning, setShowMeaning] = useState(false)
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const titleInitial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
  const subtitleInitial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }

  const titleAnimate = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.55, 0.3, 0.95] } }

  const subtitleAnimate = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: 0.08, ease: [0.22, 0.55, 0.3, 0.95] },
      }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* 背景光晕，仅装饰 */}
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-gradient-to-br from-indigo-200/60 via-purple-200/40 to-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-8 w-64 h-64 bg-gradient-to-br from-sky-200/40 via-cyan-200/30 to-transparent blur-2xl" />
      </div>

      <motion.h1
        className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-sm"
        initial={titleInitial}
        animate={titleAnimate}
      >
        {profileData.heroTitle}
        <span className="mt-4 block h-[3px] w-28 md:w-32 mx-auto rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 opacity-80" />
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-slate-700/80 font-light max-w-2xl leading-relaxed whitespace-pre-line"
        initial={subtitleInitial}
        animate={subtitleAnimate}
      >
        {profileData.heroQuote}
      </motion.p>

      <motion.button
        type="button"
        className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/80 transition duration-300 backdrop-blur-md"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        onClick={() => setShowMeaning((v) => !v)}
        aria-expanded={showMeaning}
        aria-label="查看英文名的含义"
      >
        {showMeaning ? '收起英文名含义' : `Why the name "${nameMeta.englishName}"`}
      </motion.button>

      {showMeaning && (
        <div className="mt-8 max-w-3xl w-full">
          <NameMeaning />
        </div>
      )}
    </section>
  )
}
