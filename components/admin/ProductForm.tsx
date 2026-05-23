'use client'
// components/admin/ProductForm.tsx
import { useState } from 'react'
import Image from 'next/image'
import { Product, Category } from '@/types'
import { X, Plus, Loader2, Link } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProductFormProps {
  initialData?: Partial<Product>
  categories: Category[]
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => Promise<void>
  loading?: boolean
}

export default function ProductForm({ initialData, categories, onSubmit, loading = false }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice] = useState(initialData?.price?.toString() || '')
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '')
  const [sku, setSku] = useState(initialData?.sku || '')
  const [visible, setVisible] = useState(initialData?.visible ?? true)
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [images, setImages] = useState<string[]>(initialData?.images || [''])
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const addImageField = () => setImages(prev => [...prev, ''])

  const updateImage = (index: number, value: string) => {
    setImages(prev => prev.map((img, i) => i === index ? value : img))
    setImgErrors(prev => ({ ...prev, [index]: false }))
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !price || !categoryId) {
      toast.error('Preencha nome, preço e categoria')
      return
    }
    const validImages = images.filter(img => img.trim() !== '')
    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      categoryId,
      sku: sku.trim(),
      visible,
      featured,
      images: validImages,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informações básicas */}
      <div className="bg-white p-6 md:p-8 space-y-5">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-nude-400 mb-5">
          Informações do produto
        </p>

        <div>
          <label className="label-admin">Nome do produto *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-admin"
            placeholder="Ex: Geleia de Rosas Hidratante"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="label-admin">Preço (€) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="input-admin"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="label-admin">Código do produto (opcional)</label>
            <input
              type="text"
              value={sku}
              onChange={e => setSku(e.target.value)}
              className="input-admin"
              placeholder="Ex: GEL-001"
            />
          </div>
        </div>

        <div>
          <label className="label-admin">Categoria *</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="input-admin"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-admin">Descrição</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="input-admin resize-none"
            rows={4}
            placeholder="Descreva o produto, benefícios, modo de uso..."
          />
        </div>
      </div>

      {/* URLs das fotos */}
      <div className="bg-white p-6 md:p-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-nude-400 mb-2">
          Fotos do produto
        </p>
        <p className="font-body text-xs text-nude-400 mb-5">
          Cole o link direto da imagem. Use <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-[#B8860B] underline">imgbb.com</a> para hospedar gratuitamente — após upload, copie o link que aparece em "Ver links".
        </p>

        <div className="space-y-3">
          {images.map((url, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body text-[10px] tracking-widest uppercase text-nude-400">
                    {i === 0 ? 'Foto principal *' : `Foto ${i + 1}`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={e => updateImage(i, e.target.value)}
                    className="input-admin flex-1"
                    placeholder="https://i.ibb.co/..."
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="p-3 text-nude-400 hover:text-red-500 transition-colors border border-nude-200"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                {/* Preview */}
                {url && !imgErrors[i] && (
                  <div className="mt-2 relative w-20 h-20 bg-nude-100 overflow-hidden">
                    <Image
                      src={url}
                      alt={`Preview ${i + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                    />
                  </div>
                )}
                {url && imgErrors[i] && (
                  <p className="font-body text-xs text-red-400 mt-1">Link inválido ou imagem não carregou</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addImageField}
          className="mt-4 flex items-center gap-2 font-body text-xs tracking-widest uppercase text-nude-500 hover:text-nude-700 transition-colors border border-nude-200 px-4 py-2"
        >
          <Plus size={13} /> Adicionar mais fotos
        </button>

        <div className="mt-4 p-4 bg-nude-50 border border-nude-100">
          <p className="font-body text-xs text-nude-500 font-medium mb-2">Como hospedar fotos gratuitamente:</p>
          <ol className="font-body text-xs text-nude-400 space-y-1 list-decimal list-inside">
            <li>Acesse <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-[#B8860B] underline">imgbb.com</a></li>
            <li>Clique em "Start uploading" e selecione as fotos</li>
            <li>Após o upload, clique em "Ver links"</li>
            <li>Copie os links que começam com <strong>https://i.ibb.co/</strong></li>
            <li>Cole nos campos acima</li>
          </ol>
        </div>
      </div>

      {/* Visibilidade */}
      <div className="bg-white p-6 md:p-8">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-nude-400 mb-5">
          Configurações
        </p>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={visible}
              onChange={e => setVisible(e.target.checked)}
              className="w-4 h-4 accent-nude-700"
            />
            <div>
              <p className="font-body text-sm text-nude-700">Produto visível no catálogo</p>
              <p className="font-body text-xs text-nude-400">Desmarque para ocultar sem excluir</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-nude-700"
            />
            <div>
              <p className="font-body text-sm text-nude-700">Produto em destaque</p>
              <p className="font-body text-xs text-nude-400">Aparece na página inicial</p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? 'Salvando...' : 'Salvar Produto'}
        </button>
        <a href="/admin/produtos" className="btn-outline">
          Cancelar
        </a>
      </div>
    </form>
  )
}
