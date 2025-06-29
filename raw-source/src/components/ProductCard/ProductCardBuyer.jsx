import './ProductCardBuyer.css';

export default function ProductCardBuyer({ product, quantity = 1, onQuantityChange, onBuy }) {
  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <h3 className="product-name">{product.name}</h3>

      <div className="product-details">
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <select
            className="quantity-dropdown"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
          >
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                {n + 1}
              </option>
            ))}
          </select>
          <button className="buy-button" onClick={onBuy}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
