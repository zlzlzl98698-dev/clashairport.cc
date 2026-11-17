import { MAIN_NAVIGATION } from '../data/navigation';
import { BRANDS, type Brand } from '../data/brands';

export interface ArticleDoc {
  slug: string;
  url: string;
  title: string;
  description: string;
  canonical?: string;
  pillar: string;
  subtopic?: string;
  type: 'pillar' | 'subtopic' | 'cluster' | 'brand';
  content: string;
  compiledContent?: string;
  rawContent: string;
  readingTimeMinutes: number;
  wordCount: number;
  date: string;
  coverImage?: string;
}

// Global cache for markdown documents
const markdownModules = import.meta.glob('/src/content/**/*.md', { eager: true });

// Cover images fallback rotation
const DEFAULT_COVERS = [
  '/images/covers/404676435-4ea1cc7d-8515-45a9-b656-44bd27b600da.jpg',
  '/images/covers/404676433-b6484953-29aa-43a0-9431-f317753af218.jpg',
  '/images/covers/404676434-1a1a57d4-09b7-45f8-9a41-ad921ac6d24c.jpg',
  '/images/covers/404676815-5b51c723-4ea5-4a82-8dd9-c0f0ca6e99f5.jpg',
];

export function getAllArticles(): ArticleDoc[] {
  const articles: ArticleDoc[] = [];

  for (const [filePath, mod] of Object.entries(markdownModules)) {
    const rawModule = mod as any;
    const frontmatter = rawModule.frontmatter || {};
    
    // Normalizing relative path, e.g. /src/content/airport/recommend/guide-general.md
    const relPath = filePath.replace(/^\/src\/content\//, '');
    const parts = relPath.split('/');

    let pillar = parts[0];
    let subtopic: string | undefined = undefined;
    let type: 'pillar' | 'subtopic' | 'cluster' | 'brand' = 'cluster';
    let url = '/' + relPath.replace(/\.md$/, '').replace(/\/index$/, '') + '/';

    if (parts.length === 1 && parts[0] === 'index.md') {
      continue; // Skip root index if handled by Astro
    }

    if (parts.length === 2 && parts[1] === 'index.md') {
      type = 'pillar';
      url = `/${pillar}/`;
    } else if (parts.length === 3 && parts[2] === 'index.md') {
      type = 'subtopic';
      subtopic = parts[1];
      url = `/${pillar}/${subtopic}/`;
    } else if (parts[0] === 'brands') {
      type = 'brand';
      const brandId = parts[1].replace(/\.md$/, '');
      if (brandId === 'index') {
        url = '/brands/';
      } else {
        url = `/brands/${brandId}/`;
      }
    } else if (parts.length >= 3) {
      type = 'cluster';
      subtopic = parts[1];
      const filename = parts[2].replace(/\.md$/, '');
      url = `/${pillar}/${subtopic}/${filename}/`;
    }

    const rawContent = rawModule.rawContent ? rawModule.rawContent() : '';
    const wordCount = rawContent.replace(/\s+/g, '').length || 1500;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 350));

    // Stable cover image selection based on title hash
    let hash = 0;
    const titleStr = frontmatter.title || relPath;
    for (let i = 0; i < titleStr.length; i++) {
      hash = (hash << 5) - hash + titleStr.charCodeAt(i);
      hash |= 0;
    }
    const coverImage = frontmatter.cover || DEFAULT_COVERS[Math.abs(hash) % DEFAULT_COVERS.length];

    articles.push({
      slug: relPath.replace(/\.md$/, ''),
      url,
      title: frontmatter.title || '无标题文章',
      description: frontmatter.description || '点击查看详情评测与选型指南。',
      canonical: frontmatter.canonical || `https://clashairport.cc${url}`,
      pillar,
      subtopic,
      type,
      content: rawModule.compiledContent ? rawModule.compiledContent() : '',
      rawContent,
      readingTimeMinutes,
      wordCount,
      date: frontmatter.date || '2026-11-17',
      coverImage,
    });
  }

  return articles;
}

export function getArticlesByPillar(pillar: string): ArticleDoc[] {
  return getAllArticles().filter(a => a.pillar === pillar && a.type === 'cluster');
}

export function getArticlesBySubtopic(pillar: string, subtopic: string): ArticleDoc[] {
  return getAllArticles().filter(a => a.pillar === pillar && a.subtopic === subtopic && a.type === 'cluster');
}

export function getLatestArticles(limit: number = 9): ArticleDoc[] {
  return getAllArticles()
    .filter(a => a.type === 'cluster')
    .slice(0, limit);
}

export function getFeaturedArticles(limit: number = 4): ArticleDoc[] {
  return getAllArticles()
    .filter(a => a.type === 'cluster')
    .slice(0, limit);
}

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find(b => b.id === id);
}

export function getPrimaryBrand(): Brand {
  return BRANDS.find(b => b.isPrimary) || BRANDS[0];
}

export function getFeaturedBrands(limit: number = 6): Brand[] {
  return BRANDS.filter(b => b.isFeatured || b.isPrimary).slice(0, limit);
}

export function getRelatedArticles(currentUrl: string, limit: number = 4): ArticleDoc[] {
  return getAllArticles()
    .filter(a => a.url !== currentUrl && a.type === 'cluster')
    .slice(0, limit);
}
