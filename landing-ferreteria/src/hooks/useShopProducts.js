import { useEffect, useMemo, useState } from 'react'
import { isFirebaseConfigured } from '../services/firebase/config'
import { fetchProducts } from '../services/firebase/productsRepository'
import { mapFirestoreProductToUiProduct } from '../data/productUiMapper'
import { bestSellerProducts, featuredProducts } from '../data/products'

export function useShopProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(featuredProducts)
  const [hasRemoteData, setHasRemoteData] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        if (!isFirebaseConfigured) {
          setProducts(featuredProducts)
          setHasRemoteData(false)
          return
        }

        const remoteProducts = await fetchProducts()
        const mapped = remoteProducts.map(mapFirestoreProductToUiProduct)

        if (!cancelled) {
          setProducts(mapped)
          setHasRemoteData(remoteProducts.length > 0)
        }
      } catch {
        if (!cancelled) {
          setProducts(featuredProducts)
          setHasRemoteData(false)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const bestSeller = useMemo(() => {
    if (hasRemoteData) {
      return [...products]
        .sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0))
        .slice(0, 3)
        .map((p, index) => ({
          id: `best-${p.id}-${index}`,
          name: p.name,
          summary: p.description,
          badge: 'Selección por disponibilidad',
          imageUrl: p.imageUrl,
          imageAlt: p.imageAlt,
        }))
    }

    // Fallback local “best sellers” while Firebase is not configured.
    return bestSellerProducts
  }, [hasRemoteData, products])

  return { isLoading, products, bestSeller }
}

