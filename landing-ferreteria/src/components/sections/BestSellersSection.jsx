import HighlightCard from '../ui/HighlightCard'
import '../../styles/sections/best-sellers-section.css'

function BestSellersSection({ products, isLoading }) {
  return (
    <section className="best-sellers-section" id="mas-vendidos" aria-labelledby="mas-vendidos-title">
      <header className="section-header">
        <p className="section-header__kicker">Más pedidos</p>
        <h2 id="mas-vendidos-title">Los que aparecen primero cuando la obra apura</h2>
      </header>

      {isLoading ? (
        <p className="best-sellers-loading" role="status" aria-live="polite">
          Preparando destacados…
        </p>
      ) : products.length === 0 ? (
        <p className="best-sellers-empty" role="status" aria-live="polite">
          Sin destacados por ahora. En cuanto carguemos el ranking, se va a ver acá.
        </p>
      ) : (
        <div className="highlights-grid">
          {products.map((product) => (
            <HighlightCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BestSellersSection
