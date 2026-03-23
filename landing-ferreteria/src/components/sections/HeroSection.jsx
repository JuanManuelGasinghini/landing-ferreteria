import '../../styles/sections/hero-section.css'

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__overlay">
        <p className="hero-section__eyebrow">Catálogo para instaladores</p>
        <h1 id="hero-title">
          Lo que tu instalación necesita
          <br />
          sin vueltas
        </h1>
        <p className="hero-section__copy">
          Elegí por medida y compatibilidad: precio claro, stock visible y una compra lista para
          avanzar a tiempo.
        </p>
        <div className="hero-section__cta-group">
          <a href="#productos" className="button-primary">
            Ver catálogo
          </a>
          <a href="#mas-vendidos" className="button-secondary">
            Ir a destacados
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
