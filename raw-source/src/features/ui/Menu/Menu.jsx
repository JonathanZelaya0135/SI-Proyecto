import TransparentIconButton from '../Button/TransparentButton';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { createHandlers } from '../../handlers/menuHandlers';


export default function AppMenu() {
  

  const navigate = useNavigate();
  const handlers= createHandlers(navigate);

  
  const name = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  if(role == null){
    navigate("/login");
    return null;
  };

  const iconMap = {
    handleClickHomeAdmin: { icon: "home", text: "Inicio" },
    handleClickHomeBuyer: { icon: "home", text: "Inicio" },
    handleClickHomeProvider: { icon: "home", text: "Inicio" },

    handleClickProductsAdmin: { icon: "inventory", text: "Inventario" },
    handleClickInventoryBuyer: { icon: "inventory", text: "Mi inventario" },
    handleClickInventoryProvider: { icon: "inventory", text: "Mi inventario" },
    handleClickUsersAdmin: { icon: "group", text: "Usuarios" },
    handleClickShoppingBuyer: { icon: "shopping_cart", text: "Mis productos" },

    handleClickOrdersAdmin: { icon: "edit_square", text: "Mis ordenes" },
    handleClickOrdersBuyer: { icon: "list", text: "Mis ordenes" },
    handleClickOrdersProvider: { icon: "list", text: "Mis ordenes" },

    handleClickProfile: { icon: "person" },
    handleClickLogout: { icon: "logout" },
  };

  // Determine which handlers to use for the menu
  const handlerKeys = {
    ADMIN: [
      "handleClickHomeAdmin",
      "handleClickProductsAdmin",
      "handleClickUsersAdmin",
    ],
    BUYER: [
      "handleClickHomeBuyer",
      "handleClickInventoryBuyer",
      "handleClickOrdersBuyer",
    ],
    PROVIDER: [
      "handleClickHomeProvider",
      "handleClickInventoryProvider", 
      "handleClickOrdersProvider",
    ],
  };

  const menuItems = handlerKeys[role].map((key) => ({
    icon: iconMap[key]?.icon ?? "help",
    text: iconMap[key]?.text ?? key,
    onClick: handlers[key],
  }));

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="title">RawSource</h2>
        <TransparentIconButton icon={"menu"} />
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <TransparentIconButton handleClick={item.onClick} icon={item.icon} text={item.text} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <TransparentIconButton handleClick={handlers.handleClickProfile} icon={"person"} />
          <div>
            <p>{ name }</p>
            <p className="role">{ role }</p>
            {/* Hacer nombre de usuario y rol dinamicos pls :) */}
          </div>
        </div>
        <TransparentIconButton handleClick={handlers.handleClickLogout} icon={"logout"}/>
      </div>
    </div>
  );
}
