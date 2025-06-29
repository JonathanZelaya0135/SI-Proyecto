import "./ProductCard.css";

export default function ProductCardProvider({ product, onDelete }) {
  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <h3 className="product-name">{product.name}</h3>

      <div className="product-details">
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button className="buy-button" onClick={() => onDelete(product.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
