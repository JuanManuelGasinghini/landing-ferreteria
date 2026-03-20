import HighlightCard from '../ui/HighlightCard'
import '../../styles/sections/best-sellers-section.css'

function BestSellersSection({ products }) {
  return (
    <section className="best-sellers-section" id="mas-vendidos" aria-labelledby="mas-vendidos-title">
      <header className="section-header">
        <p className="section-header__kicker">Productos mas vendidos</p>
        <h2 id="mas-vendidos-title">Los elegidos por profesionales que no negocian calidad</h2>
      </header>

      <div className="highlights-grid">
        {products.map((product) => (
          <HighlightCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

export default BestSellersSection
