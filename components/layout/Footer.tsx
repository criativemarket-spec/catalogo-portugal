'use client'
// components/layout/Footer.tsx
import Link from 'next/link'
import { MessageCircle, Instagram } from 'lucide-react'

interface FooterProps {
  whatsappNumber?: string
  storeName?: string
  instagramUrl?: string
}

export default function Footer({
  whatsappNumber = '351900000000',
  storeName = 'Brasil Premium',
  instagramUrl,
}: FooterProps) {
  return (
    <>
      <footer className="bg-nude-800 text-cream/80">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <h3 className="font-display text-2xl font-light text-cream tracking-wider mb-4">
                {storeName}
              </h3>
              <div className="h-px w-12 bg-[var(--color-gold)] mb-4" />
              <p className="font-body text-sm leading-relaxed text-cream/60">
                Produtos importados do Brasil com qualidade e sofisticação, entregues em Portugal.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/40 mb-5">
                Navegação
              </p>
              <nav className="flex flex-col gap-3">
                {[
                  { href: '/', label: 'Início' },
                  { href: '/catalogo', label: 'Catálogo' },
                  { href: '/favoritos', label: 'Favoritos' },
                  { href: '/carrinho', label: 'Carrinho' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contato */}
            <div>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/40 mb-5">
                Contato
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  <MessageCircle size={16} className="text-[var(--color-gold)]" />
                  Falar pelo WhatsApp
                </a>
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    <Instagram size={16} className="text-[var(--color-gold)]" />
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-cream/30 tracking-widest">
              © {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
            </p>
            <p className="font-body text-xs text-cream/20 tracking-widest uppercase">
              Produtos Importados do Brasil
            </p>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-premium-hover hover:scale-110 transition-transform duration-200"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle size={26} fill="white" />
      </a>
    </>
  )
}
