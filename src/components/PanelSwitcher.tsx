import React, { ReactNode, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supportsViewTransition } from '../utils/viewTransition'

interface PanelProps {
  id: string
  children: ReactNode
}

interface PanelSwitcherProps {
  state: 'en' | 'cn'
  direction?: 'rtl' | 'ltr'
  withViewTransition?: boolean
  children: ReactNode
}

/**
 * 面板切换组件
 * 优先使用 View Transitions API，回退到 Framer Motion（刷板覆盖）
 */
export function PanelSwitcher({
  state,
  direction = 'rtl',
  withViewTransition: enableVT = true,
  children,
}: PanelSwitcherProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const useViewTransition = supportsViewTransition() && enableVT && !prefersReducedMotion

  // 查找当前激活的面板
  const panels = React.Children.toArray(children) as React.ReactElement<PanelProps>[]
  const currentPanel = panels.find((panel) => panel.props.id === state)

  // 为方向设置 data 属性，供 CSS 使用
  useEffect(() => {
    if (!useViewTransition) return
    const root = document.documentElement
    root.dataset.vtDirection = direction
    return () => {
      delete root.dataset.vtDirection
    }
  }, [direction, useViewTransition])

  if (useViewTransition) {
    // 使用 View Transitions API
    return (
      <div className="relative w-full h-full">
        {panels.map((panel) => {
          const isActive = panel.props.id === state
          return (
            <div
              key={panel.props.id}
              style={{
                viewTransitionName: 'hero-pane',
                display: isActive ? 'block' : 'none',
              }}
              aria-live="polite"
              aria-hidden={!isActive}
              className="w-full h-full"
            >
              {isActive && panel}
            </div>
          )
        })}
      </div>
    )
  }

  // 使用 Framer Motion fallback（刷板覆盖）
  const ease = [0.22, 0.55, 0.3, 0.95]
  const duration = 0.32
  const sign = direction === 'rtl' ? 1 : -1
  const veilStart = direction === 'rtl' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
  const veilExit = direction === 'rtl' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {currentPanel && (
          <motion.div
            key={state}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: sign * 28, scale: 0.995 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, transition: { duration: 0.2 } }
                : {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { duration, ease },
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0, transition: { duration: 0.18 } }
                : {
                    opacity: 0,
                    x: -sign * 22,
                    scale: 0.992,
                    transition: { duration: duration * 0.9, ease },
                  }
            }
            className="relative w-full h-full"
            style={{
              willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
            }}
            aria-live="polite"
          >
            {!prefersReducedMotion && (
              <motion.div
                className="hero-veil absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0, clipPath: veilStart, x: sign * 8 }}
                animate={{
                  opacity: 0.14,
                  clipPath: 'inset(0 0 0 0)',
                  x: 0,
                  transition: { duration, ease },
                }}
                exit={{
                  opacity: 0,
                  clipPath: veilExit,
                  x: -sign * 8,
                  transition: { duration: duration * 0.9, ease },
                }}
              />
            )}
            <div>{currentPanel}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * 面板子组件
 */
export function Panel({ id, children }: PanelProps) {
  return <div data-panel-id={id}>{children}</div>
}
