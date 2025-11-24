import { useState } from "react";
import "./ProductCardBuyerInventory.css";

export default function ProductCardBuyerInventory({ item, onRegisterUsage, onClick }) {
  const { productName, quantity, product } = item;
  const [showInput, setShowInput] = useState(false);
  const [usageAmount, setUsageAmount] = useState(0);

  const handleRegister = (e) => {
    // prevent card click navigation when confirming

    if (usageAmount > 0 && usageAmount <= quantity) {
      onRegisterUsage(item, usageAmount);
      setUsageAmount(0);
      setShowInput(false);
    } else {
      alert("Cantidad inválida.");
    }
  };

  // no internal navigation here — parent controls navigation
  return (
    <div
      className={`product-card ${quantity === 0 ? "grayed-out" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <img
        src={product?.image || "/images/placeholder-image.png"}
        alt={productName}
        className="product-image"
      />
      <h3 className="product-name">{productName}</h3>

      {quantity === 0 && <span className="stock-badge">¡Sin stock!</span>}

      <div className="product-details">
        <p className="product-description">
          {product?.description || "Sin descripción"}
        </p>

        <div className="product-right-info">
          <p className="product-stock">En inventario: {quantity}</p>

          <div className="product-actions">
            {!showInput ? (
              <button
                className="buy-button"
                onClick={(e) => {
                  // prevent card click navigation when opening input
                  e.stopPropagation();
                  setShowInput(true);
                }}
                disabled={quantity === 0}
              >
                Registrar uso
              </button>
            ) : (
              <>
                <input
                  type="number"
                  min="1"
                  max={quantity}
                  value={usageAmount}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    setUsageAmount(parseInt(e.target.value, 10) || 0)
                  }
                  className="quantity-dropdown"
                />
                <button className="buy-button" onClick={handleRegister}>
                  Confirmar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
