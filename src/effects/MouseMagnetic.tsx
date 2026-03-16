import React, { ComponentType, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { effectsConfig } from './config'

/**
 * 鼠标磁性效果 HOC
 * 元素位移 <= 8px、旋转 <= 2deg，光影随距离衰减
 */
interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function withMagnetic<P extends object>(
  Component: ComponentType<P>
): ComponentType<P & MagneticProps> {
  return function MagneticComponent(props: P & MagneticProps) {
    const { children, className, strength = 1, ...rest } = props
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
      if (!effectsConfig.enableMouseField || effectsConfig.motionScale === 0) return

      const element = ref.current
      if (!element) return

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovered) return

        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) / rect.width
        const deltaY = (e.clientY - centerY) / rect.height

        const maxDistance = 8 * effectsConfig.motionScale * strength
        const maxRotate = 2 * effectsConfig.motionScale * strength

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
    }, [isHovered, strength, x, y, rotateX, rotateY])

    if (!effectsConfig.enableMouseField || effectsConfig.motionScale === 0) {
      return (
        <div ref={ref} className={className}>
          <Component {...(rest as P)}>{children}</Component>
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          x: xSpring,
          y: ySpring,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <Component {...(rest as P)}>{children}</Component>
      </motion.div>
    )
  }
}

/**
 * 磁性按钮组件（可直接使用）
 */
export function MagneticButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      className={`glass-btn ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

