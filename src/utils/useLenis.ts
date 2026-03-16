import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

/**
 * Lenis 平滑滚动 Hook
 * 自动初始化和清理 Lenis 实例
 * 优化配置以实现丝滑的滚动效果
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // 增加持续时间，使滚动更平滑
      easing: (t) => 1 - Math.pow(1 - t, 3), // 使用更平滑的缓动函数（ease-out cubic）
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // 降低滚轮灵敏度，使滚动更平滑
      smoothTouch: true, // 启用触摸平滑
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.08, // 降低 lerp 值，使滚动更流畅（0.08 是推荐值）
    })

    // 将 Lenis 实例挂载到 window，供其他组件使用
    ;(window as any).lenis = lenis

    // 优化 RAF 循环，使用更高效的实现
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // 处理所有锚点链接的平滑滚动
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            lenis.scrollTo(element, {
              offset: -80, // 导航栏高度偏移
              duration: 1.5,
              easing: (t) => 1 - Math.pow(1 - t, 3),
            })
          }
        }
      }
    }

    // 监听所有锚点点击
    document.addEventListener('click', handleAnchorClick, { passive: false })

    // 添加 Lenis 类名到 html 元素
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])
}

