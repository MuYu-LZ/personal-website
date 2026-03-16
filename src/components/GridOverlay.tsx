import React from 'react'

/**
 * 细网格/点阵背景覆盖层
 * 使用 SVG 创建低不透明度的网格效果
 */
export function GridOverlay() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.15]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#6D5EF0"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

