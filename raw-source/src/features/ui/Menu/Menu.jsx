
import './Menu.css';

export default function AppMenu() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>RawSource</h2>
        <span className="material-icons">menu</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <span className="material-icons">home</span>
            <span>Inicio</span>
          </li>
          <li>
            <span className="material-icons">shopping_cart</span>
            <span>Mis productos</span>
          </li>
          <li>
            <span className="material-icons">list</span>
            <span>Mis ordenes</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <span className="material-icons">person</span>
          <div>
            <p>Usuario</p>
            <span>Proveedor</span>
          </div>
        </div>
        <span className="material-icons">logout</span>
      </div>
    </div>
  );
}
