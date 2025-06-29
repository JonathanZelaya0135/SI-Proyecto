import "./AddUserModal.css"

export default function AddUserModal({ user, handleChange, handleAddUser, handleCloseModal }){
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar usuario</h2>
                
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddUser();
                }}>
                    <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Nombre" required />
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Correo" required />
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Contraseña" required />
                    <select name="role" value={user.role} onChange={handleChange} required>
                        <option value="">Selecciona un rol</option>
                        <option value="ADMIN">Admin</option>
                        <option value="PROVIDER">Proveedor</option>
                        <option value="BUYER">Comprador</option>
                    </select>
                    <div className="modal-actions">
                        <button type="submit">Crear</button>
                        <button type="button" onClick={handleCloseModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}