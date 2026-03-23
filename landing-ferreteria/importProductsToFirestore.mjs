/**
 * Import CSV -> Firestore collection `products`.
 *
 * Requisitos:
 * - Credenciales Admin (recomendado): configurar `GOOGLE_APPLICATION_CREDENTIALS`
 *   apuntando a un service account JSON.
 * - El script usa `products` como colección objetivo.
 *
 * Uso:
 *   node importProductsToFirestore.mjs --csv "/ruta/a/basededatos.csv"
 */
import fs from 'node:fs'
import admin from 'firebase-admin'

const PRODUCTS_COLLECTION = 'products'

const DEFAULT_CATEGORY_MAP = {
  Cañeria: 'canerias',
  canerias: 'canerias',
  piezas: 'piezas',
  accesorios: 'accesorios',
  griferias: 'griferias',
  Griferias: 'griferias',
  Griferías: 'griferias',
}

function parseNumber(text) {
  const raw = String(text ?? '').trim()
  if (!raw) return 0
  // Soporta formatos con separadores: "1.234,56" => 1234.56
  const normalized = raw.replace(/\./g, '').replace(',', '.')
  const num = Number(normalized)
  return Number.isFinite(num) ? num : 0
}

function parseIntSafe(text) {
  return Math.trunc(parseNumber(text))
}

function normalizeCategory(value) {
  const v = String(value ?? '').trim()
  if (!v) return ''
  return DEFAULT_CATEGORY_MAP[v] || DEFAULT_CATEGORY_MAP[v.toLowerCase()] || ''
}

function readArg(name) {
  const idx = process.argv.indexOf(name)
  if (idx === -1) return null
  return process.argv[idx + 1] ?? null
}

const csvPath = readArg('--csv') || readArg('-c')
if (!csvPath) {
  console.error('Falta el argumento --csv "/ruta/al/basededatos.csv"')
  process.exit(1)
}

if (!fs.existsSync(csvPath)) {
  console.error('No existe el archivo CSV:', csvPath)
  process.exit(1)
}

// Uses Application Default Credentials:
// - Typically set by GOOGLE_APPLICATION_CREDENTIALS env var
admin.initializeApp({ credential: admin.credential.applicationDefault() })
const db = admin.firestore()

const csvText = fs.readFileSync(csvPath, 'utf8')
const lines = csvText.split(/\r?\n/).filter(Boolean)
if (lines.length < 2) {
  console.error('CSV inválido o sin filas.')
  process.exit(1)
}

const header = lines[0].split(';')
const idx = {}
header.forEach((h, i) => {
  idx[h.trim()] = i
})

const requiredCols = ['Codigo', 'Nombre', 'Marca', 'Precio', 'Stock', 'Cañeria']
for (const col of requiredCols) {
  if (typeof idx[col] !== 'number') {
    console.error('Falta la columna requerida en el CSV:', col)
    process.exit(1)
  }
}

console.log('Importando a Firestore colección:', PRODUCTS_COLLECTION)
console.log('Productos estimados:', lines.length - 1)

let ok = 0
let failed = 0

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(';')
  const codigo = String(cols[idx['Codigo']] ?? '').trim()
  if (!codigo) continue

  const nombre = String(cols[idx['Nombre']] ?? '').trim()
  const marca = String(cols[idx['Marca']] ?? '').trim()
  const precio = parseNumber(cols[idx['Precio']] ?? '')
  const stock = parseIntSafe(cols[idx['Stock']] ?? '')
  const categoria = normalizeCategory(cols[idx['Cañeria']] ?? '')

  const docRef = db.collection(PRODUCTS_COLLECTION).doc(codigo)

  try {
    await docRef.set(
      {
        codigo,
        nombre,
        marca,
        precio,
        stock,
        categoria,
        foto: '',
      },
      { merge: true },
    )
    ok++
  } catch (e) {
    failed++
    console.error('Error importando fila', i, e)
  }
}

console.log('Importación finalizada. OK:', ok, 'FAILED:', failed)

