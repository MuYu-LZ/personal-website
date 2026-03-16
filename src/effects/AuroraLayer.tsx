import React from 'react'
import { motion } from 'framer-motion'
import { effectsConfig } from './config'

/**
 * Aurora 多层光幕组件
 * 使用 CSS 变量驱动的柔和彩色体积光，缓慢流动
 */
export function AuroraLayer() {
  if (!effectsConfig.enableAurora || effectsConfig.motionScale === 0) {
    return null
  }

  const scale = effectsConfig.motionScale

  // 创建 4 个光幕层
  const layers = [
    {
      color: 'rgba(201, 182, 255, 0.15)',
      size: '800px',
      blur: '120px',
      duration: 8,
      top: '20%',
      left: '10%',
    },
    {
      color: 'rgba(163, 213, 255, 0.12)',
      size: '600px',
      blur: '100px',
      duration: 10,
      top: '35%',
      left: '30%',
    },
    {
      color: 'rgba(167, 243, 208, 0.1)',
      size: '700px',
      blur: '110px',
      duration: 12,
      top: '50%',
      left: '50%',
    },
    {
      color: 'rgba(251, 211, 233, 0.12)',
      size: '650px',
      blur: '105px',
      duration: 9,
      top: '65%',
      left: '70%',
    },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full will-change-transform"
          style={{
            width: layer.size,
            height: layer.size,
            background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
            filter: `blur(${layer.blur})`,
            top: layer.top,
            left: layer.left,
            mixBlendMode: 'screen',
            opacity: 0.6 * scale,
          }}
          animate={{
            x: [0, 50 * scale, -30 * scale, 0],
            y: [0, -40 * scale, 30 * scale, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.6 * scale, 0.8 * scale, 0.7 * scale, 0.6 * scale],
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

