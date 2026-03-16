import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'right' | 'left'
  mobileSide?: 'bottom' | 'top'
  title?: string
  width?: string
}

/**
 * 抽屉组件
 * 桌面端：从指定侧边滑出
 * 移动端：从底部/顶部升起
 * 支持焦点陷阱、键盘快捷键、可访问性
 */
export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
  mobileSide = 'bottom',
  title,
  width = '420px',
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // 键盘快捷键：Esc 关闭
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  // 焦点陷阱
  useEffect(() => {
    if (!open || !drawerRef.current) return

    const drawer = drawerRef.current
    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  // 动画变体
  const spring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.9 }
  const timing = { duration: 0.26, ease: [0.22, 0.55, 0.3, 0.95] }

  const drawerVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: timing },
        exit: { opacity: 0, transition: timing },
      }
    : {
        hidden: { opacity: 0, x: side === 'right' ? 40 : -40, scale: 0.98 },
        show: { opacity: 1, x: 0, scale: 1, transition: spring },
        exit: { opacity: 0, x: side === 'right' ? 30 : -30, scale: 0.985, transition: timing },
      }

  const sheetVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: timing },
        exit: { opacity: 0, transition: timing },
      }
    : {
        hidden: { opacity: 0, y: mobileSide === 'bottom' ? 40 : -40, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: spring },
        exit: { opacity: 0, y: mobileSide === 'bottom' ? 30 : -30, scale: 0.985, transition: timing },
      }

  const overlayVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: timing },
    exit: { opacity: 0, transition: timing },
  }

  const variants = isMobile ? sheetVariants : drawerVariants

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 遮罩层 */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 bg-slate-700/10 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* 抽屉内容 */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
            variants={variants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={`fixed z-50 drawer-container ${
              isMobile
                ? `inset-x-0 ${mobileSide === 'bottom' ? 'bottom-0 rounded-t-3xl' : 'top-0 rounded-b-3xl'} max-h-[85vh]`
                : `${side === 'right' ? 'right-0' : 'left-0'} top-0 bottom-0 w-full max-w-[520px]`
            }`}
            style={
              !isMobile
                ? {
                    width,
                    maxWidth: '90vw',
                  }
                : undefined
            }
          >
            {/* 移动端抓手 */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-slate-300/60 rounded-full" />
              </div>
            )}

            {/* 内容区域 */}
            <div className="h-full flex flex-col overflow-hidden">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

