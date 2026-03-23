import ProductCard from '../ui/ProductCard'
import '../../styles/sections/products-section.css'

function ProductsSection({ products, onAddToCart, categories, isLoading }) {
  return (
    <section className="products-section" id="productos" aria-labelledby="productos-title">
      <header className="section-header">
        <p className="section-header__kicker">Catálogo en vivo</p>
        <h2 id="productos-title">Lo que pedís hoy, listo para instalar</h2>
      </header>

      <div className="anchor-grid" aria-hidden="true">
        <span id="canerias"></span>
        <span id="piezas"></span>
        <span id="accesorios"></span>
        <span id="griferias"></span>
      </div>

      {isLoading ? (
        <p className="products-loading" role="status" aria-live="polite">
          Cargando catálogo…
        </p>
      ) : products.length === 0 ? (
        <p className="products-empty" role="status" aria-live="polite">
          Todavía no hay productos cargados. Probá más tarde.
        </p>
      ) : (
        <div className="products-by-category">
          {categories.map((category) => {
            const categoryProducts = products.filter((product) => product.categoryId === category.id)
            return (
              <div key={category.id} className="products-category-block" aria-labelledby={`cat-${category.id}`}>
                <h3 id={`cat-${category.id}`} className="products-category-title">
                  {category.label}
                </h3>

                {categoryProducts.length === 0 ? (
                  <p className="products-category-empty">
                    En esta categoría todavía no encontramos stock cargado.
                  </p>
                ) : (
                  <div className="products-grid">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} {...product} onAddToCart={() => onAddToCart(product)} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProductsSection
