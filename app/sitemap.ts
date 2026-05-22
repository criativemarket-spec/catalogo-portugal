// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products'
import { getCategories } from '@/lib/categories'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brasилpremium.pt'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getProducts({ limitCount: 500 }),
    getCategories(),
  ])

  const productUrls = products.map(p => ({
    url: `${BASE_URL}/produto/${p.id}`,
    lastModified: new Date(p.updatedAt || p.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map(c => ({
    url: `${BASE_URL}/catalogo?categoria=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryUrls,
    ...productUrls,
  ]
}
