import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Download, ExternalLink, Send, MessageSquare, Phone } from 'lucide-react'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { profileData } from '../data/profile'
import { siteConfig } from '../data/site'
import { motionVariants } from '../utils/motion'

/**
 * Contact 联系区块
 * 精简为信息卡片 + 快捷联系入口，无表单
 */
export function Contact() {
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profileData.location)}`

  const quickLinks = [
    { label: '发送邮件', href: siteConfig.social.email, icon: Mail },
    { label: '打开抖音', href: siteConfig.social.douyin, icon: ExternalLink },
    { label: 'QQ 空间', href: siteConfig.social.qzone, icon: ExternalLink },
    { label: '定位地图', href: mapLink, icon: MapPin },
  ].filter((item) => Boolean(item.href))

  return (
    <Section id="contact" title="Contact Me" className="bg-white/30">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial="fadeInUp"
          whileInView="fadeInUp"
          viewport={{ once: true }}
          variants={motionVariants.fadeInUp}
        >
          <Card>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">{profileData.name}</h3>
                <p className="text-slate-600">{profileData.title}</p>
              </div>
              <div className="flex flex-col gap-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent-primary" />
                  <a href={siteConfig.social.email} className="hover:text-accent-primary transition-colors">
                    {profileData.email}
                  </a>
                </div>
                {profileData.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-accent-primary" />
                    <a href={`tel:${profileData.phone}`} className="hover:text-accent-primary transition-colors">
                      {profileData.phone}
                    </a>
                  </div>
                )}
                {profileData.qq && (
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent-primary" />
                    <span>{profileData.qq}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent-primary" />
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-primary transition-colors underline decoration-dotted underline-offset-4"
                  >
                    {profileData.location}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  欢迎通过下方入口联系我，合作洽谈或只是打个招呼都行。
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial="fadeInUp"
          whileInView="fadeInUp"
          viewport={{ once: true }}
          variants={motionVariants.fadeInUp}
          transition={{ delay: 0.08 }}
        >
          <Card className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">
              <Send className="w-4 h-4" />
              快捷联系
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all px-4 py-3 text-slate-800"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-semibold">{label}</span>
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-3">
              <p className="text-sm text-slate-600">
                可以从这些方面了解我哦 😊
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}
