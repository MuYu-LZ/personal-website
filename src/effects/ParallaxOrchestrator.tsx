import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { effectsConfig } from './config'

/**
 * 多层视差编排器
 * 背景层、网格层、彩色光幕层、粒子层分别以不同速率视差
 */
export function ParallaxOrchestrator() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const isTouchDevice = useRef(false)

  useEffect(() => {
    if (!effectsConfig.enableParallax || effectsConfig.motionScale === 0) return

    // 检测触控设备
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTouchDevice.current) {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!effectsConfig.enableParallax || effectsConfig.motionScale === 0) {
    return null
  }

  const scale = effectsConfig.motionScale
  const scrollFactor = scrollY * 0.01 * scale
  const mouseFactor = isTouchDevice.current ? 0 : 0.02 * scale

  // 不同层的视差因子
  const layers = [
    { factor: 0.02, label: 'background' },
    { factor: 0.04, label: 'grid' },
    { factor: 0.06, label: 'aurora' },
  ]

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {layers.map((layer, index) => {
        const x = (scrollFactor + mousePos.x * mouseFactor) * layer.factor * 100
        const y = (scrollFactor + mousePos.y * mouseFactor) * layer.factor * 100

        return (
          <motion.div
            key={layer.label}
            className="absolute inset-0"
            style={{
              x,
              y,
              willChange: 'transform',
            }}
            data-layer={layer.label}
          />
        )
      })}
    </div>
  )
}

