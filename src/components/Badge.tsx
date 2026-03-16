import React, { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

/**
 * 徽章组件
 * 用于显示标签、技能等
 */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-white/60 text-slate-700 border-slate-200',
    primary: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    secondary: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

