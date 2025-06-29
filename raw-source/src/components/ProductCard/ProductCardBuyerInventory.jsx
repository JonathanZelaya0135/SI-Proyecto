import { useState } from 'react';
import './ProductCardBuyer.css';

export default function ProductCardBuyerInventory({ product, onRegisterUsage }) {
  const [showInput, setShowInput] = useState(false);
  const [usageAmount, setUsageAmount] = useState(0);

  const handleRegister = () => {
    if (usageAmount > 0) {
      onRegisterUsage(product, usageAmount);
      setUsageAmount(0);
      setShowInput(false);
    }
  };

  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <h3 className="product-name">{product.name}</h3>

      <div className="product-details">
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          {!showInput ? (
            <button className="buy-button" onClick={() => setShowInput(true)}>
              Registrar uso
            </button>
          ) : (
            <>
              <input
                type="number"
                min="1"
                value={usageAmount}
                onChange={(e) => setUsageAmount(parseInt(e.target.value))}
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
  );
}
