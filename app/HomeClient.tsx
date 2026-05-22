'use client'
// app/HomeClient.tsx
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { Product, Category, Banner, SiteConfig } from '@/types'
import { MessageCircle, ArrowRight, Star, Shield, Truck } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface Props {
  featuredProducts: Product[]
  categories: Category[]
  banners: Banner[]
  config: SiteConfig
}

export default function HomeClient({ featuredProducts, categories, banners, config }: Props) {
  // Adicionar nome da categoria nos produtos
  const productsWithCategory = featuredProducts.map(p => ({
    ...p,
    categoryName: categories.find(c => c.id === p.categoryId)?.name,
  }))

  return (
    <div className="min-h-screen bg-cream">
      <Header categories={categories} />

      {/* ── BANNER PRINCIPAL ── */}
      <section className="relative">
        {banners.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="w-full"
          >
            {banners.map(banner => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full bg-nude-100" style={{ aspectRatio: '21/9' }}>
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || 'Banner'}
                    fill
                    className="object-cover"
                    priority
                  />
                  {(banner.title || banner.subtitle) && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center text-white px-4">
                        {banner.title && (
                          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-4 drop-shadow-lg">
                            {banner.title}
                          </h1>
                        )}
                        {banner.subtitle && (
                          <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase opacity-90 mb-8">
                            {banner.subtitle}
                          </p>
                        )}
                        <Link href="/catalogo" className="btn-primary inline-block bg-white/20 border border-white/60 text-white hover:bg-white hover:text-nude-800 backdrop-blur-sm">
                          Ver Coleção
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Banner padrão quando não há imagens cadastradas */
          <div className="relative bg-nude-100 overflow-hidden" style={{ aspectRatio: '21/9', minHeight: '280px' }}>
            <div className="absolute inset-0 bg-texture-cream" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <p className="font-body text-[10px] tracking-[0.5em] uppercase text-nude-400 mb-4">
                  Importados com cuidado
                </p>
                <h1 className="font-display text-5xl md:text-7xl font-light text-nude-800 tracking-wider mb-4">
                  O melhor do Brasil
                </h1>
                <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-nude-500 mb-8">
                  Em Portugal
                </p>
                <Link href="/catalogo" className="btn-primary">
                  Explorar Catálogo
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="border-y border-nude-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Truck, label: 'Entrega em Portugal' },
              { icon: Shield, label: 'Produtos Originais' },
              { icon: Star, label: 'Atendimento VIP' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2 md:gap-3">
                <Icon size={16} className="text-[var(--color-gold)] flex-shrink-0" />
                <span className="font-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-nude-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Explore por</p>
            <h2 className="section-title">Categorias</h2>
            <div className="h-px w-16 bg-[var(--color-gold)] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group relative overflow-hidden bg-nude-50 hover:bg-nude-100 transition-all duration-300 p-6 text-center"
              >
                <div className="mb-3 text-3xl">✦</div>
                <p className="font-display text-base font-light text-nude-800 group-hover:text-nude-900">
                  {cat.name}
                </p>
                <div className="h-px w-0 group-hover:w-full bg-[var(--color-gold)] mx-auto mt-2 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── DESTAQUES ── */}
      {productsWithCategory.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-subtitle mb-3">Mais Procurados</p>
                <h2 className="section-title">Destaques</h2>
                <div className="h-px w-16 bg-[var(--color-gold)] mt-4" />
              </div>
              <Link href="/catalogo" className="hidden md:flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-nude-600 hover:text-nude-800 transition-colors">
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {productsWithCategory.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/catalogo" className="btn-outline">
                Ver Catálogo Completo
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA WHATSAPP ── */}
      <section className="py-20 md:py-28 bg-nude-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-texture-cream opacity-5" />
        <div className="max-w-2xl mx-auto px-4 text-center relative">
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-8" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream tracking-wider mb-6">
            Precisa de ajuda para escolher?
          </h2>
          <p className="font-body text-sm text-cream/60 tracking-wide leading-relaxed mb-10">
            A nossa equipa está pronta para orientar a sua compra e esclarecer todas as dúvidas.
            Fale connosco pelo WhatsApp.
          </p>
          <a
            href={`https://wa.me/${config.whatsappNumber?.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#20B858] transition-colors duration-200"
          >
            <MessageCircle size={18} />
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

      <Footer
        whatsappNumber={config.whatsappNumber}
        storeName={config.storeName}
        instagramUrl={config.instagramUrl}
      />
    </div>
  )
}
