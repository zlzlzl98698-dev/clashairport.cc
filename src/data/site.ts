export interface SiteVerification {
  google?: string;
  bing?: string;
  baidu?: string;
  shenma?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  keywords: string[];
  ogImage: string;
  themeColor: string;
  primaryBrand: string;
  establishedYear: number;
  verification?: SiteVerification;
}

export const SITE: SiteConfig = {
  name: 'clash机机',
  title: 'clash机机 - 中文机场与 VPN 专业评测媒体 | 节点测速·选购指南·客户端知识库',
  description: '以原创实测为核心的中文网络代理工具专业评测媒体。提供 41+ 机场深度实测、晚高峰带宽丢包报告、流媒体与 ChatGPT 解锁矩阵、Clash Verge 客户端全平台教程及跑路风险预警。',
  url: 'https://clashairport.cc',
  author: 'clash机机评测实验室',
  keywords: [
    '机场推荐',
    '2026机场推荐',
    '机场排行',
    '性价比机场',
    '稳定机场',
    '便宜机场',
    '免费梯子',
    '科学上网',
    'VPN推荐',
    'VPN与加速器',
    'Clash推荐',
    'Clash Verge',
    'Clash Verge下载',
    'Clash Verge订阅',
    'Clash Meta',
    '光速云',
    '免费节点',
    '跑路预警',
    '节点检测',
    '订阅问题排查'
  ],
  ogImage: '/images/covers/404676435-4ea1cc7d-8515-45a9-b656-44bd27b600da.jpg',
  themeColor: '#2563EB',
  primaryBrand: '光速云',
  establishedYear: 2026,
  verification: {
    // 站长平台验证代码预留区（填入各平台提供的 token 即可在最终静态 HTML 中输出）
    google: '', // Google Search Console: <meta name="google-site-verification" content="..." />
    bing: '',   // Bing Webmaster Tools: <meta name="msvalidate.01" content="..." />
    baidu: '',  // 百度搜索资源平台: <meta name="baidu-site-verification" content="..." />
    shenma: '', // 神马站长平台: <meta name="shenma-site-verification" content="..." />
  },
};
