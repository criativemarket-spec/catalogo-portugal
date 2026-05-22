// app/produto/[id]/page.tsx
import { Metadata } from 'next'
import { getProductById } from '@/lib/products'
import ProdutoClient from './ProdutoClient'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProductById(params.id)
    if (!product) return { title: 'Produto não encontrado — Brasil Premium' }
    return {
      title: `${product.name} — Brasil Premium`,
      description: product.description?.slice(0, 160) || `${product.name} importado do Brasil. Disponível em Portugal.`,
      openGraph: {
        title: product.name,
        description: product.description?.slice(0, 160) || '',
        images: product.images?.[0] ? [{ url: product.images[0], width: 800, height: 600 }] : [],
      },
    }
  } catch {
    return { title: 'Produto — Brasil Premium' }
  }
}

export default function ProdutoPage({ params }: Props) {
  return <ProdutoClient id={params.id} />
}
