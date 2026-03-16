import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { projectsData } from '../data/projects'
import { motionVariants } from '../utils/motion'

/**
 * Projects 项目区块
 * 响应式瀑布/网格卡片，悬浮效果，可选详情抽屉
 */
export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className="h-full flex flex-col cursor-pointer"
              onClick={() => setSelectedProject(index)}
            >
              {/* 封面图占位 */}
              <div className="w-full h-48 rounded-xl mb-4 bg-gradient-to-br from-accent-primary via-accent-purple to-accent-blue relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-30">
                  {project.title.charAt(0)}
                </div>
              </div>

              {/* 项目信息 */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-4 flex-1">{project.summary}</p>

                {/* 技术栈 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="primary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 3 && (
                    <Badge variant="default" className="text-xs">
                      +{project.stack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* 链接按钮 */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-sm text-accent-primary hover:text-accent-purple transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-sm text-slate-600 hover:text-accent-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 详情抽屉 */}
      <AnimatePresence>
        {selectedProject !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-2/5 bg-white z-50 overflow-y-auto shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {projectsData[selectedProject] && (
                <div className="p-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900">
                      {projectsData[selectedProject].title}
                    </h2>
                    <p className="text-lg text-slate-600">
                      {projectsData[selectedProject].summary}
                    </p>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {projectsData[selectedProject].stack.map((tech) => (
                          <Badge key={tech} variant="primary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {projectsData[selectedProject].highlights && (
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Highlights</h3>
                        <ul className="space-y-2">
                          {projectsData[selectedProject].highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700">
                              <span className="text-accent-primary mt-1.5">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-4">
                      {projectsData[selectedProject].links.demo && (
                        <a
                          href={projectsData[selectedProject].links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-purple text-white rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Demo
                        </a>
                      )}
                      {projectsData[selectedProject].links.repo && (
                        <a
                          href={projectsData[selectedProject].links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-xl border border-white/40 text-slate-700 rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  )
}

