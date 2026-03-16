import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Framer Motion 动画预设
 * 提供常用的动画变体，保持一致的动效风格
 */
export const motionVariants = {
  // 淡入向上
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  
  // 淡入
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  
  // 缩放淡入
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  },
  
  // 级联子元素动画
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  
  // 子元素项
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
}

/**
 * AnimatedPanel 组件
 * 封装 AnimatePresence + motion.div，自动处理 prefers-reduced-motion 降级
 * 用于折叠/展开内容的平滑动画
 */
interface AnimatedPanelProps {
  children: ReactNode
  id: string
  isExpanded?: boolean
}

export function AnimatedPanel({ children, id, isExpanded = true }: AnimatedPanelProps) {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  if (prefersReducedMotion) {
    // 降级：仅切换显示/隐藏，无动画
    return (
      <div id={id} className={isExpanded ? 'block' : 'hidden'}>
        {children}
      </div>
    )
  }

  // 正常模式：使用 Framer Motion 动画
  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

