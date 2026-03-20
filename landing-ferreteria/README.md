# Casa Fluxo - Landing e-commerce 2026

Landing page de sanitarios y ferreteria construida con React + Vite, orientada a conversion,
accesibilidad, SEO y escalabilidad para integracion futura con Firebase.

## Stack

- React 19
- Vite
- CSS modular por capas (layout / sections / ui)
- ESLint

## Estructura del proyecto

```txt
src/
  components/
    layout/
    sections/
    ui/
  data/
  styles/
    layout/
    sections/
    ui/
```

## Decisiones clave

- Arquitectura modular (single responsibility por componente).
- Datos de productos separados en `data/products.js` para facilitar conexion con Firestore.
- Layout mobile first con mejoras progresivas por `@supports` para navegadores antiguos.
- HTML semantico (`header`, `main`, `section`, `footer`) y mejoras de accesibilidad
  (skip link, labels ARIA, textos alternativos).

## Importante sobre assets

La seccion Hero referencia la imagen:

- `/src/assets/hero-fondo.webp`

Si todavia no existe, la interfaz mantiene un degradado de fallback para no romper el diseño.

Los productos usan placeholders en `/placeholders/...` para luego reemplazar por imagenes reales.

## Scripts

- `npm run dev` inicia entorno local.
- `npm run build` genera build de produccion.
- `npm run preview` previsualiza build.
- `npm run lint` corre analisis estatico.

## Integracion Firebase (siguiente paso)

La capa base ya esta creada en `src/services/firebase/` y el carrito global se encuentra en
`src/context/CartContext.jsx`.

### Variables de entorno (Vercel y local)

1. Copiar `.env.example` a `.env.local`.
2. Completar credenciales de Firebase.
3. En Vercel, cargar las mismas variables en Project Settings -> Environment Variables.

Nunca commitear `.env.local` ni credenciales reales.

### Flujo actual del carrito

- Estado global por `CartProvider`.
- Persistencia local en `localStorage`.
- Sincronizacion remota en Firestore, coleccion `carts`.
- Si Firebase no esta configurado, la app sigue funcionando en modo local.
