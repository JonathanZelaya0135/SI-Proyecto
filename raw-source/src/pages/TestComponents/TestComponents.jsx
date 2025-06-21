import './TestComponents.css';
import { useState, useEffect } from 'react';
import DashboardCard from '../../features/ui/Card/DashboardCard.jsx';
import TableDashboard from "../../features/ui/Table/TableDashboard.jsx";
import TableOrder from '../../features/ui/Table/TableOrder.jsx';
import TableManage from '../../features/ui/Table/TableManage.jsx';

export default function TestComponents() {
    //Set values to see the behaviour of the cards
    const [tableData, setTableData] = useState([]);
    const [userData] = useState(["Juan", "Pedro", "Maria", "Tahi"]);
    const [productData] = useState(["Perfume", "anillo", "camisa", "a", "b"]);

    //Call the api (in this case using fake data to simulate behavior)
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const fakeData = [
                { orderNumber: '001', buyer: 'John', product: 'Laptop', quantity: 1 },
                { orderNumber: '002', buyer: 'Maria', product: 'Phone', quantity: 2 },
                { orderNumber: '003', buyer: 'Alex', product: 'Tablet', quantity: 1 },
            ];
            setTableData(fakeData);
        }, 1000);
    }, []);

    const handleEdit = (indexToEdit, updatedRow) => {
        const newData = tableData.map((row, index) => index === indexToEdit ? updatedRow : row);
        setTableData(newData);
    };

    const handleDelete = (orderNumberToDelete) => {
        const newData = tableData.filter(row => row.orderNumber !== orderNumberToDelete);
        setTableData(newData);
        console.log('Deleted order number:', orderNumberToDelete);
    };

    //Set custom headers since not sure yet on API response
    //Replace key value with API json key value
    const tableHeaders = [
        { label: "No. Pedido", key: "orderNumber" },
        { label: "Comprador", key: "buyer" },
        { label: "Producto", key: "product" },
        { label: "Cantidad", key: "quantity" }
    ];

    return (
        <>
            <div className="dashboard-cards">
                <DashboardCard title={"Productos"} value={productData.length} label={"Productos registrados"} />
                <DashboardCard title={"Usuarios"} value={userData.length} label={"Usuarios creados"} />
                <DashboardCard title={"Ordenes"} value={tableData.length} label={"Ordenes realizadas"} />
            </div>
            <div>
                <TableOrder data={tableData} headers={tableHeaders} onDelete={handleDelete} />
            </div>
        </>
    );
}
