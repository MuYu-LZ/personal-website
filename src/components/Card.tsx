import React, { ReactNode, useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../utils/cn'
import { effectsConfig } from '../effects/config'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  magnetic?: boolean
}

/**
 * 玻璃拟态卡片组件
 * 统一的卡片样式，支持悬浮效果和磁性效果
 */
export function Card({ children, className, hover = true, magnetic = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 30 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  useEffect(() => {
    if (!magnetic || !effectsConfig.enableMouseField || effectsConfig.motionScale === 0) return

    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      const maxDistance = 8 * effectsConfig.motionScale
      const maxRotate = 2 * effectsConfig.motionScale

      x.set(deltaX * maxDistance)
      y.set(deltaY * maxDistance)
      rotateY.set(deltaX * maxRotate)
      rotateX.set(-deltaY * maxRotate)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isHovered, magnetic, x, y, rotateX, rotateY])

  const cardContent = (
    <motion.div
      ref={ref}
      className={cn(
        'backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg shadow-slate-200/50',
        hover && 'transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-1',
        magnetic && 'rainbow-border',
        className
      )}
      style={
        magnetic && effectsConfig.enableMouseField && effectsConfig.motionScale > 0
          ? {
              x: xSpring,
              y: ySpring,
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }
          : undefined
      }
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )

  return cardContent
}

