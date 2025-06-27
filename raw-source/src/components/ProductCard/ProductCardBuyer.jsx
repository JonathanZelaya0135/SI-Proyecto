import './ProductCard.css';

export default function ProductCardBuyer({ product, onBuy }) {
  return (
    <div class="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} class="product-image" />
      )}
      <h3 class="product-name">{product.name}</h3>

      <div class="product-details">
        <p class="product-description">{product.description}</p>
        <div class="product-actions">
          <select class="quantity-dropdown">
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>
          <button class="buy-button" onClick={() => onBuy(product)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
