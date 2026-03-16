import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * 全局浅色渐变背景 + 模糊漂移 blob
 * 使用 CSS + Framer Motion 实现柔和的背景动效
 */
export function GradientBG() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 基础渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-bg-secondary to-light-bg" />
      
      {/* 模糊彩色 blob */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background: 'linear-gradient(135deg, #C9B6FF 0%, #A3D5FF 100%)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background: 'linear-gradient(135deg, #A7F3D0 0%, #FBD3E9 100%)',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-25"
            style={{
              background: 'linear-gradient(135deg, #A3D5FF 0%, #C9B6FF 100%)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
          />
        </>
      )}
    </div>
  )
}

