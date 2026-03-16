import React from 'react'
import { AuroraLayer } from './AuroraLayer'
import { GrainTexture } from './GrainTexture'
import { ParallaxOrchestrator } from './ParallaxOrchestrator'
import { CursorHighlight } from './CursorHighlight'
import { GridDelaunay } from './GridDelaunay'
import { effectsConfig } from './config'

/**
 * 动效系统汇总组件
 * 按 config 汇总挂载所有动效层
 * 所有效果都是纯装饰性的，不影响内容可访问性
 */
export function Effects() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none -z-10">
      {/* Aurora 光幕层 */}
      {effectsConfig.enableAurora && <AuroraLayer />}
      
      {/* 噪声纹理层 */}
      {effectsConfig.enableAurora && <GrainTexture />}
      
      {/* 视差编排器 */}
      {effectsConfig.enableParallax && <ParallaxOrchestrator />}
      
      {/* 光标高光 */}
      {effectsConfig.enableCursorHighlight && <CursorHighlight />}
      
      {/* 网格连接线 */}
      {effectsConfig.enableGrid && <GridDelaunay />}
    </div>
  )
}

