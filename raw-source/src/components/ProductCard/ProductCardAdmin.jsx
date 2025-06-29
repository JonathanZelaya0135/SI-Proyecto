import "./ProductCardAdmin.css";

export default function ProductCardAdmin({ product, onDelete }) {
  if (!product) return null;

  return (
    <div className="product-card">
      <img
        src={product.image && product.image.trim() !== "" ? product.image : "/images/placeholder-image.png"}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <div className="product-details">
        <p className="product-description">{product.description}</p>
      </div>
      <div className="button-container">
        <p className="product-price">${product.price}</p>
        <button
          className="card-delete-button"
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
