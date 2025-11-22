import TableTransactions from "../../features/ui/Table/TableTransactions";
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";

export default function Transactions() {
  const [tableData, setTableData] = useState([]);
  const myId = localStorage.getItem("id");

  const tableHeaders = [
    { label: "No. Producto", key: "id" },
    { label: "Nombre del Producto", key: "productName" },
    { label: "Cantidad", key: "quantity" },
    { label: "Precio ($)", key: "price" },
    { label: "Indicador de Stock", key: "stock" },
  ];

  useEffect(() => {
    instance.get(`/transactions/${myId}`) //Cambiar endpoint segun el que se cree
      .then((res) => {
        const orders = res.data;

        const flattened = orders.map(order => ({
          ...order,
          id: order.items[0]?.productId ?? '--',
          productName: order.items[0]?.productName ?? '--',
          quantity: order.items[0]?.quantity ?? '--',
        }));

        setTableData(flattened);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  }, []);


  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Transacciones"} icon={"edit"} />
        <div className="table-container">
          <TableTransactions data={tableData} headers={tableHeaders} />
        </div>
      </div>
    </div>
  );
}
