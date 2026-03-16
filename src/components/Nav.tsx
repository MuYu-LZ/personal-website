import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/site'
import { cn } from '../utils/cn'

/**
 * 透明玻璃导航栏
 * 滚动后轻微阴影/模糊增加；当前段落高亮
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // 检测当前激活的段落
      const sections = siteConfig.nav.map((item) => item.href.replace('#', ''))
      const current = sections.find((id) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      // 使用 Lenis 平滑滚动（如果可用）
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          offset: -80,
          duration: 1.5,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        })
      } else {
        // 降级方案
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl bg-white/80 shadow-lg shadow-slate-200/50'
          : 'backdrop-blur-sm bg-white/40'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#home"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-purple bg-clip-text text-transparent"
            onClick={(e) => handleClick(e, '#home')}
            whileHover={{ scale: 1.05 }}
          >
            {siteConfig.title.split("'")[0]}
          </motion.a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {siteConfig.nav.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    isActive
                      ? 'text-accent-primary'
                      : 'text-slate-600 hover:text-accent-primary'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-purple rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* 移动端菜单按钮（简化版） */}
          <button className="md:hidden text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

