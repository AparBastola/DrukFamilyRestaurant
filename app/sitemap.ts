import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/business';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/menu', '/book', '/order', '/about', '/reviews', '/gallery', '/contact'];
  const now = new Date();
  return paths.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
}
