import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'
import { effectsConfig } from '../effects/config'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

/**
 * 统一的区块容器组件
 * 包含标题、副标题、分隔、进场动效
 */
export function Section({ id, title, subtitle, children, className }: SectionProps) {
  const [scrollVelocity, setScrollVelocity] = useState(0)
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
        const v = Math.abs(deltaY / deltaTime) * 1000
        setScrollVelocity(Math.min(v, 2000) / 2000)
      }

      lastScrollY.current = currentScrollY
      lastTime.current = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id={id} className={cn('py-20 md:py-32 relative', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {(title || subtitle) && (
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              {title && (
                <h2 
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
                  style={{
                    letterSpacing: effectsConfig.enableScrollVelocity 
                      ? `${scrollVelocity * 0.015}em` 
                      : undefined,
                    transform: effectsConfig.enableScrollVelocity
                      ? `skewY(${scrollVelocity * 0.3}deg)`
                      : undefined,
                    transition: 'letter-spacing 0.1s ease-out, transform 0.1s ease-out',
                  }}
                >
                  {title}
                </h2>
              )}
            {subtitle && (
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-purple mx-auto rounded-full" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

