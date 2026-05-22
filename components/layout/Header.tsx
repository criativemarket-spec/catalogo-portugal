'use client'
// components/layout/Header.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { Category } from '@/types'

interface HeaderProps {
  categories?: Category[]
}

export default function Header({ categories = [] }: HeaderProps) {
  const { totalItems } = useCart()
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Barra superior */}
      <div className="bg-nude-800 text-cream text-[10px] tracking-[0.3em] uppercase font-body text-center py-2 px-4">
        Frete gratuito para encomendas acima de €150 — Envio para Portugal e Bélgica
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-card border-b border-nude-100'
            : 'bg-cream'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Menu mobile */}
            <button
              className="md:hidden p-2 text-nude-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-1 md:flex-none flex justify-center md:justify-start">
              <div className="text-center">
                <span className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] text-nude-900">
                  Brasil
                </span>
                <span className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] text-[var(--color-gold)] ml-2">
                  Premium
                </span>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-nude-300 to-transparent mt-0.5" />
                <p className="font-body text-[8px] tracking-[0.4em] uppercase text-nude-500">
                  Produtos Brasileiros
                </p>
              </div>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/catalogo" className="font-body text-xs tracking-[0.2em] uppercase text-nude-700 hover:text-nude-900 transition-colors">
                Catálogo
              </Link>
              {categories.slice(0, 4).map(cat => (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.slug}`}
                  className="font-body text-xs tracking-[0.2em] uppercase text-nude-700 hover:text-nude-900 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-nude-700 hover:text-nude-900 transition-colors"
                aria-label="Pesquisar"
              >
                <Search size={18} />
              </button>

              <Link href="/favoritos" className="p-2 text-nude-700 hover:text-nude-900 transition-colors relative">
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rosegold-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link href="/carrinho" className="p-2 text-nude-700 hover:text-nude-900 transition-colors relative">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-nude-800 text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Barra de busca */}
          {searchOpen && (
            <div className="border-t border-nude-100 py-4 animate-slide-up">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchTerm.trim()) {
                    window.location.href = `/catalogo?busca=${encodeURIComponent(searchTerm)}`
                  }
                }}
                className="flex items-center gap-3 max-w-xl mx-auto"
              >
                <Search size={16} className="text-nude-400 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="O que está procurando?"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="input-premium flex-1 text-sm"
                />
                <button type="submit" className="btn-primary py-2 px-5 text-[10px]">
                  Buscar
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Menu mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-0 left-0 h-full w-72 bg-cream shadow-drawer animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8">
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-nude-500 mb-6">Menu</p>
              <nav className="flex flex-col gap-5">
                <Link href="/catalogo" className="font-display text-2xl font-light text-nude-800 hover:text-nude-900" onClick={() => setMenuOpen(false)}>
                  Catálogo
                </Link>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/catalogo?categoria=${cat.slug}`}
                    className="font-display text-xl font-light text-nude-700 hover:text-nude-900"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
                <hr className="border-nude-200 my-2" />
                <Link href="/favoritos" className="font-body text-sm tracking-widest uppercase text-nude-600 hover:text-nude-800 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  <Heart size={14} /> Favoritos
                </Link>
                <Link href="/carrinho" className="font-body text-sm tracking-widest uppercase text-nude-600 hover:text-nude-800 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  <ShoppingBag size={14} /> Carrinho
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
