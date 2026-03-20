function CartIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 4H5L7.6 15H18.2L21 7H6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.3" cy="19.2" r="1.5" fill="currentColor" />
      <circle cx="17.3" cy="19.2" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default CartIcon
