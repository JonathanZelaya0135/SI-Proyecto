import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from "react";
import instance from "../../api/axios";
import TableManage from "../../features/ui/Table/TableManage";

export default function ProviderOrders() {
  const [tableData, setTableData] = useState([]);
  const tableHeaders = [
    { label: "No. Pedido", key: "orderNumber" },
    { label: "Comprador", key: "buyer" },
    { label: "Producto", key: "product" },
    { label: "Cantidad", key: "quantity" },
  ];

  useEffect(() => {
    instance
      .get("/orders/provider/myorders")
      .then((res) => {
        const orders = res.data;
        console.log(orders);

        const flattened = orders.map((order) => ({
          orderNumber: order.id,
          buyer: order.buyerName,
          product: order.items[0]?.productName ?? "--",
          quantity: order.items[0]?.quantity ?? "--",
        }));

        setTableData(flattened);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  const handleDelete = (orderNumberToDelete) => {
    const newData = tableData.filter(
      (row) => row.orderNumber !== orderNumberToDelete
    );
    setTableData(newData);
    console.log("Deleted order number:", orderNumberToDelete);
  };

  const handleSend = async (index) => {
    const order = tableData[index];
    const orderId = order.orderNumber;

    try {
      // Pasar status a APPROVED
      await instance.put(
        `/orders/${orderId}/status`,
        { newStatus: "APPROVED" },
      );
      //console.log(`Order ${orderId.status}`);

      // Enviar al inventario
      await instance.post("/inventories/deliver-order", { orderId });

      // Actualizar status a DELIVERED
      await instance.put(
        `/orders/${orderId}/status`,
        { newStatus: "DELIVERED" },
      );
      // Actualizar la tabla
      const res = await instance.get("/orders/provider/myorders");
      const refreshedOrders = res.data.map((order) => ({
        orderNumber: order.id,
        buyer: order.buyerName,
        product: order.items[0]?.productName ?? "--",
        quantity: order.items[0]?.quantity ?? "--",
        status: order.status ?? "PENDING",
      }));
      setTableData(refreshedOrders);

      console.log(
        `Order ${orderId} approved, delivered, and marked as DELIVERED.`
      );
    } catch (err) {
      console.error("Error delivering order:", err);
      alert("Hubo un error al entregar la orden.");
    }
  };

  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Ordenes de Compra"} icon={"edit"} />
        <div className="table-container">
          <TableManage
            data={tableData}
            headers={tableHeaders}
            onDelete={handleDelete}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
