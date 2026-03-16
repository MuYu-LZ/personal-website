import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
}

/**
 * 轻量化工具提示组件
 * 桌面端显示，移动端自动隐藏
 */
export function Tooltip({ children, content, side = 'top', disabled = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  if (disabled || isMobile) {
    return <>{children}</>
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-lg pointer-events-none whitespace-nowrap ${
              side === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
              side === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
              side === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' :
              'left-full top-1/2 -translate-y-1/2 ml-2'
            }`}
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-slate-900/90 rotate-45 ${
                side === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' :
                side === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' :
                side === 'left' ? 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2' :
                'right-full top-1/2 -translate-y-1/2 translate-x-1/2'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

