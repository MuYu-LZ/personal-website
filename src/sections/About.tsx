import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail } from 'lucide-react'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { profileData } from '../data/profile'
import { siteConfig } from '../data/site'
import { ScrollReveal } from '../effects/ScrollReveal'

const DouyinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 3h2a6 6 0 0 0 6 6v2a8.5 8.5 0 0 1-6-2v8.5a5.5 5.5 0 1 1-5.5-5.5H12v3a2.5 2.5 0 1 0 2 2.45V3Z" />
  </svg>
)

const QzoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3.5 9.4 9.3l-6.2.5 4.8 4-1.5 6.1L12 16.8l5.5 3.1-1.5-6.1 4.8-4-6.2-.5L12 3.5Z" />
  </svg>
)

/**
 * 炫酷单面板 About：大头像 + 简介 + 标签 + 统计
 */
export function About() {
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profileData.location)}`

  return (
    <Section id="about" title="About Me">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_80px_rgba(99,102,241,0.12)] p-6 md:p-8 lg:p-10">
          {/* 装饰光斑与网格雾化 */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-10 w-60 h-60 bg-gradient-to-br from-indigo-200/60 via-purple-200/40 to-cyan-200/30 blur-3xl" />
            <div className="absolute right-[-6rem] bottom-[-4rem] w-80 h-80 bg-gradient-to-br from-blue-200/40 via-cyan-200/30 to-transparent blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.06),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.06),transparent_30%)]" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12">
            {/* 左：大头像与基本信息 */}
            <motion.div
              className="flex flex-col items-center lg:items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 blur-2xl opacity-60" />
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-white/80 p-1 border border-white/60 shadow-[0_15px_60px_rgba(79,70,229,0.2)] relative">
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-blue-500/20" />
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="relative w-full h-full rounded-full object-cover border border-white/50"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent && !parent.querySelector('.fallback-avatar')) {
                        const fallback = document.createElement('div')
                        fallback.className =
                          'fallback-avatar absolute inset-1 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-indigo-500'
                        fallback.textContent = profileData.name.charAt(0)
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>
              </div>
              <div className="text-center lg:text-left space-y-2 mt-8">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  {profileData.name}
                </h3>
                <p className="text-lg text-slate-600">{profileData.title}</p>
              </div>

              <div className="flex flex-col gap-3 text-slate-600 text-sm w-full lg:w-auto">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-primary" />
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-primary transition-colors underline decoration-dotted underline-offset-4"
                  >
                    {profileData.location}
                  </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Mail className="w-4 h-4 text-accent-primary" />
                  <a href={siteConfig.social.email} className="hover:text-accent-primary transition-colors">
                    {profileData.email}
                  </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                  {siteConfig.social.douyin && (
                    <a
                      href={siteConfig.social.douyin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-accent-primary transition-colors"
                      aria-label="Douyin"
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                        <DouyinIcon className="w-5 h-5" />
                        <span>抖音</span>
                      </span>
                    </a>
                  )}
                  {siteConfig.social.qzone && (
                    <a
                      href={siteConfig.social.qzone}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-accent-primary transition-colors"
                      aria-label="Qzone"
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                        <QzoneIcon className="w-5 h-5" />
                        <span>QQ 空间</span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 右：简介、标签、统计 */}
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <div className="space-y-4">
                {profileData.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-slate-800 leading-relaxed bg-gradient-to-r from-indigo-50/80 via-white/60 to-transparent rounded-2xl px-4 py-3 border border-white/60 shadow-sm"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 text-lg font-semibold">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  Interests 
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge className="bg-white/80 border border-indigo-100 text-slate-800 shadow-sm hover:shadow-md text-lg px-5 py-2 font-semibold">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {profileData.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(99,102,241,0.1)] px-3 py-3 md:px-4 md:py-3 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-[13px] text-slate-600 leading-snug">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}
