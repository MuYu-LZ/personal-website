import React, { useEffect, useRef } from 'react'
import { effectsConfig } from './config'

/**
 * 噪声颗粒纹理组件
 * 极细胶片颗粒和纸张纹理，低不透明度
 */
export function GrainTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!effectsConfig.enableAurora || effectsConfig.motionScale === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 生成噪声纹理
    const imageData = ctx.createImageData(canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255
      data[i] = value     // R
      data[i + 1] = value // G
      data[i + 2] = value // B
      data[i + 3] = 10 * effectsConfig.motionScale // Alpha (极低不透明度)
    }

    ctx.putImageData(imageData, 0, 0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [effectsConfig.motionScale])

  if (!effectsConfig.enableAurora || effectsConfig.motionScale === 0) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none mix-blend-mode-overlay opacity-[var(--grain-opacity)]"
      style={{
        opacity: 0.05 * effectsConfig.motionScale,
        animation: 'grain-shift 8s steps(10) infinite',
      }}
      aria-hidden="true"
    />
  )
}

