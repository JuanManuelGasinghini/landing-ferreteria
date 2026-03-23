import CartIcon from '../ui/CartIcon'
import '../../styles/layout/header.css'

function Header({ categories, cartCount }) {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <a href="#top" aria-label="Ir al inicio de Casa Fluxo">
          Casa de Sanitarios y ferretería
        </a>
      </div>

      <nav aria-label="Categorias de la tienda">
        <ul className="site-header__nav-list">
          {categories.map((category) => (
            <li key={category.id}>
              <a href={`#${category.id}`}>{category.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="site-header__cart" href="#carrito" aria-label="Abrir carrito">
        <CartIcon className="icon-cart" />
        {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
      </a>
    </header>
  )
}

export default Header
