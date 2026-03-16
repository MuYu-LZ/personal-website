import React, { useEffect, useRef } from 'react'
import { effectsConfig } from './config'

/**
 * 网格/点阵 + 连接线网络组件
 * 低对比网格与稀疏连接点，随滚动缓慢偏移
 */
export function GridDelaunay() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [scrollY, setScrollY] = React.useState(0)

  useEffect(() => {
    if (!effectsConfig.enableGrid || effectsConfig.motionScale === 0) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!effectsConfig.enableGrid || effectsConfig.motionScale === 0) return

    const svg = svgRef.current
    if (!svg) return

    const width = window.innerWidth
    const height = window.innerHeight
    svg.setAttribute('width', width.toString())
    svg.setAttribute('height', height.toString())

    // 生成稀疏点阵
    const points: Array<{ x: number; y: number }> = []
    const spacing = 120
    const offsetX = (scrollY * 0.1) % spacing
    const offsetY = (scrollY * 0.15) % spacing

    for (let x = -spacing; x < width + spacing; x += spacing) {
      for (let y = -spacing; y < height + spacing; y += spacing) {
        if (Math.random() > 0.3) {
          // 70% 概率生成点
          points.push({
            x: x + offsetX + (Math.random() - 0.5) * 20,
            y: y + offsetY + (Math.random() - 0.5) * 20,
          })
        }
      }
    }

    // 清空 SVG
    svg.innerHTML = ''

    // 绘制网格
    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    gridGroup.setAttribute('opacity', '0.15')
    gridGroup.setAttribute('stroke', 'rgba(109, 94, 241, 0.2)')
    gridGroup.setAttribute('stroke-width', '1')

    for (let x = 0; x <= width; x += 50) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', (x + offsetX).toString())
      line.setAttribute('y1', '0')
      line.setAttribute('x2', (x + offsetX).toString())
      line.setAttribute('y2', height.toString())
      gridGroup.appendChild(line)
    }

    for (let y = 0; y <= height; y += 50) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', '0')
      line.setAttribute('y1', (y + offsetY).toString())
      line.setAttribute('x2', width.toString())
      line.setAttribute('y2', (y + offsetY).toString())
      gridGroup.appendChild(line)
    }

    svg.appendChild(gridGroup)

    // 绘制连接线
    const lineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    lineGroup.setAttribute('opacity', '0.2')

    points.forEach((point1, i) => {
      points.slice(i + 1).forEach((point2) => {
        const dx = point2.x - point1.x
        const dy = point2.y - point1.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', point1.x.toString())
          line.setAttribute('y1', point1.y.toString())
          line.setAttribute('x2', point2.x.toString())
          line.setAttribute('y2', point2.y.toString())
          line.setAttribute('stroke', 'rgba(109, 94, 241, 0.15)')
          line.setAttribute('stroke-width', '1')
          line.setAttribute('stroke-dasharray', distance.toString())
          line.setAttribute('stroke-dashoffset', distance.toString())
          
          // 动画：线条描绘
          line.style.animation = `draw-line ${1 + Math.random()}s ease-out forwards`
          line.style.animationDelay = `${Math.random() * 0.5}s`
          
          lineGroup.appendChild(line)
        }
      })
    })

    svg.appendChild(lineGroup)

    // 绘制点
    const pointGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    points.forEach((point) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', point.x.toString())
      circle.setAttribute('cy', point.y.toString())
      circle.setAttribute('r', '2')
      circle.setAttribute('fill', 'rgba(109, 94, 241, 0.3)')
      pointGroup.appendChild(circle)
    })

    svg.appendChild(pointGroup)
  }, [scrollY])

  if (!effectsConfig.enableGrid || effectsConfig.motionScale === 0) {
    return null
  }

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 * effectsConfig.motionScale }}
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes draw-line {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </svg>
  )
}

