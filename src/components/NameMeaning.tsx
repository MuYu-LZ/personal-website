import React from 'react'
import { motion } from 'framer-motion'
import { nameMeta } from '../data/profile'

/**
 * 英文名寓意说明组件
 * 仅在中文面板显示，延迟淡入
 */
export function NameMeaning() {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  const hasTitle = Boolean(nameMeta.meaningTitle && nameMeta.meaningTitle.trim())

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2, delay: 0.08 }
          : { duration: 0.24, delay: 0.08, ease: [0.22, 0.55, 0.3, 0.95] }
      }
      className="mt-8 md:mt-10"
    >
      <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-[0_10px_30px_rgba(110,120,210,0.15)] p-6 md:p-7">
        {hasTitle && (
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            {nameMeta.meaningTitle}
          </h3>
        )}

        <p
          className={`text-base md:text-lg text-slate-800 leading-relaxed ${
            hasTitle ? 'mb-6' : 'mb-5'
          }`}
        >
          {nameMeta.meaningBrief}
        </p>

        <ul className="space-y-3 list-none">
          {nameMeta.meaningBullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-purple mt-2.5" />
              <span className="text-base md:text-lg text-slate-800 leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
