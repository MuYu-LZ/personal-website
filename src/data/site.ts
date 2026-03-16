/**
 * 站点配置数据
 * 可自定义：站点标题、副标题、导航、社交链接、SEO/OG
 */
export const siteConfig = {
  title: "Zephan Lee's Blog",
  subtitle: 'Full Stack Developer | Creative Designer | Tech Enthusiast',
  description: '个人主页 - 展示我的技能、项目和工作经历',
  author: 'Zephan Lee',

  // 导航菜单
  nav: [
    { label: '首页', href: '#home' },
    { label: '关于', href: '#about' },
    { label: '荣誉奖项', href: '#honors' },
    { label: '时间线', href: '#timeline' },
    { label: '联系', href: '#contact' },
  ],

  // 社交链接
  social: {
    douyin: ' https://v.douyin.com/9A-EFTY9ffQ/ 9@2.com :4pm',
    qzone: 'https://user.qzone.qq.com/2840987505/main',
    email: 'mailto:lz18156471108@163.com',
  },

  // SEO/OG 元数据
  seo: {
    title: 'Zephan Lee - Full Stack Developer',
    description: '个人主页 - 展示我的技能、项目和工作经历',
    ogImage: '/og-image.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },

  // 版权信息
  copyright: '© 2025 Zephan Lee. All rights reserved.',
}
