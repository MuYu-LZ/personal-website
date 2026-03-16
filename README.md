# Zephan Lee's Personal Website

一个高端、浅色系、多动态效果的个人主页，使用 React + Vite + TailwindCSS + Framer Motion 构建。

## ✨ 特性

- 🎨 **浅色高端设计** - 柔和渐变 + 玻璃拟态 + 网格科技感
- 🚀 **流畅动效** - Framer Motion 动画 + Lenis 平滑滚动
- 🎯 **Canvas 粒子背景** - 轻量粒子系统，自适应性能
- 📱 **移动端优先** - 完全响应式设计
- ♿ **无障碍支持** - A11y 友好，支持键盘导航
- 🔍 **SEO 优化** - 完整的 Meta 标签和 Open Graph
- ⚡ **性能优化** - 代码分割、懒加载、动画降级

## 🛠️ 技术栈

- **框架**: React 18 + Vite
- **样式**: TailwindCSS (JIT)
- **动效**: Framer Motion + Lenis
- **图标**: Lucide React
- **表单**: React Hook Form + Zod
- **类型**: TypeScript (可选)

## 📦 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
src/
├── components/       # 全局组件
│   ├── Nav.tsx      # 导航栏
│   ├── Footer.tsx   # 页脚
│   ├── Section.tsx  # 区块容器
│   ├── Card.tsx     # 玻璃拟态卡片
│   ├── Badge.tsx    # 徽章组件
│   ├── GradientBG.tsx      # 渐变背景
│   ├── GridOverlay.tsx     # 网格覆盖层
│   └── ParticlesCanvas.tsx # 粒子画布
├── sections/         # 页面区块
│   ├── Hero.tsx     # 首页
│   ├── About.tsx    # 关于我
│   ├── Skills.tsx   # 技能
│   ├── Timeline.tsx # 时间轴
│   ├── Projects.tsx # 项目
│   └── Contact.tsx  # 联系
├── effects/         # 动效系统
│   ├── config.ts    # 动效配置
│   ├── AuroraLayer.tsx      # Aurora 光幕
│   ├── GrainTexture.tsx     # 噪声纹理
│   ├── ParallaxOrchestrator.tsx # 视差编排
│   ├── MouseMagnetic.tsx    # 磁性效果
│   ├── CursorHighlight.tsx  # 光标高光
│   ├── GridDelaunay.tsx     # 网格连接线
│   ├── PageTransition.tsx   # 页面过渡
│   ├── ScrollReveal.tsx     # 滚动显现
│   └── index.tsx    # 汇总组件
├── data/            # 可配置数据
│   ├── site.ts      # 站点配置
│   ├── profile.ts   # 个人资料
│   ├── skills.ts    # 技能数据
│   ├── timeline.ts  # 时间轴数据
│   └── projects.ts  # 项目数据
├── styles/          # 样式文件
│   └── effects.css  # 动效样式
└── utils/           # 工具函数
    ├── cn.ts        # 类名合并
    ├── motion.tsx   # 动画预设
    ├── useLenis.ts  # 平滑滚动 Hook
    └── perf.ts      # 性能检测工具
```

## 🎨 自定义内容

所有可填内容都在 `src/data/` 目录中，便于替换：

### 1. 站点配置 (`src/data/site.ts`)

- 站点标题、副标题
- 导航菜单
- 社交链接
- SEO/OG 元数据

### 2. 个人资料 (`src/data/profile.ts`)

- 姓名、头像、职位
- 所在地、邮箱
- 个人简介
- 标签云
- 统计数据

### 3. 技能数据 (`src/data/skills.ts`)

- 技能分类
- 熟练度、使用经验
- 正在学习

### 4. 时间轴 (`src/data/timeline.ts`)

- 教育经历（小学/初中/高中/大学）
- 实习经历
- 工作经历
- 每个节点包含：标题、组织、时间段、地点、亮点、奖项

### 5. 项目数据 (`src/data/projects.ts`)

- 项目名称、简介
- 封面图、技术栈
- 演示链接、代码仓库
- 项目亮点

## 🎭 动效与性能

### 动画降级

- 支持 `prefers-reduced-motion`，自动禁用非必要动画
- 粒子系统在低性能设备上自动减少密度

### 性能优化

- 使用 `will-change` 克制
- 图片懒加载
- 动画元素入场卸载
- 代码分割

## ✨ 动效系统使用说明

项目包含一套完整的动效系统，位于 `src/effects/` 目录，提供高级的视觉体验。

### 功能概览

1. **Aurora 多层光幕** - 柔和彩色体积光，缓慢流动
2. **噪声颗粒纹理** - 极细胶片颗粒和纸张纹理
3. **多层视差** - 背景层、网格层、光幕层分别以不同速率视差
4. **鼠标感应力场** - 卡片/按钮的磁性吸附效果
5. **光标追随高光** - 光标追随的柔光高亮（仅桌面端）
6. **网格连接线网络** - 低对比网格与稀疏连接点
7. **页面过渡** - 柔和的过场帘效果
8. **滚动显现** - 区块进入视口时的错层显现动画
9. **滚动速度字体动态** - 标题随滚动速度轻微变化

### 配置开关

所有动效由 `src/effects/config.ts` 统一控制：

```typescript
export const effectsConfig = {
  enableAurora: true, // Aurora 光幕
  enableParallax: true, // 视差效果
  enableMouseField: true, // 鼠标磁性效果
  enableGrid: true, // 网格连接线
  enablePageTransition: true, // 页面过渡
  enableReveal: true, // 滚动显现
  enableScrollVelocity: true, // 滚动速度字体动态
  enableCursorHighlight: true, // 光标高光
  motionScale: 1, // 整体强度 (0-1)
  quality: "auto", // 质量预设: 'auto' | 'high' | 'low'
};
```

### 如何开关动效

#### 方法 1: 修改配置文件

编辑 `src/effects/config.ts`，修改 `defaultEffectsConfig`：

```typescript
export const defaultEffectsConfig: EffectsConfig = {
  enableAurora: false, // 关闭 Aurora 光幕
  enableParallax: true, // 保持视差效果
  // ... 其他配置
  motionScale: 0.5, // 降低整体强度到 50%
};
```

#### 方法 2: 调整整体强度

通过 `motionScale` 控制所有动效的强度：

- `1.0` - 完整强度
- `0.5` - 50% 强度
- `0` - 完全关闭（等同于 `prefers-reduced-motion`）

### 自动降级策略

系统会自动检测并降级：

1. **`prefers-reduced-motion`** - 检测到系统偏好时，自动设置 `motionScale = 0`
2. **低性能设备** - 根据 CPU 核心数和内存自动切换到 `quality: 'low'`
3. **移动端** - 自动禁用光标高光等桌面端专属效果

### 使用磁性效果

在组件中使用 `magnetic` 属性启用磁性效果：

```tsx
import { Card } from "../components/Card";

