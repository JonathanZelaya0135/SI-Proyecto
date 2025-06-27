import TableOrder from "../../features/ui/Table/TableOrder"
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";


export default function AdminInventory(){
    const [tableData, setTableData] = useState([]);
    const tableHeaders = [
        { label: "No. Pedido", key: "orderNumber" },
        { label: "Comprador", key: "buyer" },
        { label: "Producto", key: "product" },
        { label: "Cantidad", key: "quantity" },
        {label: "Eliminar"},
    ];

    useEffect(() => {
    instance.get('/orders')
      .then((res) => {
        const orders = res.data;
        setTableData(orders);
        })
      .catch((err) => {
        console.error('Error fetching orders:', err);
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
                <MainTitle title={"Ordenes"} icon={"edit_square"}/>
                <div className="table-container">
                  <TableOrder data={tableData} headers={tableHeaders} onDelete={handleDelete}/>
                </div>
            </div>
        </div>
    )
}