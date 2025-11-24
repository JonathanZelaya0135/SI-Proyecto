import React, { useState } from "react";
import "./AdvancedFilter.css";

export default function AdvancedFilter({ onApplyFilters, onClose }) {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);  // send filters to parent component
    onClose();                // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Filtro Avanzado</h2>

        <form onSubmit={handleSubmit}>
          {/* CATEGORY DROPDOWN */}
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">Selecciona categoría</option>
            <option value="c1">Categoría 1</option>
            <option value="c2">Categoría 2</option>
            <option value="c3">Categoría 3</option>
          </select>

          {/* EXACT PRICE */}
          <input
            type="number"
            name="price"
            value={filters.price}
            onChange={handleChange}
            placeholder="Precio exacto"
          />

          <div className="modal-actions">
            <button type="submit">Aplicar filtros</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
