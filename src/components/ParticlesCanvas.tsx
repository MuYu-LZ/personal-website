import React, { useEffect, useRef } from 'react'

/**
 * 浅色点/连线粒子背景
 * 密度自适应，prefers-reduced-motion 兼容
 */
export function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 粒子配置
    const particleCount = prefersReducedMotion ? 30 : 80
    const connectionDistance = 150
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.5,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    // 动画循环
    const animate = () => {
      if (!prefersReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // 更新和绘制粒子
      particles.forEach((particle, i) => {
        if (!prefersReducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy

          // 边界处理
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        }

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(109, 94, 240, ${prefersReducedMotion ? 0.3 : 0.4})`
        ctx.fill()

        // 绘制连线
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(109, 94, 240, ${0.15 * (1 - distance / connectionDistance)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    if (prefersReducedMotion) {
      // 静态渲染
      animate()
    } else {
      animate()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}

