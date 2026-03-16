/**
 * 交互速度测量工具
 * 用于动态调整动画曲线和时长
 */

interface VelocityTracker {
  timestamps: number[]
  positions: number[]
  maxSamples: number
}

const trackers = new Map<string, VelocityTracker>()

/**
 * 记录交互位置和时间戳
 */
export function recordInteraction(
  id: string,
  position: number,
  timestamp: number = performance.now()
) {
  if (!trackers.has(id)) {
    trackers.set(id, {
      timestamps: [],
      positions: [],
      maxSamples: 10,
    })
  }

  const tracker = trackers.get(id)!
  tracker.timestamps.push(timestamp)
  tracker.positions.push(position)

  // 只保留最近 120ms 的数据
  const cutoff = timestamp - 120
  while (
    tracker.timestamps.length > 0 &&
    tracker.timestamps[0] < cutoff
  ) {
    tracker.timestamps.shift()
    tracker.positions.shift()
  }

  // 限制最大样本数
  if (tracker.timestamps.length > tracker.maxSamples) {
    tracker.timestamps.shift()
    tracker.positions.shift()
  }
}

/**
 * 计算平均速度（像素/秒）
 */
export function getVelocity(id: string): number {
  const tracker = trackers.get(id)
  if (!tracker || tracker.timestamps.length < 2) {
    return 0
  }

  const times = tracker.timestamps
  const positions = tracker.positions

  if (times.length < 2) return 0

  const totalTime = times[times.length - 1] - times[0]
  if (totalTime === 0) return 0

  const totalDistance = Math.abs(
    positions[positions.length - 1] - positions[0]
  )

  return (totalDistance / totalTime) * 1000 // 转换为像素/秒
}

/**
 * 根据速度调整动画参数
 * 速度大 → 稍短、稍硬；速度小 → 稍长、稍柔
 * 范围 ±12%
 */
export function adjustAnimationByVelocity(
  baseDuration: number,
  baseEase: number[],
  velocity: number
): { duration: number; ease: number[] } {
  // 速度阈值：0-500 像素/秒
  const normalized = Math.min(Math.max(velocity / 500, 0), 1)
  
  // 速度大时缩短时长（最多 -12%），速度小时延长（最多 +12%）
  const durationMultiplier = 1 - (normalized * 0.12)
  const duration = baseDuration * durationMultiplier

  // 调整缓动曲线：速度大时更硬（更陡），速度小时更柔（更缓）
  const hardness = normalized * 0.15 // 最多调整 15%
  const ease = baseEase.map((v, i) => {
    if (i === 0 || i === baseEase.length - 1) return v
    // 中间值向极端调整
    return v + (v < 0.5 ? -hardness : hardness)
  })

  return {
    duration: Math.max(0.2, Math.min(duration, baseDuration * 1.12)),
    ease: ease.map((v) => Math.max(0, Math.min(1, v))),
  }
}

/**
 * 清除指定追踪器
 */
export function clearTracker(id: string) {
  trackers.delete(id)
}

/**
 * 清除所有追踪器
 */
export function clearAllTrackers() {
  trackers.clear()
}