<Card magnetic>{/* 内容 */}</Card>;
```

### 使用滚动显现

使用 `ScrollReveal` 组件包裹需要滚动显现的元素：

```tsx
import { ScrollReveal } from "../effects/ScrollReveal";

<ScrollReveal delay={0.1}>
  <div>内容</div>
</ScrollReveal>;
```

### 性能建议

1. **低端设备** - 建议设置 `quality: 'low'` 或 `motionScale: 0.5`
2. **移动端** - 系统会自动优化，无需手动调整
3. **大量内容** - 如果页面内容很多，可以关闭部分动效以提升性能
4. **电池优化** - 在移动设备上，降低 `motionScale` 可以节省电量

### 自定义样式

动效相关的 CSS 变量和工具类在 `src/styles/effects.css` 中定义：

- `.glass` - 玻璃拟态样式
- `.glass-btn` - 玻璃按钮样式
- `.rainbow-border` - 彩虹边框效果
- `.mask-spotlight` - 遮罩聚光灯效果

### 文件结构

```
src/
├── effects/              # 动效系统
│   ├── config.ts        # 配置文件
│   ├── AuroraLayer.tsx  # Aurora 光幕
│   ├── GrainTexture.tsx # 噪声纹理
│   ├── ParallaxOrchestrator.tsx # 视差编排
│   ├── MouseMagnetic.tsx # 磁性效果
│   ├── CursorHighlight.tsx # 光标高光
│   ├── GridDelaunay.tsx # 网格连接线
│   ├── PageTransition.tsx # 页面过渡
│   ├── ScrollReveal.tsx # 滚动显现
│   └── index.tsx        # 汇总组件
├── styles/
│   └── effects.css      # 动效样式
└── utils/
    └── perf.ts          # 性能检测工具
```

### 故障排除

**动效不显示？**

- 检查 `src/effects/config.ts` 中的开关是否启用
- 确认浏览器支持 CSS `backdrop-filter`
- 检查是否启用了 `prefers-reduced-motion`

**性能问题？**

- 降低 `motionScale` 值
- 关闭部分动效（如 `enableAurora: false`）
- 设置 `quality: 'low'`

**移动端效果异常？**

- 某些效果（如光标高光）在移动端自动禁用，这是正常行为
- 移动端会自动使用触控优化的视差效果

## 🌐 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入项目，自动部署

### Netlify

1. 将代码推送到 GitHub
2. 访问 [Netlify](https://www.netlify.com)
3. 导入项目
4. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`

### 其他平台

构建后上传 `dist` 目录到任何静态托管服务。

## 📝 开发说明

### 颜色主题

在 `tailwind.config.js` 中自定义颜色：

- `light-bg`: 浅色背景
- `accent-*`: 强调色（紫色、蓝色、薄荷、粉色）

### 动画调整

在 `src/utils/motion.ts` 中调整动画预设。

### 表单提交

联系表单默认使用 `console.log`，可在 `src/sections/Contact.tsx` 中替换为实际 API：

```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

### 名字解释抽屉

Hero 区域的名字解释现在通过抽屉形式呈现：

- **触发入口**：标题右下角的圆形 FAB 按钮（Sparkles 图标）
- **键盘快捷键**：按 `?` 键打开，`Esc` 键关闭
- **关闭方式**：点击关闭按钮、点击遮罩层、或按 `Esc` 键
- **降级支持**：`prefers-reduced-motion` 时自动使用淡入淡出，禁用复杂动画

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受你的新网站！** 🎉
