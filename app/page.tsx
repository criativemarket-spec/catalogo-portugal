// app/page.tsx
import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Brasil Premium — Produtos Brasileiros em Portugal',
}

export default function HomePage() {
  return <HomeClient featuredProducts={[]} categories={[]} banners={[]} config={{
    whatsappNumber: '',
    storeName: 'Brasil Premium',
    welcomeMessage: 'Olá! Gostaria de solicitar um orçamento:',
  }} />
}
