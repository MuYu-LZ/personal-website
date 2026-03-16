/**
 * 技能数据
 * 可自定义：技能分类、名称、熟练度、使用经验
 */
export const skillsData = {
  categories: [
    {
      name: "Languages",
      items: [
        { label: "JavaScript", levelText: "Expert", since: "2019", notes: "ES6+, TypeScript" },
        { label: "TypeScript", levelText: "Advanced", since: "2020", notes: "Type-safe development" },
        { label: "Python", levelText: "Advanced", since: "2018", notes: "Backend & Data Science" },
        { label: "Java", levelText: "Intermediate", since: "2017", notes: "Enterprise applications" },
      ],
    },
    {
      name: "Frontend",
      items: [
        { label: "React", levelText: "Expert", since: "2019", notes: "Hooks, Context, Redux" },
        { label: "Vue.js", levelText: "Advanced", since: "2020", notes: "Vue 3 Composition API" },
        { label: "Next.js", levelText: "Advanced", since: "2021", notes: "SSR, SSG, App Router" },
        { label: "TailwindCSS", levelText: "Expert", since: "2020", notes: "Utility-first styling" },
      ],
    },
    {
      name: "Backend",
      items: [
        { label: "Node.js", levelText: "Advanced", since: "2019", notes: "Express, Fastify" },
        { label: "Express", levelText: "Advanced", since: "2019", notes: "RESTful APIs" },
        { label: "GraphQL", levelText: "Intermediate", since: "2021", notes: "Apollo Server" },
        { label: "PostgreSQL", levelText: "Advanced", since: "2020", notes: "Database design" },
      ],
    },
    {
      name: "Tools & Design",
      items: [
        { label: "Git", levelText: "Expert", since: "2018", notes: "Version control" },
        { label: "Docker", levelText: "Intermediate", since: "2021", notes: "Containerization" },
        { label: "Figma", levelText: "Advanced", since: "2020", notes: "UI/UX Design" },
        { label: "Webpack", levelText: "Advanced", since: "2019", notes: "Build tools" },
      ],
    },
    {
      name: "Cloud & DevOps",
      items: [
        { label: "AWS", levelText: "Intermediate", since: "2021", notes: "EC2, S3, Lambda" },
        { label: "Vercel", levelText: "Advanced", since: "2020", notes: "Deployment" },
        { label: "CI/CD", levelText: "Intermediate", since: "2021", notes: "GitHub Actions" },
      ],
    },
  ],
  
  // 正在学习
  learning: [
    { label: "Rust", notes: "Systems programming" },
    { label: "Machine Learning", notes: "TensorFlow basics" },
  ],
}

