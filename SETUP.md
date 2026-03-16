# 安装与设置指南

## 快速开始

### 1. 安装依赖

```bash
npm install
```

这将安装所有必需的依赖，包括：

- React 18
- Vite
- TailwindCSS
- Framer Motion
- Lenis (平滑滚动)
- Lucide React (图标)
- React Hook Form + Zod (表单)
- 其他工具库

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看网站。

### 3. 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

## 配置说明

### TailwindCSS

TailwindCSS 已配置在 `tailwind.config.js` 中，包含：

- 自定义颜色主题（浅色系）
- 自定义动画
- 响应式断点

### PostCSS

PostCSS 配置在 `postcss.config.js` 中，自动处理 TailwindCSS。

### 数据配置

所有可自定义内容都在 `src/data/` 目录：

- `site.ts` - 站点配置
- `profile.ts` - 个人资料
- `skills.ts` - 技能数据
- `timeline.ts` - 时间轴（教育/实习/工作）
- `projects.ts` - 项目数据

## 常见问题

### CSS 警告

如果看到 `Unknown at rule @tailwind` 警告，这是正常的。这些是 TailwindCSS 指令，会被 PostCSS 正确处理。

### 模块未找到

如果看到 `找不到模块 "lucide-react"` 等错误，请运行：

```bash
npm install
```

### 类型错误

如果使用 TypeScript，确保安装了类型定义：

```bash
npm install --save-dev @types/react @types/react-dom
```

## 下一步

1. 修改 `src/data/` 中的文件，填入你的个人信息
2. 替换头像和项目封面图
3. 配置联系表单 API（如需要）
4. 自定义颜色主题（在 `tailwind.config.js` 中）

详细说明请查看 `README.md`。
