import "./AddUserModal.css";

export default function RegisterUserModal({ user, handleChange, handleRegister, handleClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrarse</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}>
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Nombre" required />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Correo" required />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Contraseña" required />
          <select name="role" value={user.role} onChange={handleChange} required>
            <option value="">Selecciona un rol</option>
            <option value="BUYER">Comprador</option>
            <option value="PROVIDER">Proveedor</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Registrar</button>
            <button type="button" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
