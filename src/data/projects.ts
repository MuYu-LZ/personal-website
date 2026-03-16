/**
 * 项目数据
 * 可自定义：项目名称、简介、封面、技术栈、链接、亮点
 */
export const projectsData = [
  {
    title: "个人博客系统",
    summary: "基于 Next.js 和 TypeScript 构建的现代化博客系统，支持 Markdown 写作和 SEO 优化",
    cover: "/projects/blog.jpg", // 可替换为实际图片
    stack: ["Next.js", "TypeScript", "TailwindCSS", "MDX"],
    links: {
      demo: "https://demo.example.com",
      repo: "https://github.com/username/blog",
    },
    highlights: [
      "支持 Markdown 和 MDX 格式",
      "SEO 优化，Google PageSpeed 评分 95+",
      "响应式设计，完美适配移动端",
    ],
  },
  {
    title: "电商平台前端",
    summary: "大型电商平台的前端应用，包含商品展示、购物车、订单管理等完整功能",
    cover: "/projects/ecommerce.jpg",
    stack: ["React", "Redux", "TypeScript", "Ant Design"],
    links: {
      demo: "https://demo.example.com",
      repo: "https://github.com/username/ecommerce",
    },
    highlights: [
      "处理百万级商品数据，性能优化",
      "实现复杂的购物车和订单流程",
      "与后端团队协作，完成 API 对接",
    ],
  },
  {
    title: "任务管理工具",
    summary: "团队协作任务管理工具，支持看板视图、任务分配、进度跟踪等功能",
    cover: "/projects/taskmanager.jpg",
    stack: ["Vue.js", "Node.js", "PostgreSQL", "Socket.io"],
    links: {
      demo: "https://demo.example.com",
      repo: "https://github.com/username/taskmanager",
    },
    highlights: [
      "实时协作功能，使用 WebSocket",
      "支持拖拽排序和任务分组",
      "完整的权限管理系统",
    ],
  },
  {
    title: "数据分析 Dashboard",
    summary: "企业级数据分析平台，提供数据可视化、报表生成、数据导出等功能",
    cover: "/projects/dashboard.jpg",
    stack: ["React", "D3.js", "Python", "FastAPI"],
    links: {
      demo: "https://demo.example.com",
      repo: "https://github.com/username/dashboard",
    },
    highlights: [
      "复杂数据可视化，支持多种图表类型",
      "高性能数据处理，支持百万级数据",
      "响应式设计，适配各种屏幕尺寸",
    ],
  },
]

