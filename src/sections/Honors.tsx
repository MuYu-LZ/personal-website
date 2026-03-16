import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { awardsData } from '../data/awards'
import { motionVariants } from '../utils/motion'

/**
 * Honors & Awards 荣誉奖项列表
 * 单列堆叠列表样式
 */
export function Honors() {
  const categories = awardsData.categories || [{ title: awardsData.title, items: awardsData.items }]

  return (
    <Section
      id="honors"
      title={awardsData.title}
      subtitle={awardsData.subtitle}
      className="bg-white/30"
    >
      <div className="space-y-6">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial="fadeInUp"
            whileInView="fadeInUp"
            viewport={{ once: true }}
            variants={motionVariants.fadeInUp}
            transition={{ delay: catIndex * 0.05 }}
          >
            <Card className="relative overflow-hidden border border-white/70 bg-gradient-to-br from-white to-indigo-50/40 backdrop-blur-xl shadow-[0_16px_50px_rgba(79,70,229,0.1)]">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-blue-500" />
              <div className="p-4 md:p-5 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span>{category.title}</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {category.items.map((award) => (
                    <li key={award.name} className="py-3 space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-600">
                        <span>{award.date}</span>
                        <span className="text-slate-300">•</span>
                        <span>{award.org}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                        {award.name}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
