/**
 * 个人资料数据
 * 可自定义：姓名、头像、职位、所在地、邮箱、简介、标签、统计数值
 */
export const profileData = {
  name: '李振 / Zephan Lee',
  heroTitle: 'Zephan Lee',
  heroQuote: 'Fake it till you make it! \n Just do it!',
  avatar: '/images/证件照.jpg',
  title: 'Stunning Boy',
  location: '合肥工业大学翡翠湖校区',
  phone: 'Phone: 18156471108',
  qq: 'QQ: 2840987505',
  email: 'lz18156471108@163.com(商务请注明来意)',

  // 个人简介（2-3段）
  bio: [
    '我的中文名字为李振，英文名字为Zephan Lee。我是合肥工业大学软件工程专业的一名大四学生，目前已保研至东南大学软件学院，gaping ~',
    '他们都喊我 “院草”，我却不以为然。因为了解我的人都知道，外貌是我最不值一提的优点，我谦虚、可靠、稳重、自律、积极、幽默、阳光……我就不在此一一列举了',
    '我有我自己的坚持，有我自己的态度，同样也有我自己的热爱，最近在实习、健身、兼职家教、做毕设，gap的时间我也给自己排满了，push myself，享受充实！',
  ],

  // 标签云（优势/兴趣关键词）
  tags: ['旅游', '微醺', '健身', '刷剧','push myself', '寻求自我价值','Boast'],

  // 关键数字统计
  stats: [
    { label: 'Years of Education', value: '15+' },
    { label: 'Awards', value: '25+' },
    { label: 'The Bloom of Youth', value: '20+' },
  ],
}

/**
 * 姓名寓意数据
 * 可自定义：英文名、中文名、寓意标题、简介、要点列举
 */
export const nameMeta = {
  englishName: 'Zephan Lee',
  chineseName: '李振',
  // meaningTitle: 'Why the name “Zephan Lee”？',
  meaningBrief:
    '“Zephan” 常作 Zephaniah 的现代简写，源自希伯来语词根 “tsafan”，含义为“珍藏、守护、深藏其内”。我理解为：将热爱与灵感沉淀其中，耐心打磨，在合适的时刻释放价值。Lee 为常见英文姓氏，对应中文姓氏“李”。',
  meaningBullets: [
    '象征对知识与作品的长期主义：先积累、再爆发。',
    '强调对细节的珍视与对成果负责。',
    '与个人风格——克制、干净、可靠——相呼应。',
  ],
}
