import React from 'react';
import './RoleDropdown.css';

const RoleDropdown = ({ value, onChange }) => {
  return (
    <div className="role-dropdown">
      <label htmlFor="role-select" className="role-label">Rol:</label>
      <select id="role-select" name="role" value={value} onChange={onChange}>
        <option value="">Todos</option>
        <option value="ADMIN">Administrador</option>
        <option value="BUYER">Comprador</option>
        <option value="PROVIDER">Proveedor</option>
      </select>
    </div>
  );
};

export default RoleDropdown;
