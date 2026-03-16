import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { effectsConfig } from './config'

/**
 * 页面过渡组件
 * 使用 View Transitions API 或 Framer Motion fallback
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!effectsConfig.enablePageTransition || effectsConfig.motionScale === 0) return

    // 检测 View Transitions API 支持
    if ('startViewTransition' in document) {
      // 使用原生 View Transitions API
      const handleNavigation = (e: Event) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          e.preventDefault()
          ;(document as any).startViewTransition(() => {
            // 导航逻辑
          })
        }
      }

      document.addEventListener('click', handleNavigation)
      return () => document.removeEventListener('click', handleNavigation)
    }
  }, [])

  if (!effectsConfig.enablePageTransition || effectsConfig.motionScale === 0) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

