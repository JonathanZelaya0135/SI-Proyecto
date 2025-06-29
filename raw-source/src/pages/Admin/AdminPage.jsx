import AppMenu from "../../features/ui/Menu/Menu";
import MainTitle from "../../features/ui/Title/MainTitle";
import "./AdminPage.css";
import DashboardCard from "../../features/ui/Card/DashboardCard";
import TableDashboard from "../../features/ui/Table/TableDashboard";
import { useState, useEffect } from "react";
import instance from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);
  const [productsCount, setProductCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    instance
      .get("/orders")
      .then((res) => {
        const orders = res.data;

        const flattened = orders.map((order) => ({
          orderNumber: order.id,
          buyer: order.buyerName,
          product: order.items[0]?.productName ?? "--",
          quantity: order.items[0]?.quantity ?? "--",
        }));

        setTableData(flattened);
        setOrdersCount(orders.length);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/products")
      .then((res) => {
        const products = res.data;
        setUsersCount(products.length);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/users")
      .then((res) => {
        const users = res.data;
        setProductCount(users.length);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const tableHeaders = [
    { label: "No. Pedido", key: "orderNumber" },
    { label: "Comprador", key: "buyer" },
    { label: "Producto", key: "product" },
    { label: "Cantidad", key: "quantity" },
  ];

  if (role == null) {
    navigate("/login");
    return null;
  }

  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Dashboard"} icon={"query_stats"} />
        <div className="admin-cards-container">
          <DashboardCard
            title={"Productos Registrados"}
            value={usersCount}
            label={"ultimos 7 dias"}
          />
          <DashboardCard
            title={"Usuarios Registrados"}
            value={productsCount}
            label={"Junio 2025"}
          />
          <DashboardCard
            title={"Ordenes Realizadas"}
            value={ordersCount}
            label={"ultimos 7 dias"}
          />
        </div>
        <div className="table-container">
          <TableDashboard data={tableData} headers={tableHeaders} />
        </div>
      </div>
    </div>
  );
}
