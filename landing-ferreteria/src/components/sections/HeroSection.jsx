import '../../styles/sections/hero-section.css'

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__overlay">
        <p className="hero-section__eyebrow">Sistema sanitario y ferreteria de precision</p>
        <h1 id="hero-title">
          Tu obra no necesita suerte:
          <br />
          necesita piezas que respondan a la primera.
        </h1>
        <p className="hero-section__copy">
          Disenamos un catalogo que piensa como instalador: decisiones rapidas, stock visible y
          soluciones que evitan rehacer trabajo.
        </p>
        <div className="hero-section__cta-group">
          <a href="#productos" className="button-primary">
            Explorar productos
          </a>
          <a href="#mas-vendidos" className="button-secondary">
            Ver mas vendidos
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
