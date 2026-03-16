import React from 'react'
import { siteConfig } from '../data/site'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

/**
 * 浅色极简页脚
 * 包含社交链接与版权信息
 */
export function Footer() {
  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  }

  return (
    <footer className="border-t border-slate-200/50 bg-white/40 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 text-sm">{siteConfig.copyright}</p>
          
          <div className="flex items-center gap-4">
            {Object.entries(siteConfig.social).map(([key, url]) => {
              if (!url || key === 'email') return null
              const Icon = socialIcons[key as keyof typeof socialIcons]
              if (!Icon) return null
              
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-slate-200 text-slate-600 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300 hover:scale-110"
                  aria-label={key}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
            {siteConfig.social.email && (
              <a
                href={siteConfig.social.email}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-slate-200 text-slate-600 hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

