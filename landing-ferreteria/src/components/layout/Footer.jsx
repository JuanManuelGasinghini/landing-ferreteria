import CartIcon from '../ui/CartIcon'
import '../../styles/layout/footer.css'

const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com' },
]

function Footer({ cartCount }) {
  return (
    <footer className="site-footer">
      <a className="site-footer__to-top" href="#top">
        Volver arriba
      </a>
      <div className="site-footer__logo" aria-hidden="true">
        CF
      </div>
      <ul className="site-footer__social-list" aria-label="Redes sociales">
        {socialLinks.map((social) => (
          <li key={social.id}>
            <a href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
      </ul>
      <a className="site-footer__cart" href="#carrito" aria-label="Ir al carrito de compras">
        <CartIcon className="icon-cart" />
        {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
      </a>
    </footer>
  )
}

export default Footer
