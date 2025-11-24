import "./AddUserModal.css";

export default function AddProductModal({
  product,
  handleChange,
  handleAddProduct,
  handleCloseModal,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar producto</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccionar categoría...
            </option>
            <option value="placeholder1">Categoría 1</option>
            <option value="placeholder2">Categoría 2</option>
            <option value="placeholder3">Categoría 3</option>
          </select>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descripcion"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="URL de imagen"
            required
          />
          <div className="modal-actions">
            <button type="submit">Crear</button>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
