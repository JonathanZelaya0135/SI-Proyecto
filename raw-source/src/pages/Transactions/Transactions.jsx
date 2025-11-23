import TableTransactions from "../../features/ui/Table/TableTransactions";
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";

export default function Transactions() {
  const { productId } = useParams();
  const [tableData, setTableData] = useState([]);

  const tableHeaders = [
    { label: "No. Producto", key: "id" },
    { label: "Nombre del Producto", key: "productName" },
    { label: "Cantidad", key: "quantity" },
    { label: "Precio ($)", key: "price" },
    { label: "Indicador de Stock", key: "stock" },
  ];

  useEffect(() => {
    if (!productId) return;

    const fetchTransactions = async () => {
      try {
        // use the endpoint specified: /transactions/${productId}
        const res = await instance.get(`/transactions/${productId}`);
        let data = res.data;

        // Normalize different possible response shapes into an array
        if (!Array.isArray(data)) {
          if (Array.isArray(data.transactions)) data = data.transactions;
          else if (Array.isArray(res.data.orders)) data = res.data.orders;
          else if (Array.isArray(res.data)) data = res.data;
          else data = [];
        }

        const flattened = data.map((entry) => ({
          id: entry.items?.[0]?.productId ?? entry.productId ?? entry.id ?? "--",
          productName:
            entry.items?.[0]?.productName ?? entry.productName ?? entry.name ?? "--",
          quantity: entry.items?.[0]?.quantity ?? entry.quantity ?? "--",
          price: entry.items?.[0]?.price ?? entry.price ?? "--",
          stock: entry.stock ?? entry.stockIndicator ?? "--",
        }));

        setTableData(flattened);
      } catch (err) {
        console.error("Error fetching transactions for product", productId, err);
      }
    };

    fetchTransactions();
  }, [productId]);

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
