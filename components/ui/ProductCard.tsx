'use client'
// components/ui/ProductCard.tsx
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { formatPrice } from '@/lib/whatsapp'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)

  const fav = isFavorite(product.id)
  const mainImage = product.images?.[0] || '/placeholder.jpg'
  const hoverImage = product.images?.[1] || mainImage

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} adicionado`)
  }

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite(product)
    toast.success(fav ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
  }

  return (
    <Link href={`/produto/${product.id}`} className="product-card group block">
      {/* Imagem */}
      <div
        className="relative overflow-hidden bg-nude-50"
        style={{ aspectRatio: '3/4' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Badge destaque */}
        {product.featured && (
          <div className="badge-featured z-10">Destaque</div>
        )}

        {/* Imagem principal */}
        <Image
          src={imgError ? '/placeholder.jpg' : mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-700 ${
            hovered && hoverImage !== mainImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          priority={priority}
          onError={() => setImgError(true)}
        />

        {/* Imagem hover (segunda foto) */}
        {hoverImage !== mainImage && (
          <Image
            src={hoverImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 absolute inset-0 ${
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        )}

        {/* Overlay de ações */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300`} />

        {/* Botões de ação */}
        <div className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={handleFav}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              fav ? 'bg-rosegold-500 text-white' : 'bg-white/90 text-nude-700 hover:bg-white'
            }`}
            aria-label="Favoritar"
          >
            <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddCart}
            className="w-9 h-9 bg-nude-800 text-cream rounded-full flex items-center justify-center hover:bg-nude-700 transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag size={15} />
          </button>
        </div>

        {/* Ver produto — aparece no hover mobile */}
        <div className={`absolute bottom-0 left-0 right-0 bg-nude-800/90 text-cream text-[10px] tracking-[0.3em] uppercase font-body text-center py-3 transition-all duration-300 ${
          hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <span className="flex items-center justify-center gap-2">
            <Eye size={12} /> Ver produto
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="p-4 bg-white">
        {product.categoryName && (
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-nude-400 mb-1">
            {product.categoryName}
          </p>
        )}
        <h3 className="font-display text-base font-light text-nude-900 leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="font-body text-sm font-medium text-[var(--color-gold)]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
