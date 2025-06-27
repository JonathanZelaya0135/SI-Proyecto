import TableOrder from "../../features/ui/Table/TableOrder"
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";


export default function BuyerOrders(){
    const [tableData, setTableData] = useState([]);
    const tableHeaders = [
        { label: "No. Orden", key: "id" },
        { label: "Producto", key: "items.productName" },
        { label: "Cantidad", key: "items.quantity" },
        { label: "Monto", key: "totalOrder" },
        { label: "Estado", key: "status" },
    ];

    useEffect(() => {
    instance.get('/orders')
      .then((res) => {
        const orders = res.data;
        setTableData(orders);
        })
      .catch((err) => {
        console.error('Error fetching users:', err);
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
                  <TableOrder data={tableData} headers={tableHeaders} onDelete={handleDelete}/>
                </div>
            </div>
        </div>
    )
}