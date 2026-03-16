import { useLenis } from './utils/useLenis'
import { GradientBG } from './components/GradientBG'
import { GridOverlay } from './components/GridOverlay'
import { ParticlesCanvas } from './components/ParticlesCanvas'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Honors } from './sections/Honors'
import { Timeline } from './sections/Timeline'
import { Contact } from './sections/Contact'
import { Effects } from './effects'
import { PageTransition } from './effects/PageTransition'

/**
 * 主应用组件
 * 组装所有页面区块，引入全局背景层
 */
function App() {
  // 初始化 Lenis 平滑滚动
  useLenis()

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* 动效系统层 */}
        <Effects />

        {/* 全局背景层 */}
        <GradientBG />
        <GridOverlay />
        <ParticlesCanvas />

        {/* 导航栏 */}
        <Nav />

        {/* 主内容 */}
        <main>
          <Hero />
          <About />
          <Honors />
          <Timeline />
          <Contact />
        </main>

        {/* 页脚 */}
        <Footer />
      </div>
    </PageTransition>
  )
}

export default App
