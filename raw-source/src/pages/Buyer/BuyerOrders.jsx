import TableOrder from "../../features/ui/Table/TableOrder";
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";

export default function BuyerOrders() {
  const [tableData, setTableData] = useState([]);

  const tableHeaders = [
    { label: "No. Orden", key: "id" },
    { label: "Producto", key: "productName" },
    { label: "Cantidad", key: "quantity" },
    { label: "Monto ($)", key: "totalOrder" },
    { label: "Estado", key: "status" },
  ];

  useEffect(() => {
    instance.get('/orders/myorders')
      .then((res) => {
        const orders = res.data;

        const flattened = orders.map(order => ({
          ...order,
          productName: order.items[0]?.productName ?? '--',
          quantity: order.items[0]?.quantity ?? '--'
        }));

        setTableData(flattened);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  }, []);

  const handleDelete = (orderId) => {
  instance.delete(`/orders/${orderId}`)
    .then(() => {
      const newData = tableData.filter(row => row.id !== orderId);
      setTableData(newData);
      console.log('Deleted order:', orderId);
    })
    .catch(err => {
      console.error('Error deleting order:', err);
      alert('Hubo un error al eliminar la orden.');
    });
};


  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Órdenes de Compra"} icon={"edit"} />
        <div className="table-container">
          <TableOrder data={tableData} headers={tableHeaders} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
