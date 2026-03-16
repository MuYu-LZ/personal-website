import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Award } from 'lucide-react'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { timelineData } from '../data/timeline'
import { motionVariants } from '../utils/motion'
import { cn } from '../utils/cn'

type TimelineType = 'all' | 'education' | 'internship' | 'work'

/**
 * Timeline 时间轴区块
 * 单一纵向时间轴，分为：小学、初中、高中、大学、实习、工作
 * 节点进入视口时的线段描绘动画与卡片浮现
 */
export function Timeline() {
  const [filter, setFilter] = useState<TimelineType>('all')

  const filteredData = filter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === filter)

  const typeLabels = {
    education: 'Education',
    internship: 'Internship',
    work: 'Work',
  }

  return (
    <Section id="timeline" title="Timeline" className="bg-white/30">
      {/* 筛选器 */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {(['all', 'education', 'internship', 'work'] as TimelineType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              filter === type
                ? 'bg-gradient-to-r from-accent-primary to-accent-purple text-white shadow-lg'
                : 'bg-white/60 backdrop-blur-xl border border-white/40 text-slate-600 hover:border-accent-primary/30'
            )}
          >
            {type === 'all' ? 'All' : typeLabels[type]}
          </button>
        ))}
      </div>

      {/* 时间轴 */}
      <div className="relative">
        {/* 时间轴线 */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-purple to-accent-blue transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* 时间轴节点 */}
              <div className="absolute left-8 md:left-1/2 w-2 h-9 rounded-full bg-gradient-to-b from-accent-primary via-accent-purple to-accent-blue shadow-[0_8px_20px_rgba(99,102,241,0.25)] border border-white transform md:-translate-x-1/2 -translate-y-full top-6 z-10" />

              {/* 内容卡片 */}
              <div className={cn(
                'ml-20 md:ml-0 md:w-[calc(50%-3rem)]',
                index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
              )}>
                <Card>
                  <div className="space-y-4">
                    {/* 标题和类型 */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
                        <p className="text-base text-slate-600 mt-1">{item.org}</p>
                      </div>
                      <Badge variant={item.type === 'education' ? 'primary' : item.type === 'work' ? 'secondary' : 'default'}>
                        {typeLabels[item.type] || 'Other'}
                      </Badge>
                    </div>

                    {/* 时间和地点 */}
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {item.period.start} - {item.period.end || 'Present'}
                        </span>
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* 亮点 */}
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="space-y-3 text-[15px] md:text-[16px] leading-7 text-slate-700/90">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent-primary mt-2 text-lg">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 奖项 */}
                    {item.awards && item.awards.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                          <Award className="w-4 h-4 text-accent-primary" />
                          <span>职位 & 身份</span>
                        </div>
                        <ul className="space-y-2 text-[15px] md:text-[16px] leading-7 text-slate-700/90">
                          {item.awards.map((award, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
                              <span>{award}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

