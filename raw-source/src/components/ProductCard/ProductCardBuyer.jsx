import './ProductCard.css';

export default function ProductCardBuyer({ product, onBuy }) {
  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <h3 className="product-name">{product.name}</h3>

      <div className="product-details">
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <select className="quantity-dropdown">
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>
          <button className="buy-button" onClick={() => onBuy(product)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
