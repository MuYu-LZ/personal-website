import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { effectsConfig } from './config'
import { detectDevice } from '../utils/perf'

/**
 * 光标追随高光组件
 * 使用 CSS mask 实现光标追随的柔光高亮
 * 仅作用于大标题区域与 Hero CTA 背景
 */
export function CursorHighlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = detectDevice().isMobile

  useEffect(() => {
    if (!effectsConfig.enableCursorHighlight || effectsConfig.motionScale === 0 || isMobile) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePos({ x, y })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isMobile])

  if (!effectsConfig.enableCursorHighlight || effectsConfig.motionScale === 0 || isMobile) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(109, 94, 241, 0.15) 0%, transparent 70%)`,
          mixBlendMode: 'screen',
          opacity: isVisible ? 0.6 * effectsConfig.motionScale : 0,
          transition: 'opacity 0.3s',
          willChange: 'opacity',
        }}
        animate={{
          opacity: isVisible ? 0.6 * effectsConfig.motionScale : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

