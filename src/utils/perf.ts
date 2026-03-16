/**
 * 性能检测工具
 * FPS 检测、设备类型判断、性能降级建议
 */

export interface PerformanceMetrics {
  fps: number
  isLowEnd: boolean
  isMobile: boolean
  supportsHardwareAcceleration: boolean
}

let fps = 60
let lastTime = performance.now()
let frameCount = 0
let fpsInterval = 1000 // 每秒更新一次

/**
 * 检测 FPS（简化版）
 */
export function measureFPS(): number {
  const now = performance.now()
  frameCount++

  if (now >= lastTime + fpsInterval) {
    fps = Math.round((frameCount * 1000) / (now - lastTime))
    frameCount = 0
    lastTime = now
  }

  return fps
}

/**
 * 检测设备类型
 */
export function detectDevice(): {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
} {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: true }
  }

  const ua = navigator.userAgent.toLowerCase()
  const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)
  const isTablet = /tablet|ipad|playbook|silk/i.test(ua)
  const isDesktop = !isMobile && !isTablet

  return { isMobile, isTablet, isDesktop }
}

/**
 * 检测硬件加速支持
 */
export function supportsHardwareAcceleration(): boolean {
  if (typeof window === 'undefined') return true

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  return !!gl
}

/**
 * 获取性能指标
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  const device = detectDevice()
  const fps = measureFPS()

  return {
    fps,
    isLowEnd: fps < 30 || (navigator.hardwareConcurrency || 4) < 4,
    isMobile: device.isMobile,
    supportsHardwareAcceleration: supportsHardwareAcceleration(),
  }
}

/**
 * 根据性能指标推荐质量预设
 */
export function recommendQuality(metrics: PerformanceMetrics): 'high' | 'low' {
  if (metrics.fps < 30 || !metrics.supportsHardwareAcceleration) {
    return 'low'
  }
  if (metrics.fps < 50 || metrics.isMobile) {
    return 'low'
  }
  return 'high'
}

/**
 * 启动 FPS 监控（可选）
 */
export function startFPSMonitoring(callback?: (fps: number) => void) {
  if (typeof window === 'undefined') return

  function tick() {
    const currentFPS = measureFPS()
    if (callback) callback(currentFPS)
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

