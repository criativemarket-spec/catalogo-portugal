'use client'
// app/finalizar/page.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/context/CartContext'
import { getCategories } from '@/lib/categories'
import { getSiteConfig } from '@/lib/config'
import { Category, SiteConfig } from '@/types'
import { generateWhatsAppMessage, openWhatsApp, formatPrice } from '@/lib/whatsapp'
import { MessageCircle, Copy, Check, ShoppingBag, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FinalizarPage() {
  const { items, total, clearCart } = useCart()
  const [categories, setCategories] = useState<Category[]>([])
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Promise.all([getCategories(), getSiteConfig()]).then(([cats, cfg]) => {
      setCategories(cats)
      setConfig(cfg)
    })
  }, [])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={40} className="text-nude-200" />
        <p className="font-display text-2xl text-nude-600">Carrinho vazio</p>
        <Link href="/catalogo" className="btn-primary">Ir ao catálogo</Link>
      </div>
    )
  }

  const message = config ? generateWhatsAppMessage(items, config) : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    toast.success('Pedido copiado!')
    setTimeout(() => setCopied(false), 3000)
  }

  const handleWhatsApp = () => {
    if (!config) return
    openWhatsApp(config.whatsappNumber, message)
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header categories={categories} />

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <Link href="/carrinho" className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-nude-500 hover:text-nude-700 transition-colors mb-10">
          <ArrowLeft size={14} /> Voltar ao carrinho
        </Link>

        <div className="mb-10">
          <p className="section-subtitle mb-3">Quase lá</p>
          <h1 className="section-title">Finalizar Pedido</h1>
          <div className="h-px w-12 bg-[var(--color-gold)] mt-4" />
        </div>

        {/* Resumo visual */}
        <div className="bg-white p-6 md:p-8 mb-6">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-nude-400 mb-5">
            Resumo do pedido
          </p>

          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between items-start">
                <div>
                  <p className="font-body text-sm text-nude-700">{item.product.name}</p>
                  <p className="font-body text-xs text-nude-400">Quantidade: {item.quantity}</p>
                </div>
                <p className="font-body text-sm font-medium text-[var(--color-gold)]">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-nude-100 pt-4 flex justify-between items-center">
            <p className="font-body text-sm tracking-[0.1em] uppercase text-nude-600">Total</p>
            <p className="font-display text-3xl font-light text-[var(--color-gold)]">
              {formatPrice(total)}
            </p>
          </div>
        </div>

        {/* Mensagem gerada */}
        <div className="bg-white p-6 mb-6">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-nude-400 mb-4">
            Mensagem para WhatsApp
          </p>
          <pre className="font-body text-sm text-nude-700 whitespace-pre-wrap bg-nude-50 p-4 leading-relaxed">
            {message}
          </pre>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] text-white flex items-center justify-center gap-3 px-8 py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#20B858] transition-colors duration-200"
          >
            <MessageCircle size={18} />
            Enviar pelo WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="btn-outline w-full flex items-center justify-center gap-2"
          >
            {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            {copied ? 'Copiado!' : 'Copiar pedido'}
          </button>
        </div>

        <p className="font-body text-xs text-nude-400 text-center mt-6 leading-relaxed">
          Ao enviar pelo WhatsApp, você será redirecionado para a conversa com a mensagem preenchida automaticamente. Aguarde a confirmação da nossa equipa.
        </p>
      </div>

      {config && (
        <Footer
          whatsappNumber={config.whatsappNumber}
          storeName={config.storeName}
          instagramUrl={config.instagramUrl}
        />
      )}
    </div>
  )
}
