import React from 'react'
import { X } from 'lucide-react'
import { nameMeta } from '../data/profile'

interface NameInsightProps {
  onClose: () => void
}

/**
 * 名字解释内容组件
 * 展示英文名寓意、中文名说明、详细解释
 */
export function NameInsight({ onClose }: NameInsightProps) {
  return (
    <div className="relative h-full flex flex-col">
      {/* 头部：标题和关闭按钮 */}
      <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-white/20">
        <h2
          id="name-insight-title"
          className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight"
        >
          {nameMeta.meaningTitle}
        </h2>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-primary/50"
          aria-label="关闭"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-6">
          {/* 中文名说明（自然提及） */}
          <p className="text-base md:text-lg text-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-900">中文名：{nameMeta.chineseName}</span>
            {'。'}
            {nameMeta.meaningBrief}
          </p>

          {/* 要点列表 */}
          <ul className="space-y-3 list-none">
            {nameMeta.meaningBullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-purple mt-2.5" />
                <span className="text-base md:text-lg text-slate-800 leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

