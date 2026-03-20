import '../../styles/ui/highlight-card.css'

function HighlightCard({ name, summary, badge, imageUrl, imageAlt }) {
  return (
    <article className="highlight-card">
      <figure className="highlight-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} loading="lazy" />
        ) : (
          <div className="image-placeholder" role="img" aria-label={imageAlt}>
            Imagen pendiente
          </div>
        )}
      </figure>
      <div className="highlight-card__content">
        <p className="highlight-card__badge">{badge}</p>
        <h3>{name}</h3>
        <p>{summary}</p>
      </div>
    </article>
  )
}

export default HighlightCard
