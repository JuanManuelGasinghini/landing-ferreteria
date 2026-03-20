import '../../styles/ui/product-card.css'

function ProductCard({ name, description, price, category, imageUrl, imageAlt, onAddToCart }) {
  return (
    <article className="product-card">
      <figure className="product-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} loading="lazy" />
        ) : (
          <div className="image-placeholder" role="img" aria-label={imageAlt}>
            Imagen pendiente
          </div>
        )}
      </figure>
      <div className="product-card__content">
        <p className="product-card__category">{category}</p>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="product-card__footer">
          <strong>{price}</strong>
          <button type="button" aria-label={`Agregar ${name} al carrito`} onClick={onAddToCart}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
