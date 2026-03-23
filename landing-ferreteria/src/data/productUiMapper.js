const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

const categoryIdToLabel = {
  canerias: 'Cañerias',
  piezas: 'Piezas',
  accesorios: 'Accesorios',
  griferias: 'Griferías',
}

function normalizeCategoryId(value) {
  if (!value) return ''

  const normalized = String(value).trim().toLowerCase()
  if (normalized.includes('cañ') || normalized.includes('caner')) return 'canerias'
  if (normalized.includes('piez')) return 'piezas'
  if (normalized.includes('accesor')) return 'accesorios'
  if (normalized.includes('grifer')) return 'griferias'

  return normalized.replace(/\s+/g, '-')
}

function formatPrice(value) {
  const num = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(num)) return '$0'
  return currencyFormatter.format(num)
}

function buildDescription({ marca, codigo }) {
  const safeMarca = marca ? String(marca).trim() : ''
  const safeCodigo = codigo ? String(codigo).trim() : ''

  // Description compacta para no llenar cards con textos repetitivos.
  if (safeMarca && safeCodigo) return `${safeMarca} · Código ${safeCodigo}`
  if (safeMarca) return safeMarca
  if (safeCodigo) return `Código ${safeCodigo}`
  return 'Producto disponible'
}

/**
 * Maps Firestore raw product to the UI model expected by ProductCard.
 */
export function mapFirestoreProductToUiProduct(raw) {
  const categoryId = normalizeCategoryId(raw.categoria ?? raw.category ?? raw.categoria_id)

  const codigo = raw.codigo ?? raw.code ?? raw.Codigo ?? raw.CODIGO ?? ''
  const nombre = raw.nombre ?? raw.name ?? raw.Nombre ?? raw.NOMBRE ?? ''

  const marca = raw.marca ?? raw.brand ?? raw.Marca ?? ''
  const stock = Number(raw.stock ?? raw.Stock ?? 0)
  const precio = raw.precio ?? raw.price ?? raw.Precio ?? 0

  const imageUrlRaw = raw.foto ?? raw.imageUrl ?? raw.Image ?? ''
  const imageUrl = String(imageUrlRaw || '')

  return {
    id: String(raw.id ?? raw.ID ?? codigo ?? raw.id ?? ''),
    name: String(nombre),
    description: raw.descripcion ?? buildDescription({ marca, codigo }),
    price: formatPrice(precio),
    categoryId,
    category: categoryIdToLabel[categoryId] ?? categoryId,
    imageUrl,
    imageAlt: String(nombre) || 'Producto',
    stock,
  }
}

