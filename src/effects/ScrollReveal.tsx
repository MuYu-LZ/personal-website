import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { effectsConfig } from './config'

/**
 * 滚动驱动的错层显现组件
 * 区块进入视口时，边框渐变描边 + 轻浮现
 */
interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  if (!effectsConfig.enableReveal || effectsConfig.motionScale === 0) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: delay * effectsConfig.motionScale,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * 滚动速度字体动态效果
 * 给 h1-h3 添加 letter-spacing 与 skewY 的极小范围动态
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    if (!effectsConfig.enableScrollVelocity || effectsConfig.motionScale === 0) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const deltaY = currentScrollY - lastScrollY.current
      const deltaTime = currentTime - lastTime.current

      if (deltaTime > 0) {
        const v = Math.abs(deltaY / deltaTime) * 1000 // 像素/秒
        setVelocity(Math.min(v, 2000) / 2000) // 归一化到 0-1
      }

      lastScrollY.current = currentScrollY
      lastTime.current = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return velocity * effectsConfig.motionScale
}

