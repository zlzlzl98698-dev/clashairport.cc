export interface SubNavItem {
  title: string;
  slug: string;
  href: string;
  description: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  slug: string;
  href: string;
  description: string;
  subItems: SubNavItem[];
}

export const MAIN_NAVIGATION: NavSection[] = [
  {
    title: '机场推荐',
    slug: 'airport',
    href: '/airport/',
    description: '主流专线与中转机场横向实测、选购决策与真实避坑指南',
    subItems: [
      { title: '机场推荐', slug: 'recommend', href: '/airport/recommend/', description: '2026 综合主力专线机场选购推荐' },
      { title: '机场排行', slug: 'ranking', href: '/airport/ranking/', description: '晚高峰测速、丢包率与口碑综合排行榜' },
      { title: '性价比机场', slug: 'cost-effective', href: '/airport/cost-effective/', description: '均价 ¥10-25/月超高性价比专线推荐' },
      { title: '稳定机场', slug: 'stable', href: '/airport/stable/', description: '纯正 IPLC/IEPL 物理专线与晚高峰 0 丢包' },
      { title: '便宜机场', slug: 'cheap', href: '/airport/cheap/', description: '入门轻量套餐、年付百元以内低价梯子' },
      { title: '免费梯子', slug: 'free-ladder', href: '/airport/free-ladder/', description: '公益与免费翻墙工具风险分析及实测' },
      { title: '科学上网', slug: 'vpn-guide', href: '/airport/vpn-guide/', description: '科学上网基础概念、协议演进与安全准则' },
    ],
  },
  {
    title: 'VPN 与加速器',
    slug: 'vpn',
    href: '/vpn/',
    description: '全球商业 VPN 与网络加速工具深度评测与对比',
    subItems: [
      { title: 'VPN 推荐', slug: 'recommend', href: '/vpn/recommend/', description: '国际顶级商业 VPN 服务评测与选型建议' },
      { title: '免费 VPN', slug: 'free', href: '/vpn/free/', description: '免费 VPN 真实限速、流量陷阱与隐私风险' },
      { title: '手机 VPN', slug: 'mobile', href: '/vpn/mobile/', description: 'iOS / Android 移动端最佳 VPN 配置与应用' },
      { title: 'VPN 软件评测', slug: 'software-review', href: '/vpn/software-review/', description: '主流 VPN 客户端性能、协议与安全审计' },
      { title: 'VPN 加速器', slug: 'accelerator', href: '/vpn/accelerator/', description: '回国加速器与外服游戏加速工具深度横评' },
      { title: '加速器对比', slug: 'compare', href: '/vpn/compare/', description: 'VPN 与机场专线加速器核心技术差异对比' },
      { title: '好用的 VPN', slug: 'best', href: '/vpn/best/', description: '出海办公、外贸跨境与学术研发高可用 VPN' },
    ],
  },
  {
    title: 'Clash 客户端',
    slug: 'clash',
    href: '/clash/',
    description: 'Clash Verge Rev、Mihomo 等跨平台内核客户端下载与图文配置',
    subItems: [
      { title: 'Clash 推荐', slug: 'recommend', href: '/clash/recommend/', description: '全平台 Clash 系客户端版本差异与选型建议' },
      { title: 'Clash Verge', slug: 'verge', href: '/clash/verge/', description: '新一代开源跨平台客户端功能深度详解' },
      { title: 'Clash Verge 下载', slug: 'verge-download', href: '/clash/verge-download/', description: 'Windows / Mac / Linux 官方版本高速下载' },
      { title: 'Clash Verge 订阅', slug: 'verge-subscription', href: '/clash/verge-subscription/', description: '一键导入订阅、节点更新与定时刷新配置' },
      { title: 'Clash Meta', slug: 'meta', href: '/clash/meta/', description: 'Mihomo 虚空内核新协议支持与高级特性' },
      { title: 'Clash 使用教程', slug: 'tutorial', href: '/clash/tutorial/', description: '新手零基础图文入门、分流规则与 TUN 模式' },
      { title: 'Clash 故障排查', slug: 'troubleshooting', href: '/clash/troubleshooting/', description: '节点超时、DNS 污染、端口冲突全套解决指南' },
    ],
  },
  {
    title: '资源与情报',
    slug: 'resources',
    href: '/resources/',
    description: '节点检测工具、机场跑路预警黑名单、常见问答与排坑宝典',
    subItems: [
      { title: '免费节点', slug: 'free-nodes', href: '/resources/free-nodes/', description: '公共免费节点抓取、安全性评估与使用注意' },
      { title: '跑路预警', slug: 'runaway-warning', href: '/resources/runaway-warning/', description: '跑路黑名单、风险预警信号与资金避坑法则' },
      { title: '机场 FAQ', slug: 'faq', href: '/resources/faq/', description: '新手高频疑惑、协议科普与商业套路拆解' },
      { title: '机场风险情报', slug: 'risk-intel', href: '/resources/risk-intel/', description: '政策风向、GFW 封锁动态与线路维护前沿' },
      { title: '节点检测', slug: 'node-detection', href: '/resources/node-detection/', description: '流媒体解锁、延迟抖动与真连接拔测工具箱' },
      { title: '订阅问题', slug: 'subscription-issues', href: '/resources/subscription-issues/', description: '订阅链接无法拉取、证书报错与格式转换' },
      { title: '新手帮助', slug: 'beginner', href: '/resources/beginner/', description: '从零起步科学上网概念梳理与工具链搭建' },
    ],
  },
];
