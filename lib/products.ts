// lib/products.ts
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { Product } from '@/types'

const COL = 'products'

function toDate(val: any): Date {
  if (!val) return new Date()
  if (val?.toDate) return val.toDate()
  return new Date(val)
}

function mapDoc(d: any): Product {
  const data = d.data()
  return { id: d.id, ...data, createdAt: toDate(data.createdAt), updatedAt: toDate(data.updatedAt) } as Product
}

export async function getProducts(opts?: {
  categoryId?: string
  featured?: boolean
  limitCount?: number
}): Promise<Product[]> {
  const c: any[] = [where('visible', '==', true), orderBy('createdAt', 'desc')]
  if (opts?.categoryId) c.splice(1, 0, where('categoryId', '==', opts.categoryId))
  if (opts?.featured !== undefined) c.splice(1, 0, where('featured', '==', opts.featured))
  if (opts?.limitCount) c.push(limit(opts.limitCount))
  const snap = await getDocs(query(collection(db, COL), ...c))
  return snap.docs.map(mapDoc)
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  return mapDoc(snap)
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('createdAt', 'desc')))
  return snap.docs.map(mapDoc)
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return ref.id
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...data, updatedAt: Timestamp.now() })
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}

export async function searchProducts(term: string): Promise<Product[]> {
  const snap = await getDocs(query(collection(db, COL), where('visible', '==', true), orderBy('name')))
  const lower = term.toLowerCase()
  return snap.docs.map(mapDoc).filter(p =>
    p.name.toLowerCase().includes(lower) || p.description?.toLowerCase().includes(lower)
  )
}
