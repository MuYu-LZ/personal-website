import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 和 tailwind-merge 确保类名正确合并
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

