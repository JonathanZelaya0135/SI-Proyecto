import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";
import TableManage from "../../features/ui/Table/TableManage";


export default function ProviderOrders(){
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
        const newData = tableData.filter(row => row.orderNumber !== orderNumberToDelete);
        setTableData(newData);
        console.log('Deleted order number:', orderNumberToDelete);
    };

    return(
        <div className="page-container">
                <AppMenu />
            <div className="page-content">
                <MainTitle title={"Ordenes de Compra"} icon={"edit"}/>
                <div className="table-container">
                  <TableManage data={tableData} headers={tableHeaders} onDelete={handleDelete} onSend={() => null/*handleSend*/}/>
                </div>
            </div>
        </div>
    )
}