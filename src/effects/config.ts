/**
 * 动效系统配置文件
 * 集中控制所有动效的开关与参数
 * 可在此调整整体动效强度和质量
 */

export interface EffectsConfig {
  // 功能开关
  enableAurora: boolean
  enableParallax: boolean
  enableMouseField: boolean
  enableGrid: boolean
  enablePageTransition: boolean
  enableReveal: boolean
  enableScrollVelocity: boolean
  enableCursorHighlight: boolean
  
  // 强度控制 (0-1)
  motionScale: number
  
  // 质量预设
  quality: 'auto' | 'high' | 'low'
}

/**
 * 默认配置
 * 会根据 prefers-reduced-motion 和设备性能自动调整
 */
export const defaultEffectsConfig: EffectsConfig = {
  enableAurora: true,
  enableParallax: true,
  enableMouseField: true,
  enableGrid: true,
  enablePageTransition: true,
  enableReveal: true,
  enableScrollVelocity: true,
  enableCursorHighlight: true,
  motionScale: 1,
  quality: 'auto',
}

/**
 * 获取实际生效的配置
 * 自动检测系统偏好和设备性能
 */
export function getEffectiveConfig(): EffectsConfig {
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (prefersReducedMotion) {
    return {
      ...defaultEffectsConfig,
      motionScale: 0,
      quality: 'low',
    }
  }

  // 检测设备性能（简化版）
  const isLowEndDevice = typeof window !== 'undefined'
    ? (navigator.hardwareConcurrency || 4) < 4 || 
      (navigator.deviceMemory || 4) < 4
    : false

  if (isLowEndDevice) {
    return {
      ...defaultEffectsConfig,
      motionScale: 0.5,
      quality: 'low',
    }
  }

  return defaultEffectsConfig
}

// 导出当前生效的配置
export const effectsConfig = getEffectiveConfig()

