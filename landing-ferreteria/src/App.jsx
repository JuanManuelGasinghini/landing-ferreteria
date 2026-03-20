import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProductsSection from './components/sections/ProductsSection'
import BestSellersSection from './components/sections/BestSellersSection'
import { bestSellerProducts, featuredProducts, shopCategories } from './data/products'
import { useCart } from './hooks/useCart'
import './App.css'

function App() {
  const { items, cartCount, cartTotalFormatted, addItem, removeItem, updateQuantity, clearCart } =
    useCart()

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <Header categories={shopCategories} cartCount={cartCount} />
      <main id="main-content">
        <HeroSection />
        <ProductsSection products={featuredProducts} onAddToCart={addItem} />
        <BestSellersSection products={bestSellerProducts} />
        <section className="cart-callout" id="carrito" aria-labelledby="carrito-title">
          <h2 id="carrito-title">Tu carrito sincronizado</h2>
          <p>Persistencia local + Firestore para que tu seleccion no se pierda al recargar.</p>
          {items.length > 0 ? (
            <>
              <ul className="cart-list">
                {items.map((item) => (
                  <li key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Restar unidad de ${item.name}`}
                      >
                        -
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Sumar unidad de ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <p>
                  Total estimado: <strong>{cartTotalFormatted}</strong>
                </p>
                <button type="button" onClick={clearCart}>
                  Vaciar carrito
                </button>
              </div>
            </>
          ) : (
            <p>Tu carrito esta vacio. Explora productos y agregalos en un clic.</p>
          )}
        </section>
      </main>
      <Footer cartCount={cartCount} />
    </div>
  )
}

export default App
