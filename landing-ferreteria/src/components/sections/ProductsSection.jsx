import ProductCard from '../ui/ProductCard'
import '../../styles/sections/products-section.css'

function ProductsSection({ products, onAddToCart }) {
  return (
    <section className="products-section" id="productos" aria-labelledby="productos-title">
      <header className="section-header">
        <p className="section-header__kicker">Nuestros productos</p>
        <h2 id="productos-title">Rendimiento real, desde la primera instalacion</h2>
      </header>

      <div className="anchor-grid" aria-hidden="true">
        <span id="canerias"></span>
        <span id="piezas"></span>
        <span id="accesorios"></span>
        <span id="griferias"></span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onAddToCart={() => onAddToCart(product)} />
        ))}
      </div>
    </section>
  )
}

export default ProductsSection
