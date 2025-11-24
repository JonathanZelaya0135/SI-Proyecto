import TableTransactions from "../../features/ui/Table/TableTransactions";
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";

export default function Transactions() {
  const { productName } = useParams();
  const [tableData, setTableData] = useState([]);
  const role = localStorage.getItem("role");
  const apiRoute = role === "BUYER"
    ? "/orders"
    : "orders/provider/myorders";

  const tableHeaders = [
    { label: "No. Producto", key: "id" },
    { label: "Nombre del Producto", key: "productName" },
    {label: "Fecha", key: "date" },
    { label: "Cantidad", key: "quantity" },
    { label: "Precio ($)", key: "price" },
    { label: "+/-", key: "type" },
  ];

  useEffect(() => {

    const fetchTransactions = async () => {
      try {
        const res = await instance.get(apiRoute);
        let data = res.data;

        const flattened = data.map((entry) => ({
          id: entry.items?.[0]?.productId ?? entry.productId ?? entry.id,
          productName:
            entry.items?.[0]?.productName ?? "--",
          date: entry.date ?? entry.createdAt ?? "--",
          quantity: entry.items?.[0]?.quantity ?? entry.quantity ?? "--",
          price: entry.items?.[0]?.price ?? entry.price ?? "--",
          type: entry.type ?? "--"
        }));


        const filtered = flattened.filter(
          (row) => row.productName === productName
        );

        setTableData(filtered);
      } catch (err) {
        console.error("Error fetching transactions for product", productName, err, apiRoute);
      }
    };

    fetchTransactions();
  }, [productName]);

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
